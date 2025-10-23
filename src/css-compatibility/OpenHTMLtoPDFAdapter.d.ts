export declare class OpenHTMLtoPDFAdapter {
  static convertFlexToTable(flexConfig: any): any;
  static convertGapToMargin(gapValue: number, direction?: string): any;
  static preCalculateWidth(itemsPerRow: number, gap: number): string;
  static convertFlexItem(flexItem: any, index: number, total: number): any;
  static convertStyles(styles: any): any;
}