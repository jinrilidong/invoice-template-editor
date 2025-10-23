# BTDS Foundation 3.0 - 设计系统

## 概述

本项目采用了基于 BTDS Foundation 3.0 的完整设计系统，为发票模板编辑器提供了统一、可扩展的样式基础。设计系统基于 8px 网格系统，提供了完整的颜色、字体、间距、组件和动画规范。

## 文件结构

```
src/
├── assets/
│   ├── base.css          # CSS 变量和基础样式
│   └── main.css          # 全局样式和工具类
├── utils/
│   └── design-system.ts  # 设计系统工具函数
└── components/
    └── DesignSystemExample.vue  # 使用示例
```

## 核心特性

### 1. 8px 网格系统

所有间距都基于 8px 网格，确保视觉一致性：

```css
--spacing-1: 4px;   /* 0.5 * 8px */
--spacing-2: 8px;   /* 1 * 8px */
--spacing-4: 16px;  /* 2 * 8px */
--spacing-6: 24px;  /* 3 * 8px */
--spacing-8: 32px;  /* 4 * 8px */
```

### 2. 完整的颜色系统

#### 品牌颜色
- `brand-50` 到 `brand-990`：橙色渐变系统
- 主要品牌色：`#ff761f` (brand-500)

#### 语义颜色
- `primary`：主要文本颜色
- `secondary`：次要文本颜色
- `success`：成功状态
- `warning`：警告状态
- `error`：错误状态
- `info`：信息状态

#### 表面颜色
- `surface-primary`：主要背景
- `surface-secondary`：次要背景
- `surface-hover`：悬停状态

### 3. 字体系统

基于 Inter 字体家族，提供完整的字体大小和行高：

```css
--font-size-xs: 10px;
--font-size-sm: 11px;
--font-size-base: 12px;
--font-size-md: 14px;
--font-size-lg: 16px;
--font-size-xl: 18px;
--font-size-2xl: 20px;
--font-size-3xl: 24px;
```

### 4. 组件系统

#### 按钮组件
```vue
<!-- 主要按钮 -->
<button class="btn-base bg-brand-500 text-white px-4 py-2 rounded hover:bg-brand-600 transition">
  主要按钮
</button>

<!-- 次要按钮 -->
<button class="btn-base bg-cloudy-200 text-cloudy-900 px-4 py-2 rounded hover:bg-cloudy-300 transition">
  次要按钮
</button>

<!-- 轮廓按钮 -->
<button class="btn-base border border-brand-500 text-brand-500 px-4 py-2 rounded hover:bg-brand-50 transition">
  轮廓按钮
</button>
```

#### 输入框组件
```vue
<input 
  type="text" 
  class="input-base" 
  placeholder="请输入内容"
>
```

#### 卡片组件
```vue
<div class="card-base p-6">
  <div class="card-header text-lg font-semibold mb-3">卡片标题</div>
  <div class="card-content text-secondary mb-4">卡片内容</div>
  <div class="card-actions">
    <button class="btn-base text-brand-500 hover:bg-brand-50 px-3 py-1 rounded transition">
      操作按钮
    </button>
  </div>
</div>
```

### 5. 布局系统

#### 容器
```vue
<div class="container">标准容器 (1200px)</div>
<div class="container-sm">小容器 (640px)</div>
<div class="container-lg">大容器 (1600px)</div>
<div class="container-full">全宽容器</div>
```

#### 网格系统
```vue
<div class="grid-2 gap-4">2列网格</div>
<div class="grid-3 gap-4">3列网格</div>
<div class="grid-4 gap-4">4列网格</div>
<div class="grid-auto-fit gap-4">自适应网格</div>
```

#### Flexbox 工具
```vue
<div class="flex-center">居中对齐</div>
<div class="flex-between">两端对齐</div>
<div class="flex-start">左对齐</div>
<div class="flex-end">右对齐</div>
<div class="flex-col-center">垂直居中</div>
```

### 6. 间距工具类

#### 内边距
```vue
<div class="p-2">8px 内边距</div>
<div class="p-4">16px 内边距</div>
<div class="p-6">24px 内边距</div>
<div class="p-8">32px 内边距</div>
```

#### 外边距
```vue
<div class="m-2">8px 外边距</div>
<div class="m-4">16px 外边距</div>
<div class="m-6">24px 外边距</div>
<div class="m-8">32px 外边距</div>
```

