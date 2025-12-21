<script setup lang="ts">
import { useTutorialsStore } from "~/stores/tutorials";
import { useAuthStore } from "~/stores/auth";

definePageMeta({
  layout: "admin",
  middleware: ["auth", "role"],
});

const tutorialsStore = useTutorialsStore();
const authStore = useAuthStore();

onMounted(async () => {
  if (authStore.currentDrivingSchoolId) {
    await tutorialsStore.fetchTutorials(authStore.currentDrivingSchoolId);
  }
});
</script>

<template>
  <UDashboardPanel id="tutorials">
    <template #header>
      <UDashboardNavbar title="Tutorials" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <div class="p-6">
      <div class="mb-4">
        <UButton to="/admin/tutorials/create" icon="i-lucide-plus">
          Create Tutorial
        </UButton>
      </div>

      <div v-if="tutorialsStore.isLoading" class="text-center py-8">
        <p>Loading...</p>
      </div>

      <div v-else-if="tutorialsStore.tutorials.length === 0" class="text-center py-8">
        <p class="text-gray-600 dark:text-gray-400">No tutorials found.</p>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <UCard
          v-for="tutorial in tutorialsStore.tutorials"
          :key="tutorial.id"
          class="cursor-pointer hover:shadow-lg transition-shadow"
          @click="navigateTo(`/admin/tutorials/${tutorial.id}`)"
        >
          <template #header>
            <h3 class="font-semibold">{{ tutorial.title }}</h3>
          </template>
          <p v-if="tutorial.description" class="text-sm text-gray-600 dark:text-gray-400">
            {{ tutorial.description }}
          </p>
        </UCard>
      </div>
    </div>
  </UDashboardPanel>
</template>

