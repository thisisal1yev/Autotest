<script setup lang="ts">
    definePageMeta({
      layout: "admin",
      middleware: ["auth", "role"],
    });
    
    const route = useRoute();
    const studentId = parseInt(route.params.id as string);
    </script>
    
    <template>
      <UDashboardPanel id="student-detail">
        <template #header>
          <UDashboardNavbar title="Edit Student" :ui="{ right: 'gap-3' }">
            <template #leading>
              <UDashboardSidebarCollapse />
            </template>
          </UDashboardNavbar>
        </template>
    
        <div class="p-6">
          <p>Student ID: {{ studentId }}</p>
          <p class="text-gray-600 dark:text-gray-400 mt-4">
            Edit student form will be here.
          </p>
        </div>
      </UDashboardPanel>
    </template>
    
    