<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth", "role"],
});

const openCreateModal = ref(false);
const formState = reactive({
  title: "",
  description: "",
  timeLimit: "",
});
</script>

<template>
  <UDashboardPanel id="tests">
    <template #header>
      <UDashboardNavbar title="Tests" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UModal
            v-model:open="openCreateModal"
            portal="body"
            title="Create test"
          >
            <UButton icon="i-lucide-plus"> Create test </UButton>

            <template #body>
              <UForm
                :state="formState"
                class="space-y-4"
                @submit.prevent="
                  navigateTo(
                    `/admin/tests/create?title=${formState.title}&description=${formState.description}&timeLimit=${formState.timeLimit}`
                  )
                "
              >
                <UFormField name="title" label="Title" required>
                  <UInput
                    v-model="formState.title"
                    size="lg"
                    class="w-full"
                    type="text"
                    placeholder="Enter title"
                  />
                </UFormField>

                <UFormField name="description" label="Description">
                  <UTextarea
                    v-model="formState.description"
                    size="lg"
                    class="w-full"
                    type="text"
                    placeholder="Enter description"
                  />
                </UFormField>

                <UFormField name="timeLimit" label="Time limit" required>
                  <UInput
                    v-model="formState.timeLimit"
                    size="lg"
                    class="w-full"
                    type="number"
                    placeholder="Enter time limit(minutes)"
                  />
                </UFormField>

                <div class="flex justify-between gap-2">
                  <UButton
                    type="button"
                    label="Cancel"
                    variant="outline"
                    @click="openCreateModal = false"
                  />

                  <UButton
                    type="submit"
                    label="Continue"
                    trailing-icon="i-lucide-chevron-right"
                  />
                </div>
              </UForm>
            </template>
          </UModal>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <TestsTable />
    </template>
  </UDashboardPanel>
</template>
