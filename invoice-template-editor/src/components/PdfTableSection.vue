<template>
  <div class="w-full mb-0">
    <!-- Multiple Table Sections -->
    <div
      v-for="(table, tableIndex) in tablesData"
      :key="table.id"
      :id="`config-table-${tableIndex}-section`"
      class="mb-8"
    >
      <!-- Divider between sections (except for the first one) - 已移除，由Configuration Panel统一管理 -->

      <!-- Section Header with Title and Actions -->
      <div
        class="flex items-center justify-between mb-4"
        :style="{ marginTop: tableIndex > 0 ? '20px' : '20px' }"
      >
        <div class="flex items-center gap-2">
          <!-- Expand/Collapse Button -->
          <button
            @click="toggleTableExpanded(tableIndex)"
            class="flex items-center justify-center w-6 h-6 rounded hover:bg-gray-100 transition-colors"
            :title="isTableExpanded(tableIndex) ? 'Collapse section' : 'Expand section'"
          >
            <svg
              class="w-4 h-4 text-gray-600 transition-transform"
              :class="{ 'rotate-180': isTableExpanded(tableIndex) }"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M19 9l-7 7-7-7"
              ></path>
            </svg>
          </button>

          <!-- Section Title -->
          <h3 class="text-base font-semibold text-[#0e171f]">Table Section {{ tableIndex + 1 }}</h3>
        </div>

        <div class="flex items-center gap-2">
          <TextButton @click="addTable" variant="default" size="sm"> Add Table </TextButton>
          <TextButton
            v-if="tablesData.length > 1"
            @click="removeTable(tableIndex)"
            variant="default"
            size="sm"
            class="text-red-600 hover:text-red-800"
            title="Delete table"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </TextButton>
        </div>
      </div>

      <!-- Section Content -->
      <div v-if="isTableExpanded(tableIndex)" class="space-y-4">
        <!-- Section Title Input -->
        <div :id="`config-table-${tableIndex}-section-title`">
          <UnifiedLInput
            :model-value="table.sectionTitle"
            @update:model-value="
              (value: string) => updateTableField(tableIndex, 'sectionTitle', value)
            "
            label="Section Title"
          />
        </div>

        <!-- Subsection Title Input -->
        <div :id="`config-table-${tableIndex}-subsection-title`">
          <UnifiedLInput
            :model-value="table.subsectionTitle"
            @update:model-value="
              (value: string) => updateTableField(tableIndex, 'subsectionTitle', value)
            "
            label="Subsection Title"
          />
        </div>

        <!-- Column Headers -->
        <div class="mb-5">
          <div class="mb-5">
            <h4 class="text-sm font-medium text-gray-600">Table Column</h4>
          </div>
          <div class="space-y-4">
            <div
              v-for="(column, index) in table.columns"
              :key="column.id"
              :id="`config-table-${tableIndex}-column-${column.id}`"
              class="item-group-container"
              draggable="true"
              @dragstart="handleColumnDragStart($event, tableIndex, index)"
              @dragover="handleColumnDragOver"
              @drop="handleColumnDrop($event, tableIndex, index)"
              @dragend="handleColumnDragEnd"
            >
              <!-- Item Header -->
              <div class="flex items-center justify-between mb-5">
                <div class="flex items-center gap-2">
                  <!-- Drag Handle -->
                  <div class="cursor-move text-gray-400 hover:text-gray-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 8h16M4 16h16"
                      ></path>
                    </svg>
                  </div>
                  <h4 class="text-sm font-semibold text-[#0e171f]">Column {{ index + 1 }}</h4>
                </div>
                <TextButton
                  @click="removeColumn(tableIndex, index)"
                  variant="default"
                  size="sm"
                  title="Delete column"
                  class="text-red-600 hover:text-red-800"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M6 18L18 6M6 6l12 12"
                    ></path>
                  </svg>
                </TextButton>
              </div>

              <!-- Input Fields - One per row -->
              <div class="space-y-3">
                <!-- Column Name Input -->
                <div :id="`config-table-${tableIndex}-column-header-${column.id}`">
                  <UnifiedLInput
                    :model-value="column.name"
                    @update:model-value="
                      (value: string) => updateColumnField(tableIndex, index, 'name', value)
                    "
                    label="Column Name"
                  />
                </div>
                <!-- Column Width Input -->
                <div :id="`config-table-${tableIndex}-column-width-${column.id}`">
                  <UnifiedLInput
                    :model-value="(column.width ?? 100) as any"
                    @update:model-value="
                      (value: string) =>
                        updateColumnField(tableIndex, index, 'width', Number(value) || 100)
                    "
                    label="Column Width (%)"
                    type="number"
                  />
                </div>

                <!-- Alignment Toggle -->
                <div class="flex items-center gap-3">
                  <Toggle
                    :model-value="column.alignment === 'right'"
                    @update:model-value="
                      (value) =>
                        updateColumnField(tableIndex, index, 'alignment', value ? 'right' : 'left')
                    "
                    size="sm"
                  />
                  <label class="text-sm font-medium text-gray-600">Align right</label>
                </div>
              </div>
            </div>
          </div>

          <!-- Add Column Button -->
          <div class="mt-4">
            <TextButton @click="addColumn(tableIndex)" variant="default" size="sm" class="w-full">
              Add Column
            </TextButton>
          </div>

          <!-- Column Value -->
          <div class="mt-5" :id="`config-table-${tableIndex}-column-value-section`">
            <h4 class="text-sm font-medium text-gray-600" style="margin-bottom: 20px">
              Column Value
            </h4>
            <div class="space-y-1">
              <div class="item-group-container">
                <!-- Input Fields -->
                <div class="space-y-4">
                  <div v-for="(column, colIndex) in table.columns" :key="column.id">
                    <div :id="`config-table-${tableIndex}-column-value-${column.id}`">
                      <UnifiedLInput
                        :model-value="getTemplateData(tableIndex)[column.id]"
                        @update:model-value="
                          (value: string) => updateColumnTemplate(tableIndex, column.id, value)
                        "
                        :label="column.name || `Column ${colIndex + 1}`"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Table Rows (仅保留行数控制，移除 Editable Grid) -->
          <div class="mt-5 mb-5">
            <h4 class="text-sm font-medium text-gray-600" style="margin-bottom: 20px">
              Table Rows
            </h4>
            <!-- Rows Number Input -->
            <div style="margin-bottom: 20px">
              <UnifiedLInput
                :model-value="table.rowsNumber || 2"
                @update:model-value="
                  (value: string) => updateTableField(tableIndex, 'rowsNumber', value)
                "
                label="Rows Number"
                type="number"
              />
            </div>

            <!-- Subtotal Amount Input -->
            <div style="margin-bottom: 20px">
              <UnifiedLInput
                :model-value="table.total === null ? '' : String(table.total)"
                @update:model-value="
                  (value: string) => updateTableField(tableIndex, 'total', value)
                "
                label="Subtotal Amount"
                type="number"
                placeholder="Leave empty to hide subtotal"
              />
            </div>

            <!-- Show Subtotal Toggle -->
            <div style="margin-bottom: 20px">
              <div class="flex items-center gap-3">
                <Toggle
                  :model-value="table.showSubtotal !== false"
                  @update:model-value="
                    (value) => updateTableField(tableIndex, 'showSubtotal', value)
                  "
                  size="sm"
                />
                <label class="text-sm font-medium text-gray-600">Show Subtotal</label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Bottom Divider - 已移除，由Configuration Panel统一管理 -->
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted, inject } from 'vue'
import UnifiedLInput from './UnifiedLInput.vue'
import SectionTitle from './SectionTitle.vue'
import TextButton from './TextButton.vue'
import Toggle from './Toggle.vue'
import { generateId } from '../composables/useSectionData'
import type {
  TableData,
  TableColumn,
  TableRow,
  BaseSectionProps,
  BaseSectionEmits,
} from '../types/section'

