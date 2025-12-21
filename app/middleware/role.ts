import { useAuthStore } from "~/stores/auth";

type Role = "USER" | "ADMIN" | "SUPERADMIN";

export default defineNuxtRouteMiddleware(async (to) => {
  const path = to.path;
  let userRole: Role | null = null;

  // On client side, check auth store
  if (import.meta.client) {
    const authStore = useAuthStore();
    if (!authStore.isAuthenticated) {
      try {
        await authStore.fetchUser();
      } catch {
        return navigateTo("/login");
      }
    }
    if (authStore.user) {
      userRole = authStore.user.role as Role;
    } else {
      return navigateTo("/login");
    }
  } else {
    // On server side, check JWT token
    const event = useRequestEvent();
    if (event) {
      const { getUserFromToken } = await import("../../server/utils/auth");
      const payload = await getUserFromToken(event);
      if (!payload) {
        return navigateTo("/login");
      }
      userRole = payload.role as Role;
    } else {
      return navigateTo("/login");
    }
  }

  if (!userRole) {
    return navigateTo("/login");
  }

  // Superadmin can access everything
  if (userRole === "SUPERADMIN") {
    return;
  }

  // Admin can only access admin routes
  if (userRole === "ADMIN") {
    if (path.startsWith("/superadmin")) {
      return navigateTo("/admin/dashboard");
    }
    if (path.startsWith("/user")) {
      return navigateTo("/admin/dashboard");
    }
    return;
  }

  // User can only access user routes
  if (userRole === "USER") {
    if (path.startsWith("/superadmin") || path.startsWith("/admin")) {
      return navigateTo("/user");
    }
    return;
  }

  // Default: redirect to login
  return navigateTo("/login");
});

