<template>
  <table
    style="width: 100%; border-collapse: collapse; table-layout: fixed"
    cellpadding="0"
    cellspacing="0"
  >
    <!-- Section Title -->
    <tr v-if="description.sectionTitle">
      <td
        :style="{
          fontSize: (styleConfig?.description?.labelSize || 7) + 'px',
          fontWeight: getFontWeight(styleConfig?.description?.labelWeight || 'semibold'),
          color: styleConfig?.description?.labelColor || '#000000',
          lineHeight: (styleConfig?.description?.labelSize || 7) + 2 + 'px',
          padding: '0 0 2px 0',
        }"
      >
        {{ description.sectionTitle }}
      </td>
    </tr>

    <!-- Description Content -->
    <tr v-if="description.content || isEditMode">
      <td
        :style="{
          fontSize: (styleConfig?.description?.textSize || 7) + 'px',
          fontWeight: getFontWeight(styleConfig?.description?.textWeight || 'normal'),
          color: styleConfig?.description?.textColor || '#919191',
          lineHeight:
            (styleConfig?.description?.lineHeight || 1.2) *
              (styleConfig?.description?.textSize || 7) +
            'px',
          padding: '0',
        }"
      >
        <div v-if="!isEditMode" v-html="toXhtml(description.content || '')"></div>
        <div v-else v-html="toXhtml(description.content || '')"></div>
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { toXhtml } from '@/utils/text'
interface Description {
  id?: string
  sectionTitle: string
  content: string
}

interface StyleConfig {
  description: {
    labelColor: string
    labelSize?: number
    labelWeight: string
    textColor: string
    textWeight: string
    textSize: number
    lineHeight: number
  }
}

defineProps<{
  description: Description
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
