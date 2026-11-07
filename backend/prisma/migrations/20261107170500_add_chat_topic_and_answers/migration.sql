-- AlterTable
ALTER TABLE "ChatSession" ADD COLUMN     "topic" TEXT;

-- CreateTable
CREATE TABLE "ChatAnswer" (
    "id" SERIAL NOT NULL,
    "sessionId" INTEGER NOT NULL,
    "questionNo" INTEGER NOT NULL,
    "questionText" TEXT NOT NULL,
    "answerText" TEXT NOT NULL,
    "score" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ChatAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ChatAnswer_sessionId_idx" ON "ChatAnswer"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "ChatAnswer_sessionId_questionNo_key" ON "ChatAnswer"("sessionId", "questionNo");

-- AddForeignKey
ALTER TABLE "ChatAnswer" ADD CONSTRAINT "ChatAnswer_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "ChatSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

