import { prisma } from '~~/prisma/db'
import { getCurrentUser } from '~~/server/utils/session'

export default defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event)
    const { id } = getRouterParams(event) as { id: string }

    if (user.role !== 'ADMIN') {
      throw createError({ statusCode: 403, message: 'Forbidden' })
    }

    const test = await prisma.test.findUnique({
      where: { id: parseInt(id) },
      omit:{
        drivingSchoolId: true,
      }
    })

    if (!test) {
      throw createError({ statusCode: 404, message: 'Test not found' })
    }

    return test
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 500, message: 'Internal server error' })
  }
})
