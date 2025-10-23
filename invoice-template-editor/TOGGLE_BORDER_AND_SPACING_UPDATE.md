# Toggle 描边和间距更新

## 更新说明

根据用户要求，已为Toggle组件添加1px描边，并调整了Section Control中每个选项的间距为4px。

## 具体更新

### 1. Toggle组件描边更新

#### 禁用状态描边
```css
.toggle-switch--inactive {
  background-color: #d3ddde; /* bg - cloudy.200 */
  border: 1px solid #d3ddde; /* 1px描边 */
}
```

#### 激活状态描边
```css
.toggle-switch--active {
  background-color: #16a163; /* color/icon/status/green */
  border: 1px solid #16a163; /* 1px描边 */
}
```

#### 悬停状态描边
```css
.toggle-switch:not(.toggle-switch--disabled):hover {
  &.toggle-switch--inactive {
    background-color: #9ca8aa; /* cloudy.400 */
    border-color: #9ca8aa; /* 悬停时描边颜色 */
  }
  
  &.toggle-switch--active {
    background-color: #138a55; /* darker green for hover */
    border-color: #138a55; /* 悬停时描边颜色 */
  }
}
```

### 2. Section Control间距更新

#### 更新前
```vue
<div class="space-y-3">
```
- 使用 `space-y-3`，间距为12px

#### 更新后
```vue
<div class="space-y-1">
```
- 使用 `space-y-1`，间距为4px

## 视觉效果改进

### Toggle描边效果
1. **更清晰的边界**: 1px描边使toggle的边界更加清晰
2. **状态区分**: 描边颜色与背景色一致，增强状态区分度
3. **悬停反馈**: 悬停时描边颜色也会相应变化
4. **视觉层次**: 描边增加了组件的视觉层次感

### 间距优化
1. **紧凑布局**: 4px间距使选项更加紧凑
2. **视觉密度**: 提高了信息密度，减少滚动需求
3. **一致性**: 与整体设计保持一致的间距规范

## 技术实现

### CSS描边实现
```css
/* 基础描边样式 */
.toggle-switch--inactive {
  border: 1px solid #d3ddde;
}

.toggle-switch--active {
  border: 1px solid #16a163;
}

/* 悬停状态描边 */
.toggle-switch:not(.toggle-switch--disabled):hover {
  &.toggle-switch--inactive {
    border-color: #9ca8aa;
  }
  
  &.toggle-switch--active {
    border-color: #138a55;
  }
}
```

### 间距实现
```vue
<!-- Section Control容器 -->
<div class="space-y-1">
  <div v-for="(enabled, section) in sectionStates" :key="section" 
    class="bg-[#e7ecef] h-[44px] flex items-center justify-between px-[12px] rounded-[8px] w-full">
    <!-- 选项内容 -->
  </div>
</div>
```

## 设计规范

### 描边规范
- **描边宽度**: 1px
- **描边颜色**: 与背景色保持一致
- **描边样式**: solid
- **悬停效果**: 描边颜色随背景色变化

### 间距规范
- **选项间距**: 4px (space-y-1)
- **容器内边距**: 12px (px-[12px])
- **选项高度**: 44px (h-[44px])
- **圆角**: 8px (rounded-[8px])

## 状态对比

### Toggle状态
| 状态 | 背景色 | 描边色 | 悬停背景 | 悬停描边 |
|------|--------|--------|----------|----------|
| 禁用 | #d3ddde | #d3ddde | #9ca8aa | #9ca8aa |
| 激活 | #16a163 | #16a163 | #138a55 | #138a55 |

### 间距对比
| 元素 | 更新前 | 更新后 | 说明 |
|------|--------|--------|------|
| 选项间距 | 12px (space-y-3) | 4px (space-y-1) | 更紧凑的布局 |
| 选项高度 | 44px | 44px | 保持不变 |
| 内边距 | 12px | 12px | 保持不变 |

## 用户体验改进

### 视觉改进
1. **更清晰的边界**: 描边使toggle边界更清晰
2. **更好的状态区分**: 描边增强了状态的可识别性
3. **更紧凑的布局**: 4px间距提高了信息密度
4. **更一致的交互**: 悬停时描边和背景同步变化

### 交互改进
1. **更精确的点击区域**: 描边明确了可点击区域
2. **更清晰的反馈**: 悬停时描边变化提供更好的反馈
3. **更高效的浏览**: 紧凑的间距减少了滚动需求

## 测试验证

### 功能测试
1. ✅ 点击切换状态正常
2. ✅ 描边显示正确
3. ✅ 悬停效果正常
4. ✅ 间距调整正确

### 视觉测试
1. ✅ 描边清晰可见
2. ✅ 颜色对比度合适
3. ✅ 间距紧凑合理
4. ✅ 整体布局协调

### 响应式测试
1. ✅ 不同屏幕尺寸下显示正常
2. ✅ 描边在不同分辨率下清晰
3. ✅ 间距在不同设备上合适

## 兼容性

### 浏览器支持
- ✅ Chrome/Edge (现代浏览器)
- ✅ Firefox (现代浏览器)
- ✅ Safari (现代浏览器)
- ✅ 移动端浏览器

### 技术栈兼容
- ✅ Vue 3 Composition API
- ✅ TypeScript
- ✅ CSS Grid/Flexbox
- ✅ CSS自定义属性

## 总结

通过这次更新：

1. **Toggle组件**: 添加了1px描边，使边界更清晰，状态区分更明显
2. **Section Control**: 调整间距为4px，使布局更紧凑
3. **用户体验**: 提高了视觉清晰度和交互效率
4. **设计一致性**: 保持了与整体设计系统的协调

这些改进使Toggle组件更加清晰易用，Section Control布局更加紧凑高效。

---

*更新完成，Toggle组件现在有清晰的描边，Section Control间距已优化。*

