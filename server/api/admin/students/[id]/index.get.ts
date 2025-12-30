import { prisma } from "~~/prisma/db";
import { getCurrentUser } from "~~/server/utils/session";

export default defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event);
    const { id } = getRouterParams(event);

    if (user.role !== "ADMIN") {
      throw createError({ statusCode: 403, message: "Forbidden" });
    }

    const student = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        drivingSchool: true,
      },
      omit: {
        password: true,
        role: true,
      },
    });

    if (!student) {
      throw createError({ statusCode: 404, message: "Student not found" });
    }

    return student;
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: "Internal server error" });
  }
});
