
import path from "path";
import dotenv from "dotenv";
import { defineConfig } from "prisma/config";

dotenv.config({ path: path.resolve(process.cwd(), "src/.env") });

export default defineConfig({
  schema: "prisma/schema.prisma",
});