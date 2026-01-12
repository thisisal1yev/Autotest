export default defineNuxtRouteMiddleware(async (to) => {
  const path = to.path
  const session = useUserSession()

  if (!session.loggedIn.value) {
    return navigateTo('/login')
  }

  const user = session.user.value as { role?: 'STUDENT' | 'ADMIN' | 'SUPERADMIN' } | null

  if (!user) {
    return navigateTo('/login')
  }

  const role = user.role

  if (role === 'SUPERADMIN') {
    return
  }

  if (role === 'ADMIN') {
    if (path.startsWith('/superadmin')) {
      return navigateTo('/admin/dashboard')
    }
    if (path.startsWith('/student')) {
      return navigateTo('/admin/dashboard')
    }
    return
  }

  if (role === 'STUDENT') {
    if (path.startsWith('/superadmin') || path.startsWith('/admin')) {
      return navigateTo('/student')
    }
    return
  }

  return navigateTo('/login')
})