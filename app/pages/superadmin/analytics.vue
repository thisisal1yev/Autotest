<script setup lang="ts">
import { sub } from 'date-fns'
import type { Period, Range } from '~/types'
import type { AnalyticsQueryParams } from '~/types/analytics'
import { formatDateTime } from '~/utils/formatting'

definePageMeta({
  layout: 'superadmin',
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

const { data, pending, error } = useSuperadminAnalytics(queryParams)

const statsCards = computed(() => {
  if (!data.value) return []
  const overview = data.value.overview
  return [
    {
      title: 'Total Schools',
      icon: 'i-lucide-building-2',
      value: overview.totalSchools,
      color: 'primary',
      to: '/superadmin/driving-schools'
    },
    {
      title: 'Total Admins',
      icon: 'i-lucide-user-cog',
      value: overview.totalAdmins.total,
      color: 'info',
      to: '/superadmin/admins'
    },
    {
      title: 'Active Admins',
      icon: 'i-lucide-user-check',
      value: overview.totalAdmins.active,
      color: 'success'
    },
    {
      title: 'Total Students',
      icon: 'i-lucide-users',
      value: overview.totalStudents.total,
      color: 'warning'
    },
    {
      title: 'Total Tests',
      icon: 'i-lucide-file-text',
      value: overview.totalTests,
      color: 'primary'
    },
    {
      title: 'Total Tutorials',
      icon: 'i-lucide-list-video',
      value: overview.totalTutorials,
      color: 'info'
    },
    {
      title: 'Free Plan',
      icon: 'i-lucide-gift',
      value: overview.schoolsByPlan.free,
      color: 'success'
    },
    {
      title: 'Paid Plans',
      icon: 'i-lucide-credit-card',
      value: overview.schoolsByPlan.basic + overview.schoolsByPlan.pro + overview.schoolsByPlan.enterprise,
      color: 'primary'
    }
  ]
})
</script>

<template>
  <UDashboardPanel id="analytics">
    <template #header>
      <UDashboardNavbar
        title="Analytics"
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
        <!-- Overview Stats -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <UCard
            v-for="stat in statsCards"
            :key="stat.title"
            :class="[
              'hover:shadow-lg transition-shadow',
              stat.to ? 'cursor-pointer' : ''
            ]"
            @click="stat.to ? navigateTo(stat.to) : null"
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

        <!-- Charts -->
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TimeSeriesChart
            :data="[...data.schoolsCreatedOverTime]"
            title="Schools Created Over Time"
            value-label="schools"
            color="var(--ui-primary)"
          />
          <TimeSeriesChart
            :data="[...data.adminsCreatedOverTime]"
            title="Admins Created Over Time"
            value-label="admins"
            color="var(--ui-info)"
          />
        </div>

        <!-- Schools Breakdown -->
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h4 class="font-semibold">
                Schools Overview
              </h4>
              <UButton
                to="/superadmin/driving-schools"
                variant="ghost"
                size="xs"
                icon="i-lucide-arrow-right"
              >
                View All
              </UButton>
            </div>
          </template>
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead>
                <tr class="border-b border-default">
                  <th class="text-left p-3 text-sm font-semibold text-muted">
                    School Name
                  </th>
                  <th class="text-left p-3 text-sm font-semibold text-muted">
                    Plan
                  </th>
                  <th class="text-right p-3 text-sm font-semibold text-muted">
                    Admins
                  </th>
                  <th class="text-right p-3 text-sm font-semibold text-muted">
                    Students
                  </th>
                  <th class="text-right p-3 text-sm font-semibold text-muted">
                    Tests
                  </th>
                  <th class="text-right p-3 text-sm font-semibold text-muted">
                    Tutorials
                  </th>
                  <th class="text-right p-3 text-sm font-semibold text-muted">
                    Completions
                  </th>
                  <th class="text-left p-3 text-sm font-semibold text-muted">
                    Created
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="school in data.schools"
                  :key="school.id"
                  class="border-b border-default hover:bg-elevated/50 transition-colors cursor-pointer"
                  @click="navigateTo(`/superadmin/driving-schools/${school.id}`)"
                >
                  <td class="p-3">
                    <div class="font-medium text-highlighted">
                      {{ school.name }}
                    </div>
                    <div
                      v-if="school.email"
                      class="text-xs text-muted"
                    >
                      {{ school.email }}
                    </div>
                  </td>
                  <td class="p-3">
                    <UBadge
                      :color="school.subscriptionPlan === 'free' ? 'neutral' : 'primary'"
                      variant="subtle"
                      class="capitalize"
                    >
                      {{ school.subscriptionPlan }}
                    </UBadge>
                  </td>
                  <td class="text-right p-3">
                    <div class="font-medium">
                      {{ school.admins.total }}
                    </div>
                    <div class="text-xs text-muted">
                      {{ school.admins.active }} active
                    </div>
                  </td>
                  <td class="text-right p-3">
                    <div class="font-medium">
                      {{ school.students.total }}
                    </div>
                    <div class="text-xs text-muted">
                      {{ school.students.active }} active
                    </div>
                  </td>
                  <td class="text-right p-3">
                    {{ school.tests.total }}
                  </td>
                  <td class="text-right p-3">
                    {{ school.tutorials.total }}
                  </td>
                  <td class="text-right p-3">
                    {{ school.testCompletions }}
                  </td>
                  <td class="p-3 text-sm text-muted">
                    {{ formatDateTime(school.createdAt) }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </UCard>
      </div>
    </template>
  </UDashboardPanel>
</template>
