<template>
  <table
    style="width: 100%; border-collapse: collapse; table-layout: fixed"
    cellpadding="0"
    cellspacing="0"
  >
    <tr>
      <td
        v-for="(column, columnIndex) in table.columns"
        :key="'subtotal-' + columnIndex"
        :style="{
          width: getColumnWidth(column) + '%',
          fontSize: '7px',
          fontWeight: '600',
          color: styleConfig?.table?.rowTextColor || '#000000',
          textAlign: columnIndex === table.columns.length - 1 ? 'right' : 'left',
          padding: '2px 8px',
          borderTop: '1px solid ' + (styleConfig?.table?.borderColor || '#d2d2d2'),
          lineHeight: '9px',
          verticalAlign: 'top',
        }"
      >
        <span v-if="columnIndex === table.columns.length - 1">
          Subtotal ${{ (table.total || 0).toFixed(2) }}
        </span>
        <span v-else>&nbsp;</span>
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

interface StyleConfig {
  table: {
    sectionTitleColor: string
    subsectionTitleColor: string
    headerColor: string
    columnNameWeight: string
    rowTextColor: string
    borderColor: string
    rowHeight: number
    columnsPadding: number
  }
}

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
