import { defineStore } from "pinia";

export interface User {
  id: number;
  email: string;
  login: string;
  fullName: string;
  role: "USER" | "ADMIN" | "SUPERADMIN";
  drivingSchoolId?: number | null;
  drivingSchool?: {
    id: number;
    name: string;
    email?: string | null;
    phone?: string | null;
    address?: string | null;
  } | null;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
  }),

  getters: {
    isSuperadmin: (state): boolean => state.user?.role === "SUPERADMIN",
    isAdmin: (state): boolean => state.user?.role === "ADMIN",
    isUser: (state): boolean => state.user?.role === "USER",
    currentDrivingSchoolId: (state): number | null => 
      state.user?.drivingSchoolId || null,
  },

  actions: {
    async login(login: string, password: string) {
      this.isLoading = true;
      try {
        const response = await $fetch<{ user: User }>("/api/auth/login", {
          method: "POST",
          body: { login, password },
        });
        this.user = response.user;
        this.isAuthenticated = true;
        return response.user;
      } catch (error) {
        this.user = null;
        this.isAuthenticated = false;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async logout() {
      try {
        await $fetch("/api/auth/logout", {
          method: "POST",
        });
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        this.user = null;
        this.isAuthenticated = false;
      }
    },

    async fetchUser() {
      this.isLoading = true;
      try {
        const response = await $fetch<{ user: User }>("/api/auth/me");
        this.user = response.user;
        this.isAuthenticated = true;
        return response.user;
      } catch (error) {
        this.user = null;
        this.isAuthenticated = false;
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    setUser(user: User | null) {
      this.user = user;
      this.isAuthenticated = !!user;
    },
  },
});

