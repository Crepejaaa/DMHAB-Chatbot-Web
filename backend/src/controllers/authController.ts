import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import axios from "axios";
import crypto from "crypto";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import path from "path";

if (!process.env.JWT_SECRET || !process.env.RECAPTCHA_SECRET_KEY) {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}

// เปลี่ยนจาก new PrismaClient() มาเป็นการเรียกใช้ผ่าน adapter ที่เราตั้งค่าไว้
import prisma from "../prismaClient";
import { AuthRequest } from "../middlewares/authMiddleware";

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable");
}
const JWT_SECRET = process.env.JWT_SECRET as string;
const ACCESS_TOKEN_EXPIRES_IN = (process.env.JWT_EXPIRES_IN || "1d") as jwt.SignOptions["expiresIn"];

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // รองรับทั้ง name จากหน้าบ้าน และ username ตรงๆ พร้อมกับ avatar และ recaptchaToken / g-recaptcha-response
    const { name, username = name, password, email, avatar, avatarUrl } = req.body || {};
    const selectedAvatar =
      typeof avatar === "string" && avatar.trim()
        ? avatar.trim()
        : typeof avatarUrl === "string" && avatarUrl.trim()
        ? avatarUrl.trim()
        : "avatar_dog";
    const rawRecaptchaToken = req.body?.recaptchaToken ?? req.body?.["g-recaptcha-response"];
    const recaptchaToken = typeof rawRecaptchaToken === "string" ? rawRecaptchaToken.trim() : "";

    // อ่านค่า RECAPTCHA_SECRET_KEY และตัดช่องว่างหรือเครื่องหมายคำพูดที่อาจติดมาจาก .env / Render
    const secretKey = (process.env.RECAPTCHA_SECRET_KEY || "")
      .trim()
      .replace(/^["']|["']$/g, "");

    // Log ตรวจสอบค่าก่อนส่งไป Verify กับ Google Siteverify API
    console.log("[Register reCAPTCHA Check]", {
      hasRecaptchaToken: Boolean(recaptchaToken),
      tokenLength: recaptchaToken.length,
      tokenPreview: recaptchaToken ? `${recaptchaToken.slice(0, 12)}...` : null,
      hasSecretKey: Boolean(secretKey),
      secretKeyLength: secretKey.length,
      bodyKeys: Object.keys(req.body || {}),
    });

    if (!recaptchaToken) {
      console.warn("[Register reCAPTCHA] Missing recaptchaToken in request body");
      res.status(400).json({
        error: "กรุณายืนยันตัวตนผ่าน reCAPTCHA ก่อนทำการสมัครสมาชิก (ไม่พบ recaptchaToken)",
      });
      return;
    }

    if (!secretKey) {
      console.error("[Register reCAPTCHA] Missing RECAPTCHA_SECRET_KEY in environment variables");
      res.status(500).json({
        error: "ระบบยังไม่ได้ตั้งค่า RECAPTCHA_SECRET_KEY บนเซิร์ฟเวอร์ (Backend)",
      });
      return;
    }

    try {
      const params = new URLSearchParams();
      params.append("secret", secretKey);
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

      const errorCodes: string[] = verifyResponse.data?.["error-codes"] || [];
      console.log("[Register reCAPTCHA Siteverify Result]", {
        success: verifyResponse.data?.success,
        hostname: verifyResponse.data?.hostname,
        challenge_ts: verifyResponse.data?.challenge_ts,
        errorCodes,
      });

      if (!verifyResponse.data?.success) {
        if (
          errorCodes.includes("missing-input-secret") ||
          errorCodes.includes("invalid-input-secret")
        ) {
          console.error("[Register reCAPTCHA] Invalid RECAPTCHA_SECRET_KEY:", errorCodes);
          res.status(500).json({
            error: "ค่า RECAPTCHA_SECRET_KEY บนเซิร์ฟเวอร์ไม่ถูกต้อง",
            details: errorCodes,
          });
          return;
        }

        if (errorCodes.includes("timeout-or-duplicate")) {
          res.status(400).json({
            error: "reCAPTCHA หมดอายุหรือถูกใช้งานไปแล้ว กรุณาติ๊กยืนยันใหม่อีกครั้ง",
            details: errorCodes,
          });
          return;
        }

        if (errorCodes.includes("invalid-input-response")) {
          res.status(400).json({
            error: "reCAPTCHA Token ไม่ถูกต้อง (โปรดตรวจสอบว่า Site Key ตรงกับ Secret Key)",
            details: errorCodes,
          });
          return;
        }

        res.status(400).json({
          error: "reCAPTCHA ไม่ถูกต้อง หรือหมดอายุ",
          details: errorCodes,
        });
        return;
      }
    } catch (recaptchaError) {
      console.error("reCAPTCHA verification error:", recaptchaError);
      res.status(400).json({ error: "ไม่สามารถเชื่อมต่อระบบตรวจสอบ reCAPTCHA ได้ กรุณาลองใหม่อีกครั้ง" });
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

    // เข้ารหัสผ่านและสร้างผู้ใช้ใหม่ (พร้อมบันทึกค่า avatar ที่เลือก เช่น "avatar_dog")
    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({
      data: { username, email, passwordHash, avatarUrl: selectedAvatar },
    });

    res.status(201).json({ message: "สมัครสมาชิกสำเร็จ", userId: newUser.id, avatar: newUser.avatarUrl });
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
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
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
        name: user.username,
        username: user.username,
        email: user.email,
        role: user.role,
        avatar: user.avatarUrl || "avatar_dog",
        avatarUrl: user.avatarUrl || "avatar_dog"
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

      // Generate a new access token
      const newToken = jwt.sign(
        { userId: decoded.userId, role: decoded.role || "USER" },
        JWT_SECRET,
        { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
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
        { label: '19-27 คะแนน (เสี่ยงรุนแรง)', count: range19to21, description: 'ควรปรึกษาแพทย์' }
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

// ฟังก์ชันสำหรับอัปเดตข้อมูลโปรไฟล์และรูปอวตารของผู้ใช้งาน (เช่น avatar_dog, avatar_cat)
export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = Number(req.user?.userId);
    if (!Number.isInteger(userId) || userId <= 0) {
      res.status(401).json({ error: "ไม่พบข้อมูลผู้ใช้งาน กรุณาเข้าสู่ระบบใหม่" });
      return;
    }

    const { name, username = name, email, avatar, avatarUrl } = req.body || {};
    const nextUsername = typeof username === "string" && username.trim() ? username.trim() : undefined;
    const nextEmail = typeof email === "string" && email.trim() ? email.trim() : undefined;
    const nextAvatar =
      typeof avatar === "string" && avatar.trim()
        ? avatar.trim()
        : typeof avatarUrl === "string" && avatarUrl.trim()
        ? avatarUrl.trim()
        : undefined;

    if (nextUsername || nextEmail) {
      const duplicateConditions: Array<{ username?: string; email?: string }> = [];
      if (nextUsername) duplicateConditions.push({ username: nextUsername });
      if (nextEmail) duplicateConditions.push({ email: nextEmail });

      const conflictUser = await prisma.user.findFirst({
        where: {
          AND: [
            { id: { not: userId } },
            { OR: duplicateConditions }
          ]
        }
      });

      if (conflictUser) {
        res.status(400).json({ error: "ชื่อผู้ใช้หรืออีเมลนี้ถูกใช้งานแล้ว" });
        return;
      }
    }

    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(nextUsername ? { username: nextUsername } : {}),
        ...(nextEmail ? { email: nextEmail } : {}),
        ...(nextAvatar ? { avatarUrl: nextAvatar } : {})
      },
      select: {
        id: true,
        username: true,
        email: true,
        role: true,
        avatarUrl: true
      }
    });

    res.status(200).json({
      message: "บันทึกข้อมูลโปรไฟล์เรียบร้อยแล้ว",
      user: {
        id: updatedUser.id,
        name: updatedUser.username,
        username: updatedUser.username,
        email: updatedUser.email,
        role: updatedUser.role,
        avatar: updatedUser.avatarUrl || "avatar_dog",
        avatarUrl: updatedUser.avatarUrl || "avatar_dog"
      }
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    res.status(500).json({ error: "ไม่สามารถอัปเดตข้อมูลโปรไฟล์ได้", details: error });
  }
};

// ฟังก์ชันเปลี่ยนรหัสผ่าน: ต้องยืนยันรหัสผ่านเดิมให้ถูกต้องก่อน แล้วบันทึกรหัสผ่านใหม่ (bcrypt hash) ลงฐานข้อมูล
export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = Number(req.user?.userId);
    if (!Number.isInteger(userId) || userId <= 0) {
      res.status(401).json({ error: "ไม่พบข้อมูลผู้ใช้งาน กรุณาเข้าสู่ระบบใหม่" });
      return;
    }

    const { oldPassword, newPassword, confirmPassword } = req.body || {};
    if (typeof oldPassword !== "string" || typeof newPassword !== "string" || !oldPassword || !newPassword) {
      res.status(400).json({ error: "กรุณากรอกรหัสผ่านเดิมและรหัสผ่านใหม่" });
      return;
    }
    if (confirmPassword !== undefined && confirmPassword !== newPassword) {
      res.status(400).json({ error: "รหัสผ่านใหม่และการยืนยันไม่ตรงกัน" });
      return;
    }
    if (newPassword.length < 8) {
      res.status(400).json({ error: "รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร" });
      return;
    }

    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.passwordHash) {
      res.status(404).json({ error: "ไม่พบผู้ใช้งานนี้" });
      return;
    }

    const isValid = await bcrypt.compare(oldPassword, user.passwordHash);
    if (!isValid) {
      res.status(400).json({ error: "รหัสผ่านเดิมไม่ถูกต้อง" });
      return;
    }

    if (oldPassword === newPassword) {
      res.status(400).json({ error: "รหัสผ่านใหม่ต้องไม่ซ้ำกับรหัสผ่านเดิม" });
      return;
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({ where: { id: userId }, data: { passwordHash } });

    res.status(200).json({ message: "เปลี่ยนรหัสผ่านเรียบร้อยแล้ว" });
  } catch (error) {
    console.error("Error changing password:", error);
    res.status(500).json({ error: "ไม่สามารถเปลี่ยนรหัสผ่านได้" });
  }
};

