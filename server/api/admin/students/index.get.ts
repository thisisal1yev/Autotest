import { prisma } from "~~/prisma/db";
import { getCurrentUser } from "~~/server/utils/session";

export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event);

  if (user.role !== "ADMIN") {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }

  const students = await prisma.user.findMany({
    where: { role: "USER" },
    include: {
      drivingSchool: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return students;
});