<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import { sub } from 'date-fns'
import type { Period, Range } from '~/types'

definePageMeta({
  layout: 'superadmin',
  middleware: ['auth', 'role']
})

const { isNotificationsSlideoverOpen } = useDashboard()
const items = [
  [
    {
      label: 'Add new school',
      icon: 'i-lucide-school',
      to: '/superadmin/driving-schools'
    },
    {
      label: 'Add new admin',
      icon: 'i-lucide-user-cog',
      to: '/superadmin/admins'
    }
  ]
] satisfies DropdownMenuItem[][]

const range = shallowRef<Range>({
  start: sub(new Date(), { days: 14 }),
  end: new Date()
})
const period = ref<Period>('daily')
</script>

<template>
  <UDashboardPanel id="dashboard">
    <template #header>
      <UDashboardNavbar
        title="EDU Autotest - Dashboard"
        :ui="{ right: 'gap-3' }"
      >
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UTooltip
            text="Notifications"
            :shortcuts="['N']"
          >
            <UButton
              color="neutral"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip
                color="error"
                inset
              >
                <UIcon
                  name="i-lucide-bell"
                  class="size-5 shrink-0"
                />
              </UChip>
            </UButton>
          </UTooltip>

          <UDropdownMenu :items="items">
            <UButton
              icon="i-lucide-plus"
              size="md"
              class="rounded-full"
            />
          </UDropdownMenu>
        </template>
      </UDashboardNavbar>

      <UDashboardToolbar>
        <template #left>
          <HomeDateRangePicker
            v-model="range"
            class="-ms-1"
          />

          <HomePeriodSelect
            v-model="period"
            :range="range"
          />
        </template>
      </UDashboardToolbar>
    </template>
  </UDashboardPanel>
</template>
