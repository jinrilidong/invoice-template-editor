<template>
  <table
    style="width: 100%; border-collapse: collapse; table-layout: fixed"
    cellpadding="0"
    cellspacing="0"
  >
    <tr>
      <td style="width: 100%; text-align: right; padding: 0; vertical-align: top">
        <table style="width: 100%; border-collapse: collapse" cellpadding="0" cellspacing="0">
          <tr>
            <td
              style="
                font-size: 10px;
                font-weight: 600;
                color: #000000;
                line-height: 9px;
                padding: 0;
                text-align: right;
              "
            >
              Total USD
            </td>
          </tr>
          <tr>
            <td
              style="
                font-size: 14px;
                font-weight: 600;
                color: #000000;
                line-height: 17px;
                padding: 2px 0 0 0;
                text-align: right;
              "
            >
              ${{ totalAmount.toFixed(2) }}
            </td>
          </tr>
        </table>
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
    labelColor: string
    labelWeight: string
    contentColor: string
    contentWeight: string
    labelSize: number
    contentSize: number
  }
}

const props = defineProps<{
  tables: Table[]
  styleConfig: StyleConfig
}>()

// 计算总金额
const totalAmount = computed(() => {
  return props.tables.reduce((sum, table) => sum + (table.total || 0), 0)
})
</script>

<style scoped>
/* 确保所有样式都是OpenHTMLtoPDF兼容的 */
</style>
