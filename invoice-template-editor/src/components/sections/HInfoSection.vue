<template>
  <table
    style="width: 100%; border-collapse: collapse; table-layout: fixed"
    cellpadding="0"
    cellspacing="0"
  >
    <!-- Section Title -->
    <tr v-if="hInfo.sectionTitle || isEditMode">
      <td
        :style="{
          fontSize: (styleConfig?.hInfo?.sectionTitleSize || 7) + 'px',
          fontWeight: getFontWeight(styleConfig?.hInfo?.sectionTitleWeight || 'semibold'),
          color: styleConfig?.hInfo?.sectionTitleColor || '#6b7280',
          lineHeight: (styleConfig?.hInfo?.sectionTitleSize || 7) + 2 + 'px',
          padding: '0 0 2px 0',
        }"
      >
        <template v-if="!isEditMode">{{ hInfo.sectionTitle }}</template>
        <template v-else>
          <EditableText v-model="hInfo.sectionTitle" :editing="true" />
        </template>
      </td>
    </tr>

    <!-- Columns -->
    <tr v-if="hInfo.columns && hInfo.columns.length > 0">
      <td style="padding: 0">
        <table
          style="width: 100%; border-collapse: collapse; table-layout: fixed"
          cellpadding="0"
          cellspacing="0"
        >
          <tr>
            <td
              v-for="(column, columnIndex) in hInfo.columns"
              :key="'column-' + columnIndex"
              :style="{
                width: getColumnWidthPercent(columnIndex) + '%',
                paddingLeft:
                  columnIndex === 0 ? '0' : (styleConfig?.hInfo?.columnsPadding ?? 8) / 2 + 'px',
                paddingRight:
                  columnIndex === hInfo.columns.length - 1
                    ? '0'
                    : (styleConfig?.hInfo?.columnsPadding ?? 8) / 2 + 'px',
                verticalAlign: 'top',
              }"
            >
              <HInfoColumn
                :column="column"
                :style-config="styleConfig"
                :label-value-layout="hInfo.labelValueLayout || 'vertical'"
                :is-edit-mode="isEditMode"
              />
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import HInfoColumn from './HInfoColumn.vue'
import EditableText from '../EditableText.vue'

interface HInfoItem {
  id: string
  label: string
  value: string
}

interface HInfoColumn {
  id: string
  items: HInfoItem[]
  width?: number
}

interface HInfo {
  id?: string
  sectionTitle?: string
  labelValueLayout?: 'horizontal' | 'vertical'
  columns?: HInfoColumn[]
}

interface StyleConfig {
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

const props = defineProps<{
  hInfo: HInfo
  styleConfig: StyleConfig
  isEditMode?: boolean
}>()

// 列宽按索引计算

// 根据索引返回列宽百分比
const getColumnWidthPercent = (index: number): string => {
  const columns = (props.hInfo.columns || []) as HInfoColumn[]
  const columnCount = columns.length || 1
  const hasCustom = columns.some((c) => typeof c.width === 'number' && c.width! > 0)
  if (!hasCustom) return (100 / columnCount).toFixed(4)
  const weights = columns.map((c) => (typeof c.width === 'number' && c.width! > 0 ? c.width! : 0))
  const total = weights.reduce((a, b) => a + b, 0) || 1
  const w = typeof weights[index] === 'number' ? (weights[index] as number) : 0
  const pct = (w / total) * 100
  return (isFinite(pct) ? pct : 0).toFixed(4)
}

// 字体权重转换函数
const getFontWeight = (weight: string): string => {
  switch (weight) {
    case 'bold':
      return '700'
    case 'semibold':
      return '600'
    case 'medium':
      return '500'
    case 'normal':
    default:
      return '400'
  }
}
</script>

<style scoped>
/* 确保所有样式都是OpenHTMLtoPDF兼容的 */
</style>
