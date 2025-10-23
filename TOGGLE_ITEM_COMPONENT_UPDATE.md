# ToggleItem 组件创建和更新

## 更新说明

根据用户要求，创建了统一的ToggleItem组件，并更新了Section Control的样式和间距。

## 新组件创建

### ToggleItem.vue 组件

#### 组件特性
- **统一设计**: 包含文字、背景色和toggle的完整组件
- **背景色**: 使用 `gray-10` (#f9fafb)
- **高度**: 44px
- **圆角**: 8px
- **内边距**: 12px (左右)

#### 组件结构
```vue
<template>
  <div class="toggle-item">
    <div class="toggle-item__content">
      <div class="toggle-item__text">
        <p class="toggle-item__label">{{ label }}</p>
      </div>
      <div class="toggle-item__toggle">
        <Toggle
          :id="id"
          :model-value="modelValue"
          @update:model-value="$emit('update:modelValue', $event)"
          size="md"
          :aria-label="`Toggle ${label}`"
        />
      </div>
    </div>
  </div>
</template>
```

#### Props接口
```typescript
interface Props {
  id: string        // 元素ID
  label: string     // 显示文字
  modelValue: boolean  // 开关状态
}
```

#### 样式实现
```css
.toggle-item {
  background-color: #f9fafb; /* gray-10 */
  height: 44px;
  border-radius: 8px;
  width: 100%;
}

.toggle-item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 12px;
}

.toggle-item__text {
  display: flex;
  flex-direction: column;
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 400;
  justify-content: center;
  line-height: 0;
  position: relative;
  flex-shrink: 0;
  color: #0e171f;
  font-size: 16px;
  white-space: nowrap;
}

.toggle-item__label {
  line-height: 24px;
  white-space: pre;
  margin: 0;
}

.toggle-item__toggle {
  display: flex;
  height: 24px;
  align-items: center;
  position: relative;
  flex-shrink: 0;
}
```

## Section Control 更新

### 组件使用更新

#### 更新前
```vue
<div v-for="(enabled, section) in sectionStates" :key="section" 
  class="bg-[#e7ecef] h-[44px] flex items-center justify-between px-[12px] rounded-[8px] w-full">
  <div class="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0e171f] text-[16px] text-nowrap">
    <p class="leading-[24px] whitespace-pre">{{ getSectionName(section) }}</p>
  </div>
  <div class="flex h-[24px] items-center relative shrink-0">
    <Toggle
      :id="`toggle-${section}`"
      :model-value="enabled"
      @update:model-value="toggleSection(section as keyof SectionStates)"
      size="md"
      :aria-label="`Toggle ${getSectionName(section)} section`"
    />
  </div>
</div>
```

#### 更新后
```vue
<ToggleItem
  v-for="(enabled, section) in sectionStates"
  :key="section"
  :id="`toggle-${section}`"
  :label="getSectionName(section)"
  :model-value="enabled"
  @update:model-value="toggleSection(section as keyof SectionStates)"
/>
```

### 间距更新

#### 更新前
```vue
<div class="border-b border-[#d3ddde]">
```

#### 更新后
```vue
<div class="border-b border-[#d3ddde] pb-5">
```
- 添加了 `pb-5` 类，提供20px的底部间距

## 设计改进

### 组件化优势
1. **代码复用**: ToggleItem组件可以在其他地方复用
2. **维护性**: 统一的样式和逻辑，便于维护
3. **一致性**: 确保所有toggle项的外观和行为一致
4. **可扩展性**: 组件化设计便于未来功能扩展

### 样式统一
1. **背景色**: 统一使用 `gray-10` (#f9fafb)
2. **尺寸**: 统一44px高度和8px圆角
3. **间距**: 统一12px内边距
4. **字体**: 统一Inter字体和16px大小

### 布局优化
1. **间距**: Section Control区域底部20px间距
2. **分割线**: 清晰的分割线分隔不同区域
3. **对齐**: 所有元素完美对齐
4. **响应式**: 保持响应式设计

## 技术实现

### 组件导入
```typescript
import ToggleItem from './ToggleItem.vue'
```

### 组件使用
```vue
<ToggleItem
  v-for="(enabled, section) in sectionStates"
  :key="section"
  :id="`toggle-${section}`"
  :label="getSectionName(section)"
  :model-value="enabled"
  @update:model-value="toggleSection(section as keyof SectionStates)"
/>
```

### 样式类
- `pb-5`: 提供20px底部间距
- `space-y-1`: 保持4px的选项间距
- `border-b`: 底部边框分割线

## 视觉效果

### 背景色对比
| 组件 | 更新前 | 更新后 | 说明 |
|------|--------|--------|------|
| 背景色 | #e7ecef | #f9fafb | 更浅的灰色，更柔和 |
| 对比度 | 较高 | 较低 | 更舒适的视觉体验 |

### 间距对比
| 区域 | 更新前 | 更新后 | 说明 |
|------|--------|--------|------|
| 选项间距 | 4px | 4px | 保持不变 |
| 底部间距 | 0px | 20px | 新增底部间距 |
| 内边距 | 12px | 12px | 保持不变 |

## 用户体验改进

### 视觉改进
1. **更柔和的背景**: gray-10提供更舒适的视觉体验
2. **更清晰的区域分隔**: 20px底部间距增强区域分隔
3. **更统一的样式**: 组件化确保所有项的一致性
4. **更好的层次感**: 清晰的视觉层次

### 交互改进
1. **更清晰的点击区域**: 统一的组件尺寸
2. **更一致的交互**: 所有toggle项行为一致
3. **更好的可访问性**: 统一的ARIA标签
4. **更流畅的体验**: 组件化减少渲染开销

## 测试验证

### 功能测试
1. ✅ ToggleItem组件正常渲染
2. ✅ 点击切换功能正常
3. ✅ 状态变化正确反映
4. ✅ 数据绑定正常工作

### 视觉测试
1. ✅ 背景色为gray-10
2. ✅ 底部间距为20px
3. ✅ 选项间距为4px
4. ✅ 整体布局协调

### 响应式测试
1. ✅ 不同屏幕尺寸下显示正常
2. ✅ 组件尺寸保持一致
3. ✅ 间距在不同设备上合适

## 总结

通过创建ToggleItem组件，我们实现了：

1. **组件化**: 统一的toggle项组件，提高代码复用性
2. **样式统一**: 使用gray-10背景色，提供更柔和的视觉体验
3. **间距优化**: 添加20px底部间距，增强区域分隔
4. **维护性**: 组件化设计便于未来维护和扩展

这些改进使Section Control更加统一、美观和易用。

---

*更新完成，ToggleItem组件已创建，Section Control样式已优化。*

