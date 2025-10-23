<template>
  <div class="bg-white rounded-lg border border-[#d3ddde] h-full flex flex-col w-full min-w-0">
    <!-- Configuration Header -->
    <div class="bg-gray-100 border-b border-[#d3ddde] flex-shrink-0 p-4 min-h-[3rem] w-full">
      <div class="flex items-center justify-between w-full">
        <h2 class="text-lg font-semibold text-[#0e171f]">Configuration Panel</h2>
        <div class="flex items-center gap-2">
          <TextButton 
            @click="collapseAllSections"
            variant="default" 
            size="sm"
            class="text-gray-600 hover:text-gray-800"
          >
            Collapse All
          </TextButton>
        </div>
      </div>
    </div>

    <!-- Configuration Content - Scrollable Area -->
    <div class="flex-1 overflow-y-auto overflow-x-hidden w-full min-w-0 p-4">
      <!-- Section Toggle -->
      <div class="border-b border-[#d3ddde] pb-5">
        <SectionTitle title="Section Control" />
        <div class="space-y-1">
          <ToggleItem
            v-for="(enabled, section) in sectionStates"
            :key="section"
            :id="`toggle-${section}`"
            :label="getSectionName(section)"
            :model-value="enabled"
            @update:model-value="toggleSection(section as keyof SectionStates)"
          />
        </div>
      </div>

      <!-- Component Configuration Area -->
      <div>
        <template v-for="(section, index) in visibleSections" :key="section.key">
          <!-- Section Content -->
          <div :class="section.class" :id="section.id || undefined">
            <component 
              :is="section.component"
              :model-value="section.modelValue as any"
              @update:model-value="(newData: any) => updateTemplateData(section.dataKey, newData)"
            />
          </div>
          
          <!-- 分割线：只在不同类型section之间显示 -->
          <div 
            v-if="index < visibleSections.length - 1 && section.type !== visibleSections[index + 1]?.type" 
            class="border-t border-[#d3ddde] my-4"
          ></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import PdfHeaderSection from './PdfHeaderSection.vue'
import PdfInfoSection from './PdfInfoSection.vue'
import PdfTableSection from './PdfTableSection.vue'
import PdfDescriptionSection from './PdfDescriptionSection.vue'
import PdfItemSection from './PdfItemSection.vue'
import PdfHInfoSection from './PdfHInfoSection.vue'
import PdfFooterSection from './PdfFooterSection.vue'
import SectionTitle from './SectionTitle.vue'
import ToggleItem from './ToggleItem.vue'
import TextButton from './TextButton.vue'
import type { SectionStates, TemplateData } from '../types/section'

const props = defineProps<{
  sectionStates: SectionStates
  templateData: TemplateData
}>()

const emit = defineEmits<{
  'update:sectionStates': [value: SectionStates]
  'update:templateData': [value: TemplateData]
}>()

const getSectionName = (section: string) => {
  const names: Record<string, string> = {
    header: 'Header Section',
    info: 'Info Section',
    hInfo: 'H-Info Section',
    table: 'Table Section',
    description: 'Description Section',
    item: 'Item Section',
    footer: 'Footer Section'
  }
  return names[section] || section
}

const toggleSection = (section: keyof SectionStates) => {
  const newStates = { ...props.sectionStates }
  newStates[section] = !newStates[section]
  emit('update:sectionStates', newStates)
}

const collapseAllSections = () => {
  // 触发所有 section 组件的 collapse 事件
  // 由于每个 section 组件都有独立的展开状态，我们需要通过事件总线或全局状态来管理
  // 这里我们通过 window 事件来通知所有 section 组件
  window.dispatchEvent(new CustomEvent('collapse-all-sections'))
}

// 计算可见的sections，用于动态渲染和分割线
const visibleSections = computed(() => {
  const sections = []
  
  // Header Section
  if (props.sectionStates.header) {
    sections.push({
      key: 'header',
      type: 'header',
      component: PdfHeaderSection,
      modelValue: props.templateData.header,
      dataKey: 'header',
      class: 'transition-all duration-300',
      id: null
    })
  }
  
  // Info Section
  if (props.sectionStates.info) {
    sections.push({
      key: 'info',
      type: 'info',
      component: PdfInfoSection,
      modelValue: props.templateData.info,
      dataKey: 'info',
      class: 'transition-all duration-300',
      id: 'config-info-section'
    })
  }
  
  // H-Info Section (放在 Info Section 之后)
  if (props.sectionStates.hInfo) {
    sections.push({
      key: 'hInfo',
      type: 'hInfo',
      component: PdfHInfoSection,
      modelValue: props.templateData.hInfo,
      dataKey: 'hInfo',
      class: 'transition-all duration-300',
      id: 'config-h-info-section'
    })
  }
  
  // Table Section
  if (props.sectionStates.table) {
    sections.push({
      key: 'table',
      type: 'table',
      component: PdfTableSection,
      modelValue: props.templateData.tables,
      dataKey: 'tables',
      class: 'transition-all duration-300',
      id: 'config-table-section'
    })
  }
  
  // Description Section
  if (props.sectionStates.description) {
    sections.push({
      key: 'description',
      type: 'description',
      component: PdfDescriptionSection,
      modelValue: props.templateData.description,
      dataKey: 'description',
      class: 'transition-all duration-300',
      id: null
    })
  }
  
  // Item Section
  if (props.sectionStates.item) {
    sections.push({
      key: 'item',
      type: 'item',
      component: PdfItemSection,
      modelValue: props.templateData.item,
      dataKey: 'item',
      class: 'transition-all duration-300',
      id: 'config-item-section'
    })
  }
  
  // Footer Section
  if (props.sectionStates.footer) {
    sections.push({
      key: 'footer',
      type: 'footer',
      component: PdfFooterSection,
      modelValue: props.templateData.footer,
      dataKey: 'footer',
      class: 'transition-all duration-300',
      id: null
    })
  }
  
  return sections
})

const updateTemplateData = (key: string, newData: any) => {
  console.log('PdfConfigPanel: updateTemplateData called', { key, newData })
  const newData_ = { ...props.templateData }
  newData_[key as keyof TemplateData] = newData
  console.log('PdfConfigPanel: emitting update:templateData', newData_)
  emit('update:templateData', newData_)
}
</script>

<style scoped>
/* Configuration Panel Highlight Effects - Yellow Theme */
.config-section-highlight {
  background-color: rgba(255, 193, 7, 0.08) !important;
}

.config-item-highlight {
  background-color: rgba(255, 193, 7, 0.16) !important;
  border: 2px solid rgba(255, 193, 7, 0.56) !important;
  border-radius: 8px !important;
  box-shadow: 0 0 8px rgba(255, 193, 7, 0.16) !important;
  transition: all 0.3s ease-in-out !important;
}
</style>