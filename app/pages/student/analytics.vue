<script setup lang="ts">
import { sub } from 'date-fns'
import type { Period, Range } from '~/types'
import type { AnalyticsQueryParams } from '~/types/analytics'
import { formatDateTime } from '~/utils/formatting'

definePageMeta({
  layout: 'student',
  middleware: ['auth', 'role']
})

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 30 }),
  end: new Date()
})
const period = ref<Period>('daily')

const queryParams = computed<AnalyticsQueryParams>(() => ({
  startDate: range.value.start.toISOString(),
  endDate: range.value.end.toISOString(),
  period: period.value
}))

const { data, pending, error } = useStudentAnalytics(queryParams)

const statsCards = computed(() => {
  if (!data.value) return []
  const overview = data.value.overview
  return [
    {
      title: 'Tests Completed',
      icon: 'i-lucide-clipboard-check',
      value: overview.totalTestsCompleted,
      color: 'primary'
    },
    {
      title: 'Pass Rate',
      icon: 'i-lucide-check-circle',
      value: `${overview.metrics.passRate}%`,
      color: 'success'
    },
    {
      title: 'Average Score',
      icon: 'i-lucide-trending-up',
      value: `${overview.metrics.averageScore}%`,
      color: 'primary'
    },
    {
      title: 'Passed Tests',
      icon: 'i-lucide-check-circle-2',
      value: overview.metrics.passed,
      color: 'success'
    },
    {
      title: 'Failed Tests',
      icon: 'i-lucide-x-circle',
      value: overview.metrics.failed,
      color: 'error'
    }
  ]
})
</script>

<template>
  <UDashboardPanel id="analytics">
    <template #header>
      <UDashboardNavbar
        title="My Analytics"
        :ui="{ right: 'gap-3' }"
      >
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <DateRangePicker
            v-model="range"
            class="-ms-1"
          />
          <PeriodSelect
            v-model="period"
            :range="range"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div
        v-if="pending"
        class="flex items-center justify-center py-12"
      >
        <UIcon
          name="i-lucide-loader-2"
          class="w-8 h-8 animate-spin text-primary"
        />
      </div>

      <div
        v-else-if="error"
        class="flex flex-col items-center justify-center py-12"
      >
        <UIcon
          name="i-lucide-alert-circle"
          class="w-12 h-12 text-error mb-4"
        />
        <p class="text-error">
          Failed to load analytics data
        </p>
      </div>

      <div
        v-else-if="data"
        class="space-y-6"
      >
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <UCard
            v-for="stat in statsCards"
            :key="stat.title"
            class="cursor-pointer hover:shadow-lg transition-shadow"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-muted">
                  {{ stat.title }}
                </p>
                <p class="text-2xl font-bold text-highlighted">
                  {{ stat.value }}
                </p>
              </div>
              <div
                :class="[
                  'p-3 rounded-lg',
                  `bg-${stat.color}/10`
                ]"
              >
                <UIcon
                  :name="stat.icon"
                  :class="[
                    'w-6 h-6',
                    `text-${stat.color}`
                  ]"
                />
              </div>
            </div>
          </UCard>
        </div>

        <div class="grid grid-cols-1 gap-6">
          <TimeSeriesChart
            :data="[...data.testCompletionsOverTime]"
            title="Test Completions Over Time"
            value-label="tests"
            color="var(--ui-primary)"
          />
        </div>

        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h4 class="font-semibold">
                My Recent Test Results
              </h4>
              <UButton
                to="/student/tests"
                variant="ghost"
                size="xs"
                icon="i-lucide-arrow-right"
              >
                View All
              </UButton>
            </div>
          </template>
          <div
            v-if="!data.recentTestResults || data.recentTestResults.length === 0"
            class="text-center py-8"
          >
            <UIcon
              name="i-lucide-clipboard-x"
              class="w-12 h-12 text-muted mx-auto mb-2"
            />
            <p class="text-sm text-muted">
              No test results yet
            </p>
            <UButton
              to="/student/tests"
              class="mt-4"
              color="primary"
            >
              Start Your First Test
            </UButton>
          </div>
          <div
            v-else
            class="space-y-3"
          >
            <div
              v-for="result in data.recentTestResults"
              :key="result.id"
              class="flex items-center justify-between p-3 rounded-lg hover:bg-elevated/50 transition-colors cursor-pointer"
              @click="navigateTo(`/student/tests/${result.testId}`)"
            >
              <div class="flex items-center gap-3 flex-1 min-w-0">
                <div
                  :class="[
                    'flex h-10 w-10 items-center justify-center rounded-full',
                    result.passed ? 'bg-success/10' : 'bg-error/10'
                  ]"
                >
                  <UIcon
                    :name="
                      result.passed
                        ? 'i-lucide-check-circle'
                        : 'i-lucide-x-circle'
                    "
                    :class="[
                      'w-5 h-5',
                      result.passed ? 'text-success' : 'text-error'
                    ]"
                  />
                </div>
                <div class="flex-1 min-w-0">
                  <p class="font-medium text-highlighted truncate">
                    {{ result.testTitle }}
                  </p>
                  <p class="text-sm text-muted">
                    {{ formatDateTime(result.completedAt) }}
                  </p>
                </div>
              </div>
              <div class="flex items-center gap-3 ml-4">
                <div class="text-right">
                  <p
                    :class="[
                      'font-semibold text-lg',
                      result.passed ? 'text-success' : 'text-error'
                    ]"
                  >
                    {{ result.score }}%
                  </p>
                  <p
                    :class="[
                      'text-xs',
                      result.passed ? 'text-success' : 'text-error'
                    ]"
                  >
                    {{ result.passed ? 'Passed' : 'Failed' }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </UCard>
      </div>
    </template>
  </UDashboardPanel>
</template>

