<script setup lang="ts">
import type { User } from "~~/generated/prisma/client";

definePageMeta({
  layout: "admin",
  middleware: ["auth", "role"],
});

const route = useRoute();
const openDeleteModal = ref(false);
const openEditModal = ref(false);
const studentId = parseInt(route.params.id as string);

const { data: student, status } = useFetch<User>(
  `/api/admin/students/${studentId}`,
  {
    method: "GET",
    lazy: true,
  }
);

const router = useRouter();
const toast = useToast();
const formState = reactive({
  fullName: "",
  email: "",
  login: "",
});

watchEffect(() => {
  if (student.value) {
    formState.fullName = student.value?.fullName || "";
    formState.email = student.value?.email || "";
    formState.login = student.value?.login || "";
  }
});

const { execute: deleteStudent, pending: deletePending } = useFetch(
  `/api/admin/students/${studentId}`,
  {
    method: "DELETE",
    immediate: false,
    onResponse({ response }) {
      if (response.status === 200 || response.status === 204) {
        toast.add({
          title: "Student deleted",
          description: "The student has been successfully deleted.",
        });
        router.push("/admin/students");
      }
    },
    onResponseError() {
      toast.add({
        title: "Error",
        description: "Failed to delete student.",
        color: "error",
      });
    },
  }
);

const updateStudent = async () => {
  await $fetch(`/api/admin/students/${studentId}`, {
    method: "PATCH",
    body: {
      data: {
        fullName: formState.fullName,
        email: formState.email,
        login: formState.login,
      },
    },
  });

  toast.add({
    title: "Student updated",
    description: "The student has been successfully updated.",
  });

  openEditModal.value = false;
};
</script>

<template>
  <UDashboardPanel id="student-detail">
    <template #header>
      <UDashboardNavbar title="Edit Student" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UModal
            v-model:open="openEditModal"
            title="Edit Student"
            portal="body"
          >
            <UButton
              color="primary"
              variant="outline"
              icon="i-lucide-edit"
              label="Edit Student"
              @click="openEditModal = true"
            />

            <template #body>
              <UForm
                :state="formState"
                class="space-y-4"
                @submit.prevent="updateStudent"
              >
                <UFormField name="fullName" label="Full Name">
                  <UInput
                    v-model="formState.fullName"
                    size="lg"
                    class="w-full"
                    type="text"
                    placeholder="Enter full name"
                  />
                </UFormField>

                <UFormField name="email" label="Email">
                  <UInput
                    v-model="formState.email"
                    size="lg"
                    class="w-full"
                    type="email"
                    placeholder="Enter email"
                  />
                </UFormField>

                <UFormField name="login" label="Login">
                  <UInput
                    v-model="formState.login"
                    size="lg"
                    class="w-full"
                    type="text"
                    placeholder="Enter login"
                  />
                </UFormField>

                <div class="flex justify-between gap-2">
                  <UButton
                    type="submit"
                    label="Update Student"
                  />

                  <UButton
                    type="button"
                    label="Cancel"
                    variant="outline"
                    @click="openEditModal = false"
                  />
                </div>
              </UForm>
            </template>
          </UModal>

          <UModal :close="false" value:open="openDeleteModal" portal="body">
            <UButton
              color="error"
              variant="outline"
              icon="i-lucide-trash-2"
              label="Delete Student"
              :loading="deletePending"
              @click="openDeleteModal = true"
            />

            <template #body>
              <h4 class="text-lg font-bold text-center mb-2">
                Are you sure you want to delete this student?
              </h4>

              <div class="flex justify-center items-center gap-2">
                <UButton
                  color="error"
                  variant="ghost"
                  icon="i-lucide-trash-2"
                  label="Delete"
                  size="lg"
                  :loading="deletePending"
                  @click="deleteStudent()"
                />

                <UButton
                  color="info"
                  variant="ghost"
                  icon="i-lucide-x"
                  label="Cancel"
                  size="lg"
                  @click="openDeleteModal = false"
                />
              </div>
            </template>
          </UModal>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <h3 class="text-2xl font-bold">Student ID: {{ studentId }}</h3>

      <div v-if="status === 'pending'" class="space-y-3">
        <USkeleton class="w-40 h-4" />
        <USkeleton class="w-80 h-4" />
        <USkeleton class="w-60 h-4" />
        <USkeleton class="w-40 h-4" />
      </div>

      <div v-else-if="status === 'error'">
        <p>Error loading student</p>
      </div>

      <div v-else class="text-gray-600 dark:text-gray-400">
        <p>Student Full Name: {{ student?.fullName }}</p>
        <p>Student Email: {{ student?.email }}</p>
        <p>Student Login: {{ student?.login }}</p>
        <p>Student Driving School ID: {{ student?.drivingSchoolId }}</p>
      </div>
    </template>
  </UDashboardPanel>
</template>
