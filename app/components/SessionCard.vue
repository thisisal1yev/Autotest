<script lang="ts" setup>
interface ParkingSession {
  id: number;
  parkingName: string;
  parkingAddress: string;
  spotNumber: string;
  vehiclePlate: string;
  startTime: Date;
  pricePerHour: number;
  discountPercent?: number;
}

interface SessionCardProps {
  session: ParkingSession;
  onEndSession?: (id: string) => void;
  onNavigate?: (id: string) => void;
}
const { session } = defineProps<SessionCardProps>();

const elapsedSeconds = ref(0);
function formatDuration(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

const hours = computed(() => elapsedSeconds.value / 3600);

const baseCost = computed(() => hours.value * session.pricePerHour);

const discount = computed(() =>
  session.discountPercent ? baseCost.value * (session.discountPercent / 100) : 0
);

const totalCost = computed(() => Math.max(0, baseCost.value - discount.value));

const getTimerColor = computed(() => {
  if (hours.value < 1) return "text-parking-available";
  if (hours.value < 3) return "text-parking-reserved";
  return "text-parking-occupied";
});

let interval: ReturnType<typeof setInterval>;

onMounted(() => {
  const startTimestamp =
    typeof session.startTime === "string"
      ? new Date(session.startTime).getTime()
      : session.startTime.getTime();

  const updateElapsed = () => {
    elapsedSeconds.value = Math.floor((Date.now() - startTimestamp) / 1000);
  };

  updateElapsed();
  interval = setInterval(updateElapsed, 1000);
});

onUnmounted(() => {
  clearInterval(interval);
});
</script>

<template>
  <UCard class="overflow-hidden border-l-4 border-l-primary">
    <div class="flex items-start justify-between gap-4">
      <div class="flex-1">
        <div class="flex items-center gap-2 mb-2">
          <UBadge
            variant="soft"
            class="font-mono"
            :data-testid="`badge-spot-${session.id}`"
          >
            {{ session.spotNumber }}
          </UBadge>

          <UBadge variant="outline" :data-testid="`badge-plate-${session.id}`">
            <Icon name="i-lucide-car" class="h-3 w-3 mr-1" />
            {{ session.vehiclePlate }}
          </UBadge>
        </div>

        <h3
          class="font-semibold text-lg"
          :data-testid="`text-parking-${session.id}`"
        >
          {{ session.parkingName }}
        </h3>
        <div class="flex items-center gap-1 text-sm text-slate-400 mt-1">
          <Icon name="i-lucide-map-pin" class="h-3.5 w-3.5" />
          <span>{{ session.parkingAddress }}</span>
        </div>
      </div>

      <div class="text-right">
        <div class="flex items-center gap-1 text-sm text-slate-400 mb-1">
          <Icon name="i-lucide-clock" class="h-3.5 w-3.5" />

          <span>Time</span>
        </div>

        <div
          :class="'font-mono text-2xl font-bold' + ' ' + getTimerColor"
          :data-testid="`timer-${session.id}`"
        >
          {{ formatDuration(elapsedSeconds) }}
        </div>
      </div>
    </div>

    <div class="mt-4 p-3 bg-muted/50 rounded-lg">
      <div class="flex items-center justify-between text-sm">
        <span class="text-slate-400">Basic cost:</span>

        <span>{{ Math.round(baseCost).toLocaleString() }} uzs</span>
      </div>

      <div
        v-if="session.discountPercent && session.discountPercent > 0"
        class="flex items-center justify-between text-sm text-parking-available"
      >
        <span>Discount {{ session.discountPercent + "%" }}:</span>

        <span>-{{ Math.round(discount).toLocaleString() }} uzs</span>
      </div>
      <div
        class="flex items-center justify-between mt-2 pt-2 border-t border-border"
      >
        <span class="font-medium flex items-center gap-1">
          <Icon name="i-lucide-credit-card" class="h-4 w-4" />
          To be paid:
        </span>

        <span
          class="text-xl font-bold"
          :data-testid="`text-cost-${session.id}`"
        >
          {{ Math.round(totalCost).toLocaleString() }} uzs
        </span>
      </div>
    </div>
  </UCard>
</template>
