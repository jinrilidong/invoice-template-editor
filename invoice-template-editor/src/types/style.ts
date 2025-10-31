export interface StyleConfig {
  baseFontSize: number
  sectionGap: number
  sameTypeSectionGap: number
  summaryGap: number

  header: {
    titleColor: string
    titleSize: number
    titleWeight?: string
    descriptionColor: string
    descriptionSize: number
    descriptionWeight?: string
    // Logo description below the logo (not the title description)
    logoDescriptionColor?: string
    logoDescriptionSize?: number
    logoDescriptionWeight?: string
  }

  info: {
    sectionTitleColor: string
    sectionTitleWeight?: string
    sectionTitleSize?: number
    labelColor: string
    labelWeight?: string
    labelSize?: number
    valueColor: string
    valueWeight?: string
    valueSize?: number
    itemGap: number
    itemsPerRow?: number
    itemsSpacing?: number
    labelValueGap?: number
  }

  table: {
    sectionTitleColor: string
    sectionTitleWeight?: string
    sectionTitleSize?: number
    subsectionTitleColor?: string
    subsectionTitleWeight?: string
    subsectionTitleSize?: number
    headerColor: string
    columnNameWeight?: string
    columnNameSize?: number
    rowTextColor?: string
    rowTextSize?: number
    rowHeight: number
    columnsPadding: number
    borderColor?: string
    // 小计样式（可选）
    subtotalLabelText?: string
    subtotalLabelColor?: string
    subtotalLabelWeight?: string
    subtotalLabelSize?: number
    subtotalAmountColor?: string
    subtotalAmountWeight?: string
    subtotalAmountSize?: number
  }

  summary?: {
    labelText?: string
    labelColor: string
    labelWeight: string
    contentColor: string
    contentWeight: string
    labelSize: number
    contentSize: number
    labelContentGap?: number
  }

  description: {
    labelColor: string
    labelWeight?: string
    labelSize?: number
    textColor: string
    textWeight?: string
    textSize: number
    lineHeight: number
  }

  item: {
    sectionTitleColor: string
    sectionTitleWeight?: string
    sectionTitleSize?: number
    labelColor: string
    labelWeight?: string
    labelSize?: number
    valueColor: string
    valueWeight?: string
    valueSize?: number
    itemGap: number
    itemsPerRow?: number
    itemsSpacing?: number
    labelValueGap?: number
  }

  footer: {
    textColor: string
    textSize: number
    textWeight?: string
  }

  footerInfo?: {
    textColor: string
    textSize: number
    textWeight?: string
  }

  footerName?: {
    textColor: string
    textSize: number
    textWeight?: string
  }

  hInfo: {
    sectionTitleColor: string
    sectionTitleWeight?: string
    sectionTitleSize?: number
    labelColor: string
    labelWeight?: string
    labelSize?: number
    valueColor: string
    valueWeight?: string
    valueSize?: number
    labelWidth: number
    labelValueGap: number
    itemGap: number
    columnsPadding: number
    columnGap?: number
  }
}
