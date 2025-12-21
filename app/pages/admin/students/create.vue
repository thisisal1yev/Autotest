<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth", "role"],
});
</script>

<template>
  <UDashboardPanel id="create-student">
    <template #header>
      <UDashboardNavbar title="Create Student" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <div class="p-6">
      <p class="text-gray-600 dark:text-gray-400">
        Create student account form will be here.
      </p>
    </div>
  </UDashboardPanel>
</template>

