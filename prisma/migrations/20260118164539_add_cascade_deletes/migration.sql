-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_optionId_fkey";

-- DropForeignKey
ALTER TABLE "Answers" DROP CONSTRAINT "Answers_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Group" DROP CONSTRAINT "Group_drivingSchoolId_fkey";

-- DropForeignKey
ALTER TABLE "Option" DROP CONSTRAINT "Option_questionId_fkey";

-- DropForeignKey
ALTER TABLE "Question" DROP CONSTRAINT "Question_testId_fkey";

-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_drivingSchoolId_fkey";

-- DropForeignKey
ALTER TABLE "Test" DROP CONSTRAINT "Test_drivingSchoolId_fkey";

-- DropForeignKey
ALTER TABLE "TestResult" DROP CONSTRAINT "TestResult_testId_fkey";

-- DropForeignKey
ALTER TABLE "TestResult" DROP CONSTRAINT "TestResult_userId_fkey";

-- DropForeignKey
ALTER TABLE "Tutorial" DROP CONSTRAINT "Tutorial_drivingSchoolId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_drivingSchoolId_fkey";

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_drivingSchoolId_fkey" FOREIGN KEY ("drivingSchoolId") REFERENCES "DrivingSchool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Test" ADD CONSTRAINT "Test_drivingSchoolId_fkey" FOREIGN KEY ("drivingSchoolId") REFERENCES "DrivingSchool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Question" ADD CONSTRAINT "Question_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Option" ADD CONSTRAINT "Option_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tutorial" ADD CONSTRAINT "Tutorial_drivingSchoolId_fkey" FOREIGN KEY ("drivingSchoolId") REFERENCES "DrivingSchool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_questionId_fkey" FOREIGN KEY ("questionId") REFERENCES "Question"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Answers" ADD CONSTRAINT "Answers_optionId_fkey" FOREIGN KEY ("optionId") REFERENCES "Option"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TestResult" ADD CONSTRAINT "TestResult_testId_fkey" FOREIGN KEY ("testId") REFERENCES "Test"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Subscription" ADD CONSTRAINT "Subscription_drivingSchoolId_fkey" FOREIGN KEY ("drivingSchoolId") REFERENCES "DrivingSchool"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Group" ADD CONSTRAINT "Group_drivingSchoolId_fkey" FOREIGN KEY ("drivingSchoolId") REFERENCES "DrivingSchool"("id") ON DELETE CASCADE ON UPDATE CASCADE;
