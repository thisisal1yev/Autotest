import { defineStore } from "pinia";
import { formattedTime } from "~/utils/formatting";

interface QuestionOption {
  id: number;
  answerOption: string;
  isCorrect: boolean
}

interface Question {
  id: number;
  title: string;
  imgPath?: string | null;
  options: QuestionOption[];
}

interface StudentTest {
  id: number | string;
  title: string;
  timeLimit?: number | null;
}

interface StudentTestResponse {
  test: StudentTest;
  questions: Question[];
}

export const useStudentTestStore = defineStore("studentTest", () => {
  const test = ref<StudentTest | null>(null);
  const questions = ref<Question[]>([]);
  const currentQuestionIndex = ref(0);
  const selectedAnswers = ref<Record<number, number>>({});
  const timeRemaining = ref(0);
  const isTestFinished = ref(false);
  const timer = ref<ReturnType<typeof setInterval> | null>(null);
  
  const totalQuestions = computed(()=> questions.value.length)
  const isFirstQuestion = computed(() => currentQuestionIndex.value === 0);
  const isLastQuestion = computed(() => {
    if (!questions.value) return false;
    return currentQuestionIndex.value === questions.value.length - 1;
  });

  function previousQuestion() {
    if (!isFirstQuestion.value) {
      currentQuestionIndex.value--;
    }
  }
  
  function nextQuestion() {
    if (!isLastQuestion.value && questions.value) {
      currentQuestionIndex.value++;
    }
  }
  
  function goToQuestion(index: number) {
    if (index >= 0 && index < totalQuestions.value) {
      currentQuestionIndex.value = index;
    }
  }

  const currentQuestion = computed(
    () => questions.value[currentQuestionIndex.value] ?? null
  );

  function initTest(payload: StudentTestResponse) {
    test.value = payload.test;
    questions.value = payload.questions;
    currentQuestionIndex.value = 0;
    selectedAnswers.value = {};
    isTestFinished.value = false;
    timeRemaining.value = payload.test.timeLimit
      ? payload.test.timeLimit * 60
      : 0;
  }

  function startTimer() {
    if (timer.value || timeRemaining.value <= 0) return;
    timer.value = setInterval(() => {
      if (timeRemaining.value > 0) timeRemaining.value--;
      else finishTest();
    }, 1000);
  }

  function finishTest() {
    stopTimer();
    isTestFinished.value = true;
  }

  function stopTimer() {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
  }

  function selectAnswer(qId: number, oId: number) {
    selectedAnswers.value[qId] = oId;
  }

  return {
    test,
    questions,
    currentQuestion,
    currentQuestionIndex,
    timeRemaining,
    isTestFinished,
    isFirstQuestion,
    totalQuestions,
    isLastQuestion,
    initTest,
    startTimer,
    stopTimer,
    finishTest,
    selectAnswer,
    previousQuestion,
    nextQuestion,
    goToQuestion
  };
});
