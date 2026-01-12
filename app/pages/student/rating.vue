<script setup lang="ts">
definePageMeta({
  layout: "student",
  middleware: ["auth", "role"],
});
</script>

<template>
  <UDashboardPanel id="rating">
    <template #header>
      <UDashboardNavbar title="Rating" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div>
        <h1 class="text-2xl font-bold mb-4">Leaderboard</h1>

        <p class="text-gray-600 dark:text-gray-400">
          Student rankings and leaderboard will be displayed here.
        </p>
      </div>
    </template>
  </UDashboardPanel>
</template>
