/**
 * OpenHTMLtoPDF CSS兼容性适配器
 * 将现代CSS转换为OpenHTMLtoPDF兼容的样式
 */
export class OpenHTMLtoPDFAdapter {
  /**
   * 转换Flex布局为Table布局
   */
  static convertFlexToTable(flexConfig) {
    const { direction = 'row', gap = 0, items = [] } = flexConfig
    
    if (direction === 'row') {
      return {
        display: 'table',
        width: '100%',
        borderCollapse: 'collapse',
        tableLayout: 'fixed'
      }
    } else {
      return {
        display: 'block'
      }
    }
  }

  /**
   * 转换Gap为Margin
   */
  static convertGapToMargin(gapValue, direction = 'horizontal') {
    if (direction === 'horizontal') {
      return { marginRight: `${gapValue}px` }
    } else {
      return { marginBottom: `${gapValue}px` }
    }
  }

  /**
   * 预计算宽度，避免calc()函数
   * 使用固定宽度，与预览模式保持一致
   */
  static preCalculateWidth(itemsPerRow, gap) {
    // 使用固定宽度，与预览模式的CSS保持一致
    // 预览模式使用 calc(20% - 0.8px)，这里使用20%
    // 不考虑实际items数量，始终使用配置的itemsPerRow宽度
    const itemWidth = 100 / itemsPerRow
    return `${itemWidth}%`
  }

  /**
   * 转换Flex属性为Table属性
   */
  static convertFlexItem(flexItem, index, total) {
    const { flex = 1, gap = 0 } = flexItem
    
    // 计算百分比宽度
    const flexValue = typeof flex === 'number' ? flex : 1
    const totalFlex = total * flexValue
    const width = (flexValue / totalFlex) * 100
    
    return {
      display: 'table-cell',
      width: `${width}%`,
      paddingRight: index < total - 1 ? `${gap}px` : '0',
      verticalAlign: 'top'
    }
  }

  /**
   * 转换现代CSS为OpenHTMLtoPDF兼容CSS
   */
  static convertStyles(styles) {
    const converted = { ...styles }
    
    // 转换display: flex
    if (converted.display === 'flex') {
      converted.display = 'table'
      converted.width = '100%'
      converted.borderCollapse = 'collapse'
      converted.tableLayout = 'fixed'
    }
    
    // 转换gap为margin
    if (converted.gap) {
      const gapValue = converted.gap
      delete converted.gap
      converted.marginRight = `${gapValue}px`
    }
    
    // 转换flex属性
    if (converted.flex) {
      delete converted.flex
      converted.width = '100%'
    }
    
    // 转换flexShrink
    if (converted.flexShrink) {
      delete converted.flexShrink
    }
    
    // 转换alignItems
    if (converted.alignItems) {
      delete converted.alignItems
      converted.verticalAlign = 'top'
    }
    
    return converted
  }
}