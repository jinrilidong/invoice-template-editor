# Toggle 颜色最终更新

## 更新说明

根据用户提供的颜色规范，已更新Toggle组件的颜色配置：

### 颜色规范
- **Switch on (激活状态)**: `color/icon/status/green` → `#16a163`
- **Switch off (禁用状态)**: `bg` → `#d3ddde` (cloudy.200)

## 具体更新

### 1. 激活状态颜色
**更新前**: `#ff761f` (brand.500)
**更新后**: `#16a163` (color/icon/status/green)

```css
/* Active state */
.toggle-switch--active {
  background-color: #16a163; /* color/icon/status/green */
}
```

### 2. 禁用状态颜色
**保持不变**: `#d3ddde` (cloudy.200 / bg)

```css
/* Inactive state */
.toggle-switch--inactive {
  background-color: #d3ddde; /* bg - cloudy.200 */
}
```

### 3. 悬停状态颜色
**激活状态悬停**: 更新为更深的绿色 `#138a55`
**禁用状态悬停**: 保持 `#9ca8aa` (cloudy.400)

```css
/* Hover effects */
.toggle-switch:not(.toggle-switch--disabled):hover {
  &.toggle-switch--inactive {
    background-color: #9ca8aa; /* cloudy.400 */
  }
  
  &.toggle-switch--active {
    background-color: #138a55; /* darker green for hover */
  }
}
```

## 颜色对比

| 状态 | 颜色值 | 颜色名称 | 说明 |
|------|--------|----------|------|
| 禁用 | `#d3ddde` | cloudy.200 / bg | 浅灰色，表示关闭状态 |
| 激活 | `#16a163` | color/icon/status/green | 绿色，表示开启状态 |
| 激活悬停 | `#138a55` | darker green | 更深的绿色，悬停效果 |
| 禁用悬停 | `#9ca8aa` | cloudy.400 | 更深的灰色，悬停效果 |

## 设计逻辑

### 颜色选择原理
1. **绿色表示激活**: 绿色在UI设计中通常表示"开启"、"成功"或"激活"状态
2. **灰色表示禁用**: 灰色通常表示"关闭"、"禁用"或"非激活"状态
3. **悬停效果**: 使用更深的同色系颜色提供视觉反馈

### 与设计系统的一致性
- **禁用状态**: 使用设计系统中的 `cloudy.200` 颜色
- **激活状态**: 使用状态绿色，符合常见的toggle设计模式
- **悬停效果**: 保持颜色的一致性，使用同色系的深色

## 视觉效果

### 预期效果
1. **禁用状态**: 柔和的浅灰色背景，表示开关处于关闭状态
2. **激活状态**: 鲜明的绿色背景，表示开关处于开启状态
3. **悬停效果**: 平滑的颜色过渡，提供良好的交互反馈
4. **整体协调**: 与界面其他元素保持视觉和谐

### 用户体验
- ✅ 清晰的状态指示
- ✅ 直观的颜色语义
- ✅ 平滑的交互反馈
- ✅ 符合用户预期

## 测试验证

### 功能测试
1. ✅ 点击切换状态正常
2. ✅ 颜色变化正确
3. ✅ 悬停效果正常
4. ✅ 禁用状态显示正确

### 视觉测试
1. ✅ 禁用状态显示为浅灰色
2. ✅ 激活状态显示为绿色
3. ✅ 悬停效果平滑过渡
4. ✅ 颜色对比度合适

### 一致性测试
1. ✅ 与设计系统颜色规范一致
2. ✅ 与常见toggle设计模式一致
3. ✅ 与用户预期一致

## 技术实现

### CSS实现
```css
.toggle-switch--inactive {
  background-color: #d3ddde; /* bg - cloudy.200 */
}

.toggle-switch--active {
  background-color: #16a163; /* color/icon/status/green */
}

.toggle-switch:not(.toggle-switch--disabled):hover {
  &.toggle-switch--inactive {
    background-color: #9ca8aa; /* cloudy.400 */
  }
  
  &.toggle-switch--active {
    background-color: #138a55; /* darker green for hover */
  }
}
```

### 组件使用
```vue
<Toggle
  v-model="enabled"
  size="md"
  :aria-label="`Toggle section`"
/>
```

## 总结

通过这次更新，Toggle组件现在使用正确的颜色规范：

1. **激活状态**: 使用绿色 (`#16a163`) 表示开启状态
2. **禁用状态**: 使用灰色 (`#d3ddde`) 表示关闭状态
3. **悬停效果**: 使用对应的深色提供交互反馈

这确保了Toggle组件符合用户提供的颜色规范，同时保持了良好的用户体验和视觉一致性。

---

*更新完成，Toggle组件现在使用正确的颜色规范。*

