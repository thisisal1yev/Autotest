// prisma/seed.ts
import { PrismaPg } from "@prisma/adapter-pg";
import { hashSync } from "bcrypt";
import { PrismaClient } from "../generated/prisma/client";
import { addMonths, addDays } from "date-fns";
import {
  USERS,
  DRIVING_SCHOOLS,
  SUBSCRIPTIONS,
  GROUPS,
  QUESTIONS,
  TESTS,
  TUTORIALS,
  TEST_RESULTS,
  type QuestionKey,
} from "./constants";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// Store created entity IDs for relationships
const createdIds = {
  drivingSchools: [] as number[],
  students: [] as number[],
  tests: [] as { id: number; questionIds: number[] }[],
};

// Helper functions
const hashPassword = (password: string) => hashSync(password, 10);

const getSchoolId = (index: number) => createdIds.drivingSchools[index - 1];

const createSubscriptionDates = (config: typeof SUBSCRIPTIONS[number]) => {
  const now = new Date();
  return {
    startDate: config.startMonthsAgo ? addMonths(now, -config.startMonthsAgo) : now,
    endDate: "endMonthsFromNow" in config && config.endMonthsFromNow
      ? addMonths(now, config.endMonthsFromNow)
      : "endDaysFromNow" in config && config.endDaysFromNow
        ? addDays(now, config.endDaysFromNow)
        : undefined,
    trialEndDate: "trialDaysFromNow" in config && config.trialDaysFromNow
      ? addDays(now, config.trialDaysFromNow)
      : undefined,
  };
};

const buildQuestionData = (key: QuestionKey) => {
  const q = QUESTIONS[key];
  return {
    title: q.title,
    imgPath: q.imgPath,
    comment: q.comment,
    options: {
      create: q.options.map((opt) => ({
        answerOption: opt.answerOption,
        isCorrect: opt.isCorrect,
      })),
    },
  };
};

// Seed functions
async function seedSuperAdmin() {
  console.log("🔑 Creating superadmin...");
  await prisma.user.create({
    data: {
      ...USERS.superadmin,
      password: hashPassword(USERS.superadmin.password),
    },
  });
}

async function seedDrivingSchools() {
  console.log("🏫 Creating driving schools...");
  for (const school of DRIVING_SCHOOLS) {
    const created = await prisma.drivingSchool.create({
      data: { ...school },
    });
    createdIds.drivingSchools.push(created.id);
  }
}

async function seedSubscriptions() {
  console.log("💳 Creating subscriptions...");
  for (const sub of SUBSCRIPTIONS) {
    const dates = createSubscriptionDates(sub);
    await prisma.subscription.create({
      data: {
        drivingSchoolId: getSchoolId(sub.drivingSchoolId),
        plan: sub.plan,
        status: sub.status,
        price: sub.price,
        currency: sub.currency,
        autoRenewal: sub.autoRenewal,
        paymentMethod: "paymentMethod" in sub ? sub.paymentMethod : undefined,
        ...dates,
      },
    });
  }
}

async function seedAdmins() {
  console.log("🛡️ Creating admins...");
  for (const admin of USERS.admins) {
    await prisma.user.create({
      data: {
        ...admin,
        drivingSchoolId: getSchoolId(admin.drivingSchoolId),
        password: hashPassword(admin.password),
      },
    });
  }
}

async function seedStudents() {
  console.log("🎓 Creating students...");
  for (const student of USERS.students) {
    const created = await prisma.user.create({
      data: {
        ...student,
        drivingSchoolId: getSchoolId(student.drivingSchoolId),
        role: "STUDENT" as const,
        password: hashPassword(student.password),
      },
    });
    createdIds.students.push(created.id);
  }
}

async function seedGroups() {
  console.log("👥 Creating groups...");
  for (const group of GROUPS) {
    // Map original student indices (1-based) to actual created IDs
    const studentIds = group.studentIds.map((idx) => createdIds.students[idx - 1]);
    await prisma.group.create({
      data: {
        name: group.name,
        description: group.description,
        drivingSchoolId: getSchoolId(group.drivingSchoolId),
        students: {
          connect: studentIds.map((id) => ({ id })),
        },
      },
    });
  }
}

