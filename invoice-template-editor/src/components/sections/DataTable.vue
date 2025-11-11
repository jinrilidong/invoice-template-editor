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
            width: getColumnWidth(column) + '%',
            fontSize: (sectionStyle?.columnNameSize || 7) + 'px',
            fontWeight: getFontWeight(sectionStyle?.columnNameWeight || 'medium'),
            color: sectionStyle?.headerColor || '#919191',
            textAlign: column.alignment === 'right' ? 'right' : 'left',
            paddingLeft: columnIndex === 0 ? '0' : (sectionStyle?.columnsPadding ?? 8) / 2 + 'px',
            paddingRight:
              columnIndex === table.columns.length - 1
                ? '0'
                : (sectionStyle?.columnsPadding ?? 8) / 2 + 'px',
            paddingTop: '2px',
            paddingBottom: '2px',
            borderBottom: '1px solid ' + (sectionStyle?.borderColor || '#d2d2d2'),
            lineHeight: (sectionStyle?.columnNameSize || 7) + 2 + 'px',
            verticalAlign: 'bottom',
          }"
        >
          <template v-if="!isEditMode">
            <div v-html="toXhtml(column.name || '')"></div>
          </template>
          <template v-else>
            <EditableText v-model="column.name" :editing="true" />
          </template>
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
            width: getColumnWidth(column) + '%',
            fontSize: (sectionStyle?.rowTextSize || 7) + 'px',
            fontWeight: '400',
            color: sectionStyle?.rowTextColor || '#000000',
            textAlign: column.alignment === 'right' ? 'right' : 'left',
            paddingLeft: columnIndex === 0 ? '0' : (sectionStyle?.columnsPadding ?? 8) / 2 + 'px',
            paddingRight:
              columnIndex === table.columns.length - 1
                ? '0'
                : (sectionStyle?.columnsPadding ?? 8) / 2 + 'px',
            paddingTop: rowIndex === 0 ? '2px' : (sectionStyle?.rowSpacing ?? 2) + 'px',
            paddingBottom:
              rowIndex === displayRows.length - 1 ? '2px' : (sectionStyle?.rowSpacing ?? 2) + 'px',
            lineHeight: (sectionStyle?.rowTextSize || 7) + 2 + 'px',
            verticalAlign: 'top',
            height: (sectionStyle?.rowHeight || 13) + 'px',
            borderBottom:
              rowIndex === displayRows.length - 1
                ? '1px solid ' + (sectionStyle?.borderColor || '#d2d2d2')
                : 'none',
          }"
        >
          <template v-if="!isEditMode">
            <div v-html="toXhtml(row.data[column.id] || '')"></div>
          </template>
          <template v-else>
            <EditableText
              :model-value="row.data[column.id] || ''"
              :editing="true"
              @update:modelValue="(val) => (row.data[column.id] = val)"
            />
          </template>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import EditableText from '../EditableText.vue'
import { toXhtml } from '@/utils/text'
import { getTableStyle } from '@/utils/style-helper'

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
  sectionIndex?: number
  isEditMode?: boolean
}>()

// 获取当前索引的样式
const sectionStyle = computed(() => getTableStyle(props.styleConfig, props.sectionIndex ?? 0))

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

// 计算列宽度：使用权重归一化百分比，与导出逻辑保持一致
const getColumnWidth = (column: TableColumn): number => {
  const columns = props.table.columns || []
  if (!columns.length) return 0

  const weights = columns.map((c) => (typeof c.width === 'number' ? c.width : 100))
  const total = weights.reduce((a, b) => a + b, 0) || 1
  const w = typeof column.width === 'number' ? column.width : 100
  return (w / total) * 100
}

// 字体权重转换函数
const getFontWeight = (weight: string): string => {
  switch (weight) {
    case 'bold':
      return '700'
    case 'normal':
    default:
      return '400'
  }
}
</script>

<style scoped>
/* 确保所有样式都是OpenHTMLtoPDF兼容的 */
</style>
