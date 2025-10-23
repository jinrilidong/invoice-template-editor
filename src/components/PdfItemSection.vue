<template>
  <div class="w-full mb-0">
    <!-- Multiple Item Sections -->
    <div v-for="(itemSection, itemIndex) in itemSectionsData" :key="itemSection.id" :id="`config-item-${itemIndex}-section`" class="mb-8">
      <!-- Divider between sections (except for the first one) - 已移除，由Configuration Panel统一管理 -->
      
      <!-- Section Header with Title and Actions -->
      <div class="flex items-center justify-between mb-4" :style="{ marginTop: itemIndex > 0 ? '20px' : '20px' }">
        <div class="flex items-center gap-2">
          <!-- Expand/Collapse Button -->
          <button 
            @click="toggleItemExpanded(itemIndex)"
            class="flex items-center justify-center w-6 h-6 rounded hover:bg-gray-100 transition-colors"
            :title="isItemExpanded(itemIndex) ? 'Collapse section' : 'Expand section'"
          >
            <svg 
              class="w-4 h-4 text-gray-600 transition-transform" 
              :class="{ 'rotate-180': isItemExpanded(itemIndex) }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <!-- Section Title -->
          <h3 class="text-base font-semibold text-[#0e171f]">
            Item Section {{ itemIndex + 1 }}
          </h3>
        </div>
        
        <div class="flex items-center gap-2">
          <TextButton 
            @click="addItemSection" 
            variant="default" 
            size="sm"
          >
            Add Item Section
          </TextButton>
          <TextButton 
            v-if="itemSectionsData.length > 1"
            @click="removeItemSection(itemIndex)" 
            variant="default" 
            size="sm"
            class="text-red-600 hover:text-red-800"
            title="Delete item section"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </TextButton>
        </div>
      </div>

      <!-- Section Content -->
      <div v-if="isItemExpanded(itemIndex)" class="space-y-4">
        <!-- Section Title Input -->
        <div :id="`config-item-${itemIndex}-section-title`">
          <UnifiedLInput
            :model-value="itemSection.sectionTitle"
            @update:model-value="(value: string) => updateItemField(itemIndex, 'sectionTitle', value)"
            label="Section Title"
          />
        </div>
        
        <!-- Item List -->
        <div class="w-full space-y-1">
          <div 
            v-for="(item, itemItemIndex) in itemSection.items" 
            :key="item.id" 
            :id="`config-item-${itemIndex}-item-${item.id}`"
            class="item-group-container"
            draggable="true"
            @dragstart="handleItemDragStart($event, itemIndex, itemItemIndex)"
            @dragover="handleItemDragOver"
            @drop="handleItemDrop($event, itemIndex, itemItemIndex)"
            @dragend="handleItemDragEnd"
          >
            <!-- Item Container -->
            <div>
              <!-- Item Header -->
              <div class="flex items-center justify-between mb-5">
                <div class="flex items-center gap-2">
                  <!-- Drag Handle -->
                  <div class="cursor-move text-gray-400 hover:text-gray-600">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
                    </svg>
                  </div>
                  <h4 class="text-sm font-semibold text-[#0e171f]">Item {{ itemItemIndex + 1 }}</h4>
                </div>
                <TextButton
                  @click="removeItemHandler(itemIndex, itemItemIndex)"
                  variant="default"
                  size="sm"
                  title="Delete item"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                  </svg>
                </TextButton>
              </div>
              
              <!-- Input Fields -->
              <div class="space-y-3">
                <!-- Label Input -->
                <UnifiedLInput
                  :model-value="item.label"
                  @update:model-value="(value: string) => updateItemItemField(itemIndex, itemItemIndex, 'label', value)"
                  label="Label"
                />
                
                <!-- Value Input -->
                <UnifiedLInput
                  :model-value="item.value"
                  @update:model-value="(value: string) => updateItemItemField(itemIndex, itemItemIndex, 'value', value)"
                  label="Value"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Add Item Button -->
        <div class="mt-6">
          <TextButton 
            @click="addItemHandler(itemIndex)" 
            variant="default" 
            size="sm"
            class="w-full"
          >
            Add Item
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
import type { ItemData, BaseItem } from '../types/section'

// 修改 props 和 emits 以支持多个 item section
interface ItemSectionsProps {
  modelValue?: ItemData[]
}

interface ItemSectionsEmits {
  (e: 'update:modelValue', value: ItemData[]): void
}

const props = defineProps<ItemSectionsProps>()

const emit = defineEmits<ItemSectionsEmits>()

// 注入确认对话框
const confirmDialog = inject('confirmDialog') as any

// Item sections 展开状态管理
const expandedItemSections = ref<Set<number>>(new Set([0])) // 默认第一个 item section 展开

// 拖拽状态管理
const draggedItem = ref<{itemIndex: number, itemItemIndex: number} | null>(null)

// 检查 item section 是否展开
const isItemExpanded = (itemIndex: number) => {
  return expandedItemSections.value.has(itemIndex)
}

// 切换 item section 展开状态
const toggleItemExpanded = (itemIndex: number) => {
  if (expandedItemSections.value.has(itemIndex)) {
    expandedItemSections.value.delete(itemIndex)
  } else {
    expandedItemSections.value.add(itemIndex)
  }
}

// 监听全局事件来展开特定的 item section
const handleExpandItemSection = (event: CustomEvent) => {
  const { itemIndex } = event.detail
  if (typeof itemIndex === 'number') {
    expandedItemSections.value.add(itemIndex)
  }
}

