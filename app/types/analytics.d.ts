/**
 * Analytics types for role-specific analytics endpoints
 */

export interface AnalyticsTimeSeriesPoint {
  date: string
  value: number
  label?: string
}

export interface StudentBasics {
  total: number
  active: number
  inactive: number
}

export interface TestMetrics {
  total: number
  passed: number
  failed: number
  passRate: number
  averageScore: number
}

export type SubscriptionPlan = 'free' | 'basic' | 'pro' | 'enterprise'

export interface SchoolAnalyticsSummary {
  id: number
  name: string
  email: string | null
  phone: string | null
  createdAt: string
  students: {
    total: number
    active: number
    inactive: number
  }
  admins: {
    total: number
    active: number
  }
  tests: {
    total: number
  }
  tutorials: {
    total: number
  }
  testCompletions: number
  subscriptionPlan: SubscriptionPlan
  // For future: subscription status, billing info, etc.
}

// Superadmin Analytics Response
export interface SuperadminAnalyticsResponse {
  overview: {
    totalSchools: number
    totalAdmins: {
      total: number
      active: number
    }
    totalStudents: StudentBasics
    totalTests: number
    totalTutorials: number
    schoolsByPlan: Record<SubscriptionPlan, number>
  }
  schools: SchoolAnalyticsSummary[]
  schoolsCreatedOverTime: AnalyticsTimeSeriesPoint[]
  adminsCreatedOverTime: AnalyticsTimeSeriesPoint[]
}

// Admin Analytics Response
export interface AdminAnalyticsResponse {
  overview: {
    students: StudentBasics
    tests: number
    metrics: TestMetrics
  }
  testCompletionsOverTime: AnalyticsTimeSeriesPoint[]
  passRateOverTime: AnalyticsTimeSeriesPoint[]
  recentTestResults: Array<{
    id: number
    userId: number
    userFullName: string
    testId: number
    testTitle: string
    score: number
    passed: boolean
    completedAt: string
  }>
}

// Student Analytics Response
export interface StudentAnalyticsResponse {
  overview: {
    totalTestsCompleted: number
    metrics: TestMetrics
  }
  testCompletionsOverTime: AnalyticsTimeSeriesPoint[]
  recentTestResults: Array<{
    id: number
    testId: number
    testTitle: string
    score: number
    passed: boolean
    completedAt: string
  }>
}

export interface AnalyticsQueryParams {
  startDate?: string
  endDate?: string
  period?: 'daily' | 'weekly' | 'monthly'
}

