interface Answer {
  optionId: number
  isCorrect: boolean
}

interface QuestionOption {
  id: number
  answerOption: string
  isCorrect: boolean
}

interface Question {
  id: number
  title: string
  imgPath?: string | null
  options: QuestionOption[]
}

interface StudentTest {
  id: number | string
  title: string
  timeLimit?: number | null
}

interface StudentTestResponse {
  test: StudentTest
  questions: Question[]
}

export const useStudentTestStore = defineStore('studentTest', () => {
  const test = ref<StudentTest | null>(null)
  const questions = ref<Question[]>([])
  const currentQuestionIndex = ref(0)

  // key = questionId
  const answers = ref<Record<number, Answer>>({})

  const timeRemaining = ref(0)
  const isTestFinished = ref(false)
  const timer = ref<ReturnType<typeof setInterval> | null>(null)

  /* ================= COMPUTED ================= */

  const totalQuestions = computed(() => questions.value.length)

  const currentQuestion = computed(
    () => questions.value[currentQuestionIndex.value] ?? null
  )

  const isFirstQuestion = computed(() => currentQuestionIndex.value === 0)

  const isLastQuestion = computed(
    () => currentQuestionIndex.value === totalQuestions.value - 1
  )

  const correctCount = computed(
    () => Object.values(answers.value).filter(a => a.isCorrect).length
  )

  const incorrectCount = computed(
    () => Object.values(answers.value).filter(a => !a.isCorrect).length
  )

  const unansweredCount = computed(
    () => totalQuestions.value - Object.keys(answers.value).length
  )

  /* ================= ACTIONS ================= */

  function initTest(payload: StudentTestResponse) {
    test.value = payload.test
    questions.value = payload.questions
    currentQuestionIndex.value = 0
    answers.value = {}
    isTestFinished.value = false
    timeRemaining.value = payload.test.timeLimit
      ? payload.test.timeLimit * 60
      : 0
  }

  function answerQuestion(questionId: number, option: QuestionOption) {
    if (answers.value[questionId]) return

    answers.value[questionId] = {
      optionId: option.id,
      isCorrect: option.isCorrect
    }
  }

  function getAnswer(questionId: number) {
    return answers.value[questionId] ?? null
  }

  function previousQuestion() {
    if (!isFirstQuestion.value) currentQuestionIndex.value--
  }

  function nextQuestion() {
    if (!isLastQuestion.value) currentQuestionIndex.value++
  }

  function goToQuestion(index: number) {
    if (index >= 0 && index < totalQuestions.value) {
      currentQuestionIndex.value = index
    }
  }

  function startTimer() {
    if (timer.value || timeRemaining.value <= 0) return

    timer.value = setInterval(() => {
      if (timeRemaining.value > 0) timeRemaining.value--
      else finishTest()
    }, 1000)
  }

  function stopTimer() {
    if (timer.value) {
      clearInterval(timer.value)
      timer.value = null
    }
  }

  function finishTest() {
    stopTimer()
    isTestFinished.value = true
    navigateTo('/student/')
  }

  function selectAnswer(qId: number, oId: number) {
    const question = questions.value.find(q => q.id === qId)
    const option = question?.options.find(o => o.id === oId)
    if (!option) return
    answers.value[qId] = { optionId: oId, isCorrect: option.isCorrect }
  }  
  
  return {
    // state
    test,
    questions,
    answers,
    currentQuestionIndex,
    currentQuestion,
    timeRemaining,
    isTestFinished,

    // computed
    totalQuestions,
    isFirstQuestion,
    isLastQuestion,
    correctCount,
    incorrectCount,
    unansweredCount,

    // actions
    initTest,
    answerQuestion,
    getAnswer,
    previousQuestion,
    nextQuestion,
    goToQuestion,
    startTimer,
    stopTimer,
    finishTest,
    selectAnswer
  }
})
