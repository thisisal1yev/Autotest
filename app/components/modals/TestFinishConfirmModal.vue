<script lang="ts" setup>
interface Props {
  open: boolean;
  timeRemaining: number;
  correctCount: number;
  incorrectCount: number;
  unansweredCount: number;
}

defineProps<Props>();

const emit = defineEmits<{
  "update:open": [value: boolean];
  finishTest: [];
}>();

const handleClose = () => {
  emit("update:open", false);
};

const handleFinish = () => {
  emit("finishTest");
};
</script>

<template>
  <UModal
    :open="open"
    :dismissible="false"
    :close="false"
    portal="body"
    @update:open="emit('update:open', $event)"
  >
    <template #title>
      <div class="flex items-center gap-2">
        <UIcon name="i-lucide-info" class="text-warning" size="24" />

        <p class="font-medium">
          <template v-if="timeRemaining">
            Do you want to finish the test?
          </template>

          <template v-else>Test Ended</template>
        </p>
      </div>
    </template>

    <slot />

    <template #body>
      <div class="space-y-5">
        <div class="text-sm space-y-2">
          <div class="grid grid-cols-3 gap-3">
            <div
              class="text-center p-3 bg-success-50 dark:bg-success-950/30 rounded-lg border border-success-200 dark:border-success-800"
            >
              <p
                class="text-2xl font-bold text-success-600 dark:text-success-400"
              >
                {{ correctCount }}
              </p>
              <p class="text-xs text-muted-foreground mt-1">Correct</p>
            </div>

            <div
              class="text-center p-3 bg-error-50 dark:bg-error-950/30 rounded-lg border border-error-200 dark:border-error-800"
            >
              <p class="text-2xl font-bold text-error-600 dark:text-error-400">
                {{ incorrectCount }}
              </p>
              <p class="text-xs text-muted-foreground mt-1">Incorrect</p>
            </div>

            <div
              class="text-center p-3 rounded-lg border bg-warning-50 dark:bg-warning-950/30 border-warning-200 dark:border-warning-800"
            >
              <p
                class="text-2xl font-bold text-warning-600 dark:text-warning-400"
              >
                {{ unansweredCount }}
              </p>
              <p class="text-xs text-muted-foreground mt-1">No response</p>
            </div>
          </div>

          <p class="text-sm font-medium text-muted ">
            <template v-if="timeRemaining && unansweredCount !== 0">
              You have {{ unansweredCount }} unanswered questions. They may be
              marked as incorrect. Do you want to finish anyway?
            </template>

            <template v-else>
              The exam time has expired and the results have been automatically
              saved.
            </template>
          </p>
        </div>

        <div class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <template v-if="timeRemaining && unansweredCount">
            <UButton variant="subtle" color="secondary" @click="handleClose()">
              Continue test
            </UButton>
          </template>

          <UButton color="error" @click="handleFinish()">
            End test and Submit
          </UButton>
        </div>
      </div>
    </template>
  </UModal>
</template>
