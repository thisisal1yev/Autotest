<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { upperFirst } from 'scule'
import { getPaginationRowModel } from '@tanstack/table-core'
import type { Row, Table } from '@tanstack/table-core'
import { formatDuration } from '~/utils/formatting'
import type { Tutorial } from '~~/generated/prisma/client'

const UButton = resolveComponent('UButton')
const UDropdownMenu = resolveComponent('UDropdownMenu')
const UCheckbox = resolveComponent('UCheckbox')

const toast = useToast()
const table = useTemplateRef<{ tableApi?: Table<Tutorial> }>('table')
const router = useRouter()

const columnFilters = ref([{ id: 'title', value: '' }])
const columnVisibility = ref()
const rowSelection = ref({})

const { data, status, refresh } = useFetch<Tutorial[]>('/api/admin/tutorials')

const openDeleteModal = ref(false)
const deleteLoading = ref(false)
const tutorialToDelete = ref<Tutorial | null>(null)

const selectedRows = computed(() =>
  table.value?.tableApi?.getFilteredSelectedRowModel().rows || []
)

function openBulkDelete() {
  openDeleteModal.value = true
  tutorialToDelete.value = null
}

function openSingleDelete(tutorial: Tutorial) {
  tutorialToDelete.value = tutorial
  openDeleteModal.value = true
}

const deleteMessage = computed(() => {
  if (tutorialToDelete.value) {
    return `Are you sure you want to delete "${tutorialToDelete.value.title}"?`
  }
  return `Are you sure you want to delete ${selectedRows.value.length} tutorial(s)?`
})

async function handleDelete() {
  deleteLoading.value = true

  try {
    if (tutorialToDelete.value) {
      await $fetch(`/api/admin/tutorials/${tutorialToDelete.value.id}`, { method: 'DELETE' })
      toast.add({ title: 'Tutorial deleted', color: 'success' })
    } else {
      const ids = selectedRows.value.map((row: Row<Tutorial>) => row.original.id)
      await $fetch('/api/admin/tutorials', {
        method: 'DELETE',
        body: { ids }
      })
      toast.add({ title: `${ids.length} tutorial(s) deleted`, color: 'success' })
      table.value?.tableApi?.resetRowSelection()
    }

    openDeleteModal.value = false
    refresh()
  } catch {
    toast.add({ title: 'Error deleting tutorial(s)', color: 'error' })
  } finally {
    deleteLoading.value = false
  }
}

