<script setup lang="ts">
import { useTestsStore } from '~/stores/tests'

definePageMeta({
  layout: 'user',
  middleware: ['auth', 'role']
})

const route = useRoute()
const testsStore = useTestsStore()
const testId = parseInt(route.params.id as string)

onMounted(async () => {
  await testsStore.fetchUserTest(testId)
})
</script>

<template>
  <UDashboardPanel id="take-test">
    <template #header>
      <UDashboardNavbar
        title="Take Test"
        :ui="{ right: 'gap-3' }"
      >
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <div class="p-6">
      <div
        v-if="testsStore.isLoading"
        class="text-center py-8"
      >
        <p>Loading test...</p>
      </div>

      <div
        v-else-if="testsStore.currentTest"
        class="space-y-4"
      >
        <h1 class="text-2xl font-bold">
          {{ testsStore.currentTest.title }}
        </h1>
        <p
          v-if="testsStore.currentTest.description"
          class="text-gray-600 dark:text-gray-400"
        >
          {{ testsStore.currentTest.description }}
        </p>
        <p class="text-gray-600 dark:text-gray-400">
          Test taking interface will be here.
        </p>
      </div>
    </div>
  </UDashboardPanel>
</template>
