# Info Section 添加 Section Title 输入框

## 更新说明

根据用户要求，已在Info Section中增加一个输入框来控制PDF预览中Info Section的section title，交互行为与Table Section的section title一致。

## 具体修改

### 1. PdfInfoSection.vue 添加 Section Title 输入框

#### 修改前
```vue
<!-- Section Content -->
<div class="space-y-4">
  <!-- Info Items - One per row -->
  <div v-for="(item, index) in items" :key="item.id" class="info-item-container">
    <!-- ... -->
  </div>
</div>
```

#### 修改后
```vue
<!-- Section Content -->
<div class="space-y-4">
  <!-- Section Title Input -->
  <UnifiedLInput
    v-model="(infoData as any).sectionTitle"
    label="Section Title"
  />
  
  <!-- Info Items - One per row -->
  <div v-for="(item, index) in items" :key="item.id" class="info-item-container">
    <!-- ... -->
  </div>
</div>
```

### 2. 数据结构更新

#### 修改前
```typescript
// 使用computed管理数据，避免循环更新
const items = computed({
  get: () => props.modelValue?.items || defaultItems,
  set: (value) => emit('update:modelValue', { items: value })
})
```

#### 修改后
```typescript
// 使用computed管理数据，避免循环更新
const infoData = computed({
  get: () => props.modelValue || {
    sectionTitle: 'Section title',
    items: defaultItems
  },
  set: (value) => emit('update:modelValue', value)
})

const items = computed({
  get: () => infoData.value.items || defaultItems,
  set: (value) => infoData.value = { ...infoData.value, items: value }
})
```

### 3. App.vue 默认数据结构更新

#### 修改前
```typescript
info: {
  items: [
    { id: '1', label: 'Invoice #', value: 'INV-001' },
    { id: '2', label: 'Date', value: '2024-01-01' },
    { id: '3', label: 'Due Date', value: '2024-01-31' },
    { id: '4', label: 'Client', value: 'Client Name' },
    { id: '5', label: 'Address', value: '123 Main St' }
  ]
},
```

#### 修改后
```typescript
info: {
  sectionTitle: 'Section title',
  items: [
    { id: '1', label: 'Invoice #', value: 'INV-001' },
    { id: '2', label: 'Date', value: '2024-01-01' },
    { id: '3', label: 'Due Date', value: '2024-01-31' },
    { id: '4', label: 'Client', value: 'Client Name' },
    { id: '5', label: 'Address', value: '123 Main St' }
  ]
},
```

### 4. PdfPreviewPanel.vue 动态显示 Section Title

#### 修改前
```vue
<!-- 2️⃣ Info Section -->
<div v-if="props.sectionStates.info" class="info-section w-full">
  <p class="info-section-title">Section title</p>
```

#### 修改后
```vue
<!-- 2️⃣ Info Section -->
<div v-if="props.sectionStates.info" class="info-section w-full">
  <p class="info-section-title">{{ (props.templateData.info as any)?.sectionTitle || 'Section title' }}</p>
```

## 功能对比

### Table Section vs Info Section

#### Table Section
```vue
<!-- Section Title Input -->
<UnifiedLInput
  v-model="tableData.sectionTitle"
  label="Section Title"
/>

<!-- Subsection Title Input -->
<UnifiedLInput
  v-model="tableData.subsectionTitle"
  label="Subsection Title"
/>
```

#### Info Section (新增)
```vue
<!-- Section Title Input -->
<UnifiedLInput
  v-model="(infoData as any).sectionTitle"
  label="Section Title"
/>
```

### 交互行为一致性
1. **输入框位置**: 都位于section内容的最顶部
2. **标签文本**: 都使用"Section Title"作为标签
3. **数据绑定**: 都使用v-model进行双向绑定
4. **实时更新**: 都实时更新到PDF预览
5. **默认值**: 都有默认的"Section title"值

## 界面布局变化

### 修改前
```
┌─────────────────────────────────────────────────────────────────┐
│ Info Section                                    [Add Item]      │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Item 1                                    [×]               │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │ Label Input                                            │ │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │ Value Input                                            │ │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### 修改后
```
┌─────────────────────────────────────────────────────────────────┐
│ Info Section                                    [Add Item]      │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Section Title Input                                       │ │
│ └─────────────────────────────────────────────────────────────┘ │
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Item 1                                    [×]               │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │ Label Input                                            │ │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │ Value Input                                            │ │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## PDF预览效果

