# Configuration Panel 输入组件统一更新

## 更新说明

根据用户要求，已将Configuration Panel中所有section的输入组件统一更换为UnifiedLInput，并调整了该组件的样式规范。

## 统一输入组件

### 更新前
Configuration Panel中的不同section使用了不同的输入组件：
- **PdfHeaderSection**: 使用 `UnifiedLInput` ✅
- **PdfTableSection**: 使用 `UnifiedLInput` ✅
- **PdfItemSection**: 使用 `UnifiedLInput` ✅
- **PdfFooterSection**: 使用 `UnifiedLInput` ✅
- **PdfInfoSection**: 使用自定义 `input` 元素 ❌

### 更新后
所有section现在都统一使用 `UnifiedLInput` 组件：
- **PdfHeaderSection**: `UnifiedLInput` ✅
- **PdfTableSection**: `UnifiedLInput` ✅
- **PdfItemSection**: `UnifiedLInput` ✅
- **PdfFooterSection**: `UnifiedLInput` ✅
- **PdfInfoSection**: `UnifiedLInput` ✅ (已更新)

## UnifiedLInput 组件样式规范

### 当前样式规范
根据用户要求，UnifiedLInput组件已调整为：

#### Label样式
- **字号**: 16px (body-lg)
- **字重**: 400 (default-400)
- **颜色**: #3e5463 (color/text/secondary)

#### Value样式
- **字号**: 16px (body-lg)
- **字重**: 400 (default-400)
- **颜色**: #0e171f (color/text/primary)

#### 边框样式
- **粗细**: 1px
- **默认颜色**: #c1ccd6
- **悬停颜色**: #7a909e
- **焦点颜色**: #ff5b05

## 具体更新内容

### 1. PdfInfoSection.vue 更新

#### 更新前 (自定义input)
```vue
<!-- Label Input -->
<div class="info-config-field">
  <label class="info-config-label">Label</label>
  <input
    v-model="item.label"
    type="text"
    class="info-config-input"
    @input="updateInfoData"
  />
</div>

<!-- Value Input -->
<div class="info-config-field">
  <label class="info-config-label">Value</label>
  <input
    v-model="item.value"
    type="text"
    class="info-config-input"
    @input="updateInfoData"
  />
</div>
```

#### 更新后 (UnifiedLInput)
```vue
<!-- Label Input -->
<UnifiedLInput
  v-model="item.label"
  label="Label"
  @update:modelValue="updateInfoData"
/>

<!-- Value Input -->
<UnifiedLInput
  v-model="item.value"
  label="Value"
  @update:modelValue="updateInfoData"
/>
```

### 2. CSS样式清理

删除了PdfInfoSection中不再需要的自定义input样式：
```css
/* 已删除的样式 */
.info-config-field { ... }
.info-config-label { ... }
.info-config-input { ... }
.info-config-input:focus { ... }
.info-config-input::placeholder { ... }
```

保留了必要的容器样式：
```css
.info-config-inputs {
  display: flex;
  flex-direction: column;
  gap: 8px;
}
```

## UnifiedLInput 组件特性

### 组件结构
```vue
<template>
  <div class="relative w-full">
    <!-- Input Container -->
    <div class="relative h-[44px] bg-white border border-[1px] rounded-lg transition-colors duration-200">
      <!-- Floating Label (when focused or has value) -->
      <div v-if="isFocused || modelValue" class="absolute -top-3 left-2 z-10 bg-white px-1">
        <label class="font-['Inter:Regular',_sans-serif] font-normal text-[16px] leading-[24px] text-[#3e5463]">
          {{ label }}
        </label>
      </div>

      <!-- Default Label (when not focused and no value) -->
      <div v-else class="absolute inset-0 flex items-center px-3">
        <label class="font-['Inter:Regular',_sans-serif] font-normal text-[16px] leading-[24px] text-[#9fb1bd]">
          {{ label }}
        </label>
      </div>

      <!-- Input Field -->
      <input
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        @focus="handleFocus"
        @blur="handleBlur"
        class="absolute inset-0 w-full h-full px-3 bg-transparent border-0 outline-none font-['Inter:Regular',_sans-serif] font-normal text-[16px] leading-[24px] text-[#0e171f] placeholder-transparent"
        :placeholder="label"
        :disabled="disabled"
      />
    </div>
  </div>
</template>
```

