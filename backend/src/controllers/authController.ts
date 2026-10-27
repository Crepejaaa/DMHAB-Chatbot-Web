import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";

import prisma from "../prismaClient";
import { AuthRequest } from "../middlewares/authMiddleware";

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable");
}
const JWT_SECRET = process.env.JWT_SECRET as string;
export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // รองรับทั้ง name จากหน้าบ้าน และ username ตรงๆ พร้อมกับ recaptchaToken
    const { name, username = name, password, email, recaptchaToken } = req.body;

    // ตรวจสอบ reCAPTCHA Token
    const secretKey = process.env.RECAPTCHA_SECRET_KEY;
    if (!recaptchaToken) {
      res.status(400).json({ error: "reCAPTCHA ไม่ถูกต้อง หรือหมดอายุ" });
      return;
    }

    try {
      const params = new URLSearchParams();
      params.append("secret", secretKey || "");
      params.append("response", recaptchaToken);

      const verifyResponse = await axios.post(
        "https://www.google.com/recaptcha/api/siteverify",
        params.toString(),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded"
          }
        }
      );

      if (!verifyResponse.data?.success) {
        res.status(400).json({ error: "reCAPTCHA ไม่ถูกต้อง หรือหมดอายุ" });
        return;
      }
    } catch (recaptchaError) {
      console.error("reCAPTCHA verification error:", recaptchaError);
      res.status(400).json({ error: "reCAPTCHA ไม่ถูกต้อง หรือหมดอายุ" });
      return;
    }

    if (!username || !password) {
      res.status(400).json({ error: "กรุณาระบุข้อมูลให้ครบถ้วน (ชื่อผู้ใช้, รหัสผ่าน)" });
      return;
    }

    // ตรวจสอบว่ามีอีเมลหรือ username นี้แล้วหรือยัง
    const existingUser = await prisma.user.findFirst({
      where: { OR: [{ email }, { username }] }
    });

    if (existingUser) {
      res.status(400).json({ error: "อีเมลหรือชื่อผู้ใช้นี้มีในระบบแล้ว" });
      return;
    }

    // เข้ารหัสผ่านและสร้างผู้ใช้ใหม่
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { username, email, passwordHash },
    });

    res.status(201).json({ message: "สมัครสมาชิกสำเร็จ", userId: newUser.id });
  } catch (error) {
    res.status(500).json({ error: "เซิร์ฟเวอร์ขัดข้อง", details: error });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || !user.passwordHash) {
      res.status(400).json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
      return;
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);
    if (!isValid) {
      res.status(400).json({ error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" });
      return;
    }

    // สร้าง Token ส่งกลับไปให้ Client ใช้ยืนยันตัวตนในครั้งถัดไป
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "15m" } // Access token is short-lived now
    );

    // สร้าง Refresh Token
    const refreshToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.REFRESH_TOKEN_SECRET || JWT_SECRET,
      { expiresIn: "7d" } // Refresh token is long-lived
    );

    // 👇 เพิ่มการส่งก้อนข้อมูล user และ role กลับไปให้หน้าบ้าน (จาก commit d7fe903)
    res.status(200).json({
      message: "เข้าสู่ระบบสำเร็จ", 
      token, 
      refreshToken,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: "เซิร์ฟเวอร์ขัดข้อง", details: error });
  }
};

export const refresh = async (req: Request, res: Response): Promise<void> => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      res.status(401).json({ error: "Refresh token is missing" });
      return;
    }

    const REFRESH_SECRET = process.env.REFRESH_TOKEN_SECRET || JWT_SECRET;

    jwt.verify(refreshToken, REFRESH_SECRET, (err: any, decoded: any) => {
      if (err || !decoded?.userId) {
        res.status(403).json({ error: "Invalid or expired refresh token" });
        return;
      }

      // Generate a new short-lived access token
      const newToken = jwt.sign(
        { userId: decoded.userId, role: decoded.role || "USER" },
        JWT_SECRET,
        { expiresIn: "15m" }
      );

      res.status(200).json({ token: newToken });
    });
  } catch (error) {
    res.status(500).json({ error: "เซิร์ฟเวอร์ขัดข้อง", details: error });
  }
};

