<template>
  <table
    style="width: 100%; border-collapse: collapse; table-layout: fixed"
    cellpadding="0"
    cellspacing="0"
  >
    <!-- Section Title -->
    <tr v-if="table.sectionTitle">
      <td
        :style="{
          fontSize: '7px',
          fontWeight: getFontWeight(styleConfig?.table?.sectionTitleWeight || 'bold'),
          color: styleConfig?.table?.sectionTitleColor || '#6b7280',
          lineHeight: '9px',
          padding: '0 0 2px 0',
        }"
      >
        {{ table.sectionTitle }}
      </td>
    </tr>

    <!-- Subsection Title -->
    <tr v-if="table.subsectionTitle">
      <td
        :style="{
          fontSize: '7px',
          fontWeight: getFontWeight(styleConfig?.table?.subsectionTitleWeight || 'bold'),
          color: styleConfig?.table?.subsectionTitleColor || '#000000',
          lineHeight: '9px',
          padding: '0 0 2px 0',
        }"
      >
        {{ table.subsectionTitle }}
      </td>
    </tr>

    <!-- Data Table -->
    <tr v-if="table.columns && table.columns.length > 0">
      <td style="padding: 0">
        <DataTable :table="table" :style-config="styleConfig" :is-edit-mode="isEditMode" />
      </td>
    </tr>

    <!-- Subtotal -->
    <tr v-if="table.showSubtotal && table.total !== null && table.total !== undefined">
      <td style="padding: 0">
        <SubtotalTable :table="table" :style-config="styleConfig" />
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import DataTable from './DataTable.vue'
import SubtotalTable from './SubtotalTable.vue'

interface TableColumn {
  id: string
  name: string
  type: string
  alignment: 'left' | 'right'
  width?: number
}

interface TableRow {
  id: string
  data: Record<string, string>
  total: number
}

interface Table {
  id?: string
  sectionTitle?: string
  subsectionTitle?: string
  columns: TableColumn[]
  rows: TableRow[]
  total: number
  rowsNumber?: number
  showSubtotal?: boolean
}

import type { StyleConfig } from '@/types/style'

defineProps<{
  table: Table
  styleConfig: StyleConfig
  isEditMode?: boolean
}>()

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
