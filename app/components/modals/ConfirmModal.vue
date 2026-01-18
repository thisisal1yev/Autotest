<script setup lang="ts">
const open = defineModel<boolean>('open', { default: false });

const props = withDefaults(defineProps<{
    title?: string;
    message?: string;
    confirmText?: string;
    cancelText?: string;
    loading?: boolean;
}>(), {
    title: 'Confirm',
    message: 'Are you sure?',
    confirmText: 'Confirm',
    cancelText: 'Cancel',
    confirmColor: 'error',
    loading: false,
});

const emit = defineEmits<{
    confirm: [];
    cancel: [];
}>();

function onConfirm() {
    emit('confirm');
}

function onCancel() {
    open.value = false;
    emit('cancel');
}
</script>

<template>
    <UModal v-model:open="open" :title="title" portal="body">
        <template #body>
            <p class="text-center mb-4">{{ message }}</p>
            <div class="flex justify-center gap-2">
                <UButton variant="outline" color="info" :disabled="loading" @click="onCancel">
                    {{ cancelText }}
                </UButton>

                <UButton color="error" :loading="loading" @click="onConfirm">
                    {{ confirmText }}
                </UButton>
            </div>
        </template>
    </UModal>
</template>