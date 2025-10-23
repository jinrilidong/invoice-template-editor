# 全局图标按钮组件指南

基于 Figma 设计规范的全局图标按钮组件已经开发完成。本文档说明如何使用和自定义这些图标按钮组件。

## 组件概述

### IconButton 组件
全新的图标按钮组件，完全基于 Figma 设计规范开发，专门用于只有图标没有文字的按钮场景。

## 设计规范

### 基础样式
- **背景色**: 白色 (#ffffff)
- **边框**: 1px solid #c1ccd6
- **圆角**: 8px
- **图标颜色**: #2a3f4d
- **间距**: 4px

### 尺寸规范
- **小 (sm)**: 32x32px，6px 内边距，12px 图标
- **中 (md)**: 40x40px，10px 内边距，12px 图标
- **大 (lg)**: 48x48px，12px 内边距，16px 图标

### 颜色规范
- **默认**: 白色背景，深色图标 (#2a3f4d)，灰色边框 (#c1ccd6)
- **主要**: 橙色背景 (#ff761f)，白色图标
- **次要**: 浅灰背景 (#f2f5f7)，深色图标
- **幽灵**: 透明背景，深色图标

## 使用方法

### 基础用法

```vue
<template>
  <!-- 基础图标按钮 -->
  <IconButton title="编辑">
    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
    </svg>
  </IconButton>
</template>

<script setup>
import IconButton from '@/components/IconButton.vue'
</script>
```

### 不同变体

```vue
<template>
  <!-- 默认变体 -->
  <IconButton title="编辑">
    <svg class="w-3 h-3">...</svg>
  </IconButton>
  
  <!-- 主要变体 -->
  <IconButton variant="primary" title="添加">
    <svg class="w-3 h-3">...</svg>
  </IconButton>
  
  <!-- 次要变体 -->
  <IconButton variant="secondary" title="删除">
    <svg class="w-3 h-3">...</svg>
  </IconButton>
  
  <!-- 幽灵变体 -->
  <IconButton variant="ghost" title="设置">
    <svg class="w-3 h-3">...</svg>
  </IconButton>
</template>
```

### 不同尺寸

```vue
<template>
  <!-- 小尺寸 -->
  <IconButton size="sm" title="小按钮">
    <svg class="w-3 h-3">...</svg>
  </IconButton>
  
  <!-- 中等尺寸 -->
  <IconButton size="md" title="中等按钮">
    <svg class="w-3 h-3">...</svg>
  </IconButton>
  
  <!-- 大尺寸 -->
  <IconButton size="lg" title="大按钮">
    <svg class="w-4 h-4">...</svg>
  </IconButton>
</template>
```

### 状态控制

```vue
<template>
  <!-- 正常状态 -->
  <IconButton title="正常按钮">
    <svg class="w-3 h-3">...</svg>
  </IconButton>
  
  <!-- 禁用状态 -->
  <IconButton disabled title="禁用按钮">
    <svg class="w-3 h-3">...</svg>
  </IconButton>
  
  <!-- 加载状态 -->
  <IconButton loading title="加载中">
    <svg class="w-3 h-3">...</svg>
  </IconButton>
</template>
```

## 属性说明

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| variant | 'default' \| 'primary' \| 'secondary' \| 'ghost' | 'default' | 按钮变体 |
| size | 'sm' \| 'md' \| 'lg' | 'md' | 按钮尺寸 |
| type | 'button' \| 'submit' \| 'reset' | 'button' | 按钮类型 |
| disabled | boolean | false | 是否禁用 |
| loading | boolean | false | 是否显示加载状态 |
| title | string | '' | 按钮标题（用于 tooltip） |
| ariaLabel | string | '' | 无障碍标签 |

## 事件

- `@click`: 点击事件

## 图标规范

### 图标尺寸
- **小/中等尺寸按钮**: 使用 `w-3 h-3` (12px)
- **大尺寸按钮**: 使用 `w-4 h-4` (16px)

### 图标样式
```vue
<template>
  <IconButton title="编辑">
    <svg 
      class="w-3 h-3" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="..."
      />
    </svg>
  </IconButton>
</template>
```

### 常用图标示例

```vue
<template>
  <!-- 编辑图标 -->
  <IconButton title="编辑">
    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
    </svg>
  </IconButton>

  <!-- 删除图标 -->
  <IconButton title="删除">
    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
    </svg>
  </IconButton>

  <!-- 添加图标 -->
  <IconButton title="添加">
    <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
    </svg>
  </IconButton>
</template>
```

## 样式自定义

### CSS 变量
可以通过 CSS 变量自定义图标按钮样式：

```css
:root {
  --icon-button-border-radius: 8px;
  --icon-button-icon-color: #2a3f4d;
  --icon-button-border-color: #c1ccd6;
}
```

### Tailwind 类
图标按钮组件使用 Tailwind CSS，可以通过以下类进行自定义：

```vue
<IconButton class="custom-class" title="自定义按钮">
  <svg class="w-3 h-3">...</svg>
</IconButton>
```

## 测试页面

访问 `/icon-button-test` 路由可以查看所有图标按钮变体的展示效果。

## 迁移指南

### 从旧图标按钮迁移

1. **替换组件导入**:
   ```vue
   // 旧
   <button class="p-1 text-primary/80 hover:text-primary hover:bg-[#FF761F] rounded-lg transition-colors">
     <svg class="w-4 h-4">...</svg>
   </button>
   
   // 新
   <IconButton title="按钮标题">
     <svg class="w-3 h-3">...</svg>
   </IconButton>
   ```

2. **更新图标尺寸**:
   ```vue
   <!-- 旧 -->
   <svg class="w-4 h-4">...</svg>
   
   <!-- 新 -->
   <svg class="w-3 h-3">...</svg> <!-- 小/中等尺寸 -->
   <svg class="w-4 h-4">...</svg> <!-- 大尺寸 -->
   ```

3. **添加无障碍属性**:
   ```vue
   <IconButton title="按钮功能描述" aria-label="详细描述">
     <svg class="w-3 h-3">...</svg>
   </IconButton>
   ```

## 最佳实践

1. **一致性**: 在整个应用中使用相同的图标按钮组件
2. **语义化**: 根据功能选择合适的变体
3. **可访问性**: 确保按钮有适当的 title 和 aria-label
4. **图标选择**: 使用清晰、易懂的图标
5. **尺寸选择**: 根据使用场景选择合适的尺寸

## 与文字按钮的区别

| 特性 | 文字按钮 | 图标按钮 |
|------|----------|----------|
| 用途 | 有明确文字说明的操作 | 简洁的图标操作 |
| 尺寸 | 最小宽度 48px | 固定正方形尺寸 |
| 内容 | 文字 + 可选图标 | 仅图标 |
| 内边距 | 水平 12px，垂直 10px | 统一内边距 |
| 图标尺寸 | 16px | 12px (sm/md) 或 16px (lg) |

## 故障排除

### 常见问题

1. **图标不显示**: 确保 SVG 图标正确嵌套在 IconButton 组件内
2. **尺寸不正确**: 检查 size 属性是否正确设置
3. **颜色异常**: 确保图标使用 `currentColor` 或 `stroke="currentColor"`
4. **点击事件不触发**: 检查是否正确绑定了 @click 事件

### 调试技巧

1. 使用浏览器开发者工具检查计算样式
2. 确认图标 SVG 是否正确渲染
3. 检查组件属性是否正确传递
4. 验证无障碍属性是否正确设置



