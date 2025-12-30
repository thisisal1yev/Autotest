<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'role']
})
</script>

<template>
  <UDashboardPanel id="students">
    <template #header>
      <UDashboardNavbar
        title="Students"
        :ui="{ right: 'gap-3' }"
      >
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UModal portal="body">
            <UButton icon="i-lucide-plus">
              Create student
            </UButton>
          </UModal>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <AdminStudentsTable />
    </template>
  </UDashboardPanel>
</template>
