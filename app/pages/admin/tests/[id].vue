<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth", "role"],
});

const route = useRoute();
const testId = parseInt(route.params.id as string);
</script>

<template>
  <UDashboardPanel id="test-detail">
    <template #header>
      <UDashboardNavbar title="Edit Test" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <div class="p-6">
      <p>Test ID: {{ testId }}</p>
      <p class="text-gray-600 dark:text-gray-400 mt-4">
        Edit test form will be here.
      </p>
    </div>
  </UDashboardPanel>
</template>

