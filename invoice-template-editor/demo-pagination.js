// PDF模板自动分页功能演示脚本
// 这个脚本演示了分页算法的核心逻辑

console.log('🚀 PDF模板自动分页功能演示');
console.log('=====================================');

// 页面尺寸常量
const PAGE_WIDTH = 612;
const PAGE_HEIGHT = 792;
const PAGE_PADDING = 20;
const CONTENT_WIDTH = PAGE_WIDTH - (PAGE_PADDING * 2); // 572px
const CONTENT_HEIGHT = PAGE_HEIGHT - (PAGE_PADDING * 2); // 752px
const SECTION_GAP = 10; // 10px section间距

console.log(`📏 页面尺寸: ${PAGE_WIDTH}×${PAGE_HEIGHT}px`);
console.log(`📦 内容区域: ${CONTENT_WIDTH}×${CONTENT_HEIGHT}px`);
console.log(`📐 Section间距: ${SECTION_GAP}px`);

// Section高度计算函数
function calculateSectionHeight(section, type) {
  let height = 0;
  
  switch (type) {
    case 'header':
      height = 48; // 固定高度 48px
      break;
      
    case 'info':
      height = 9; // 标题高度
      if (section.items && section.items.length > 0) {
        const itemsPerRow = 5;
        const rows = Math.ceil(section.items.length / itemsPerRow);
        height += rows * 18; // 每行18px
      }
      break;
      
    case 'table':
      height = 0;
      if (section.sectionTitle) height += 9; // 标题高度
      if (section.subsectionTitle) height += 9; // 子标题高度
      height += 13; // 表头高度
      const rowsNumber = section.rowsNumber || 2;
      height += rowsNumber * 13; // 数据行高度
      height += 13; // 小计行高度
      height += 1; // 底部边框
      break;
      
    case 'description':
      height = 9; // 标签高度
      if (section.content) {
        const textLength = section.content.length;
        const charsPerLine = 60;
        const lines = Math.ceil(textLength / charsPerLine);
        height += lines * 9;
      }
      break;
      
    case 'item':
      height = 9; // 标题高度
      if (section.items && section.items.length > 0) {
        const itemsPerRow = 5;
        const rows = Math.ceil(section.items.length / itemsPerRow);
        height += rows * 18; // 每行18px
      }
      break;
      
    case 'footer':
      height = 9; // 固定高度 9px
      break;
      
    default:
      height = 20; // 默认高度
  }
  
  return height;
}

// 模拟模板数据
const templateData = {
  header: {
    title: 'Invoice Template',
    description: 'Professional invoice template',
    logo: null
  },
  info: {
    sectionTitle: 'Invoice Information',
    items: [
      { id: '1', label: 'Invoice #', value: 'INV-001' },
      { id: '2', label: 'Date', value: '2024-01-15' },
      { id: '3', label: 'Due Date', value: '2024-02-15' },
      { id: '4', label: 'Client', value: 'ABC Company' },
      { id: '5', label: 'Amount', value: '$1,000.00' }
    ]
  },
  tables: [
    {
      id: 'table1',
      sectionTitle: 'Services',
      subsectionTitle: 'Professional Services',
      columns: [
        { id: 'desc', name: 'Description', alignment: 'left' },
        { id: 'qty', name: 'Quantity', alignment: 'right' },
        { id: 'rate', name: 'Rate', alignment: 'right' },
        { id: 'amount', name: 'Amount', alignment: 'right' }
      ],
      rows: [
        { id: '1', data: { desc: 'Web Development', qty: '10', rate: '$100.00', amount: '$1,000.00' } },
        { id: '2', data: { desc: 'Design Services', qty: '5', rate: '$80.00', amount: '$400.00' } }
      ],
      total: 1400,
      rowsNumber: 2
    }
  ],
  description: {
    content: 'Thank you for your business. Payment is due within 30 days of invoice date. Please contact us if you have any questions about this invoice.'
  },
  item: {
    sectionTitle: 'Additional Information',
    items: [
      { id: '1', label: 'Tax ID', value: '12-3456789' },
      { id: '2', label: 'Payment Terms', value: 'Net 30' },
      { id: '3', label: 'Contact', value: 'info@company.com' }
    ]
  },
  footer: {
    info: 'Thank you for your business!',
    name: 'Your Company Name'
  }
};

// 模拟section状态
const sectionStates = {
  header: true,
  info: true,
  table: true,
  description: true,
  item: true,
  footer: true
};

console.log('\n📊 分析模板数据:');
console.log('==================');

// 计算所有sections的高度
const sections = [];
let totalHeight = 0;

// Header Section
if (sectionStates.header && templateData.header) {
  const height = calculateSectionHeight(templateData.header, 'header');
  sections.push({ id: 'header', type: 'header', height });
  totalHeight += height;
  console.log(`📋 Header Section: ${height}px`);
}

