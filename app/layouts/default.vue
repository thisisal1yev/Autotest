<script lang="ts" setup>
import { useAuthStore } from "~/stores/auth";

const authStore = useAuthStore();

const toDashboard = computed(() => {
  if (authStore.user?.role === "SUPERADMIN") {
    return "/superadmin/";
  } else if (authStore.user?.role === "ADMIN") {
    return "/admin/dashboard";
  } else {
    return "/user/";
  }
});
</script>

<template>
  <Header :to="toDashboard" :isAuthenticated="authStore.isAuthenticated" />

  <main>
    <slot />
  </main>
</template>
