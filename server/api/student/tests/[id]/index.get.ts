import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event);
    const { id } = getRouterParams(event) as { id: string };

    if (user.role !== "STUDENT") {
      throw createError({ statusCode: 403, message: "Forbidden" });
    }

    const testId = parseInt(id);

    const [test, questions] = await Promise.all([
      prisma.test.findUnique({
        where: { id: testId },
        select: {
          id: true,
          title: true,
          description: true,
          timeLimit: true,
          passingScore: true,
        },
      }),
      prisma.question.findMany({
      where: {
          testId,
      },
      include: {
        options: true,
      },
        orderBy: {
          id: 'asc',
        },
      }),
    ]);

    if (!test || !questions || questions.length === 0) {
      throw createError({ statusCode: 404, message: "Test not found" });
    }

    return {
      test,
      questions,
    };
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: "Internal server error" });
  }
});
