import { prisma } from "~~/prisma/db";
import { getCurrentUser } from "~~/server/utils/session";

export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event);

  if (user.role !== "ADMIN") {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }

  const student = await prisma.user.findUnique({
    where: { id: parseInt(getRouterParams(event).id as string) },
  });

  if (!student) {
    throw createError({ statusCode: 404, message: "Student not found" });
  }

  return student;
});