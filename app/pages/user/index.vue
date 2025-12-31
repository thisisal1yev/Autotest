<script setup lang="ts">
definePageMeta({
  layout: "user",
  middleware: ["auth", "role"],
});

const { isNotificationsSlideoverOpen } = useDashboard();

const { data } = useFetch("/api/auth/me", {
  method: "GET",
});
</script>

<template>
  <UDashboardPanel id="student-home">
    <template #header>
      <UDashboardNavbar title="Main" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UTooltip text="Notifications" :shortcuts="['N']">
            <UButton
              color="neutral"
              variant="ghost"
              square
              @click="isNotificationsSlideoverOpen = true"
            >
              <UChip color="error" inset>
                <UIcon name="i-lucide-bell" class="size-5 shrink-0" />
              </UChip>
            </UButton>
          </UTooltip>

          <UButton
            icon="i-lucide-play"
            color="primary"
            variant="soft"
            to="/user/tests"
          >
            Start Test
          </UButton>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <h3 class="text-2xl">
        Hello
        <strong> {{ data?.user.fullName ?? "Student" }}! </strong>
        Welcome to
        <strong>
          {{ data?.user.drivingSchool?.name ?? "Your driving school" }}.
        </strong>
      </h3>

      <p class="text-gray-600 dark:text-gray-400 text-sm">
        Welcome to driving school dashboard. Below are your statistics and
        available opportunities.
      </p>
    </template>
  </UDashboardPanel>
</template>
