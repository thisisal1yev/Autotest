<script setup lang="ts">
import type { User } from "~~/generated/prisma/client";

definePageMeta({
  layout: "admin",
  middleware: ["auth", "role"],
});

const route = useRoute();
const router = useRouter();
const toast = useToast();

const studentId = Number(route.params.id);
const openDeleteModal = ref(false);
const openEditModal = ref(false);

const { data: student, status, error } = useFetch<User>(`/api/admin/students/${studentId}`);

const formState = reactive({
  fullName: '',
  email: '',
  login: '',
});

watch(student, (val) => {
  if (val) {
    formState.fullName = val.fullName || '';
    formState.email = val.email || '';
    formState.login = val.login || '';
  }
}, { immediate: true });

const studentInfo = computed(() => [
  { label: 'Email', value: student.value?.email },
  { label: 'Login', value: student.value?.login },
  { label: 'Role', value: student.value?.role },
  { label: 'Created', value: student.value?.createdAt ? formatDate(student.value.createdAt) : null },
  { label: 'Updated', value: student.value?.updatedAt ? formatDate(student.value.updatedAt) : null },
].filter(item => item.value != null) as { label: string; value: string | number }[]);

async function updateStudent() {
  try {
    await $fetch(`/api/admin/students/${studentId}`, {
      method: 'PATCH',
      body: formState,
    });
    toast.add({ title: 'Student updated', color: 'success' });
    openEditModal.value = false;
  } catch {
    toast.add({ title: 'Error updating student', color: 'error' });
  }
}

async function deleteStudent() {
  try {
    await $fetch(`/api/admin/students/${studentId}`, { method: 'DELETE' });
    toast.add({ title: 'Student deleted', color: 'success' });
    router.push('/admin/students');
  } catch {
    toast.add({ title: 'Error deleting student', color: 'error' });
  }
}
</script>

<template>
  <UDashboardPanel id="student-detail">
    <template #header>
      <UDashboardNavbar :title="student?.fullName || 'Student Details'">
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
      <Description :items="studentInfo" :loading="status === 'pending'"
        :error="!!error" />

      <UModal v-model:open="openEditModal" title="Edit Student">
        <template #body>
          <form class="space-y-4" @submit.prevent="updateStudent">
            <UFormField label="Full Name" required>
              <UInput v-model="formState.fullName" placeholder="Full name" class="w-full"/>
            </UFormField>

            <UFormField label="Email" required>
              <UInput v-model="formState.email" type="email" placeholder="Email" class="w-full"/>
            </UFormField>

            <UFormField label="Login" required>
              <UInput v-model="formState.login" placeholder="Login" class="w-full"/>
            </UFormField>

            <div class="flex justify-end gap-2">
              <UButton variant="outline" @click="openEditModal = false">Cancel</UButton>
              <UButton type="submit">Save</UButton>
            </div>
          </form>
        </template>
      </UModal>

      <UModal v-model:open="openDeleteModal" title="Delete Student">
        <template #body>
          <p class="text-center mb-4">Are you sure you want to delete this student?</p>
          <div class="flex justify-center gap-2">
            <UButton color="info" variant="outline" @click="openDeleteModal = false">Cancel</UButton>
            <UButton color="error" @click="deleteStudent">Delete</UButton>
          </div>
        </template>
      </UModal>
    </template>
  </UDashboardPanel>
</template>