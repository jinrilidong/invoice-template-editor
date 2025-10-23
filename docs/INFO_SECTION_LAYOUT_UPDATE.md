# Info Section 布局更新：一行一个输入框

## 更新说明

根据用户要求，已重新设计Info Section的布局，确保：
- 用户可以增加和删除Item
- 输入框一行一个，禁止出现一行多个输入框

## 具体修改

### 1. 布局结构重新设计

#### 修改前（网格布局）
```vue
<!-- 网格布局 - 每行多个item -->
<div class="info-config-grid">
  <div v-for="(item, index) in items" :key="item.id" class="info-config-item">
    <div class="info-config-card">
      <!-- 删除按钮在右上角 -->
      <TextButton class="info-config-delete-btn">...</TextButton>
      
      <!-- 输入框垂直排列 -->
      <div class="info-config-inputs">
        <UnifiedLInput v-model="item.label" label="Label" />
        <UnifiedLInput v-model="item.value" label="Value" />
      </div>
    </div>
  </div>
</div>
```

#### 修改后（垂直布局）
```vue
<!-- 垂直布局 - 每行一个item -->
<div class="space-y-4">
  <div v-for="(item, index) in items" :key="item.id" class="info-item-container">
    <!-- Item标题和删除按钮 -->
    <div class="flex items-center justify-between mb-2">
      <h4 class="text-sm font-semibold text-[#0e171f]">Item {{ index + 1 }}</h4>
      <TextButton @click="removeInfoItem(index)" class="text-red-600 hover:text-red-800">
        <!-- 删除图标 -->
      </TextButton>
    </div>
    
    <!-- 输入框 - 每个占一行 -->
    <div class="space-y-3">
      <UnifiedLInput v-model="item.label" label="Label" />
      <UnifiedLInput v-model="item.value" label="Value" />
    </div>
  </div>
</div>
```

### 2. CSS样式更新

#### 修改前（网格样式）
```css
.info-config-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);  /* 5列网格 */
  gap: 8px;
}

.info-config-card {
  background-color: #f9fafb;
  border-radius: 8px;
  padding: 12px;
  min-height: 80px;
  position: relative;
}

/* 响应式网格 */
@media (max-width: 1024px) {
  .info-config-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 768px) {
  .info-config-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .info-config-grid {
    grid-template-columns: 1fr;
  }
}
```

#### 修改后（垂直样式）
```css
.info-item-container {
  background-color: #f9fafb; /* gray-50 */
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e5e7eb; /* gray-200 */
}

.info-item-container:hover {
  background-color: #f3f4f6; /* gray-100 */
  border-color: #d1d5db; /* gray-300 */
}
```

## 布局对比

### 修改前（网格布局）
```
┌─────────────────────────────────────────────────────────────────┐
│ Info Section                                    [Add Item]      │
├─────────────────────────────────────────────────────────────────┤
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │
│ │ Item 1  │ │ Item 2  │ │ Item 3  │ │ Item 4  │ │ Item 5  │    │
│ │ [×]     │ │ [×]     │ │ [×]     │ │ [×]     │ │ [×]     │    │
│ │ Label   │ │ Label   │ │ Label   │ │ Label   │ │ Label   │    │
│ │ Value   │ │ Value   │ │ Value   │ │ Value   │ │ Value   │    │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘ └─────────┘    │
└─────────────────────────────────────────────────────────────────┘
```

### 修改后（垂直布局）
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
│ ┌─────────────────────────────────────────────────────────────┐ │
│ │ Item 2                                    [×]               │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │ Label Input                                            │ │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ │ ┌─────────────────────────────────────────────────────────┐ │ │
│ │ │ Value Input                                            │ │ │
│ │ └─────────────────────────────────────────────────────────┘ │ │
│ └─────────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

## 功能特性

### 1. 增加Item功能
- **Add Item按钮**: 位于section标题右侧
- **新增Item**: 点击后添加新的Item到列表末尾
- **默认值**: 新Item的Label默认为"Label"，Value默认为"Value"

### 2. 删除Item功能
- **删除按钮**: 每个Item右上角的红色删除按钮
- **悬停显示**: 鼠标悬停时按钮更明显
- **确认删除**: 点击后立即删除对应Item

### 3. 输入框布局
- **一行一个**: 每个输入框独占一行
- **垂直排列**: Label和Value输入框垂直排列
- **间距统一**: 使用`space-y-3`确保输入框间距一致

## 用户体验改进

