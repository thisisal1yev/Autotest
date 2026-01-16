import { prisma } from '~~/prisma/db'
import { getCurrentUser } from '~~/server/utils/session'
import type { StudentAnalyticsResponse, AnalyticsQueryParams } from '~/types/analytics'
import { eachDayOfInterval, format, startOfDay, endOfDay, parseISO, subDays } from 'date-fns'

export default defineEventHandler(async (event): Promise<StudentAnalyticsResponse> => {
  try {
    const user = await getCurrentUser(event)

    if (user.role !== 'STUDENT') {
      throw createError({ statusCode: 403, message: 'Forbidden' })
    }

    const query = getQuery<AnalyticsQueryParams>(event)
    const startDate = query.startDate ? parseISO(query.startDate) : startOfDay(subDays(new Date(), 30))
    const endDate = query.endDate ? parseISO(query.endDate) : endOfDay(new Date())

    // Get all test results for this student in date range
    const testResults = await prisma.testResult.findMany({
      where: {
        userId: user.id,
        completedAt: {
          gte: startDate,
          lte: endDate
        }
      },
      include: {
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

    // Time series data for test completions
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

    // Recent test results (last 10)
    const recentTestResults = testResults.slice(0, 10).map(tr => ({
      id: tr.id,
      testId: tr.testId,
      testTitle: tr.test.title,
      score: tr.score,
      passed: tr.passed,
      completedAt: tr.completedAt.toISOString()
    }))

    return {
      overview: {
        totalTestsCompleted: totalTestResults,
        metrics: {
          total: totalTestResults,
          passed: passedTests,
          failed: totalTestResults - passedTests,
          passRate,
          averageScore
        }
      },
      testCompletionsOverTime,
      recentTestResults
    }
  } catch (error) {
    console.error('Student analytics error:', error)
    throw createError({ statusCode: 500, message: 'Internal server error' })
  }
})

