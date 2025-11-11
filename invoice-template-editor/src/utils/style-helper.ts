import type {
  StyleConfig,
  InfoSectionStyle,
  TableSectionStyle,
  DescriptionSectionStyle,
  ItemSectionStyle,
  HInfoSectionStyle,
} from '@/types/style'

/**
 * 获取 Info Section 的样式配置
 * 如果指定索引的样式不存在，返回默认样式或第一个可用的样式
 */
export function getInfoStyle(
  styleConfig: StyleConfig,
  index: number,
): InfoSectionStyle | undefined {
  // 优先使用指定索引的样式
  if (styleConfig.info[index]) {
    return styleConfig.info[index]
  }
  // 如果没有，尝试使用索引 0 的样式（向后兼容）
  if (styleConfig.info[0]) {
    return styleConfig.info[0]
  }
  // 如果都没有，返回第一个可用的样式
  const firstKey = Object.keys(styleConfig.info)[0]
  if (firstKey !== undefined) {
    return styleConfig.info[Number(firstKey)]
  }
  return undefined
}

/**
 * 获取 Table Section 的样式配置
 */
export function getTableStyle(
  styleConfig: StyleConfig,
  index: number,
): TableSectionStyle | undefined {
  if (styleConfig.table[index]) {
    return styleConfig.table[index]
  }
  if (styleConfig.table[0]) {
    return styleConfig.table[0]
  }
  const firstKey = Object.keys(styleConfig.table)[0]
  if (firstKey !== undefined) {
    return styleConfig.table[Number(firstKey)]
  }
  return undefined
}

/**
 * 获取 Description Section 的样式配置
 */
export function getDescriptionStyle(
  styleConfig: StyleConfig,
  index: number,
): DescriptionSectionStyle | undefined {
  if (styleConfig.description[index]) {
    return styleConfig.description[index]
  }
  if (styleConfig.description[0]) {
    return styleConfig.description[0]
  }
  const firstKey = Object.keys(styleConfig.description)[0]
  if (firstKey !== undefined) {
    return styleConfig.description[Number(firstKey)]
  }
  return undefined
}

/**
 * 获取 Item Section 的样式配置
 */
export function getItemStyle(
  styleConfig: StyleConfig,
  index: number,
): ItemSectionStyle | undefined {
  if (styleConfig.item[index]) {
    return styleConfig.item[index]
  }
  if (styleConfig.item[0]) {
    return styleConfig.item[0]
  }
  const firstKey = Object.keys(styleConfig.item)[0]
  if (firstKey !== undefined) {
    return styleConfig.item[Number(firstKey)]
  }
  return undefined
}

/**
 * 获取 H-Info Section 的样式配置
 */
export function getHInfoStyle(
  styleConfig: StyleConfig,
  index: number,
): HInfoSectionStyle | undefined {
  if (styleConfig.hInfo[index]) {
    return styleConfig.hInfo[index]
  }
  if (styleConfig.hInfo[0]) {
    return styleConfig.hInfo[0]
  }
  const firstKey = Object.keys(styleConfig.hInfo)[0]
  if (firstKey !== undefined) {
    return styleConfig.hInfo[Number(firstKey)]
  }
  return undefined
}

/**
 * 创建默认的 Info Section 样式
 */
export function createDefaultInfoStyle(): InfoSectionStyle {
  return {
    sectionTitleColor: '#6b7280',
    sectionTitleWeight: 'bold',
    sectionTitleSize: 7,
    sectionTitleBottomMargin: 2,
    labelColor: '#000000',
    labelWeight: 'bold',
    labelSize: 7,
    valueColor: '#919191',
    valueWeight: 'normal',
    valueSize: 7,
    itemGap: 2,
    itemsPerRow: 5,
    itemsSpacing: 4,
    labelValueGap: 2,
    topMargin: 10,
  }
}

/**
 * 创建默认的 Table Section 样式
 */
export function createDefaultTableStyle(): TableSectionStyle {
  return {
    sectionTitleColor: '#6b7280',
    sectionTitleWeight: 'bold',
    sectionTitleSize: 7,
    sectionTitleBottomMargin: 2,
    subsectionTitleColor: '#000000',
    subsectionTitleWeight: 'bold',
    subsectionTitleSize: 7,
    subsectionTitleBottomMargin: 2,
    headerColor: '#919191',
    columnNameWeight: 'bold',
    columnNameSize: 7,
    rowTextColor: '#000000',
    rowTextSize: 7,
    borderColor: '#d2d2d2',
    rowHeight: 13,
    rowSpacing: 2,
    columnsPadding: 4,
    subtotalOffset: 0,
    topMargin: 10,
  }
}

/**
 * 创建默认的 Description Section 样式
 */
export function createDefaultDescriptionStyle(): DescriptionSectionStyle {
  return {
    labelColor: '#000000',
    labelWeight: 'bold',
    labelSize: 7,
    labelBottomMargin: 2,
    textColor: '#919191',
    textWeight: 'normal',
    textSize: 7,
    lineHeight: 1.2,
    topMargin: 10,
  }
}

/**
 * 创建默认的 Item Section 样式
 */
export function createDefaultItemStyle(): ItemSectionStyle {
  return {
    sectionTitleColor: '#6b7280',
    sectionTitleWeight: 'bold',
    sectionTitleSize: 7,
    sectionTitleBottomMargin: 2,
    labelColor: '#000000',
    labelWeight: 'bold',
    labelSize: 7,
    valueColor: '#919191',
    valueWeight: 'normal',
    valueSize: 7,
    itemGap: 2,
    itemsPerRow: 5,
    itemsSpacing: 4,
    labelValueGap: 2,
    topMargin: 10,
  }
}

/**
 * 创建默认的 H-Info Section 样式
 */
export function createDefaultHInfoStyle(): HInfoSectionStyle {
  return {
    sectionTitleColor: '#6b7280',
    sectionTitleWeight: 'bold',
    sectionTitleSize: 7,
    sectionTitleBottomMargin: 2,
    labelColor: '#000000',
    labelWeight: 'bold',
    labelSize: 7,
    valueColor: '#919191',
    valueWeight: 'normal',
    valueSize: 7,
    labelWidth: 80,
    labelValueGap: 8,
    itemGap: 4,
    columnsPadding: 8,
    topMargin: 10,
  }
}

/**
 * 复制样式配置（深拷贝）
 */
export function cloneStyle<T>(style: T): T {
  return JSON.parse(JSON.stringify(style))
}

