import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// เปลี่ยนจาก new PrismaClient() มาเป็นการเรียกใช้ผ่าน adapter ที่เราตั้งค่าไว้
import prisma from "../prismaClient";

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable");
}
const JWT_SECRET = process.env.JWT_SECRET as string;

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    // รองรับทั้ง name จากหน้าบ้าน และ username ตรงๆ
    const { name, username = name, password, email, phone } = req.body;

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
      data: { username, email, passwordHash, phone },
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

    const refreshToken = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.REFRESH_TOKEN_SECRET || JWT_SECRET,
      { expiresIn: "7d" } // Refresh token is long-lived
    );

    res.status(200).json({ message: "เข้าสู่ระบบสำเร็จ", token, refreshToken });
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