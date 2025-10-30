<template>
  <div class="w-full mb-0">
    <!-- Multiple H-Info Sections -->
    <div
      v-for="(hInfoSection, hInfoIndex) in hInfoSectionsData"
      :key="hInfoSection.id"
      :id="`config-h-info-${hInfoIndex}-section`"
      class="mb-8"
    >
      <!-- Section Header with Title and Actions -->
      <div
        class="flex items-center justify-between mb-4"
        :style="{ marginTop: hInfoIndex > 0 ? '20px' : '20px' }"
      >
        <div class="flex items-center gap-2">
          <!-- Expand/Collapse Button -->
          <button
            @click="toggleHInfoExpanded(hInfoIndex)"
            class="flex items-center justify-center w-6 h-6 rounded hover:bg-gray-100 transition-colors"
            :title="isHInfoExpanded(hInfoIndex) ? 'Collapse section' : 'Expand section'"
          >
            <svg
              class="w-4 h-4 text-gray-600 transition-transform"
              :class="{ 'rotate-180': isHInfoExpanded(hInfoIndex) }"
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
          <h3 class="text-base font-semibold text-[#0e171f]">
            H-Info Section {{ hInfoIndex + 1 }}
          </h3>
        </div>

        <div class="flex items-center gap-2">
          <TextButton @click="addHInfoSection" variant="default" size="sm">
            Add H-Info Section
          </TextButton>
          <TextButton
            v-if="hInfoSectionsData.length > 1"
            @click="removeHInfoSection(hInfoIndex)"
            variant="default"
            size="sm"
            class="text-red-600 hover:text-red-800"
            title="Delete h-info section"
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
      <div v-if="isHInfoExpanded(hInfoIndex)" class="space-y-4">
        <!-- Section Title Input -->
        <div :id="`config-h-info-${hInfoIndex}-section-title`">
          <UnifiedLInput
            :model-value="hInfoSection.sectionTitle"
            @update:model-value="
              (value: string) => updateHInfoField(hInfoIndex, 'sectionTitle', value)
            "
            label="Section Title"
          />
        </div>

        <!-- Label and Value Layout Direction -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Label & Value Layout</label>
          <select
            :value="hInfoSection.labelValueLayout || 'horizontal'"
            @change="
              updateHInfoField(
                hInfoIndex,
                'labelValueLayout',
                ($event.target as HTMLSelectElement).value,
              )
            "
            class="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="horizontal">Horizontal (Side by Side)</option>
            <option value="vertical">Vertical (Stacked)</option>
          </select>
        </div>

        <!-- Column Width Selection -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Column Width</label>
          <select
            :value="getColumnWidth(hInfoIndex)"
            @change="updateColumnWidth(hInfoIndex, ($event.target as HTMLSelectElement).value)"
            class="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          >
            <option value="1/2">1/2 (50%)</option>
            <option value="1/3">1/3 (33.33%)</option>
            <option value="1/4">1/4 (25%)</option>
          </select>
        </div>

        <!-- Columns Container -->
        <div class="w-full space-y-4">
          <div
            v-for="(column, columnIndex) in hInfoSection.columns"
            :key="column.id"
            :id="`config-h-info-${hInfoIndex}-column-${columnIndex}`"
            class="h-info-column-container"
            draggable="true"
            @dragstart="handleColumnDragStart($event, hInfoIndex, columnIndex)"
            @dragover="handleColumnDragOver"
            @drop="handleColumnDrop($event, hInfoIndex, columnIndex)"
            @dragend="handleColumnDragEnd"
          >
            <!-- Column Header -->
            <div class="flex items-center justify-between mb-3">
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
                <h4 class="text-sm font-semibold text-[#0e171f]">Column {{ columnIndex + 1 }}</h4>
              </div>
              <!-- Column width percentage input -->
              <div class="flex items-center gap-2">
                <label class="text-xs text-[#0e171f]">Width (%)</label>
                <input
                  type="number"
                  min="0"
                  class="w-20 border border-[#d3ddde] rounded px-2 py-1 text-xs"
                  :value="column.width ?? ''"
                  @input="
                    (e: Event) =>
                      updateHInfoColumnWidth(
                        hInfoIndex,
                        columnIndex,
                        Number((e.target as HTMLInputElement).value || 0),
                      )
                  "
                />
              </div>
              <TextButton
                @click="removeHInfoColumn(hInfoIndex, columnIndex)"
                variant="default"
                size="sm"
                title="Delete column"
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

            <!-- Items in Column -->
            <div class="space-y-3">
              <div
                v-for="(item, itemIndex) in column.items"
                :key="item.id"
                :id="`config-h-info-${hInfoIndex}-column-${columnIndex}-item-${item.id}`"
                class="h-info-item-container"
                draggable="true"
                @dragstart="handleItemDragStart($event, hInfoIndex, columnIndex, itemIndex)"
                @dragover="handleItemDragOver"
                @drop="handleItemDrop($event, hInfoIndex, columnIndex, itemIndex)"
                @dragend="handleItemDragEnd"
              >
                <!-- Item Header -->
                <div class="flex items-center justify-between mb-5">
                  <div class="flex items-center gap-2">
                    <!-- Drag Handle -->
                    <div class="cursor-move text-gray-400 hover:text-gray-600">
                      <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M4 8h16M4 16h16"
                        ></path>
                      </svg>
                    </div>
                    <h5 class="text-xs font-medium text-[#0e171f]">Item {{ itemIndex + 1 }}</h5>
                  </div>
                  <TextButton
                    @click="removeHInfoItem(hInfoIndex, columnIndex, itemIndex)"
                    variant="default"
                    size="sm"
                    title="Delete item"
                  >
                    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M6 18L18 6M6 6l12 12"
                      ></path>
                    </svg>
                  </TextButton>
                </div>

                <!-- Item Input Fields -->
                <div class="space-y-3">
                  <!-- Label Input -->
                  <UnifiedLInput
                    :model-value="item.label"
                    @update:model-value="
                      (value: string) =>
                        updateHInfoItemField(hInfoIndex, columnIndex, itemIndex, 'label', value)
                    "
                    label="Label"
                  />

                  <!-- Value Input (Multiline) -->
                  <UnifiedLInput
                    :model-value="item.value"
                    @update:model-value="
                      (value: string) =>
                        updateHInfoItemField(hInfoIndex, columnIndex, itemIndex, 'value', value)
                    "
                    label="Value"
                    multiline
                  />
                </div>
              </div>
            </div>

            <!-- Add Item Button -->
            <div class="mt-3">
              <TextButton
                @click="addHInfoItem(hInfoIndex, columnIndex)"
                variant="default"
                size="sm"
                class="w-full"
              >
                Add Item
              </TextButton>
            </div>
          </div>
        </div>

        <!-- Add Column Button -->
        <div class="mt-6">
          <TextButton
            @click="addHInfoColumn(hInfoIndex)"
            variant="default"
            size="sm"
            class="w-full"
          >
            Add Column
          </TextButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, inject } from 'vue'
