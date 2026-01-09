import { prisma } from '~~/prisma/db'
import { getCurrentUser } from '~~/server/utils/session'
import type { SuperadminAnalyticsResponse, AnalyticsQueryParams, SubscriptionPlan } from '~/types/analytics'
import { eachDayOfInterval, format, startOfDay, endOfDay, parseISO, subDays } from 'date-fns'

export default defineEventHandler(async (event): Promise<SuperadminAnalyticsResponse> => {
  try {
    const user = await getCurrentUser(event)

    if (user.role !== 'SUPERADMIN') {
      throw createError({ statusCode: 403, message: 'Forbidden' })
    }

    const query = getQuery<AnalyticsQueryParams>(event)
    const startDate = query.startDate ? parseISO(query.startDate) : startOfDay(subDays(new Date(), 30))
    const endDate = query.endDate ? parseISO(query.endDate) : endOfDay(new Date())

    // Get all schools with related data
    const schools = await prisma.drivingSchool.findMany({
      include: {
        users: {
          where: {
            role: {
              in: ['USER', 'ADMIN']
            }
          }
        },
        tests: true,
        tutorials: true,
        _count: {
          select: {
            users: {
              where: {
                role: 'USER'
              }
            }
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    // Get all admins
    const allAdmins = await prisma.user.findMany({
      where: {
        role: 'ADMIN'
      },
      include: {
        drivingSchool: {
          select: {
            id: true,
            name: true
          }
        }
      }
    })

    // Get all students
    const totalStudents = await prisma.user.count({
      where: {
        role: 'USER',
        isActive: true
      }
    })

    const inactiveStudents = await prisma.user.count({
      where: {
        role: 'USER',
        isActive: false
      }
    })

    // Calculate totals
    const totalTests = await prisma.test.count()
    const totalTutorials = await prisma.tutorial.count()

    // Get test results for completions count
    const testResults = await prisma.testResult.findMany({
      where: {
        completedAt: {
          gte: startDate,
          lte: endDate
        }
      },
      select: {
        user: {
          select: {
            drivingSchoolId: true
          }
        }
      }
    })

    // School-by-school breakdown
    const schoolsSummary = schools.map(school => {
      const schoolStudents = school.users.filter(u => u.role === 'USER')
      const schoolAdmins = school.users.filter(u => u.role === 'ADMIN')
      const activeStudents = schoolStudents.filter(u => u.isActive).length
      const inactiveStudents = schoolStudents.filter(u => !u.isActive).length
      const activeAdmins = schoolAdmins.filter(u => u.isActive).length

      const schoolTestResults = testResults.filter(tr => tr.user.drivingSchoolId === school.id)

      // For MVP: all schools are on 'free' plan by default
      // TODO: Add subscriptionPlan field to DrivingSchool model when implementing billing
      const subscriptionPlan: SubscriptionPlan = 'free'

      return {
        id: school.id,
        name: school.name,
        email: school.email,
        phone: school.phone,
        createdAt: school.createdAt.toISOString(),
        students: {
          total: schoolStudents.length,
          active: activeStudents,
          inactive: inactiveStudents
        },
        admins: {
          total: schoolAdmins.length,
          active: activeAdmins
        },
        tests: {
          total: school.tests.length
        },
        tutorials: {
          total: school.tutorials.length
        },
        testCompletions: schoolTestResults.length,
        subscriptionPlan
      }
    })

    // Count schools by plan (for now all are 'free')
    const schoolsByPlan: Record<SubscriptionPlan, number> = {
      free: schools.length,
      basic: 0,
      pro: 0,
      enterprise: 0
    }

    // Time series data for schools created over time
    const days = eachDayOfInterval({ start: startDate, end: endDate })
    const schoolsCreatedOverTime = days.map(day => {
      const dayStart = startOfDay(day)
      const dayEnd = endOfDay(day)
      const daySchools = schools.filter(school => {
        const createdAt = new Date(school.createdAt)
        return createdAt >= dayStart && createdAt <= dayEnd
      })
      return {
        date: format(day, 'yyyy-MM-dd'),
        value: daySchools.length
      }
    })

    // Time series data for admins created over time
    const adminsCreatedOverTime = days.map(day => {
      const dayStart = startOfDay(day)
      const dayEnd = endOfDay(day)
      const dayAdmins = allAdmins.filter(admin => {
        const createdAt = new Date(admin.createdAt)
        return createdAt >= dayStart && createdAt <= dayEnd
      })
      return {
        date: format(day, 'yyyy-MM-dd'),
        value: dayAdmins.length
      }
    })

    return {
      overview: {
        totalSchools: schools.length,
        totalAdmins: {
          total: allAdmins.length,
          active: allAdmins.filter(a => a.isActive).length
        },
        totalStudents: {
          total: totalStudents + inactiveStudents,
          active: totalStudents,
          inactive: inactiveStudents
        },
        totalTests,
        totalTutorials,
        schoolsByPlan
      },
      schools: schoolsSummary,
      schoolsCreatedOverTime,
      adminsCreatedOverTime
    }
  } catch (error) {
    console.error('Superadmin analytics error:', error)
    throw createError({ statusCode: 500, message: 'Internal server error' })
  }
})
