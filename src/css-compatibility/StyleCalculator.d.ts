export declare class StyleCalculator {
  static calculateItemWidth(itemsPerRow: number, gap: number): string;
  static calculateHInfoColumnWidth(columnWidth: string): string;
  static calculateSpacing(gap: number, direction?: string): any;
  static generateInfoSectionStyles(styleConfig: any): any;
  static generateItemSectionStyles(styleConfig: any): any;
  static generateHInfoSectionStyles(styleConfig: any, hInfoConfig: any): any;
}