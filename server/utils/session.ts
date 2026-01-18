import type { H3Event } from 'h3'
import type { User } from '~~/generated/prisma/client'
import { prisma } from '~~/prisma/db'

export interface SessionUser {
  id: number
  email: string
  login: string
  fullName: string
  role: 'STUDENT' | 'ADMIN' | 'SUPERADMIN' | 'GUEST'
  drivingSchoolId?: number | null
}

export async function getCurrentUser(event: H3Event): Promise<SessionUser> {
  const session = await getUserSession(event)

  if (!session?.user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const userId = (session.user as User).id
  if (!userId) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized'
    })
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    include: {
      drivingSchool: true
    },
    omit: {
      password: true,
    }
  })

  if (!user || !user.isActive) {
    throw createError({
      statusCode: 401,
      message: 'User not found or inactive'
    })
  }

  return {
    id: user.id,
    email: user.email,
    login: user.login,
    fullName: user.fullName,
    role: user.role,
    drivingSchoolId: user.drivingSchoolId
  }
}

export async function getCurrentUserFromSession(
  event: H3Event
): Promise<SessionUser | null> {
  const session = await getUserSession(event)

  if (!session?.user) {
    return null
  }

  const user = session.user as User
  if (!user?.id) {
    return null
  }

  return {
    id: user.id,
    email: user.email,
    login: user.login,
    fullName: user.fullName,
    role: user.role,
    drivingSchoolId: user.drivingSchoolId
  }
}
