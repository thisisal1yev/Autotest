<script setup lang="ts">
definePageMeta({
  layout: 'admin',
  middleware: ['auth', 'role']
})

const openCreateModal = ref(false)
const toast = useToast()
const formState = reactive({
  email: '',
  login: '',
  fullName: '',
  password: ''
})

const createStudent = async () => {
  await $fetch('/api/admin/students', {
    method: 'POST',
    body: {
      data: formState
    }
  })

  toast.add({
    title: 'Student created',
    description: 'The student has been successfully created.'
  })

  openCreateModal.value = false
}
</script>

<template>
  <UDashboardPanel id="students">
    <template #header>
      <UDashboardNavbar
        title="Students"
        :ui="{ right: 'gap-3' }"
      >
        <template #leading>
          <UDashboardSidebarCollapse />
        </template>

        <template #right>
          <UModal
            v-model:open="openCreateModal"
            title="Create student"
            portal="body"
          >
            <UButton
              icon="i-lucide-plus"
              @click="openCreateModal = true"
            >
              Create student
            </UButton>

            <template #body>
              <UForm
                :state="formState"
                class="space-y-4"
                @submit.prevent="createStudent"
              >
                <UFormField
                  name="fullName"
                  label="Full Name"
                >
                  <UInput
                    v-model="formState.fullName"
                    size="lg"
                    class="w-full"
                    type="text"
                    placeholder="Enter full name"
                  />
                </UFormField>

                <UFormField
                  name="email"
                  label="Email"
                >
                  <UInput
                    v-model="formState.email"
                    size="lg"
                    class="w-full"
                    type="email"
                    placeholder="Enter email"
                  />
                </UFormField>

                <UFormField
                  name="login"
                  label="Login"
                >
                  <UInput
                    v-model="formState.login"
                    size="lg"
                    class="w-full"
                    type="text"
                    placeholder="Enter login"
                  />
                </UFormField>

                <UFormField
                  name="password"
                  label="Password"
                >
                  <UInput
                    v-model="formState.password"
                    size="lg"
                    class="w-full"
                    type="password"
                    placeholder="Enter password"
                  />
                </UFormField>

                <div class="flex justify-between gap-2">
                  <UButton
                    type="submit"
                    label="Create Student"
                  />

                  <UButton
                    type="button"
                    label="Cancel"
                    variant="outline"
                    @click="openCreateModal = false"
                  />
                </div>
              </UForm>
            </template>
          </UModal>
        </template>
      </UDashboardNavbar>
    </template>

    <template #body>
      <StudentsTable />
    </template>
  </UDashboardPanel>
</template>
