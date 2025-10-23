# Configuration Panel 输入框样式更新

## 更新说明

根据用户要求，已更新Configuration Panel中所有输入框的样式规范：

### 样式要求
1. **边框**: 1px
2. **Label字号**: body-lg/default-400 (16px)
3. **Label颜色**: color/text/secondary (#3e5463)
4. **Value字号**: body-lg/default-400 (16px)
5. **Value颜色**: color/text/primary (#0e171f)

## 更新的组件

### 1. UnifiedLInput.vue (主要输入框组件)

#### 边框更新
```vue
<!-- 更新前 -->
<div class="relative h-[44px] bg-white border rounded-lg transition-colors duration-200">

<!-- 更新后 -->
<div class="relative h-[44px] bg-white border border-[1px] rounded-lg transition-colors duration-200">
```

#### 样式规范
- **边框**: 1px (border-[1px])
- **Label颜色**: #3e5463 (color/text/secondary) ✅ 已正确
- **Value颜色**: #0e171f (color/text/primary) ✅ 已正确
- **字号**: 16px (body-lg) ✅ 已正确
- **字重**: 400 (default-400) ✅ 已正确

### 2. PdfInfoSection.vue (Info Section自定义输入框)

#### Label样式更新
```css
/* 更新前 */
.info-config-label {
  font-size: 12px;
  font-weight: 500;
  color: #6b7280; /* gray-600 */
  margin: 0;
}

/* 更新后 */
.info-config-label {
  font-size: 16px; /* body-lg */
  font-weight: 400; /* default-400 */
  color: #3e5463; /* color/text/secondary */
  margin: 0;
}
```

#### Input样式更新
```css
/* 更新前 */
.info-config-input {
  width: 100%;
  padding: 6px 8px;
  font-size: 12px;
  border: 1px solid #d1d5db; /* gray-300 */
  border-radius: 4px;
  background-color: #ffffff;
  color: #111827; /* gray-900 */
  transition: all 0.2s ease;
}

/* 更新后 */
.info-config-input {
  width: 100%;
  padding: 6px 8px;
  font-size: 16px; /* body-lg */
  font-weight: 400; /* default-400 */
  border: 1px solid #d1d5db; /* 1px边框 */
  border-radius: 4px;
  background-color: #ffffff;
  color: #0e171f; /* color/text/primary */
  transition: all 0.2s ease;
}
```

## 设计系统规范

### 颜色规范
| 用途 | 颜色名称 | 十六进制值 | 说明 |
|------|----------|------------|------|
| Label | color/text/secondary | #3e5463 | 次要文字颜色 |
| Value | color/text/primary | #0e171f | 主要文字颜色 |

### 字体规范
| 属性 | 值 | 说明 |
|------|-----|------|
| 字号 | 16px | body-lg |
| 字重 | 400 | default-400 |
| 字体族 | Inter | 系统字体 |

### 边框规范
| 属性 | 值 | 说明 |
|------|-----|------|
| 宽度 | 1px | 标准边框宽度 |
| 样式 | solid | 实线边框 |
| 圆角 | 4px/8px | 根据组件类型 |

## 影响的组件

### 使用UnifiedLInput的组件
1. **PdfHeaderSection.vue**: Title, Description, Logo输入框
2. **PdfTableSection.vue**: Section Title, Subsection Title, Column输入框
3. **PdfItemSection.vue**: Label, Value输入框
4. **PdfFooterSection.vue**: Footer Name输入框

### 使用自定义Input的组件
1. **PdfInfoSection.vue**: Label, Value输入框 (已更新)

## 视觉效果

### 更新前
- Label: 12px, 500字重, gray-600颜色
- Value: 12px, 默认字重, gray-900颜色
- 边框: 1px (已正确)

### 更新后
- Label: 16px, 400字重, color/text/secondary (#3e5463)
- Value: 16px, 400字重, color/text/primary (#0e171f)
- 边框: 1px (保持不变)

## 用户体验改进

### 可读性改进
1. **更大的字号**: 16px提供更好的可读性
2. **统一的字重**: 400字重提供一致的视觉体验
3. **正确的颜色对比**: 使用设计系统标准颜色

### 视觉一致性
1. **统一的样式**: 所有输入框使用相同的样式规范
2. **设计系统合规**: 符合BTDS设计系统规范
3. **清晰的层次**: Label和Value有明确的视觉层次

### 交互体验
1. **清晰的边框**: 1px边框提供清晰的输入区域边界
2. **一致的状态**: 所有输入框有相同的焦点和悬停状态
3. **平滑的过渡**: 保持原有的过渡动画效果

## 技术实现

### CSS类更新
```css
/* UnifiedLInput边框 */
.border-[1px]

/* PdfInfoSection Label */
.info-config-label {
  font-size: 16px;
  font-weight: 400;
  color: #3e5463;
}

/* PdfInfoSection Input */
.info-config-input {
  font-size: 16px;
  font-weight: 400;
  color: #0e171f;
  border: 1px solid #d1d5db;
}
```

### 组件结构
```vue
<!-- UnifiedLInput使用 -->
<UnifiedLInput
  v-model="value"
  label="Label Text"
  @update:modelValue="handleUpdate"
/>

<!-- PdfInfoSection自定义输入框 -->
<div class="info-config-field">
  <label class="info-config-label">Label</label>
  <input class="info-config-input" v-model="value" />
</div>
```

## 测试验证

### 功能测试
1. ✅ 所有输入框正常渲染
2. ✅ 输入功能正常工作
3. ✅ 数据绑定正常
4. ✅ 焦点和悬停状态正常

### 视觉测试
1. ✅ 边框为1px
2. ✅ Label字号为16px
3. ✅ Label颜色为#3e5463
4. ✅ Value字号为16px
5. ✅ Value颜色为#0e171f

### 一致性测试
1. ✅ 所有输入框样式统一
2. ✅ 符合设计系统规范
3. ✅ 与整体界面协调

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

通过这次更新，Configuration Panel中的所有输入框现在都符合统一的设计规范：

1. **边框统一**: 所有输入框使用1px边框
2. **字体统一**: Label和Value都使用16px字号和400字重
3. **颜色统一**: 使用设计系统标准的颜色值
4. **体验统一**: 所有输入框提供一致的交互体验

这些改进确保了Configuration Panel的视觉一致性和用户体验的连贯性。

---

*更新完成，Configuration Panel中所有输入框样式已统一。*

