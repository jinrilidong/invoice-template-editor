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
          <!-- Main content table -->
          <table
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
                    :header="props.templateData.header"
                    :style-config="props.styleConfig"
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
                  <InfoSection :info="infoSection" :style-config="props.styleConfig" />
                  <!-- Section spacer after each info section -->
                  <table
                    :style="{ width: '100%', height: (props.styleConfig?.sectionGap || 10) + 'px' }"
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
                  <HInfoSection :h-info="hInfoSection" :style-config="props.styleConfig" />
                  <!-- Section spacer after each h-info section -->
                  <table
                    :style="{ width: '100%', height: (props.styleConfig?.sectionGap || 10) + 'px' }"
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
                  <TableSection :table="tableSection" :style-config="props.styleConfig" />
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

            <!-- Summary Section (if tables exist) -->
            <template
              v-if="
                props.sectionStates.table &&
                props.templateData.tables &&
                props.templateData.tables.length > 0
              "
            >
              <tr>
                <td
                  class="section-clickable"
                  style="padding: 0; vertical-align: top"
                  @click.stop="handleSectionClick('summary-section')"
                >
                  <SummarySection
                    :tables="props.templateData.tables"
                    :style-config="props.styleConfig"
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
                    :description="descriptionSection"
                    :style-config="props.styleConfig"
                  />
                  <!-- Section spacer after each description section -->
                  <table
                    :style="{ width: '100%', height: (props.styleConfig?.sectionGap || 10) + 'px' }"
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
                  <ItemSection :item="itemSection" :style-config="props.styleConfig" />
                  <!-- Section spacer after each item section -->
                  <table
                    :style="{ width: '100%', height: (props.styleConfig?.sectionGap || 10) + 'px' }"
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

            <!-- Footer Section -->
            <template v-if="props.sectionStates.footer && props.templateData.footer">
              <tr>
                <td
                  class="section-clickable"
                  style="padding: 0; vertical-align: top"
                  @click.stop="handleSectionClick('footer-section')"
                >
                  <FooterSection
                    :footer="props.templateData.footer"
                    :style-config="props.styleConfig"
                    :current-page="1"
                    :total-pages="1"
                  />
                </td>
              </tr>
            </template>
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

interface StyleConfig {
  baseFontSize: number
  sectionGap: number
  sameTypeSectionGap: number
  summaryGap: number
  // 为与各子组件类型匹配，补充必要配置段
  header: {
    titleColor: string
    titleSize: number
    titleWeight: string
    descriptionColor: string
    descriptionSize: number
    descriptionWeight: string
  }
  info: {
    sectionTitleColor: string
    sectionTitleWeight: string
    labelColor: string
    labelWeight: string
    valueColor: string
    valueWeight: string
    itemGap: number
    itemsPerRow: number
    itemsSpacing: number
    labelValueGap: number
  }
  table: {
    sectionTitleColor: string
    // 子组件 TableSection 需要的字段
    sectionTitleWeight: string
    subsectionTitleColor: string
    subsectionTitleWeight: string
    headerColor: string
    columnNameWeight: string
    rowTextColor: string
    borderColor: string
    rowHeight: number
    columnsPadding: number
  }
  // 子组件 SummarySection 需要的配置
  summary?: {
    labelText?: string
    labelColor: string
    labelWeight: string
    contentColor: string
    contentWeight: string
    labelSize: number
    contentSize: number
    labelContentGap?: number
  }
  description: {
    labelColor: string
    labelWeight: string
    textColor: string
    textWeight: string
    textSize: number
    lineHeight: number
  }
  item: {
    sectionTitleColor: string
    sectionTitleWeight: string
    labelColor: string
    labelWeight: string
    valueColor: string
    valueWeight: string
    itemGap: number
    itemsPerRow: number
    itemsSpacing: number
    labelValueGap: number
  }
  footer: {
    textColor: string
    textSize: number
    textWeight: string
  }
  footerInfo: {
    textColor: string
    textSize: number
    textWeight: string
  }
  footerName: {
    textColor: string
    textSize: number
    textWeight: string
  }
  hInfo: {
    sectionTitleColor: string
    sectionTitleWeight: string
    labelColor: string
    labelWeight: string
    valueColor: string
    valueWeight: string
    labelWidth: number
    labelValueGap: number
    itemGap: number
    columnsPadding: number
  }
}

// ✅ 修复：正确解构 props
const props = defineProps<{
  sectionStates: SectionStates
  templateData: TemplateData
  styleConfig: StyleConfig
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
