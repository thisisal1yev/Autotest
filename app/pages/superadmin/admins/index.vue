<script setup lang="ts">
definePageMeta({
  layout: "superadmin",
  middleware: ["auth", "role"],
});
</script>

<template>
  <UDashboardPanel id="dashboard">
    <template #header>
      <UDashboardNavbar title="Admins" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UModal portal="body">
            <UButton icon="i-lucide-plus"> Create admin </UButton>
          </UModal>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <SuperadminAdminsTable />
    </template>
  </UDashboardPanel>
</template>
