<template>
  <table
    style="width: 100%; border-collapse: collapse; table-layout: fixed"
    cellpadding="0"
    cellspacing="0"
  >
    <tr>
      <!-- 使用单个单元格合并列，避免受列宽限制，且不换行 -->
      <td
        :colspan="table.columns.length"
        :style="{
          width: '100%',
          fontSize: '7px',
          fontWeight: '600',
          color: styleConfig?.table?.rowTextColor || '#000000',
          textAlign: 'right',
          padding: '2px 0 0 0',
          lineHeight: '9px',
          verticalAlign: 'top',
          whiteSpace: 'nowrap',
        }"
      >
        <span>
          <span
            :style="{
              fontSize: (styleConfig?.table?.subtotalLabel?.textSize ?? 10) + 'px',
              fontWeight: styleConfig?.table?.subtotalLabel?.textWeight ?? '600',
              color: styleConfig?.table?.subtotalLabel?.textColor || '#000000',
              lineHeight: '17px',
            }"
          >
            Subtotal
          </span>
          &nbsp;&nbsp;
          <span
            :style="{
              fontSize: (styleConfig?.table?.subtotalValue?.textSize ?? 10) + 'px',
              fontWeight: styleConfig?.table?.subtotalValue?.textWeight ?? '600',
              color: styleConfig?.table?.subtotalValue?.textColor || '#000000',
              lineHeight: '17px',
            }"
          >
            ${{ (table.total || 0).toFixed(2) }}
          </span>
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
  widthUnit?: '%' | 'px'
  widthValue?: number
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
    borderWidth?: number
    rowHeight: number
    columnsPadding: number
    subtotalLabel?: { textColor: string; textSize: number; textWeight: string }
    subtotalValue?: { textColor: string; textSize: number; textWeight: string }
  }
}

defineProps<{
  table: Table
  styleConfig: StyleConfig
}>()

// 保留：Subotal 使用 colspan 占整行，不需要计算每列宽度
</script>

<style scoped>
/* 确保所有样式都是OpenHTMLtoPDF兼容的 */
</style>
