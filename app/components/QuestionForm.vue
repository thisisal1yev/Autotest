<script setup lang="ts">
import type { Question } from "~/stores/tests";

const props = defineProps<{
  question: Question;
  index: number;
}>();

const emit = defineEmits<{
  "update:question": [question: Question];
  remove: [];
}>();

// Генерация уникального ID для опции
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

// Обновление вопроса
function updateQuestion(updates: Partial<Question>) {
  emit("update:question", { ...props.question, ...updates });
}

// Добавление новой опции
function addOption() {
  const newOptions = [
    ...props.question.options,
    {
      id: generateId(),
      text: "",
      isCorrect: false,
    },
  ];
  updateQuestion({ options: newOptions });
}

// Удаление опции
function removeOption(optionId: string) {
  const newOptions = props.question.options.filter(
    (opt) => opt.id !== optionId
  );
  updateQuestion({ options: newOptions });
}

// Обновление опции
function updateOption(
  optionId: string,
  updates: { text?: string; isCorrect?: boolean }
) {
  const newOptions = props.question.options.map((opt) =>
    opt.id === optionId ? { ...opt, ...updates } : opt
  );
  updateQuestion({ options: newOptions });
}

// Обработка изменения типа вопроса (single может иметь только одну правильную опцию)
function handleTypeChange(newType: "single" | "multiple") {
  if (newType === "single") {
    // Если переключаем на single, оставляем только первую правильную опцию
    const firstCorrectIndex = props.question.options.findIndex(
      (opt) => opt.isCorrect
    );
    const newOptions = props.question.options.map((opt, index) => ({
      ...opt,
      isCorrect: index === firstCorrectIndex,
    }));
    updateQuestion({ type: newType, options: newOptions });
  } else {
    updateQuestion({ type: newType });
  }
}
</script>

<template>
  <UCard class="space-y-4">
    <template #header>
      <div class="flex items-center justify-between">
        <h4 class="font-semibold">Question {{ index + 1 }}</h4>
        <UButton
          color="error"
          variant="ghost"
          size="sm"
          icon="i-lucide-trash-2"
          @click="emit('remove')"
        >
          Remove
        </UButton>
      </div>
    </template>

    <!-- Текст вопроса -->
    <UFormField name="questionText" label="Question Text">
      <UTextarea
        :model-value="question.text"
        placeholder="Enter question text"
        class="w-full"
        :rows="3"
        @update:model-value="(value: string) => updateQuestion({ text: value })"
      />
    </UFormField>

    <!-- Тип вопроса и баллы -->
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <UFormField name="questionType" label="Question Type">
        <USelect
          :model-value="question.type"
          :options="[
            { label: 'Single Choice', value: 'single' },
            { label: 'Multiple Choice', value: 'multiple' },
          ]"
          @update:model-value="(value) => handleTypeChange(value as 'single' | 'multiple')"
        />
      </UFormField>

      <UFormField name="points" label="Points">
        <UInput
          :model-value="String(question.points)"
          type="number"
          min="1"
          placeholder="Points"
          @update:model-value="(value: string) => updateQuestion({ points: parseInt(value) || 1 })"
        />
      </UFormField>
    </div>

    <!-- Опции -->
    <div class="space-y-3">
      <div class="flex items-center justify-between">
        <label class="text-sm font-medium">Options</label>
        <UButton
          color="primary"
          variant="soft"
          size="sm"
          icon="i-lucide-plus"
          @click="addOption"
        >
          Add Option
        </UButton>
      </div>

      <div
        v-for="option in question.options"
        :key="option.id"
        class="flex items-start gap-3 p-3 rounded-lg border border-default"
      >
        <UCheckbox
          :model-value="option.isCorrect"
          :disabled="
            question.type === 'single' &&
            !option.isCorrect &&
            question.options.some((opt) => opt.isCorrect)
          "
          @update:model-value="(value: boolean | 'indeterminate') => {
            const boolValue = value === true
            if (question.type === 'single' && boolValue) {
              // Для single choice сбрасываем все остальные
              const newOptions = question.options.map(opt => ({
                ...opt,
                isCorrect: opt.id === option.id
              }))
              updateQuestion({ options: newOptions })
            } else {
              updateOption(option.id, { isCorrect: boolValue })
            }
          }"
        />

        <UInput
          :model-value="option.text"
          placeholder="Option text"
          class="flex-1 w-full"
          @update:model-value="
            (value) => updateOption(option.id, { text: value })
          "
        />

        <UButton
          v-if="question.options.length > 2"
          color="error"
          variant="ghost"
          size="sm"
          icon="i-lucide-x"
          @click="removeOption(option.id)"
        />
      </div>

      <UAlert
        v-if="question.options.length < 2"
        color="warning"
        variant="soft"
        title="At least 2 options required"
      />

      <UAlert
        v-if="!question.options.some((opt) => opt.isCorrect)"
        color="error"
        variant="soft"
        title="At least one option must be correct"
      />
    </div>
  </UCard>
</template>
