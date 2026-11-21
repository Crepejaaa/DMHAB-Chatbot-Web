-- CreateTable (ตารางใหม่ของหน้า Daily Check-in โดยเฉพาะ ไม่แก้ไขตารางอื่น)
CREATE TABLE IF NOT EXISTS "DailyCheckin" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "dateKey" TEXT NOT NULL,
    "moodScore" INTEGER NOT NULL,
    "moodLabel" TEXT,
    "energy" INTEGER NOT NULL DEFAULT 5,
    "stress" INTEGER NOT NULL DEFAULT 5,
    "social" INTEGER NOT NULL DEFAULT 5,
    "note" TEXT,
    "tags" JSONB NOT NULL DEFAULT '[]',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyCheckin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX IF NOT EXISTS "DailyCheckin_userId_dateKey_key" ON "DailyCheckin"("userId", "dateKey");
CREATE INDEX IF NOT EXISTS "DailyCheckin_userId_createdAt_idx" ON "DailyCheckin"("userId", "createdAt");

-- AddForeignKey
DO $$ BEGIN
  ALTER TABLE "DailyCheckin" ADD CONSTRAINT "DailyCheckin_userId_fkey"
    FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

