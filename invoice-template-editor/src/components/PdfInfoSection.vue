<template>
  <div class="w-full mb-0">
    <!-- Multiple Info Sections -->
    <div v-for="(infoSection, infoIndex) in infoSectionsData" :key="infoSection.id" :id="`config-info-${infoIndex}-section`" class="mb-8">
      <!-- Divider between sections (except for the first one) - 已移除，由Configuration Panel统一管理 -->
      
      <!-- Section Header with Title and Actions -->
      <div class="flex items-center justify-between mb-4" :style="{ marginTop: infoIndex > 0 ? '20px' : '20px' }">
        <div class="flex items-center gap-2">
          <!-- Expand/Collapse Button -->
          <button 
            @click="toggleInfoExpanded(infoIndex)"
            class="flex items-center justify-center w-6 h-6 rounded hover:bg-gray-100 transition-colors"
            :title="isInfoExpanded(infoIndex) ? 'Collapse section' : 'Expand section'"
          >
            <svg 
              class="w-4 h-4 text-gray-600 transition-transform" 
              :class="{ 'rotate-180': isInfoExpanded(infoIndex) }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </button>
          
          <!-- Section Title -->
          <h3 class="text-base font-semibold text-[#0e171f]">
            Info Section {{ infoIndex + 1 }}
          </h3>
        </div>
        
        <div class="flex items-center gap-2">
          <TextButton 
            @click="addInfoSection" 
            variant="default" 
            size="sm"
          >
            Add Info Section
          </TextButton>
          <TextButton 
            v-if="infoSectionsData.length > 1"
            @click="removeInfoSection(infoIndex)" 
            variant="default" 
            size="sm"
            class="text-red-600 hover:text-red-800"
            title="Delete info section"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </TextButton>
        </div>
      </div>

      <!-- Section Content -->
      <div v-if="isInfoExpanded(infoIndex)" class="space-y-4">
        <!-- Section Title Input -->
        <div :id="`config-info-${infoIndex}-section-title`">
          <UnifiedLInput
            :model-value="infoSection.sectionTitle"
            @update:model-value="(value: string) => updateInfoField(infoIndex, 'sectionTitle', value)"
            label="Section Title"
          />
        </div>
        
        <!-- Info Items - One per row -->
        <div 
          v-for="(item, itemIndex) in infoSection.items" 
          :key="item.id" 
          :id="`config-info-${infoIndex}-item-${item.id}`"
          class="info-item-container"
          draggable="true"
          @dragstart="handleItemDragStart($event, infoIndex, itemIndex)"
          @dragover="handleItemDragOver"
          @drop="handleItemDrop($event, infoIndex, itemIndex)"
          @dragend="handleItemDragEnd"
        >
          <!-- Item Header -->
          <div class="flex items-center justify-between mb-5">
            <div class="flex items-center gap-2">
              <!-- Drag Handle -->
              <div class="cursor-move text-gray-400 hover:text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8h16M4 16h16"></path>
                </svg>
              </div>
              <h4 class="text-sm font-semibold text-[#0e171f]">Item {{ itemIndex + 1 }}</h4>
            </div>
            <TextButton
              @click="removeInfoItem(infoIndex, itemIndex)"
              variant="default"
              size="sm"
              title="Delete item"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </TextButton>
          </div>
          
          <!-- Input Fields - One per row -->
          <div class="space-y-3">
            <!-- Label Input -->
            <UnifiedLInput
              :model-value="item.label"
              @update:model-value="(value: string) => updateInfoItemField(infoIndex, itemIndex, 'label', value)"
              label="Label"
            />
            
            <!-- Value Input -->
            <UnifiedLInput
              :model-value="item.value"
              @update:model-value="(value: string) => updateInfoItemField(infoIndex, itemIndex, 'value', value)"
              label="Value"
            />
          </div>
        </div>

        <!-- Add Item Button - Full Width at Bottom -->
        <div class="mt-6">
          <TextButton 
            @click="addInfoItem(infoIndex)" 
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
import type { InfoData, BaseItem } from '../types/section'

// 修改 props 和 emits 以支持多个 info section
interface InfoSectionsProps {
  modelValue?: InfoData[]
}

