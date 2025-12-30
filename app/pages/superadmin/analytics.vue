<script setup lang="ts">
definePageMeta({
  layout: 'superadmin',
  middleware: ['auth', 'role']
})
</script>

<template>
  <UDashboardPanel id="analytics">
    <template #header>
      <UDashboardNavbar
        title="Analytics"
        :ui="{ right: 'gap-3' }"
      >
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <p class="text-gray-600 dark:text-gray-400">
        System-wide analytics and statistics will be displayed here.
      </p>
    </template>
  </UDashboardPanel>
</template>
