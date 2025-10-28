<template>
  <table
    style="width: 100%; border-collapse: collapse; table-layout: fixed"
    cellpadding="0"
    cellspacing="0"
  >
    <!-- Section Title -->
    <tr v-if="item.sectionTitle">
      <td
        :style="{
          fontSize: '7px',
          fontWeight: getFontWeight(styleConfig?.item?.sectionTitleWeight || 'semibold'),
          color: styleConfig?.item?.sectionTitleColor || '#6b7280',
          lineHeight: '9px',
          padding: '0 0 2px 0',
        }"
      >
        {{ item.sectionTitle }}
      </td>
    </tr>

    <!-- Item Items -->
    <tr v-if="item.items && item.items.length > 0">
      <td style="padding: 0">
        <ItemItemsTable :items="item.items" :style-config="styleConfig" />
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import ItemItemsTable from './ItemItemsTable.vue'

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

interface StyleConfig {
  item: {
    sectionTitleColor: string
    sectionTitleWeight: string
    labelColor: string
    labelWeight: string
    valueColor: string
    valueWeight: string
    itemGap: number
    itemsPerRow: number
    itemsSpacing: number
    labelValueGap: number
  }
}

defineProps<{
  item: Item
  styleConfig: StyleConfig
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
