<template>
  <table
    style="width: 100%; border-collapse: collapse; table-layout: fixed"
    cellpadding="0"
    cellspacing="0"
  >
    <tr v-for="(item, itemIndex) in column.items" :key="'item-' + itemIndex">
      <td
        :style="{
          padding:
            '0 0 ' +
            (itemIndex < column.items.length - 1 ? (styleConfig?.hInfo?.itemGap ?? 4) : 0) +
            'px 0',
        }"
      >
        <!-- Horizontal Layout -->
        <table
          v-if="labelValueLayout === 'horizontal'"
          style="width: 100%; border-collapse: collapse"
          cellpadding="0"
          cellspacing="0"
        >
          <tr>
            <td
              :style="{
                width: (styleConfig?.hInfo?.labelWidth || 80) + 'px',
                fontSize: (styleConfig?.hInfo?.labelSize || 7) + 'px',
                fontWeight: getFontWeight(styleConfig?.hInfo?.labelWeight || 'bold'),
                color: styleConfig?.hInfo?.labelColor || '#000000',
                lineHeight: (styleConfig?.hInfo?.labelSize || 7) + 2 + 'px',
                padding: 0,
                verticalAlign: 'top',
              }"
            >
              <div v-if="!isEditMode" v-html="toXhtml(item.label)"></div>
              <EditableText v-else v-model="item.label" :editing="true" />
            </td>
            <td
              :style="{
                fontSize: (styleConfig?.hInfo?.valueSize || 7) + 'px',
                fontWeight: getFontWeight(styleConfig?.hInfo?.valueWeight || 'normal'),
                color: styleConfig?.hInfo?.valueColor || '#919191',
                lineHeight: (styleConfig?.hInfo?.valueSize || 7) + 2 + 'px',
                padding: (styleConfig?.hInfo?.labelValueGap ?? 0) + 'px 0 0 0',
                verticalAlign: 'top',
              }"
            >
              <div v-if="!isEditMode" v-html="toXhtml(item.value)"></div>
              <EditableText v-else v-model="item.value" :editing="true" />
            </td>
          </tr>
        </table>

        <!-- Vertical Layout -->
        <table
          v-else
          style="width: 100%; border-collapse: collapse"
          cellpadding="0"
          cellspacing="0"
        >
          <tr>
            <td
              :style="{
                fontSize: (styleConfig?.hInfo?.labelSize || 7) + 'px',
                fontWeight: getFontWeight(styleConfig?.hInfo?.labelWeight || 'bold'),
                color: styleConfig?.hInfo?.labelColor || '#000000',
                lineHeight: (styleConfig?.hInfo?.labelSize || 7) + 2 + 'px',
                padding: 0,
              }"
            >
              <div v-if="!isEditMode" v-html="toXhtml(item.label)"></div>
              <EditableText v-else v-model="item.label" :editing="true" />
            </td>
          </tr>
          <tr>
            <td
              :style="{
                fontSize: (styleConfig?.hInfo?.valueSize || 7) + 'px',
                fontWeight: getFontWeight(styleConfig?.hInfo?.valueWeight || 'normal'),
                color: styleConfig?.hInfo?.valueColor || '#919191',
                lineHeight: (styleConfig?.hInfo?.valueSize || 7) + 2 + 'px',
                padding: (styleConfig?.hInfo?.labelValueGap ?? 2) + 'px 0 0 0',
              }"
            >
              <div v-if="!isEditMode" v-html="toXhtml(item.value)"></div>
              <EditableText v-else v-model="item.value" :editing="true" />
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { toXhtml } from '@/utils/text'
import EditableText from '../EditableText.vue'
interface HInfoItem {
  id: string
  label: string
  value: string
}

interface HInfoColumn {
  id: string
  items: HInfoItem[]
}

import type { StyleConfig } from '@/types/style'

defineProps<{
  column: HInfoColumn
  styleConfig: StyleConfig
  labelValueLayout: 'horizontal' | 'vertical'
  isEditMode?: boolean
}>()

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
