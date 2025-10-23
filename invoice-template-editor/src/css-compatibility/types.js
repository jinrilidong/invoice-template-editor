/**
 * OpenHTMLtoPDF兼容性类型定义
 */
export const OpenHTMLtoPDFCompatibility = {
  // 支持的CSS属性
  SUPPORTED_PROPERTIES: [
    'display', 'width', 'height', 'margin', 'padding',
    'border', 'borderCollapse', 'tableLayout', 'verticalAlign',
    'textAlign', 'fontSize', 'fontWeight', 'color', 'lineHeight',
    'whiteSpace', 'overflow', 'textOverflow', 'wordWrap'
  ],
  
  // 不支持的CSS属性
  UNSUPPORTED_PROPERTIES: [
    'flex', 'flexDirection', 'flexWrap', 'justifyContent', 'alignItems',
    'gap', 'grid', 'transform', 'position', 'zIndex', 'boxShadow'
  ],
  
  // 需要转换的属性映射
  CONVERSION_MAP: {
    'display: flex': 'display: table',
    'gap': 'marginRight/marginBottom',
    'flex: 1': 'width: 100%',
    'alignItems: flex-start': 'verticalAlign: top'
  }
}