<script setup lang="ts">
import type { AuthFormField, ButtonProps, TabsItem, FormSubmitEvent } from "@nuxt/ui";

definePageMeta({
  layout: "auth",
  middleware: ['role']
});

const authStore = useAuthStore();
const router = useRouter();
const toast = useToast();

const activeTab = ref("login");
const isLoading = ref(false);
const error = ref<string | null>(null);

const TABS: TabsItem[] = [
  { label: "Sign In", value: "login", icon: "i-lucide-log-in" },
  { label: "Sign Up", value: "register", icon: "i-lucide-user-plus" },
];

const LOGIN_FIELDS: AuthFormField[] = [
  {
    name: "login",
    type: "text",
    label: "Login",
    placeholder: "Enter your login",
    required: true,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
    required: true,
  },
  {
    name: "remember",
    type: "checkbox",
    label: "Remember me",
  },
];

const REGISTER_FIELDS: AuthFormField[] = [
  {
    name: "name",
    type: "text",
    label: "Full Name",
    placeholder: "Indiana Jones",
    required: true,
  },
  {
    name: "email",
    type: "email",
    label: "Email",
    placeholder: "example@email.com",
    required: true,
  },
  {
    name: "password",
    type: "password",
    label: "Password",
    placeholder: "Create a password",
    required: true,
  },
];

const PROVIDERS: ButtonProps[] = [
  {
    label: "Google",
    icon: "i-simple-icons-google",
    color: "neutral",
    variant: "subtle",
    onClick: () => { toast.add({ title: "Coming soon", description: "Google login is not available yet" }) },
  },
  {
    label: "GitHub",
    icon: "i-simple-icons-github",
    color: "neutral",
    variant: "subtle",
    onClick: () => { toast.add({ title: "Coming soon", description: "GitHub login is not available yet" }) },
  },
];

const handleLogin = async (payload: FormSubmitEvent<{ login: string; password: string; remember?: boolean }>) => {
  const { login, password } = payload.data;

  if (!login || !password) {
    error.value = "Please fill in all fields";
    return;
  }

  isLoading.value = true;
  error.value = null;

  try {
    await authStore.login(login, password);
    const route = getRoleRoute(authStore.user!.role);
    await router.push(route);
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : "Invalid credentials";
  } finally {
    isLoading.value = false;
  }
};

// TODO: Keyinchalik qoshish
const handleRegister = async (payload: FormSubmitEvent<{ name: string; email: string; password: string }>) => {
  const { name, email, password } = payload.data;

  if (!name || !email || !password) {
    error.value = "Please fill in all fields";
    return;
  }

  isLoading.value = true;
  error.value = null;

  console.log(payload.data)
};

watch(activeTab, () => {
  error.value = null;
});
</script>

<template>
  <div class="w-full max-w-md">
    <div class="mb-8 text-center">
      <NuxtLink to="/" class="inline-block">
        <NuxtImg src="/logo.jpg" alt="EDU Autotest" width="56" height="56" class="mx-auto rounded-xl" />
      </NuxtLink>
    </div>

    <UPageCard>
      <UTabs v-model="activeTab" :items="TABS" class="mb-6" :ui="{
        list: 'w-full',
        trigger: 'flex-1 justify-center',
      }" />

      <UAuthForm v-if="activeTab === 'login'" title="Welcome back" description="Sign in to your account to continue"
        icon="i-lucide-lock" :fields="LOGIN_FIELDS" :providers="PROVIDERS" :loading="isLoading"
        :submit="{ label: 'Sign In', icon: 'i-lucide-log-in' }" @submit="handleLogin">
        <template #password-hint>
          <ULink to="/forgot-password" class="text-primary text-sm" tabindex="-1">
            Forgot password?
          </ULink>
        </template>

        <template #validation>
          <UAlert v-if="error" color="error" variant="soft" icon="i-lucide-alert-circle" :title="error" class="mt-4" />
        </template>
      </UAuthForm>

      <UAuthForm v-else title="Create account" description="Sign up to get started with EDU Autotest"
        icon="i-lucide-user-plus" :fields="REGISTER_FIELDS" :providers="PROVIDERS" :loading="isLoading"
        :submit="{ label: 'Create Account', icon: 'i-lucide-user-plus' }" @submit="handleRegister">
        <template #validation>
          <UAlert v-if="error" color="error" variant="soft" icon="i-lucide-alert-circle" :title="error" class="mt-4" />
        </template>

        <template #footer>
          <p class="text-muted text-sm">
            By signing up, you agree to our
            <ULink to="/terms" class="text-primary">Terms of Service</ULink>
          </p>
        </template>
      </UAuthForm>
    </UPageCard>

    <div class="mt-6 text-center">
      <UButton to="/" variant="ghost" color="neutral" size="sm" icon="i-lucide-arrow-left">
        Back to home
      </UButton>
    </div>
  </div>
</template>