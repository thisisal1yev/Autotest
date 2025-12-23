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
</script>

<template>
  <UDashboardPanel id="analytics">
    <template #header>
      <UDashboardNavbar title="Analytics" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <HomeDateRangePicker v-model="range" class="-ms-1" />

          <HomePeriodSelect v-model="period" :range="range" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <p class="text-gray-600 dark:text-gray-400">
        School analytics and statistics will be displayed here.
      </p>
    </template>
  </UDashboardPanel>
</template>
