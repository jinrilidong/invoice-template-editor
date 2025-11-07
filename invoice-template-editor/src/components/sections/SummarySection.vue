<template>
  <table
    style="width: 100%; border-collapse: collapse; table-layout: fixed"
    cellpadding="0"
    cellspacing="0"
  >
    <tr>
      <td style="width: 100%; text-align: right; padding: 0; vertical-align: top">
        <span
          :style="{
            fontSize: (styleConfig?.summary?.labelSize ?? 10) + 'px',
            fontWeight:
              (styleConfig?.summary?.labelWeight || 'bold') === 'bold'
                ? '700'
                : '400',
            color: styleConfig?.summary?.labelColor || '#000000',
            lineHeight: '9px',
          }"
        >
          {{ summary?.labelText || styleConfig?.summary?.labelText || 'Total USD' }}
        </span>
        <span
          :style="{
            fontSize: (styleConfig?.summary?.contentSize ?? 14) + 'px',
            fontWeight:
              (styleConfig?.summary?.contentWeight || 'bold') === 'bold'
                ? '700'
                : '400',
            color: styleConfig?.summary?.contentColor || '#000000',
            lineHeight: '17px',
            paddingLeft: (styleConfig?.summary?.labelContentGap ?? 12) + 'px',
          }"
        >
          {{ displayAmount }}
        </span>
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue'

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
}

interface SummaryData {
  labelText?: string
  amount?: string
}

const props = defineProps<{
  tables?: Table[]
  summary?: SummaryData
  styleConfig: StyleConfig
}>()

// 计算总金额（从表格）
const totalAmount = computed(() => {
  if (!props.tables || props.tables.length === 0) return 0
  return props.tables.reduce((sum, table) => sum + (table.total || 0), 0)
})

// 显示金额：优先使用 summary.amount，否则使用计算的总金额（带 $ 符号和格式化）
const displayAmount = computed(() => {
  if (props.summary?.amount && String(props.summary.amount).trim() !== '') {
    return props.summary.amount
  }
  return '$' + totalAmount.value.toFixed(2)
})
</script>

<style scoped>
/* 确保所有样式都是OpenHTMLtoPDF兼容的 */
</style>
