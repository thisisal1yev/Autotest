import { prisma } from "~~/prisma/db";
import { getCurrentUser } from "~~/server/utils/session";

export default defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event);

    if (user.role !== "ADMIN") {
      throw createError({ statusCode: 403, message: "Forbidden" });
    }

    const query = getQuery(event);
    const schoolId = query.schoolId
      ? parseInt(query.schoolId as string)
      : user.drivingSchoolId;

    const where = schoolId ? { drivingSchoolId: schoolId } : {};

    const tutorials = await prisma.tutorial.findMany({
      where,
      include: {
        drivingSchool: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return tutorials;
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: "Internal server error" });
  }
});
