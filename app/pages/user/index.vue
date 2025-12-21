<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "user",
  middleware: ["auth", "role"],
});

const authStore = useAuthStore();
</script>

<template>
  <UDashboardPanel id="user-home">
    <template #header>
      <UDashboardNavbar title="Main" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Welcome, {{ authStore.user?.fullName }}!</h1>
      <p class="text-gray-600 dark:text-gray-400">
        This is your main dashboard. You can access tests, tutorials, and view your ratings.
      </p>
    </div>
  </UDashboardPanel>
</template>

