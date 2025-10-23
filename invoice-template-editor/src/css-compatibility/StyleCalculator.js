import { OpenHTMLtoPDFAdapter } from './OpenHTMLtoPDFAdapter.js'

/**
 * 样式计算器
 * 为OpenHTMLtoPDF生成兼容的样式
 */
export class StyleCalculator {
  /**
   * 计算Info/Item Section的宽度
   */
  static calculateItemWidth(itemsPerRow, gap) {
    return OpenHTMLtoPDFAdapter.preCalculateWidth(itemsPerRow, gap)
  }

  /**
   * 计算H-Info Section的列宽度
   */
  static calculateHInfoColumnWidth(columnWidth) {
    switch (columnWidth) {
      case '1/3': return '33.33%'
      case '1/4': return '25%'
      case '1/2': 
      default: return '50%'
    }
  }

  /**
   * 计算间距
   */
  static calculateSpacing(gap, direction = 'horizontal') {
    return OpenHTMLtoPDFAdapter.convertGapToMargin(gap, direction)
  }

  /**
   * 生成兼容的Info Section样式
   */
  static generateInfoSectionStyles(styleConfig) {
    const itemsPerRow = styleConfig?.info?.itemsPerRow || 5
    const gap = styleConfig?.info?.itemGap ?? 2
    
    return {
      container: {
        display: 'table',
        width: '100%',
        borderCollapse: 'collapse',
        tableLayout: 'fixed'
      },
      item: {
        display: 'table-cell',
        width: this.calculateItemWidth(itemsPerRow, gap),
        paddingRight: `${gap}px`,
        verticalAlign: 'top'
      }
    }
  }

  /**
   * 生成兼容的Item Section样式
   */
  static generateItemSectionStyles(styleConfig) {
    const itemsPerRow = styleConfig?.item?.itemsPerRow || 5
    const gap = styleConfig?.item?.itemGap ?? 2
    
    return {
      container: {
        display: 'table',
        width: '100%',
        borderCollapse: 'collapse',
        tableLayout: 'fixed'
      },
      item: {
        display: 'table-cell',
        width: this.calculateItemWidth(itemsPerRow, gap),
        paddingRight: `${gap}px`,
        verticalAlign: 'top'
      }
    }
  }

  /**
   * 生成兼容的H-Info Section样式
   */
  static generateHInfoSectionStyles(styleConfig, hInfoConfig) {
    const columnsSpacing = styleConfig?.hInfo?.columnsSpacing || 8
    const itemGap = styleConfig?.hInfo?.itemGap || 4
    const labelValueGap = styleConfig?.hInfo?.labelValueGap || 8
    const labelWidth = styleConfig?.hInfo?.labelWidth || 80
    
    return {
      container: {
        display: 'table',
        width: '100%',
        borderCollapse: 'collapse',
        tableLayout: 'fixed'
      },
      column: {
        display: 'table-cell',
        width: this.calculateHInfoColumnWidth(hInfoConfig.columnWidth),
        paddingRight: `${columnsSpacing}px`,
        verticalAlign: 'top'
      },
      item: {
        display: 'block',
        marginBottom: `${itemGap}px`
      },
      itemContent: {
        display: 'table',
        width: '100%',
        borderCollapse: 'collapse',
        tableLayout: 'fixed'
      },
      label: {
        display: 'table-cell',
        width: `${labelWidth}px`,
        paddingRight: `${labelValueGap}px`,
        verticalAlign: 'top'
      },
      value: {
        display: 'table-cell',
        width: 'auto',
        verticalAlign: 'top'
      }
    }
  }
}
