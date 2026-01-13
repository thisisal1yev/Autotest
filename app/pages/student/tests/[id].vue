<script setup lang="ts">
import { useStudentTestStore } from "~/stores/studentTest";

definePageMeta({
  layout: "login",
  middleware: ["auth", "role"],
});

const isCancelModal = ref(false);

const currentAnswer = computed(() =>
  store.getAnswer(store.currentQuestion?.id ?? 0)
);
const answered = computed(() => !!currentAnswer.value);

const route = useRoute();
const store = useStudentTestStore();

const { data, error, pending } = await useAsyncData(
  `student-test-${route.params.id}`,
  () => $fetch(`/api/student/tests/${route.params.id}`)
);

if (data.value) {
  store.initTest(data.value);
  store.startTimer();
}

const onKeydown = (e: KeyboardEvent) => {
  if (answered.value) return;
  if (e.key.includes("Escape")) isCancelModal.value = false;
  if (!e.key.startsWith("F")) return;

  const index = Number(e.key.slice(1)) - 1;
  const options = store.currentQuestion?.options ?? [];

  if (index < 0 || index >= options.length) return;

  e.preventDefault();

  const option = options[index];
  const q = store.currentQuestion;
  if (option && q) {
    store.selectAnswer(q.id, option.id);
  }
};

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  window.removeEventListener("keydown", onKeydown);
  window.removeEventListener("keydown", onKeydown);
  store.stopTimer();
});
</script>
<template>
  <div
    v-if="pending && !error"
    class="flex items-center justify-center min-h-screen"
  >
    <div class="text-center">
      <UIcon name="i-lucide-loader-2" class="animate-spin size-8" />

      <p class="mt-4 text-gray-600 dark:text-gray-400">Loading test...</p>
    </div>
  </div>

  <div
    v-else-if="error && !pending"
    class="flex items-center justify-center min-h-screen"
  >
    <div class="text-center text-error">
      <UIcon name="i-lucide-alert-circle" size="64" />

      <p class="mt-4 text-lg font-medium">{{ error.statusMessage }}</p>
    </div>
  </div>

  <div v-else-if="store.currentQuestion && store.test" class="w-full">
    <div
      class="fixed w-full top-0 left-0 z-50 border-b border-gray-800 px-6 py-4"
    >
      <div class="mx-auto flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-clock" class="size-5" />

          <span class="text-lg font-semibold w-10">
            {{ formattedTime(store.timeRemaining) }}
          </span>
        </div>

        <div class="flex items-center gap-2 justify-center">
          <UButton
            v-for="(_, index) in store.totalQuestions"
            :key="index"
            :variant="
              store.currentQuestionIndex === index ? 'solid' : 'outline'
            "
            :color="'info'"
            @click="store.goToQuestion(index)"
            class="size-10 rounded-lg font-semibold transition-all"
          >
            <span class="mx-auto text-white">
              {{ index + 1 }}
            </span>
          </UButton>
        </div>

        <UModal
          v-model:open="isCancelModal"
          :dismissible="false"
          :close="false"
          portal="body"
        >
          <UButton color="secondary" variant="subtle"> Cancel </UButton>

          <template #body>
            <div class="space-y-5">
              <div class="flex items-center gap-2">
                <UIcon name="i-lucide-info" class="text-warning" size="24" />

                <p class="font-medium">
                  {{
                    store.timeRemaining
                      ? "Do you want to finish the test?"
                      : "Test Ended"
                  }}
                </p>
              </div>

              <div class="text-muted-foreground text-sm">
                <div class="grid grid-cols-3 gap-3 py-4">
                  <div
                    class="text-center p-3 bg-success-50 dark:bg-success-950/30 rounded-lg border border-success-200 dark:border-success-800"
                  >
                    <p
                      class="text-2xl font-bold text-success-600 dark:text-success-400"
                    >
                      {{ store.correctCount }}
                    </p>

                    <p class="text-xs text-muted-foreground mt-1">Correct</p>
                  </div>

                  <div
                    class="text-center p-3 bg-error-50 dark:bg-error-950/30 rounded-lg border border-error-200 dark:border-error-800"
                  >
                    <p
                      class="text-2xl font-bold text-error-600 dark:text-error-400"
                    >
                      {{ store.incorrectCount }}
                    </p>

                    <p class="text-xs text-muted-foreground mt-1">Incorrect</p>
                  </div>

                  <div
                    class="text-center p-3 rounded-lg border bg-warning-50 dark:bg-warning-950/30 border-warning-200 dark:border-warning-800"
                  >
                    <p
                      class="text-2xl font-bold text-warning-600 dark:text-warning-400"
                    >
                      {{ store.unansweredCount }}
                    </p>

                    <p class="text-xs text-muted-foreground mt-1">
                      No response
                    </p>
                  </div>
                </div>

                <p class="text-sm font-medium">
                  {{
                    store.timeRemaining && store.unansweredCount !== 0
                      ? `You have ${store.unansweredCount} unanswered questions. They may be marked as
                  incorrect. Do you want to finish anyway?`
                      : "The exam time has expired and the results have been automatically saved."
                  }}
                </p>
              </div>

              <div
                class="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"
              >
                <UButton
                  v-if="store.timeRemaining && store.unansweredCount"
                  variant="subtle"
                  color="secondary"
                  @click="isCancelModal = false"
                >
                  Testni Davom Ettirish
                </UButton>

                <UButton color="error" @click="store.finishTest()">
                  Tugatish va Yuborish
                </UButton>
              </div>
            </div>
          </template>
        </UModal>
      </div>
    </div>

    <div class="max-w-7xl w-full mx-auto space-y-5">
      <h2 class="text-2xl font-semibold leading-relaxed">
        {{ store.currentQuestion.id }}.
        {{ store.currentQuestion.title }}
      </h2>

      <USeparator />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div
          class="flex items-center justify-center bg-muted rounded-lg min-h-60 md:min-h-80 relative overflow-hidden"
        >
          <div class="relative w-full h-60 md:h-80 cursor-pointer">
            <NuxtImg
              v-if="store.currentQuestion.imgPath"
              :alt="store.currentQuestion.title"
              loading="lazy"
              decoding="async"
              data-nimg="fill"
              class="object-contain p-4 transition-all duration-500 text-transparent absolute h-full w-full inset-0"
              :src="store.currentQuestion.imgPath"
            />

            <div
              v-else
              class="absolute text-muted h-full w-full inset-0 flex flex-col items-center justify-center"
            >
              <UIcon size="64" name="i-lucide-image-off" class="mb-1" />

              <p class="text-lg font-medium">No image</p>
            </div>
          </div>
        </div>

        <div class="space-y-3 sm:space-y-4 flex flex-col justify-start">
          <UButton
            v-for="(option, index) in store.currentQuestion.options"
            :key="option.id"
            :disabled="answered"
            :aria-keyshortcuts="`F${index + 1}`"
            :color="
              currentAnswer?.optionId === option.id
                ? option.isCorrect
                  ? 'success'
                  : 'error'
                : 'info'
            "
            @click="
              () => {
                if (answered) return;
                store.answerQuestion(store.currentQuestion?.id ?? 0, option);
              }
            "
            variant="subtle"
            class="w-full p-2 rounded-xl text-white transition-all text-left"
          >
            <div class="flex items-center gap-4">
              <div
                class="size-8 rounded-full flex items-center justify-center font-bold"
              >
                F{{ index + 1 }}
              </div>

              <span class="text-lg">{{ option.answerOption }}</span>
            </div>
          </UButton>
        </div>
      </div>

      <USeparator />

      <div class="flex items-center justify-between">
        <UButton
          variant="outline"
          color="neutral"
          :disabled="store.isFirstQuestion"
          @click="store.previousQuestion"
        >
          <UIcon name="i-lucide-chevron-left" class="size-4" />

          Previous
        </UButton>

        <UButton
          :disabled="store.isLastQuestion"
          color="primary"
          @click="store.nextQuestion"
        >
          Next

          <UIcon name="i-lucide-chevron-right" class="size-4" />
        </UButton>
      </div>
    </div>
  </div>
</template>
