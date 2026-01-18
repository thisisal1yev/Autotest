interface Answer {
  optionId: number;
  isCorrect: boolean;
}

interface QuestionOption {
  id: number;
  answerOption: string;
  isCorrect: boolean;
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

interface AnswerEntry {
  optionId: number | null;
  isCorrect: boolean | null;
}

export const useStudentTestStore = defineStore("studentTest", () => {
  const test = ref<StudentTest | null>(null);
  const questions = ref<Question[]>([]);
  const currentQuestionIndex = ref(0);

  const answers = ref<AnswerEntry[]>([]);

  const timeRemaining = ref(0);
  const isTestFinished = ref(false);
  const timer = ref<ReturnType<typeof setInterval> | null>(null);

  /* ================= COMPUTED ================= */

  const totalQuestions = computed(() => questions.value.length);

  const currentQuestion = computed(
    () => questions.value[currentQuestionIndex.value] ?? null
  );

  const isFirstQuestion = computed(() => currentQuestionIndex.value === 0);

  const isLastQuestion = computed(
    () => currentQuestionIndex.value === totalQuestions.value - 1
  );

  const correctCount = computed(
    () => answers.value.filter((a) => a.isCorrect === true).length
  );

  const incorrectCount = computed(
    () => answers.value.filter((a) => a.isCorrect === false).length
  );

  const unansweredCount = computed(
    () => answers.value.filter((a) => a.optionId === null).length
  );

  /* ================= ACTIONS ================= */

  function initTest(payload: StudentTestResponse) {
    test.value = payload.test;
    questions.value = payload.questions;
    currentQuestionIndex.value = 0;
    answers.value = questions.value.map(() => ({
      optionId: null,
      isCorrect: null,
    }));
    isTestFinished.value = false;
    timeRemaining.value = payload.test.timeLimit
      ? payload.test.timeLimit * 60
      : 0;
  }

  function answerQuestion(questionId: number, option: QuestionOption) {
    const index = questions.value.findIndex((q) => q.id === questionId);
    if (index === -1) return;
    if (answers.value[index]?.optionId !== null) return;

    answers.value[index] = {
      optionId: option.id,
      isCorrect: option.isCorrect,
    };
  }

  function getAnswer(questionId: number) {
    const index = questions.value.findIndex((q) => q.id === questionId);
    if (index === -1) return null;
    return answers.value[index];
  }

  function selectAnswer(qId: number, oId: number) {
    const qIndex = questions.value.findIndex((q) => q.id === qId);
    if (qIndex === -1) return;

    if (answers.value[qIndex]?.optionId !== null) return;

    const question = questions.value[qIndex];
    const option = question?.options.find((o) => o.id === oId);
    if (!option) return;

    answers.value[qIndex] = { optionId: oId, isCorrect: option.isCorrect };
  }

  function previousQuestion() {
    if (!isFirstQuestion.value) currentQuestionIndex.value--;
  }

  function nextQuestion() {
    if (!isLastQuestion.value) currentQuestionIndex.value++;
  }

  function goToQuestion(index: number) {
    if (index >= 0 && index < totalQuestions.value) {
      currentQuestionIndex.value = index;
    }
  }

  function startTimer() {
    if (timer.value || timeRemaining.value <= 0) return;

    timer.value = setInterval(() => {
      if (timeRemaining.value > 0) timeRemaining.value--;
      else finishTest();
    }, 1000);
  }

  function stopTimer() {
    if (timer.value) {
      clearInterval(timer.value);
      timer.value = null;
    }
  }

  function finishTest() {
    stopTimer();
    isTestFinished.value = true;
    navigateTo("/student/");
  }

  return {
    test,
    questions,
    answers,
    currentQuestionIndex,
    currentQuestion,
    timeRemaining,
    isTestFinished,
    totalQuestions,
    isFirstQuestion,
    isLastQuestion,
    correctCount,
    incorrectCount,
    unansweredCount,
    initTest,
    answerQuestion,
    getAnswer,
    previousQuestion,
    nextQuestion,
    goToQuestion,
    startTimer,
    stopTimer,
    finishTest,
    selectAnswer,
  };
});
