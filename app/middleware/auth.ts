import { useAuthStore } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  if (import.meta.client) {
    const authStore = useAuthStore();
    
    if (!authStore.isAuthenticated) {
      try {
        await authStore.fetchUser();
      } catch {
        return navigateTo("/login");
      }
    }
    return;
  }

  const event = useRequestEvent();
  if (event) {
    const { getUserFromToken } = await import("../../server/utils/auth");
    const payload = await getUserFromToken(event);
    if (!payload) {
      return navigateTo("/login");
    }
  }
});

