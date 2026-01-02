import { prisma } from '~~/prisma/db'
import { getCurrentUser } from '~~/server/utils/session'

export default defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event)

    if (user.role !== 'ADMIN') {
      throw createError({ statusCode: 403, message: 'Forbidden' })
    }

    const schoolId = user.drivingSchoolId

    if (!schoolId) {
      throw createError({ statusCode: 400, message: 'Driving school not found' })
    }

    const [recentStudents, recentTestResults] = await Promise.all([
      prisma.user.findMany({
        where: {
          role: 'USER',
          drivingSchoolId: schoolId,
          isActive: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        take: 5,
        select: {
          id: true,
          fullName: true,
          email: true,
          login: true,
          createdAt: true
        }
      }),
      prisma.testResult.findMany({
        where: {
          user: {
            drivingSchoolId: schoolId
          }
        },
        include: {
          test: {
            select: {
              id: true,
              title: true
            }
          },
          user: {
            select: {
              id: true,
              fullName: true
            }
          }
        },
        orderBy: {
          completedAt: 'desc'
        },
        take: 5
      })
    ])

    return {
      recentStudents,
      recentTestResults
    }
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 500, message: 'Internal server error' })
  }
})
