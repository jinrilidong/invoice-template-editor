<template>
  <table
    style="width: 100%; border-collapse: collapse; table-layout: fixed"
    cellpadding="0"
    cellspacing="0"
  >
    <tr>
      <td
        :colspan="table.columns.length"
        :style="{
          width: '100%',
          textAlign: 'right',
          padding: '2px 0',
          lineHeight: '9px',
          verticalAlign: 'top',
          marginRight: (styleConfig?.table?.subtotalOffset ?? 0) + 'px',
          paddingLeft: Math.max(0, styleConfig?.table?.subtotalOffset ?? 0) + 'px',
          paddingRight: Math.max(0, -(styleConfig?.table?.subtotalOffset ?? 0)) + 'px',
        }"
      >
        <span
          :style="{
            fontSize: (styleConfig?.table?.subtotalLabelSize ?? 7) + 'px',
            fontWeight:
              (styleConfig?.table?.subtotalLabelWeight || 'bold') === 'bold' ? '700' : '400',
            color: styleConfig?.table?.subtotalLabelColor || '#919191',
          }"
        >
          {{ styleConfig?.table?.subtotalLabelText || 'Subtotal' }}
        </span>
        <span
          :style="{
            fontSize: (styleConfig?.table?.subtotalAmountSize ?? 7) + 'px',
            fontWeight:
              (styleConfig?.table?.subtotalAmountWeight || 'bold') === 'bold' ? '700' : '400',
            color: styleConfig?.table?.subtotalAmountColor || '#000000',
            paddingLeft: '6px',
          }"
        >
          ${{ (table.total || 0).toFixed(2) }}
        </span>
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
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

const props = defineProps<{
  table: Table
  styleConfig: StyleConfig
}>()

// 计算列宽度
const getColumnWidth = (column: TableColumn): number => {
  if (column.width && typeof column.width === 'number') {
    return column.width
  }

  // 默认平均分配
  return Math.floor(100 / props.table.columns.length)
}
</script>

<style scoped>
/* 确保所有样式都是OpenHTMLtoPDF兼容的 */
</style>
