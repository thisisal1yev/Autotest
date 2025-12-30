import { defineStore } from 'pinia'

export interface Question {
  id: string
  text: string
  type: 'single' | 'multiple'
  options: Array<{
    id: string
    text: string
    isCorrect: boolean
  }>
  points: number
}

export interface Test {
  id: number
  title: string
  description?: string | null
  questions: Question[]
  timeLimit?: number | null
  passingScore: number
  drivingSchoolId: number
  createdAt: Date
  updatedAt: Date
}

export interface TestResult {
  id: number
  userId: number
  testId: number
  score: number
  answers: Record<string, string | string[]>
  passed: boolean
  completedAt: Date
}

interface TestsState {
  tests: Test[]
  testResults: TestResult[]
  currentTest: Test | null
  isLoading: boolean
}

export const useTestsStore = defineStore('tests', {
  state: (): TestsState => ({
    tests: [],
    testResults: [],
    currentTest: null,
    isLoading: false
  }),

  getters: {
    testsBySchool: state => (schoolId: number) => {
      return state.tests.filter(test => test.drivingSchoolId === schoolId)
    },
    userTestResults: state => (userId: number) => {
      return state.testResults.filter(result => result.userId === userId)
    }
  },

  actions: {
    async fetchTests(schoolId?: number) {
      this.isLoading = true
      try {
        const url = schoolId
          ? `/api/admin/tests?schoolId=${schoolId}`
          : '/api/admin/tests'
        const response = await $fetch<{ tests: Test[] }>(url)
        this.tests = response.tests
        return response.tests
      } catch (error) {
        console.error('Error fetching tests:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async fetchUserTests() {
      this.isLoading = true
      try {
        const response = await $fetch<{ tests: Test[] }>('/api/user/tests')
        this.tests = response.tests
        return response.tests
      } catch (error) {
        console.error('Error fetching user tests:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async fetchTest(id: number) {
      this.isLoading = true
      try {
        const response = await $fetch<{ test: Test }>(`/api/admin/tests/${id}`)
        this.currentTest = response.test
        return response.test
      } catch (error) {
        console.error('Error fetching test:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async fetchUserTest(id: number) {
      this.isLoading = true
      try {
        const response = await $fetch<{ test: Test }>(`/api/user/tests/${id}`)
        this.currentTest = response.test
        return response.test
      } catch (error) {
        console.error('Error fetching user test:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async createTest(testData: Omit<Test, 'id' | 'createdAt' | 'updatedAt'>) {
      this.isLoading = true
      try {
        const response = await $fetch<{ test: Test }>('/api/admin/tests', {
          method: 'POST',
          body: testData
        })
        this.tests.push(response.test)
        return response.test
      } catch (error) {
        console.error('Error creating test:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async updateTest(id: number, testData: Partial<Test>) {
      this.isLoading = true
      try {
        const response = await $fetch<{ test: Test }>(`/api/admin/tests/${id}`, {
          method: 'PUT',
          body: testData
        })
        const index = this.tests.findIndex(t => t.id === id)
        if (index !== -1) {
          this.tests[index] = response.test
        }
        if (this.currentTest?.id === id) {
          this.currentTest = response.test
        }
        return response.test
      } catch (error) {
        console.error('Error updating test:', error)
        throw error
      } finally {
        this.isLoading = false
      }
    },

    setCurrentTest(test: Test | null) {
      this.currentTest = test
    }
  }
})