let userResetSchemaSynced = false;

export const ensureUserResetSchema = async (): Promise<void> => {
  if (userResetSchemaSynced) return;
  try {
    await prisma.$executeRawUnsafe(`
      UPDATE "User" SET "username" = COALESCE("email", 'user_' || "id"::text) WHERE "username" IS NULL;
    `);
    await prisma.$executeRawUnsafe(`
      ALTER TABLE "User"
      ADD COLUMN IF NOT EXISTS "resetPasswordToken" TEXT,
      ADD COLUMN IF NOT EXISTS "resetPasswordExpires" TIMESTAMP(3);
    `);
    userResetSchemaSynced = true;
  } catch (error) {
    console.warn("ensureUserResetSchema warning:", error);
  }
};

// ฟังก์ชันลืมรหัสผ่าน (POST /api/auth/forgot-password): สร้าง Reset Token บันทึกลง DB และส่งอีเมลผ่าน Gmail (Nodemailer)
export const forgotPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    await ensureUserResetSchema();

    const rawEmail = req.body?.email;
    const email = typeof rawEmail === "string" ? rawEmail.trim() : "";

    if (!email) {
      res.status(400).json({
        error: "กรุณาระบุอีเมลที่ต้องการรีเซ็ตรหัสผ่าน",
        message: "กรุณาระบุอีเมลที่ต้องการรีเซ็ตรหัสผ่าน"
      });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      res.status(404).json({
        error: "ไม่พบอีเมลนี้ในระบบ กรุณาตรวจสอบอีเมลอีกครั้ง",
        message: "ไม่พบอีเมลนี้ในระบบ กรุณาตรวจสอบอีเมลอีกครั้ง"
      });
      return;
    }

    // สร้าง Token แบบสุ่มด้วย crypto และกำหนดเวลาหมดอายุ 1 ชั่วโมง
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpires = new Date(Date.now() + 60 * 60 * 1000); // 1 ชั่วโมง

    await prisma.user.update({
      where: { id: user.id },
      data: {
        resetPasswordToken: resetToken,
        resetPasswordExpires: resetExpires
      }
    });

    const emailUser = (process.env.EMAIL_USER || "").trim().replace(/^["']|["']$/g, "");
    const emailPass = (process.env.EMAIL_PASS || "").trim().replace(/^["']|["']$/g, "");

    if (!emailUser || !emailPass) {
      console.error("[ForgotPassword] Missing EMAIL_USER or EMAIL_PASS in environment variables");
      res.status(500).json({
        error: "ระบบส่งอีเมลยังไม่ได้ตั้งค่า EMAIL_USER หรือ EMAIL_PASS บนเซิร์ฟเวอร์",
        message: "ระบบส่งอีเมลยังไม่ได้ตั้งค่า EMAIL_USER หรือ EMAIL_PASS บนเซิร์ฟเวอร์"
      });
      return;
    }

    const resetBaseUrl = (
      process.env.RESET_PASSWORD_BASE_URL ||
      "https://dmhab-chatbot-web.vercel.app"
    )
      .split(",")[0]
      .trim()
      .replace(/\/$/, "");

    const resetLink = `${resetBaseUrl}/reset-password?token=${resetToken}`;

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: emailUser,
        pass: emailPass
      }
    });

    await transporter.sendMail({
      from: `"PhuenJaiZone Support" <${emailUser}>`,
      to: email,
      subject: "รีเซ็ตรหัสผ่านของคุณ - PhuenJaiZone",
      text: `สวัสดีคุณ ${user.username || email},\n\nเราได้รับคำขอรีเซ็ตรหัสผ่านสำหรับบัญชี PhuenJaiZone ของคุณ\nกรุณาคลิกลิงก์ด้านล่างเพื่อตั้งรหัสผ่านใหม่ (ลิงก์มีอายุใช้งาน 1 ชั่วโมง):\n\n${resetLink}\n\nหากคุณไม่ได้เป็นผู้ร้องขอ กรุณาเพิกเฉยต่ออีเมลฉบับนี้`,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 560px; margin: 0 auto; padding: 28px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #1e293b;">
          <div style="text-align: center; padding-bottom: 16px; border-bottom: 2px solid #ccfbf1;">
            <h2 style="margin: 0; color: #0d9488;">PhuenJaiZone</h2>
            <p style="margin: 4px 0 0; font-size: 13px; color: #64748b;">ระบบผู้ช่วยประเมินและดูแลสุขภาพจิตประจำวัน</p>
          </div>
          <div style="padding: 24px 0;">
            <p style="margin: 0 0 12px; font-size: 15px;">สวัสดีคุณ <strong>${user.username || email}</strong>,</p>
            <p style="margin: 0 0 20px; font-size: 14px; line-height: 1.6; color: #334155;">
              เราได้รับคำขอสำหรับการตั้งรหัสผ่านใหม่ของบัญชีที่ผูกกับอีเมลนี้ กรุณากดปุ่มด้านล่างเพื่อไปยังหน้าตั้งรหัสผ่านใหม่ (ลิงก์นี้มีอายุใช้งาน <strong>1 ชั่วโมง</strong>):
            </p>
            <div style="text-align: center; margin: 28px 0;">
              <a href="${resetLink}" style="display: inline-block; padding: 12px 28px; background-color: #0d9488; color: #ffffff; text-decoration: none; font-weight: bold; border-radius: 10px; font-size: 14px;">
                ตั้งรหัสผ่านใหม่
              </a>
            </div>
            <p style="margin: 0 0 8px; font-size: 12px; color: #64748b;">หรือคัดลอกลิงก์ด้านล่างไปวางในเบราว์เซอร์ของคุณ:</p>
            <p style="margin: 0 0 20px; font-size: 12px; word-break: break-all; color: #0f766e;">
              <a href="${resetLink}" style="color: #0d9488;">${resetLink}</a>
            </p>
            <p style="margin: 0; font-size: 12px; color: #94a3b8;">
              หากคุณไม่ได้เป็นผู้ร้องขอรีเซ็ตรหัสผ่าน คุณสามารถเพิกเฉยต่ออีเมลฉบับนี้ได้ทันที รหัสผ่านของคุณจะยังคงปลอดภัยเหมือนเดิม
            </p>
          </div>
        </div>
      `
    });

    res.status(200).json({
      message: "ส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปยังอีเมลของคุณเรียบร้อยแล้ว กรุณาตรวจสอบกล่องจดหมาย"
    });
  } catch (error) {
    console.error("Error in forgotPassword:", error);
    res.status(500).json({
      error: "ไม่สามารถส่งอีเมลรีเซ็ตรหัสผ่านได้ กรุณาตรวจสอบการตั้งค่าอีเมลหรือลองใหม่อีกครั้ง",
      message: "ไม่สามารถส่งอีเมลรีเซ็ตรหัสผ่านได้ กรุณาตรวจสอบการตั้งค่าอีเมลหรือลองใหม่อีกครั้ง"
    });
  }
};

// ฟังก์ชันตั้งรหัสผ่านใหม่ (POST /api/auth/reset-password): ตรวจสอบ Token + วันหมดอายุ, เข้ารหัส bcrypt และล้างค่า Token
export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  try {
    await ensureUserResetSchema();

    const rawToken = req.body?.token;
    const rawNewPassword = req.body?.newPassword ?? req.body?.password;
    const rawConfirmPassword = req.body?.confirmPassword;

    const token = typeof rawToken === "string" ? rawToken.trim() : "";
    const newPassword = typeof rawNewPassword === "string" ? rawNewPassword : "";

    if (!token || !newPassword) {
      res.status(400).json({
        error: "กรุณาระบุ Token และรหัสผ่านใหม่ให้ครบถ้วน",
        message: "กรุณาระบุ Token และรหัสผ่านใหม่ให้ครบถ้วน"
      });
      return;
    }

    if (rawConfirmPassword !== undefined && rawConfirmPassword !== newPassword) {
      res.status(400).json({
        error: "รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน",
        message: "รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน"
      });
      return;
    }

    if (newPassword.length < 8) {
      res.status(400).json({
        error: "รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 8 ตัวอักษร",
        message: "รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 8 ตัวอักษร"
      });
      return;
    }

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: token,
        resetPasswordExpires: {
          gt: new Date()
        }
      }
    });

    if (!user) {
      res.status(400).json({
        error: "ลิงก์รีเซ็ตรหัสผ่านไม่ถูกต้องหรือหมดอายุแล้ว กรุณาขอรีเซ็ตรหัสผ่านใหม่อีกครั้ง",
        message: "ลิงก์รีเซ็ตรหัสผ่านไม่ถูกต้องหรือหมดอายุแล้ว กรุณาขอรีเซ็ตรหัสผ่านใหม่อีกครั้ง"
      });
      return;
    }

    const passwordHash = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        passwordHash,
        resetPasswordToken: null,
        resetPasswordExpires: null
      }
    });

    res.status(200).json({
      message: "ตั้งรหัสผ่านใหม่สำเร็จ กรุณาเข้าสู่ระบบด้วยรหัสผ่านใหม่ของคุณ"
    });
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({
      error: "เกิดข้อผิดพลาดในการตั้งรหัสผ่านใหม่ กรุณาลองใหม่อีกครั้ง",
      message: "เกิดข้อผิดพลาดในการตั้งรหัสผ่านใหม่ กรุณาลองใหม่อีกครั้ง"
    });
  }
};
