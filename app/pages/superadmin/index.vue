<script setup lang="ts">
definePageMeta({
  layout: "superadmin",
  middleware: ["auth", "role"],
});
</script>

<template>
  <UDashboardPanel id="home">
    <template #header>
      <UDashboardNavbar title="Superadmin Dashboard" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Welcome to Superadmin Dashboard</h1>
      <p class="text-gray-600 dark:text-gray-400">
        Manage driving schools, admins, and view system-wide analytics.
      </p>
    </div>
  </UDashboardPanel>
</template>