// 修改 props 和 emits 以支持多个表格
interface TablesProps {
  modelValue?: TableData[]
}

interface TablesEmits {
  (e: 'update:modelValue', value: TableData[]): void
}

const props = defineProps<TablesProps>()

const emit = defineEmits<TablesEmits>()

// 注入确认对话框
const confirmDialog = inject('confirmDialog') as any

// 表格展开状态管理
const expandedTables = ref<Set<number>>(new Set([0])) // 默认第一个表格展开

// 拖拽状态管理
const draggedColumn = ref<{ tableIndex: number; columnIndex: number } | null>(null)

// 检查表格是否展开
const isTableExpanded = (tableIndex: number) => {
  return expandedTables.value.has(tableIndex)
}

// 切换表格展开状态
const toggleTableExpanded = (tableIndex: number) => {
  if (expandedTables.value.has(tableIndex)) {
    expandedTables.value.delete(tableIndex)
  } else {
    expandedTables.value.add(tableIndex)
  }
}

// 监听全局事件来展开特定的 table section
const handleExpandTableSection = (event: CustomEvent) => {
  const { tableIndex } = event.detail
  if (typeof tableIndex === 'number') {
    expandedTables.value.add(tableIndex)
  }
}

// 监听全局事件
onMounted(() => {
  window.addEventListener('expand-table-section', handleExpandTableSection as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('expand-table-section', handleExpandTableSection as EventListener)
})

// 默认数据
const defaultTableData: TableData = {
  id: generateId(),
  sectionTitle: 'Table Title',
  subsectionTitle: 'Subsection',
  columns: [
    { id: '1', name: 'Column 1', type: 'text', alignment: 'left', width: 100 },
    { id: '2', name: 'Column 2', type: 'text', alignment: 'left', width: 100 },
    { id: '3', name: 'Column 3', type: 'number', alignment: 'right', width: 100 },
    { id: '4', name: 'Column 4', type: 'currency', alignment: 'right', width: 100 },
  ],
  rows: [
    {
      id: '1',
      data: { '1': 'Placeholder', '2': 'Placeholder', '3': 'Placeholder', '4': 'Placeholder' },
      total: 0,
    },
    {
      id: '2',
      data: { '1': 'Placeholder', '2': 'Placeholder', '3': 'Placeholder', '4': 'Placeholder' },
      total: 0,
    },
    {
      id: '3',
      data: { '1': 'Placeholder', '2': 'Placeholder', '3': 'Placeholder', '4': 'Placeholder' },
      total: 0,
    },
    {
      id: '4',
      data: { '1': 'Placeholder', '2': 'Placeholder', '3': 'Placeholder', '4': 'Placeholder' },
      total: 0,
    },
    {
      id: '5',
      data: { '1': 'Placeholder', '2': 'Placeholder', '3': 'Placeholder', '4': 'Placeholder' },
      total: 0,
    },
  ],
  total: 0,
  rowsNumber: 2,
  showSubtotal: true, // 默认显示 Subtotal
}

// 使用computed管理多个表格数据
const tablesData = computed({
  get: () => props.modelValue || [defaultTableData],
  set: (value) => emit('update:modelValue', value),
})

// 获取指定表格的模板数据
const getTemplateData = (tableIndex: number) => {
  const table = tablesData.value[tableIndex]
  const firstRow = table?.rows?.[0]
  return firstRow?.data || {}
}

// 更新表格字段
const updateTableField = (tableIndex: number, field: keyof TableData, value: any) => {
  console.log('PdfTableSection: updateTableField called', { tableIndex, field, value })
  const newTables = [...tablesData.value]
  if (newTables[tableIndex]) {
    let processedValue
    if (field === 'rowsNumber') {
      processedValue = Number(value) || 2
    } else if (field === 'total') {
      // 处理 total: 空字符串设为 null，否则转为数字（包括0）
      processedValue = value === '' ? null : Number(value)
    } else {
      processedValue = value
    }
    newTables[tableIndex] = { ...newTables[tableIndex], [field]: processedValue }
    console.log('PdfTableSection: emitting update:modelValue', newTables)
    emit('update:modelValue', newTables)
  }
}

// 更新列字段
const updateColumnField = (
  tableIndex: number,
  columnIndex: number,
  field: keyof TableColumn,
  value: any,
) => {
  const newTables = [...tablesData.value]
  if (newTables[tableIndex] && newTables[tableIndex].columns) {
    const newColumns = [...newTables[tableIndex].columns]
    if (newColumns[columnIndex]) {
      newColumns[columnIndex] = { ...newColumns[columnIndex], [field]: value }
      newTables[tableIndex] = { ...newTables[tableIndex], columns: newColumns }
      emit('update:modelValue', newTables)
    }
  }
}

// 更新列模板数据
const updateColumnTemplate = (tableIndex: number, columnId: string, value: string) => {
  const newTables = [...tablesData.value]
  const table = newTables[tableIndex]
  if (table && table.rows) {
    const newRows = table.rows.map((row) => ({
      ...row,
      data: { ...row.data, [columnId]: value },
    }))
    newTables[tableIndex] = { ...table, rows: newRows }
    emit('update:modelValue', newTables)
  }
}

// 添加新表格
const addTable = () => {
  const newTable: TableData = {
    id: generateId(),
    sectionTitle: 'Table Title',
    subsectionTitle: 'Subsection',
    columns: [
      { id: generateId(), name: 'Column 1', type: 'text', alignment: 'left' },
      { id: generateId(), name: 'Column 2', type: 'text', alignment: 'left' },
    ],
    rows: [
      { id: generateId(), data: {}, total: 0 },
      { id: generateId(), data: {}, total: 0 },
    ],
    total: 0,
    rowsNumber: 2,
  }

  // 初始化行数据
  newTable.columns.forEach((column) => {
    newTable.rows.forEach((row) => {
      row.data[column.id] = 'Placeholder'
    })
  })

  const newTables = [...tablesData.value, newTable]
  const newTableIndex = newTables.length - 1

  // 新添加的表格默认展开
  expandedTables.value.add(newTableIndex)

  emit('update:modelValue', newTables)
}

// 删除表格
const removeTable = (tableIndex: number) => {
  confirmDialog.showConfirm({
    message: `Are you sure you want to delete Table Section ${tableIndex + 1}? This action cannot be undone.`,
    onConfirm: () => {
      const newTables = tablesData.value.filter((_, index) => index !== tableIndex)

      // 更新展开状态，移除被删除的表格索引，并调整其他索引
      const newExpandedTables = new Set<number>()
      expandedTables.value.forEach((index) => {
        if (index < tableIndex) {
          newExpandedTables.add(index)
        } else if (index > tableIndex) {
          newExpandedTables.add(index - 1)
        }
      })
      expandedTables.value = newExpandedTables

      emit('update:modelValue', newTables)
    },
  })
}

// 添加列
const addColumn = (tableIndex: number) => {
  const newTables = [...tablesData.value]
  const table = newTables[tableIndex]
  if (table && table.columns) {
    const newColumnIndex = table.columns.length + 1

    const newColumn: TableColumn = {
      id: generateId(),
      name: `Column ${newColumnIndex}`,
      type: 'text',
      alignment: 'left',
      width: 100,
    }

    const newColumns = [...table.columns, newColumn]
    const newRows = table.rows
      ? table.rows.map((row) => ({
          ...row,
          data: { ...row.data, [newColumn.id]: 'Placeholder' },
        }))
      : []

    newTables[tableIndex] = { ...table, columns: newColumns, rows: newRows }
    emit('update:modelValue', newTables)
  }
}

// 删除列
const removeColumn = (tableIndex: number, columnIndex: number) => {
  const table = tablesData.value[tableIndex]
  if (!table || !table.columns || table.columns.length <= 1) {
    return
  }

  const columnToRemove = table.columns[columnIndex]
  if (!columnToRemove) {
    return
  }

  confirmDialog.showConfirm({
    message: `Are you sure you want to delete Column ${columnIndex + 1}? This action cannot be undone.`,
    onConfirm: () => {
      const newTables = [...tablesData.value]
      const table = newTables[tableIndex]

      if (table && table.columns) {
        const newColumns = table.columns.filter((_, i) => i !== columnIndex)
        const newRows = table.rows
          ? table.rows.map((row) => {
              const newRowData = { ...row.data }
              delete newRowData[columnToRemove.id]
              return { ...row, data: newRowData }
            })
          : []

        newTables[tableIndex] = {
          ...table,
          columns: newColumns,
          rows: newRows,
          sectionTitle: table.sectionTitle || 'Table Title',
        }
        emit('update:modelValue', newTables)
      }
    },
  })
}

// 列拖拽处理函数
const handleColumnDragStart = (event: DragEvent, tableIndex: number, columnIndex: number) => {
  draggedColumn.value = { tableIndex, columnIndex }
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
    event.dataTransfer.setData('text/html', '')
  }
}

const handleColumnDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const handleColumnDrop = (event: DragEvent, tableIndex: number, dropIndex: number) => {
  event.preventDefault()

  if (
    !draggedColumn.value ||
    draggedColumn.value.tableIndex !== tableIndex ||
    draggedColumn.value.columnIndex === dropIndex
  ) {
    return
  }

  const newTables = [...tablesData.value]
  const table = newTables[tableIndex]

  if (table && table.columns) {
    const newColumns = [...table.columns]
    const draggedCol = newColumns[draggedColumn.value.columnIndex]

    if (!draggedCol) {
      return
    }

    // 移除被拖拽的列
    newColumns.splice(draggedColumn.value.columnIndex, 1)

    // 在目标位置插入列
    newColumns.splice(dropIndex, 0, draggedCol)

    // 更新行数据以匹配新的列顺序
    const newRows = table.rows
      ? table.rows.map((row) => {
          const newRowData: Record<string, string> = {}
          newColumns.forEach((column) => {
            newRowData[column.id] = row.data[column.id] || 'Placeholder'
          })
          return { ...row, data: newRowData }
        })
      : []

    newTables[tableIndex] = {
      ...table,
      columns: newColumns,
      rows: newRows,
      sectionTitle: table.sectionTitle || 'Table Title',
    }

    emit('update:modelValue', newTables)
  }
}

