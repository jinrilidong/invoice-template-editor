<template>
  <table
    style="width: 100%; border-collapse: collapse; table-layout: fixed"
    cellpadding="0"
    cellspacing="0"
  >
    <!-- Section Title -->
    <tr v-if="info.sectionTitle || isEditMode">
      <td
        :style="{
          fontSize: (styleConfig?.info?.sectionTitleSize || 7) + 'px',
          fontWeight: getFontWeight(styleConfig?.info?.sectionTitleWeight || 'semibold'),
          color: styleConfig?.info?.sectionTitleColor || '#6b7280',
          lineHeight: (styleConfig?.info?.sectionTitleSize || 7) + 2 + 'px',
          padding: '0 0 2px 0',
        }"
      >
        <template v-if="!isEditMode">{{ info.sectionTitle }}</template>
        <template v-else>
          <EditableText v-model="info.sectionTitle" :editing="true" />
        </template>
      </td>
    </tr>

    <!-- Info Items -->
    <tr v-if="info.items && info.items.length > 0">
      <td style="padding: 0">
        <InfoItemsTable
          :items="info.items"
          :style-config="styleConfig"
          :is-edit-mode="isEditMode"
        />
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import InfoItemsTable from './InfoItemsTable.vue'
import EditableText from '../EditableText.vue'

interface InfoItem {
  id: string
  label: string
  value: string
}

interface Info {
  id?: string
  sectionTitle?: string
  items?: InfoItem[]
}

import type { StyleConfig } from '@/types/style'

defineProps<{
  info: Info
  styleConfig: StyleConfig
  isEditMode?: boolean
}>()

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
