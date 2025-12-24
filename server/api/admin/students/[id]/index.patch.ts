import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event);
  const body = await readBody(event);
  const { id } = getRouterParams(event);
  const { fullName, email, login, drivingSchoolId } = body;

  if (user.role !== "ADMIN") {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }

  const student = await prisma.user.update({
    where: { id: parseInt(id) },
    data: {
      fullName: fullName,
      email: email,
      login: login,
      drivingSchoolId: drivingSchoolId,
    },
  });

  if (!student) {
    throw createError({ statusCode: 400, message: "Student not updated" });
  }

  return student;
});
