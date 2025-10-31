<template>
  <table
    style="width: 100%; border-collapse: collapse; table-layout: fixed"
    cellpadding="0"
    cellspacing="0"
  >
    <tr>
      <!-- Footer Info -->
      <td
        :style="{
          width: '33.33%',
          fontSize: (styleConfig?.footerInfo?.textSize || 7) + 'px',
          fontWeight: getFontWeight(styleConfig?.footerInfo?.textWeight || 'normal'),
          color: styleConfig?.footerInfo?.textColor || '#000000',
          lineHeight: '9px',
          padding: '0',
          textAlign: 'left',
          verticalAlign: 'top',
        }"
      >
        <template v-if="!isEditMode">{{ footer.info || '' }}</template>
        <template v-else>
          <EditableText v-model="footer.info" :editing="true" />
        </template>
      </td>

      <!-- Footer Name -->
      <td
        :style="{
          width: '33.33%',
          fontSize: (styleConfig?.footerName?.textSize || 7) + 'px',
          fontWeight: getFontWeight(styleConfig?.footerName?.textWeight || 'normal'),
          color: styleConfig?.footerName?.textColor || '#000000',
          lineHeight: '9px',
          padding: '0',
          textAlign: 'center',
          verticalAlign: 'top',
        }"
      >
        <template v-if="!isEditMode">{{ footer.name || '' }}</template>
        <template v-else>
          <EditableText v-model="footer.name" :editing="true" />
        </template>
      </td>

      <!-- Page Number -->
      <td
        :style="{
          width: '33.33%',
          fontSize: (styleConfig?.footer?.textSize || 7) + 'px',
          fontWeight: getFontWeight(styleConfig?.footer?.textWeight || 'normal'),
          color: styleConfig?.footer?.textColor || '#000000',
          lineHeight: '9px',
          padding: '0',
          textAlign: 'right',
          verticalAlign: 'top',
        }"
      >
        Page: {{ currentPage }} of {{ totalPages }}
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import EditableText from '../EditableText.vue'
interface Footer {
  info?: string
  name?: string
}

interface StyleConfig {
  footer: {
    textColor: string
    textSize: number
    textWeight: string
  }
  footerInfo: {
    textColor: string
    textSize: number
    textWeight: string
  }
  footerName: {
    textColor: string
    textSize: number
    textWeight: string
  }
}

defineProps<{
  footer: Footer
  styleConfig: StyleConfig
  currentPage: number
  totalPages: number
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
