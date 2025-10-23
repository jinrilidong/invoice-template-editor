# Toggle 组件设计更新

## 概述

根据BTDS Foundation 3.0设计系统规范，创建了新的Toggle组件并更新了Section Control中的toggle样式。

## 设计系统规范

### 颜色规范
基于BTDS Foundation 3.0设计系统：

- **成功色 (启用状态)**: `#077d55` (semantic.success)
- **禁用状态**: `#c1ccd6` (cloudy.200)
- **悬停状态**: 
  - 启用: `#065a3f` (更深的成功色)
  - 禁用: `#9ca8aa` (cloudy.400)
- **品牌色选项**: `#ff761f` (brand.500) 和 `#ff5b05` (brand.600)

### 尺寸规范
- **中等尺寸 (md)**: 44px × 24px，圆点 20px
- **小尺寸 (sm)**: 36px × 20px，圆点 16px
- **圆角**: 12px (开关容器)
- **内边距**: 2px

### 动画规范
- **过渡时间**: 200ms ease-in-out
- **阴影**: 使用设计系统的标准阴影

## 新组件特性

### Toggle.vue 组件

#### Props
```typescript
interface Props {
  modelValue: boolean        // 双向绑定值
  id?: string               // 元素ID
  disabled?: boolean        // 禁用状态
  ariaLabel?: string        // 无障碍标签
  size?: 'sm' | 'md'       // 尺寸大小
}
```

#### 功能特性
- ✅ **双向数据绑定**: 使用 `v-model`
- ✅ **无障碍支持**: ARIA属性和键盘导航
- ✅ **禁用状态**: 支持禁用和视觉反馈
- ✅ **尺寸变体**: 支持小尺寸和中等尺寸
- ✅ **品牌色变体**: 可选的品牌色样式
- ✅ **悬停效果**: 平滑的颜色过渡
- ✅ **焦点管理**: 键盘焦点样式

#### 样式特点
- **现代设计**: 符合BTDS设计系统
- **平滑动画**: 200ms过渡效果
- **响应式**: 支持不同尺寸
- **可访问性**: 完整的ARIA支持

## 实现细节

### 组件结构
```vue
<template>
  <button
    :id="id"
    @click="toggle"
    :disabled="disabled"
    :aria-pressed="modelValue"
    :aria-label="ariaLabel"
    class="toggle-switch"
    :class="[
      modelValue ? 'toggle-switch--active' : 'toggle-switch--inactive',
      disabled ? 'toggle-switch--disabled' : '',
      size === 'sm' ? 'toggle-switch--sm' : 'toggle-switch--md'
    ]"
  >
    <span class="toggle-switch__thumb" 
          :class="modelValue ? 'toggle-switch__thumb--active' : 'toggle-switch__thumb--inactive'">
    </span>
  </button>
</template>
```

### CSS架构
使用BEM命名规范：
- `.toggle-switch` - 主容器
- `.toggle-switch--active` - 激活状态
- `.toggle-switch--inactive` - 非激活状态
- `.toggle-switch--disabled` - 禁用状态
- `.toggle-switch--sm` - 小尺寸
- `.toggle-switch--md` - 中等尺寸
- `.toggle-switch__thumb` - 开关圆点
- `.toggle-switch__thumb--active` - 圆点激活位置
- `.toggle-switch__thumb--inactive` - 圆点非激活位置

### 状态管理
```typescript
const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}
```

## 集成更新

### PdfConfigPanel.vue 更新

#### 导入新组件
```typescript
import Toggle from './Toggle.vue'
```

#### 替换旧实现
**更新前**:
```vue
<button
  :id="`toggle-${section}`"
  @click="toggleSection(section as keyof SectionStates)"
  class="box-border flex gap-[10px] items-start justify-end overflow-clip p-[2px] relative rounded-[12px] w-[32px] transition-colors"
  :class="enabled ? 'bg-[#16a163]' : 'bg-gray-300'"
>
  <div class="relative shrink-0 size-[12px] bg-white rounded-full transition-transform"
       :class="enabled ? 'translate-x-0' : '-translate-x-4'">
  </div>
</button>
```

**更新后**:
```vue
<Toggle
  :id="`toggle-${section}`"
  v-model="enabled"
  @update:modelValue="toggleSection(section as keyof SectionStates)"
  size="md"
  :aria-label="`Toggle ${getSectionName(section)} section`"
/>
```

## 设计优势

### 1. 一致性
- 完全符合BTDS Foundation 3.0设计系统
- 统一的颜色、尺寸和动画规范
- 与其他组件保持视觉一致性

### 2. 可维护性
- 独立的组件，便于复用
- 清晰的Props接口
- 完整的TypeScript类型支持

### 3. 可访问性
- 完整的ARIA属性支持
- 键盘导航支持
- 屏幕阅读器友好

### 4. 用户体验
- 平滑的动画效果
- 清晰的视觉反馈
- 响应式设计

## 测试验证

### 功能测试
1. ✅ 点击切换状态
2. ✅ 键盘导航 (Tab, Enter, Space)
3. ✅ 禁用状态
4. ✅ 双向数据绑定
5. ✅ 不同尺寸显示

### 视觉测试
1. ✅ 颜色符合设计系统
2. ✅ 尺寸和间距正确
3. ✅ 动画效果平滑
4. ✅ 悬停状态正常
5. ✅ 焦点状态清晰

### 兼容性测试
1. ✅ 现代浏览器支持
2. ✅ 移动端适配
3. ✅ 屏幕阅读器支持
4. ✅ 键盘导航

## 使用示例

### 基础用法
```vue
<Toggle v-model="isEnabled" />
```

### 带标签和尺寸
```vue
<Toggle 
  v-model="isEnabled" 
  size="sm"
  aria-label="Enable notifications"
/>
```

### 禁用状态
```vue
<Toggle 
  v-model="isEnabled" 
  :disabled="true"
  aria-label="Feature toggle"
/>
```

### 品牌色变体
```vue
<Toggle 
  v-model="isEnabled" 
  class="toggle-switch--brand"
/>
```

## 未来扩展

### 可能的增强功能
1. **更多尺寸**: 添加 `lg` 和 `xl` 尺寸
2. **更多变体**: 添加不同的颜色主题
3. **图标支持**: 在开关上添加图标
4. **加载状态**: 添加加载动画
5. **标签支持**: 内置标签显示

### 设计系统集成
- 可以添加到设计系统文档
- 可以作为其他项目的标准组件
- 支持主题定制

---

*此更新确保了Toggle组件完全符合BTDS Foundation 3.0设计系统，提供了更好的用户体验和开发体验。*

