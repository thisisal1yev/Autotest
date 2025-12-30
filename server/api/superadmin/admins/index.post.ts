import { prisma } from "~~/prisma/db";
import { getCurrentUser } from "~~/server/utils/session";

export default defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event);

    if (user.role !== "SUPERADMIN") {
      throw createError({ statusCode: 403, message: "Forbidden" });
    }

    const body = await readBody(event);
    const { email, login, fullName, password } = body;
    const drivingSchoolId = null;

    const newAdmin = await prisma.user.create({
      data: {
        email,
        login,
        fullName,
        password,
        role: "ADMIN",
        drivingSchoolId,
      },
    });

    if (!newAdmin) {
      throw createError({ statusCode: 400, message: "Admin not created" });
    }

    return newAdmin;
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: "Internal server error" });
  }
});
