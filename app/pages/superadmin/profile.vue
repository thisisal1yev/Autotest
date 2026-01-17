<script lang="ts" setup>
import type { DropdownMenuItem } from "@nuxt/ui";

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
</script>

<template>
  <UDashboardPanel id="superadmin-profile">
    <template #header>
      <UDashboardNavbar title="Profile" :ui="{ right: 'gap-3' }">
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
    </template>

    <template #body> Superadmin profile </template>
  </UDashboardPanel>
</template>
