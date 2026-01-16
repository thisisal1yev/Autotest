import { prisma } from '~~/prisma/db'

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

    const [studentsCount, testsCount, tutorialsCount, testResults] = await Promise.all([
      prisma.user.count({
        where: {
          role: 'STUDENT',
          drivingSchoolId: schoolId,
          isActive: true
        }
      }),
      prisma.test.count({
        where: {
          drivingSchoolId: schoolId
        }
      }),
      prisma.tutorial.count({
        where: {
          drivingSchoolId: schoolId
        }
      }),
      prisma.testResult.findMany({
        where: {
          user: {
            drivingSchoolId: schoolId
          }
        },
        include: {
          test: true,
          user: true
        }
      })
    ])

    const totalTestResults = testResults.length
    const passedTests = testResults.filter(tr => tr.passed).length
    const averageScore = testResults.length > 0
      ? Math.round(testResults.reduce((sum, tr) => sum + tr.score, 0) / testResults.length)
      : 0
    const passRate = totalTestResults > 0
      ? Math.round((passedTests / totalTestResults) * 100)
      : 0

    return {
      students: studentsCount,
      tests: testsCount,
      tutorials: tutorialsCount,
      testResults: totalTestResults,
      passedTests,
      averageScore,
      passRate
    }
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 500, message: 'Internal server error' })
  }
})

