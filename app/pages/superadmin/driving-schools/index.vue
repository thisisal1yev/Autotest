<script setup lang="ts">
import { useDrivingSchoolStore } from "~/stores/drivingSchool";

definePageMeta({
  layout: "superadmin",
  middleware: ["auth", "role"],
});

const drivingSchoolStore = useDrivingSchoolStore();

onMounted(async () => {
  await drivingSchoolStore.fetchAllSchools();
});
</script>

<template>
  <UDashboardPanel id="driving-schools">
    <template #header>
      <UDashboardNavbar title="Driving Schools" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <div class="p-6">
      <div class="mb-4">
        <UButton to="/superadmin/driving-schools/create" icon="i-lucide-plus">
          Create Driving School
        </UButton>
      </div>

      <div v-if="drivingSchoolStore.isLoading" class="text-center py-8">
        <p>Loading...</p>
      </div>

      <div v-else-if="drivingSchoolStore.schools.length === 0" class="text-center py-8">
        <p class="text-gray-600 dark:text-gray-400">No driving schools found.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <UCard
          v-for="school in drivingSchoolStore.schools"
          :key="school.id"
          class="cursor-pointer hover:shadow-lg transition-shadow"
          @click="navigateTo(`/superadmin/driving-schools/${school.id}`)"
        >
          <template #header>
            <h3 class="font-semibold">{{ school.name }}</h3>
          </template>
          <div class="space-y-2">
            <p v-if="school.email" class="text-sm text-gray-600 dark:text-gray-400">
              {{ school.email }}
            </p>
            <p v-if="school.phone" class="text-sm text-gray-600 dark:text-gray-400">
              {{ school.phone }}
            </p>
          </div>
        </UCard>
      </div>
    </div>
  </UDashboardPanel>
</template>

