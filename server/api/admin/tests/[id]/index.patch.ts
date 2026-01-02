import { prisma } from "~~/prisma/db"

export default defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event)
    const { data } = await readBody(event)
    const { id } = getRouterParams(event) as { id: string }

    if (user.role !== 'ADMIN') {
      throw createError({ statusCode: 403, message: 'Forbidden' })
    }

    const test = await prisma.test.update({
      where: { id: parseInt(id) },
      data,
      omit:{
        drivingSchoolId: true,
      }
    })

    if (!test) {
      throw createError({ statusCode: 400, message: 'Test not updated' })
    }

    return test
  }
  catch (error) {
    console.error(error)
    throw createError({ statusCode: 500, message: 'Internal server error' })
  }
})