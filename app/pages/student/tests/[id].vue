<script setup lang="ts">
definePageMeta({
  layout: "login",
  middleware: ["auth", "role"],
});

const route = useRoute();
const testId = computed(() => route.params.id as string);

const {
  data: testData,
  pending,
  error,
} = await useFetch(`/api/student/tests/${testId.value}`);

const test = computed(() => testData.value?.test);
const questions = computed(() => testData.value?.questions ?? []);

const currentQuestionIndex = ref(0);
const selectedAnswers = ref<Record<number, number>>({});
const timeRemaining = ref(0); // in seconds
const isTestFinished = ref(false);

watchEffect(() => {
  if (test.value?.timeLimit) {
    timeRemaining.value = test.value.timeLimit * 60; // Convert minutes to seconds
  }
});

const timerInterval = ref<NodeJS.Timeout | null>(null);

onMounted(() => {
  if (test.value?.timeLimit) {
    timerInterval.value = setInterval(() => {
      if (timeRemaining.value > 0) {
        timeRemaining.value--;
      } else {
        finishTest();
      }
    }, 1000);
  }
});

onUnmounted(() => {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
});

const currentQuestion = computed(() => {
  if (!questions.value || questions.value.length === 0) return null;
  return questions.value[currentQuestionIndex.value];
});

const totalQuestions = computed(() => questions.value?.length ?? 0);

const isFirstQuestion = computed(() => currentQuestionIndex.value === 0);
const isLastQuestion = computed(() => {
  if (!questions.value) return false;
  return currentQuestionIndex.value === questions.value.length - 1;
});

const formattedTime = computed(() => {
  const minutes = Math.floor(timeRemaining.value / 60);
  const seconds = timeRemaining.value % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
});

function nextQuestion() {
  if (!isLastQuestion.value && questions.value) {
    currentQuestionIndex.value++;
  }
}

function previousQuestion() {
  if (!isFirstQuestion.value) {
    currentQuestionIndex.value--;
  }
}

function goToQuestion(index: number) {
  if (index >= 0 && index < totalQuestions.value) {
    currentQuestionIndex.value = index;
  }
}

function selectAnswer(optionId: number) {
  if (!currentQuestion.value) return;

  const questionId = currentQuestion.value.id;
  selectedAnswers.value[questionId] = optionId;
}

function isQuestionAnswered(questionIndex: number): boolean {
  if (!questions.value) return false;
  const question = questions.value[questionIndex];
  if (!question) return false;
  return question.id in selectedAnswers.value;
}

function finishTest() {
  if (timerInterval.value) {
    clearInterval(timerInterval.value);
  }
  isTestFinished.value = true;
  console.log("Test finished", selectedAnswers.value);
  navigateTo("/student/");
}

function getQuestionStatusClass(questionIndex: number): string {
  if (questionIndex === currentQuestionIndex.value) {
    return "bg-error-500 text-white";
  }
  if (isQuestionAnswered(questionIndex)) {
    return "bg-success-500 text-white";
  }
  return "bg-gray-700 text-gray-300 hover:bg-gray-600";
}
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

  <div v-else-if="currentQuestion && test" class="w-full">
    <div
      class="fixed w-full top-0 left-0 z-50 border-b border-gray-800 px-6 py-4"
    >
      <div class="mx-auto flex items-center justify-between">
        <div class="flex items-center gap-2">
          <UIcon name="i-lucide-clock" class="size-5" />
          <span class="text-lg font-semibold w-10">{{ formattedTime }}</span>
        </div>

        <div class="flex items-center gap-2 justify-center">
          <UButton
            v-for="(_, index) in totalQuestions"
            :key="index"
            @click="goToQuestion(index)"
            variant="outline"
            color="info"
            class="size-10 rounded-lg font-semibold transition-all"
          >
            <span class="mx-auto text-white">
              {{ index + 1 }}
            </span>
          </UButton>
        </div>

        <UButton color="error" variant="solid" @click="finishTest">
          Cancel
        </UButton>
      </div>
    </div>

    <div class="max-w-7xl w-full mx-auto space-y-5">
      <h2 class="text-2xl font-semibold leading-relaxed">
        {{ currentQuestion.id }}.
        {{ currentQuestion.title }}
      </h2>

      <USeparator />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div
          class="flex items-center justify-center bg-muted rounded-lg min-h-60 md:min-h-80 relative overflow-hidden"
        >
          <div class="relative w-full h-60 md:h-80 cursor-pointer">
            <NuxtImg
              v-if="currentQuestion.imgPath"
              :alt="currentQuestion.title"
              loading="lazy"
              decoding="async"
              data-nimg="fill"
              class="object-contain p-4 transition-all duration-500 text-transparent absolute h-full w-full inset-0"
              :src="currentQuestion.imgPath"
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
            v-for="(option, index) in currentQuestion.options"
            :key="option.id"
            @click="selectAnswer(option.id)"
            variant="subtle"
            color="info"
            class="w-full p-2 rounded-xl text-white transition-all text-left"
          >
            <div class="flex items-center gap-4">
              <div
                class="size-8 rounded-full flex items-center justify-center font-bold',"
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
          :disabled="isFirstQuestion"
          @click="previousQuestion"
        >
          <UIcon name="i-lucide-chevron-left" class="size-4" />
          Previous
        </UButton>

        <UButton v-if="!isLastQuestion" color="primary" @click="nextQuestion">
          Next
          <UIcon name="i-lucide-chevron-right" class="size-4" />
        </UButton>

        <UButton v-else color="primary" @click="finishTest"> Submit </UButton>
      </div>
    </div>
  </div>
</template>
