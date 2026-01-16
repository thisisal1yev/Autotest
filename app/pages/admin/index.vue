<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import { sub } from "date-fns";
import type { Period, Range } from "~/types";

definePageMeta({
  layout: "admin",
  middleware: ["auth", "role"],
});

const items = [
  [
    {
      label: "Add student",
      icon: "i-lucide-user-plus",
      to: "/admin/students",
    },
    {
      label: "Add test",
      icon: "i-lucide-file-text",
      to: "/admin/tests",
    },
    {
      label: "Add tutorial",
      icon: "i-lucide-list-video",
      to: "/admin/tutorials",
    },
  ],
] satisfies DropdownMenuItem[][];

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date(),
});
const period = ref<Period>("daily");
const { isNotificationsSlideoverOpen } = useDashboard();

const { data } = useFetch("/api/auth/me", { method: "GET", server: false });
const { data: stats } = useFetch("/api/admin/dashboard/stats", {
  method: "GET",
});
const { data: recent } = useFetch("/api/admin/dashboard/recent", {
  method: "GET",
});

const statsMock = [
  {
    title: "Students",
    icon: "i-lucide-users",
    value: stats?.value?.students ?? 0,
    variation: 12,
    to: "/admin/students",
  },
  {
    title: "Tests",
    icon: "i-lucide-file-text",
    value: stats?.value?.tests ?? 0,
    variation: -5,
    to: "/admin/tests",
  },
  {
    title: "Tutorials",
    icon: "i-lucide-list-video",
    value: stats?.value?.testResults ?? 0,
    variation: 18,
    to: "/admin/tutorials",
  },
  {
    title: "Test Results",
    icon: "i-lucide-clipboard-check",
    value: stats.value?.passRate ?? 0,
    variation: 4,
    to: "/admin/analytics",
  },
];
</script>

