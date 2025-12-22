import { useAuthStore, type User } from "~/stores/auth";

export default defineNuxtRouteMiddleware(async (to) => {
  const path = to.path;
  const authStore = useAuthStore();

  if (!authStore.isAuthenticated) {
    return navigateTo("/login");
  }

  const user = authStore.user;

  if (!user) {
    return navigateTo("/login");
  }

  if (authStore.isSuperadmin) {
    return;
  }

  if (authStore.isAdmin) {
    if (path.startsWith("/superadmin")) {
      return navigateTo("/admin/dashboard");
    }
    if (path.startsWith("/user")) {
      return navigateTo("/admin/dashboard");
    }
    return;
  }

  if (authStore.isUser) {
    if (path.startsWith("/superadmin") || path.startsWith("/admin")) {
      return navigateTo("/user");
    }
    return;
  }

  return navigateTo("/login");
});
