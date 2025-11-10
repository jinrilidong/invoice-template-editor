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
  }

  info: {
    sectionTitleColor: string
    sectionTitleWeight?: 'normal' | 'bold'
    sectionTitleSize?: number
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

  table: {
    sectionTitleColor: string
    sectionTitleWeight?: 'normal' | 'bold'
    sectionTitleSize?: number
    subsectionTitleColor?: string
    subsectionTitleWeight?: 'normal' | 'bold'
    subsectionTitleSize?: number
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

  description: {
    labelColor: string
    labelWeight?: 'normal' | 'bold'
    labelSize?: number
    textColor: string
    textWeight?: 'normal' | 'bold'
    textSize: number
    lineHeight: number
    topMargin?: number
  }

  item: {
    sectionTitleColor: string
    sectionTitleWeight?: 'normal' | 'bold'
    sectionTitleSize?: number
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

  hInfo: {
    sectionTitleColor: string
    sectionTitleWeight?: 'normal' | 'bold'
    sectionTitleSize?: number
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
}
