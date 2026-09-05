import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

if (!process.env.JWT_SECRET) {
  throw new Error("Missing JWT_SECRET environment variable");
}
const JWT_SECRET = process.env.JWT_SECRET as string;

// สร้าง Interface เพื่อขยายประเภทของ Request ให้รองรับข้อมูล user
export interface AuthRequest extends Request {
  user?: any;
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  // 1. รับ Token จาก Header (รูปแบบ: Bearer <token>)
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401).json({ error: "Access Denied: ไม่พบ Token ยืนยันตัวตน" });
    return;
  }

  const token = authHeader.split(" ")[1];

  try {
    // 2. ถอดรหัสและตรวจสอบความถูกต้องของ Token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // 3. แนบข้อมูล user (เช่น userId, role) ไปกับ Request เพื่อให้ Controller นำไปใช้ต่อ
    req.user = decoded;
    
    // 4. อนุญาตให้ผ่านไปยัง API เส้นถัดไป
    next();
  } catch (error) {
    res.status(403).json({ error: "Invalid Token: โทเค็นไม่ถูกต้องหรือหมดอายุ" });
  }
};