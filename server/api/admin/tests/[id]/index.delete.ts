import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const { id } = getRouterParams(event) as { id: string };
    const user = await getCurrentUser(event);

    if (user.role !== "ADMIN") {
      throw createError({ statusCode: 403, message: "Forbidden" });
    }

    await prisma.testResult.deleteMany({
      where: { testId: parseInt(id) },
    });

    await prisma.test.delete({
      where: { id: parseInt(id) },
    });

    return { success: true };
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: "Internal server error" });
  }
});