const handleColumnDragEnd = () => {
  draggedColumn.value = null
}

// Ensure rows exist according to rowsNumber
const ensureRows = (tableIndex: number): TableRow[] => {
  const newTables = [...tablesData.value]
  const table = newTables[tableIndex]
  if (!table) return []
  const rowsNumber = table.rowsNumber || 2
  const baseRows = table.rows ? [...table.rows] : []
  // extend rows if needed
  for (let i = baseRows.length; i < rowsNumber; i++) {
    baseRows.push({ id: generateId(), data: {}, total: 0 })
  }
  // trim extra
  const finalRows = baseRows.slice(0, rowsNumber)
  // write back if changed
  if (!table.rows || table.rows.length !== finalRows.length) {
    newTables[tableIndex] = { ...table, rows: finalRows }
    emit('update:modelValue', newTables)
  }
  return finalRows
}

// Update a specific cell value
const updateCell = (tableIndex: number, rowIndex: number, columnId: string, value: string) => {
  const newTables = [...tablesData.value]
  const table = newTables[tableIndex]
  if (!table) return
  const rows = ensureRows(tableIndex)
  const targetRow = rows[rowIndex]
  if (!targetRow) return
  const newRow: TableRow = { ...targetRow, data: { ...targetRow.data, [columnId]: value } }
  const newRows = [...rows]
  newRows[rowIndex] = newRow
  newTables[tableIndex] = { ...table, rows: newRows }
  emit('update:modelValue', newTables)
}

// 监听全局 collapse-all-sections 事件
const handleCollapseAll = () => {
  expandedTables.value.clear()
}

onMounted(() => {
  window.addEventListener('collapse-all-sections', handleCollapseAll)
})

onUnmounted(() => {
  window.removeEventListener('collapse-all-sections', handleCollapseAll)
})
</script>

<style scoped>
/* Item Group Configuration Styles */
.item-group-container {
  background-color: #f9fafb; /* gray-50 */
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e5e7eb; /* gray-200 */
  transition: all 0.3s ease-in-out;
}

.item-group-container:hover {
  background-color: #f3f4f6; /* gray-100 */
  border-color: #d1d5db; /* gray-300 */
}

/* Highlight effect for clicked items */
.item-group-container.config-item-highlight {
  background-color: rgba(255, 193, 7, 0.16) !important;
  border: 2px solid rgba(255, 193, 7, 0.56) !important;
  border-radius: 8px !important;
  box-shadow: 0 0 8px rgba(255, 193, 7, 0.16) !important;
}
</style>