function getRowItems(row: Row<Tutorial>) {
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
      onSelect() {
        router.push(`/admin/tutorials/${row.original.id}`)
      }
    },
    { type: 'separator' },
    {
      label: 'Delete',
      icon: 'i-lucide-trash',
      color: 'error',
      onSelect() {
        openSingleDelete(row.original)
      }
    }
  ]
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const columns: TableColumn<Tutorial>[] = [
  {
    id: 'select',
    header: ({ table }) =>
      h(UCheckbox, {
        'modelValue': table.getIsSomePageRowsSelected()
          ? 'indeterminate'
          : table.getIsAllPageRowsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
          table.toggleAllPageRowsSelected(!!value),
        'ariaLabel': 'Select all'
      }),
    cell: ({ row }) =>
      h(UCheckbox, {
        'modelValue': row.getIsSelected(),
        'onUpdate:modelValue': (value: boolean | 'indeterminate') =>
          row.toggleSelected(!!value),
        'ariaLabel': 'Select row'
      })
  },
  {
    accessorKey: 'id',
    header: 'ID'
  },
  {
    accessorKey: 'title',
    header: 'Title',
    filterFn: (row, id, filterValue) => {
      const searchValue = filterValue?.toLowerCase() || ''
      if (!searchValue) return true
      const title = (row.getValue(id) as string)?.toLowerCase() || ''
      const description = (row.original.description as string)?.toLowerCase() || ''
      return title.includes(searchValue) || description.includes(searchValue)
    },
    cell: ({ row }) => {
      return h('div', { class: 'flex items-center gap-3' }, [
        h('div', { class: 'user' }, [
          h('span', firstLetter(row.original.title).toUpperCase())
        ]),
        h('div', undefined, [
          h('p', { class: 'font-medium text-highlighted' }, row.original.title),
          h('p', { class: 'text-sm text-muted' }, row.original.description || 'No description')
        ])
      ])
    }
  },
  {
    accessorKey: 'duration',
    header: 'Duration',
    cell: ({ row }) => row.original.duration ? formatDuration(row.original.duration) : '-'
  },
  {
    accessorKey: 'order',
    header: 'Order',
    cell: ({ row }) => row.original.order
  },
  {
    accessorKey: 'createdAt',
    header: 'Created',
    cell: ({ row }) => formatDate(row.original.createdAt)
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return h('div', { class: 'text-right' },
        h(UDropdownMenu, {
          content: { align: 'end' },
          items: getRowItems(row)
        }, () => h(UButton, {
          icon: 'i-lucide-ellipsis-vertical',
          color: 'neutral',
          variant: 'ghost',
          class: 'ml-auto'
        }))
      )
    }
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
    <div class="flex flex-wrap items-center gap-1.5 flex-1">
      <UInput v-model="searchQuery" class="w-sm" icon="i-lucide-search" type="text"
        placeholder="Search by title or description..." />
    </div>

    <div class="flex flex-wrap items-center gap-1.5">
      <UButton v-if="selectedRows.length" label="Delete" color="error" variant="subtle" icon="i-lucide-trash"
        @click="openBulkDelete">
        <template #trailing>
          <UKbd color="error">{{ selectedRows.length }}</UKbd>
        </template>
      </UButton>

      <UDropdownMenu :items="table?.tableApi
        ?.getAllColumns()
        .filter((column: any) => column.getCanHide())
        .map((column: any) => ({
          label: upperFirst(column.id),
          type: 'checkbox' as const,
          checked: column.getIsVisible(),
          onUpdateChecked(checked: boolean) {
            table?.tableApi?.getColumn(column.id)?.toggleVisibility(!!checked)
          },
          onSelect(e?: Event) {
            e?.preventDefault()
          }
        }))
        " :content="{ align: 'end' }">
        <UButton label="Display" color="neutral" variant="outline" trailing-icon="i-lucide-settings-2" />
      </UDropdownMenu>
    </div>
  </div>

  <UTable v-if="data" ref="table" v-model:column-filters="columnFilters" v-model:column-visibility="columnVisibility"
    v-model:row-selection="rowSelection" v-model:pagination="pagination"
    :pagination-options="{ getPaginationRowModel: getPaginationRowModel() }" class="shrink-0" :data="data || []"
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
        <UIcon name="i-lucide-list-video" class="w-12 h-12 text-muted mb-4" />
        <p class="text-muted">No tutorials found</p>
      </div>
    </template>
  </UTable>

  <div class="flex items-center justify-between gap-3 border-t border-default pt-4 mt-auto">
    <div class="text-sm text-muted">
      {{ selectedRows.length }} of
      {{ table?.tableApi?.getFilteredRowModel().rows.length || 0 }} row(s) selected.
    </div>

    <div class="flex items-center gap-1.5">
      <UPagination :default-page="(table?.tableApi?.getState().pagination.pageIndex || 0) + 1"
        :items-per-page="table?.tableApi?.getState().pagination.pageSize"
        :total="table?.tableApi?.getFilteredRowModel().rows.length"
        @update:page="(p: number) => table?.tableApi?.setPageIndex(p - 1)" />
    </div>
  </div>

  <!-- Delete Confirmation Modal -->
  <ConfirmModal v-model:open="openDeleteModal" title="Delete Tutorial" :message="deleteMessage" confirm-text="Delete"
    confirm-color="error" :loading="deleteLoading" @confirm="handleDelete" />
</template>