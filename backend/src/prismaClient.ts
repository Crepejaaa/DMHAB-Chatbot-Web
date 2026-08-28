import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";

// โหลดค่าจากไฟล์ .env
dotenv.config();

const connectionString = process.env.DATABASE_URL;

// สร้าง Connection Pool ไปที่ Neon Cloud
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// สร้าง Prisma Client โดยใช้ Adapter
const prisma = new PrismaClient({ adapter });

export default prisma;