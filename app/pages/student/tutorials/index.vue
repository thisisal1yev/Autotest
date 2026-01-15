<script setup lang="ts">
definePageMeta({
  layout: "student",
  middleware: ["auth", "role"],
});

const {
  data: tutorials,
  pending,
  error,
} = await useAsyncData("tutorials", () => $fetch("/api/student/tutorials"));
</script>

<template>
  <UDashboardPanel id="user-tutorials">
    <template #header>
      <UDashboardNavbar title="Tutorials" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <UPageGrid v-if="!error && pending">
        <USkeleton class="w-[502px] h-[214px]" />
        <USkeleton class="w-[502px] h-[214px]" />
        <USkeleton class="w-[502px] h-[214px]" />
      </UPageGrid>

      <div
        v-else-if="!pending && error"
        class="flex flex-col items-center gap-3 text-error"
      >
        <UIcon name="i-lucide-info" size="64" />

        <p class="text-lg font-medium">{{ error.statusMessage }}</p>
      </div>

      <UPageGrid v-else class="mx-auto">
        <UPageCard
          v-for="(tutorial, index) in tutorials"
          :key="index"
          :title="tutorial.title"
          variant="outline"
          :to="`/student/tutorials/${tutorial.id}`"
          :ui="{
            container: 'gap-1.5',
            wrapper: 'items-start relative z-10',
            leading:
              'p-2.5 rounded-full bg-primary/10 ring ring-inset ring-primary/25 flex-col',
            title: 'font-normal text-muted text-xs uppercase',
          }"
          class="hover:bg-gray-50/10"
        >
          <div class="flex flex-col gap-5">
            <span class="text-2xl font-semibold text-highlighted">
              {{ tutorial.description }}
            </span>

            <div class="flex items-end justify-between">
              <div class="flex flex-col text-sm text-muted">
                <span
                  class="absolute -top-8 right-2 text-[12rem] font-bold select-none pointer-events-none bg-linear-to-br from-foreground/15 via-foreground/10 to-foreground/5 dark:from-primary/50 dark:via-primary/30 dark:to-primary/10 bg-clip-text text-transparent"
                >
                  {{ tutorial.order }}
                </span>
                <span
                  >Duration: {{ formatDuration(tutorial.duration ?? 0) }}</span
                >
                <span>Created at: {{ formatDate(tutorial.createdAt) }}</span>
              </div>

              <UButton
                label="Start"
                trailing-icon="i-lucide-play"
                :to="`/student/tutorials/${tutorial.id}`"
              />
            </div>
          </div>
        </UPageCard>
      </UPageGrid>
    </template>
  </UDashboardPanel>
</template>
