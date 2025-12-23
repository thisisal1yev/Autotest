<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "user",
  middleware: ["auth", "role"],
});

const authStore = useAuthStore();
const { isNotificationsSlideoverOpen } = useDashboard();
</script>

<template>
  <UDashboardPanel id="student-home">
    <template #header>
      <UDashboardNavbar title="Main" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UTooltip text="Notifications" :shortcuts="['N']">
            <UButton
              @click="isNotificationsSlideoverOpen = true"
              color="neutral"
              variant="ghost"
              square
            >
              <UChip color="error" inset>
                <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
              </UChip>
            </UButton>
          </UTooltip>

          <UButton
            icon="i-lucide-play"
            color="primary"
            variant="soft"
            to="/user/tests"
          >
            Start Test
          </UButton>
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
