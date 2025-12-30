import { compareSync } from 'bcrypt'
import { prisma } from '~~/prisma/db'

interface IBody {
  login: string
  password: string
}

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const { login, password }: IBody = body

    if (!login || !password) {
      throw createError({
        statusCode: 400,
        message: 'Login and password are required'
      })
    }

    const user = await prisma.user.findUnique({
      where: { login: login.trim() },
      include: {
        drivingSchool: true
      }
    })

    if (!user || !user.isActive) {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    }

    const isValidPassword = compareSync(password, user.password)
    if (!isValidPassword) {
      throw createError({
        statusCode: 401,
        message: 'Invalid credentials'
      })
    }

    await setUserSession(event, {
      user: {
        id: user.id,
        email: user.email,
        login: user.login,
        fullName: user.fullName,
        role: user.role,
        drivingSchoolId: user.drivingSchoolId,
        drivingSchool: user.drivingSchool
      }
    })

    return {
      user: {
        id: user.id,
        email: user.email,
        login: user.login,
        fullName: user.fullName,
        role: user.role,
        drivingSchoolId: user.drivingSchoolId,
        drivingSchool: user.drivingSchool
      }
    }
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 500, message: 'Internal server error' })
  }
})
