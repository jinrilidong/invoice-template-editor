# Item Group 样式统一更新

## 更新概述

将Info Section的Item样式应用到Table Section的Column配置中，创建统一的"item group"样式，提升用户体验的一致性。

## 样式结构分析

### Info Section Item 样式结构
```vue
<div class="info-item-container">
  <!-- Item Header -->
  <div class="flex items-center justify-between mb-2">
    <h4 class="text-sm font-semibold text-[#0e171f]">Item {{ index + 1 }}</h4>
    <TextButton @click="removeInfoItem(index)" variant="default" size="sm">
      <!-- X icon -->
    </TextButton>
  </div>
  
  <!-- Input Fields - One per row -->
  <div class="space-y-3">
    <UnifiedLInput v-model="item.label" label="Label" />
    <UnifiedLInput v-model="item.value" label="Value" />
  </div>
</div>
```

### CSS 样式
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

## Table Section 更新

### 更新前结构
```vue
<div v-for="(column, index) in tableData.columns" :key="column.id" class="space-y-3">
  <!-- Column Name Input -->
  <div>
    <UnifiedLInput v-model="column.name" :label="`Column ${index + 1}`" />
  </div>
  
  <!-- Alignment Selector -->
  <div class="flex items-center gap-3">
    <label class="text-sm font-medium text-gray-600">Alignment:</label>
    <!-- Left/Right buttons -->
  </div>
  
  <!-- Delete Button -->
  <div class="flex justify-end">
    <button @click="removeColumn(index)">
      <!-- X icon -->
    </button>
  </div>
</div>
```

### 更新后结构
```vue
<div v-for="(column, index) in tableData.columns" :key="column.id" class="item-group-container">
  <!-- Item Header -->
  <div class="flex items-center justify-between mb-2">
    <h4 class="text-sm font-semibold text-[#0e171f]">Column {{ index + 1 }}</h4>
    <TextButton @click="removeColumn(index)" variant="default" size="sm">
      <!-- X icon -->
    </TextButton>
  </div>
  
  <!-- Input Fields - One per row -->
  <div class="space-y-3">
    <!-- Column Name Input -->
    <UnifiedLInput v-model="column.name" label="Column Name" />
    
    <!-- Alignment Selector -->
    <div class="flex items-center gap-3">
      <label class="text-sm font-medium text-gray-600">Alignment:</label>
      <!-- Left/Right buttons -->
    </div>
  </div>
</div>
```

## 主要改进

### 1. 视觉一致性
- **统一容器样式**: 使用相同的背景色、边框、圆角和内边距
- **统一标题样式**: 使用相同的字体大小、颜色和布局
- **统一按钮样式**: 使用TextButton组件替代原生button

### 2. 布局优化
- **Header布局**: 标题和删除按钮在同一行，左右对齐
- **内容布局**: 输入框和控件垂直排列，间距一致
- **响应式设计**: 悬停效果提升交互体验

### 3. 组件统一
- **TextButton**: 删除按钮使用统一的TextButton组件
- **UnifiedLInput**: 输入框使用统一的UnifiedLInput组件
- **CSS类名**: 使用统一的item-group-container类名

## 样式规范

### 容器样式
```css
.item-group-container {
  background-color: #f9fafb; /* gray-50 */
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #e5e7eb; /* gray-200 */
}

.item-group-container:hover {
  background-color: #f3f4f6; /* gray-100 */
  border-color: #d1d5db; /* gray-300 */
}
```

### 标题样式
- **字体**: `text-sm font-semibold`
- **颜色**: `text-[#0e171f]`
- **布局**: 与删除按钮在同一行，左右对齐

### 按钮样式
- **组件**: TextButton
- **变体**: default
- **大小**: sm
- **颜色**: `text-red-600 hover:text-red-800`

### 输入框样式
- **组件**: UnifiedLInput
- **标签**: "Column Name"
- **布局**: 垂直排列，间距16px

## 功能保持

### 1. 添加/删除功能
- ✅ **Add Column**: 功能保持不变
- ✅ **Delete Column**: 功能保持不变，样式统一
- ✅ **数据同步**: 所有操作实时反映到PDF预览

### 2. 对齐设置
- ✅ **Left/Right按钮**: 功能保持不变
- ✅ **视觉反馈**: 选中状态样式保持不变
- ✅ **数据绑定**: 对齐设置正确保存和应用

### 3. 输入验证
- ✅ **Column Name**: 输入验证保持不变
- ✅ **实时更新**: 输入内容实时反映到PDF预览
- ✅ **数据持久化**: 所有设置正确保存

## 用户体验提升

### 1. 视觉一致性
- **统一设计语言**: 所有item group使用相同的视觉样式
- **清晰层次**: 标题、内容和操作按钮层次分明
- **专业外观**: 整体界面更加专业和统一

### 2. 交互体验
- **悬停效果**: 鼠标悬停时容器高亮
- **按钮反馈**: 删除按钮有明确的视觉反馈
- **操作直观**: 所有操作按钮位置和样式一致

### 3. 可维护性
- **代码复用**: 使用统一的组件和样式
- **样式集中**: CSS样式集中管理，易于维护
- **组件化**: 使用标准组件，便于扩展

## 技术实现

### 1. 组件更新
- **PdfTableSection.vue**: 更新Column配置的HTML结构
- **CSS样式**: 添加item-group-container样式类
- **组件导入**: 确保TextButton组件正确导入

### 2. 样式继承
- **Info Section**: 保持原有样式不变
- **Table Section**: 继承Info Section的样式规范
- **未来扩展**: 其他section可以复用相同的样式规范

### 3. 响应式设计
- **移动端适配**: 样式在不同屏幕尺寸下正常显示
- **交互反馈**: 悬停和点击效果在所有设备上正常工作
- **性能优化**: 使用CSS transition提升动画效果

## 测试验证

### 1. 功能测试
- ✅ **添加列**: 点击Add Column按钮正常添加新列
- ✅ **删除列**: 点击X按钮正常删除列
- ✅ **对齐设置**: Left/Right按钮正常工作
- ✅ **输入更新**: Column Name输入实时更新

### 2. 样式测试
- ✅ **容器样式**: 背景色、边框、圆角正确显示
- ✅ **悬停效果**: 鼠标悬停时样式正确变化
- ✅ **按钮样式**: 删除按钮样式与Info Section一致
- ✅ **布局对齐**: 标题和按钮正确对齐

### 3. 兼容性测试
- ✅ **浏览器兼容**: 在主流浏览器中正常显示
- ✅ **响应式**: 在不同屏幕尺寸下正常显示
- ✅ **性能**: 样式更新不影响页面性能

## 总结

成功将Info Section的Item样式应用到Table Section的Column配置中，实现了：

1. **视觉统一**: 所有item group使用相同的视觉样式
2. **交互一致**: 删除按钮和布局保持一致
3. **功能完整**: 所有原有功能正常工作
4. **代码优化**: 使用统一组件和样式规范
5. **用户体验**: 整体界面更加专业和易用

现在Table Section的Column配置具有与Info Section相同的item group样式，提升了整个应用的一致性和用户体验。

---

*Item Group样式统一更新完成，Table Section现在使用与Info Section相同的视觉样式。*

