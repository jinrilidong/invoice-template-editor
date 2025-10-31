<template>
  <table
    style="width: 100%; border-collapse: collapse; table-layout: fixed"
    cellpadding="0"
    cellspacing="0"
  >
    <tr>
      <!-- Title and Description Column -->
      <td
        v-if="hasTitleOrDescription"
        :style="{
          width: 'auto',
          padding: '0',
          verticalAlign: getVerticalAlign(styleConfig?.header?.verticalAlign || 'top'),
        }"
      >
        <table style="width: 100%; border-collapse: collapse" cellpadding="0" cellspacing="0">
          <tr>
            <td style="padding: 0; vertical-align: top">
              <span
                v-if="header.title && !isEditMode"
                :style="{
                  fontSize: (styleConfig?.header?.titleSize || 20) + 'px',
                  fontWeight: getFontWeight(styleConfig?.header?.titleWeight || 'semibold'),
                  color: styleConfig?.header?.titleColor || '#0e171f',
                  lineHeight: '24px',
                  display: 'block',
                }"
                v-html="toXhtml(header.title)"
              ></span>
              <EditableText v-else v-model="header.title" :editing="!!isEditMode" />
              <span
                v-if="header.description && !isEditMode"
                :style="{
                  fontSize: (styleConfig?.header?.descriptionSize || 7) + 'px',
                  fontWeight: getFontWeight(styleConfig?.header?.descriptionWeight || 'normal'),
                  color: styleConfig?.header?.descriptionColor || '#919191',
                  lineHeight: '9px',
                  display: 'block',
                  marginTop: '1px',
                }"
                v-html="toXhtml(header.description)"
              ></span>
              <EditableText v-else v-model="header.description" :editing="!!isEditMode" />
            </td>
          </tr>
        </table>
      </td>

      <!-- Logo Column -->
      <td
        :style="{
          width: hasTitleOrDescription ? '240px' : '100%',
          padding: 0,
          verticalAlign: getVerticalAlign(styleConfig?.header?.verticalAlign || 'top'),
          textAlign: hasTitleOrDescription ? 'right' : 'left',
        }"
      >
        <table style="width: 100%; border-collapse: collapse" cellpadding="0" cellspacing="0">
          <tr>
            <td
              :style="{
                textAlign: hasTitleOrDescription ? 'right' : 'left',
                padding: 0,
                verticalAlign: 'top',
              }"
            >
              <!-- Logo Image -->
              <div
                v-if="header.logo"
                :style="{
                  height: (header.logoSize === 'large' ? 72 : 48) + 'px',
                  width: '240px',
                  backgroundImage: `url(${header.logo})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: hasTitleOrDescription ? 'right center' : 'left center',
                }"
              ></div>

              <!-- Logo Placeholder -->
              <table
                v-else
                style="
                  width: 240px;
                  height: 48px;
                  border: 1px dashed #000000;
                  border-collapse: collapse;
                "
                cellpadding="0"
                cellspacing="0"
              >
                <tr>
                  <td
                    style="
                      text-align: center;
                      vertical-align: middle;
                      color: #919191;
                      font-size: 7px;
                      line-height: 9px;
                    "
                  >
                    Logo Placeholder
                  </td>
                </tr>
              </table>

              <!-- Logo Description -->
              <div
                v-if="header.logoDescription"
                :style="{
                  fontSize: '7px',
                  color: '#919191',
                  textAlign: hasTitleOrDescription ? 'right' : 'left',
                  marginTop: '4px',
                  lineHeight: '9px',
                }"
              >
                {{ header.logoDescription }}
              </div>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { toXhtml } from '@/utils/text'
import EditableText from '../EditableText.vue'

interface Header {
  title?: string
  description?: string
  logo?: string
  companyName?: string
  logoSize?: 'default' | 'large'
  logoDescription?: string
}

interface StyleConfig {
  header: {
    titleColor: string
    titleSize: number
    titleWeight: string
    descriptionColor: string
    descriptionSize: number
    descriptionWeight: string
    verticalAlign?: 'top' | 'middle' | 'bottom'
  }
}

const props = defineProps<{
  header: Header
  styleConfig: StyleConfig
  isEditMode?: boolean
}>()

// 计算是否有标题或描述
const hasTitleOrDescription = computed(() => {
  return !!(props.header.title || props.header.description)
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

// 垂直对齐转换函数
const getVerticalAlign = (align: 'top' | 'middle' | 'bottom' | undefined): string => {
  switch (align) {
    case 'middle':
      return 'middle'
    case 'bottom':
      return 'bottom'
    case 'top':
    default:
      return 'top'
  }
}
</script>

<style scoped>
/* 确保所有样式都是OpenHTMLtoPDF兼容的 */
</style>
