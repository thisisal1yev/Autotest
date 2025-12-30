<script lang="ts" setup>
import type { DropdownMenuItem } from "@nuxt/ui";

const navItems = [
  { title: "Map", to: "/home", icon: "lucide:map" },
  { title: "Sessions", to: "/sessions", icon: "lucide:clock" },
  { title: "Profile", to: "/profile", icon: "lucide:circle-user" },
];

const items: DropdownMenuItem[][] = [
  [
    {
      label: "Profile",
      icon: "i-lucide-circle-user",
    },
  ],
  [
    {
      label: "Copy",
      icon: "i-lucide-",
    },
    {
      label: "Logout",
      color: "error",
      icon: "i-lucide-log-out",
    },
  ],
];
</script>

<template>
  <header class="border-b border-gray-200 dark:border-gray-700 py-4">
    <div class="flex items-center justify-between container mx-auto px-4">
      <NuxtLink to="/" class="flex items-center space-x-2">
        <Icon name="mdi:car-multiple" class="w-6 h-6 text-primary" size="24" />

        <span class="text-xl font-bold">Parking</span>
      </NuxtLink>

      <nav class="space-x-5 flex">
        <div v-for="item in navItems">
          <UButton
            color="neutral"
            size="lg"
            :to="item.to"
            :variant="$route.path === item.to ? 'soft' : 'ghost'"
          >
            <Icon :name="item.icon" class="w-6 h-6 mr-1" size="24" />

            <span>{{ item.title }}</span>
          </UButton>
        </div>
      </nav>

      <div class="flex items-center">
        <UColorModeButton as="button" class="mr-2" />

        <ClientOnly>
          <UDropdownMenu
            :items="items"
            :content="{ align: 'start' }"
            :ui="{ content: 'w-48' }"
          >
            <UAvatar src="https://github.com/benjamincanac.png" size="lg" />
          </UDropdownMenu>
        </ClientOnly>
      </div>
    </div>
  </header>
</template>