interface InfoSectionsEmits {
  (e: 'update:modelValue', value: InfoData[]): void
}

const props = defineProps<InfoSectionsProps>()

const emit = defineEmits<InfoSectionsEmits>()

// 注入确认对话框
const confirmDialog = inject('confirmDialog') as any

// Info sections 展开状态管理
const expandedInfoSections = ref<Set<number>>(new Set([0])) // 默认第一个 info section 展开

// 拖拽状态管理
const draggedItem = ref<{infoIndex: number, itemIndex: number} | null>(null)

// 检查 info section 是否展开
const isInfoExpanded = (infoIndex: number) => {
  return expandedInfoSections.value.has(infoIndex)
}

// 切换 info section 展开状态
const toggleInfoExpanded = (infoIndex: number) => {
  if (expandedInfoSections.value.has(infoIndex)) {
    expandedInfoSections.value.delete(infoIndex)
  } else {
    expandedInfoSections.value.add(infoIndex)
  }
}

// 监听全局事件来展开特定的 info section
const handleExpandInfoSection = (event: CustomEvent) => {
  const { infoIndex } = event.detail
  if (typeof infoIndex === 'number') {
    expandedInfoSections.value.add(infoIndex)
  }
}

// 监听全局事件
onMounted(() => {
  window.addEventListener('expand-info-section', handleExpandInfoSection as EventListener)
})

onUnmounted(() => {
  window.removeEventListener('expand-info-section', handleExpandInfoSection as EventListener)
})

// 默认数据
const defaultInfoData: InfoData = {
  id: generateId(),
  sectionTitle: 'Section title',
  items: [
    { id: '1', label: 'Invoice #', value: 'INV-001' },
    { id: '2', label: 'Date', value: '2024-01-01' },
    { id: '3', label: 'Due Date', value: '2024-01-31' },
    { id: '4', label: 'Client', value: 'Client Name' },
    { id: '5', label: 'Address', value: '123 Main St' }
  ]
}

// 使用computed管理数据，避免循环更新
const infoSectionsData = computed({
  get: () => props.modelValue || [defaultInfoData],
  set: (value) => emit('update:modelValue', value)
})

// 更新 info section 字段
const updateInfoField = (infoIndex: number, field: keyof InfoData, value: any) => {
  console.log('PdfInfoSection: updateInfoField called', { infoIndex, field, value })
  const newInfoSections = [...infoSectionsData.value]
  if (newInfoSections[infoIndex]) {
    newInfoSections[infoIndex] = { ...newInfoSections[infoIndex], [field]: value }
    console.log('PdfInfoSection: emitting update:modelValue', newInfoSections)
    emit('update:modelValue', newInfoSections)
  }
}

// 更新 info item 字段
const updateInfoItemField = (infoIndex: number, itemIndex: number, field: keyof BaseItem, value: any) => {
  const newInfoSections = [...infoSectionsData.value]
  if (newInfoSections[infoIndex] && newInfoSections[infoIndex].items) {
    const newItems = [...newInfoSections[infoIndex].items]
    if (newItems[itemIndex]) {
      newItems[itemIndex] = { ...newItems[itemIndex], [field]: value }
      newInfoSections[infoIndex] = { ...newInfoSections[infoIndex], items: newItems }
      emit('update:modelValue', newInfoSections)
    }
  }
}

// 添加新的 info section
const addInfoSection = () => {
  const newInfoSection: InfoData = {
    id: generateId(),
    sectionTitle: 'Section title',
    items: [
      { id: generateId(), label: 'Label', value: 'Value' },
      { id: generateId(), label: 'Label', value: 'Value' }
    ]
  }
  
  const newInfoSections = [...infoSectionsData.value, newInfoSection]
  const newInfoIndex = newInfoSections.length - 1
  
  // 新添加的 info section 默认展开
  expandedInfoSections.value.add(newInfoIndex)
  
  emit('update:modelValue', newInfoSections)
}

