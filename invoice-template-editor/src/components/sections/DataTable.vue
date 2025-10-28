<template>
  <table
    style="width: 100%; border-collapse: collapse; table-layout: fixed"
    cellpadding="0"
    cellspacing="0"
  >
    <!-- Table Header -->
    <thead>
      <tr>
        <th
          v-for="(column, columnIndex) in table.columns"
          :key="'header-' + columnIndex"
          :style="{
            width: getColumnWidthStyle(column),
            fontSize: '7px',
            fontWeight: getFontWeight(styleConfig?.table?.columnNameWeight || 'medium'),
            color: styleConfig?.table?.headerColor || '#919191',
            textAlign: column.alignment === 'right' ? 'right' : 'left',
            padding:
              (styleConfig?.table?.rowHeight || 13) / 2 +
              'px ' +
              (columnIndex === table.columns.length - 1
                ? 0
                : (styleConfig?.table?.columnsPadding ?? 8)) +
              'px 0 0',
            borderBottom:
              (styleConfig?.table?.borderWidth ?? 1) +
              'px solid ' +
              (styleConfig?.table?.borderColor || '#d2d2d2'),
            lineHeight: '9px',
            verticalAlign: 'bottom',
            height: (styleConfig?.table?.rowHeight || 13) + 'px',
          }"
        >
          {{ column.name }}
        </th>
      </tr>
    </thead>

    <!-- Table Body -->
    <tbody>
      <tr v-for="(row, rowIndex) in displayRows" :key="'row-' + rowIndex">
        <td
          v-for="(column, columnIndex) in table.columns"
          :key="'cell-' + rowIndex + '-' + columnIndex"
          :style="{
            width: getColumnWidthStyle(column),
            fontSize: '7px',
            fontWeight: '400',
            color: styleConfig?.table?.rowTextColor || '#000000',
            textAlign: column.alignment === 'right' ? 'right' : 'left',
            padding:
              '2px ' +
              (columnIndex === table.columns.length - 1
                ? 0
                : (styleConfig?.table?.columnsPadding ?? 8)) +
              'px 2px 0',
            lineHeight: '9px',
            verticalAlign: 'top',
            height: (styleConfig?.table?.rowHeight || 13) + 'px',
          }"
        >
          {{ row.data[column.id] || '' }}
        </td>
      </tr>
    </tbody>
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
  }
}

const props = defineProps<{
  table: Table
  styleConfig: StyleConfig
}>()

// 计算要显示的行数
const displayRows = computed(() => {
  const rowsNumber = props.table.rowsNumber || 2
  const baseRows = props.table.rows || []

  // 如果需要的行数大于现有行数，动态生成更多行
  if (rowsNumber > baseRows.length) {
    const additionalRows = []
    for (let i = baseRows.length; i < rowsNumber; i++) {
      const newRow = {
        id: `generated-${i + 1}`,
        data: {} as Record<string, string>,
        total: 0,
      }

      // 为每个列生成数据
      if (props.table.columns) {
        props.table.columns.forEach((column) => {
          // 使用第一行的数据作为模板，或者使用默认值
          const templateValue = baseRows[0]?.data[column.id] || 'Placeholder'
          newRow.data[column.id] = templateValue.replace(/\d+/, String(i + 1))
        })
      }

      additionalRows.push(newRow)
    }
    baseRows.push(...additionalRows)
  }

  return baseRows.slice(0, rowsNumber)
})

// 列宽渲染：支持百分比%或绝对值px
const getColumnWidthStyle = (column: TableColumn): string => {
  const raw = column.width
  if (raw === undefined || raw === null || Number.isNaN(Number(raw))) {
    // 默认平均分配（百分比）
    return Math.floor(100 / props.table.columns.length) + '%'
  }
  // 若是负值或0，回退到平均
  if (typeof raw === 'number') {
    // 约定：>= 1e3 视为 px，其他视为 %（也可在配置面板提供切换）
    if (raw >= 1000) return raw + 'px'
    return raw + '%'
  }
  // 非数值，回退平均
  return Math.floor(100 / props.table.columns.length) + '%'
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
