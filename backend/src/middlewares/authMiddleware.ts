import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import path from "path";

if (!process.env.JWT_SECRET) {
  dotenv.config({ path: path.resolve(__dirname, "../../.env") });
}

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

  if (!authHeader || !/^Bearer\s+/i.test(authHeader)) {
    res.status(401).json({ error: "Access Denied: ไม่พบ Token ยืนยันตัวตน" });
    return;
  }

  const token = authHeader.replace(/^Bearer\s+/i, "").trim();

  // ดักกรณี Frontend เผลอส่งค่าว่าง หรือคำว่า "null" / "undefined" มาหลัง Bearer
  if (!token || token === "null" || token === "undefined") {
    res.status(401).json({ error: "Access Denied: ไม่พบ Token ยืนยันตัวตน" });
    return;
  }

  try {
    // 2. ถอดรหัสและตรวจสอบความถูกต้องของ Token
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload | string;

    if (!decoded || typeof decoded !== "object" || !("userId" in decoded)) {
      res.status(403).json({
        error: "Invalid Token: ข้อมูลภายในโทเค็นไม่ถูกต้อง",
        code: "INVALID_TOKEN",
      });
      return;
    }

    // 3. แนบข้อมูล user (เช่น userId, role) ไปกับ Request เพื่อให้ Controller นำไปใช้ต่อ
    req.user = decoded;

    // 4. อนุญาตให้ผ่านไปยัง API เส้นถัดไป
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      res.status(403).json({
        error: "Token Expired: โทเค็นหมดอายุ กรุณาเข้าสู่ระบบใหม่",
        code: "TOKEN_EXPIRED",
      });
      return;
    }

    res.status(403).json({
      error: "Invalid Token: โทเค็นไม่ถูกต้องหรือหมดอายุ",
      code: "INVALID_TOKEN",
    });
  }
};

export const verifyAdmin = (req: AuthRequest, res: Response, next: NextFunction): void => {
  if (!req.user || req.user.role !== "ADMIN") {
    res.status(403).json({ error: "Access Denied: สำหรับผู้ดูแลระบบ (Admin) เท่านั้น" });
    return;
  }
  next();
};
