<template>
  <table
    style="width: 100%; border-collapse: collapse; table-layout: fixed"
    cellpadding="0"
    cellspacing="0"
  >
    <!-- 将items按行分组 -->
    <tr v-for="(rowItems, rowIndex) in itemRows" :key="'row-' + rowIndex">
      <template v-for="(item, itemIndex) in rowItems" :key="item.id">
        <!-- Item单元格 -->
        <td
          :style="{
            width: 100 / (styleConfig?.item?.itemsPerRow || 5) + '%',
            verticalAlign: 'top',
          }"
        >
          <table style="width: 100%; border-collapse: collapse" cellpadding="0" cellspacing="0">
            <tr>
              <td
                :style="{
                  fontSize: '7px',
                  fontWeight: getFontWeight(styleConfig?.item?.labelWeight || 'semibold'),
                  color: styleConfig?.item?.labelColor || '#000000',
                  lineHeight: '9px',
                  padding: '0',
                }"
              >
                {{ item.label }}
              </td>
            </tr>
            <tr>
              <td
                :style="{
                  fontSize: '7px',
                  fontWeight: getFontWeight(styleConfig?.item?.valueWeight || 'normal'),
                  color: styleConfig?.item?.valueColor || '#919191',
                  lineHeight: '9px',
                  padding: (styleConfig?.item?.labelValueGap ?? 2) + 'px 0 0 0',
                }"
              >
                {{ item.value }}
              </td>
            </tr>
          </table>
        </td>

        <!-- Items Spacing: 在item之间添加间距列（除了最后一个） -->
        <td
          v-if="itemIndex < rowItems.length - 1"
          :style="{
            width: (styleConfig?.item?.itemsSpacing ?? 8) + 'px',
            padding: 0,
          }"
        ></td>
      </template>

      <!-- 填充空单元格 -->
      <template
        v-for="n in (styleConfig?.item?.itemsPerRow || 5) - rowItems.length"
        :key="'empty-' + n"
      >
        <td
          :style="{
            width: 100 / (styleConfig?.item?.itemsPerRow || 5) + '%',
          }"
        >
          &nbsp;
        </td>
        <!-- 空单元格之间也需要间距 -->
        <td
          v-if="n < (styleConfig?.item?.itemsPerRow || 5) - rowItems.length"
          :style="{
            width: (styleConfig?.item?.itemsSpacing ?? 8) + 'px',
            padding: 0,
          }"
        ></td>
      </template>
    </tr>

    <!-- Item Gap: 每行后添加spacer -->
    <tr v-for="(rowItems, rowIndex) in itemRows" :key="'row-gap-' + rowIndex">
      <td
        :colspan="getTotalColumns()"
        :style="{
          height: (styleConfig?.item?.itemGap ?? 4) + 'px',
          padding: 0,
        }"
      ></td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface ItemItem {
  id: string
  label: string
  value: string
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

const props = defineProps<{
  items: ItemItem[]
  styleConfig: StyleConfig
}>()

// 将items按行分组
const itemRows = computed(() => {
  const rows: ItemItem[][] = []
  const itemsPerRow = props.styleConfig?.item?.itemsPerRow || 5

  for (let i = 0; i < props.items.length; i += itemsPerRow) {
    rows.push(props.items.slice(i, i + itemsPerRow))
  }

  return rows
})

// 计算总列数（包括间距列）
const getTotalColumns = () => {
  const itemsPerRow = props.styleConfig?.item?.itemsPerRow || 5
  return itemsPerRow + (itemsPerRow - 1) // items + spacers
}

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
