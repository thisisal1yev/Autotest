<script setup lang="ts">
definePageMeta({
  layout: "superadmin",
  middleware: ["auth", "role"],
});
</script>

<template>
  <UDashboardPanel id="admins">
    <template #header>
      <UDashboardNavbar title="Admins" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <div class="p-6">
      <div class="mb-4">
        <UButton to="/superadmin/admins/create" icon="i-lucide-plus">
          Create Admin
        </UButton>
      </div>

      <p class="text-gray-600 dark:text-gray-400">
        List of admin accounts will be displayed here.
      </p>
    </div>
  </UDashboardPanel>
</template>