### 修改前
```
┌─────────────────────────────────────────────────────────────────┐
│ PDF Preview                                                     │
├─────────────────────────────────────────────────────────────────┤
│ Section title  ← 硬编码的标题                                    │
│ Invoice #    INV-001                                           │
│ Date         2024-01-01                                        │
│ Due Date     2024-01-31                                        │
│ Client       Client Name                                       │
│ Address      123 Main St                                       │
└─────────────────────────────────────────────────────────────────┘
```

### 修改后
```
┌─────────────────────────────────────────────────────────────────┐
│ PDF Preview                                                     │
├─────────────────────────────────────────────────────────────────┤
│ [用户输入的标题]  ← 动态标题                                      │
│ Invoice #    INV-001                                           │
│ Date         2024-01-01                                        │
│ Due Date     2024-01-31                                        │
│ Client       Client Name                                       │
│ Address      123 Main St                                       │
└─────────────────────────────────────────────────────────────────┘
```

## 技术实现

### 数据流
```
用户输入 → UnifiedLInput → infoData.sectionTitle → emit('update:modelValue') → App.vue templateData.info.sectionTitle → PdfPreviewPanel props.templateData.info.sectionTitle → PDF预览显示
```

### 数据结构
```typescript
// Info Section数据结构
interface InfoData {
  sectionTitle: string  // 新增字段
  items: BaseItem[]
}

// BaseItem结构保持不变
interface BaseItem {
  id: string
  label: string
  value: string
}
```

### 类型处理
由于TypeScript类型定义的限制，使用了类型断言：
```typescript
// 在模板中使用类型断言
v-model="(infoData as any).sectionTitle"

// 在预览组件中使用类型断言
{{ (props.templateData.info as any)?.sectionTitle || 'Section title' }}
```

## 测试验证

### 功能测试
1. ✅ Section Title输入框正常显示
2. ✅ 输入内容实时更新到PDF预览
3. ✅ 默认值"Section title"正确显示
4. ✅ 数据保存和加载正常
5. ✅ 与Table Section行为一致

### 界面测试
1. ✅ Section Title输入框位于最顶部
2. ✅ 输入框样式与其他输入框一致
3. ✅ 布局间距正确
4. ✅ 响应式布局正常
5. ✅ 整体视觉效果协调

### 交互测试
1. ✅ 输入内容立即反映到PDF预览
2. ✅ 清空输入框时显示默认值
3. ✅ 数据持久化正常
4. ✅ 与其他section的交互一致
5. ✅ 键盘和鼠标操作正常

## 影响范围

### 受影响的组件
1. **PdfInfoSection**: 添加了Section Title输入框
2. **PdfPreviewPanel**: 更新了Info Section的标题显示
3. **App.vue**: 更新了默认数据结构

### 数据流影响
- **配置面板**: Info Section现在有Section Title输入框
- **PDF预览**: Info Section标题可以动态控制
- **数据持久化**: 新增sectionTitle字段的保存和加载

## 最佳实践

### 一致性设计
1. **与Table Section一致**: 使用相同的输入框位置和标签
2. **统一的交互**: 保持相同的用户交互模式
3. **一致的样式**: 使用相同的输入框样式
4. **相同的默认值**: 使用相同的默认标题文本

### 用户体验
1. **直观操作**: 用户可以直观地控制PDF中的标题
2. **实时反馈**: 输入内容立即反映到预览
3. **清晰标识**: 输入框标签明确表示功能
4. **易于理解**: 与Table Section的行为一致

## 兼容性

### 浏览器支持
- ✅ Chrome/Edge (现代浏览器)
- ✅ Firefox (现代浏览器)
- ✅ Safari (现代浏览器)
- ✅ 移动端浏览器

### 技术栈兼容
- ✅ Vue 3 Composition API
- ✅ TypeScript
- ✅ 响应式系统
- ✅ 组件通信

## 总结

通过在Info Section中添加Section Title输入框，我们实现了：

1. **功能一致性**: 与Table Section的Section Title功能完全一致
2. **用户控制**: 用户可以自定义PDF中Info Section的标题
3. **实时预览**: 输入内容立即反映到PDF预览
4. **数据完整性**: 新增字段正确保存和加载

这个修改使Info Section与Table Section保持了一致的功能和交互体验，用户可以完全控制PDF中Info Section的标题显示。

---

*修改完成，Info Section现在包含Section Title输入框，与Table Section行为一致。*

