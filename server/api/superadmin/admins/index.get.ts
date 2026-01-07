import { prisma } from '~~/prisma/db'

export default defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event)

    if (user.role !== 'SUPERADMIN') {
      throw createError({ statusCode: 403, message: 'Forbidden' })
    }

    const admins = await prisma.user.findMany({
      where: {
        role: 'ADMIN'
      },
      include: {
        drivingSchool: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return admins
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 500, message: 'Internal server error' })
  }
})
