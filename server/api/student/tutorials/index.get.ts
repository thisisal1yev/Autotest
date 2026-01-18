import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event);

    const tutorials = prisma.tutorial.findMany({
      where: {
        drivingSchoolId: user.drivingSchoolId ?? 0,
      },
      orderBy: {
        createdAt: 'asc'
      }
    });

    return tutorials;
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: "Internal server error" });
  }
});
