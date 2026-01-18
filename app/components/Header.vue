<script lang="ts" setup>
interface Props {
  isAuthenticated?: boolean;
  userDashboardUrl?: string;
  userInitials?: string;
}

withDefaults(defineProps<Props>(), {
  isAuthenticated: false,
  userDashboardUrl: "/dashboard",
  userInitials: "U",
});

const NAV_LINKS = [
  { label: "Features", to: "/#features" },
  { label: "How it works", to: "/#how-it-works" },
  { label: "FAQ", to: "/#faq" },
] as const;

const isMobileMenuOpen = ref(false);
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-default bg-default/80 backdrop-blur-lg">
    <div class="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
      <NuxtLink to="/" class="flex items-center gap-2.5">
        <NuxtImg src="/logo.jpg" alt="EDU Autotest" width="36" height="36" class="rounded-lg" />
        <div class="flex-col flex">
          <span class="text-sm font-semibold leading-tight">EDU Autotest</span>
          <span class="text-xs text-muted hidden sm:inline-block">Driving school platform</span>
        </div>
      </NuxtLink>

      <nav class="hidden items-center gap-1 md:flex">
        <UButton v-for="link in NAV_LINKS" :key="link.to" :to="link.to" variant="ghost" color="neutral">
          {{ link.label }}
        </UButton>
      </nav>

      <div class="flex items-center gap-2">
        <UButton to="/pricing" variant="ghost" color="neutral" class="hidden sm:inline-flex">
          Pricing
        </UButton>

        <template v-if="isAuthenticated">
          <UButton :to="userDashboardUrl" color="primary" variant="soft" class="user">
            {{ userInitials }}
          </UButton>
        </template>

        <template v-else>
          <UButton to="/auth">
            Sign in
          </UButton>
        </template>

        <UButton variant="ghost" color="neutral" class="md:hidden"
          :icon="isMobileMenuOpen ? 'i-lucide-x' : 'i-lucide-menu'" @click="isMobileMenuOpen = !isMobileMenuOpen" />
      </div>
    </div>

    <Transition enter-active-class="transition duration-200 ease-out" enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0" leave-active-class="transition duration-150 ease-in"
      leave-from-class="opacity-100 translate-y-0" leave-to-class="opacity-0 -translate-y-2">
      <nav v-if="isMobileMenuOpen" class="border-t border-default bg-default px-4 py-3 md:hidden">
        <div class="flex flex-col gap-1">
          <UButton v-for="link in NAV_LINKS" :key="link.to" :to="link.to" variant="ghost" color="neutral"
            block class="justify-start" @click="isMobileMenuOpen = false">
            {{ link.label }}
          </UButton>

          <USeparator class="my-2" />
          
          <UButton to="/pricing" variant="ghost" color="neutral" block class="justify-start"
            @click="isMobileMenuOpen = false">
            Pricing
          </UButton>
        </div>
      </nav>
    </Transition>
  </header>
</template>