import UnifiedLInput from './UnifiedLInput.vue'
import TextButton from './TextButton.vue'
import { generateId } from '../composables/useSectionData'
import type { HInfoData, HInfoColumn, BaseItem } from '../types/section'

// 修改 props 和 emits 以支持多个 h-info section
interface HInfoSectionsProps {
  modelValue?: HInfoData[]
}

interface HInfoSectionsEmits {
  (e: 'update:modelValue', value: HInfoData[]): void
}

const props = defineProps<HInfoSectionsProps>()

const emit = defineEmits<HInfoSectionsEmits>()

// 注入确认对话框
type ConfirmDialog = {
  showConfirm: (opts: { message: string; onConfirm: () => void }) => void
}
const confirmDialog = inject('confirmDialog') as ConfirmDialog

// H-Info sections 展开状态管理
const expandedHInfoSections = ref<Set<number>>(new Set([0])) // 默认第一个 h-info section 展开

// 拖拽状态管理
const draggedColumn = ref<{ hInfoIndex: number; columnIndex: number } | null>(null)
const draggedItem = ref<{ hInfoIndex: number; columnIndex: number; itemIndex: number } | null>(null)

// 检查 h-info section 是否展开
const isHInfoExpanded = (hInfoIndex: number) => {
  return expandedHInfoSections.value.has(hInfoIndex)
}

// 切换 h-info section 展开状态
const toggleHInfoExpanded = (hInfoIndex: number) => {
  if (expandedHInfoSections.value.has(hInfoIndex)) {
    expandedHInfoSections.value.delete(hInfoIndex)
  } else {
    expandedHInfoSections.value.add(hInfoIndex)
  }
}

