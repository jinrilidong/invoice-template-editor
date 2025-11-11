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
          fontSize: (sectionStyle?.labelSize || 7) + 'px',
          fontWeight: getFontWeight(sectionStyle?.labelWeight || 'bold'),
          color: sectionStyle?.labelColor || '#000000',
          lineHeight: (sectionStyle?.labelSize || 7) + 2 + 'px',
          padding: `0 0 ${sectionStyle?.labelBottomMargin ?? 2}px 0`,
        }"
      >
        {{ description.sectionTitle }}
      </td>
    </tr>

    <!-- Description Content -->
    <tr v-if="description.content || isEditMode">
      <td
        :style="{
          fontSize: (sectionStyle?.textSize || 7) + 'px',
          fontWeight: getFontWeight(sectionStyle?.textWeight || 'normal'),
          color: sectionStyle?.textColor || '#919191',
          lineHeight:
            (sectionStyle?.lineHeight || 1.2) *
              (sectionStyle?.textSize || 7) +
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
import { computed } from 'vue'
import { toXhtml } from '@/utils/text'
import { getDescriptionStyle } from '@/utils/style-helper'
import type { StyleConfig } from '@/types/style'

interface Description {
  id?: string
  sectionTitle: string
  content: string
}

const props = defineProps<{
  description: Description
  styleConfig: StyleConfig
  sectionIndex?: number
  isEditMode?: boolean
}>()

// 获取当前索引的样式
const sectionStyle = computed(() => getDescriptionStyle(props.styleConfig, props.sectionIndex ?? 0))

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
