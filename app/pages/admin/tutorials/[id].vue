<script setup lang="ts">
import type { Tutorial } from '~~/generated/prisma/client';

definePageMeta({
    layout: "admin",
    middleware: ["auth", "role"],
});

const route = useRoute();
const router = useRouter();
const toast = useToast();

const tutorialId = Number(route.params.id);
const openEditModal = ref(false);
const openDeleteModal = ref(false);
const deleting = ref(false);

async function handleDelete() {
    deleting.value = true;
    try {
        await $fetch(`/api/admin/tutorials/${tutorialId}`, { method: 'DELETE' });
        openDeleteModal.value = false;
        router.push('/admin/tutorials');
    } finally {
        deleting.value = false;
    }
}

const { data: tutorial, status, error } = useFetch<Tutorial>(`/api/admin/tutorials/${tutorialId}`);

const formState = reactive({
    title: '',
    description: '',
    videoUrl: '',
    thumbnailUrl: '',
    duration: '',
    order: '',
});

watch(tutorial, (val) => {
    if (val) {
        formState.title = val.title || '';
        formState.description = val.description || '';
        formState.videoUrl = val.videoUrl || '';
        formState.thumbnailUrl = val.thumbnailUrl || '';
        formState.duration = val.duration?.toString() || '';
        formState.order = val.order?.toString() || '0';
    }
}, { immediate: true });

const tutorialInfo = computed(() => [
    { label: 'Description', value: tutorial.value?.description },
    { label: 'Duration', value: tutorial.value?.duration ? formatDuration(tutorial.value.duration) : null },
    { label: 'Order', value: tutorial.value?.order },
    { label: 'Created', value: tutorial.value?.createdAt ? formatDate(tutorial.value.createdAt) : null },
    { label: 'Updated', value: tutorial.value?.updatedAt ? formatDate(tutorial.value.updatedAt) : null },
].filter(item => item.value != null) as { label: string; value: string | number }[]);

async function updateTutorial() {
    try {
        await $fetch(`/api/admin/tutorials/${tutorialId}`, {
            method: 'PATCH',
            body: {
                title: formState.title,
                description: formState.description || null,
                videoUrl: formState.videoUrl,
                thumbnailUrl: formState.thumbnailUrl || null,
                duration: formState.duration ? Number(formState.duration) : null,
                order: Number(formState.order) || 0,
            },
        });
        toast.add({ title: 'Tutorial updated', color: 'success' });
        openEditModal.value = false;
    } catch {
        toast.add({ title: 'Error updating tutorial', color: 'error' });
    }
}
</script>

<template>
    <UDashboardPanel id="tutorial-detail">
        <template #header>
            <UDashboardNavbar :title="tutorial?.title || 'Tutorial Details'">
                <template #leading>
                    <UDashboardSidebarCollapse />
                </template>

                <template #right>
                    <UButton icon="i-lucide-edit" label="Edit" variant="outline" @click="openEditModal = true" />
                    <UButton icon="i-lucide-trash-2" label="Delete" color="error" variant="outline"
                        @click="openDeleteModal = true" />
                </template>
            </UDashboardNavbar>
        </template>

        <template #body>
            <div v-if="status === 'pending'" class="flex justify-center py-12">
                <UIcon name="i-lucide-loader" class="w-8 h-8 animate-spin text-muted" />
            </div>

            <div v-else-if="error" class="text-center py-12">
                <UIcon name="i-lucide-alert-circle" class="w-12 h-12 text-error mx-auto mb-2" />
                <p class="text-error">Failed to load tutorial</p>
            </div>

            <div v-else-if="tutorial" class="space-y-6">
                <div class="aspect-video bg-black rounded-lg overflow-hidden">
                    <video v-if="tutorial.videoUrl" :src="tutorial.videoUrl"
                        :poster="tutorial.thumbnailUrl || undefined" controls class="w-full h-full object-contain">
                        Your browser does not support the video tag.
                    </video>
                    <div v-else class="w-full h-full flex items-center justify-center text-muted">
                        <UIcon name="i-lucide-video-off" class="w-16 h-16" />
                    </div>
                </div>

                <Description :title="tutorial.title" :items="tutorialInfo" :loading="false" :error="false" />
            </div>

            <UModal v-model:open="openEditModal" title="Edit Tutorial">
                <template #body>
                    <form class="space-y-4" @submit.prevent="updateTutorial">
                        <UFormField label="Title" required>
                            <UInput v-model="formState.title" placeholder="Tutorial title" class="w-full" />
                        </UFormField>

                        <UFormField label="Description">
                            <UTextarea v-model="formState.description" placeholder="Description" :rows="3"
                                class="w-full" />
                        </UFormField>

                        <UFormField label="Video URL" required>
                            <UInput v-model="formState.videoUrl" placeholder="https://..." class="w-full" />
                        </UFormField>

                        <UFormField label="Thumbnail URL">
                            <UInput v-model="formState.thumbnailUrl" placeholder="https://..." class="w-full" />
                        </UFormField>

                        <div class="grid grid-cols-2 gap-4">
                            <UFormField label="Duration (seconds)">
                                <UInput v-model="formState.duration" type="number" placeholder="120" class="w-full" />
                            </UFormField>

                            <UFormField label="Order">
                                <UInput v-model="formState.order" type="number" placeholder="0" class="w-full" />
                            </UFormField>
                        </div>

                        <div class="flex justify-end gap-2">
                            <UButton variant="outline" @click="openEditModal = false">Cancel</UButton>
                            <UButton type="submit">Save</UButton>
                        </div>
                    </form>
                </template>
            </UModal>

            <ConfirmModal v-model:open="openDeleteModal" title="Delete Tutorial"
                message="Are you sure you want to delete this tutorial?" confirm-text="Delete" :loading="deleting"
                @confirm="handleDelete" />
        </template>
    </UDashboardPanel>
</template>