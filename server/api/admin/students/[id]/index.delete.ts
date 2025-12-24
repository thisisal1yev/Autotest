import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const user = await getCurrentUser(event);

  if (user.role !== "ADMIN") {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }

  await prisma.testResult.deleteMany({
    where: { userId: parseInt(id) },
  });

  const student = await prisma.user.delete({
    where: { id: parseInt(id) },
  });

  if (!student) {
    throw createError({ statusCode: 400, message: "Student not deleted" });
  }

  return { success: true };
});
