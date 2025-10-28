<template>
  <table
    style="width: 100%; border-collapse: collapse; table-layout: fixed"
    cellpadding="0"
    cellspacing="0"
  >
    <!-- Section Title -->
    <tr v-if="hInfo.sectionTitle">
      <td
        :style="{
          fontSize: '7px',
          fontWeight: getFontWeight(styleConfig?.hInfo?.sectionTitleWeight || 'semibold'),
          color: styleConfig?.hInfo?.sectionTitleColor || '#6b7280',
          lineHeight: '9px',
          padding: '0 0 2px 0',
        }"
      >
        {{ hInfo.sectionTitle }}
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
                width: columnWidth + '%',
                padding: '0 ' + (styleConfig?.hInfo?.columnsPadding ?? 8) + 'px',
                verticalAlign: 'top',
              }"
            >
              <HInfoColumn
                :column="column"
                :style-config="styleConfig"
                :label-value-layout="hInfo.labelValueLayout"
              />
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import HInfoColumn from './HInfoColumn.vue'

interface HInfoItem {
  id: string
  label: string
  value: string
}

interface HInfoColumn {
  id: string
  items: HInfoItem[]
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
}>()

// 计算每列的宽度
const columnWidth = computed(() => {
  const columnCount = props.hInfo.columns?.length || 1
  return Math.floor(100 / columnCount)
})

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
