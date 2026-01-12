import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event);

    const tests = prisma.test.findMany({
      where: {
        drivingSchoolId: user.drivingSchoolId ?? 0,
      },
    });

    return tests
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: "Internal server error" });
  }
});