#### 间距
```vue
<div class="gap-2">8px 间距</div>
<div class="gap-4">16px 间距</div>
<div class="gap-6">24px 间距</div>
<div class="gap-8">32px 间距</div>
```

### 7. 动画系统

#### 过渡动画
```vue
<div class="transition">基础过渡</div>
<div class="transition-fast">快速过渡</div>
<div class="transition-slow">慢速过渡</div>
```

#### 关键帧动画
```vue
<div class="animate-fade-in">淡入动画</div>
<div class="animate-slide-in">滑入动画</div>
<div class="animate-scale-in">缩放动画</div>
```

## 使用 TypeScript 工具函数

```typescript
import { 
  getSpacingClasses, 
  getColorClasses, 
  getComponentClasses,
  spacingUtils,
  layoutUtils 
} from '@/utils/design-system'

// 获取间距类
const spacing = getSpacingClasses('4') // { margin: 'm-4', padding: 'p-4', ... }

// 获取颜色类
const colors = getColorClasses('brand', '500') // { text: 'text-brand-500', ... }

// 获取组件类
const buttonClasses = getComponentClasses.button.primary

// 使用预设间距
const sectionSpacing = spacingUtils.section // 24px 间距
const componentSpacing = spacingUtils.component // 16px 间距

// 使用布局工具
const pageLayout = layoutUtils.page // 页面布局
const formLayout = layoutUtils.form // 表单布局
```

## 响应式设计

设计系统内置了响应式支持：

```css
/* 移动端 */
@media (max-width: 640px) {
  .grid-2, .grid-3, .grid-4 {
    grid-template-columns: 1fr;
  }
}

/* 平板端 */
@media (min-width: 641px) and (max-width: 1024px) {
  .grid-3, .grid-4 {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 桌面端 */
@media (min-width: 1025px) {
  .grid-4 {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

## 暗色模式支持

设计系统支持暗色模式，通过 CSS 变量自动切换：

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-text-primary: #ffffff;
    --color-surface-primary: #181818;
    --color-border-default: rgba(84, 84, 84, 0.48);
  }
}
```

## 最佳实践

### 1. 使用语义化类名
```vue
<!-- 推荐 -->
<div class="card-base p-6">
  <h3 class="text-lg font-semibold text-primary mb-3">标题</h3>
  <p class="text-secondary">内容</p>
</div>

<!-- 避免 -->
<div class="bg-white p-6 rounded-lg shadow-sm">
  <h3 class="text-lg font-semibold text-gray-900 mb-3">标题</h3>
  <p class="text-gray-600">内容</p>
</div>
```

### 2. 使用设计系统工具函数
```vue
<script setup>
import { spacingUtils, layoutUtils } from '@/utils/design-system'

// 使用预设间距
const sectionClasses = spacingUtils.section
const formClasses = layoutUtils.form
</script>

<template>
  <section :class="sectionClasses">
    <form :class="formClasses">
      <!-- 表单内容 -->
    </form>
  </section>
</template>
```

### 3. 保持一致性
- 始终使用 8px 网格系统
- 使用设计系统提供的颜色变量
- 遵循组件命名规范
- 使用统一的过渡动画

### 4. 性能优化
- 使用 CSS 变量而不是硬编码值
- 利用 Tailwind 的 JIT 编译
- 避免重复的样式定义

## 扩展指南

### 添加新颜色
```css
:root {
  --color-custom-500: #your-color;
}
```

### 添加新间距
```css
:root {
  --spacing-custom: 48px;
}
```

### 添加新组件
```typescript
export const getComponentClasses = {
  // 现有组件...
  customComponent: {
    base: 'custom-base-class',
    variant: 'custom-variant-class',
  }
}
```

## 示例组件

查看 `src/components/DesignSystemExample.vue` 文件，了解如何使用设计系统的各种功能。

## 总结

这个设计系统为发票模板编辑器提供了：

1. **一致性**：统一的视觉语言和交互模式
2. **可扩展性**：易于添加新组件和样式
3. **可维护性**：清晰的代码结构和文档
4. **性能**：优化的 CSS 和 TypeScript 工具
5. **响应式**：完整的移动端和桌面端支持
6. **可访问性**：符合 WCAG 标准的颜色对比度

通过使用这个设计系统，可以确保整个应用的视觉一致性和用户体验质量。
