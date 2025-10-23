import { ref, computed, nextTick } from 'vue'

export interface SectionData {
  id: string
  type: 'header' | 'info' | 'table' | 'description' | 'item' | 'hInfo' | 'footer'
  content: any
  height: number
  isVisible: boolean
}

export interface PageData {
  id: string
  sections: SectionData[]
  totalHeight: number
  pageNumber: number
}

export function usePdfPagination() {
  const pages = ref<PageData[]>([])
  const currentPage = ref(1)
  const totalPages = computed(() => pages.value.length)
  
  // PDF页面尺寸常量
  const PAGE_WIDTH = 612
  const PAGE_HEIGHT = 792
  const PAGE_PADDING = 24
  const CONTENT_WIDTH = PAGE_WIDTH - (PAGE_PADDING * 2) // 564px
  const CONTENT_HEIGHT = 727 // 固定高度727px
  const SECTION_GAP = 10 // 10px section间距
  
  // 拆分table section的函数
  const splitTableSection = (section: SectionData, currentPageHeight: number, contentHeight: number) => {
    const table = section.content
    const availableHeight = contentHeight - currentPageHeight
    
    // 计算table各部分的高度
    let titleHeight = 0
    let subtitleHeight = 0
    let headerHeight = 13
    let rowHeight = 13
    let subtotalHeight = 13
    let borderHeight = 1
    
    if (table.sectionTitle) titleHeight = 9
    if (table.subsectionTitle) subtitleHeight = 9
    
    // 计算第一部分可以包含多少行（包含标题、副标题、表头）
    let firstPartRows = 0
    let firstPartHeight = titleHeight + subtitleHeight + headerHeight
    
    const rowsNumber = table.rowsNumber || 2
    for (let i = 0; i < rowsNumber; i++) {
      // 任何元素超过分割线20px就切到下一页
      if (firstPartHeight + rowHeight <= availableHeight - 20) {
        firstPartRows++
        firstPartHeight += rowHeight
      } else {
        break
      }
    }
    
    // 如果第一部分可以包含所有行，则不需要拆分
    if (firstPartRows >= rowsNumber) {
      return {
        firstPart: section,
        firstPartHeight: section.height,
        secondPart: null,
        secondPartHeight: 0
      }
    }
    
    // 创建第一部分（包含标题、子标题、表头、部分数据行）
    const firstPart = {
      ...section,
      id: `${section.id}-part1`,
      content: {
        ...table,
        rowsNumber: firstPartRows,
        isFirstPart: true,
        showHeader: true, // 显示标题、副标题、表头
        showSubtotal: false, // 不显示小计和边框
        showBorder: false
      },
      height: firstPartHeight
    }
    
    // 创建第二部分（只包含剩余数据行，不显示标题、副标题、表头、小计、边框）
    const secondPartRows = rowsNumber - firstPartRows
    const secondPartHeight = secondPartRows * rowHeight
    
    const secondPart = {
      ...section,
      id: `${section.id}-part2`,
      content: {
        ...table,
        rowsNumber: secondPartRows,
        isSecondPart: true,
        startRowIndex: firstPartRows,
        showHeader: false, // 不显示标题、副标题、表头
        showSubtotal: true, // 显示小计和边框（因为这是最后一部分）
        showBorder: true
      },
      height: secondPartHeight + subtotalHeight + borderHeight
    }
    
    return {
      firstPart: firstPart as SectionData,
      firstPartHeight: firstPartHeight,
      secondPart: secondPart as SectionData,
      secondPartHeight: secondPartHeight + subtotalHeight + borderHeight
    }
  }

  // 计算section间距的函数 - 简化逻辑
  const calculateSectionGap = (currentSection: any, prevSection: any, styleConfig?: any): number => {
    // 特殊规则：Summary 和 Table 之间使用专门的 summaryGap
    if ((currentSection?.content?.type === 'summary' && prevSection?.type === 'table') ||
        (currentSection?.type === 'table' && prevSection?.content?.type === 'summary')) {
      return styleConfig?.summaryGap || 0 // Summary 和 Table 之间的专门间距
    }
    
    // 相同类型 section 间距
    if (currentSection?.type === prevSection?.type) {
      return styleConfig?.sameTypeSectionGap || 8 // 相同类型section间距
    }
    
    // 不同类型 section 间距（包括 Summary 和其他 section 类型）
    return styleConfig?.sectionGap || 10 // 不同类型section间距
  }

  // 检查是否是相同类型 - 简化逻辑
  const isSameType = (currentSection: any, prevSection: any): boolean => {
    return currentSection?.type === prevSection?.type
  }

  // 计算section高度的函数
  const calculateSectionHeight = (section: any, type: string): number => {
    let height = 0
    
    switch (type) {
      case 'header':
        height = 48 // 固定高度 48px
        break
        
      case 'info':
        // 基础高度：标题 + 内容
        height = 9 // 标题高度
        if (section.items && section.items.length > 0) {
          const itemsPerRow = 5
          const rows = Math.ceil(section.items.length / itemsPerRow)
          height += rows * 18 // 每行18px
        }
        break
        
      case 'table':
        // 表格高度计算
        height = 0
        if (section.sectionTitle) height += 9 // 标题高度
        if (section.subsectionTitle) height += 9 // 子标题高度
        
        // 表头高度
        height += 13 // 表头行高度
        
        // 数据行高度
        const rowsNumber = section.rowsNumber || 2
        height += rowsNumber * 13 // 每行13px
        
        // 小计行高度
        height += 13 // 小计行高度
        
        // 底部边框
        height += 1
        
        break
        
      case 'description':
        // 描述section高度
        height = 9 // 标签高度
        if (section.content) {
          // 估算文本高度（每行约9px，每行约60个字符）
          const textLength = section.content.length
          const charsPerLine = 60
          const lines = Math.ceil(textLength / charsPerLine)
          height += lines * 9
        }
        break
        
      case 'item':
        // Item section高度计算（类似info section）
        height = 9 // 标题高度
        if (section.items && section.items.length > 0) {
          const itemsPerRow = 5
          const rows = Math.ceil(section.items.length / itemsPerRow)
          height += rows * 20 // 每行20px
        }
        break
        
      case 'footer':
        height = 9 // 固定高度 9px
        break
        
      default:
        height = 20 // 默认高度
    }
    
    return height
  }

  // 计算 Info section 高度
  const calculateInfoSectionHeight = (infoSection: any): number => {
    let height = 0
    if (infoSection.sectionTitle) {
      height += 9 // 标题高度
    }
    if (infoSection.items && infoSection.items.length > 0) {
      const itemsPerRow = 5
      const rows = Math.ceil(infoSection.items.length / itemsPerRow)
      height += rows * 18 // 每行18px
    }
    return height
  }

  // 计算 Item section 高度
  const calculateItemSectionHeight = (itemSection: any): number => {
    let height = 0
    if (itemSection.sectionTitle) {
      height += 9 // 标题高度
    }
    if (itemSection.items && itemSection.items.length > 0) {
      const itemsPerRow = 5
      const rows = Math.ceil(itemSection.items.length / itemsPerRow)
      height += rows * 20 // 每行20px
    }
    return height
  }
  
  // 生成分页数据
  const generatePages = (templateData: any, sectionStates: any, styleConfig?: any): PageData[] => {
    const newPages: PageData[] = []
    let currentPageSections: SectionData[] = []
    let currentPageHeight = 0
    let pageNumber = 1
    
    // 收集所有可见的sections
    const visibleSections: SectionData[] = []
    
    // Header Section
    if (sectionStates.header && templateData.header) {
      visibleSections.push({
        id: 'header',
        type: 'header',
        content: templateData.header,
        height: calculateSectionHeight(templateData.header, 'header'),
        isVisible: true
      })
    }
    
    // Info Sections - 每个 info section 作为一个完整的 section block
    if (sectionStates.info && templateData.info) {
      templateData.info.forEach((infoSection: any, infoIndex: number) => {
        visibleSections.push({
          id: `info-${infoIndex}`,
          type: 'info',
          content: infoSection, // 完整的数据，包含 sectionTitle 和 items
          height: calculateInfoSectionHeight(infoSection),
          isVisible: true
        })
      })
    }
    
    // H-Info Sections - 在 Table Section 之前
    if (sectionStates.hInfo && templateData.hInfo) {
      templateData.hInfo.forEach((hInfoSection: any, hInfoIndex: number) => {
        // 计算 hInfo section 的总高度
        let totalHeight = 0
        
        // 标题高度
        if (hInfoSection.sectionTitle) {
          totalHeight += 9 // 标题高度
        }
        
        // 计算列和项目的高度
        if (hInfoSection.columns && hInfoSection.columns.length > 0) {
          // 找到最大列的项目数
          const maxItems = Math.max(...hInfoSection.columns.map((col: any) => col.items?.length || 0))
          if (maxItems > 0) {
            totalHeight += maxItems * 18 // 每行18px
          }
        }
        
        // 如果没有内容，给一个最小高度
        if (totalHeight === 0) {
          totalHeight = 18
        }
        
        visibleSections.push({
          id: `h-info-${hInfoIndex}`,
          type: 'hInfo', // 使用 'hInfo' 类型，与渲染条件匹配
          content: hInfoSection,
          height: totalHeight,
          isVisible: true
        })
      })
    }
    
    // Table Sections
    if (sectionStates.table && templateData.tables) {
      templateData.tables.forEach((table: any, index: number) => {
        visibleSections.push({
          id: `table-${index}`,
          type: 'table',
          content: table,
          height: calculateSectionHeight(table, 'table'),
          isVisible: true
        })
      })
    }
    
    // Summary Section (如果table section存在)
    if (sectionStates.table && templateData.tables && templateData.tables.length > 0) {
      visibleSections.push({
        id: 'summary',
        type: 'table', // 使用table类型，因为它是table的一部分
        content: { type: 'summary' },
        height: 17, // 固定高度
        isVisible: true
      })
    }
    
    // Description Sections - 处理多个 description section
    if (sectionStates.description && templateData.description) {
      templateData.description.forEach((descriptionSection: any, descIndex: number) => {
        visibleSections.push({
          id: `description-${descIndex}`,
          type: 'description',
          content: descriptionSection,
          height: calculateSectionHeight(descriptionSection, 'description'),
          isVisible: true
        })
      })
    }
    
    // Item Sections - 每个 item section 作为一个完整的 section block
    if (sectionStates.item && templateData.item) {
      templateData.item.forEach((itemSection: any, itemIndex: number) => {
        visibleSections.push({
          id: `item-${itemIndex}`,
          type: 'item',
          content: itemSection, // 完整的数据，包含 sectionTitle 和 items
          height: calculateItemSectionHeight(itemSection),
          isVisible: true
        })
      })
    }
    
    // 获取footer section（单独处理，不参与分页）
    const footerSection = sectionStates.footer && templateData.footer ? {
      id: 'footer',
      type: 'footer',
      content: templateData.footer,
      height: calculateSectionHeight(templateData.footer, 'footer'),
      isVisible: true
    } : null
    
    // 分页逻辑（只对非footer内容进行分页）
    for (let i = 0; i < visibleSections.length; i++) {
      const section = visibleSections[i]
      
      // 计算间距：支持相同类型和不同类型section的间距配置
      let gap = 0
      if (i > 0) {
        const prevSection = visibleSections[i - 1]
        
        // 计算间距：支持相同类型和不同类型section的间距配置
        gap = calculateSectionGap(section, prevSection, styleConfig)
      }
      
      const sectionHeightWithGap = (section?.height || 0) + gap
      
      // 检查是否需要新页面 - 任何元素超过分割线20px就切到下一页
      if (currentPageHeight + sectionHeightWithGap > CONTENT_HEIGHT - 20) {
        // 如果是table section，尝试拆分
        if (section?.type === 'table' && section?.content?.type !== 'summary') {
          const splitResult = splitTableSection(section, currentPageHeight, CONTENT_HEIGHT)
          
          if (splitResult.firstPart) {
            // 添加第一部分到当前页面
            currentPageSections.push(splitResult.firstPart)
            currentPageHeight += splitResult.firstPartHeight + gap
          }
          
          // 保存当前页面（添加footer到每一页）
          if (currentPageSections.length > 0) {
            const pageSections = [...currentPageSections]
            if (footerSection) {
              pageSections.push(footerSection as SectionData)
            }
            newPages.push({
              id: `page-${pageNumber}`,
              sections: pageSections,
              totalHeight: currentPageHeight,
              pageNumber: pageNumber
            })
          }
          
          // 开始新页面
          pageNumber++
          currentPageSections = []
          currentPageHeight = 0
          
          // 添加第二部分到新页面
          if (splitResult.secondPart) {
            currentPageSections.push(splitResult.secondPart)
            currentPageHeight += splitResult.secondPartHeight
          }
        } else {
          // 非table section，正常分页
          // 保存当前页面（添加footer到每一页）
          if (currentPageSections.length > 0) {
            const pageSections = [...currentPageSections]
            if (footerSection) {
              pageSections.push(footerSection as SectionData)
            }
            newPages.push({
              id: `page-${pageNumber}`,
              sections: pageSections,
              totalHeight: currentPageHeight,
              pageNumber: pageNumber
            })
          }
          
          // 开始新页面
          pageNumber++
          currentPageSections = []
          currentPageHeight = 0
          
          // 添加section到新页面
          if (section) {
            currentPageSections.push(section)
            currentPageHeight += sectionHeightWithGap
          }
        }
      } else {
        // 添加section到当前页面
        if (section) {
          currentPageSections.push(section)
          currentPageHeight += sectionHeightWithGap
        }
      }
    }
    
    // 添加最后一页（添加footer）
    if (currentPageSections.length > 0) {
      const pageSections = [...currentPageSections]
      if (footerSection) {
        pageSections.push(footerSection as SectionData)
      }
      newPages.push({
        id: `page-${pageNumber}`,
        sections: pageSections,
        totalHeight: currentPageHeight,
        pageNumber: pageNumber
      })
    }
    
    return newPages
  }
  
  // 更新分页
  const updatePagination = (templateData: any, sectionStates: any, styleConfig?: any) => {
    const oldPages = pages.value
    const oldCurrentPage = currentPage.value
    
    pages.value = generatePages(templateData, sectionStates, styleConfig)
    
    // 只有在以下情况下才重置到第一页：
    // 1. 没有页面了
    // 2. 当前页面超出了新的总页数
    if (pages.value.length === 0) {
      currentPage.value = 1
    } else if (oldCurrentPage > pages.value.length) {
      currentPage.value = pages.value.length
    }
    // 否则保持当前页面不变
  }
  
  // 获取指定页面的sections
  const getPageSections = (pageNumber: number): SectionData[] => {
    const page = pages.value.find(p => p.pageNumber === pageNumber)
    return page ? page.sections : []
  }
  
  // 检查section是否在指定页面
  const isSectionInPage = (sectionId: string, pageNumber: number): boolean => {
    const pageSections = getPageSections(pageNumber)
    return pageSections.some(section => section.id === sectionId)
  }
  
  // 获取section所在的页面号
  const getSectionPageNumber = (sectionId: string): number => {
    for (const page of pages.value) {
      if (page.sections.some(section => section.id === sectionId)) {
        return page.pageNumber
      }
    }
    return 1
  }
  
  return {
    pages: computed(() => pages.value),
    currentPage,
    totalPages,
    updatePagination,
    getPageSections,
    isSectionInPage,
    getSectionPageNumber,
    PAGE_WIDTH,
    PAGE_HEIGHT,
    CONTENT_WIDTH,
    CONTENT_HEIGHT,
    SECTION_GAP
  }
}
