export interface FlexConfig {
  direction?: 'row' | 'column'
  gap?: number
  items?: any[]
}

export interface FlexItem {
  flex?: number
  gap?: number
}

export class OpenHTMLtoPDFAdapter {
  static convertFlexToTable(flexConfig: FlexConfig): Record<string, any>
  static convertGapToMargin(gapValue: number, direction?: 'horizontal' | 'vertical'): Record<string, string>
  static preCalculateWidth(itemsPerRow: number, gap: number): string
  static convertFlexItem(flexItem: FlexItem, index: number, total: number): Record<string, any>
  static convertStyles(styles: Record<string, any>): Record<string, any>
}
