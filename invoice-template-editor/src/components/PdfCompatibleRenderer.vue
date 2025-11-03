<template>
  <div
    class="pdf-compatible-renderer"
    :style="{
      width: PAGE_WIDTH + 'px',
      height: PAGE_HEIGHT + 'px',
      fontFamily: 'Arial, sans-serif',
      fontSize: (props.styleConfig?.baseFontSize || 7) + 'px',
      color: '#000000',
      margin: '0',
      padding: '0',
      boxSizing: 'border-box',
    }"
    @click="handleBackgroundClick"
  >
    <!-- PDF Content Container using table layout -->
    <table
      style="width: 100%; height: 100%; border-collapse: collapse; table-layout: fixed"
      cellpadding="0"
      cellspacing="0"
    >
      <tr>
        <td
          style="
            width: 100%;
            height: 100%;
            padding: 24px;
            vertical-align: top;
            box-sizing: border-box;
          "
        >
          <!-- Fixed content area (723px) -->
          <div :style="{ width: '100%', height: CONTENT_HEIGHT + 'px', position: 'relative' }">
            <table
              ref="contentInnerRef"
              style="width: 100%; border-collapse: collapse; table-layout: fixed"
              cellpadding="0"
              cellspacing="0"
            >
              <!-- Header Section -->
              <template v-if="props.sectionStates.header && props.templateData.header">
                <tr>
                  <td
                    class="section-clickable"
                    style="padding: 0; vertical-align: top"
                    @click.stop="handleSectionClick('header-section')"
                  >
                    <HeaderSection
                      :header="normalizedHeader"
                      :style-config="props.styleConfig as any"
                      :is-edit-mode="!!props.isEditMode"
                    />
                  </td>
                </tr>
                <!-- Section Spacer -->
                <tr>
                  <td
                    :style="{ height: (props.styleConfig?.sectionGap || 10) + 'px', padding: 0 }"
                  ></td>
                </tr>
              </template>

              <!-- Info Sections -->
              <template v-if="props.sectionStates.info">
                <tr v-for="(infoSection, index) in props.templateData.info" :key="'info-' + index">
                  <td
                    class="section-clickable"
                    style="padding: 0; vertical-align: top"
                    @click.stop="handleSectionClick('info-section')"
                  >
                    <InfoSection
                      :info="infoSection"
                      :style-config="props.styleConfig as any"
                      :is-edit-mode="!!props.isEditMode"
                    />
                    <!-- Section spacer after each info section -->
                    <table
                      :style="{
                        width: '100%',
                        height: (props.styleConfig?.sectionGap || 10) + 'px',
                      }"
                      cellpadding="0"
                      cellspacing="0"
                    >
                      <tr>
                        <td></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </template>

              <!-- H-Info Sections -->
              <template v-if="props.sectionStates.hInfo">
                <tr
                  v-for="(hInfoSection, index) in props.templateData.hInfo"
                  :key="'h-info-' + index"
                >
                  <td
                    class="section-clickable"
                    style="padding: 0; vertical-align: top"
                    @click.stop="handleSectionClick('h-info-section')"
                  >
                    <HInfoSection
                      :h-info="hInfoSection"
                      :style-config="props.styleConfig as any"
                      :is-edit-mode="!!props.isEditMode"
                    />
                    <!-- Section spacer after each h-info section -->
                    <table
                      :style="{
                        width: '100%',
                        height: (props.styleConfig?.sectionGap || 10) + 'px',
                      }"
                      cellpadding="0"
                      cellspacing="0"
                    >
                      <tr>
                        <td></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </template>

              <!-- Table Sections -->
              <template v-if="props.sectionStates.table">
                <tr
                  v-for="(tableSection, index) in props.templateData.tables"
                  :key="'table-' + index"
                >
                  <td
                    class="section-clickable"
                    style="padding: 0; vertical-align: top"
                    @click.stop="handleSectionClick(`table-section-${index}`)"
                  >
                    <TableSection
                      :table="tableSection"
                      :style-config="props.styleConfig as any"
                      :is-edit-mode="!!props.isEditMode"
                    />
                    <!-- Section spacer after each table section -->
                    <table
                      :style="{
                        width: '100%',
                        height:
                          (props.styleConfig?.sameTypeSectionGap ??
                            props.styleConfig?.sectionGap ??
                            10) + 'px',
                      }"
                      cellpadding="0"
                      cellspacing="0"
                    >
                      <tr>
                        <td></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </template>

              <!-- Summary Section -->
              <template
                v-if="props.sectionStates.summary && props.templateData.summary"
              >
                <tr>
                  <td
                    class="section-clickable"
                    style="padding: 0; vertical-align: top"
                    @click.stop="handleSectionClick('summary-section')"
                  >
                    <SummarySection
                      :tables="props.templateData.tables || []"
                      :style-config="props.styleConfig as any"
                      :summary-data="props.templateData.summary"
                    />
                    <!-- Section spacer after summary section -->
                    <table
                      :style="{
                        width: '100%',
                        height:
                          (props.styleConfig?.summaryGap ?? props.styleConfig?.sectionGap ?? 10) +
                          'px',
                      }"
                      cellpadding="0"
                      cellspacing="0"
                    >
                      <tr>
                        <td></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </template>

              <!-- Description Sections -->
              <template v-if="props.sectionStates.description">
                <tr
                  v-for="(descriptionSection, index) in props.templateData.description"
                  :key="'description-' + index"
                >
                  <td
                    class="section-clickable"
                    style="padding: 0; vertical-align: top"
                    @click.stop="handleSectionClick('description-section')"
                  >
                    <DescriptionSection
                      :description="normalizeDescription(descriptionSection)"
                      :style-config="props.styleConfig as any"
                      :is-edit-mode="!!props.isEditMode"
                    />
                    <!-- Section spacer after each description section -->
                    <table
                      :style="{
                        width: '100%',
                        height: (props.styleConfig?.sectionGap || 10) + 'px',
                      }"
                      cellpadding="0"
                      cellspacing="0"
                    >
                      <tr>
                        <td></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </template>

              <!-- Item Sections -->
              <template v-if="props.sectionStates.item">
                <tr v-for="(itemSection, index) in props.templateData.item" :key="'item-' + index">
                  <td
                    class="section-clickable"
                    style="padding: 0; vertical-align: top"
                    @click.stop="handleSectionClick('item-section')"
                  >
                    <ItemSection
                      :item="itemSection"
                      :style-config="props.styleConfig as any"
                      :is-edit-mode="!!props.isEditMode"
                    />
                    <!-- Section spacer after each item section -->
                    <table
                      :style="{
                        width: '100%',
                        height: (props.styleConfig?.sectionGap || 10) + 'px',
                      }"
                      cellpadding="0"
                      cellspacing="0"
                    >
                      <tr>
                        <td></td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </template>
            </table>
            <!-- Overflow red line indicator -->
            <div
              v-if="isOverflow"
              :style="{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 0,
                height: '2px',
                background: '#ff0000',
              }"
            ></div>
          </div>

          <!-- Spacer to push footer to the bottom of pdf-container -->
          <div
            :style="{
              width: '100%',
              height: 'calc(100% - ' + CONTENT_HEIGHT + 'px - 9px)',
            }"
          ></div>

          <!-- Footer Section (fixed 9px, no extra gap with content area) -->
          <table
            v-if="props.sectionStates.footer && props.templateData.footer"
            style="width: 100%; border-collapse: collapse; table-layout: fixed"
            cellpadding="0"
            cellspacing="0"
          >
            <tr>
              <td
                class="section-clickable"
                style="padding: 0; vertical-align: top"
                @click.stop="handleSectionClick('footer-section')"
              >
                <FooterSection
                  :footer="normalizedFooter"
                  :style-config="props.styleConfig as any"
                  :current-page="1"
                  :total-pages="1"
                  :is-edit-mode="!!props.isEditMode"
                />
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </div>
</template>

