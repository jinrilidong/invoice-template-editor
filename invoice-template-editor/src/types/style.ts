// 基础样式接口定义
export interface InfoSectionStyle {
  sectionTitleColor: string
  sectionTitleWeight?: 'normal' | 'bold'
  sectionTitleSize?: number
  sectionTitleBottomMargin?: number
  labelColor: string
  labelWeight?: 'normal' | 'bold'
  labelSize?: number
  valueColor: string
  valueWeight?: 'normal' | 'bold'
  valueSize?: number
  itemGap: number
  itemsPerRow?: number
  itemsSpacing?: number
  labelValueGap?: number
  topMargin?: number
}

export interface TableSectionStyle {
  sectionTitleColor: string
  sectionTitleWeight?: 'normal' | 'bold'
  sectionTitleSize?: number
  sectionTitleBottomMargin?: number
  subsectionTitleColor?: string
  subsectionTitleWeight?: 'normal' | 'bold'
  subsectionTitleSize?: number
  subsectionTitleBottomMargin?: number
  headerColor: string
  columnNameWeight?: 'normal' | 'bold'
  columnNameSize?: number
  rowTextColor?: string
  rowTextSize?: number
  rowHeight: number
  rowSpacing?: number
  columnsPadding: number
  borderColor?: string
  // 小计样式（可选）
  subtotalLabelText?: string
  subtotalLabelColor?: string
  subtotalLabelWeight?: 'normal' | 'bold'
  subtotalLabelSize?: number
  subtotalAmountColor?: string
  subtotalAmountWeight?: 'normal' | 'bold'
  subtotalAmountSize?: number
  subtotalOffset?: number
  topMargin?: number
}

export interface DescriptionSectionStyle {
  labelColor: string
  labelWeight?: 'normal' | 'bold'
  labelSize?: number
  labelBottomMargin?: number
  textColor: string
  textWeight?: 'normal' | 'bold'
  textSize: number
  lineHeight: number
  topMargin?: number
}

export interface ItemSectionStyle {
  sectionTitleColor: string
  sectionTitleWeight?: 'normal' | 'bold'
  sectionTitleSize?: number
  sectionTitleBottomMargin?: number
  labelColor: string
  labelWeight?: 'normal' | 'bold'
  labelSize?: number
  valueColor: string
  valueWeight?: 'normal' | 'bold'
  valueSize?: number
  itemGap: number
  itemsPerRow?: number
  itemsSpacing?: number
  labelValueGap?: number
  topMargin?: number
}

export interface HInfoSectionStyle {
  sectionTitleColor: string
  sectionTitleWeight?: 'normal' | 'bold'
  sectionTitleSize?: number
  sectionTitleBottomMargin?: number
  labelColor: string
  labelWeight?: 'normal' | 'bold'
  labelSize?: number
  valueColor: string
  valueWeight?: 'normal' | 'bold'
  valueSize?: number
  labelWidth: number
  labelValueGap: number
  itemGap: number
  columnsPadding: number
  columnGap?: number
  topMargin?: number
}

export interface StyleConfig {
  baseFontSize: number

  header: {
    titleColor: string
    titleSize: number
    titleWeight?: 'normal' | 'bold'
    descriptionColor: string
    descriptionSize: number
    descriptionWeight?: 'normal' | 'bold'
    // Logo description below the logo (not the title description)
    logoDescriptionColor?: string
    logoDescriptionSize?: number
    logoDescriptionWeight?: 'normal' | 'bold'
    // Logo height in pixels (maintains aspect ratio)
    logoHeight?: number
    // Vertical alignment
    verticalAlign?: 'top' | 'middle' | 'bottom'
  }

  // 支持多个实例，使用索引作为 key
  info: Record<number, InfoSectionStyle>
  table: Record<number, TableSectionStyle>
  description: Record<number, DescriptionSectionStyle>
  item: Record<number, ItemSectionStyle>
  hInfo: Record<number, HInfoSectionStyle>

  summary?: {
    labelText?: string
    labelColor: string
    labelWeight: 'normal' | 'bold'
    contentColor: string
    contentWeight: 'normal' | 'bold'
    labelSize: number
    contentSize: number
    labelContentGap?: number
    topMargin?: number
  }

  footer: {
    textColor: string
    textSize: number
    textWeight?: 'normal' | 'bold'
  }

  footerInfo?: {
    textColor: string
    textSize: number
    textWeight?: 'normal' | 'bold'
  }

  footerName?: {
    textColor: string
    textSize: number
    textWeight?: 'normal' | 'bold'
  }
}
