import { prisma } from '~~/prisma/db'

export default defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event)

    if (user.role !== 'ADMIN') {
      throw createError({ statusCode: 403, message: 'Forbidden' })
    }

    const query = getQuery(event)
    const schoolId = query.schoolId
      ? parseInt(query.schoolId as string)
      : user.drivingSchoolId

    const where = schoolId ? { drivingSchoolId: schoolId } : {}

    const tests = await prisma.test.findMany({
      where,
      omit: {
        drivingSchoolId: true,
      },
      orderBy: {
        createdAt: 'asc'
      }
    })

    return tests
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 500, message: 'Internal server error' })
  }
})