<script setup lang="ts">
import HeaderSection from './sections/HeaderSection.vue'
import InfoSection from './sections/InfoSection.vue'
import HInfoSection from './sections/HInfoSection.vue'
import TableSection from './sections/TableSection.vue'
import SummarySection from './sections/SummarySection.vue'
import DescriptionSection from './sections/DescriptionSection.vue'
import ItemSection from './sections/ItemSection.vue'
import FooterSection from './sections/FooterSection.vue'
import type { TemplateData } from '../types/section'
import type { StyleConfig } from '../types/style'
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'

// PDF页面尺寸常量
const PAGE_WIDTH = 612
const PAGE_HEIGHT = 792
const CONTENT_HEIGHT = 723

interface SectionStates {
  header: boolean
  info: boolean
  hInfo: boolean
  table: boolean
  summary: boolean
  description: boolean
  item: boolean
  footer: boolean
}

// 使用共享类型定义

// ✅ 修复：正确解构 props
const props = defineProps<{
  sectionStates: SectionStates
  templateData: TemplateData
  styleConfig: StyleConfig
  isEditMode?: boolean
}>()

// ✅ 添加事件处理
const emit = defineEmits<{
  'section-select': [sectionType: string | null]
}>()

// ✅ 添加点击事件处理函数
const handleSectionClick = (sectionType: string) => {
  emit('section-select', sectionType)
}

