import { defineStore } from "pinia";
import { useAuthStore } from "~/stores/auth";

export interface DrivingSchool {
  id: number;
  name: string;
  email?: string | null;
  phone?: string | null;
  address?: string | null;
  createdAt: Date;
  updatedAt: Date;
}

interface DrivingSchoolState {
  currentSchool: DrivingSchool | null;
  schools: DrivingSchool[];
  isLoading: boolean;
}

export const useDrivingSchoolStore = defineStore("drivingSchool", {
  state: (): DrivingSchoolState => ({
    currentSchool: null,
    schools: [],
    isLoading: false,
  }),

  getters: {
    currentSchoolId: (state): number | null => state.currentSchool?.id || null,
  },

  actions: {
    async fetchCurrentSchool() {
      const authStore = useAuthStore();
      if (authStore.user?.drivingSchool) {
        this.currentSchool = authStore.user.drivingSchool as DrivingSchool;
      }
    },

    async fetchAllSchools() {
      this.isLoading = true;
      try {
        const response = await $fetch<{ schools: DrivingSchool[] }>(
          "/api/driving-schools",
        );
        this.schools = response.schools;
        return response.schools;
      } catch (error) {
        console.error("Error fetching schools:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    setCurrentSchool(school: DrivingSchool | null) {
      this.currentSchool = school;
    },
  },
});

