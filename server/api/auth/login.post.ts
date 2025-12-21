import { compareSync } from "bcrypt";
import { prisma } from "../../../prisma/db";
import { signToken } from "../../utils/jwt";
import { setAuthCookie } from "../../utils/auth";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { login, password } = body;

  if (!login || !password) {
    throw createError({
      statusCode: 400,
      message: "Login and password are required",
    });
  }

  const user = await prisma.user.findUnique({
    where: { login },
    include: {
      drivingSchool: true,
    },
  });

  if (!user || !user.isActive) {
    throw createError({
      statusCode: 401,
      message: "Invalid credentials",
    });
  }

  const isValidPassword = compareSync(password, user.password);
  if (!isValidPassword) {
    throw createError({
      statusCode: 401,
      message: "Invalid credentials",
    });
  }

  const token = signToken({
    userId: user.id,
    email: user.email,
    role: user.role,
    drivingSchoolId: user.drivingSchoolId,
  });

  setAuthCookie(event, token);

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

