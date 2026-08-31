import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.resolve(__dirname, ".env") });

const connectionString = process.env.DATABASE_URL;

let prisma: any;

try {
  const { PrismaClient } = require("@prisma/client");
  const { Pool } = require("pg");
  const { PrismaPg } = require("@prisma/adapter-pg");

  const pool = connectionString ? new Pool({ connectionString }) : null;
  const adapter = pool ? new PrismaPg(pool) : undefined;

  prisma = new PrismaClient({ ...(adapter ? { adapter } : {}) });
} catch (error) {
  console.warn("Prisma client is unavailable. Using fallback mock data for the app.");
  prisma = {
    user: {
      findFirst: async () => null,
      findUnique: async () => null,
      create: async (data: any) => ({ id: 1, ...data })
    },
    article: {
      findMany: async () => [],
      findFirst: async () => null,
      create: async (data: any) => ({ id: 1, ...data })
    },
    chatSession: { findMany: async () => [] },
    testResult: { findMany: async () => [] },
    systemLog: { create: async () => ({}) }
  };
}

export default prisma;