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
  }

  info: {
    sectionTitleColor: string
    sectionTitleWeight?: string
    labelColor: string
    labelWeight?: string
    valueColor: string
    valueWeight?: string
    itemGap: number
    itemsPerRow?: number
    itemsSpacing?: number
    labelValueGap?: number
  }

  table: {
    sectionTitleColor: string
    sectionTitleWeight?: string
    subsectionTitleColor?: string
    subsectionTitleWeight?: string
    headerColor: string
    columnNameWeight?: string
    rowTextColor?: string
    rowHeight: number
    columnsPadding: number
    borderColor?: string
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
    textColor: string
    textWeight?: string
    textSize: number
    lineHeight: number
  }

  item: {
    sectionTitleColor: string
    sectionTitleWeight?: string
    labelColor: string
    labelWeight?: string
    valueColor: string
    valueWeight?: string
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
    labelColor: string
    labelWeight?: string
    valueColor: string
    valueWeight?: string
    labelWidth: number
    labelValueGap: number
    itemGap: number
    columnsPadding: number
    columnsSpacing?: number
    columnGap?: number
  }
}
