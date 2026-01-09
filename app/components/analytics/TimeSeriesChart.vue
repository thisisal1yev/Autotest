<script setup lang="ts">
import { VisXYContainer, VisLine, VisAxis, VisArea, VisCrosshair, VisTooltip } from '@unovis/vue'
import type { AnalyticsTimeSeriesPoint } from '~/types/analytics'
import { format, parseISO } from 'date-fns'

const cardRef = useTemplateRef<HTMLElement | null>('cardRef')

const props = defineProps<{
  data: readonly AnalyticsTimeSeriesPoint[] | AnalyticsTimeSeriesPoint[]
  title: string
  valueLabel?: string
  color?: string
}>()

const { width } = useElementSize(cardRef)

const chartData = computed(() => {
  return props.data.map((point, index) => ({
    date: parseISO(point.date),
    value: point.value,
    index
  }))
})

const x = (_: typeof chartData.value[0], i: number) => i
const y = (d: typeof chartData.value[0]) => d.value

const total = computed(() => {
  return chartData.value.reduce((acc, { value }) => acc + value, 0)
})

const formatDate = (date: Date): string => {
  return format(date, 'd MMM')
}

const xTicks = (i: number) => {
  if (i === 0 || i === chartData.value.length - 1 || !chartData.value[i]) {
    return ''
  }
  // Show every nth tick to avoid crowding
  const step = Math.max(1, Math.floor(chartData.value.length / 8))
  if (i % step !== 0 && i !== chartData.value.length - 1) {
    return ''
  }
  return formatDate(chartData.value[i].date)
}

const template = (d: typeof chartData.value[0]) => {
  const label = props.valueLabel || 'Value'
  return `${formatDate(d.date)}: ${d.value} ${label}`
}

const chartColor = computed(() => props.color || 'var(--ui-primary)')
</script>

<template>
  <UCard
    ref="cardRef"
    :ui="{ root: 'overflow-visible', body: '!px-0 !pt-0 !pb-3' }"
  >
    <template #header>
      <div>
        <p class="text-xs text-muted uppercase mb-1.5">
          {{ title }}
        </p>
        <p class="text-3xl text-highlighted font-semibold">
          {{ total }}
        </p>
      </div>
    </template>

    <VisXYContainer
      v-if="chartData.length > 0"
      :data="chartData"
      :padding="{ top: 40 }"
      class="h-96"
      :width="width"
    >
      <VisLine
        :x="x"
        :y="y"
        :color="chartColor"
      />
      <VisArea
        :x="x"
        :y="y"
        :color="chartColor"
        :opacity="0.1"
      />

      <VisAxis
        type="x"
        :x="x"
        :tick-format="xTicks"
      />

      <VisCrosshair
        :color="chartColor"
        :template="template"
      />

      <VisTooltip />
    </VisXYContainer>
    <div
      v-else
      class="h-96 flex items-center justify-center text-muted"
    >
      No data available
    </div>
  </UCard>
</template>

<style scoped>
.unovis-xy-container {
  --vis-crosshair-line-stroke-color: v-bind(chartColor);
  --vis-crosshair-circle-stroke-color: var(--ui-bg);

  --vis-axis-grid-color: var(--ui-border);
  --vis-axis-tick-color: var(--ui-border);
  --vis-axis-tick-label-color: var(--ui-text-dimmed);

  --vis-tooltip-background-color: var(--ui-bg);
  --vis-tooltip-border-color: var(--ui-border);
  --vis-tooltip-text-color: var(--ui-text-highlighted);
}
</style>

