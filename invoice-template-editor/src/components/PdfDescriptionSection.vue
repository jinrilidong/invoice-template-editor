<template>
  <div class="w-full mb-0">
    <!-- Multiple Description Sections -->
    <div
      v-for="(descriptionSection, descIndex) in descriptionSectionsData"
      :key="descriptionSection.id"
      :id="`config-description-${descIndex}-section`"
      class="mb-8"
    >
      <!-- Divider between sections (except for the first one) - 已移除，由Configuration Panel统一管理 -->

      <!-- Section Header with Title and Actions -->
      <div
        class="flex items-center justify-between mb-4"
        :style="{ marginTop: descIndex > 0 ? '20px' : '20px' }"
      >
        <div class="flex items-center gap-2">
          <!-- Expand/Collapse Button -->
          <button
            @click="toggleDescriptionExpanded(descIndex)"
            class="flex items-center justify-center w-6 h-6 rounded hover:bg-gray-100 transition-colors"
            :title="isDescriptionExpanded(descIndex) ? 'Collapse section' : 'Expand section'"
          >
            <svg
              class="w-4 h-4 text-gray-600 transition-transform"
              :class="{ 'rotate-180': isDescriptionExpanded(descIndex) }"
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
            Description Section {{ descIndex + 1 }}
          </h3>
        </div>

        <div class="flex items-center gap-2">
          <TextButton @click="addDescriptionSection" variant="default" size="sm">
            Add Description Section
          </TextButton>
          <TextButton
            v-if="descriptionSectionsData.length > 1"
            @click="removeDescriptionSection(descIndex)"
            variant="default"
            size="sm"
            class="text-red-600 hover:text-red-800"
            title="Delete description section"
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
      <div v-if="isDescriptionExpanded(descIndex)" class="space-y-4">
        <!-- Title Configuration -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Section Title</label>
          <input
            :value="descriptionSection.sectionTitle"
            @input="
              updateDescriptionField(
                descIndex,
                'sectionTitle',
                ($event.target as HTMLInputElement).value,
              )
            "
            placeholder="Enter section title..."
            class="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <!-- Content Configuration -->
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Description Content</label>
          <textarea
            :value="descriptionSection.content"
            @input="
              updateDescriptionField(
                descIndex,
                'content',
                ($event.target as HTMLTextAreaElement).value,
              )
            "
            placeholder="Enter description content..."
            rows="6"
            class="w-full px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 resize-none"
          ></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, inject } from 'vue'
import TextButton from './TextButton.vue'
import { generateId } from '../composables/useSectionData'
import type { DescriptionData } from '../types/section'

// 修改 props 和 emits 以支持多个 description section
interface DescriptionSectionsProps {
  modelValue?: DescriptionData[]
}

interface DescriptionSectionsEmits {
  (e: 'update:modelValue', value: DescriptionData[]): void
}

const props = defineProps<DescriptionSectionsProps>()

const emit = defineEmits<DescriptionSectionsEmits>()

// 注入确认对话框
const confirmDialog = inject('confirmDialog') as any

// Description sections 展开状态管理
const expandedDescriptionSections = ref<Set<number>>(new Set([0])) // 默认第一个 description section 展开

// 检查 description section 是否展开
const isDescriptionExpanded = (descIndex: number) => {
  return expandedDescriptionSections.value.has(descIndex)
}

// 切换 description section 展开状态
const toggleDescriptionExpanded = (descIndex: number) => {
  if (expandedDescriptionSections.value.has(descIndex)) {
    expandedDescriptionSections.value.delete(descIndex)
  } else {
    expandedDescriptionSections.value.add(descIndex)
  }
}

// 监听全局事件来展开特定的 description section
const handleExpandDescriptionSection = (event: CustomEvent) => {
  const { descIndex } = event.detail
  if (typeof descIndex === 'number') {
    expandedDescriptionSections.value.add(descIndex)
  }
}

// 监听全局事件
onMounted(() => {
  window.addEventListener(
    'expand-description-section',
    handleExpandDescriptionSection as EventListener,
  )
})

onUnmounted(() => {
  window.removeEventListener(
    'expand-description-section',
    handleExpandDescriptionSection as EventListener,
  )
})

// 默认数据
const defaultDescriptionData: DescriptionData = {
  id: generateId(),
  sectionTitle: 'Description Section',
  content:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
}

// 使用computed管理数据，避免循环更新
const descriptionSectionsData = computed({
  get: () => props.modelValue || [defaultDescriptionData],
  set: (value) => emit('update:modelValue', value),
})

// 更新 description section 字段
const updateDescriptionField = (descIndex: number, field: keyof DescriptionData, value: any) => {
  console.log('PdfDescriptionSection: updateDescriptionField called', { descIndex, field, value })
  const newDescriptionSections = [...descriptionSectionsData.value]
  if (newDescriptionSections[descIndex]) {
    newDescriptionSections[descIndex] = { ...newDescriptionSections[descIndex], [field]: value }
    console.log('PdfDescriptionSection: emitting update:modelValue', newDescriptionSections)
    emit('update:modelValue', newDescriptionSections)
  }
}

// 添加新的 description section
const addDescriptionSection = () => {
  const newDescriptionSection: DescriptionData = {
    id: generateId(),
    sectionTitle: 'Description Section',
    content:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  }

  const newDescriptionSections = [...descriptionSectionsData.value, newDescriptionSection]
  const newDescIndex = newDescriptionSections.length - 1

  // 新添加的 description section 默认展开
  expandedDescriptionSections.value.add(newDescIndex)

  emit('update:modelValue', newDescriptionSections)
}

// 删除 description section
const removeDescriptionSection = (descIndex: number) => {
  confirmDialog.showConfirm({
    message: `Are you sure you want to delete Description Section ${descIndex + 1}? This action cannot be undone.`,
    onConfirm: () => {
      const newDescriptionSections = descriptionSectionsData.value.filter(
        (_, index) => index !== descIndex,
      )

      // 更新展开状态，移除被删除的 description section 索引，并调整其他索引
      const newExpandedDescriptionSections = new Set<number>()
      expandedDescriptionSections.value.forEach((index) => {
        if (index < descIndex) {
          newExpandedDescriptionSections.add(index)
        } else if (index > descIndex) {
          newExpandedDescriptionSections.add(index - 1)
        }
      })
      expandedDescriptionSections.value = newExpandedDescriptionSections

      emit('update:modelValue', newDescriptionSections)
    },
  })
}

// 监听全局 collapse-all-sections 事件
const handleCollapseAll = () => {
  expandedDescriptionSections.value.clear()
}

onMounted(() => {
  window.addEventListener('collapse-all-sections', handleCollapseAll)
})

onUnmounted(() => {
  window.removeEventListener('collapse-all-sections', handleCollapseAll)
})
</script>
