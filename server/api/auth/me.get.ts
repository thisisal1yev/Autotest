import { prisma } from "~~/prisma/db";

export default defineEventHandler(async (event) => {
  try {
    const session = await getUserSession(event);

    if (!session?.user) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    const userId = (session.user as any).id;
    if (!userId) {
      throw createError({
        statusCode: 401,
        message: "Unauthorized",
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        drivingSchool: true,
      },
    });

    if (!user || !user.isActive) {
      throw createError({
        statusCode: 401,
        message: "User not found or inactive",
      });
    }

    return {
      user: {
        id: user.id,
        email: user.email,
        login: user.login,
        fullName: user.fullName,
        role: user.role,
        drivingSchoolId: user.drivingSchoolId,
        drivingSchool: user.drivingSchool,
      },
    };
  } catch (error) {
    console.error(error);
    throw createError({ statusCode: 500, message: "Internal server error" });
  }
});
