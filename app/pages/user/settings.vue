<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "user",
  middleware: ["auth", "role"],
});

const authStore = useAuthStore();
</script>

<template>
  <UDashboardPanel id="user-settings">
    <template #header>
      <UDashboardNavbar title="Settings" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Settings</h1>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-2">Full Name</label>
          <p class="text-gray-600 dark:text-gray-400">{{ authStore.user?.fullName }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Email</label>
          <p class="text-gray-600 dark:text-gray-400">{{ authStore.user?.email }}</p>
        </div>
        <div>
          <label class="block text-sm font-medium mb-2">Login</label>
          <p class="text-gray-600 dark:text-gray-400">{{ authStore.user?.login }}</p>
        </div>
      </div>
    </div>
  </UDashboardPanel>
</template>

