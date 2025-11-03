<template>
  <div
    class="h-full bg-white rounded-xl shadow-lg border border-[#d3ddde] flex flex-col"
    @click="handleBackgroundClick"
  >
    <!-- Preview Header -->
    <div class="bg-gray-100 border-b border-[#d3ddde] flex-shrink-0 p-2 min-h-[3rem] w-full">
      <div class="flex items-center justify-between w-full">
        <h2 class="text-lg font-semibold text-primary">PDF Template Preview
          <span v-if="!isExportMode && props.isEditMode" class="ml-2 font-semibold" style="color: #FF761F;">Text Edit Mode</span>
        </h2>
        <div class="flex items-center gap-2">
          <!-- Zoom Controls -->
          <div class="flex items-center gap-2">
            <IconButton @click="zoomOut" title="Zoom Out">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 12H4"
                ></path>
              </svg>
            </IconButton>
            <span class="text-sm text-primary min-w-[3rem] text-center"
              >{{ Math.round(zoomLevel * 100) }}%</span
            >
            <IconButton @click="zoomIn" title="Zoom In">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </IconButton>
          </div>
          <div class="h-6 w-px bg-primary/20"></div>
          <TextButton @click="fitToWidth"> Fit to Width </TextButton>
          <div class="h-6 w-px bg-primary/20"></div>
          <div class="text-sm text-primary/90">U.S. Letter (612×792)</div>
        </div>
      </div>
    </div>

    <!-- PDF Preview Content - Fixed height, internal scroll -->
    <div ref="containerRef" class="flex-1 overflow-y-auto overflow-x-hidden bg-white">
      <div v-if="!isExportMode" class="w-full flex justify-center" style="padding-top: 20px">
        <!-- PDF Pages Container -->
        <div
          class="pdf-pages-container"
          :style="{
            transform: 'scale(' + zoomLevel + ')',
            'transform-origin': 'top center',
          }"
        >
          <!-- Current PDF Page -->
          <div
            class="pdf-container shadow-xl border border-[#d3ddde] rounded-lg"
            :style="{
              width: PAGE_WIDTH + 'px',
              height: PAGE_HEIGHT + 'px',
              marginBottom: (zoomLevel - 1) * PAGE_HEIGHT + 'px',
              padding: '0',
              position: 'relative',
              overflow: 'hidden',
            }"
          >
            <!-- 使用新的兼容渲染器 -->
            <PdfCompatibleRenderer
              :section-states="sectionStates"
              :template-data="templateData"
              :style-config="styleConfig"
              :is-edit-mode="!!props.isEditMode"
              @section-select="handleSectionClick"
            />
          </div>
        </div>
      </div>

      <!-- Export Mode - 用于HTML导出 -->
      <div
        v-if="isExportMode"
        data-export-root="pagination"
        class="w-full flex justify-center"
        style="padding-top: 20px"
      >
        <div
          class="pdf-pages-container"
          :style="{
            transform: 'scale(' + zoomLevel + ')',
            'transform-origin': 'top center',
          }"
        >
          <!-- Export PDF Page -->
          <div
            class="pdf-container shadow-xl border border-[#d3ddde] rounded-lg"
            :style="{
              width: PAGE_WIDTH + 'px',
              height: PAGE_HEIGHT + 'px',
              marginBottom: (zoomLevel - 1) * PAGE_HEIGHT + 'px',
              padding: '0',
              position: 'relative',
              overflow: 'hidden',
            }"
          >
            <!-- 使用新的兼容渲染器 -->
            <PdfCompatibleRenderer
              :section-states="sectionStates"
              :template-data="templateData"
              :style-config="styleConfig"
              :is-edit-mode="false"
              @section-select="handleSectionClick"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import PdfCompatibleRenderer from './PdfCompatibleRenderer.vue'
import IconButton from './IconButton.vue'
import TextButton from './TextButton.vue'
import type { TemplateData } from '../types/section'
import type { StyleConfig } from '../types/style'

// PDF页面尺寸常量
const PAGE_WIDTH = 612
const PAGE_HEIGHT = 792

interface SectionStates {
  header: boolean
  info: boolean
  hInfo: boolean
  table: boolean
  description: boolean
  item: boolean
  footer: boolean
}

// 使用共享类型定义

const props = defineProps<{
  sectionStates: SectionStates
  templateData: TemplateData
  styleConfig: StyleConfig
  exportMode?: boolean
  selectedSection?: string | null
  isEditMode?: boolean
}>()

const emit = defineEmits<{
  'section-select': [sectionType: string | null]
}>()

// 缩放级别
const zoomLevel = ref(1.2)
const containerRef = ref<HTMLElement>()

// 导出模式
const isExportMode = computed(() => props.exportMode || false)

// 缩放控制
const zoomIn = () => {
  zoomLevel.value = Math.min(zoomLevel.value + 0.1, 3.0)
}

const zoomOut = () => {
  zoomLevel.value = Math.max(zoomLevel.value - 0.1, 0.5)
}

const fitToWidth = () => {
  if (containerRef.value) {
    const containerWidth = containerRef.value.clientWidth - 40 // 减去padding
    const scale = containerWidth / PAGE_WIDTH
    zoomLevel.value = Math.max(0.5, Math.min(scale, 3.0))
  }
}

// 背景点击处理
const handleBackgroundClick = () => {
  emit('section-select', null)
}

// 处理section点击
const handleSectionClick = (sectionType: string | null) => {
  emit('section-select', sectionType)
}

// 监听窗口大小变化
const handleResize = () => {
  if (zoomLevel.value >= 1.7) {
    fitToWidth()
  }
}

onMounted(() => {
  setTimeout(() => {
    fitToWidth()
  }, 100)
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.pdf-container {
  font-family: Arial, sans-serif;
  box-sizing: border-box;
  transition: transform 0.2s ease-in-out;
}

.pdf-content {
  line-height: 1.2;
}

/* 确保表格列宽适应 */
.table-column-header,
.table-cell {
  min-width: 0;
  word-wrap: break-word;
}

/* 确保文本对齐正确 */
.text-right {
  text-align: right;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

/* 强制左对齐以覆盖任何继承的居中对齐 */
.force-text-left {
  text-align: left !important;
}

/* 精确的颜色值 */
.text-color-5b7282 {
  color: #5b7282;
}

.text-color-919191 {
  color: #919191;
}

.border-color-d2d2d2 {
  border-color: #d2d2d2;
}

/* 精确的字体权重 */
.font-semibold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
}

.font-normal {
  font-weight: 400;
}

/* 精确的文本对齐 */
.text-right {
  text-align: right;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

/* 精确的溢出处理 */
.overflow-hidden {
  overflow: hidden;
}

.overflow-clip {
  overflow: clip;
}

/* 精确的定位 */
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

/* 精确的变换 */
.-translate-y-1\/2 {
  transform: translateY(-50%);
}

/* 确保PDF内容使用表格布局 */
.pdf-content {
  display: table;
  width: 100%;
  min-height: 100%;
}

/* 表格行高度13px */
.h-3\.25 {
  height: 0.8125rem; /* 13px */
}

/* 表格行一致性 - 确保行中所有单元格具有相同高度 */
.table-row {
  display: table-row;
  min-height: 13px;
}

.table-cell {
  display: table-cell;
  min-height: 13px;
  vertical-align: top;
}
</style>
