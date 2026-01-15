<script setup lang="ts">
import { useStudentTestStore } from "~/stores/studentTest";

definePageMeta({
  layout: "login",
  middleware: ["auth", "role"],
});

const cancelModal = ref(false);

const currentAnswer = computed(() =>
  store.getAnswer(store.currentQuestion?.id ?? 0)
);
const answered = computed(() => currentAnswer.value?.optionId !== null);

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
  if (currentAnswer.value?.optionId !== null) return;

  if (e.key === "Escape") {
    cancelModal.value = false;
    return;
  }

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

const questionButtons = computed(() => {
  return store.questions.map((q, index) => {
    const answer = store.getAnswer(q.id);

    const isCurrent = store.currentQuestionIndex === index;
    const isAnswered = answer?.optionId !== null;

    let color: "info" | "success" | "error" = "info";

    if (isAnswered && answer?.isCorrect !== null) {
      color = answer?.isCorrect ? "success" : "error";
    }

    return {
      index,
      label: String(index + 1),
      color,
      variant: isCurrent || isAnswered ? "solid" : "outline",
    };
  });
});

const handleFinishTest = () => {
  store.finishTest();
  cancelModal.value = false;
};

onMounted(() => {
  window.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
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
            v-for="btn in questionButtons"
            :key="btn.index"
            :variant="btn.variant as 'link' | 'solid' | 'outline' | 'soft' | 'subtle' | 'ghost' | undefined"
            :color="btn.color"
            @click="store.goToQuestion(btn.index)"
            class="size-10 rounded-lg font-semibold transition-all flex items-center justify-center"
            :label="btn.label"
          />
        </div>

        <TestFinishConfirmModal
          v-model:open="cancelModal"
          :timeRemaining="store.timeRemaining"
          :correctCount="store.correctCount"
          :incorrectCount="store.incorrectCount"
          :unansweredCount="store.unansweredCount"
          @finishTest="handleFinishTest()"
        >
          <UButton
            color="secondary"
            variant="subtle"
            @click="cancelModal = true"
          >
            Cancel
          </UButton>
        </TestFinishConfirmModal>
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
          v-if="!store.isFirstQuestion"
          variant="outline"
          color="neutral"
          :disabled="store.isFirstQuestion"
          @click="store.previousQuestion"
        >
          <UIcon name="i-lucide-chevron-left" class="size-4" />

          Previous
        </UButton>

        <UButton
          v-if="!store.isLastQuestion"
          :disabled="store.isLastQuestion"
          color="primary"
          @click="store.nextQuestion"
          class="ml-auto"
        >
          Next

          <UIcon name="i-lucide-chevron-right" class="size-4" />
        </UButton>

        <template v-else-if="store && store.unansweredCount === 0">
          <TestFinishConfirmModal
            v-model:open="cancelModal"
            :timeRemaining="store.timeRemaining"
            :correctCount="store.correctCount"
            :incorrectCount="store.incorrectCount"
            :unansweredCount="store.unansweredCount"
            @finishTest="handleFinishTest()"
          >
            <UButton color="primary">
              Submit test

              <UIcon name="i-lucide-send" size="18" />
            </UButton>
          </TestFinishConfirmModal>
        </template>
      </div>
    </div>
  </div>
</template>