// Info Section
if (sectionStates.info && templateData.info) {
  const height = calculateSectionHeight(templateData.info, 'info');
  sections.push({ id: 'info', type: 'info', height });
  totalHeight += height + SECTION_GAP;
  console.log(`📋 Info Section: ${height}px`);
}

// Table Sections
if (sectionStates.table && templateData.tables) {
  templateData.tables.forEach((table, index) => {
    const height = calculateSectionHeight(table, 'table');
    sections.push({ id: `table-${index}`, type: 'table', height });
    totalHeight += height + SECTION_GAP;
    console.log(`📋 Table Section ${index + 1}: ${height}px`);
  });
  
  // Summary Section
  sections.push({ id: 'summary', type: 'summary', height: 17 });
  totalHeight += 17 + SECTION_GAP;
  console.log(`📋 Summary Section: 17px`);
}

// Description Section
if (sectionStates.description && templateData.description) {
  const height = calculateSectionHeight(templateData.description, 'description');
  sections.push({ id: 'description', type: 'description', height });
  totalHeight += height + SECTION_GAP;
  console.log(`📋 Description Section: ${height}px`);
}

// Item Section
if (sectionStates.item && templateData.item) {
  const height = calculateSectionHeight(templateData.item, 'item');
  sections.push({ id: 'item', type: 'item', height });
  totalHeight += height + SECTION_GAP;
  console.log(`📋 Item Section: ${height}px`);
}

// Footer Section
if (sectionStates.footer && templateData.footer) {
  const height = calculateSectionHeight(templateData.footer, 'footer');
  sections.push({ id: 'footer', type: 'footer', height });
  totalHeight += height + SECTION_GAP;
  console.log(`📋 Footer Section: ${height}px`);
}

console.log(`\n📏 总内容高度: ${totalHeight}px`);
console.log(`📦 页面内容高度: ${CONTENT_HEIGHT}px`);

// 分页算法
console.log('\n🔄 执行分页算法:');
console.log('==================');

const pages = [];
let currentPageSections = [];
let currentPageHeight = 0;
let pageNumber = 1;

for (let i = 0; i < sections.length; i++) {
  const section = sections[i];
  const sectionHeightWithGap = section.height + (i > 0 ? SECTION_GAP : 0);
  
  console.log(`\n检查 Section: ${section.id} (${section.height}px + ${i > 0 ? SECTION_GAP : 0}px gap)`);
  console.log(`当前页面高度: ${currentPageHeight}px`);
  console.log(`添加后高度: ${currentPageHeight + sectionHeightWithGap}px`);
  
  // 检查是否需要新页面
  if (currentPageHeight + sectionHeightWithGap > CONTENT_HEIGHT) {
    console.log(`⚠️  需要新页面! (${currentPageHeight + sectionHeightWithGap}px > ${CONTENT_HEIGHT}px)`);
    
    // 保存当前页面
    if (currentPageSections.length > 0) {
      pages.push({
        id: `page-${pageNumber}`,
        sections: [...currentPageSections],
        totalHeight: currentPageHeight,
        pageNumber: pageNumber
      });
      console.log(`✅ 创建页面 ${pageNumber}: ${currentPageSections.length} 个sections, 总高度 ${currentPageHeight}px`);
    }
    
    // 开始新页面
    pageNumber++;
    currentPageSections = [];
    currentPageHeight = 0;
  }
  
  // 添加section到当前页面
  currentPageSections.push(section);
  currentPageHeight += sectionHeightWithGap;
  console.log(`✅ 添加到页面 ${pageNumber}: ${section.id}`);
}

// 添加最后一页
if (currentPageSections.length > 0) {
  pages.push({
    id: `page-${pageNumber}`,
    sections: [...currentPageSections],
    totalHeight: currentPageHeight,
    pageNumber: pageNumber
  });
  console.log(`✅ 创建页面 ${pageNumber}: ${currentPageSections.length} 个sections, 总高度 ${currentPageHeight}px`);
}

console.log('\n📄 分页结果:');
console.log('=============');
console.log(`总页数: ${pages.length}`);

pages.forEach((page, index) => {
  console.log(`\n📄 页面 ${page.pageNumber}:`);
  console.log(`   Sections: ${page.sections.map(s => s.id).join(', ')}`);
  console.log(`   总高度: ${page.totalHeight}px`);
  console.log(`   剩余空间: ${CONTENT_HEIGHT - page.totalHeight}px`);
});

console.log('\n🎉 分页算法演示完成!');
console.log('=====================');

// 导出结果供其他模块使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    pages,
    sections,
    totalHeight,
    CONTENT_HEIGHT,
    SECTION_GAP
  };
}











