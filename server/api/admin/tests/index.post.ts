import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event);

    if (user.role !== "ADMIN") {
      throw createError({ statusCode: 403, message: "Forbidden" });
    }

    const body = await readBody(event);
    const { data } = body;

    const newTest = await prisma.test.create({
      data: {
        title: data.title,
        description: data.description,
        questions: data.questions,
        timeLimit: data.timeLimit,
        drivingSchoolId: user.drivingSchoolId!,
      },
    });

    if (!newTest) {
      throw createError({ statusCode: 400, message: "Test not created" });
    }

    return newTest;
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: "Internal server error" });
  }
});
