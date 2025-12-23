<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth", "role"],
});
</script>

<template>
   <UDashboardPanel id="tutorials">
    <template #header>
      <UDashboardNavbar title="Tutorials" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UModal>
            <UButton icon="i-lucide-plus"> Create tutorial </UButton>
          </UModal>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <AdminTutorialsTable />
    </template>
  </UDashboardPanel>
</template>

