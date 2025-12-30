<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth", "role"],
});
</script>

<template>
  <UDashboardPanel id="tests">
    <template #header>
      <UDashboardNavbar title="Tests" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UModal portal="body">
            <UButton icon="i-lucide-plus"> Create test </UButton>
          </UModal>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <AdminTestsTable />
    </template>
  </UDashboardPanel>
</template>
