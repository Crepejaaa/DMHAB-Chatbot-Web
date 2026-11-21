-- AlterTable
ALTER TABLE "ChatSession" ADD COLUMN     "openingTurns" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "mode" TEXT,
ADD COLUMN     "phase" TEXT;

-- AlterTable
ALTER TABLE "ChatAnswer" ADD COLUMN     "scaleKey" TEXT;

-- CreateTable
CREATE TABLE "ScaleResult" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "topic" TEXT NOT NULL,
    "scaleKey" TEXT NOT NULL,
    "totalScore" INTEGER NOT NULL,
    "level" TEXT NOT NULL,
    "answers" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ScaleResult_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ScaleResult_userId_topic_createdAt_idx" ON "ScaleResult"("userId", "topic", "createdAt");

-- CreateIndex
CREATE INDEX "ScaleResult_sessionId_idx" ON "ScaleResult"("sessionId");

-- AddForeignKey
ALTER TABLE "ScaleResult" ADD CONSTRAINT "ScaleResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ScaleResult" ADD CONSTRAINT "ScaleResult_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ChatSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;
