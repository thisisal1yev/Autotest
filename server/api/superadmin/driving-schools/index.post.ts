import { prisma } from "~~/prisma/db";
import { getCurrentUser } from "~~/server/utils/session";

export default defineEventHandler(async (event) => {
  const user = await getCurrentUser(event);

  if (user.role !== "SUPERADMIN") {
    throw createError({ statusCode: 403, message: "Forbidden" });
  }

  const body = await readBody(event);
  const { name, email, phone, address } = body;

  const newDrivingSchool = await prisma.drivingSchool.create({
    data: { name, email, phone, address },
  });

  if (!newDrivingSchool) {
    throw createError({ statusCode: 400, message: "Driving school not created" });
  }

  return newDrivingSchool;
});