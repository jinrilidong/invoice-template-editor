<template>
  <table
    style="width: 100%; border-collapse: collapse; table-layout: fixed"
    cellpadding="0"
    cellspacing="0"
  >
    <!-- 将items按行分组 -->
    <template v-for="(rowItems, rowIndex) in itemRows" :key="'row-' + rowIndex">
      <tr>
        <td
          v-for="(item, colIndex) in rowItems"
          :key="item.id"
          :style="{
            width: 100 / (sectionStyle?.itemsPerRow || 5) + '%',
            paddingLeft: colIndex === 0 ? '0' : (sectionStyle?.itemsSpacing ?? 8) / 2 + 'px',
            paddingRight:
              colIndex === rowItems.length - 1
                ? '0'
                : (sectionStyle?.itemsSpacing ?? 8) / 2 + 'px',
            verticalAlign: 'top',
          }"
        >
          <table style="width: 100%; border-collapse: collapse" cellpadding="0" cellspacing="0">
            <tr>
              <td
                :style="{
                  fontSize: (sectionStyle?.labelSize || 7) + 'px',
                  fontWeight: getFontWeight(sectionStyle?.labelWeight || 'bold'),
                  color: sectionStyle?.labelColor || '#000000',
                  lineHeight: (sectionStyle?.labelSize || 7) + 2 + 'px',
                  padding: '0',
                }"
              >
                <div v-if="!isEditMode" v-html="toXhtml(item.label)"></div>
                <EditableText v-else v-model="item.label" :editing="true" />
              </td>
            </tr>
            <tr>
              <td
                :style="{
                  fontSize: (sectionStyle?.valueSize || 7) + 'px',
                  fontWeight: getFontWeight(sectionStyle?.valueWeight || 'normal'),
                  color: sectionStyle?.valueColor || '#919191',
                  lineHeight: (sectionStyle?.valueSize || 7) + 2 + 'px',
                  padding: (sectionStyle?.labelValueGap ?? 2) + 'px 0 0 0',
                }"
              >
                <div v-if="!isEditMode" v-html="toXhtml(item.value)"></div>
                <EditableText v-else v-model="item.value" :editing="true" />
              </td>
            </tr>
          </table>
        </td>
        <!-- 填充空单元格，保持网格结构；无边缘额外间距 -->
        <td
          v-for="n in (sectionStyle?.itemsPerRow || 5) - rowItems.length"
          :key="'empty-' + n"
          :style="{
            width: 100 / (sectionStyle?.itemsPerRow || 5) + '%',
            padding: '0',
          }"
        >
          &nbsp;
        </td>
      </tr>
      <!-- 行间距：紧跟在每一行后（除最后一行） -->
      <tr
        v-if="itemRows.length > 1 && rowIndex < itemRows.length - 1"
        :key="'row-gap-after-' + rowIndex"
      >
        <td
          :colspan="sectionStyle?.itemsPerRow || 5"
          :style="{ height: (sectionStyle?.itemGap ?? 4) + 'px', padding: 0 }"
        ></td>
      </tr>
    </template>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { toXhtml } from '@/utils/text'
import EditableText from '../EditableText.vue'

interface InfoItem {
  id: string
  label: string
  value: string
}

import type { StyleConfig } from '@/types/style'
import { getInfoStyle } from '@/utils/style-helper'

const props = defineProps<{
  items: InfoItem[]
  styleConfig: StyleConfig
  sectionIndex?: number
  isEditMode?: boolean
}>()

const sectionStyle = computed(() => getInfoStyle(props.styleConfig, props.sectionIndex ?? 0))

// 将items按行分组，每行5个
const itemRows = computed(() => {
  const rows: InfoItem[][] = []
  const itemsPerRow = sectionStyle.value?.itemsPerRow || 5

  for (let i = 0; i < props.items.length; i += itemsPerRow) {
    rows.push(props.items.slice(i, i + itemsPerRow))
  }

  return rows
})

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
