<script setup lang="ts">
interface RecentAction {
  id: number
  type: string
  title: string
  description: string
  icon: string
  date: string
  unread?: boolean
}

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const { isNotificationsSlideoverOpen } = useDashboard()
const { data: actions } = await useFetch<RecentAction[]>(
  '/api/notifications'
)
</script>

<template>
  <USlideover
    v-model:open="isNotificationsSlideoverOpen"
    title="Recent Actions"
  >
    <template #body>
      <div
        v-for="action in actions"
        :key="action.id"
        class="px-3 py-2.5 rounded-md hover:bg-elevated/50 flex items-start gap-3 relative -mx-3 first:-mt-3 last:-mb-3 cursor-pointer"
      >
        <UChip
          color="primary"
          :show="!!action.unread"
          inset
        >
          <div
            class="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"
          >
            <UIcon
              :name="action.icon"
              class="w-5 h-5 text-primary"
            />
          </div>
        </UChip>

        <div class="text-sm flex-1 min-w-0">
          <p class="flex items-start justify-between gap-2">
            <span class="text-highlighted font-medium">
              {{ action.title }}
            </span>

            <time
              :datetime="action.date"
              class="text-muted text-xs whitespace-nowrap"
              v-text="formatDate(new Date(action.date))"
            />
          </p>

          <p class="text-dimmed mt-1">
            {{ action.description }}
          </p>
        </div>
      </div>

      <div
        v-if="!actions || actions.length === 0"
        class="flex flex-col items-center justify-center py-12"
      >
        <UIcon
          name="i-lucide-bell-off"
          class="w-12 h-12 text-muted mb-4"
        />
        <p class="text-muted">
          No recent actions
        </p>
      </div>
    </template>
  </USlideover>
</template>