// 监听全局事件
onMounted(() => {
  window.addEventListener('expand-item-section', handleExpandItemSection as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('expand-item-section', handleExpandItemSection as EventListener)
})

// 默认数据
const defaultItemData: ItemData = {
  id: generateId(),
  sectionTitle: 'Section title',
  items: [
    { id: '1', label: 'Label', value: 'Value' },
    { id: '2', label: 'Label', value: 'Value' }
  ]
}

// 使用computed管理数据，避免循环更新
const itemSectionsData = computed({
  get: () => props.modelValue || [defaultItemData],
  set: (value) => emit('update:modelValue', value)
})

// 更新 item section 字段
const updateItemField = (itemIndex: number, field: keyof ItemData, value: any) => {
  console.log('PdfItemSection: updateItemField called', { itemIndex, field, value })
  const newItemSections = [...itemSectionsData.value]
  if (newItemSections[itemIndex]) {
    newItemSections[itemIndex] = { ...newItemSections[itemIndex], [field]: value }
    console.log('PdfItemSection: emitting update:modelValue', newItemSections)
    emit('update:modelValue', newItemSections)
  }
}

// 更新 item item 字段
const updateItemItemField = (itemIndex: number, itemItemIndex: number, field: keyof BaseItem, value: any) => {
  const newItemSections = [...itemSectionsData.value]
  if (newItemSections[itemIndex] && newItemSections[itemIndex].items) {
    const newItems = [...newItemSections[itemIndex].items]
    if (newItems[itemItemIndex]) {
      newItems[itemItemIndex] = { ...newItems[itemItemIndex], [field]: value }
      newItemSections[itemIndex] = { ...newItemSections[itemIndex], items: newItems }
      emit('update:modelValue', newItemSections)
    }
  }
}

// 添加新的 item section
const addItemSection = () => {
  const newItemSection: ItemData = {
    id: generateId(),
    sectionTitle: 'Section title',
    items: [
      { id: generateId(), label: 'Label', value: 'Value' },
      { id: generateId(), label: 'Label', value: 'Value' }
    ]
  }
  
  const newItemSections = [...itemSectionsData.value, newItemSection]
  const newItemIndex = newItemSections.length - 1
  
  // 新添加的 item section 默认展开
  expandedItemSections.value.add(newItemIndex)
  
  emit('update:modelValue', newItemSections)
}

// 删除 item section
const removeItemSection = (itemIndex: number) => {
  confirmDialog.showConfirm({
    message: `Are you sure you want to delete Item Section ${itemIndex + 1}? This action cannot be undone.`,
    onConfirm: () => {
      const newItemSections = itemSectionsData.value.filter((_, index) => index !== itemIndex)
      
      // 更新展开状态，移除被删除的 item section 索引，并调整其他索引
      const newExpandedItemSections = new Set<number>()
      expandedItemSections.value.forEach(index => {
        if (index < itemIndex) {
          newExpandedItemSections.add(index)
        } else if (index > itemIndex) {
          newExpandedItemSections.add(index - 1)
        }
      })
      expandedItemSections.value = newExpandedItemSections
      
      emit('update:modelValue', newItemSections)
    }
  })
}

// 添加 item
const addItemHandler = (itemIndex: number) => {
  const newItem: BaseItem = {
    id: generateId(),
    label: 'Label',
    value: 'Value'
  }
  
  const newItemSections = [...itemSectionsData.value]
  if (newItemSections[itemIndex]) {
    const currentItems = newItemSections[itemIndex].items || []
    const newItems = [...currentItems, newItem]
    newItemSections[itemIndex] = { ...newItemSections[itemIndex], items: newItems }
    emit('update:modelValue', newItemSections)
  }
}

// 删除 item
const removeItemHandler = (itemIndex: number, itemItemIndex: number) => {
  confirmDialog.showConfirm({
    message: `Are you sure you want to delete Item ${itemItemIndex + 1}? This action cannot be undone.`,
    onConfirm: () => {
      const newItemSections = [...itemSectionsData.value]
      if (newItemSections[itemIndex] && newItemSections[itemIndex].items) {
        const newItems = [...newItemSections[itemIndex].items]
        newItems.splice(itemItemIndex, 1)
        newItemSections[itemIndex] = { ...newItemSections[itemIndex], items: newItems }
        emit('update:modelValue', newItemSections)
      }
    }
  })
}

// 拖拽处理函数
const handleItemDragStart = (event: DragEvent, itemIndex: number, itemItemIndex: number) => {
  draggedItem.value = { itemIndex, itemItemIndex }
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

const handleItemDrop = (event: DragEvent, dropItemIndex: number, dropItemItemIndex: number) => {
  event.preventDefault()
  
  if (draggedItem.value === null || 
      draggedItem.value.itemIndex !== dropItemIndex || 
      draggedItem.value.itemItemIndex === dropItemItemIndex) {
    return
  }
  
  const newItemSections = [...itemSectionsData.value]
  const itemSection = newItemSections[dropItemIndex]
  if (itemSection && itemSection.items) {
    const newItems = [...itemSection.items]
    const draggedItemData = newItems[draggedItem.value.itemItemIndex]
    
    if (!draggedItemData) {
      return
    }
    
    // 移除被拖拽的项目
    newItems.splice(draggedItem.value.itemItemIndex, 1)
    
    // 在目标位置插入项目
    newItems.splice(dropItemItemIndex, 0, draggedItemData)
    
    newItemSections[dropItemIndex] = { ...itemSection, items: newItems }
    emit('update:modelValue', newItemSections)
  }
}

const handleItemDragEnd = () => {
  draggedItem.value = null
}

// 监听全局 collapse-all-sections 事件
const handleCollapseAll = () => {
  expandedItemSections.value.clear()
}

onMounted(() => {
  window.addEventListener('collapse-all-sections', handleCollapseAll)
})

onUnmounted(() => {
  window.removeEventListener('collapse-all-sections', handleCollapseAll)
})
</script>

<style scoped>
/* Item Section Configuration Styles */
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