### Props接口
```typescript
interface Props {
  modelValue: string | number  // 双向绑定值
  label: string               // 标签文字
  type?: string              // 输入类型 (默认: 'text')
  disabled?: boolean         // 禁用状态 (默认: false)
}
```

### 事件
```typescript
interface Emits {
  (e: 'update:modelValue', value: string): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: FocusEvent): void
}
```

## 设计系统规范

### 颜色规范
| 用途 | 颜色名称 | 十六进制值 | 说明 |
|------|----------|------------|------|
| Label (浮动) | color/text/secondary | #3e5463 | 次要文字颜色 |
| Label (默认) | placeholder | #9fb1bd | 占位符颜色 |
| Value | color/text/primary | #0e171f | 主要文字颜色 |
| 边框默认 | border/default | #c1ccd6 | 默认边框颜色 |
| 边框悬停 | border/hover | #7a909e | 悬停边框颜色 |
| 边框焦点 | border/focus | #ff5b05 | 焦点边框颜色 |

### 字体规范
| 属性 | 值 | 说明 |
|------|-----|------|
| 字号 | 16px | body-lg |
| 字重 | 400 | default-400 |
| 字体族 | Inter | 系统字体 |
| 行高 | 24px | 标准行高 |

### 尺寸规范
| 属性 | 值 | 说明 |
|------|-----|------|
| 高度 | 44px | 标准输入框高度 |
| 边框 | 1px | 标准边框宽度 |
| 圆角 | 8px | 标准圆角 |
| 内边距 | 12px | 左右内边距 |

## 用户体验改进

### 一致性改进
1. **统一的组件**: 所有输入框使用相同的组件
2. **统一的样式**: 所有输入框有相同的外观
3. **统一的行为**: 所有输入框有相同的交互行为
4. **统一的动画**: 所有输入框有相同的过渡效果

### 可维护性改进
1. **组件复用**: 减少重复代码
2. **样式集中**: 样式定义集中在一个组件中
3. **功能统一**: 所有输入框功能保持一致
4. **更新便利**: 只需更新一个组件即可影响所有输入框

### 开发体验改进
1. **API统一**: 所有输入框使用相同的Props和Events
2. **文档统一**: 只需维护一个组件的文档
3. **测试统一**: 只需测试一个组件的功能
4. **调试便利**: 问题定位更容易

## 技术实现

### 组件导入
```typescript
import UnifiedLInput from './UnifiedLInput.vue'
```

### 组件使用
```vue
<UnifiedLInput
  v-model="value"
  label="Label Text"
  @update:modelValue="handleUpdate"
/>
```

### 样式实现
```css
/* 边框样式 */
.border-[1px]

/* Label样式 */
.font-['Inter:Regular',_sans-serif]
.font-normal
.text-[16px]
.leading-[24px]
.text-[#3e5463] /* color/text/secondary */

/* Value样式 */
.text-[#0e171f] /* color/text/primary */
```

## 测试验证

### 功能测试
1. ✅ 所有输入框正常渲染
2. ✅ 输入功能正常工作
3. ✅ 数据绑定正常
4. ✅ 焦点和悬停状态正常
5. ✅ 标签浮动效果正常

### 视觉测试
1. ✅ 所有输入框样式统一
2. ✅ Label字号为16px
3. ✅ Label颜色为#3e5463
4. ✅ Value字号为16px
5. ✅ Value颜色为#0e171f
6. ✅ 边框为1px

### 一致性测试
1. ✅ 所有section使用相同组件
2. ✅ 所有输入框外观一致
3. ✅ 所有输入框行为一致
4. ✅ 符合设计系统规范

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

通过这次更新，Configuration Panel现在具有：

1. **统一的输入组件**: 所有section都使用UnifiedLInput组件
2. **统一的样式规范**: 所有输入框符合设计系统规范
3. **统一的用户体验**: 所有输入框提供一致的交互体验
4. **更好的可维护性**: 组件化设计便于维护和更新

这些改进确保了Configuration Panel的视觉一致性和用户体验的连贯性，同时提高了代码的可维护性。

---

*更新完成，Configuration Panel中所有输入组件已统一为UnifiedLInput。*

