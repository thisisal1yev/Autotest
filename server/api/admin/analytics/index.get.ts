import { prisma } from '~~/prisma/db'
import type { AdminAnalyticsResponse, AnalyticsQueryParams } from '~/types/analytics'
import { eachDayOfInterval, format, startOfDay, endOfDay, parseISO, subDays } from 'date-fns'

export default defineEventHandler(async (event): Promise<AdminAnalyticsResponse> => {
  try {
    const user = await getCurrentUser(event)

    if (user.role !== 'ADMIN') {
      throw createError({ statusCode: 403, message: 'Forbidden' })
    }

    const schoolId = user.drivingSchoolId

    if (!schoolId) {
      throw createError({ statusCode: 400, message: 'Driving school not found' })
    }

    const query = getQuery<AnalyticsQueryParams>(event)
    const startDate = query.startDate ? parseISO(query.startDate) : startOfDay(subDays(new Date(), 30))
    const endDate = query.endDate ? parseISO(query.endDate) : endOfDay(new Date())

    const students = await prisma.user.findMany({
      where: {
        role: 'STUDENT',
        drivingSchoolId: schoolId
      }
    })

    const activeStudents = students.filter(s => s.isActive).length
    const inactiveStudents = students.filter(s => !s.isActive).length

    const testsCount = await prisma.test.count({
      where: {
        drivingSchoolId: schoolId
      }
    })

    const testResults = await prisma.testResult.findMany({
      where: {
        user: {
          drivingSchoolId: schoolId
        },
        completedAt: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
        user: {
          select: {
            id: true,
            fullName: true
          }
        },
        test: {
          select: {
            id: true,
            title: true
          }
        }
      },
      orderBy: {
        completedAt: 'desc'
      }
    })

    const totalTestResults = testResults.length
    const passedTests = testResults.filter(tr => tr.passed).length
    const averageScore = totalTestResults > 0
      ? Math.round(testResults.reduce((sum, tr) => sum + tr.score, 0) / totalTestResults)
      : 0
    const passRate = totalTestResults > 0
      ? Math.round((passedTests / totalTestResults) * 100)
      : 0

    const days = eachDayOfInterval({ start: startDate, end: endDate })
    const testCompletionsOverTime = days.map(day => {
      const dayStart = startOfDay(day)
      const dayEnd = endOfDay(day)
      const dayResults = testResults.filter(tr => {
        const completedAt = new Date(tr.completedAt)
        return completedAt >= dayStart && completedAt <= dayEnd
      })
      return {
        date: format(day, 'yyyy-MM-dd'),
        value: dayResults.length
      }
    })

    const passRateOverTime = days.map(day => {
      const dayStart = startOfDay(day)
      const dayEnd = endOfDay(day)
      const dayResults = testResults.filter(tr => {
        const completedAt = new Date(tr.completedAt)
        return completedAt >= dayStart && completedAt <= dayEnd
      })
      const dayPassed = dayResults.filter(tr => tr.passed).length
      const dayPassRate = dayResults.length > 0
        ? Math.round((dayPassed / dayResults.length) * 100)
        : 0
      return {
        date: format(day, 'yyyy-MM-dd'),
        value: dayPassRate
      }
    })

    const recentTestResults = testResults.slice(0, 10).map(tr => ({
      id: tr.id,
      userId: tr.userId,
      userFullName: tr.user.fullName,
      testId: tr.testId,
      testTitle: tr.test.title,
      score: tr.score,
      passed: tr.passed,
      completedAt: tr.completedAt.toISOString()
    }))

    return {
      overview: {
        students: {
          total: students.length,
          active: activeStudents,
          inactive: inactiveStudents
        },
        tests: testsCount,
        metrics: {
          total: totalTestResults,
          passed: passedTests,
          failed: totalTestResults - passedTests,
          passRate,
          averageScore
        }
      },
      testCompletionsOverTime,
      passRateOverTime,
      recentTestResults
    }
  } catch (error) {
    console.error('Admin analytics error:', error)
    throw createError({ statusCode: 500, message: 'Internal server error' })
  }
})

