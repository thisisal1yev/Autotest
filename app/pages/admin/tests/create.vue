<script setup lang="ts">
import type { Option, Question } from '~~/generated/prisma/client';

definePageMeta({
  layout: "admin",
  middleware: ["auth", "role"],
});

interface QuestionForm extends Question {
  options: Option[];
}

const route = useRoute();
const router = useRouter();
const toast = useToast();

const title = route.query.title as string || '';
const description = route.query.description as string || '';
const timeLimit = route.query.timeLimit ? Number(route.query.timeLimit) : null;

const items = [
  {
    label: 'Description',
    value: description
  },
  {
    label: 'Time limit',
    value: (timeLimit) + ' min'
  }
]

const questions = ref<QuestionForm[]>([]);

function generateId(): number {
  return Date.now() + Math.floor(Math.random() * 10000);
}

function addQuestion() {
  const now = new Date();
  questions.value.push({
    id: generateId(),
    title: '',
    comment: '',
    imgPath: '',
    options: [],
    testId: 0,
    createdAt: now,
    updatedAt: now
  });
}

function removeQuestion(index: number) {
  questions.value.splice(index, 1);
}

function validate(): boolean {
  if (!title) {
    toast.add({ title: 'Error', description: 'Test title is required', color: 'error' });
    return false;
  }

  if (questions.value.length === 0) {
    toast.add({ title: 'Error', description: 'Add at least one question', color: 'error' });
    return false;
  }

  for (let i = 0; i < questions.value.length; i++) {
    const q = questions.value[i];

    if (!q?.title.trim()) {
      toast.add({ title: 'Error', description: `Question ${i + 1}: title is required`, color: 'error' });
      return false;
    }

    if ((q?.options.length ?? 0) < 2) {
      toast.add({ title: 'Error', description: `Question ${i + 1}: add at least 3 options`, color: 'error' });
      return false;
    }

    if (!q?.options.some(o => o.isCorrect)) {
      toast.add({ title: 'Error', description: `Question ${i + 1}: mark correct answer`, color: 'error' });
      return false;
    }
  }

  return true;
}

async function submit() {
  if (!validate()) return;

  try {
    await $fetch("/api/admin/tests", {
      method: "POST",
      body: {
        title,
        questions: questions.value,
        description,
        timeLimit,
      },
    });

    toast.add({ title: "Success", description: "Test created", color: 'success' });
    router.push('/admin/tests');
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to create test';
    toast.add({ title: "Error", description: message, color: 'error' });
  }
}
</script>

<template>
  <UDashboardPanel id="create-test">
    <template #header>
      <UDashboardNavbar title="Create Test">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
        <template #right>
          <UButton color="error" label="Cancel" @click="router.push('/admin/tests')" />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UForm @submit.prevent="submit" class="space-y-6">
        <Description :title="title" :items="items" />

        <div class="flex items-center justify-between">
          <h4 class="text-lg font-semibold">Questions ({{ questions.length }})</h4>

          <UButton icon="i-lucide-plus" @click="addQuestion">Add Question</UButton>
        </div>

        <div v-if="questions.length === 0" class="text-center py-12 border border-dashed border-default rounded-lg">
          <UIcon name="i-lucide-help-circle" class="w-12 h-12 text-muted mx-auto mb-2" />

          <p class="text-muted">No questions yet</p>
        </div>

        <QuestionForm v-for="(question, index) in questions" :key="question.id" :model-value="question"
          @update:model-value="(val) => questions[index] = val" :index="index" @remove="removeQuestion(index)" />

        <div class="flex justify-end gap-3 pt-4">
          <UButton color="neutral" variant="outline" @click="router.push('/admin/tests')">
            Cancel
          </UButton>

          <UButton color="primary" :disabled="questions.length === 0" @click="submit">
            Create Test
          </UButton>
        </div>
      </UForm>
    </template>
  </UDashboardPanel>
</template>