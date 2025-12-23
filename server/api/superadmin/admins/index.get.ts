import { prisma } from "~~/prisma/db";
import { getCurrentUser } from "~~/server/utils/session";

export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event);
  
  if (user.role !== "SUPERADMIN") {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }

  const admins = await prisma.user.findMany({
    where: {
      role: "ADMIN",
    },
    include: {
      drivingSchool: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return admins;
});

