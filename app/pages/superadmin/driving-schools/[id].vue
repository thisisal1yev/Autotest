<script setup lang="ts">
definePageMeta({
  layout: "superadmin",
  middleware: ["auth", "role"],
});

const route = useRoute();
const schoolId = parseInt(route.params.id as string);
</script>

<template>
  <UDashboardPanel id="driving-school-detail">
    <template #header>
      <UDashboardNavbar title="Driving School Details" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <div class="p-6">
      <p>Driving School ID: {{ schoolId }}</p>
      <p class="text-gray-600 dark:text-gray-400 mt-4">
        Edit driving school details here.
      </p>
    </div>
  </UDashboardPanel>
</template>

