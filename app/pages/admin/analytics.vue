<script setup lang="ts">
import { sub } from "date-fns";
import type { Period, Range } from "~/types";

definePageMeta({
  layout: "admin",
  middleware: ["auth", "role"],
});

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date(),
});
const period = ref<Period>("daily");

const { data: stats } = useFetch("/api/admin/dashboard/stats", {
  method: "GET",
});

const statsMock = [
  {
    title: "Customers",
    icon: "i-lucide-users",
    value: 820,
    variation: 12,
    to: "/customers",
  },
  {
    title: "Conversions",
    icon: "i-lucide-chart-pie",
    value: 1540,
    variation: -5,
  },
  {
    title: "Revenue",
    icon: "i-lucide-circle-dollar-sign",
    value: formatCurrency(320000),
    variation: 18,
  },
  {
    title: "Orders",
    icon: "i-lucide-shopping-cart",
    value: 210,
    variation: 4,
  },
];
</script>

<template>
  <UDashboardPanel id="analytics">
    <template #header>
      <UDashboardNavbar title="Analytics" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <DateRangePicker v-model="range" class="-ms-1" />

          <PeriodSelect v-model="period" :range="range" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <section>
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-2">
          <UCard
            class="cursor-pointer hover:shadow-lg transition-shadow"
            @click="navigateTo('/admin/students')"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-muted">Total Students</p>
                <p class="text-2xl font-bold text-highlighted">
                  {{ stats?.students ?? 0 }}
                </p>
              </div>
              <div class="p-3 rounded-lg bg-primary/10">
                <UIcon name="i-lucide-users" class="w-6 h-6 text-primary" />
              </div>
            </div>
          </UCard>

          <UCard
            class="cursor-pointer hover:shadow-lg transition-shadow"
            @click="navigateTo('/admin/tests')"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-muted">Total Tests</p>
                <p class="text-2xl font-bold text-highlighted">
                  {{ stats?.tests ?? 0 }}
                </p>
              </div>
              <div class="p-3 rounded-lg bg-info/10">
                <UIcon name="i-lucide-file-text" class="w-6 h-6 text-info" />
              </div>
            </div>
          </UCard>

          <UCard
            class="cursor-pointer hover:shadow-lg transition-shadow"
            @click="navigateTo('/admin/tutorials')"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-muted">Tutorials</p>
                <p class="text-2xl font-bold text-highlighted">
                  {{ stats?.tutorials ?? 0 }}
                </p>
              </div>
              <div class="p-3 rounded-lg bg-success/10">
                <UIcon
                  name="i-lucide-list-video"
                  class="w-6 h-6 text-success"
                />
              </div>
            </div>
          </UCard>

          <UCard
            class="cursor-pointer hover:shadow-lg transition-shadow"
            @click="navigateTo('/admin/tests')"
          >
            <div class="flex items-center justify-between">
              <div>
                <p class="text-sm text-muted">Test Results</p>
                <p class="text-2xl font-bold text-highlighted">
                  {{ stats?.testResults ?? 0 }}
                </p>
              </div>
              <div class="p-3 rounded-lg bg-warning/10">
                <UIcon
                  name="i-lucide-clipboard-check"
                  class="w-6 h-6 text-warning"
                />
              </div>
            </div>
          </UCard>
        </div>

        <Stats :stats="statsMock" />
      </section>
    </template>
  </UDashboardPanel>
</template>
