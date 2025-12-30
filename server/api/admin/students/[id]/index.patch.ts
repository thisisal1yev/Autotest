import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event);
    const { data } = await readBody(event);
    const { id } = getRouterParams(event);
    console.log(data);

    if (user.role !== "ADMIN") {
      throw createError({ statusCode: 403, message: "Forbidden" });
    }

    const student = await prisma.user.update({
      where: { id: parseInt(id) },
      data: {
        fullName: data.fullName,
        email: data.email,
        login: data.login,
      },
      include: {
        drivingSchool: true,
      },
      omit: {
        password: true,
        role: true,
      },
    });

    if (!student) {
      throw createError({ statusCode: 400, message: "Student not updated" });
    }

    return student;
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: "Internal server error" });
  }
});
