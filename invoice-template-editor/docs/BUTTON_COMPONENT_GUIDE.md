# 全局文字按钮组件指南

基于 Figma 设计规范的全局文字按钮组件已经开发完成。本文档说明如何使用和自定义这些按钮组件。

## 组件概述

### TextButton 组件
全新的文字按钮组件，完全基于 Figma 设计规范开发。

### DefaultButton 组件
更新后的默认按钮组件，现在使用新的设计规范。

## 设计规范

### 基础样式
- **字体**: Inter Semi Bold (600)
- **圆角**: 8px
- **边框**: 1px solid #c1ccd6
- **最小宽度**: 48px
- **行高**: 1

### 尺寸规范
- **小 (sm)**: 10px 字体，40px 最小宽度，6px 垂直内边距，8px 水平内边距
- **中 (md)**: 12px 字体，48px 最小宽度，10px 垂直内边距，12px 水平内边距
- **大 (lg)**: 14px 字体，56px 最小宽度，12px 垂直内边距，16px 水平内边距

### 颜色规范
- **默认**: 白色背景，深色文字 (#0e171f)，灰色边框 (#c1ccd6)
- **主要**: 橙色背景 (#ff761f)，白色文字
- **次要**: 浅灰背景 (#f2f5f7)，深色文字
- **幽灵**: 透明背景，深色文字

## 使用方法

### TextButton 组件

```vue
<template>
  <!-- 基础用法 -->
  <TextButton>按钮文字</TextButton>
  
  <!-- 不同变体 -->
  <TextButton variant="primary">主要按钮</TextButton>
  <TextButton variant="secondary">次要按钮</TextButton>
  <TextButton variant="ghost">幽灵按钮</TextButton>
  
  <!-- 不同尺寸 -->
  <TextButton size="sm">小按钮</TextButton>
  <TextButton size="md">中等按钮</TextButton>
  <TextButton size="lg">大按钮</TextButton>
  
  <!-- 状态 -->
  <TextButton disabled>禁用按钮</TextButton>
  <TextButton loading>加载中</TextButton>
  
  <!-- 全宽按钮 -->
  <TextButton full-width>全宽按钮</TextButton>
  
  <!-- 带图标 -->
  <TextButton>
    <svg class="w-4 h-4 mr-2">...</svg>
    带图标按钮
  </TextButton>
</template>

<script setup>
import TextButton from '@/components/TextButton.vue'
</script>
```

### DefaultButton 组件

```vue
<template>
  <!-- 基础用法 -->
  <DefaultButton>按钮文字</DefaultButton>
  
  <!-- 不同变体 -->
  <DefaultButton variant="primary">主要按钮</DefaultButton>
  <DefaultButton variant="danger">危险按钮</DefaultButton>
  
  <!-- 不同尺寸 -->
  <DefaultButton size="sm">小按钮</DefaultButton>
  <DefaultButton size="md">中等按钮</DefaultButton>
  <DefaultButton size="lg">大按钮</DefaultButton>
  
  <!-- 状态 -->
  <DefaultButton disabled>禁用按钮</DefaultButton>
  <DefaultButton loading>加载中</DefaultButton>
</template>

<script setup>
import DefaultButton from '@/components/DefaultButton.vue'
</script>
```

## 属性说明

### TextButton 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| variant | 'default' \| 'primary' \| 'secondary' \| 'ghost' | 'default' | 按钮变体 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 按钮尺寸 |
| type | 'button' \| 'submit' \| 'reset' | 'button' | 按钮类型 |
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否显示加载状态 |
| fullWidth | boolean | false | 是否全宽 |

### DefaultButton 属性

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| variant | 'default' \| 'primary' \| 'danger' | 'default' | 按钮变体 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 按钮尺寸 |
| type | 'button' \| 'submit' \| 'reset' | 'button' | 按钮类型 |
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否显示加载状态 |

## 事件

两个组件都支持以下事件：

- `@click`: 点击事件

## 样式自定义

### CSS 变量
可以通过 CSS 变量自定义按钮样式：

```css
:root {
  --button-border-radius: 8px;
  --button-font-family: 'Inter', system-ui, sans-serif;
  --button-font-weight: 600;
}
```

### Tailwind 类
按钮组件使用 Tailwind CSS，可以通过以下类进行自定义：

```vue
<TextButton class="custom-class">自定义按钮</TextButton>
```

## 测试页面

访问 `/button-test` 路由可以查看所有按钮变体的展示效果。

## 迁移指南

### 从旧按钮迁移

1. **替换组件导入**:
   ```vue
   // 旧
   import DefaultButton from '@/components/DefaultButton.vue'
   
   // 新
   import TextButton from '@/components/TextButton.vue'
   ```

2. **更新属性**:
   ```vue
   <!-- 旧 -->
   <DefaultButton variant="primary" size="md">按钮</DefaultButton>
   
   <!-- 新 -->
   <TextButton variant="primary" size="md">按钮</TextButton>
   ```

3. **样式调整**:
   - 圆角从 4px 更新为 8px
   - 字体从 medium 更新为 semibold
   - 边框颜色更新为 #c1ccd6

## 最佳实践

1. **一致性**: 在整个应用中使用相同的按钮组件
2. **语义化**: 根据功能选择合适的变体
3. **可访问性**: 确保按钮有适当的标签和焦点状态
4. **响应式**: 在移动设备上考虑使用全宽按钮

## 故障排除

### 常见问题

1. **样式不生效**: 确保 Tailwind CSS 配置正确
2. **字体显示异常**: 确保 Inter 字体已正确加载
3. **点击事件不触发**: 检查是否正确绑定了 @click 事件

### 调试技巧

1. 使用浏览器开发者工具检查计算样式
2. 确认 Tailwind 类是否正确应用
3. 检查组件属性是否正确传递



