import { prisma } from "~~/prisma/db";
import { getCurrentUser } from "~~/server/utils/session";

export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event);

  if (user.role !== "SUPERADMIN") {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }

  const drivingSchools = await prisma.drivingSchool.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return drivingSchools;
});