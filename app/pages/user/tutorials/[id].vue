<script setup lang="ts">
import { useTutorialsStore } from '~/stores/tutorials'
import { formatDuration } from '~/utils/formatting'

definePageMeta({
  layout: 'user',
  middleware: ['auth', 'role']
})

const route = useRoute()
const tutorialsStore = useTutorialsStore()
const tutorialId = parseInt(route.params.id as string)

onMounted(async () => {
  await tutorialsStore.fetchUserTutorial(tutorialId)
})
</script>

<template>
  <UDashboardPanel id="watch-tutorial">
    <template #header>
      <UDashboardNavbar
        title="Tutorial"
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
        <p>Loading tutorial...</p>
      </div>

      <div
        v-else-if="tutorialsStore.currentTutorial"
        class="space-y-4"
      >
        <h1 class="text-2xl font-bold">
          {{ tutorialsStore.currentTutorial.title }}
        </h1>
        <p
          v-if="tutorialsStore.currentTutorial.description"
          class="text-gray-600 dark:text-gray-400"
        >
          {{ tutorialsStore.currentTutorial.description }}
        </p>
        <div
          v-if="tutorialsStore.currentTutorial.duration"
          class="text-sm text-gray-600 dark:text-gray-400"
        >
          Duration: {{ formatDuration(tutorialsStore.currentTutorial.duration) }}
        </div>
        <div class="mt-4">
          <p class="text-gray-600 dark:text-gray-400">
            Video player will be embedded here.
          </p>
          <p class="text-sm text-gray-500 dark:text-gray-500 mt-2">
            Video URL: {{ tutorialsStore.currentTutorial.videoUrl }}
          </p>
        </div>
      </div>
    </div>
  </UDashboardPanel>
</template>
