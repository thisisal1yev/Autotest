import { hashSync } from 'bcrypt'
import { prisma } from '~~/prisma/db'
import { getCurrentUser } from '~~/server/utils/session'

export default defineEventHandler(async (event) => {
  try {
    const user = await getCurrentUser(event)

    if (user.role !== 'SUPERADMIN') {
      throw createError({ statusCode: 403, message: 'Forbidden' })
    }

    const body = await readBody(event)
    const { data } = body

    const newAdmin = await prisma.user.create({
      data: {
        email: data.email,
        login: data.login,
        fullName: data.fullName,
        password: hashSync(data.password, 10),
        role: 'ADMIN',
        drivingSchoolId: data.drivingSchoolId
      }
    })

    if (!newAdmin) {
      throw createError({ statusCode: 400, message: 'Admin not created' })
    }

    return newAdmin
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 500, message: 'Internal server error' })
  }
})
