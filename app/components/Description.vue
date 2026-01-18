<script setup lang="ts">
interface InfoItem {
  label: string;
  value: string | number;
}

defineProps<{
  title?: string;
  items: InfoItem[];
  loading?: boolean;
  error?: boolean;
}>();
</script>

<template>
  <section class="space-y-4">
    <h3 v-if="title" class="text-2xl font-bold">{{ title }}</h3>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <div v-for="i in 6" :key="i" class="space-y-2">
        <USkeleton class="w-16 h-3" />
        <USkeleton class="w-24 h-5" />
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="text-error">
      <p>Error loading data</p>
    </div>

    <!-- Content -->
    <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-4">
      <div v-for="item in items" :key="item.label" class="space-y-1">
        <p class="text-xs text-muted uppercase">{{ item.label }}</p>
        <p class="font-medium">{{ item.value }}</p>
      </div>
    </div>
  </section>
</template>