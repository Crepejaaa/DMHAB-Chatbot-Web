import { Request, Response } from "express";
import type { Prisma } from "@prisma/client";
import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import bcrypt from "bcrypt";
import prisma from "../prismaClient";
import { AuthRequest } from "../middlewares/authMiddleware";

const RESET_TOKEN_TTL_MS = 10 * 60 * 1000;

class NoAdministratorError extends Error {}

const isPrismaSchemaError = (error: unknown): boolean =>
  typeof error === "object" &&
  error !== null &&
  "code" in error &&
  (error.code === "P2021" || error.code === "P2022");

const hashToken = (token: string): string =>
  createHash("sha256").update(token).digest("hex");

const tokenMatches = (storedHash: string, token: string): boolean => {
  const stored = Buffer.from(storedHash, "hex");
  const submitted = Buffer.from(hashToken(token), "hex");
  return stored.length === submitted.length && timingSafeEqual(stored, submitted);
};

export const requestPasswordReset = async (req: Request, res: Response): Promise<void> => {
  const email = typeof req.body.email === "string" ? req.body.email.trim().toLowerCase() : "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    res.status(400).json({ error: "กรุณากรอกอีเมลให้ถูกต้อง" });
    return;
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: { equals: email, mode: "insensitive" } },
      select: { id: true, username: true, email: true },
    });
    if (!user) {
      res.status(404).json({ error: "ไม่พบบัญชีที่ใช้อีเมลนี้ในระบบ" });
      return;
    }

    const accessToken = randomBytes(32).toString("hex");
    const resetRequest = await prisma.$transaction(async (transaction: Prisma.TransactionClient) => {
      const created = await transaction.passwordResetRequest.create({
        data: { userId: user.id, accessTokenHash: hashToken(accessToken) },
      });
      const admins = await transaction.user.findMany({
        where: { role: "ADMIN" },
        select: { id: true },
      });
      if (!admins.length) {
        throw new NoAdministratorError();
      }
      await transaction.notification.createMany({
        data: admins.map((admin) => ({
          userId: admin.id,
          passwordResetRequestId: created.id,
          type: "PASSWORD_RESET_REQUEST",
          title: "คำร้องขอรีเซ็ตรหัสผ่าน",
          message: `${user.username} (${user.email}) ขอให้แอดมินอนุมัติการตั้งรหัสผ่านใหม่`,
        })),
      });
      return created;
    });

    res.status(201).json({
      requestId: resetRequest.id,
      accessToken,
      message: "ส่งคำร้องไปยังแอดมินแล้ว คุณสามารถติดตามผลได้ในหน้านี้",
    });
  } catch (error) {
    console.error("Error creating password reset request:", error);
    if (error instanceof NoAdministratorError) {
      res.status(503).json({ error: "ยังไม่มีบัญชีแอดมินที่รับคำร้องได้ กรุณาติดต่อผู้ดูแลระบบ" });
      return;
    }
    if (isPrismaSchemaError(error)) {
      res.status(503).json({ error: "ฐานข้อมูล production ยังไม่ได้อัปเดตสำหรับระบบคำร้องรีเซ็ตรหัสผ่าน กรุณาแจ้งผู้ดูแลระบบ" });
      return;
    }
    res.status(500).json({ error: "ส่งคำร้องไม่สำเร็จ กรุณาลองใหม่" });
  }
};

export const getPasswordResetRequestStatus = async (req: Request, res: Response): Promise<void> => {
  const requestId = Number(req.params.id);
  const accessToken = req.header("X-Reset-Request-Token");
  if (!Number.isInteger(requestId) || requestId <= 0 || !accessToken) {
    res.status(400).json({ error: "คำขอติดตามสถานะไม่ถูกต้อง" });
    return;
  }

  try {
    const request = await prisma.passwordResetRequest.findUnique({
      where: { id: requestId },
      select: { id: true, status: true, accessTokenHash: true, createdAt: true, reviewedAt: true },
    });
    if (!request || !tokenMatches(request.accessTokenHash, accessToken)) {
      res.status(404).json({ error: "ไม่พบคำร้องนี้ หรือคำขอติดตามไม่ถูกต้อง" });
      return;
    }
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({
      id: request.id,
      status: request.status,
      createdAt: request.createdAt,
      reviewedAt: request.reviewedAt,
    });
  } catch (error) {
    console.error("Error reading password reset request status:", error);
    res.status(500).json({ error: "ไม่สามารถตรวจสอบสถานะคำร้องได้" });
  }
};

