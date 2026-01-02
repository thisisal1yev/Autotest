<script setup lang="ts">
definePageMeta({
  layout: "admin",
  middleware: ["auth", "role"],
});

const route = useRoute();
const toast = useToast();
const openDeleteTestModal = ref(false);
const openEditTestModal = ref(false);
const testId = parseInt(route.params.id as string);

const { data: test, status } = useFetch(`/api/admin/tests/${testId}`, {
  method: "GET",
  lazy: true,
});

const formState = reactive({
  title: "",
  description: "",
  timeLimit: "",
});

const { execute: deleteTest, pending: deletePending } = useFetch(
  `/api/admin/tests/${testId}`,
  {
    method: "DELETE",
    immediate: false,
  }
);

const updateTest = async () => {
  await $fetch(`/api/admin/tests/${testId}`, {
    method: "PATCH",
    body: {
      data: formState,
    },
  });

  toast.add({
    title: "Test updated",
    description: "The test has been successfully updated.",
  });

  openEditTestModal.value = false;
};

watchEffect(() => {
  if (test.value) {
    formState.title = test.value?.title || "";
    formState.description = test.value?.description || "";
    formState.timeLimit = test.value?.timeLimit?.toString() || "";
  }
});
</script>

<template>
  <UDashboardPanel id="test-detail">
    <template #header>
      <UDashboardNavbar title="Edit Test" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UModal
            v-model:open="openEditTestModal"
            title="Edit Test"
            portal="body"
          >
            <UButton
              color="primary"
              variant="outline"
              icon="i-lucide-edit"
              label="Edit Test"
              @click="openEditTestModal = true"
            />

            <template #body>
              <UForm
                :state="formState"
                class="space-y-4"
                @submit.prevent="updateTest"
              >
                <UFormField name="title" label="Title">
                  <UInput
                    v-model="formState.title"
                    size="lg"
                    class="w-full"
                    type="text"
                    placeholder="Enter title"
                  />
                </UFormField>

                <UFormField name="description" label="Description">
                  <UInput
                    v-model="formState.description"
                    size="lg"
                    class="w-full"
                    type="text"
                    placeholder="Enter description"
                  />
                </UFormField>

                <UFormField name="timeLimit" label="Time Limit">
                  <UInput
                    v-model="formState.timeLimit"
                    size="lg"
                    class="w-full"
                    type="text"
                    placeholder="Enter time limit"
                  />
                </UFormField>

                <div class="flex justify-between gap-2">
                  <UButton type="submit" label="Update Test" />

                  <UButton
                    type="button"
                    label="Cancel"
                    variant="outline"
                    @click="openEditTestModal = false"
                  />
                </div>
              </UForm>
            </template>
          </UModal>

          <UModal :close="false" v-model:open="openDeleteTestModal" portal="body">
            <UButton
              color="error"
              variant="outline"
              icon="i-lucide-trash-2"
              label="Delete Test"
              :loading="deletePending"
              @click="openDeleteTestModal = true"
            />

            <template #body>
              <h4 class="text-lg font-bold text-center mb-2">
                Are you sure you want to delete this test?
              </h4>

              <div class="flex justify-center items-center gap-2">
                <UButton
                  color="error"
                  variant="ghost"
                  icon="i-lucide-trash-2"
                  label="Delete"
                  size="lg"
                  :loading="deletePending"
                  @click="deleteTest()"
                />

                <UButton
                  color="info"
                  variant="ghost"
                  icon="i-lucide-x"
                  label="Cancel"
                  size="lg"
                  @click="openDeleteTestModal = false"
                />
              </div>
            </template>
          </UModal>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <h3 class="text-2xl font-bold">Test ID: {{ testId }}</h3>

      <div v-if="status === 'pending'" class="space-y-3">
        <USkeleton class="w-40 h-4" />
        <USkeleton class="w-80 h-4" />
        <USkeleton class="w-60 h-4" />
        <USkeleton class="w-40 h-4" />
      </div>

      <div v-else-if="status === 'error'">
        <p>Error loading test</p>
      </div>

      <div v-else class="text-gray-600 dark:text-gray-400">
        <p>Test Title: {{ test?.title }}</p>
        <p>Test Description: {{ test?.description }}</p>
        <p>Test Time Limit: {{ test?.timeLimit }}</p>
        <p>Test Passing Score: {{ test?.passingScore }}</p>
      </div>
    </template>
  </UDashboardPanel>
</template>