// 删除 info section
const removeInfoSection = (infoIndex: number) => {
  confirmDialog.showConfirm({
    message: `Are you sure you want to delete Info Section ${infoIndex + 1}? This action cannot be undone.`,
    onConfirm: () => {
      const newInfoSections = infoSectionsData.value.filter((_, index) => index !== infoIndex)
      
      // 更新展开状态，移除被删除的 info section 索引，并调整其他索引
      const newExpandedInfoSections = new Set<number>()
      expandedInfoSections.value.forEach(index => {
        if (index < infoIndex) {
          newExpandedInfoSections.add(index)
        } else if (index > infoIndex) {
          newExpandedInfoSections.add(index - 1)
        }
      })
      expandedInfoSections.value = newExpandedInfoSections
      
      emit('update:modelValue', newInfoSections)
    }
  })
}

// 添加 info item
const addInfoItem = (infoIndex: number) => {
  const newItem: BaseItem = {
    id: generateId(),
    label: 'Label',
    value: 'Value'
  }
  
  const newInfoSections = [...infoSectionsData.value]
  if (newInfoSections[infoIndex]) {
    const newItems = [...newInfoSections[infoIndex].items, newItem]
    newInfoSections[infoIndex] = { ...newInfoSections[infoIndex], items: newItems }
    emit('update:modelValue', newInfoSections)
  }
}

// 删除 info item
const removeInfoItem = (infoIndex: number, itemIndex: number) => {
  confirmDialog.showConfirm({
    message: `Are you sure you want to delete Item ${itemIndex + 1}? This action cannot be undone.`,
    onConfirm: () => {
      const newInfoSections = [...infoSectionsData.value]
      if (newInfoSections[infoIndex] && newInfoSections[infoIndex].items) {
        const newItems = [...newInfoSections[infoIndex].items]
        newItems.splice(itemIndex, 1)
        newInfoSections[infoIndex] = { ...newInfoSections[infoIndex], items: newItems }
        emit('update:modelValue', newInfoSections)
      }
    }
  })
}

// 拖拽处理函数
const handleItemDragStart = (event: DragEvent, infoIndex: number, itemIndex: number) => {
  draggedItem.value = { infoIndex, itemIndex }
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

const handleItemDrop = (event: DragEvent, dropInfoIndex: number, dropItemIndex: number) => {
  event.preventDefault()
  
  if (draggedItem.value === null || 
      draggedItem.value.infoIndex !== dropInfoIndex || 
      draggedItem.value.itemIndex === dropItemIndex) {
    return
  }
  
  const newInfoSections = [...infoSectionsData.value]
  const infoSection = newInfoSections[dropInfoIndex]
  if (infoSection && infoSection.items) {
    const newItems = [...infoSection.items]
    const draggedItemData = newItems[draggedItem.value.itemIndex]
    
    if (!draggedItemData) {
      return
    }
    
    // 移除被拖拽的项目
    newItems.splice(draggedItem.value.itemIndex, 1)
    
    // 在目标位置插入项目
    newItems.splice(dropItemIndex, 0, draggedItemData)
    
    newInfoSections[dropInfoIndex] = { ...infoSection, items: newItems }
    emit('update:modelValue', newInfoSections)
  }
}

const handleItemDragEnd = () => {
  draggedItem.value = null
}

// 监听全局 collapse-all-sections 事件
const handleCollapseAll = () => {
  expandedInfoSections.value.clear()
}

onMounted(() => {
  window.addEventListener('collapse-all-sections', handleCollapseAll)
})

onUnmounted(() => {
  window.removeEventListener('collapse-all-sections', handleCollapseAll)
})
</script>

<style scoped>
/* Info Section Configuration Styles */
.info-item-container {
  background-color: #f9fafb; /* gray-50 */
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e5e7eb; /* gray-200 */
  transition: all 0.3s ease-in-out;
}

.info-item-container:hover {
  background-color: #f3f4f6; /* gray-100 */
  border-color: #d1d5db; /* gray-300 */
}

/* Highlight effect for clicked items */
.info-item-container.config-item-highlight {
  background-color: rgba(255, 193, 7, 0.16) !important;
  border: 2px solid rgba(255, 193, 7, 0.56) !important;
  border-radius: 8px !important;
  box-shadow: 0 0 8px rgba(255, 193, 7, 0.16) !important;
}
</style>