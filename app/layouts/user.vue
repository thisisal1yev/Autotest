<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const open = ref(false);

const links = [
  [
    {
      label: "Main",
      icon: "i-lucide-home",
      to: "/user",
      onSelect: () => {
        open.value = false;
      },
    },
    {
      label: "Tests",
      icon: "i-lucide-file-text",
      to: "/user/tests",
      onSelect: () => {
        open.value = false;
      },
    },
    {
      label: "Tutorials",
      icon: "i-lucide-list-video",
      to: "/user/tutorials",
      onSelect: () => {
        open.value = false;
      },
    },
    {
      label: "Rating",
      icon: "i-lucide-trophy",
      to: "/user/rating",
      onSelect: () => {
        open.value = false;
      },
    },
    {
      label: "Settings",
      icon: "i-lucide-settings",
      to: "/user/settings",
      onSelect: () => {
        open.value = false;
      },
    },
  ],
] satisfies NavigationMenuItem[][];

const groups = computed(() => [
  {
    id: "links",
    label: "Go to",
    items: links.flat(),
  },
]);
</script>

<template>
  <UDashboardGroup unit="rem">
    <UDashboardSidebar
      id="default"
      v-model:open="open"
      collapsible
      resizable
      class="bg-elevated/25"
      :ui="{ footer: 'lg:border-t lg:border-default' }"
    >
      <template #default="{ collapsed }">
        <UDashboardSearchButton
          :collapsed="collapsed"
          class="bg-transparent ring-default mt-2.5"
        />

        <UNavigationMenu
          :collapsed="collapsed"
          :items="links[0]"
          orientation="vertical"
          size="xl"
          tooltip
          popover
        />
      </template>

      <template #footer="{ collapsed }">
        <UserMenu :collapsed="collapsed" />
      </template>
    </UDashboardSidebar>

    <UDashboardSearch :groups="groups" />

    <slot />

    <NotificationsSlideover />
  </UDashboardGroup>
</template>

