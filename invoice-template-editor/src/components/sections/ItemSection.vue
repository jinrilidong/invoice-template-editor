<template>
  <table
    style="width: 100%; border-collapse: collapse; table-layout: fixed"
    cellpadding="0"
    cellspacing="0"
  >
    <!-- Section Title -->
    <tr v-if="item.sectionTitle || isEditMode">
      <td
        :style="{
          fontSize: (sectionStyle?.sectionTitleSize || 7) + 'px',
          fontWeight: getFontWeight(sectionStyle?.sectionTitleWeight || 'bold'),
          color: sectionStyle?.sectionTitleColor || '#6b7280',
          lineHeight: (sectionStyle?.sectionTitleSize || 7) + 2 + 'px',
          padding: `0 0 ${sectionStyle?.sectionTitleBottomMargin ?? 2}px 0`,
        }"
      >
        <template v-if="!isEditMode">{{ item.sectionTitle }}</template>
        <template v-else>
          <EditableText
            :model-value="item.sectionTitle || ''"
            :editing="true"
            @update:modelValue="(val) => (item.sectionTitle = val)"
          />
        </template>
      </td>
    </tr>

    <!-- Item Items -->
    <tr v-if="item.items && item.items.length > 0">
      <td style="padding: 0">
        <ItemItemsTable
          :items="item.items"
          :style-config="styleConfig"
          :section-index="sectionIndex"
          :is-edit-mode="isEditMode"
        />
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import ItemItemsTable from './ItemItemsTable.vue'
import EditableText from '../EditableText.vue'
import { getItemStyle } from '@/utils/style-helper'

interface ItemItem {
  id: string
  label: string
  value: string
}

interface Item {
  id?: string
  sectionTitle?: string
  items?: ItemItem[]
}

import type { StyleConfig } from '@/types/style'

const props = defineProps<{
  item: Item
  styleConfig: StyleConfig
  sectionIndex?: number
  isEditMode?: boolean
}>()

// 获取当前索引的样式
const sectionStyle = computed(() => getItemStyle(props.styleConfig, props.sectionIndex ?? 0))

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
