import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event);

    if (user.role !== "ADMIN") {
      throw createError({ statusCode: 403, message: "Forbidden" });
    }

    const students = await prisma.user.findMany({
      where: { role: "STUDENT", drivingSchoolId: user.drivingSchoolId },
      orderBy: {
        createdAt: "asc",
      },
      omit: {
        password: true,
        role: true,
      },
    });

    return students;
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: "Internal server error" });
  }
});
