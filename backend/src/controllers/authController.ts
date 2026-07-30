import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || "your-super-secret-key";

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { username, password, email, phone } = req.body;

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
      { expiresIn: "1d" }
    );

    res.status(200).json({ message: "เข้าสู่ระบบสำเร็จ", token });
  } catch (error) {
    res.status(500).json({ error: "เซิร์ฟเวอร์ขัดข้อง", details: error });
  }
};