// ฟังก์ชันใหม่สำหรับให้หน้า Admin Dashboard ดึงรายชื่อผู้ใช้ทั้งหมด
export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true
      },
      orderBy: { createdAt: 'desc' } // เรียงคนสมัครล่าสุดขึ้นก่อน
    });
    
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching admin users:", error);
    res.status(500).json({ error: "ไม่สามารถดึงข้อมูลผู้ใช้งานได้", details: error });
  }
};

export const updateUserRole = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = Number(req.params.id);
    const { role } = req.body;

    if (!Number.isInteger(userId) || userId <= 0) {
      res.status(400).json({ error: "รหัสผู้ใช้งานไม่ถูกต้อง" });
      return;
    }

    if (role !== "USER" && role !== "ADMIN") {
      res.status(400).json({ error: "Role ต้องเป็น USER หรือ ADMIN เท่านั้น" });
      return;
    }

    if (Number(req.user?.userId) === userId) {
      res.status(400).json({ error: "ไม่สามารถเปลี่ยนสิทธิ์บัญชีของตนเองได้" });
      return;
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { id: true, role: true }
    });

    if (!targetUser) {
      res.status(404).json({ error: "ไม่พบผู้ใช้งานนี้" });
      return;
    }

    if (targetUser.role === "ADMIN" && role === "USER") {
      const adminCount = await prisma.user.count({ where: { role: "ADMIN" } });
      if (adminCount <= 1) {
        res.status(400).json({ error: "ไม่สามารถลดสิทธิ์แอดมินคนสุดท้ายได้" });
        return;
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: { role },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        createdAt: true
      }
    });

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user role:", error);
    res.status(500).json({ error: "ไม่สามารถเปลี่ยนสิทธิ์ผู้ใช้งานได้" });
  }
};

export const deleteUser = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = Number(req.params.id);
  const requesterId = Number(req.user?.userId);

  if (!Number.isInteger(userId) || userId <= 0) {
    res.status(400).json({ error: "รหัสผู้ใช้งานไม่ถูกต้อง" });
    return;
  }

  if (requesterId === userId) {
    res.status(400).json({ error: "ไม่สามารถลบบัญชีของตนเองได้" });
    return;
  }

  try {
    const result = await prisma.$transaction(async (transaction: any) => {
      const targetUser = await transaction.user.findUnique({
        where: { id: userId },
        select: { id: true, role: true }
      });

      if (!targetUser) {
        return { error: "ไม่พบผู้ใช้งานนี้", status: 404 };
      }

      if (targetUser.role === "ADMIN") {
        const adminCount = await transaction.user.count({ where: { role: "ADMIN" } });
        if (adminCount <= 1) {
          return { error: "ไม่สามารถลบแอดมินคนสุดท้ายได้", status: 400 };
        }
      }

      const authoredArticles = await transaction.article.count({
        where: { createdById: userId }
      });

      if (authoredArticles > 0) {
        return {
          error: "ไม่สามารถลบบัญชีนี้ได้ เนื่องจากยังมีบทความที่บัญชีนี้เป็นผู้เขียน กรุณาจัดการบทความก่อน",
          status: 409
        };
      }

      await transaction.user.delete({ where: { id: userId } });
      return null;
    }, { isolationLevel: "Serializable" });

    if (result) {
      res.status(result.status).json({ error: result.error });
      return;
    }

    res.status(200).json({ message: "ลบบัญชีผู้ใช้งานและข้อมูลที่เกี่ยวข้องแล้ว" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "ไม่สามารถลบบัญชีผู้ใช้งานได้" });
  }
};

