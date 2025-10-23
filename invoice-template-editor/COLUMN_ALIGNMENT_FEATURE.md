# Column 对齐功能实现

## 用户要求

每个 column 都可以选择 name 和 内容 是左对齐或右对齐。

## 功能实现

### 1. 对齐选择器

为每个column添加了左对齐/右对齐的选择按钮，用户可以独立设置每个column的对齐方式。

### 2. 界面设计

#### 对齐选择器样式
- **选中状态**: 蓝色背景 (`bg-blue-100`)，蓝色边框 (`border-blue-300`)，蓝色文字 (`text-blue-700`)
- **未选中状态**: 白色背景 (`bg-white`)，灰色边框 (`border-gray-300`)，灰色文字 (`text-gray-600`)
- **悬停效果**: 浅灰色背景 (`hover:bg-gray-50`)

#### 布局结构
```
Column Name Input
    ↓ 12px间距
Alignment Selector (Left | Right)
    ↓ 12px间距
Delete Button (右对齐)
```

## 技术实现

### 1. 组件结构

```vue
<div v-for="(column, index) in tableData.columns" :key="column.id" class="space-y-3">
  <!-- Column Name Input -->
  <div>
    <UnifiedLInput
      v-model="column.name"
      :label="`Column ${index + 1}`"
    />
  </div>
  
  <!-- Alignment Selector -->
  <div class="flex items-center gap-3">
    <label class="text-sm font-medium text-gray-600">Alignment:</label>
    <div class="flex gap-2">
      <button @click="column.alignment = 'left'" :class="[...]">Left</button>
      <button @click="column.alignment = 'right'" :class="[...]">Right</button>
    </div>
  </div>
  
  <!-- Delete Button -->
  <div class="flex justify-end">
    <button @click="removeColumn(index)">...</button>
  </div>
</div>
```

### 2. 对齐按钮样式

#### 选中状态样式
```vue
:class="[
  'px-3 py-1 text-sm rounded-md border transition-colors',
  column.alignment === 'left' 
    ? 'bg-blue-100 border-blue-300 text-blue-700' 
    : 'bg-white border-gray-300 text-gray-600 hover:bg-gray-50'
]"
```

#### 动态样式切换
- **Left按钮**: 当`column.alignment === 'left'`时显示选中状态
- **Right按钮**: 当`column.alignment === 'right'`时显示选中状态
- **过渡效果**: `transition-colors`提供平滑的颜色过渡

### 3. 数据绑定

#### TableColumn接口
```typescript
export interface TableColumn {
  id: string
  name: string
  type: string
  alignment: 'left' | 'right'  // 已有的对齐属性
}
```

#### 默认数据
```typescript
const defaultTableData: TableData = {
  // ...
  columns: [
    { id: '1', name: 'Item', type: 'text', alignment: 'left' },
    { id: '2', name: 'Description', type: 'text', alignment: 'left' },
    { id: '3', name: 'Quantity', type: 'number', alignment: 'right' },
    { id: '4', name: 'Price', type: 'currency', alignment: 'right' }
  ],
  // ...
}
```

## PDF预览应用

### 1. 列标题对齐

```vue
<p class="font-medium leading-2.25 w-full" 
   :class="{ 'text-right': column.alignment === 'right' }"
   style="font-size: 7px; color: #919191;">
  {{ column.name || 'Column Name' }}
</p>
```

### 2. 列内容对齐

```vue
<p class="font-normal leading-2.25 text-black w-full" 
   :class="{ 'text-right': column.alignment === 'right' }"
   style="font-size: 7px; word-wrap: break-word; white-space: normal; overflow-wrap: break-word;">
  {{ row.data[column.id] || 'Line 1' }}
</p>
```

### 3. 对齐逻辑

- **左对齐**: 默认状态，不添加额外class
- **右对齐**: 添加`text-right` class
- **实时更新**: 配置面板中的对齐设置会立即反映在PDF预览中

## 用户体验

### 1. 操作流程

1. **添加列**: 点击"Add Column"按钮
2. **设置名称**: 在"Column X"输入框中输入列名
3. **选择对齐**: 点击"Left"或"Right"按钮
4. **实时预览**: 在PDF预览中立即看到对齐效果
5. **删除列**: 点击删除按钮移除不需要的列

### 2. 视觉反馈

- **选中状态**: 蓝色高亮显示当前选中的对齐方式
- **悬停效果**: 鼠标悬停时按钮背景变浅
- **平滑过渡**: 颜色变化有平滑的过渡效果
- **即时更新**: 选择对齐方式后PDF预览立即更新

### 3. 布局优化

- **垂直布局**: 每个column的配置项垂直排列，层次清晰
- **合理间距**: 使用`space-y-3`提供12px的垂直间距
- **右对齐删除**: 删除按钮右对齐，视觉平衡
- **标签清晰**: "Alignment:"标签明确指示功能

## 功能特点

### 1. 独立控制
- **每列独立**: 每个column可以独立设置对齐方式
- **名称对齐**: 列标题使用相同的对齐设置
- **内容对齐**: 列内容使用相同的对齐设置
- **实时同步**: 配置和预览实时同步

### 2. 类型支持
- **文本列**: 支持左对齐和右对齐
- **数字列**: 通常使用右对齐，便于数字比较
- **货币列**: 通常使用右对齐，符合财务习惯
- **灵活配置**: 用户可以根据需要自由选择

### 3. 数据持久化
- **状态保持**: 对齐设置会保存在templateData中
- **自动保存**: 配置变化会自动保存到localStorage
- **加载恢复**: 页面刷新后对齐设置会恢复

## 测试验证

### 1. 功能测试
- ✅ 添加新列时默认左对齐
- ✅ 点击Left按钮设置为左对齐
- ✅ 点击Right按钮设置为右对齐
- ✅ 对齐设置实时反映在PDF预览中
- ✅ 删除列功能正常工作

### 2. 界面测试
- ✅ 对齐按钮样式正确
- ✅ 选中状态高亮显示
- ✅ 悬停效果正常
- ✅ 布局间距合理
- ✅ 响应式设计正常

### 3. 数据测试
- ✅ 对齐设置正确保存
- ✅ 数据同步正常
- ✅ 页面刷新后设置恢复
- ✅ 多列配置独立工作

## 技术优势

### 1. 用户体验
- **直观操作**: 点击按钮即可切换对齐方式
- **即时反馈**: 选择后立即在预览中看到效果
- **视觉清晰**: 选中状态明确，操作结果可见
- **操作简单**: 无需复杂配置，一键切换

### 2. 技术实现
- **类型安全**: 使用TypeScript确保类型安全
- **响应式**: 基于Vue 3的响应式系统
- **组件化**: 复用现有的UnifiedLInput组件
- **样式统一**: 使用Tailwind CSS保持样式一致

### 3. 扩展性
- **接口完整**: TableColumn接口已包含alignment属性
- **易于扩展**: 可以轻松添加更多对齐选项（如居中对齐）
- **向后兼容**: 现有数据自动使用默认左对齐
- **功能独立**: 对齐功能不影响其他功能

## 总结

成功实现了column对齐功能：

1. **功能完整**: 每个column都可以独立设置左对齐或右对齐
2. **界面友好**: 直观的按钮选择器，清晰的视觉反馈
3. **实时预览**: 配置变化立即反映在PDF预览中
4. **数据持久**: 对齐设置会保存和恢复
5. **用户体验**: 操作简单，反馈及时，效果明显

现在用户可以灵活地为每个column设置对齐方式，满足不同的表格显示需求。

---

*Column对齐功能实现完成，用户可以为每个column独立设置对齐方式。*