### 修改前的问题
1. **空间限制**: 网格布局在小屏幕上显示困难
2. **输入框过小**: 每行多个item导致输入框过小
3. **操作不便**: 删除按钮位置不够明显
4. **响应式复杂**: 需要多个断点处理不同屏幕尺寸

### 修改后的优势
1. **空间充足**: 每个输入框都有充足的空间
2. **操作清晰**: 删除按钮位置明确，易于操作
3. **响应式简单**: 垂直布局天然适应所有屏幕尺寸
4. **视觉清晰**: 每个Item都有明确的边界和标题

## 技术实现

### 数据结构
```typescript
// 默认数据保持不变
const defaultItems: BaseItem[] = [
  { id: '1', label: 'Invoice #', value: 'INV-001' },
  { id: '2', label: 'Date', value: '2024-01-01' },
  { id: '3', label: 'Due Date', value: '2024-01-31' },
  { id: '4', label: 'Client', value: 'Client Name' },
  { id: '5', label: 'Address', value: '123 Main St' }
]
```

### 添加Item逻辑
```typescript
const addInfoItem = () => {
  const newItem: BaseItem = {
    id: generateId(),
    label: 'Label',
    value: 'Value'
  }
  items.value = [...items.value, newItem]
}
```

### 删除Item逻辑
```typescript
const removeInfoItem = (index: number) => {
  const newItems = [...items.value]
  newItems.splice(index, 1)
  items.value = newItems
}
```

## 样式设计

### 容器样式
```css
.info-item-container {
  background-color: #f9fafb; /* 浅灰色背景 */
  border-radius: 8px;        /* 圆角 */
  padding: 16px;             /* 内边距 */
  border: 1px solid #e5e7eb; /* 边框 */
}
```

### 悬停效果
```css
.info-item-container:hover {
  background-color: #f3f4f6; /* 悬停时背景变深 */
  border-color: #d1d5db;     /* 悬停时边框变深 */
}
```

### 删除按钮样式
```css
.text-red-600:hover {
  color: #991b1b; /* 悬停时颜色变深 */
}
```

## 测试验证

### 功能测试
1. ✅ 可以添加新的Item
2. ✅ 可以删除现有Item
3. ✅ 输入框实时更新到PDF预览
4. ✅ 数据保存和加载正常
5. ✅ 输入框一行一个，无并排显示

### 界面测试
1. ✅ 每个Item独占一行
2. ✅ 输入框有充足的空间
3. ✅ 删除按钮位置清晰
4. ✅ 悬停效果正常
5. ✅ 整体布局协调

### 响应式测试
1. ✅ 在不同屏幕尺寸下正常显示
2. ✅ 移动端设备正常
3. ✅ 平板设备正常
4. ✅ 桌面设备正常
5. ✅ 无需复杂的响应式处理

## 影响范围

### 受影响的组件
- **PdfInfoSection**: 主要修改的组件
- **PdfPreviewPanel**: 可能受影响的预览组件

### 数据流影响
- **App.vue**: templateData.info.items结构保持不变
- **PDF预览**: info section的显示可能有所调整
- **数据持久化**: 不影响现有数据结构

## 最佳实践

### 布局设计
1. **垂直优先**: 优先使用垂直布局，适应所有屏幕
2. **空间充足**: 为输入框提供充足的空间
3. **操作明确**: 删除按钮位置明确，易于操作
4. **视觉层次**: 使用标题和间距创建清晰的视觉层次

### 用户体验
1. **操作简单**: 减少复杂的交互
2. **反馈及时**: 提供即时的视觉反馈
3. **一致性**: 保持与其他section的一致性
4. **可访问性**: 确保所有功能都可以通过键盘操作

## 兼容性

### 浏览器支持
- ✅ Chrome/Edge (现代浏览器)
- ✅ Firefox (现代浏览器)
- ✅ Safari (现代浏览器)
- ✅ 移动端浏览器

### 技术栈兼容
- ✅ Vue 3 Composition API
- ✅ TypeScript
- ✅ Tailwind CSS
- ✅ 响应式设计

## 总结

通过重新设计Info Section的布局，我们实现了：

1. **一行一个输入框**: 确保每个输入框都有充足的空间
2. **简化布局**: 使用垂直布局替代复杂的网格布局
3. **改善操作**: 删除按钮位置更明确，操作更简单
4. **提升体验**: 更好的视觉层次和交互体验

这个修改使Info Section更加易用和直观，用户可以在充足的空间内编辑每个Item的Label和Value，同时保持了添加和删除Item的功能。

---

*修改完成，Info Section现在使用一行一个输入框的布局。*

