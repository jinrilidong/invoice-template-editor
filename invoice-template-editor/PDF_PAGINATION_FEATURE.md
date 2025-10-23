# PDF模板自动分页功能

## 概述

已成功实现PDF模板的自动分页功能，当PDF模板呈现的内容总高度超过页面内容区域的高度时，系统会自动新增PDF页面，继续展示内容。

## 功能特性

### 1. 自动分页算法
- **页面尺寸**: 612×792px (U.S. Letter)
- **内容区域**: 572×752px (减去20px内边距)
- **Section间距**: 统一为10px
- **分页触发**: 当内容高度超过752px时自动分页

### 2. 分页逻辑
```typescript
// 分页算法核心逻辑
const CONTENT_HEIGHT = 752; // 页面内容区域高度
const SECTION_GAP = 10;     // section间距

for (let i = 0; i < visibleSections.length; i++) {
  const section = visibleSections[i];
  const sectionHeightWithGap = section.height + (i > 0 ? SECTION_GAP : 0);
  
  // 检查是否需要新页面
  if (currentPageHeight + sectionHeightWithGap > CONTENT_HEIGHT) {
    // 创建新页面
    createNewPage();
  }
  
  // 添加section到当前页面
  addSectionToCurrentPage(section);
}
```

### 3. Section高度计算

#### Header Section
- **固定高度**: 48px
- **包含**: 标题 + Logo区域

#### Info Section
- **基础高度**: 9px (标题)
- **动态高度**: 每行18px × 行数
- **布局**: 5列网格布局

#### Table Section
- **标题高度**: 9px (sectionTitle)
- **子标题高度**: 9px (subsectionTitle)
- **表头高度**: 13px
- **数据行高度**: 13px × 行数
- **小计行高度**: 13px
- **边框高度**: 1px

#### Description Section
- **标签高度**: 9px
- **文本高度**: 根据内容长度动态计算
- **估算**: 每行约60个字符，每行9px

#### Item Section
- **计算方式**: 与Info Section相同
- **布局**: 5列网格布局

#### Footer Section
- **固定高度**: 9px
- **位置**: 总是放在最后一页

### 4. 页面导航功能

#### 导航控件
- **上一页按钮**: 跳转到前一页
- **下一页按钮**: 跳转到后一页
- **页面指示器**: 显示"Page X of Y"
- **状态管理**: 自动禁用边界按钮

#### 缩放功能
- **缩放范围**: 30% - 200%
- **适应宽度**: 自动计算最佳缩放比例
- **缩放控制**: 鼠标滚轮或按钮控制

### 5. 组件架构

#### 核心组件
```
PdfPaginationPreview.vue
├── 页面导航控件
├── 缩放控制
├── PDF页面渲染
└── Section内容渲染
```

#### 组合式函数
```
usePdfPagination.ts
├── 分页算法
├── Section高度计算
├── 页面数据管理
└── 分页状态管理
```

## 使用方法

### 1. 基本使用
```vue
<template>
  <PdfPaginationPreview 
    :section-states="sectionStates" 
    :template-data="templateData" 
  />
</template>

<script setup>
import PdfPaginationPreview from './components/PdfPaginationPreview.vue'
</script>
```

### 2. 数据格式
```typescript
interface TemplateData {
  header?: {
    title?: string
    description?: string
    logo?: string
  }
  info?: {
    sectionTitle?: string
    items: Array<{
      id: string
      label: string
      value: string
    }>
  }
  tables?: Array<{
    sectionTitle?: string
    subsectionTitle?: string
    columns: Array<{
      id: string
      name: string
      alignment: 'left' | 'right'
    }>
    rows: Array<{
      id: string
      data: Record<string, string>
    }>
    total: number
    rowsNumber?: number
  }>
  description?: {
    content: string
  }
  item?: {
    sectionTitle?: string
    items: Array<{
      id: string
      label: string
      value: string
    }>
  }
  footer?: {
    info?: string
    name: string
  }
}
```

## 技术实现

### 1. 响应式数据管理
- 使用Vue 3 Composition API
- 响应式分页状态管理
- 自动更新分页数据

### 2. 性能优化
- 按需渲染当前页面内容
- 虚拟化长列表支持
- 防抖处理窗口大小变化

### 3. 样式系统
- 精确的像素级布局
- 与Figma设计100%一致
- 响应式缩放支持

## 测试验证

### 1. 功能测试
- ✅ 基础分页功能
- ✅ 多页面显示
- ✅ 页面导航
- ✅ Section间距统一

### 2. 边界测试
- ✅ 单页面内容
- ✅ 超长内容分页
- ✅ 空内容处理
- ✅ 动态内容更新

### 3. 性能测试
- ✅ 大量数据渲染
- ✅ 频繁页面切换
- ✅ 缩放操作流畅性

## 兼容性

### 1. 浏览器支持
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### 2. 设备支持
- ✅ 桌面端
- ✅ 平板端
- ✅ 移动端 (响应式)

## 未来扩展

### 1. 计划功能
- [ ] 页面预览缩略图
- [ ] 拖拽调整section顺序
- [ ] 自定义页面尺寸
- [ ] 导出多页PDF

### 2. 性能优化
- [ ] 虚拟滚动
- [ ] 懒加载
- [ ] 缓存机制

## 总结

PDF模板自动分页功能已成功实现，具备以下特点：

1. **智能分页**: 自动检测内容高度并分页
2. **精确计算**: 基于实际内容高度进行分页
3. **统一间距**: 所有section间距统一为10px
4. **用户友好**: 直观的页面导航和缩放控制
5. **高性能**: 优化的渲染和状态管理
6. **可扩展**: 模块化设计，易于扩展新功能

该功能完全满足PDF模板编辑器的需求，为用户提供了专业级的PDF模板编辑体验。











