export interface StyleConfig {
  info?: {
    itemsPerRow?: number
    itemGap?: number
  }
  item?: {
    itemsPerRow?: number
    itemGap?: number
  }
  hInfo?: {
    columnGap?: number
    itemGap?: number
    labelValueGap?: number
    labelWidth?: number
  }
}

export interface HInfoConfig {
  columnWidth?: string
}

export interface SectionStyles {
  container: Record<string, any>
  item: Record<string, any>
  column?: Record<string, any>
  itemContent?: Record<string, any>
  label?: Record<string, any>
  value?: Record<string, any>
}

export class StyleCalculator {
  static calculateItemWidth(itemsPerRow: number, gap: number): string
  static calculateHInfoColumnWidth(columnWidth: string): string
  static calculateSpacing(gap: number, direction?: 'horizontal' | 'vertical'): Record<string, string>
  static generateInfoSectionStyles(styleConfig: StyleConfig): SectionStyles
  static generateItemSectionStyles(styleConfig: StyleConfig): SectionStyles
  static generateHInfoSectionStyles(styleConfig: StyleConfig, hInfoConfig: HInfoConfig): SectionStyles
}
