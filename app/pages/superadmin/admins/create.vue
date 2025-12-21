<script setup lang="ts">
definePageMeta({
  layout: "superadmin",
  middleware: ["auth", "role"],
});
</script>

<template>
  <UDashboardPanel id="create-admin">
    <template #header>
      <UDashboardNavbar title="Create Admin" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <div class="p-6">
      <p class="text-gray-600 dark:text-gray-400">
        Create new admin account form will be here.
      </p>
    </div>
  </UDashboardPanel>
</template>

