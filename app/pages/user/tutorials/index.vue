<script setup lang="ts">
import { useTutorialsStore } from '~/stores/tutorials'

definePageMeta({
  layout: 'user',
  middleware: ['auth', 'role']
})

const tutorialsStore = useTutorialsStore()

onMounted(async () => {
  await tutorialsStore.fetchUserTutorials()
})
</script>

<template>
  <UDashboardPanel id="user-tutorials">
    <template #header>
      <UDashboardNavbar
        title="Tutorials"
        :ui="{ right: 'gap-3' }"
      >
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <div class="p-6">
      <div
        v-if="tutorialsStore.isLoading"
        class="text-center py-8"
      >
        <p>Loading...</p>
      </div>

      <div
        v-else-if="tutorialsStore.tutorials.length === 0"
        class="text-center py-8"
      >
        <p class="text-gray-600 dark:text-gray-400">
          No tutorials available.
        </p>
      </div>

      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <UCard
          v-for="tutorial in tutorialsStore.tutorials"
          :key="tutorial.id"
          class="cursor-pointer hover:shadow-lg transition-shadow"
          @click="navigateTo(`/user/tutorials/${tutorial.id}`)"
        >
          <template #header>
            <h3 class="font-semibold">
              {{ tutorial.title }}
            </h3>
          </template>
          <p
            v-if="tutorial.description"
            class="text-sm text-gray-600 dark:text-gray-400"
          >
            {{ tutorial.description }}
          </p>
        </UCard>
      </div>
    </div>
  </UDashboardPanel>
</template>
