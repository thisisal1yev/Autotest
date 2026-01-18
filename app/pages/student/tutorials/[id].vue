<script setup lang="ts">
definePageMeta({
  layout: "student",
  middleware: ["auth", "role"],
});

const route = useRoute();
const router = useRouter();
const tutorialId = computed(() => route.params.id as string);

const {
  data: tutorial,
  pending,
  error,
} = await useFetch(`/api/student/tutorials/${tutorialId.value}`);
</script>

<template>
  <UDashboardPanel id="watch-tutorial">
    <template #header>
      <UDashboardNavbar :title="tutorial?.title ?? 'Tutorial Detail'">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div v-if="pending" class="flex items-center justify-center py-24">
        <UIcon name="i-lucide-loader-2" class="size-8 animate-spin text-primary" />
      </div>

      <div v-else-if="error" class="mx-auto max-w-md py-24 text-center">
        <UIcon name="i-lucide-alert-circle" class="mx-auto size-12 text-error" />
        <h3 class="mt-4 text-lg font-semibold">Failed to load tutorial</h3>
        <p class="mt-2 text-muted">{{ error.message }}</p>
        <UButton class="mt-4" @click="router.back()">Go Back</UButton>
      </div>

      <div v-else-if="tutorial" class="space-y-6">
        <div class="overflow-hidden rounded-xl bg-black">
          <video :key="tutorial.id" :src="tutorial.videoUrl" :poster="tutorial.thumbnailUrl ?? undefined" controls
            controlslist="nodownload" class="aspect-video w-full">
            Your browser does not support the video tag.
          </video>
        </div>

        <div class="space-y-4">
          <h1 class="text-2xl font-bold">{{ tutorial.title }}</h1>

          <div class="flex flex-wrap items-center gap-4 text-sm text-muted">
            <span class="flex items-center gap-1.5">
              <UIcon name="i-lucide-clock" class="size-4" />
              {{ formatDuration(tutorial.duration ?? 0) }}
            </span>

            <span class="flex items-center gap-1.5">
              <UIcon name="i-lucide-calendar" class="size-4" />
              {{ formatDate(tutorial.createdAt ?? "") }}
            </span>
          </div>

          <USeparator />

          <p class="text-muted leading-relaxed">{{ tutorial.description }}</p>
        </div>
      </div>
    </template>
  </UDashboardPanel>
</template>