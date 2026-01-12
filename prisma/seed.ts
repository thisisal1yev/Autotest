import { PrismaPg } from "@prisma/adapter-pg";
import { hashSync } from "bcrypt";
import { PrismaClient } from "../generated/prisma/client";
import { addMonths, addDays } from "date-fns";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function up() {
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

  await prisma.drivingSchool.createMany({
    data: [
      {
        name: "Elite Driving School",
        email: "info@elitedriving.com",
        phone: "+1234567890",
        address: "123 Main Street, City",
      },
      {
        name: "City Driving Academy",
        email: "contact@citydriving.com",
        phone: "+1987654321",
        address: "456 Oak Avenue, Downtown",
      },
      {
        name: "Highway Driving School",
        email: "hello@highwaydriving.com",
        phone: "+1555123456",
        address: "789 Highway Road, Suburb",
      },
    ],
  });

  // Create Subscriptions
  const now = new Date();

  await prisma.subscription.create({
    data: {
      drivingSchoolId: 1,
      plan: "PREMIUM",
      status: "ACTIVE",
      startDate: addMonths(now, -3),
      endDate: addMonths(now, 9),
      price: 249.0,
      currency: "USD",
      autoRenewal: true,
      paymentMethod: "credit_card",
    },
  });

  await prisma.subscription.create({
    data: {
      drivingSchoolId: 2,
      plan: "STANDARD",
      status: "ACTIVE",
      startDate: addMonths(now, -1),
      endDate: addMonths(now, 11),
      trialEndDate: addDays(now, 14),
      price: 99.0,
      currency: "USD",
      autoRenewal: true,
      paymentMethod: "credit_card",
    },
  });

  await prisma.subscription.create({
    data: {
      drivingSchoolId: 3,
      plan: "FREE",
      status: "TRIAL",
      startDate: now,
      endDate: addDays(now, 30),
      trialEndDate: addDays(now, 30),
      price: 0.0,
      currency: "USD",
      autoRenewal: false,
    },
  });

  await prisma.user.createMany({
    data: [
      {
        email: "artificialSam@mail.com",
        login: "samA",
        fullName: "Sam Altman",
        password: hashSync("1235678", 10),
        role: "ADMIN",
        drivingSchoolId: 1,
      },
      {
        email: "admin2@citydriving.com",
        login: "admin2",
        fullName: "Jane Smith",
        password: hashSync("password", 10),
        role: "ADMIN",
        drivingSchoolId: 2,
      },
      {
        email: "admin3@highwaydriving.com",
        login: "admin3",
        fullName: "Bob Johnson",
        password: hashSync("password", 10),
        role: "ADMIN",
        drivingSchoolId: 3,
      },
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        email: "spaceElon@email.com",
        login: "elonM",
        fullName: "Elon Musk",
        password: hashSync("password", 10),
        role: "STUDENT",
        drivingSchoolId: 1,
      },
      {
        email: "student2@example.com",
        login: "student2",
        fullName: "John Doe",
        password: hashSync("password", 10),
        role: "STUDENT",
        drivingSchoolId: 1,
      },
      {
        email: "student3@example.com",
        login: "student3",
        fullName: "Alice Williams",
        password: hashSync("password", 10),
        role: "STUDENT",
        drivingSchoolId: 1,
      },
      {
        email: "student4@example.com",
        login: "student4",
        fullName: "Michael Brown",
        password: hashSync("password", 10),
        role: "STUDENT",
        drivingSchoolId: 1,
      },
    ],
  });

  await prisma.user.createMany({
    data: [
      {
        email: "student5@example.com",
        login: "student5",
        fullName: "Sarah Davis",
        password: hashSync("password", 10),
        role: "STUDENT",
        drivingSchoolId: 2,
      },
      {
        email: "student6@example.com",
        login: "student6",
        fullName: "David Wilson",
        password: hashSync("password", 10),
        role: "STUDENT",
        drivingSchoolId: 2,
      },
      {
        email: "student7@example.com",
        login: "student7",
        fullName: "Emma Martinez",
        password: hashSync("password", 10),
        role: "STUDENT",
        drivingSchoolId: 2,
      },
      {
        email: "student8@example.com",
        login: "student8",
        fullName: "James Taylor",
        password: hashSync("password", 10),
        role: "STUDENT",
        drivingSchoolId: 3,
      },
      {
        email: "student9@example.com",
        login: "student9",
        fullName: "Olivia Anderson",
        password: hashSync("password", 10),
        role: "STUDENT",
        drivingSchoolId: 3,
      },
      {
        email: "student10@example.com",
        login: "student10",
        fullName: "Noah Thomas",
        password: hashSync("password", 10),
        role: "STUDENT",
        drivingSchoolId: 3,
      },
    ],
  });

  await prisma.group.create({
    data: {
      name: "Beginner Group A",
      description: "First-time drivers learning basics",
      drivingSchoolId: 1,
      students: {
        connect: [{ id: 1 }, { id: 2 }],
      },
    },
  });

  await prisma.group.create({
    data: {
      name: "Advanced Group B",
      description: "Experienced students preparing for exams",
      drivingSchoolId: 1,
      students: {
        connect: [{ id: 3 }, { id: 4 }],
      },
    },
  });

  await prisma.group.create({
    data: {
      name: "Weekend Group",
      description: "Students learning on weekends",
      drivingSchoolId: 2,
      students: {
        connect: [{ id: 5 }, { id: 6 }, { id: 7 }],
      },
    },
  });

  await prisma.group.create({
    data: {
      name: "Evening Group",
      description: "Evening classes for working students",
      drivingSchoolId: 3,
      students: {
        connect: [{ id: 8 }, { id: 9 }, { id: 9 }],
      },
    },
  });

  await prisma.test.create({
    data: {
      title: "Basic Traffic Rules Test",
      description: "Test your knowledge of basic traffic rules",
      timeLimit: 15,
      passingScore: 70,
      drivingSchoolId: 1,
      questions: {
        create: [
          {
            title: "CHORRAHADAN BIRINCHI BO'LIB KIM O'TADI?",
            imgPath: "/images/question.jpg",
            comment: `Bu tartiblanmagan chorrahada svetofor va yo'l belgilari yo'q, shuning uchun "o'ng qo'l qoidasi" amal qiladi — har bir haydovchi o'ng tomonidan yaqinlashayotgan transport vositasiga yo'l berishi shart.Har bir mashinaning o'ng tomoniga qarang: kimning o'ng tomoni bo'sh bo'lsa — o'sha birinchi o'tadi, chunki u hech kimga yo'l berishi shart emas.Shuningdek, esda tuting: chapga burilayotgan haydovchi qarshidan to'g'riga ketayotgan transport vositasiga yo'l berishi kerak.Shu ikki qoidani birga qo'llab, har bir mashinaning vaziyatini tahlil qiling.`,
            options: {
              create: [
                { answerOption: "QIZIL AVTAMOBIL", isCorrect: false },
                { answerOption: "KO'K AVTAMOBIL", isCorrect: false },
                { answerOption: "SARIQ AVTAMOBIL", isCorrect: false },
                { answerOption: "YASHIL AVTAMOBIL", isCorrect: true },
              ],
            },
          },
          {
            title:
              "Qaysi avtamobil uchun bu belgilarning ta'sir oralig'ida to'xtashga ruxsat etiladi?",
            imgPath: "/images/question_1.jpg",
            comment: "Green means go",
            options: {
              create: [
                { answerOption: "Qizilga", isCorrect: false },
                { answerOption: "Ikkala avtamobilga", isCorrect: false },
                { answerOption: "Hech qaysi biriga", isCorrect: false },
                {
                  answerOption:
                    '"Nogiron" taniqlik belgisi bo\'lgan sariq avtamobilga',
                  isCorrect: true,
                },
              ],
            },
          },
          {
            title: "What does a yellow traffic light mean?",
            imgPath: "/images/traffic-light-yellow.jpg",
            comment: "Yellow means caution",
            options: {
              create: [
                { answerOption: "Caution", isCorrect: true },
                { answerOption: "Go", isCorrect: false },
                { answerOption: "Stop", isCorrect: false },
                { answerOption: "Nothing", isCorrect: false },
              ],
            },
          },
          {
            title: "What is the speed limit in residential areas?",
            imgPath: "/images/speed-limit-residential.jpg",
            comment: "Usually 30 km/h or 20 mph",
            options: {
              create: [
                { answerOption: "50 km/h", isCorrect: false },
                { answerOption: "30 km/h", isCorrect: true },
                { answerOption: "70 km/h", isCorrect: false },
                { answerOption: "100 km/h", isCorrect: false },
              ],
            },
          },
          {
            title: "When should you use your turn signals?",
            imgPath: "/images/turn-signals.jpg",
            comment: "Always before turning or changing lanes",
            options: {
              create: [
                { answerOption: "Only on highways", isCorrect: false },
                {
                  answerOption: "Before turning or changing lanes",
                  isCorrect: true,
                },
                { answerOption: "Only in cities", isCorrect: false },
                { answerOption: "Never", isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.test.create({
    data: {
      title: "Parking Rules Test",
      description: "Test your knowledge of parking regulations",
      timeLimit: 20,
      passingScore: 75,
      drivingSchoolId: 1,
      questions: {
        create: [
          {
            title: "How far from a fire hydrant can you park?",
            imgPath: "/images/fire-hydrant.jpg",
            comment: "Minimum 3 meters or 10 feet",
            options: {
              create: [
                { answerOption: "1 meter", isCorrect: false },
                { answerOption: "3 meters", isCorrect: true },
                { answerOption: "5 meters", isCorrect: false },
                { answerOption: "No restriction", isCorrect: false },
              ],
            },
          },
          {
            title: "Can you park in a disabled parking space?",
            imgPath: "/images/disabled-parking.jpg",
            comment: "Only with a valid disabled permit",
            options: {
              create: [
                { answerOption: "Yes, always", isCorrect: false },
                { answerOption: "Only with a permit", isCorrect: true },
                { answerOption: "After 6 PM", isCorrect: false },
                { answerOption: "Never", isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.test.create({
    data: {
      title: "Highway Driving Test",
      description: "Test your knowledge of highway driving rules",
      timeLimit: 25,
      passingScore: 80,
      drivingSchoolId: 2,
      questions: {
        create: [
          {
            title: "What is the minimum safe following distance?",
            imgPath: "/images/following-distance.jpg",
            comment: "At least 2 seconds in good conditions",
            options: {
              create: [
                { answerOption: "1 second", isCorrect: false },
                { answerOption: "2 seconds", isCorrect: true },
                { answerOption: "5 seconds", isCorrect: false },
                { answerOption: "No minimum", isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.test.create({
    data: {
      title: "City Driving Basics",
      description: "Basic city driving rules and regulations",
      timeLimit: 15,
      passingScore: 70,
      drivingSchoolId: 3,
      questions: {
        create: [
          {
            title: "What should you do at a stop sign?",
            imgPath: "/images/stop-sign.jpg",
            comment: "Come to a complete stop",
            options: {
              create: [
                { answerOption: "Slow down", isCorrect: false },
                { answerOption: "Come to a complete stop", isCorrect: true },
                { answerOption: "Yield", isCorrect: false },
                { answerOption: "Continue", isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });

  await prisma.tutorial.createMany({
    data: [
      {
        title: "Introduction to Driving",
        description: "Learn the basics of driving",
        videoUrl: "https://example.com/video1.mp4",
        thumbnailUrl: "https://example.com/thumb1.jpg",
        duration: 600,
        order: 1,
        drivingSchoolId: 1,
      },
      {
        title: "Traffic Signs and Signals",
        description: "Understanding road signs and traffic signals",
        videoUrl: "https://example.com/video2.mp4",
        thumbnailUrl: "https://example.com/thumb2.jpg",
        duration: 720,
        order: 2,
        drivingSchoolId: 1,
      },
      {
        title: "Parking Techniques",
        description: "Master parallel and perpendicular parking",
        videoUrl: "https://example.com/video3.mp4",
        thumbnailUrl: "https://example.com/thumb3.jpg",
        duration: 900,
        order: 3,
        drivingSchoolId: 1,
      },
      {
        title: "Highway Driving Basics",
        description: "Safe driving on highways and freeways",
        videoUrl: "https://example.com/video4.mp4",
        thumbnailUrl: "https://example.com/thumb4.jpg",
        duration: 840,
        order: 1,
        drivingSchoolId: 2,
      },
      {
        title: "City Navigation",
        description: "Navigating busy city streets",
        videoUrl: "https://example.com/video5.mp4",
        thumbnailUrl: "https://example.com/thumb5.jpg",
        duration: 660,
        order: 1,
        drivingSchoolId: 3,
      },
    ],
  });

  await prisma.testResult.createMany({
    data: [
      {
        userId: 1,
        testId: 1,
        score: 85,
        answers: { 1: "a", 2: "b", 3: "a", 4: "b", 5: "b" },
        passed: true,
        completedAt: addDays(now, -5),
      },
      {
        userId: 2,
        testId: 1,
        score: 100,
        answers: { 1: "a", 2: "b", 3: "a", 4: "b", 5: "b" },
        passed: true,
        completedAt: addDays(now, -4),
      },
      {
        userId: 3,
        testId: 1,
        score: 65,
        answers: { 1: "a", 2: "c", 3: "a", 4: "a", 5: "b" },
        passed: false,
        completedAt: addDays(now, -3),
      },
      {
        userId: 1,
        testId: 2,
        score: 90,
        answers: { 1: "b", 2: "b" },
        passed: true,
        completedAt: addDays(now, -2),
      },
      {
        userId: 4,
        testId: 1,
        score: 75,
        answers: { 1: "a", 2: "b", 3: "a", 4: "b", 5: "b" },
        passed: true,
        completedAt: addDays(now, -1),
      },
    ],
  });

  await prisma.testResult.createMany({
    data: [
      {
        userId: 5,
        testId: 3,
        score: 80,
        answers: { 1: "b" },
        passed: true,
        completedAt: addDays(now, -6),
      },
      {
        userId: 6,
        testId: 3,
        score: 95,
        answers: { 1: "b" },
        passed: true,
        completedAt: addDays(now, -5),
      },
      {
        userId: 7,
        testId: 3,
        score: 70,
        answers: { 1: "b" },
        passed: false,
        completedAt: addDays(now, -4),
      },
    ],
  });

  await prisma.testResult.createMany({
    data: [
      {
        userId: 8,
        testId: 4,
        score: 85,
        answers: { 1: "b" },
        passed: true,
        completedAt: addDays(now, -7),
      },
      {
        userId: 9,
        testId: 4,
        score: 90,
        answers: { 1: "b" },
        passed: true,
        completedAt: addDays(now, -6),
      },
      {
        userId: 9,
        testId: 4,
        score: 60,
        answers: { 1: "a" },
        passed: false,
        completedAt: addDays(now, -5),
      },
    ],
  });
}

async function down() {
  const tables = [
    "TestResult",
    "Tutorial",
    "Test",
    "Question",
    "Option",
    "Group",
    "Subscription",
    "User",
    "DrivingSchool",
  ];

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
    console.log("Seed completed successfully!");
  } catch (e) {
    console.error("Seed error:", e);
    throw e;
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
