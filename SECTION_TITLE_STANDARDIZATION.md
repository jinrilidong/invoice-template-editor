# Section Title 样式标准化

## 概述

为了统一管理所有section的title样式，创建了SectionTitle组件来标准化所有section的标题显示。

## 设计规范

### Section Title 样式要求
- **字号**: `heading-lg` (使用CSS变量 `--font-size-2xl`)
- **字体颜色**: `text-primary` (使用CSS变量 `--color-text-primary`)
- **上下边距**: 16px
- **按钮样式**: 使用 `TextButton` 组件
- **按钮间距**: 8px

## 组件结构

### SectionTitle.vue
```vue
<template>
  <div class="section-title-container">
    <h3 class="section-title heading-lg text-primary">
      {{ title }}
    </h3>
    <div v-if="$slots.actions" class="section-actions">
      <slot name="actions" />
    </div>
  </div>
</template>
```

### 样式定义
```css
.section-title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0; /* 上下边距16px */
  width: 100%;
}

.section-title {
  margin: 0;
  flex: 1;
}

.section-actions {
  display: flex;
  align-items: center;
  gap: 8px; /* 按钮间距8px */
  flex-shrink: 0;
}
```

## 配置面板的Section结构

### 1. Section Control
- **位置**: PdfConfigPanel.vue
- **标题**: "Section Control"
- **按钮**: 无
- **实现**: 直接使用 `<SectionTitle title="Section Control" />`

### 2. Header Section
- **位置**: PdfHeaderSection.vue
- **标题**: "Header Section"
- **按钮**: 无
- **实现**: 通过 `UnifiedSection` 组件自动使用 `SectionTitle`

### 3. Info Section
- **位置**: PdfInfoSection.vue
- **标题**: "Info Section"
- **按钮**: "Add Item" (TextButton, primary variant, sm size)
- **实现**: 直接使用 `SectionTitle` 组件

### 4. Table Section
- **位置**: PdfTableSection.vue
- **标题**: "Table Section"
- **按钮**: 待实现
- **实现**: 通过 `UnifiedSection` 组件自动使用 `SectionTitle`

### 5. Description Section
- **位置**: PdfDescriptionSection.vue
- **标题**: "Description Section"
- **按钮**: 待实现
- **实现**: 通过 `UnifiedSection` 组件自动使用 `SectionTitle`

### 6. Item Section
- **位置**: PdfItemSection.vue
- **标题**: "Item Section"
- **按钮**: 待实现
- **实现**: 通过 `UnifiedSection` 组件自动使用 `SectionTitle`

## 修改的文件

### 1. 新增文件
- **SectionTitle.vue**: 统一的section标题组件

### 2. 修改的文件
- **PdfConfigPanel.vue**: 更新Section Control使用SectionTitle
- **UnifiedSection.vue**: 集成SectionTitle组件，支持actions插槽
- **PdfInfoSection.vue**: 更新Info Section使用SectionTitle和TextButton

## 使用方式

### 基本用法
```vue
<SectionTitle title="Section Name" />
```

### 带按钮的用法
```vue
<SectionTitle title="Section Name">
  <template #actions>
    <TextButton @click="handleClick" variant="primary" size="sm">
      Button Text
    </TextButton>
  </template>
</SectionTitle>
```

### 多个按钮的用法
```vue
<SectionTitle title="Section Name">
  <template #actions>
    <TextButton @click="handleClick1" variant="default" size="sm">
      Button 1
    </TextButton>
    <TextButton @click="handleClick2" variant="primary" size="sm">
      Button 2
    </TextButton>
  </template>
</SectionTitle>
```

## TextButton 组件规范

### 变体 (Variants)
- `default`: 默认样式 (白色背景，灰色边框)
- `primary`: 主要样式 (橙色背景，白色文字)
- `secondary`: 次要样式 (浅灰色背景)
- `ghost`: 幽灵样式 (透明背景)

### 尺寸 (Sizes)
- `sm`: 小尺寸 (32px高度，10px字体)
- `md`: 中等尺寸 (40px高度，12px字体)
- `lg`: 大尺寸 (48px高度，14px字体)

### 推荐配置
- **Section标题按钮**: `variant="primary" size="sm"`
- **次要操作按钮**: `variant="default" size="sm"`

## CSS变量引用

### 字体相关
```css
--font-size-2xl: 1.5rem; /* 24px */
--font-weight-bold: 700;
--line-height-2xl: 2rem; /* 32px */
```

### 颜色相关
```css
--color-text-primary: #0e171f;
```

## 测试验证

### 视觉检查
1. 打开应用程序: http://localhost:5173
2. 检查所有section标题的字体大小和颜色
3. 验证标题的上下边距为16px
4. 检查按钮间距为8px
5. 验证TextButton的样式正确

### 响应式测试
1. 调整浏览器窗口大小
2. 验证在不同屏幕尺寸下的显示效果
3. 检查按钮的响应式行为

## 未来扩展

### 计划中的功能
- 为Table Section添加操作按钮
- 为Description Section添加操作按钮
- 为Item Section添加操作按钮
- 支持更多按钮变体和尺寸

### 维护建议
- 新增section时，统一使用SectionTitle组件
- 按钮操作统一使用TextButton组件
- 保持16px上下边距和8px按钮间距的一致性

---

*此标准化确保了所有section标题的视觉一致性和代码可维护性。*

