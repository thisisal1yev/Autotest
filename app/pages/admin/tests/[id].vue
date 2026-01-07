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

const {
  data: test,
  status,
  error,
} = useFetch(`/api/admin/tests/${testId}`, {
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

const title = reactive({
  title: "Test title:",
  value: test.value?.title,
});

const options = ref([
  {
    title: "Test description",
    value: test.value?.description,
  },
  {
    title: "Test time limit",
    value: test.value?.timeLimit,
  },
  {
    title: "Test passing score",
    value: test.value?.passingScore,
  },
  {
    title: "Test questions",
    value: test.value?.questions?.length,
  },
  {
    title: "Created at",
    value: formatDate(test.value?.createdAt ?? new Date()),
  },
  {
    title: "Last update",
    value: formatDate(test.value?.updatedAt ?? new Date()),
  },
]);
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

          <UModal
            :close="false"
            v-model:open="openDeleteTestModal"
            portal="body"
          >
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
      <Description
        :loading="status === 'pending'"
        :error="!!error?.message"
        :title="title"
        :options="options"
      />

      <UForm :state="formState" class="space-y-6">
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="text-lg font-semibold">Questions</h4>
            <UButton color="primary" variant="soft" icon="i-lucide-plus">
              Add Question
            </UButton>
          </div>

            <div
              class="text-center py-8 border border-dashed border-default rounded-lg"
            >
              <UIcon
                name="i-lucide-help-circle"
                class="w-12 h-12 text-muted mx-auto mb-2"
              />
              <p class="text-muted">No questions added yet</p>
              <p class="text-sm text-muted mt-1">
                Click "Add Question" to get started
              </p>
            </div>

            <QuestionForm
              v-for="(question, index) in test?.questions"
              :question="question"
              :index="index"
            />
        </div>

        <!-- Кнопка создания теста -->
        <div class="flex justify-end gap-3 pt-4 border-t border-default">
          <UButton color="neutral" variant="outline" label="Cancel" />

          <UButton type="submit" color="primary" label="Create Test" />
        </div>
      </UForm>
    </template>
  </UDashboardPanel>
</template>
