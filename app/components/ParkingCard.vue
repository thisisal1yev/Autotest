<script setup lang="ts">
interface ParkingLot {
  id: number;
  name: string;
  address: string;
  totalSpots: number;
  availableSpots: number;
  pricePerHour: number;
  hasCharging?: boolean;
  distance?: string;
  imageUrl?: string;
}

const { parking } = defineProps<{
  parking: ParkingLot;
}>();

const occupancyPercent =
  ((parking.totalSpots - parking.availableSpots) / parking.totalSpots) * 100;
</script>

<template>
  <UCard variant="outline">
    <div class="flex items-start justify-between gap-2 mb-3">
      <div>
        <h3
          class="font-semibold text-lg leading-tight"
          data-testid="{`text-parking-name-${parking.id}`}"
        >
          {{ parking.name }}
        </h3>

        <div class="flex items-center gap-1 text-sm text-muted-foreground mt-1">
          <Icon name="lucide:map-pin" class="h-3.5 w-3.5 bg-primary" />

          <span>{{ parking.address }}</span>
        </div>
      </div>

      <div
        v-if="parking.hasCharging"
        class="flex items-center gap-1 text-parking-available"
      >
        <Icon name="lucide:zap" class="text-primary" size="24" />
      </div>
    </div>

    <div class="space-y-3">
      <div class="flex items-center justify-between text-sm">
        <div class="flex items-center gap-1.5">
          <Icon
            name="lucide:car"
            class="h-4 w-4 text-muted-foreground bg-primary"
          />

          <span>
            <span
              class="font-medium text-foreground"
              :data-testid="`text-available-${parking.id}`"
            >
              {{ parking.availableSpots }}
            </span>

            <span class="text-muted-foreground">
              / {{ parking.totalSpots }}
            </span>
          </span>
        </div>

        <span v-if="parking.distance" class="text-muted-foreground">
          {{ parking.distance }}
        </span>
      </div>

      <UProgress v-model="occupancyPercent" />

      <div class="flex items-center justify-between">
        <div class="flex items-center gap-1">
          <Icon name="lucide:clock" class="h-4 w-4 text-muted-foreground" />

          <span
            class="text-lg font-bold"
            :data-testid="`text-price-${parking.id}`"
          >
            {{ parking.pricePerHour.toLocaleString() }} сум
          </span>

          <span class="text-sm text-muted-foreground">/час</span>
        </div>
      </div>
    </div>
  </UCard>
</template>
