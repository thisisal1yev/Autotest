import { defineStore } from "pinia";

export interface Tutorial {
  id: number;
  title: string;
  description?: string | null;
  videoUrl: string;
  thumbnailUrl?: string | null;
  duration?: number | null;
  order: number;
  drivingSchoolId: number;
  createdAt: Date;
  updatedAt: Date;
}

interface TutorialsState {
  tutorials: Tutorial[];
  currentTutorial: Tutorial | null;
  isLoading: boolean;
}

export const useTutorialsStore = defineStore("tutorials", {
  state: (): TutorialsState => ({
    tutorials: [],
    currentTutorial: null,
    isLoading: false,
  }),

  getters: {
    tutorialsBySchool: (state) => (schoolId: number) => {
      return state.tutorials
        .filter((tutorial) => tutorial.drivingSchoolId === schoolId)
        .sort((a, b) => a.order - b.order);
    },
  },

  actions: {
    async fetchTutorials(schoolId?: number) {
      this.isLoading = true;
      try {
        const url = schoolId
          ? `/api/admin/tutorials?schoolId=${schoolId}`
          : "/api/admin/tutorials";
        const response = await $fetch<{ tutorials: Tutorial[] }>(url);
        this.tutorials = response.tutorials;
        return response.tutorials;
      } catch (error) {
        console.error("Error fetching tutorials:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchUserTutorials() {
      this.isLoading = true;
      try {
        const response = await $fetch<{ tutorials: Tutorial[] }>(
          "/api/user/tutorials",
        );
        this.tutorials = response.tutorials;
        return response.tutorials;
      } catch (error) {
        console.error("Error fetching user tutorials:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchTutorial(id: number) {
      this.isLoading = true;
      try {
        const response = await $fetch<{ tutorial: Tutorial }>(
          `/api/admin/tutorials/${id}`,
        );
        this.currentTutorial = response.tutorial;
        return response.tutorial;
      } catch (error) {
        console.error("Error fetching tutorial:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async fetchUserTutorial(id: number) {
      this.isLoading = true;
      try {
        const response = await $fetch<{ tutorial: Tutorial }>(
          `/api/user/tutorials/${id}`,
        );
        this.currentTutorial = response.tutorial;
        return response.tutorial;
      } catch (error) {
        console.error("Error fetching user tutorial:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async createTutorial(
      tutorialData: Omit<Tutorial, "id" | "createdAt" | "updatedAt">,
    ) {
      this.isLoading = true;
      try {
        const response = await $fetch<{ tutorial: Tutorial }>(
          "/api/admin/tutorials",
          {
            method: "POST",
            body: tutorialData,
          },
        );
        this.tutorials.push(response.tutorial);
        return response.tutorial;
      } catch (error) {
        console.error("Error creating tutorial:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    async updateTutorial(id: number, tutorialData: Partial<Tutorial>) {
      this.isLoading = true;
      try {
        const response = await $fetch<{ tutorial: Tutorial }>(
          `/api/admin/tutorials/${id}`,
          {
            method: "PUT",
            body: tutorialData,
          },
        );
        const index = this.tutorials.findIndex((t) => t.id === id);
        if (index !== -1) {
          this.tutorials[index] = response.tutorial;
        }
        if (this.currentTutorial?.id === id) {
          this.currentTutorial = response.tutorial;
        }
        return response.tutorial;
      } catch (error) {
        console.error("Error updating tutorial:", error);
        throw error;
      } finally {
        this.isLoading = false;
      }
    },

    setCurrentTutorial(tutorial: Tutorial | null) {
      this.currentTutorial = tutorial;
    },
  },
});

