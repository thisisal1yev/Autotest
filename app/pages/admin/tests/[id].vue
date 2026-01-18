<script setup lang="ts">
import type { Question, Option } from '~~/generated/prisma/client';

definePageMeta({
  layout: "admin",
  middleware: ["auth", "role"],
});

interface QuestionWithOptions extends Question {
  options: Option[];
}

const route = useRoute();
const router = useRouter();
const toast = useToast();

const testId = Number(route.params.id);
const openDeleteModal = ref(false);
const openEditModal = ref(false);
const deleting = ref(false);

async function handleDelete() {
  deleting.value = true;
  try {
    await $fetch(`/api/admin/tests/${testId}`, { method: 'DELETE' });
    openDeleteModal.value = false;
    router.push('/admin/tests');
  } finally {
    deleting.value = false;
  }
}

const { data: test, status, error } = useFetch(`/api/admin/tests/${testId}`);

const formState = reactive({
  title: '',
  description: '',
  timeLimit: '',
});

watch(test, (val) => {
  if (val) {
    formState.title = val.title || '';
    formState.description = val.description || '';
    formState.timeLimit = val.timeLimit?.toString() || '';
  }
}, { immediate: true });

const questions = computed(() => (test.value?.questions || []) as unknown as QuestionWithOptions[]);

const testInfo = computed(() => [
  { label: 'Description', value: test.value?.description },
  { label: 'Time limit', value: test.value?.timeLimit ? `${test.value.timeLimit} min` : null },
  { label: 'Passing score', value: test.value?.passingScore ? `${test.value.passingScore}%` : null },
  { label: 'Questions', value: test.value?.questions?.length },
  { label: 'Created', value: test.value?.createdAt ? formatDate(test.value.createdAt) : null },
].filter(item => item.value != null) as { label: string; value: string | number }[]);

async function updateTest() {
  try {
    await $fetch(`/api/admin/tests/${testId}`, {
      method: 'PATCH',
      body: formState,
    });
    toast.add({ title: 'Test updated', color: 'success' });
    openEditModal.value = false;
  } catch {
    toast.add({ title: 'Error updating test', color: 'error' });
  }
}
</script>

<template>
  <UDashboardPanel id="test-detail">
    <template #header>
      <UDashboardNavbar :title="test?.title ?? 'Test Details'">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UButton icon="i-lucide-edit" label="Edit" variant="outline" @click="openEditModal = true" />
          <UButton icon="i-lucide-trash-2" label="Delete" color="error" variant="outline"
            @click="openDeleteModal = true" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div v-if="status === 'pending'" class="flex justify-center py-12">
        <UIcon name="i-lucide-loader" class="w-8 h-8 animate-spin text-muted" />
      </div>

      <div v-else-if="test" class="space-y-6">
        <Description :items="testInfo" :loading="status === 'idle'" :error="!!error" />

        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="text-lg font-semibold">Questions ({{ questions.length }})</h4>
            <UButton icon="i-lucide-plus" variant="soft">Add Question</UButton>
          </div>

          <div v-if="questions.length === 0" class="text-center py-12 border border-dashed border-default rounded-lg">
            <UIcon name="i-lucide-help-circle" class="w-12 h-12 text-muted mx-auto mb-2" />
            <p class="text-muted">No questions yet</p>
          </div>

          <QuestionForm v-for="(question, index) in questions" :key="question.id" :model-value="question"
            :index="index" />
        </div>
      </div>

      <UModal v-model:open="openEditModal" title="Edit Test">
        <template #body>
          <form class="space-y-4" @submit.prevent="updateTest">
            <UFormField label="Title" required>
              <UInput v-model="formState.title" placeholder="Test title" class="w-full" />
            </UFormField>

            <UFormField label="Description">
              <UInput v-model="formState.description" placeholder="Description" class="w-full" />
            </UFormField>

            <UFormField label="Time Limit (minutes)">
              <UInput v-model="formState.timeLimit" type="number" placeholder="30" class="w-full" />
            </UFormField>

            <div class="flex justify-end gap-2">
              <UButton variant="outline" @click="openEditModal = false">Cancel</UButton>
              <UButton type="submit">Save</UButton>
            </div>
          </form>
        </template>
      </UModal>

      <ConfirmModal v-model:open="openDeleteModal" title="Delete test"
        message="Are you sure you want to delete this test?" confirm-text="Delete" :loading="deleting"
        @confirm="handleDelete" />
    </template>
  </UDashboardPanel>
</template>