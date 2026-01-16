<script setup lang="ts">
import type { DropdownMenuItem } from "@nuxt/ui";
import { sub } from "date-fns";
import type { Period, Range } from "~/types";

definePageMeta({
  layout: "superadmin",
  middleware: ["auth", "role"],
});

const { isNotificationsSlideoverOpen } = useDashboard();
const items = [
  [
    {
      label: "Add new school",
      icon: "i-lucide-school",
      to: "/superadmin/driving-schools",
    },
    {
      label: "Add new admin",
      icon: "i-lucide-user-cog",
      to: "/superadmin/admins",
    },
  ],
] satisfies DropdownMenuItem[][];

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date(),
});
const period = ref<Period>("daily");

const stats = [
  {
    title: "Customers",
    icon: "i-lucide-users",
    value: 820,
    variation: 12,
    to: "/superadmin/driving-schools",
  },
  {
    title: "Conversions",
    icon: "i-lucide-chart-pie",
    value: 1540,
    variation: -5,
    to: "/superadmin/admins",
  },
  {
    title: "Revenue",
    icon: "i-lucide-circle-dollar-sign",
    value: formatCurrency(320000),
    variation: 18,
    to: "/superadmin/analytics",
  },
  {
    title: "Orders",
    icon: "i-lucide-shopping-cart",
    value: 210,
    variation: 4,
    to: "/superadmin/analytics",
  },
];
</script>

<template>
  <UDashboardPanel id="dashboard">
    <template #header>
      <UDashboardNavbar
        title="Dashboard"
        :ui="{ right: 'gap-3' }"
      >
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
      <Stats :stats="stats" :period="period" :range="range" />
      <Chart :period="period" :range="range" />
      <Sales :period="period" :range="range" />
    </template>
  </UDashboardPanel>
</template>
