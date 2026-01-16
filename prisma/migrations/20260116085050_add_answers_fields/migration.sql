/*
  Warnings:

  - You are about to drop the column `answers` on the `TestResult` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "TestResult" DROP COLUMN "answers",
ADD COLUMN     "timeSpent" INTEGER;

-- CreateTable
CREATE TABLE "Answers" (
    "id" SERIAL NOT NULL,
    "testResultId" INTEGER NOT NULL,
    "questionId" INTEGER NOT NULL,
    "optionId" INTEGER,
    "isCorrect" BOOLEAN,
    "order" INTEGER NOT NULL DEFAULT 0,
    "timeSpent" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Answers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Answers_testResultId_idx" ON "Answers"("testResultId");

-- CreateIndex
CREATE INDEX "Answers_questionId_idx" ON "Answers"("questionId");

-- CreateIndex
CREATE INDEX "Answers_optionId_idx" ON "Answers"("optionId");

-- CreateIndex
CREATE UNIQUE INDEX "Answers_testResultId_questionId_key" ON "Answers"("testResultId", "questionId");

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_testResultId_fkey" FOREIGN KEY ("testResultId") REFERENCES "TestResult"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE SET NULL ON UPDATE CASCADE;
