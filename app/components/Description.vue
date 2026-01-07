<script lang="ts" setup>
interface Props {
  title: Title;
  loading?: boolean;
  error?: boolean;
  options: Options[];
}

interface Title {
  title: string;
  value?: string;
}

interface Options {
  title: string;
  value?: string;
}

defineProps<Props>();
</script>

<template>
  <section>
    <h3 class="text-2xl font-bold">{{ title.title }} {{ title.value }}</h3>

    <div v-if="loading && !error" class="space-y-3">
      <USkeleton class="w-40 h-4" />
      <USkeleton class="w-80 h-4" />
      <USkeleton class="w-60 h-4" />
      <USkeleton class="w-40 h-4" />
    </div>

    <div v-if="!loading && error">
      <p>Error loading</p>
    </div>

    <div v-else class="text-gray-600 dark:text-gray-400">
      <p v-for="option in options">
        <b>{{ option.title }}:</b> {{ option.value }}
      </p>
    </div>
  </section>
</template>