export const getNotifications = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = Number(req.user?.userId);
  try {
    const notifications = await prisma.notification.findMany({
      where: { userId },
      include: {
        passwordResetRequest: {
          select: {
            id: true,
            status: true,
            user: { select: { username: true, email: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
      take: 30,
    });
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    if (isPrismaSchemaError(error)) {
      res.status(503).json({ error: "ฐานข้อมูล production ยังไม่ได้อัปเดตสำหรับระบบแจ้งเตือน กรุณาแจ้งผู้ดูแลระบบ" });
      return;
    }
    res.status(500).json({ error: "ไม่สามารถโหลดการแจ้งเตือนได้" });
  }
};

export const markNotificationRead = async (req: AuthRequest, res: Response): Promise<void> => {
  const notificationId = Number(req.params.id);
  const userId = Number(req.user?.userId);
  if (!Number.isInteger(notificationId) || notificationId <= 0) {
    res.status(400).json({ error: "รหัสการแจ้งเตือนไม่ถูกต้อง" });
    return;
  }
  try {
    const updated = await prisma.notification.updateMany({
      where: { id: notificationId, userId },
      data: { readAt: new Date() },
    });
    if (!updated.count) {
      res.status(404).json({ error: "ไม่พบการแจ้งเตือนนี้" });
      return;
    }
    res.status(200).json({ message: "อ่านการแจ้งเตือนแล้ว" });
  } catch (error) {
    console.error("Error marking notification read:", error);
    res.status(500).json({ error: "ไม่สามารถอัปเดตการแจ้งเตือนได้" });
  }
};

export const reviewPasswordResetRequest = async (req: AuthRequest, res: Response): Promise<void> => {
  const requestId = Number(req.params.id);
  const adminId = Number(req.user?.userId);
  const { decision } = req.body;
  if (
    !Number.isInteger(requestId) ||
    requestId <= 0 ||
    (decision !== "APPROVED" && decision !== "REJECTED")
  ) {
    res.status(400).json({ error: "ข้อมูลพิจารณาคำร้องไม่ถูกต้อง" });
    return;
  }

  try {
    const result = await prisma.$transaction(async (transaction: Prisma.TransactionClient) => {
      const request = await transaction.passwordResetRequest.findUnique({
        where: { id: requestId },
        select: { id: true, userId: true, status: true },
      });
      if (!request) return { error: "ไม่พบคำร้องนี้", status: 404 };
      if (request.status !== "PENDING") {
        return { error: "คำร้องนี้ได้รับการพิจารณาแล้ว", status: 409 };
      }

      const updated = await transaction.passwordResetRequest.updateMany({
        where: { id: requestId, status: "PENDING" },
        data: { status: decision, reviewedById: adminId, reviewedAt: new Date() },
      });
      if (updated.count !== 1) {
        return { error: "คำร้องนี้ได้รับการพิจารณาแล้ว", status: 409 };
      }

      await transaction.notification.updateMany({
        where: { passwordResetRequestId: requestId, type: "PASSWORD_RESET_REQUEST" },
        data: { readAt: new Date() },
      });
      await transaction.notification.create({
        data: {
          userId: request.userId,
          passwordResetRequestId: requestId,
          type: decision === "APPROVED" ? "PASSWORD_RESET_APPROVED" : "PASSWORD_RESET_REJECTED",
          title: decision === "APPROVED"
            ? "อนุมัติคำขอรีเซ็ตรหัสผ่านแล้ว"
            : "ไม่อนุมัติคำขอรีเซ็ตรหัสผ่าน",
          message: decision === "APPROVED"
            ? "แอดมินยืนยันคำขอแล้ว กดปุ่มเพื่อไปตั้งรหัสผ่านใหม่"
            : "แอดมินไม่สามารถอนุมัติคำขอได้ หากคิดว่าเกิดข้อผิดพลาด กรุณาติดต่อผู้ดูแลระบบ",
        },
      });
      return { status: decision };
    });

    if ("error" in result) {
      res.status(result.status).json({ error: result.error });
      return;
    }
    res.status(200).json({ status: result.status, message: "บันทึกผลการพิจารณาแล้ว" });
  } catch (error) {
    console.error("Error reviewing password reset request:", error);
    res.status(500).json({ error: "ไม่สามารถบันทึกผลการพิจารณาได้" });
  }
};

const issueResetToken = async (requestId: number): Promise<string | null> => {
  const token = randomBytes(32).toString("hex");
  const updated = await prisma.passwordResetRequest.updateMany({
    where: { id: requestId, status: "APPROVED" },
    data: {
      resetTokenHash: hashToken(token),
      resetTokenExpiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
    },
  });
  return updated.count === 1 ? token : null;
};

export const issueResetTokenFromRequest = async (req: Request, res: Response): Promise<void> => {
  const requestId = Number(req.params.id);
  const accessToken = req.header("X-Reset-Request-Token");
  if (!Number.isInteger(requestId) || requestId <= 0 || !accessToken) {
    res.status(400).json({ error: "คำขอรีเซ็ตรหัสผ่านไม่ถูกต้อง" });
    return;
  }
  try {
    const request = await prisma.passwordResetRequest.findUnique({
      where: { id: requestId },
      select: { accessTokenHash: true },
    });
    if (!request || !tokenMatches(request.accessTokenHash, accessToken)) {
      res.status(404).json({ error: "ไม่พบคำร้องนี้ หรือคำขอติดตามไม่ถูกต้อง" });
      return;
    }
    const resetToken = await issueResetToken(requestId);
    if (!resetToken) {
      res.status(409).json({ error: "คำร้องยังไม่ได้รับการอนุมัติ หรือดำเนินการแล้ว" });
      return;
    }
    res.status(200).json({ resetToken });
  } catch (error) {
    console.error("Error issuing password reset token:", error);
    res.status(500).json({ error: "ไม่สามารถสร้างลิงก์ตั้งรหัสผ่านใหม่ได้" });
  }
};

export const issueResetTokenFromNotification = async (req: AuthRequest, res: Response): Promise<void> => {
  const notificationId = Number(req.params.id);
  const userId = Number(req.user?.userId);
  if (!Number.isInteger(notificationId) || notificationId <= 0) {
    res.status(400).json({ error: "รหัสการแจ้งเตือนไม่ถูกต้อง" });
    return;
  }
  try {
    const notification = await prisma.notification.findFirst({
      where: { id: notificationId, userId, type: "PASSWORD_RESET_APPROVED" },
      select: { passwordResetRequestId: true },
    });
    if (!notification?.passwordResetRequestId) {
      res.status(404).json({ error: "ไม่พบการแจ้งเตือนที่อนุมัติคำขอรีเซ็ตรหัสผ่าน" });
      return;
    }
    const request = await prisma.passwordResetRequest.findFirst({
      where: { id: notification.passwordResetRequestId, userId },
      select: { status: true },
    });
    if (request?.status !== "APPROVED") {
      res.status(409).json({ error: "คำร้องนี้ไม่สามารถรีเซ็ตรหัสผ่านได้แล้ว" });
      return;
    }
    const resetToken = await issueResetToken(notification.passwordResetRequestId);
    if (!resetToken) {
      res.status(409).json({ error: "คำร้องนี้ไม่สามารถรีเซ็ตรหัสผ่านได้แล้ว" });
      return;
    }
    res.status(200).json({ resetToken });
  } catch (error) {
    console.error("Error issuing reset token from notification:", error);
    res.status(500).json({ error: "ไม่สามารถเริ่มรีเซ็ตรหัสผ่านได้" });
  }
};

export const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { resetToken, password } = req.body;
  if (typeof resetToken !== "string" || !/^[a-f0-9]{64}$/.test(resetToken)) {
    res.status(400).json({ error: "คำขอตั้งรหัสผ่านใหม่ไม่ถูกต้องหรือหมดอายุ" });
    return;
  }
  if (typeof password !== "string" || password.length < 8) {
    res.status(400).json({ error: "รหัสผ่านใหม่ต้องมีอย่างน้อย 8 ตัวอักษร" });
    return;
  }

  try {
    const tokenHash = hashToken(resetToken);
    const passwordHash = await bcrypt.hash(password, 10);
    const success = await prisma.$transaction(async (transaction: Prisma.TransactionClient) => {
      const request = await transaction.passwordResetRequest.findFirst({
        where: {
          resetTokenHash: tokenHash,
          status: "APPROVED",
          resetTokenExpiresAt: { gt: new Date() },
        },
        select: { id: true, userId: true },
      });
      if (!request) return false;

      const consumed = await transaction.passwordResetRequest.updateMany({
        where: {
          id: request.id,
          resetTokenHash: tokenHash,
          status: "APPROVED",
          resetTokenExpiresAt: { gt: new Date() },
        },
        data: { status: "COMPLETED", resetTokenHash: null, resetTokenExpiresAt: null },
      });
      if (consumed.count !== 1) return false;

      await transaction.user.update({
        where: { id: request.userId },
        data: { passwordHash },
      });
      await transaction.notification.updateMany({
        where: {
          passwordResetRequestId: request.id,
          type: "PASSWORD_RESET_APPROVED",
        },
        data: { readAt: new Date(), message: "เปลี่ยนรหัสผ่านสำเร็จแล้ว" },
      });
      return true;
    });

    if (!success) {
      res.status(400).json({ error: "คำขอตั้งรหัสผ่านใหม่ไม่ถูกต้องหรือหมดอายุ" });
      return;
    }
    res.status(200).json({ message: "ตั้งรหัสผ่านใหม่สำเร็จ กรุณาเข้าสู่ระบบอีกครั้ง" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ error: "ตั้งรหัสผ่านใหม่ไม่สำเร็จ กรุณาลองอีกครั้ง" });
  }
};
