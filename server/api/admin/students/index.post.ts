import { prisma } from "~~/prisma/db";
import { getCurrentUser } from "~~/server/utils/session";

export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event);

  if (user.role !== "ADMIN") {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }

  const body = await readBody(event);
  const { email, login, fullName, password } = body;

  const newStudent = await prisma.user.create({
    data: { email, login, fullName, password, role: "USER", drivingSchoolId: null },
  });

  if (!newStudent) {
    throw createError({ statusCode: 400, message: "Student not created" });
  }

  return newStudent;
});