import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

export interface User {
  id: number
  email: string
  login: string
  fullName: string
  role: 'USER' | 'ADMIN' | 'SUPERADMIN'
  drivingSchoolId?: number | null
  drivingSchool?: {
    id: number
    name: string
    email?: string | null
    phone?: string | null
    address?: string | null
  } | null
}

export const useAuthStore = defineStore('auth', () => {
  const isLoading = ref(false)

  const session = useUserSession()

  const user = computed<User | null>(() => {
    return (session.user.value as User) || null
  })

  const isAuthenticated = computed<boolean>(() => {
    return session.loggedIn.value
  })

  const isSuperadmin = computed<boolean>(() => {
    return user.value?.role === 'SUPERADMIN'
  })

  const isAdmin = computed<boolean>(() => {
    return user.value?.role === 'ADMIN'
  })

  const isUser = computed<boolean>(() => {
    return user.value?.role === 'USER'
  })

  const currentDrivingSchoolId = computed<number | null>(() => {
    return user.value?.drivingSchoolId || null
  })

  async function login(loginValue: string, password: string) {
    isLoading.value = true
    try {
      const response = await $fetch<{ user: User }>('/api/auth/login', {
        method: 'POST',
        body: { login: loginValue, password }
      })
      await session.fetch()
      return response.user
    } catch (error) {
      console.error(error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  async function logout() {
    try {
      await $fetch('/api/auth/logout', {
        method: 'POST'
      })
      await session.clear()
    } catch (error) {
      console.error('Logout error:', error)
      await session.clear()
    }
  }

  async function fetchUser() {
    isLoading.value = true
    try {
      const response = await $fetch<{ user: User }>('/api/auth/me')
      await session.fetch()
      return response.user
    } catch (error) {
      await session.clear()
      throw error
    } finally {
      isLoading.value = false
    }
  }

  function setUser(userValue: User | null) {
    if (userValue) {
      // Ensure the id is a string, as required by UserSession
      session.session.value = {
        ...userValue,
        id: String(userValue.id)
      }
    } else {
      session.session.value = null
    }
  }

  return {
    isLoading,
    user,
    isAuthenticated,
    isSuperadmin,
    isAdmin,
    isUser,
    currentDrivingSchoolId,
    login,
    logout,
    fetchUser,
    setUser
  }
})