<template>
  <UDashboardPanel id="dashboard">
    <template #header>
      <UDashboardNavbar title="Dashboard" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UTooltip text="Notifications" :shortcuts="['N']">
            <UButton
              color="neutral"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip color="error" inset>
                <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
              </UChip>
            </UButton>
          </UTooltip>

          <UDropdownMenu :items="items">
            <UButton icon="i-lucide-plus" size="md" class="rounded-full" />
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <DateRangePicker v-model="range" class="-ms-1" />

          <PeriodSelect v-model="period" :range="range" />
        </template>
      </UDashboardToolbar>
    </template>

    <template #body>
      <section class="space-y-1">
        <h3 class="text-2xl">
          Hello
          <strong>{{ data?.user.fullName ?? "Admin" }}!</strong>
          Welcome to
          <strong>
            {{ data?.user.drivingSchool?.name ?? "Your driving school" }}
          </strong>
          dashboard.
        </h3>

        <p class="text-gray-600 dark:text-gray-400 text-sm">
          Welcome to driving school dashboard. Below are your statistics and
          available opportunities.
        </p>
      </section>

      <section class="space-y-6">
        <Stats :stats="statsMock" />

        <!-- Performance Metrics -->
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-lucide-trending-up"
                  class="w-5 h-5 text-success"
                />
                <h4 class="font-semibold">Average Score</h4>
              </div>
            </template>
            <div class="text-3xl font-bold text-highlighted">
              {{ stats?.averageScore ?? 0 }}%
            </div>
            <p class="text-sm text-muted mt-1">Across all tests</p>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon
                  name="i-lucide-check-circle"
                  class="w-5 h-5 text-primary"
                />
                <h4 class="font-semibold">Pass Rate</h4>
              </div>
            </template>
            <div class="text-3xl font-bold text-highlighted">
              {{ stats?.passRate ?? 0 }}%
            </div>
            <p class="text-sm text-muted mt-1">
              {{ stats?.passedTests ?? 0 }} of
              {{ stats?.testResults ?? 0 }} passed
            </p>
          </UCard>

          <UCard>
            <template #header>
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-bar-chart" class="w-5 h-5 text-info" />
                <h4 class="font-semibold">Completed Tests</h4>
              </div>
            </template>
            <div class="text-3xl font-bold text-highlighted">
              {{ stats?.testResults ?? 0 }}
            </div>
            <p class="text-sm text-muted mt-1">Total test completions</p>
          </UCard>
        </div>

        <!-- Quick Actions -->
        <UCard>
          <template #header>
            <h4 class="font-semibold">Quick Actions</h4>
          </template>
          <div class="grid grid-cols-1 gap-3 sm:grid-cols-3">
            <UButton
              to="/admin/students"
              color="primary"
              variant="soft"
              block
              icon="i-lucide-user-plus"
            >
              Manage Students
            </UButton>

            <UButton
              to="/admin/tests"
              color="info"
              variant="soft"
              block
              icon="i-lucide-file-text"
            >
              Manage Tests
            </UButton>

            <UButton
              to="/admin/tutorials"
              color="success"
              variant="soft"
              block
              icon="i-lucide-list-video"
            >
              Manage Tutorials
            </UButton>
          </div>
        </UCard>

        <!-- Recent Activity -->
        <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <!-- Recent Test Results -->
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h4 class="font-semibold">Recent Test Results</h4>
                <UButton
                  to="/admin/analytics"
                  variant="ghost"
                  size="xs"
                  icon="i-lucide-arrow-right"
                >
                  View All
                </UButton>
              </div>
            </template>
            <div
              v-if="
                !recent?.recentTestResults ||
                recent.recentTestResults.length === 0
              "
              class="text-center py-8"
            >
              <UIcon
                name="i-lucide-clipboard-x"
                class="w-12 h-12 text-muted mx-auto mb-2"
              />
              <p class="text-sm text-muted">No test results yet</p>
            </div>
            <div v-else class="space-y-3">
              <div
                v-for="result in recent.recentTestResults"
                :key="result.id"
                class="flex items-center justify-between p-3 rounded-lg hover:bg-elevated/50 transition-colors"
              >
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    :class="[
                      'flex h-10 w-10 items-center justify-center rounded-full',
                      result.passed ? 'bg-success/10' : 'bg-error/10',
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
                        result.passed ? 'text-success' : 'text-error',
                      ]"
                    />
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-medium text-highlighted truncate">
                      {{ result.user.fullName }}
                    </p>
                    <p class="text-sm text-muted truncate">
                      {{ result.test.title }}
                    </p>
                  </div>
                </div>
                <div class="flex items-center gap-3 ml-4">
                  <div class="text-right">
                    <p
                      :class="[
                        'font-semibold',
                        result.passed ? 'text-success' : 'text-error',
                      ]"
                    >
                      {{ result.score }}%
                    </p>
                    <p class="text-xs text-muted">
                      {{ formatDateTime(result.completedAt) }}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </UCard>

          <!-- Recent Students -->
          <UCard>
            <template #header>
              <div class="flex items-center justify-between">
                <h4 class="font-semibold">Recent Students</h4>
                <UButton
                  to="/admin/students"
                  variant="ghost"
                  size="xs"
                  icon="i-lucide-arrow-right"
                >
                  View All
                </UButton>
              </div>
            </template>
            <div
              v-if="
                !recent?.recentStudents || recent.recentStudents.length === 0
              "
              class="text-center py-8"
            >
              <UIcon
                name="i-lucide-users-x"
                class="w-12 h-12 text-muted mx-auto mb-2"
              />
              <p class="text-sm text-muted">No students yet</p>
            </div>
            <div v-else class="space-y-3">
              <div
                v-for="student in recent.recentStudents"
                :key="student.id"
                class="flex items-center justify-between p-3 rounded-lg hover:bg-elevated/50 transition-colors cursor-pointer"
                @click="navigateTo(`/admin/students/${student.id}`)"
              >
                <div class="flex items-center gap-3 flex-1 min-w-0">
                  <div
                    class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"
                  >
                    <span class="text-primary font-semibold">
                      {{ firstLetter(student.fullName).toUpperCase() }}
                    </span>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="font-medium text-highlighted truncate">
                      {{ student.fullName }}
                    </p>
                    <p class="text-sm text-muted truncate">
                      {{ student.email }}
                    </p>
                  </div>
                </div>
                <div class="text-right ml-4">
                  <p class="text-xs text-muted">
                    {{ formatDateTime(student.createdAt) }}
                  </p>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </section>
    </template>
  </UDashboardPanel>
</template>
