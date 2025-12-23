export default defineNuxtRouteMiddleware(async (to) => {
  const session = await useUserSession();
  
  if (!session.loggedIn.value) {
      return navigateTo("/login");
  }
});