// 监听全局事件来展开特定的 h-info section
const handleExpandHInfoSection = (event: CustomEvent) => {
  const { hInfoIndex } = event.detail
  if (typeof hInfoIndex === 'number') {
    expandedHInfoSections.value.add(hInfoIndex)
  }
}

// 监听全局事件
onMounted(() => {
  window.addEventListener('expand-h-info-section', handleExpandHInfoSection as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('expand-h-info-section', handleExpandHInfoSection as EventListener)
})

// 默认数据
const defaultHInfoData: HInfoData = {
  id: generateId(),
  sectionTitle: 'Section title',
  labelValueLayout: 'horizontal',
  columns: [
    {
      id: generateId(),
      items: [
        { id: generateId(), label: 'Label', value: 'Value' },
        { id: generateId(), label: 'Label', value: 'Value' },
      ],
    },
  ],
}

// 使用computed管理数据，避免循环更新
const hInfoSectionsData = computed({
  get: () => props.modelValue || [defaultHInfoData],
  set: (value) => emit('update:modelValue', value),
})

// 获取列宽度设置（存储在 section 的 metadata 中）
const getColumnWidth = (hInfoIndex: number) => {
  const section = hInfoSectionsData.value[hInfoIndex] as
    | (HInfoData & { columnWidth?: string })
    | undefined
  return section?.columnWidth || '1/2'
}

// 更新列宽度
const updateColumnWidth = (hInfoIndex: number, width: string) => {
  const newHInfoSections = [...hInfoSectionsData.value]
  if (newHInfoSections[hInfoIndex]) {
    newHInfoSections[hInfoIndex] = { ...newHInfoSections[hInfoIndex], columnWidth: width }
    emit('update:modelValue', newHInfoSections)
  }
}

// 更新 h-info section 字段
const updateHInfoField = (hInfoIndex: number, field: keyof HInfoData, value: string) => {
  const newHInfoSections = [...hInfoSectionsData.value]
  if (newHInfoSections[hInfoIndex]) {
    newHInfoSections[hInfoIndex] = { ...newHInfoSections[hInfoIndex], [field]: value }
    emit('update:modelValue', newHInfoSections)
  }
}

// 更新 h-info item 字段
const updateHInfoItemField = (
  hInfoIndex: number,
  columnIndex: number,
  itemIndex: number,
  field: keyof BaseItem,
  value: string,
) => {
  const newHInfoSections = [...hInfoSectionsData.value]
  if (newHInfoSections[hInfoIndex] && newHInfoSections[hInfoIndex].columns) {
    const newColumns = [...newHInfoSections[hInfoIndex].columns]
    if (newColumns[columnIndex] && newColumns[columnIndex].items) {
      const newItems = [...newColumns[columnIndex].items]
      if (newItems[itemIndex]) {
        newItems[itemIndex] = { ...newItems[itemIndex], [field]: value }
        newColumns[columnIndex] = { ...newColumns[columnIndex], items: newItems }
        newHInfoSections[hInfoIndex] = { ...newHInfoSections[hInfoIndex], columns: newColumns }
        emit('update:modelValue', newHInfoSections)
      }
    }
  }
}

// 添加新的 h-info section
const addHInfoSection = () => {
  const newHInfoSection: HInfoData = {
    id: generateId(),
    sectionTitle: 'Section title',
    columns: [
      {
        id: generateId(),
        items: [{ id: generateId(), label: 'Label', value: 'Value' }],
      },
    ],
  }

  const newHInfoSections = [...hInfoSectionsData.value, newHInfoSection]
  const newHInfoIndex = newHInfoSections.length - 1

  // 新添加的 h-info section 默认展开
  expandedHInfoSections.value.add(newHInfoIndex)

  emit('update:modelValue', newHInfoSections)
}

// 删除 h-info section
const removeHInfoSection = (hInfoIndex: number) => {
  confirmDialog.showConfirm({
    message: `Are you sure you want to delete H-Info Section ${hInfoIndex + 1}? This action cannot be undone.`,
    onConfirm: () => {
      const newHInfoSections = hInfoSectionsData.value.filter((_, index) => index !== hInfoIndex)

      // 更新展开状态
      const newExpandedHInfoSections = new Set<number>()
      expandedHInfoSections.value.forEach((index) => {
        if (index < hInfoIndex) {
          newExpandedHInfoSections.add(index)
        } else if (index > hInfoIndex) {
          newExpandedHInfoSections.add(index - 1)
        }
      })
      expandedHInfoSections.value = newExpandedHInfoSections

      emit('update:modelValue', newHInfoSections)
    },
  })
}

// 添加 h-info column
const addHInfoColumn = (hInfoIndex: number) => {
  const newColumn: HInfoColumn = {
    id: generateId(),
    items: [{ id: generateId(), label: 'Label', value: 'Value' }],
  }

  const newHInfoSections = [...hInfoSectionsData.value]
  if (newHInfoSections[hInfoIndex]) {
    const newColumns = [...newHInfoSections[hInfoIndex].columns, newColumn]
    newHInfoSections[hInfoIndex] = { ...newHInfoSections[hInfoIndex], columns: newColumns }
    emit('update:modelValue', newHInfoSections)
  }
}

// 删除 h-info column
const removeHInfoColumn = (hInfoIndex: number, columnIndex: number) => {
  confirmDialog.showConfirm({
    message: `Are you sure you want to delete Column ${columnIndex + 1}? This action cannot be undone.`,
    onConfirm: () => {
      const newHInfoSections = [...hInfoSectionsData.value]
      if (newHInfoSections[hInfoIndex] && newHInfoSections[hInfoIndex].columns) {
        const newColumns = [...newHInfoSections[hInfoIndex].columns]
        newColumns.splice(columnIndex, 1)
        newHInfoSections[hInfoIndex] = { ...newHInfoSections[hInfoIndex], columns: newColumns }
        emit('update:modelValue', newHInfoSections)
      }
    },
  })
}

// 更新列宽（百分比/权重，渲染时会按比例归一化）
const updateHInfoColumnWidth = (hInfoIndex: number, columnIndex: number, width: number) => {
  const newHInfoSections = [...hInfoSectionsData.value]
  if (newHInfoSections[hInfoIndex] && newHInfoSections[hInfoIndex].columns) {
    const newColumns = [...newHInfoSections[hInfoIndex].columns]
    const col = newColumns[columnIndex]
    if (col) {
      newColumns[columnIndex] = { ...col, width: isFinite(width) && width >= 0 ? width : 0 }
      newHInfoSections[hInfoIndex] = { ...newHInfoSections[hInfoIndex], columns: newColumns }
      emit('update:modelValue', newHInfoSections)
    }
  }
}

// 添加 h-info item
const addHInfoItem = (hInfoIndex: number, columnIndex: number) => {
  const newItem: BaseItem = {
    id: generateId(),
    label: 'Label',
    value: 'Value',
  }

  const newHInfoSections = [...hInfoSectionsData.value]
  if (newHInfoSections[hInfoIndex] && newHInfoSections[hInfoIndex].columns) {
    const newColumns = [...newHInfoSections[hInfoIndex].columns]
    if (newColumns[columnIndex]) {
      const newItems = [...newColumns[columnIndex].items, newItem]
      newColumns[columnIndex] = { ...newColumns[columnIndex], items: newItems }
      newHInfoSections[hInfoIndex] = { ...newHInfoSections[hInfoIndex], columns: newColumns }
      emit('update:modelValue', newHInfoSections)
    }
  }
}

// 删除 h-info item
const removeHInfoItem = (hInfoIndex: number, columnIndex: number, itemIndex: number) => {
  confirmDialog.showConfirm({
    message: `Are you sure you want to delete Item ${itemIndex + 1}? This action cannot be undone.`,
    onConfirm: () => {
      const newHInfoSections = [...hInfoSectionsData.value]
      if (newHInfoSections[hInfoIndex] && newHInfoSections[hInfoIndex].columns) {
        const newColumns = [...newHInfoSections[hInfoIndex].columns]
        if (newColumns[columnIndex] && newColumns[columnIndex].items) {
          const newItems = [...newColumns[columnIndex].items]
          newItems.splice(itemIndex, 1)
          newColumns[columnIndex] = { ...newColumns[columnIndex], items: newItems }
          newHInfoSections[hInfoIndex] = { ...newHInfoSections[hInfoIndex], columns: newColumns }
          emit('update:modelValue', newHInfoSections)
        }
      }
    },
  })
}

// 拖拽处理函数 - Column
const handleColumnDragStart = (event: DragEvent, hInfoIndex: number, columnIndex: number) => {
  draggedColumn.value = { hInfoIndex, columnIndex }
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
  }
}

const handleColumnDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const handleColumnDrop = (event: DragEvent, dropHInfoIndex: number, dropColumnIndex: number) => {
  event.preventDefault()

  if (
    draggedColumn.value === null ||
    draggedColumn.value.hInfoIndex !== dropHInfoIndex ||
    draggedColumn.value.columnIndex === dropColumnIndex
  ) {
    return
  }

  const newHInfoSections = [...hInfoSectionsData.value]
  const hInfoSection = newHInfoSections[dropHInfoIndex]
  if (hInfoSection && hInfoSection.columns) {
    const newColumns = [...hInfoSection.columns]
    const draggedColumnData = newColumns[draggedColumn.value.columnIndex]

    if (!draggedColumnData) {
      return
    }

    // 移除被拖拽的列
    newColumns.splice(draggedColumn.value.columnIndex, 1)

    // 在目标位置插入列
    newColumns.splice(dropColumnIndex, 0, draggedColumnData)

    newHInfoSections[dropHInfoIndex] = { ...hInfoSection, columns: newColumns }
    emit('update:modelValue', newHInfoSections)
  }
}

const handleColumnDragEnd = () => {
  draggedColumn.value = null
}

// 拖拽处理函数 - Item
const handleItemDragStart = (
  event: DragEvent,
  hInfoIndex: number,
  columnIndex: number,
  itemIndex: number,
) => {
  draggedItem.value = { hInfoIndex, columnIndex, itemIndex }
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move'
  }
}

