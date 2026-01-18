const GUEST_ONLY_ROUTES = ['/auth', '/terms', '/forgot-password']

const ROLE_REDIRECTS: Record<string, string> = {
  SUPERADMIN: '/superadmin',
  ADMIN: '/admin',
  STUDENT: '/student',
}

export default defineNuxtRouteMiddleware(async (to) => {
  const { loggedIn, user } = useUserSession()
  const path = to.path

  const role = (user.value as { role?: 'STUDENT' | 'ADMIN' | 'SUPERADMIN' } | null)?.role
  const isGuestRoute = GUEST_ONLY_ROUTES.some(route => path.startsWith(route))

  if (loggedIn.value && user.value && role && isGuestRoute) {
    return navigateTo(ROLE_REDIRECTS[role] || '/')
  }

  if (!loggedIn.value || !user.value || !role) {
    if (!isGuestRoute) {
      return navigateTo('/auth')
    }
    return
  }

  switch (role) {
    case 'SUPERADMIN':
      if (path === '/') {
        return navigateTo('/superadmin')
      }
      return

    case 'ADMIN':
      if (path.startsWith('/superadmin') || path.startsWith('/student')) {
        return navigateTo('/admin')
      }
      if (path === '/') {
        return navigateTo('/admin')
      }
      return

    case 'STUDENT':
      if (path.startsWith('/superadmin') || path.startsWith('/admin')) {
        return navigateTo('/student')
      }
      if (path === '/') {
        return navigateTo('/student')
      }
      return

    default:
      return navigateTo('/auth')
  }
})