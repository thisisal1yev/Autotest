<script lang="ts" setup>
interface Props {
  isAuthenticated: boolean;
  to: string;
  userName: string;
}

defineProps<Props>();

const headerLinks = ref([
  {
    id: 1,
    label: "How it works",
    to: "/#how-it-works",
  },
  {
    id: 2,
    label: "Features",
    to: "/#features",
  },
  {
    id: 3,
    label: "For schools",
    to: "/#personas",
  },
  {
    id: 4,
    label: "Get started",
    to: "/#get-started",
  },
]);
</script>

<template>
  <header
    class="bg-default/75 backdrop-blur border-b border-default sticky top-0 z-50 flex flex-col"
  >
    <div
      class="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6"
    >
      <NuxtLink to="/" class="flex items-center gap-2">
        <NuxtImg
          alt="logo"
          src="/logo.jpg"
          width="32"
          height="32"
          class="rounded-xl"
        />

        <div class="flex flex-col">
          <span class="text-sm font-semibold"> EDU Autotest </span>

          <span class="text-xs text-gray-500 dark:text-gray-400">
            Driving school testing platform
          </span>
        </div>
      </NuxtLink>

      <nav
        class="hidden md:flex items-center gap-6 text-sm text-gray-600 dark:text-gray-300"
      >
        <NuxtLink
          v-for="{ id, label, to } in headerLinks"
          :to="to"
          :key="id"
          class="hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
        >
          {{ label }}
        </NuxtLink>
      </nav>

      <div class="flex items-center gap-3">
        <UButton to="/pricing" size="sm" variant="ghost"> Pricing </UButton>

        <template v-if="isAuthenticated">
          <NuxtLink :to="to">
            <div
              class="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 font-semibold"
            >
              {{ userName }}
            </div>
          </NuxtLink>
        </template>

        <template v-else>
          <UButton to="/login" size="sm"> Sign in </UButton>
        </template>
      </div>
    </div>
  </header>
</template>
