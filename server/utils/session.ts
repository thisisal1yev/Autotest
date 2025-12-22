import type { H3Event } from "h3";
import { prisma } from "../../prisma/db";

export interface SessionUser {
  id: number;
  email: string;
  login: string;
  fullName: string;
  role: "USER" | "ADMIN" | "SUPERADMIN";
  drivingSchoolId?: number | null;
}

/**
 * Get the current user from the session
 * Throws an error if user is not authenticated
 */
export async function getCurrentUser(event: H3Event): Promise<SessionUser> {
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

  // Optionally fetch fresh user data from database
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
    id: user.id,
    email: user.email,
    login: user.login,
    fullName: user.fullName,
    role: user.role,
    drivingSchoolId: user.drivingSchoolId,
  };
}

/**
 * Get the current user from session without database lookup
 * Returns null if not authenticated
 */
export async function getCurrentUserFromSession(
  event: H3Event,
): Promise<SessionUser | null> {
  const session = await getUserSession(event);
  
  if (!session?.user) {
    return null;
  }

  const user = session.user as any;
  if (!user?.id) {
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    login: user.login,
    fullName: user.fullName,
    role: user.role,
    drivingSchoolId: user.drivingSchoolId,
  };
}