async function seedTests() {
  console.log("📝 Creating tests...");
  for (const test of TESTS) {
    const created = await prisma.test.create({
      data: {
        title: test.title,
        description: test.description,
        timeLimit: test.timeLimit,
        passingScore: test.passingScore,
        drivingSchoolId: getSchoolId(test.drivingSchoolId),
        questions: {
          create: test.questionKeys.map((key) => buildQuestionData(key)),
        },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });
    createdIds.tests.push({
      id: created.id,
      questionIds: created.questions.map((q) => q.id),
    });
  }
}

async function seedTutorials() {
  console.log("📹 Creating tutorials...");
  for (const tutorial of TUTORIALS) {
    await prisma.tutorial.create({
      data: {
        title: tutorial.title,
        description: tutorial.description,
        videoUrl: tutorial.videoUrl,
        thumbnailUrl: tutorial.thumbnailUrl,
        duration: tutorial.duration,
        order: tutorial.order,
        drivingSchoolId: getSchoolId(tutorial.drivingSchoolId),
      },
    });
  }
}

async function seedTestResults() {
  console.log("📊 Creating test results with answers...");
  
  for (const result of TEST_RESULTS) {
    const studentId = createdIds.students[result.studentIndex - 1];
    const testData = createdIds.tests[result.testIndex - 1];
    
    // Get questions with options for this test
    const questions = await prisma.question.findMany({
      where: { testId: testData.id },
      include: { options: true },
    });

    // Create test result with answers
    await prisma.testResult.create({
      data: {
        userId: studentId,
        testId: testData.id,
        score: result.score,
        passed: result.passed,
        timeSpent: result.timeSpent,
        completedAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000), // Random time in last 7 days
        answers: {
          create: questions.map((question, index) => {
            // Simulate answering - correct answers based on score probability
            const shouldBeCorrect = Math.random() * 100 < result.score;
            const correctOption = question.options.find((o) => o.isCorrect);
            const wrongOptions = question.options.filter((o) => !o.isCorrect);
            const randomWrongOption = wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
            
            const selectedOption = shouldBeCorrect ? correctOption : randomWrongOption;
            
            return {
              questionId: question.id,
              optionId: selectedOption?.id ?? null,
              isCorrect: selectedOption?.isCorrect ?? false,
              order: index + 1,
              timeSpent: Math.floor(result.timeSpent / questions.length) + Math.floor(Math.random() * 30 - 15),
            };
          }),
        },
      },
    });
  }
}

// Main seed function
async function up() {
  console.log("🌱 Starting seed process...\n");

  await seedSuperAdmin();
  await seedDrivingSchools();
  await seedSubscriptions();
  await seedAdmins();
  await seedStudents();
  await seedGroups();
  await seedTests();
  await seedTutorials();
  await seedTestResults();

  console.log("\n✅ Seed completed successfully!");
}

async function down() {
  console.log("🧹 Cleaning database...\n");

  // Delete in reverse order of dependencies
  await prisma.answers.deleteMany();
  await prisma.testResult.deleteMany();
  await prisma.option.deleteMany();
  await prisma.question.deleteMany();
  await prisma.test.deleteMany();
  await prisma.group.deleteMany();
  await prisma.tutorial.deleteMany();
  await prisma.subscription.deleteMany();
  await prisma.user.deleteMany();
  await prisma.drivingSchool.deleteMany();

  console.log("✅ Database cleaned!\n");
}

async function main() {
  const args = process.argv.slice(2);
  
  try {
    if (args.includes("--down") || args.includes("-d")) {
      await down();
    } else if (args.includes("--seed-only") || args.includes("-s")) {
      // Seed without cleaning (original behavior)
      await up();
    } else {
      // Default: always reset (clean + seed)
      await down();
      await up();
    }
  } catch (error) {
    console.error("❌ Seed failed:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();