<script setup lang="ts">
import { useAuthStore } from "~/stores/auth";
import { getRoleRoute } from "~/utils/constants";

definePageMeta({
  layout: "default",
  middleware: [],
});

const authStore = useAuthStore();
const router = useRouter();

const login = ref("");
const password = ref("");
const isLoading = ref(false);
const error = ref<string | null>(null);

const handleLogin = async () => {
  if (!login.value || !password.value) {
    error.value = "Please enter login and password";
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    await authStore.login(login.value, password.value);
    const route = getRoleRoute(authStore.user!.role);
    await router.push(route);
  } catch (err: any) {
    error.value = err.data?.message || "Invalid credentials";
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900"
  >
    <div class="max-w-md w-full space-y-8 p-8">
      <div>
        <h2
          class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white"
        >
          EDU Avtotest
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Sign in to your account
        </p>
      </div>
      <form class="mt-6 space-y-6" @submit.prevent="handleLogin">
        <div class="space-y-4">
          <UInput
            v-model="login"
            label="Login"
            class="w-full"
            placeholder="Enter your login"
            required
            variant="outline"
            :disabled="isLoading"
          />

          <UInput
            v-model="password"
            type="password"
            label="Password"
            class="w-full"
            placeholder="Enter your password"
            required
            variant="outline"
            :disabled="isLoading"
          />
        </div>

        <UAlert
          v-if="error"
          color="error"
          variant="soft"
          :title="error"
          class="mt-4"
        />

        <UButton
          type="submit"
          block
          size="lg"
          :loading="isLoading"
          class="mt-6"
        >
          Sign in
        </UButton>
      </form>
    </div>
  </div>
</template>
