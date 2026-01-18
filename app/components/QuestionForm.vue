<script setup lang="ts">
import type { AcceptableValue } from '@nuxt/ui';
import type { Option, Question } from '~~/generated/prisma/client';

interface QuestionForm extends Question {
  options: Option[];
}

const model = defineModel<QuestionForm>({ required: true });

defineProps<{
  index: number;
}>();

const emit = defineEmits<{
  remove: [];
}>();

function generateId(): number {
  return Date.now() + Math.floor(Math.random() * 10000);
}

function addOption() {
  model.value.options.push({
    id: generateId(),
    createdAt: new Date(),
    updatedAt: new Date(),
    answerOption: '',
    isCorrect: false,
    questionId: model.value.id,
  });
}

function removeOption(id: number) {
  model.value.options = model.value.options.filter(o => o.id !== id);
}

function setCorrect(id: AcceptableValue | undefined) {
  model.value.options.forEach(o => {
    o.isCorrect = o.id === id;
  });
}

function onFileChange(event: Event) {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const formData = new FormData();
  formData.append('file', file);

  try {
    $fetch<{ path: string }>('/api/upload', {
      method: 'POST',
      body: formData,
    }).then(response => {
      model.value.imgPath = response.path;
    });
  } catch {
    console.error('Failed to upload image');
  }
}

function removeImage() {
  model.value.imgPath = '';
}
</script>

<template>
  <UCard>
    <template #header>
      <div class="flex items-center justify-between">
        <span class="font-semibold">Question {{ index + 1 }}</span>
        <UButton color="error" variant="ghost" size="sm" icon="i-lucide-trash-2" @click="emit('remove')" />
      </div>
    </template>

    <div class="space-y-4">
      <!-- Title + Image -->
      <div class="flex flex-col lg:flex-row gap-4">
        <UFormField label="Question title" required class="flex-1">
          <UInput v-model="model.title" placeholder="Enter question..." class="w-full" />
        </UFormField>

        <!-- Image Upload / Preview -->
        <div>
          <span class="text-sm font-medium mb-1.5 block">Image</span>

          <!-- Preview if image exists -->
          <div v-if="model.imgPath" class="relative group">
            <NuxtImg :src="model.imgPath" alt="Question image"
              class="h-40 w-60 object-cover rounded-lg border border-default" />
            <UButton icon="i-lucide-trash-2" color="error" variant="subtle" size="md"
              class="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity"
              @click="removeImage" />
          </div>

          <!-- Upload if no image -->
          <UFileUpload v-else accept="image/*" @change="onFileChange">
            <div
              class="flex flex-col items-center justify-center border-2 border-dashed border-default rounded-lg hover:border-primary cursor-pointer transition-colors">
              <UIcon name="i-lucide-image-plus" class="w-6 h-6 text-muted mb-1" />
              <span class="text-xs text-muted">Upload</span>
            </div>
          </UFileUpload>
        </div>
      </div>

      <UFormField label="Comment (optional)">
        <UTextarea v-model="model.comment" placeholder="Explanation for correct answer..." :rows="10" class="w-full" />
      </UFormField>

      <div>
        <div class="flex items-center justify-between mb-2">
          <span class="text-sm font-medium">Options</span>
          <UButton size="sm" variant="soft" icon="i-lucide-plus" @click="addOption">
            Add
          </UButton>
        </div>

        <div class="space-y-2">
          <div v-for="option in model.options" :key="option.id"
            class="flex items-center gap-3 p-3 rounded-lg border border-default cursor-pointer"
            :class="{ 'border-primary bg-primary/5': option.isCorrect }" @click="setCorrect(option.id)">
            <div class="w-4 h-4 rounded-full border-2 flex items-center justify-center"
              :class="option.isCorrect ? 'border-primary' : 'border-gray-400'">
              <div v-if="option.isCorrect" class="w-2 h-2 rounded-full bg-primary" />
            </div>
            <UInput v-model="option.answerOption" placeholder="Option text..." class="inline-flex w-full" variant="none"
              required @click.stop />
            <UButton color="error" variant="ghost" size="xs" icon="i-lucide-x" @click.stop="removeOption(option.id)" />
          </div>
        </div>

        <UAlert v-if="model.options.length < 3" color="warning" variant="soft" title="Add at least 3 options"
          class="mt-2" />
      </div>
    </div>
  </UCard>
</template>