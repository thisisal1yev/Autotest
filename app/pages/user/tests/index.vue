<script setup lang="ts">
import { useTestsStore } from '~/stores/tests'

definePageMeta({
  layout: 'user',
  middleware: ['auth', 'role']
})

const testsStore = useTestsStore()

onMounted(async () => {
  await testsStore.fetchUserTests()
})
</script>

<template>
  <UDashboardPanel id="user-tests">
    <template #header>
      <UDashboardNavbar
        title="Tests"
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
        <p>Loading...</p>
      </div>

      <div
        v-else-if="testsStore.tests.length === 0"
        class="text-center py-8"
      >
        <p class="text-gray-600 dark:text-gray-400">
          No tests available.
        </p>
      </div>

      <div
        v-else
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <UCard
          v-for="test in testsStore.tests"
          :key="test.id"
          class="cursor-pointer hover:shadow-lg transition-shadow"
          @click="navigateTo(`/user/tests/${test.id}`)"
        >
          <template #header>
            <h3 class="font-semibold">
              {{ test.title }}
            </h3>
          </template>
          <p
            v-if="test.description"
            class="text-sm text-gray-600 dark:text-gray-400"
          >
            {{ test.description }}
          </p>
          <div class="mt-2 text-sm">
            <span class="text-gray-600 dark:text-gray-400">Passing Score: </span>
            <span class="font-semibold">{{ test.passingScore }}%</span>
          </div>
        </UCard>
      </div>
    </div>
  </UDashboardPanel>
</template>
