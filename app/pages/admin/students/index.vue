<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth", "role"],
});
</script>

<template>
  <UDashboardPanel id="students">
    <template #header>
      <UDashboardNavbar title="Students" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <div class="p-6">
      <div class="mb-4">
        <UButton to="/admin/students/create" icon="i-lucide-plus">
          Create Student
        </UButton>
      </div>

      <p class="text-gray-600 dark:text-gray-400">
        List of students will be displayed here.
      </p>
    </div>
  </UDashboardPanel>
</template>

