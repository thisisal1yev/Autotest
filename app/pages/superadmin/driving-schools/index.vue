<script setup lang="ts">
definePageMeta({
  layout: 'superadmin',
  middleware: ['auth', 'role']
})
</script>

<template>
  <UDashboardPanel id="dashboard">
    <template #header>
      <UDashboardNavbar
        title="Driving Schools"
        :ui="{ right: 'gap-3' }"
      >
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UModal portal="body">
            <UButton icon="i-lucide-plus">
              Create school
            </UButton>
          </UModal>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <SuperadminSchoolsTable />
    </template>
  </UDashboardPanel>
</template>
