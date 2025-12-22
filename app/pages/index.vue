<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { getRoleRoute } from "~/utils/constants";

definePageMeta({
  layout: "default",
  middleware: [],
});

const authStore = useAuthStore();

onMounted(async () => {
  if (!authStore.isAuthenticated) {
    try {
      await authStore.fetchUser();
    } catch {
      return;
    }
  }

  if (authStore.isAuthenticated && authStore.user) {
    const route = getRoleRoute(authStore.user.role);
    await navigateTo(route);
  }
});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
    <div class="max-w-4xl w-full text-center space-y-8 p-8">
      <h1 class="text-5xl font-extrabold text-gray-900 dark:text-white">
        EDU Avtotest
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400">
        Multi-tenant platform for driving schools
      </p>
      <div class="mt-8">
        <UButton to="/login" size="xl" class="px-8">
          Sign In
        </UButton>
      </div>
    </div>
  </div>
</template>