const handleBackgroundClick = () => {
  emit('section-select', null)
}

// Overflow detection
const contentInnerRef = ref<HTMLElement | null>(null)
const isOverflow = ref(false)
let resizeObserver: ResizeObserver | null = null

const updateOverflow = () => {
  const el = contentInnerRef.value
  if (!el) {
    isOverflow.value = false
    return
  }
  isOverflow.value = el.scrollHeight > CONTENT_HEIGHT
}

onMounted(() => {
  updateOverflow()
  if (typeof window !== 'undefined' && 'ResizeObserver' in window) {
    resizeObserver = new ResizeObserver(() => updateOverflow())
    if (contentInnerRef.value) resizeObserver.observe(contentInnerRef.value)
  } else {
    if (typeof window !== 'undefined') (window as Window).addEventListener('resize', updateOverflow)
  }
})

onBeforeUnmount(() => {
  if (resizeObserver && contentInnerRef.value) resizeObserver.unobserve(contentInnerRef.value)
  resizeObserver = null
  if (typeof window !== 'undefined')
    (window as Window).removeEventListener('resize', updateOverflow)
})

// 数据规范化，确保传给子组件的必填字符串不为 undefined
const normalizedHeader = computed(() => {
  const h = props.templateData.header || {}
  return {
    title: (h as any).title || '',
    description: (h as any).description || '',
    logo: (h as any).logo || '',
    companyName: (h as any).companyName || '',
    logoSize: (h as any).logoSize || 'default',
    logoDescription: (h as any).logoDescription || '',
  }
})

const normalizeDescription = (d: any) => ({
  id: d?.id,
  sectionTitle: d?.sectionTitle || '',
  content: d?.content || '',
})

const normalizedFooter = computed(() => {
  const f = props.templateData.footer || {}
  return {
    info: (f as any).info || '',
    name: (f as any).name || '',
  }
})
</script>

<style scoped>
.pdf-compatible-renderer {
  /* 确保所有样式都是OpenHTMLtoPDF兼容的 */
  font-family: Arial, sans-serif;
  font-size: 7px;
  color: #000000;
  line-height: 1.2;
}

/* 移除所有现代CSS特性 */
* {
  box-sizing: border-box;
}

/* 确保表格布局正确 */
table {
  border-collapse: collapse;
  table-layout: fixed;
}

td {
  vertical-align: top;
}

/* ✅ 添加section点击样式 */
.section-clickable {
  cursor: pointer;
  transition: background-color 0.2s ease;
}

.section-clickable:hover {
  background-color: rgba(59, 130, 246, 0.1);
}

.section-clickable:active {
  background-color: rgba(59, 130, 246, 0.2);
}
</style>
