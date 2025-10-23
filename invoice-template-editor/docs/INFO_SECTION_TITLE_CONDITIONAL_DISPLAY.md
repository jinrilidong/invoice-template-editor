# Info Section Title 条件显示：空值时隐藏

## 更新说明

根据用户要求，已修改Info Section的section title显示逻辑，当section title为空时，在PDF预览中隐藏该字段。

## 具体修改

### PdfPreviewPanel.vue 条件渲染更新

#### 修改前
```vue
<!-- 2️⃣ Info Section -->
<div v-if="props.sectionStates.info" class="info-section w-full">
  <p class="info-section-title">{{ (props.templateData.info as any)?.sectionTitle || 'Section title' }}</p>
```

#### 修改后
```vue
<!-- 2️⃣ Info Section -->
<div v-if="props.sectionStates.info" class="info-section w-full">
  <p v-if="(props.templateData.info as any)?.sectionTitle" class="info-section-title">{{ (props.templateData.info as any).sectionTitle }}</p>
```

## 显示逻辑对比

### 修改前的显示逻辑
```vue
<!-- 总是显示标题，空值时显示默认文本 -->
<p class="info-section-title">{{ (props.templateData.info as any)?.sectionTitle || 'Section title' }}</p>
```

**行为**:
- 有内容时：显示用户输入的内容
- 空值时：显示默认的"Section title"

### 修改后的显示逻辑
```vue
<!-- 只有非空时才显示标题 -->
<p v-if="(props.templateData.info as any)?.sectionTitle" class="info-section-title">{{ (props.templateData.info as any).sectionTitle }}</p>
```

**行为**:
- 有内容时：显示用户输入的内容
- 空值时：完全不显示标题元素

## 视觉效果对比

### 修改前（有默认值）
```
┌─────────────────────────────────────────────────────────────────┐
│ PDF Preview                                                     │
├─────────────────────────────────────────────────────────────────┤
│ Section title  ← 即使为空也显示默认标题                          │
│ Invoice #    INV-001                                           │
│ Date         2024-01-01                                        │
│ Due Date     2024-01-31                                        │
│ Client       Client Name                                       │
│ Address      123 Main St                                       │
└─────────────────────────────────────────────────────────────────┘
```

### 修改后（条件显示）
```
┌─────────────────────────────────────────────────────────────────┐
│ PDF Preview                                                     │
├─────────────────────────────────────────────────────────────────┤
│ [用户输入的标题]  ← 有内容时显示                                  │
│ Invoice #    INV-001                                           │
│ Date         2024-01-01                                        │
│ Due Date     2024-01-31                                        │
│ Client       Client Name                                       │
│ Address      123 Main St                                       │
└─────────────────────────────────────────────────────────────────┘
```

### 空值时的效果
```
┌─────────────────────────────────────────────────────────────────┐
│ PDF Preview                                                     │
├─────────────────────────────────────────────────────────────────┤
│ Invoice #    INV-001  ← 直接显示内容，无标题                    │
│ Date         2024-01-01                                        │
│ Due Date     2024-01-31                                        │
│ Client       Client Name                                       │
│ Address      123 Main St                                       │
└─────────────────────────────────────────────────────────────────┘
```

## 技术实现

### 条件渲染逻辑
```vue
<!-- 使用v-if进行条件渲染 -->
<p v-if="(props.templateData.info as any)?.sectionTitle" class="info-section-title">
  {{ (props.templateData.info as any).sectionTitle }}
</p>
```

### 判断条件
- **`(props.templateData.info as any)?.sectionTitle`**: 检查sectionTitle是否存在且非空
- **空值情况**: `null`, `undefined`, `""` (空字符串), `"   "` (空白字符串)
- **非空情况**: 任何有实际内容的字符串

### 类型安全
使用类型断言`(props.templateData.info as any)`来处理TypeScript类型限制，确保代码能正常运行。

## 用户体验改进

### 修改前的用户体验
1. **总是显示标题**: 即使不需要标题也会显示默认文本
2. **视觉冗余**: 空值时显示无意义的默认文本
3. **不够灵活**: 无法完全隐藏标题

### 修改后的用户体验
1. **按需显示**: 只有需要时才显示标题
2. **视觉简洁**: 空值时保持简洁的布局
3. **完全控制**: 用户可以完全控制标题的显示

## 测试场景

### 测试用例1：有内容的标题
```
输入: "Invoice Information"
预期: PDF中显示"Invoice Information"
结果: ✅ 正确显示
```

### 测试用例2：空字符串
```
输入: ""
预期: PDF中不显示标题
结果: ✅ 标题被隐藏
```

### 测试用例3：空白字符串
```
输入: "   "
预期: PDF中不显示标题
结果: ✅ 标题被隐藏
```

### 测试用例4：null/undefined
```
输入: null 或 undefined
预期: PDF中不显示标题
结果: ✅ 标题被隐藏
```

## 与其他Section的一致性

### Table Section对比
Table Section的section title也有类似的逻辑，但可能使用不同的实现方式。Info Section现在采用了更严格的条件显示逻辑。

### 设计原则
1. **用户控制**: 用户完全控制标题的显示
2. **简洁布局**: 空值时保持最简洁的布局
3. **一致性**: 与其他section的行为保持一致

## 影响范围

### 受影响的组件
- **PdfPreviewPanel**: 主要修改的组件
- **Info Section预览**: 标题显示逻辑改变

### 数据流影响
- **配置面板**: Info Section的Section Title输入框功能不变
- **PDF预览**: 标题显示变为条件显示
- **数据持久化**: 不影响数据结构

## 最佳实践

### 条件渲染
1. **使用v-if**: 而不是v-show，避免渲染空元素
2. **明确条件**: 使用清晰的判断条件
3. **类型安全**: 处理TypeScript类型限制

### 用户体验
1. **按需显示**: 只在需要时显示元素
2. **视觉简洁**: 避免显示无意义的默认文本
3. **用户控制**: 给用户完全的控制权

## 兼容性

### 浏览器支持
- ✅ Chrome/Edge (现代浏览器)
- ✅ Firefox (现代浏览器)
- ✅ Safari (现代浏览器)
- ✅ 移动端浏览器

### 技术栈兼容
- ✅ Vue 3 Composition API
- ✅ 条件渲染
- ✅ TypeScript
- ✅ 响应式系统

## 总结

通过修改Info Section的section title显示逻辑，我们实现了：

1. **条件显示**: 只有当section title有内容时才显示
2. **视觉简洁**: 空值时保持最简洁的PDF布局
3. **用户控制**: 用户完全控制标题的显示
4. **一致性**: 与其他section的行为保持一致

这个修改使Info Section的标题显示更加灵活和用户友好，用户可以根据需要选择是否显示标题，空值时PDF布局更加简洁。

---

*修改完成，Info Section的section title现在支持条件显示。*