const handleItemDragOver = (event: DragEvent) => {
  event.preventDefault()
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = 'move'
  }
}

const handleItemDrop = (
  event: DragEvent,
  dropHInfoIndex: number,
  dropColumnIndex: number,
  dropItemIndex: number,
) => {
  event.preventDefault()

  if (
    draggedItem.value === null ||
    draggedItem.value.hInfoIndex !== dropHInfoIndex ||
    draggedItem.value.columnIndex !== dropColumnIndex ||
    draggedItem.value.itemIndex === dropItemIndex
  ) {
    return
  }

  const newHInfoSections = [...hInfoSectionsData.value]
  const hInfoSection = newHInfoSections[dropHInfoIndex]
  if (hInfoSection && hInfoSection.columns) {
    const newColumns = [...hInfoSection.columns]
    const column = newColumns[dropColumnIndex]
    if (column && column.items) {
      const newItems = [...column.items]
      const draggedItemData = newItems[draggedItem.value.itemIndex]

      if (!draggedItemData) {
        return
      }

      // 移除被拖拽的项目
      newItems.splice(draggedItem.value.itemIndex, 1)

      // 在目标位置插入项目
      newItems.splice(dropItemIndex, 0, draggedItemData)

      newColumns[dropColumnIndex] = { ...column, items: newItems }
      newHInfoSections[dropHInfoIndex] = { ...hInfoSection, columns: newColumns }
      emit('update:modelValue', newHInfoSections)
    }
  }
}

const handleItemDragEnd = () => {
  draggedItem.value = null
}

// 监听全局 collapse-all-sections 事件
const handleCollapseAll = () => {
  expandedHInfoSections.value.clear()
}

onMounted(() => {
  window.addEventListener('collapse-all-sections', handleCollapseAll)
})

onUnmounted(() => {
  window.removeEventListener('collapse-all-sections', handleCollapseAll)
})
</script>

<style scoped>
/* H-Info Section Configuration Styles */
.h-info-column-container {
  background-color: #f9fafb; /* gray-50 */
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e5e7eb; /* gray-200 */
  transition: all 0.3s ease-in-out;
}

.h-info-column-container:hover {
  background-color: #f3f4f6; /* gray-100 */
  border-color: #d1d5db; /* gray-300 */
}

.h-info-item-container {
  background-color: #ffffff;
  border-radius: 6px;
  padding: 12px;
  border: 1px solid #e5e7eb; /* gray-200 */
  transition: all 0.3s ease-in-out;
  margin-bottom: 4px;
}

.h-info-item-container:hover {
  background-color: #f8fafc; /* gray-50 */
  border-color: #d1d5db; /* gray-300 */
}

/* Highlight effect for clicked items */
.h-info-column-container.config-item-highlight,
.h-info-item-container.config-item-highlight {
  background-color: rgba(255, 193, 7, 0.16) !important;
  border: 2px solid rgba(255, 193, 7, 0.56) !important;
  border-radius: 8px !important;
  box-shadow: 0 0 8px rgba(255, 193, 7, 0.16) !important;
}
</style>
