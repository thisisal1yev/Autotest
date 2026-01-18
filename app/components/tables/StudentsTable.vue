<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { upperFirst } from 'scule'
import { getPaginationRowModel } from '@tanstack/table-core'
import type { Row } from '@tanstack/table-core'
import type { User } from '~~/generated/prisma/client'

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')

const toast = useToast()
const table = useTemplateRef('table')
const router = useRouter()

const columnFilters = ref([{ id: 'fullName', value: '' }])
const columnVisibility = ref()
const rowSelection = ref({})

const { data, status, refresh } = useFetch<User[]>('/api/admin/students')

const openDeleteModal = ref(false)
const deleteLoading = ref(false)
const itemToDelete = ref<User | null>(null)

function getSelectedCount(): number {
  return table.value?.tableApi?.getFilteredSelectedRowModel().rows.length || 0
}

function openSingleDelete(item: User) {
  itemToDelete.value = item
  openDeleteModal.value = true
}

function openBulkDelete() {
  itemToDelete.value = null
  openDeleteModal.value = true
}

const deleteMessage = computed(() => {
  if (itemToDelete.value) {
    return `Are you sure you want to delete "${itemToDelete.value.fullName}"?`
  }
  return `Are you sure you want to delete ${getSelectedCount()} student(s)?`
})

async function handleDelete() {
  deleteLoading.value = true
  try {
    if (itemToDelete.value) {
      await $fetch(`/api/admin/students/${itemToDelete.value.id}`, { method: 'DELETE' })
      toast.add({ title: 'Student deleted', color: 'success' })
    } else {
      const ids = table.value?.tableApi?.getFilteredSelectedRowModel().rows.map((r: Row<User>) => r.original.id) || []
      await $fetch('/api/admin/students', { method: 'DELETE', body: { ids } })
      toast.add({ title: `${ids.length} student(s) deleted`, color: 'success' })
      table.value?.tableApi?.resetRowSelection()
    }
    openDeleteModal.value = false
    refresh()
  } catch {
    toast.add({ title: 'Error deleting', color: 'error' })
  } finally {
    deleteLoading.value = false
  }
}

function getRowItems(row: Row<User>) {
  return [
    { type: 'label', label: 'Actions' },
    {
      label: 'Copy name',
      icon: 'i-lucide-copy',
      onSelect() {
        navigator.clipboard.writeText(row.original.fullName)
        toast.add({ title: 'Copied to clipboard' })
      }
    },
    {
      label: 'View details',
      icon: 'i-lucide-eye',
      onSelect: () => router.push(`/admin/students/${row.original.id}`)
    },
    { type: 'separator' },
    {
      label: 'Delete',
      icon: 'i-lucide-trash',
      color: 'error',
      onSelect: () => openSingleDelete(row.original)
    }
  ]
}

const columns: TableColumn<User>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(UCheckbox, {
        'modelValue': table.getIsSomePageRowsSelected() ? 'indeterminate' : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => table.toggleAllPageRowsSelected(!!value),
        'ariaLabel': 'Select all'
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        'modelValue': row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') => row.toggleSelected(!!value),
        'ariaLabel': 'Select row'
      })
  },
  {
    accessorKey: 'id',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'ID',
        icon: isSorted ? (isSorted === 'asc' ? 'i-lucide-arrow-up-narrow-wide' : 'i-lucide-arrow-down-wide-narrow') : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    },
    cell: ({ row }) => row.original.id || '-'
  },
  {
    accessorKey: 'fullName',
    header: 'Full Name',
    filterFn: (row, _, filterValue) => {
      const search = filterValue?.toLowerCase() || ''
      if (!search) return true
      const fullName = row.original.fullName?.toLowerCase() || ''
      const login = row.original.login?.toLowerCase() || ''
      return fullName.includes(search) || login.includes(search)
    },
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-3' }, [
        h('div', { class: 'user' }, [
          h('span', firstLetter(row.original.fullName).toUpperCase())
        ]),
        h('div', undefined, [
          h('p', { class: 'font-medium text-highlighted' }, row.original.fullName)
        ])
      ])
    }
  },
  {
    accessorKey: 'login',
    header: ({ column }) => {
      const isSorted = column.getIsSorted()
      return h(UButton, {
        color: 'neutral',
        variant: 'ghost',
        label: 'Login',
        icon: isSorted ? (isSorted === 'asc' ? 'i-lucide-arrow-up-narrow-wide' : 'i-lucide-arrow-down-wide-narrow') : 'i-lucide-arrow-up-down',
        class: '-mx-2.5',
        onClick: () => column.toggleSorting(column.getIsSorted() === 'asc')
      })
    },
    cell: ({ row }) => row.original.login || '-'
  },
  {
    accessorKey: 'email',
    header: 'Email',
    cell: ({ row }) => row.original.email || '-'
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h('div', { class: 'text-right' },
        h(UDropdownMenu, { content: { align: 'end' }, items: getRowItems(row) }, () =>
          h(UButton, { icon: 'i-lucide-ellipsis-vertical', color: 'neutral', variant: 'ghost', class: 'ml-auto' })
        )
      )
    }
  }
]

