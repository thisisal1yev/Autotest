import { prisma } from "~~/prisma/db";
import { getCurrentUser } from "~~/server/utils/session";

export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event);
  const user = await getCurrentUser(event);

  if (user.role !== "SUPERADMIN") {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }

  const drivingSchool = await prisma.drivingSchool.findUnique({
    where: { id: parseInt(id) },
  });

  if (!drivingSchool) {
    throw createError({ statusCode: 404, message: "Driving school not found" });
  }

  return drivingSchool;
});