// ฟังก์ชันสำหรับดึงสถิติ 3 ด้านหลักจากฐานข้อมูล สำหรับ Admin Dashboard
export const getAdminStats = async (req: Request, res: Response): Promise<void> => {
  try {
    // 1. จำนวนผู้ใช้ทั้งหมด + จำแนกสิทธิ์
    const totalUsers = await prisma.user.count();
    const userRoleCount = await prisma.user.count({ where: { role: 'USER' } });
    const adminRoleCount = await prisma.user.count({ where: { role: 'ADMIN' } });

    // 2. การประเมินสำเร็จ + จำแนกระดับผลลัพธ์
    const assessmentsCompleted = await prisma.testResult.count();
    const normalCount = await prisma.testResult.count({ where: { totalScore: { lt: 7 } } });
    const moderateCount = await prisma.testResult.count({ where: { totalScore: { gte: 7, lte: 18 } } });
    const severeCount = await prisma.testResult.count({ where: { totalScore: { gt: 18 } } });

    // 3. คะแนนประเมินเฉลี่ย + การกระจายตัวของคะแนน
    const avgScoreAgg = await prisma.testResult.aggregate({
      _avg: { totalScore: true }
    });
    const avgScoreVal = avgScoreAgg._avg.totalScore ? Number(avgScoreAgg._avg.totalScore.toFixed(1)) : 0;

    // ช่วงคะแนน
    const range0to6 = await prisma.testResult.count({ where: { totalScore: { lte: 6 } } });
    const range7to12 = await prisma.testResult.count({ where: { totalScore: { gte: 7, lte: 12 } } });
    const range13to18 = await prisma.testResult.count({ where: { totalScore: { gte: 13, lte: 18 } } });
    const range19to21 = await prisma.testResult.count({ where: { totalScore: { gte: 19 } } });

    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({
      totalUsers,
      assessmentsCompleted,
      avgScore: avgScoreVal,
      userRoles: {
        users: userRoleCount,
        admins: adminRoleCount
      },
      assessmentLevels: {
        normal: normalCount,
        moderate: moderateCount,
        severe: severeCount
      },
      scoreDistribution: [
        { label: '0-6 คะแนน (ปกติ)', count: range0to6, description: 'สุขภาพจิตปกติ' },
        { label: '7-12 คะแนน (เครียดเล็กน้อย)', count: range7to12, description: 'เริ่มมีความเครียด' },
        { label: '13-18 คะแนน (เสี่ยงปานกลาง)', count: range13to18, description: 'ควรติดตามอาการ' },
        { label: '19-21 คะแนน (เสี่ยงรุนแรง)', count: range19to21, description: 'ควรปรึกษาแพทย์' }
      ]
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    res.status(500).json({ error: "ไม่สามารถดึงข้อมูลสถิติได้", details: error });
  }
};

// ฟังก์ชันสำหรับบันทึกผลการทำแบบประเมินลงตาราง TestResult
export const createTestResult = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { totalScore, interpretation } = req.body;
    const userId = Number(req.user?.userId);

    if (!Number.isInteger(userId) || userId <= 0) {
      res.status(401).json({ error: "ไม่พบข้อมูลผู้ใช้งาน กรุณาเข้าสู่ระบบใหม่" });
      return;
    }

    if (!Number.isInteger(totalScore) || totalScore < 0 || totalScore > 27) {
      res.status(400).json({ error: "คะแนนแบบประเมินไม่ถูกต้อง" });
      return;
    }

    if (typeof interpretation !== "string" || !interpretation.trim()) {
      res.status(400).json({ error: "กรุณาระบุผลการประเมิน" });
      return;
    }

    const newResult = await prisma.testResult.create({
      data: {
        userId,
        totalScore,
        interpretation: interpretation.trim()
      }
    });

    res.status(201).json(newResult);
  } catch (error) {
    console.error("Error creating test result:", error);
    res.status(500).json({ error: "ไม่สามารถบันทึกผลการประเมินได้", details: error });
  }
};