const searchQuery = computed({
  get: (): string => (table.value?.tableApi?.getColumn('fullName')?.getFilterValue() as string) || '',
  set: (value: string) => table.value?.tableApi?.getColumn('fullName')?.setFilterValue(value || undefined)
})

const pagination = ref({ pageIndex: 0, pageSize: 10 })
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-1.5">
    <UInput v-model="searchQuery" class="w-sm" icon="i-lucide-search" placeholder="Search by name or login..." />

    <div class="flex flex-wrap items-center gap-1.5">
      <UButton v-if="getSelectedCount()" label="Delete" color="error" variant="subtle" icon="i-lucide-trash"
        @click="openBulkDelete">
        <template #trailing>
          <UKbd color="error">{{ getSelectedCount() }}</UKbd>
        </template>
      </UButton>

      <UDropdownMenu :items="table?.tableApi?.getAllColumns().filter((c: any) => c.getCanHide()).map((c: any) => ({
        label: upperFirst(c.id),
        type: 'checkbox' as const,
        checked: c.getIsVisible(),
        onUpdateChecked: (checked: boolean) => c.toggleVisibility(!!checked),
        onSelect: (e?: Event) => e?.preventDefault()
      }))" :content="{ align: 'end' }">
        <UButton label="Display" color="neutral" variant="outline" trailing-icon="i-lucide-settings-2" />
      </UDropdownMenu>
    </div>
  </div>

  <UTable v-if="data" ref="table" v-model:column-filters="columnFilters" v-model:column-visibility="columnVisibility"
    v-model:row-selection="rowSelection" v-model:pagination="pagination"
    :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }" class="shrink-0" :data="data"
    :columns="columns" :loading="status === 'pending'" :ui="{
      base: 'table-fixed border-separate border-spacing-0',
      thead: '[&>tr]:bg-elevated/50 [&>tr]:after:content-none',
      tbody: '[&>tr]:last:[&>td]:border-b-0',
      th: 'py-2 first:rounded-l-lg last:rounded-r-lg border-y border-default first:border-l last:border-r',
      td: 'border-b border-default',
      separator: 'h-0'
    }">
    <template #empty-state>
      <div class="flex flex-col items-center justify-center py-12">
        <UIcon name="i-lucide-user" class="w-12 h-12 text-muted mb-4" />
        <p class="text-muted">No students found</p>
      </div>
    </template>
  </UTable>

  <div class="flex items-center justify-between gap-3 border-t border-default pt-4 mt-auto">
    <div class="text-sm text-muted">
      {{ getSelectedCount() }} of {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s) selected.
    </div>
    <UPagination :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
      :items-per-page="table?.tableApi?.getState().pagination.pageSize"
      :total="table?.tableApi?.getFilteredRowModel().rows.length"
      @update:page="(p: number) => table?.tableApi?.setPageIndex(p - 1)" />
  </div>

  <ConfirmModal v-model:open="openDeleteModal" title="Delete Student" :message="deleteMessage" confirm-text="Delete"
    confirm-color="error" :loading="deleteLoading" @confirm="handleDelete" />
</template>