<script setup lang="ts">
definePageMeta({
  layout: "superadmin",
  middleware: ["auth", "role"],
});

const route = useRoute();
const drivingSchoolId = parseInt(route.params.id as string);
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
    <template #body>
      <p>Driving School ID: {{ drivingSchoolId }}</p>
    </template>
  </UDashboardPanel>
</template>
