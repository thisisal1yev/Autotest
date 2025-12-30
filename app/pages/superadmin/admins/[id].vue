<script setup lang="ts">
definePageMeta({
  layout: 'superadmin',
  middleware: ['auth', 'role']
})

const route = useRoute()
const adminId = parseInt(route.params.id as string)
</script>

<template>
  <UDashboardPanel id="admin-detail">
    <template #header>
      <UDashboardNavbar
        title="Admin Details"
        :ui="{ right: 'gap-3' }"
      >
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>
    <template #body>
      <p>Admin ID: {{ adminId }}</p>
    </template>
  </UDashboardPanel>
</template>
