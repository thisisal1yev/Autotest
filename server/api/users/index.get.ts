import { prisma } from "../../../prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const users = await prisma.user.findMany();

    return users;
  } catch (err) {
    console.log("Error fetching users:", err);
  }
});
