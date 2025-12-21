import { prisma } from "../../../prisma/db";
import { getUserFromToken } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  const payload = await getUserFromToken(event);
  
  if (!payload) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: payload.userId },
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
});

