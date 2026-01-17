import { defineStore } from "pinia";
import { computed, ref } from "vue";
import type { User } from "~~/generated/prisma/client";

export const useAuthStore = defineStore("auth", () => {
  const session = useUserSession();
  const isLoading = ref(false);

  const user = computed(() => session.user.value as User | null);
  const isAuthenticated = computed(() => session.loggedIn.value);
  const role = computed(() => user.value?.role);
  const isSuperadmin = computed(() => role.value === "SUPERADMIN");
  const isAdmin = computed(() => role.value === "ADMIN");
  const isStudent = computed(() => role.value === "STUDENT");
  const currentDrivingSchoolId = computed(
    () => user.value?.drivingSchoolId ?? null
  );

  function setUser(user: User | null) {
    session.session.value = user ? { ...user, id: String(user.id) } : null;
  }

  async function login(login: string, password: string) {
    isLoading.value = true;
    try {
      const response = await $fetch<{ user: User }>("/api/auth/login", {
        method: "POST",
        body: { login, password },
      });

      if (!response.user) {
        throw new Error("No user in response");
      }

      setUser(response.user);

      await session.fetch();

      return response.user;
    } finally {
      isLoading.value = false;
    }
  }

  async function logout() {
    isLoading.value = true;
    try {
      await $fetch("/api/auth/logout", { method: "POST" });
    } finally {
      setUser(null);
      isLoading.value = false;
    }
  }

  return {
    isLoading,
    user,
    isAuthenticated,
    role,
    isSuperadmin,
    isAdmin,
    isStudent,
    currentDrivingSchoolId,
    login,
    logout,
    setUser,
  };
});
