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
                fontSize: '7px',
                fontWeight: getFontWeight(styleConfig?.hInfo?.labelWeight || 'semibold'),
                color: styleConfig?.hInfo?.labelColor || '#000000',
                lineHeight: '9px',
                padding: 0,
                verticalAlign: 'top',
              }"
            >
              {{ item.label }}
            </td>
            <td
              :style="{
                fontSize: '7px',
                fontWeight: getFontWeight(styleConfig?.hInfo?.valueWeight || 'normal'),
                color: styleConfig?.hInfo?.valueColor || '#919191',
                lineHeight: '9px',
                padding: (styleConfig?.hInfo?.labelValueGap ?? 0) + 'px 0 0 0',
                verticalAlign: 'top',
              }"
            >
              {{ item.value }}
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
                fontSize: '7px',
                fontWeight: getFontWeight(styleConfig?.hInfo?.labelWeight || 'semibold'),
                color: styleConfig?.hInfo?.labelColor || '#000000',
                lineHeight: '9px',
                padding: 0,
              }"
            >
              {{ item.label }}
            </td>
          </tr>
          <tr>
            <td
              :style="{
                fontSize: '7px',
                fontWeight: getFontWeight(styleConfig?.hInfo?.valueWeight || 'normal'),
                color: styleConfig?.hInfo?.valueColor || '#919191',
                lineHeight: '9px',
                padding: (styleConfig?.hInfo?.labelValueGap ?? 2) + 'px 0 0 0',
              }"
            >
              {{ item.value }}
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
interface HInfoItem {
  id: string
  label: string
  value: string
}

interface HInfoColumn {
  id: string
  items: HInfoItem[]
}

interface StyleConfig {
  hInfo: {
    sectionTitleColor: string
    sectionTitleWeight: string
    labelColor: string
    labelWeight: string
    valueColor: string
    valueWeight: string
    labelWidth: number
    labelValueGap: number
    itemGap: number
    columnsPadding: number
  }
}

defineProps<{
  column: HInfoColumn
  styleConfig: StyleConfig
  labelValueLayout: 'horizontal' | 'vertical'
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
