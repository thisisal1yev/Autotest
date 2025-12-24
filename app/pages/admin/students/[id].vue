<script setup lang="ts">
import type { User } from "~~/generated/prisma/client";

definePageMeta({
  layout: "admin",
  middleware: ["auth", "role"],
});

const openDeleteModal = ref(false);
const route = useRoute();
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
</script>

<template>
  <UDashboardPanel id="student-detail">
    <template #header>
      <UDashboardNavbar title="Edit Student" :ui="{ right: 'gap-3' }">
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UButton
            color="primary"
            variant="outline"
            icon="i-lucide-edit"
            label="Edit Student"
          />

          <UModal :close="false" v-model:open="openDeleteModal">
            <UButton
              color="error"
              variant="outline"
              icon="i-lucide-trash-2"
              label="Delete Student"
              :loading="deletePending"
              @click="openDeleteModal = true"
            />

            <template #body>
              <h4 class="text-lg font-bold text-center mb-2">Are you sure you want to delete this student?</h4>

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

      <div class="space-y-3" v-if="status === 'pending'">
        <USkeleton class="w-40 h-4" />
        <USkeleton class="w-80 h-4" />
        <USkeleton class="w-60 h-4" />
        <USkeleton class="w-40 h-4" />
      </div>

      <div v-else-if="status === 'error'">
        <p>Error loading student</p>
      </div>

      <div class="text-gray-600 dark:text-gray-400" v-else>
        <p>Student Full Name: {{ student?.fullName }}</p>
        <p>Student Email: {{ student?.email }}</p>
        <p>Student Login: {{ student?.login }}</p>
        <p>Student Driving School ID: {{ student?.drivingSchoolId }}</p>
      </div>
    </template>
  </UDashboardPanel>
</template>
