<script setup lang="ts">
definePageMeta({
  layout: "student",
  middleware: ["auth", "role"],
});

const route = useRoute();
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
      <UDashboardNavbar title="Tutorial" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <div></div>

      <div>
        <div>
          <h2 class="text-3xl font-bold">{{ tutorial?.title }}</h2>
          <p>{{ tutorial?.description }}</p>
          <p>Video duration: {{ formatDuration(tutorial?.duration ?? 0) }}</p>
          <p>Created at: {{ formatDate(tutorial?.createdAt ?? "") }}</p>
        </div>

        <video
          :key="tutorial?.id"
          :src="tutorial?.videoUrl"
          :poster="tutorial?.thumbnailUrl ?? ''"
        />
      </div>
    </template>
  </UDashboardPanel>
</template>
