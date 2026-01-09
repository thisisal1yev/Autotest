import type { StudentAnalyticsResponse, AnalyticsQueryParams } from '~/types/analytics'

export const useStudentAnalytics = (params?: Ref<AnalyticsQueryParams> | ComputedRef<AnalyticsQueryParams> | AnalyticsQueryParams) => {
  const queryParams = computed(() => {
    const p = unref(params) || {}
    const result: Record<string, string> = {}
    if (p.startDate) result.startDate = p.startDate
    if (p.endDate) result.endDate = p.endDate
    if (p.period) result.period = p.period
    return result
  })

  const { data, error, pending, refresh } = useFetch<StudentAnalyticsResponse>(
    '/api/student/analytics',
    {
      method: 'GET',
      query: queryParams,
      key: 'student-analytics'
    }
  )

  return {
    data,
    error,
    pending,
    refresh
  }
}

