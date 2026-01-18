<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { upperFirst } from 'scule'
import { getPaginationRowModel } from '@tanstack/table-core'
import type { Row } from '@tanstack/table-core'
import type { Test } from '~~/generated/prisma/client'

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')

const toast = useToast()
const table = useTemplateRef('table')
const router = useRouter()

const columnFilters = ref([{ id: 'title', value: '' }])
const columnVisibility = ref()
const rowSelection = ref({})

const { data, status, refresh } = useFetch<Test[]>('/api/admin/tests')

const openDeleteModal = ref(false)
const deleteLoading = ref(false)
const itemToDelete = ref<Test | null>(null)

function getSelectedCount(): number {
  return table.value?.tableApi?.getFilteredSelectedRowModel().rows.length || 0
}

function openSingleDelete(item: Test) {
  itemToDelete.value = item
  openDeleteModal.value = true
}

function openBulkDelete() {
  itemToDelete.value = null
  openDeleteModal.value = true
}

const deleteMessage = computed(() => {
  if (itemToDelete.value) {
    return `Are you sure you want to delete "${itemToDelete.value.title}"?`
  }
  return `Are you sure you want to delete ${getSelectedCount()} test(s)?`
})

async function handleDelete() {
  deleteLoading.value = true
  try {
    if (itemToDelete.value) {
      await $fetch(`/api/admin/tests/${itemToDelete.value.id}`, { method: 'DELETE' })
      toast.add({ title: 'Test deleted', color: 'success' })
    } else {
      const ids = table.value?.tableApi?.getFilteredSelectedRowModel().rows.map((r: Row<Test>) => r.original.id) || []
      await $fetch('/api/admin/tests', { method: 'DELETE', body: { ids } })
      toast.add({ title: `${ids.length} test(s) deleted`, color: 'success' })
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

function getRowItems(row: Row<Test>) {
  return [
    { type: 'label', label: 'Actions' },
    {
      label: 'Copy title',
      icon: 'i-lucide-copy',
      onSelect() {
        navigator.clipboard.writeText(row.original.title)
        toast.add({ title: 'Copied to clipboard' })
      }
    },
    {
      label: 'View details',
      icon: 'i-lucide-eye',
      onSelect: () => router.push(`/admin/tests/${row.original.id}`)
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

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function formatDuration(minutes: number | null | undefined): string {
  if (!minutes) return '-'
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`
}

const columns: TableColumn<Test>[] = [
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
  { accessorKey: 'id', header: 'ID' },
  {
    accessorKey: 'title',
    header: 'Title',
    filterFn: (row, id, filterValue) => {
      const search = filterValue?.toLowerCase() || ''
      if (!search) return true
      const title = (row.getValue(id) as string)?.toLowerCase() || ''
      const description = row.original.description?.toLowerCase() || ''
      return title.includes(search) || description.includes(search)
    },
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-3' }, [
        h('div', { class: 'flex h-10 w-10 items-center justify-center rounded-full bg-primary/10' }, [
          h('span', { class: 'text-primary font-semibold' }, firstLetter(row.original.title).toUpperCase())
        ]),
        h('div', undefined, [
          h('p', { class: 'font-medium text-highlighted' }, row.original.title),
          h('p', { class: 'text-sm text-muted' }, row.original.description || 'No description')
        ])
      ])
    }
  },
  { accessorKey: 'passingScore', header: 'Passing Score', cell: ({ row }) => `${row.original.passingScore}%` },
  { accessorKey: 'timeLimit', header: 'Time Limit', cell: ({ row }) => formatDuration(row.original.timeLimit) },
  {
    accessorKey: 'questions',
    header: 'Questions',
    cell: ({ row }) => {
      const questions = (row.original as any).questions
      return Array.isArray(questions) ? questions.length : 0
    }
  },
  { accessorKey: 'createdAt', header: 'Created', cell: ({ row }) => formatDate(row.original.createdAt) },
  {
    id: 'actions',
    cell: ({ row }) => h('div', { class: 'text-right' },
      h(UDropdownMenu, { content: { align: 'end' }, items: getRowItems(row) }, () =>
        h(UButton, { icon: 'i-lucide-ellipsis-vertical', color: 'neutral', variant: 'ghost', class: 'ml-auto' })
      )
    )
  }
]

const searchQuery = computed({
  get: (): string => (table.value?.tableApi?.getColumn('title')?.getFilterValue() as string) || '',
  set: (value: string) => table.value?.tableApi?.getColumn('title')?.setFilterValue(value || undefined)
})

const pagination = ref({ pageIndex: 0, pageSize: 10 })
</script>

<template>
  <div class="flex flex-wrap items-center justify-between gap-1.5">
    <UInput v-model="searchQuery" class="w-sm" icon="i-lucide-search" placeholder="Search by title or description..." />

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
        <UIcon name="i-lucide-file-text" class="w-12 h-12 text-muted mb-4" />
        <p class="text-muted">No tests found</p>
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

  <ConfirmModal v-model:open="openDeleteModal" title="Delete Test" :message="deleteMessage" confirm-text="Delete"
    confirm-color="error" :loading="deleteLoading" @confirm="handleDelete" />
</template>