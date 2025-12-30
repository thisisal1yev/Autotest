<script lang="ts" setup>
interface Vehicle {
  id: number;
  plate: string;
  model: string;
  color?: string;
  isDefault?: boolean;
  region?: string;
}

interface VehicleCardProps {
  vehicle: Vehicle;
}

defineEmits<{
  (e: "edit", id: number): void;
  (e: "delete", id: number): void;
  (e: "setDefault", id: number): void;
}>();
defineProps<VehicleCardProps>();
</script>

<template>
  <UCard
    :class="`hover-elevate transition-all ${
      vehicle.isDefault ? 'border-primary' : ''
    }`"
  >
    <div class="flex items-center gap-4">
      <div
        class="flex h-12 w-12 items-center justify-center rounded-lg bg-muted"
      >
        <Icon name="i-lucide-car" class="h-6 w-6 text-muted-foreground" />
      </div>

      <div class="flex-1 min-w-0">
        <div class="flex items-center gap-2 mb-1">
          <span
            class="font-mono font-bold text-lg"
            :data-testid="`plate-${vehicle.id}`"
          >
            {{ vehicle.plate }}
          </span>

          <UBadge v-if="vehicle.isDefault" variant="outline" class="gap-1">
            <Icon name="lucide:star" class="h-3 w-3" />
            Основной
          </UBadge>
        </div>

        <div class="flex items-center gap-2 text-sm text-muted-foreground">
          <span>{{ vehicle.model }}</span>

          <div v-if="vehicle.color">
            <span class="text-muted">•</span>&nbsp;
            <span>{{ vehicle.color }}</span>
          </div>

          <div v-if="vehicle.region">
            <span class="text-muted">•</span>&nbsp;
            <span>{{ vehicle.region }}</span>
          </div>
        </div>
      </div>

      <div class="flex items-center gap-1">
        <UButton
          v-if="!vehicle.isDefault"
          @click="$emit('setDefault', vehicle.id)"
          variant="ghost"
          size="lg"
          color="warning"
          class="text-neutral hover:text-warning"
          title="Сделать основным"
          :data-testid="`button-default-${vehicle.id}`"
        >
          <Icon name="lucide:star" class="h-4 w-4" />
        </UButton>

        <UButton
          @click="$emit('edit', vehicle.id)"
          variant="ghost"
          class="text-neutral hover:text-secondary"
          color="secondary"
          size="lg"
          :data-testid="`button-edit-${vehicle.id}`"
        >
          <Icon name="lucide:pencil" class="h-4 w-4" />
        </UButton>

        <UButton
          @click="$emit('delete', vehicle.id)"
          variant="ghost"
          size="lg"
          color="error"
          class="text-neutral hover:text-error"
          :data-testid="`button-delete-${vehicle.id}`"
        >
          <Icon name="i-lucide-trash-2" class="h-4 w-4" />
        </UButton>
      </div>
    </div>
  </UCard>
</template>
