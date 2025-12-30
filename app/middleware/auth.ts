export default defineNuxtRouteMiddleware(async () => {
  const session = await useUserSession()

  if (!session.loggedIn.value) {
    return navigateTo('/login')
  }
})
