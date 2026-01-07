import { prisma } from '~~/prisma/db'

export default defineEventHandler(async (event) => {
  try {
    const { id } = getRouterParams(event) as { id: string }
    const user = await getCurrentUser(event)

    if (user.role !== 'SUPERADMIN') {
      throw createError({ statusCode: 403, message: 'Forbidden' })
    }

    const admin = await prisma.user.findUnique({
      where: { id: parseInt(id) },
      include: {
        drivingSchool: true
      }
    })

    if (!admin) {
      throw createError({ statusCode: 404, message: 'Admin not found' })
    }

    return admin
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 500, message: 'Internal server error' })
  }
})
