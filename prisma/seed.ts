import { PrismaClient } from "../generated/prisma/client";
import { hashSync } from "bcrypt";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function up() {
  await prisma.user.createMany({
    data: [
      {
        id: 1,
        email: "torvaldsDev@gmail.com",
        login: "linusT",
        fullName: "Linus Torvalds",
        password: hashSync("87654321", 10),
        role: "SUPERADMIN",
      },
      {
        id: 2,
        email: "artificialSam@mail.com",
        login: "samA",
        fullName: "Sam Altman",
        password: hashSync("1235678", 10),
        role: "ADMIN",
      },
      {
        id: 3,
        email: "spaceElon@email.com",
        login: "elonM",
        fullName: "Elon Musk",
        password: hashSync("password", 10),
        role: "USER",
      },
    ],
  });
}

async function down() {
  const tables = [
    "User",
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
