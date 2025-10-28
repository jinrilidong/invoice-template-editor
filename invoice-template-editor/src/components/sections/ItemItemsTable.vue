<template>
  <table
    style="width: 100%; border-collapse: collapse; table-layout: fixed"
    cellpadding="0"
    cellspacing="0"
  >
    <!-- 将items按行分组（内容单元格 + 间隔单元格） -->
    <tr v-for="(rowItems, rowIndex) in itemRows" :key="'row-' + rowIndex">
      <template v-for="(item, colIndex) in rowItems" :key="item.id">
        <!-- 内容单元格：严格 1/N 宽度，无左右 padding -->
        <td
          :style="{
            width: 100 / (styleConfig?.item?.itemsPerRow || 5) + '%',
            verticalAlign: 'top',
            padding: 0,
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
                  fontWeight: getFontWeight(styleConfig?.item?.valueWeight || 'normal'),
                  color: styleConfig?.item?.valueColor || '#919191',
                  lineHeight: '9px',
                  padding: (styleConfig?.item?.labelValueGap ?? 2) + 'px 0 0 0',
                }"
              >
                {{ item.value }}
              </td>
            </tr>
            <!-- 每个 item 底部的垂直间距：仅非最后一行 -->
            <tr v-if="rowIndex < itemRows.length - 1">
              <td :style="{ height: (styleConfig?.item?.itemGap ?? 4) + 'px', padding: 0 }"></td>
            </tr>
          </table>
        </td>

        <!-- 列间间隔单元格：仅列与列之间（首尾不加） -->
        <td
          v-if="colIndex < rowItems.length - 1"
          :style="{ width: (styleConfig?.item?.itemsSpacing ?? 8) + 'px' }"
        >
          &nbsp;
        </td>
      </template>

      <!-- 不足列的占位与间隔：保证一行宽度与间距一致 -->
      <template
        v-for="n in Math.max((styleConfig?.item?.itemsPerRow || 5) - rowItems.length, 0)"
        :key="'ph-' + rowIndex + '-' + n"
      >
        <td :style="{ width: 100 / (styleConfig?.item?.itemsPerRow || 5) + '%', padding: 0 }">
          &nbsp;
        </td>
        <td
          v-if="n < Math.max((styleConfig?.item?.itemsPerRow || 5) - rowItems.length, 0)"
          :style="{ width: (styleConfig?.item?.itemsSpacing ?? 8) + 'px' }"
        >
          &nbsp;
        </td>
      </template>
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

// 将items按行分组，每行5个
const itemRows = computed(() => {
  const rows: ItemItem[][] = []
  const itemsPerRow = props.styleConfig?.item?.itemsPerRow || 5

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
