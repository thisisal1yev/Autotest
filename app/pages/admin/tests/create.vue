<script setup lang="ts">
import type { Question } from '~/stores/tests'

definePageMeta({
  layout: "admin",
  middleware: ["auth", "role"],
});

const route = useRoute();
const router = useRouter();
const toast = useToast();

// Генерация уникального ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// Инициализация пустого массива вопросов
const questions = ref<Question[]>([]);

const formState = reactive({
  title: (route.query.title as string) || '',
  description: (route.query.description as string) || '',
  timeLimit: route.query.timeLimit ? parseInt(route.query.timeLimit as string) : null,
  questions: questions,
});

// Добавление нового вопроса
function addQuestion() {
  questions.value.push({
    id: generateId(),
    text: '',
    type: 'single',
    options: [
      { id: generateId(), text: '', isCorrect: false },
      { id: generateId(), text: '', isCorrect: false }
    ],
    points: 1
  })
}

// Удаление вопроса
function removeQuestion(index: number) {
  questions.value.splice(index, 1)
}

// Обновление вопроса
function updateQuestion(index: number, updatedQuestion: Question) {
  questions.value[index] = updatedQuestion
}

// Валидация перед отправкой
function validateForm(): boolean {
  if (!formState.title) {
    toast.add({
      title: 'Validation Error',
      description: 'Test title is required',
      color: 'error'
    })
    return false
  }

  if (questions.value.length === 0) {
    toast.add({
      title: 'Validation Error',
      description: 'At least one question is required',
      color: 'error'
    })
    return false
  }

  // Валидация каждого вопроса
  for (let i = 0; i < questions.value.length; i++) {
    const question = questions.value[i]
    
    if (!question) continue
    
    if (!question.text.trim()) {
      toast.add({
        title: 'Validation Error',
        description: `Question ${i + 1}: Question text is required`,
        color: 'error'
      })
      return false
    }

    if (question.options.length < 2) {
      toast.add({
        title: 'Validation Error',
        description: `Question ${i + 1}: At least 2 options are required`,
        color: 'error'
      })
      return false
    }

    const hasEmptyOption = question.options.some(opt => !opt.text.trim())
    if (hasEmptyOption) {
      toast.add({
        title: 'Validation Error',
        description: `Question ${i + 1}: All options must have text`,
        color: 'error'
      })
      return false
    }

    const hasCorrectAnswer = question.options.some(opt => opt.isCorrect)
    if (!hasCorrectAnswer) {
      toast.add({
        title: 'Validation Error',
        description: `Question ${i + 1}: At least one option must be correct`,
        color: 'error'
      })
      return false
    }
  }

  return true
}

// Создание теста
const createTest = async () => {
  if (!validateForm()) {
    return
  }

  try {
    await $fetch("/api/admin/tests", {
      method: "POST",
      body: {
        data: {
          title: formState.title,
          description: formState.description,
          timeLimit: formState.timeLimit,
          questions: questions.value
        },
      },
    })

    toast.add({
      title: "Test created",
      description: "The test has been successfully created.",
      color: 'success'
    })

    router.push('/admin/tests')
  } catch (error: unknown) {
    toast.add({
      title: "Error",
      description: error && typeof error === 'object' && 'message' in error 
        ? String(error.message) 
        : 'Failed to create test',
      color: 'error'
    })
  }
}
</script>

<template>
  <UDashboardPanel id="create-test">
    <template #header>
      <UDashboardNavbar title="Create Test" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UButton
            color="info"
            label="Cancel"
            @click="navigateTo('/admin/dashboard')"
          />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <h3 class="text-2xl font-bold">Test title: {{ route.query.title }}</h3>

      <div class="text-gray-600 dark:text-gray-400">
        <p><b>Test description:</b> {{ route.query.description }}</p>

        <p><b>Test time limit:</b> {{ route.query.timeLimit }} minutes</p>
      </div>

      <UForm :state="formState" class="space-y-6" @submit.prevent="createTest">
        <!-- Список вопросов -->
        <div class="space-y-4">
          <div class="flex items-center justify-between">
            <h4 class="text-lg font-semibold">Questions</h4>
            <UButton
              color="primary"
              variant="soft"
              icon="i-lucide-plus"
              @click="addQuestion"
            >
              Add Question
            </UButton>
          </div>

          <div v-if="questions.length === 0" class="text-center py-8 border border-dashed border-default rounded-lg">
            <UIcon name="i-lucide-help-circle" class="w-12 h-12 text-muted mx-auto mb-2" />
            <p class="text-muted">No questions added yet</p>
            <p class="text-sm text-muted mt-1">Click "Add Question" to get started</p>
          </div>

          <QuestionForm
            v-for="(question, index) in questions"
            :key="question.id"
            :question="question"
            :index="index"
            @update:question="(updated: Question) => updateQuestion(index, updated)"
            @remove="removeQuestion(index)"
          />
        </div>

        <!-- Кнопка создания теста -->
        <div class="flex justify-end gap-3 pt-4 border-t border-default">
          <UButton
            color="neutral"
            variant="outline"
            label="Cancel"
            @click="router.push('/admin/tests')"
          />

          <UButton
            type="submit"
            color="primary"
            label="Create Test"
            :disabled="questions.length === 0"
          />
        </div>
      </UForm>
    </template>
  </UDashboardPanel>
</template>
