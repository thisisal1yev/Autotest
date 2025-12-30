import { PrismaClient } from "../generated/prisma/client";
import { hashSync } from "bcrypt";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function up() {
  const drivingSchool = await prisma.drivingSchool.create({
    data: {
      name: "Elite Driving School",
      email: "info@elitedriving.com",
      phone: "+1234567890",
      address: "123 Main Street, City",
    },
  });

  await prisma.user.create({
    data: {
      email: "torvaldsDev@gmail.com",
      login: "linusT",
      fullName: "Linus Torvalds",
      password: hashSync("87654321", 10),
      role: "SUPERADMIN",
      drivingSchoolId: null,
    },
  });

  await prisma.user.create({
    data: {
      email: "artificialSam@mail.com",
      login: "samA",
      fullName: "Sam Altman",
      password: hashSync("1235678", 10),
      role: "ADMIN",
      drivingSchoolId: drivingSchool.id,
    },
  });

  const student1 = await prisma.user.create({
    data: {
      email: "spaceElon@email.com",
      login: "elonM",
      fullName: "Elon Musk",
      password: hashSync("password", 10),
      role: "USER",
      drivingSchoolId: drivingSchool.id,
    },
  });

  const student2 = await prisma.user.create({
    data: {
      email: "student2@example.com",
      login: "student2",
      fullName: "John Doe",
      password: hashSync("password", 10),
      role: "USER",
      drivingSchoolId: drivingSchool.id,
    },
  });

  const test = await prisma.test.create({
    data: {
      title: "Basic Traffic Rules Test",
      description: "Test your knowledge of basic traffic rules",
      questions: [
        {
          id: "1",
          text: "What does a red traffic light mean?",
          type: "single",
          options: [
            { id: "a", text: "Stop", isCorrect: true },
            { id: "b", text: "Go", isCorrect: false },
            { id: "c", text: "Slow down", isCorrect: false },
          ],
          points: 10,
        },
        {
          id: "2",
          text: "Which of the following are required for safe driving?",
          type: "multiple",
          options: [
            { id: "a", text: "Seat belt", isCorrect: true },
            { id: "b", text: "Valid license", isCorrect: true },
            { id: "c", text: "Music player", isCorrect: false },
          ],
          points: 10,
        },
      ],
      timeLimit: 30,
      passingScore: 60,
      drivingSchoolId: drivingSchool.id,
    },
  });

  await prisma.tutorial.create({
    data: {
      title: "Introduction to Driving",
      description: "Learn the basics of driving",
      videoUrl: "https://example.com/video1.mp4",
      thumbnailUrl: "https://example.com/thumb1.jpg",
      duration: 600,
      order: 1,
      drivingSchoolId: drivingSchool.id,
    },
  });

  await prisma.testResult.createMany({
    data: [
      {
        userId: student1.id,
        testId: test.id,
        score: 85,
        answers: {
          "1": "a",
          "2": ["a", "b"],
        },
        passed: true,
      },
      {
        userId: student2.id,
        testId: test.id,
        score: 100,
        answers: {
          "1": "a",
          "2": ["a", "b"],
        },
        passed: true,
      },
    ],
  });
}

async function down() {
  const tables = ["TestResult", "Tutorial", "Test", "User", "DrivingSchool"];

  for (const t of tables) {
    await prisma.$executeRawUnsafe(
      `TRUNCATE TABLE "${t}" RESTART IDENTITY CASCADE`
    );
  }
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
