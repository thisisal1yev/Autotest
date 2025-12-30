import { prisma } from '~~/prisma/db'
import { getCurrentUser } from '~~/server/utils/session'

export default defineEventHandler(async (event) => {
  try {
    const { id } = getRouterParams(event) as { id: string }
    const user = await getCurrentUser(event)

    if (user.role !== 'SUPERADMIN') {
      throw createError({ statusCode: 403, message: 'Forbidden' })
    }

    const drivingSchool = await prisma.drivingSchool.findUnique({
      where: { id: parseInt(id) }
    })

    if (!drivingSchool) {
      throw createError({
        statusCode: 404,
        message: 'Driving school not found'
      })
    }

    return drivingSchool
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 500, message: 'Internal server error' })
  }
})
