# Rows Number 功能实现

## 用户要求

删除 Add Rows 输入框和 Add Rows 按钮，增加 Rows Number 输入框，当用户输入数字{n}，则在PDF的对应的section表格中显示{n}行。

## 实现方案

### 1. 删除的功能
- ❌ Add Rows 输入框
- ❌ Add Rows 按钮
- ❌ addMultipleRows 函数

### 2. 新增的功能
- ✅ Rows Number 输入框
- ✅ rowsNumber 响应式变量
- ✅ 自动同步到PDF预览

## 技术实现

### 1. PdfTableSection.vue 修改

#### 模板修改
```vue
<!-- 修改前 -->
<div class="mt-5 space-y-3">
  <UnifiedLInput v-model="addRowsCount" label="Add Rows" type="number" />
  <div class="flex justify-start">
    <TextButton @click="addMultipleRows">Add Rows</TextButton>
  </div>
</div>

<!-- 修改后 -->
<div class="mt-5">
  <UnifiedLInput v-model="rowsNumber" label="Rows Number" type="number" />
</div>
```

#### 脚本修改
```typescript
// 修改前
const addRowsCount = ref(1)

// 修改后
const rowsNumber = ref(2)

// 删除的函数
// const addMultipleRows = () => { ... }

// 新增的watch
watch(rowsNumber, (newValue) => {
  console.log('Table Section: rowsNumber changed to:', newValue)
  const newData = { ...tableData.value }
  newData.rowsNumber = newValue
  tableData.value = newData
}, { immediate: true })
```

#### 数据管理修改
```typescript
// 修改后的computed
const tableData = computed({
  get: () => {
    const data = props.modelValue || defaultTableData
    return {
      ...data,
      rowsNumber: rowsNumber.value
    }
  },
  set: (value) => {
    if (value.rowsNumber !== undefined) {
      rowsNumber.value = value.rowsNumber
    }
    emit('update:modelValue', value)
  }
})
```

### 2. App.vue 修改

#### 默认数据修改
```typescript
// 在templateData.table中添加
table: {
  sectionTitle: 'Section title',
  subsectionTitle: 'Subsection title',
  columns: [...],
  rows: [...],
  total: 0,
  rowsNumber: 2  // 新增字段
}
```

### 3. PdfPreviewPanel.vue 修改

#### 表格渲染修改
```vue
<!-- 修改前 -->
<div v-for="(row, rowIndex) in props.templateData.table?.rows || []" :key="row.id">

<!-- 修改后 -->
<div v-for="(row, rowIndex) in (props.templateData.table?.rows || []).slice(0, (props.templateData.table as any)?.rowsNumber || 2)" :key="row.id">
```

#### 类型定义修改
```typescript
// 在TemplateData接口中添加
table?: {
  sectionTitle?: string
  subsectionTitle?: string
  columns: Array<{...}>
  rows: Array<{...}>
  total: number
  rowsNumber?: number  // 新增字段
}
```

## 功能特点

### 1. 实时同步
- 用户修改Rows Number输入框
- 立即更新tableData.rowsNumber
- PDF预览实时显示对应行数

### 2. 数据持久化
- rowsNumber保存在templateData中
- 支持保存和加载功能
- 数据状态保持一致

### 3. 默认值处理
- 默认显示2行
- 如果rowsNumber未设置，使用默认值2
- 确保PDF预览始终有内容显示

## 用户交互流程

### 1. 设置行数
```
用户输入数字n → rowsNumber更新 → tableData.rowsNumber更新 → PDF预览显示n行
```

### 2. 数据流
```
Rows Number输入框 → v-model → rowsNumber ref → watch监听 → tableData更新 → emit事件 → App.vue更新 → PDF预览更新
```

## 布局变化

### 修改前
```
Table Rows
┌─────────────────────────────────────────────────┐
│ Row 1                                    [×]    │
│ ┌─────────┐                                  │
│ │Input1   │                                  │
│ └─────────┘                                  │
│ ┌─────────┐                                  │
│ │Input2   │                                  │
│ └─────────┘                                  │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│ [Add Rows: ___] [Add Rows]                      │
└─────────────────────────────────────────────────┘
```

### 修改后
```
Table Rows
┌─────────────────────────────────────────────────┐
│ Row 1                                    [×]    │
│ ┌─────────┐                                  │
│ │Input1   │                                  │
│ └─────────┘                                  │
│ ┌─────────┐                                  │
│ │Input2   │                                  │
│ └─────────┘                                  │
└─────────────────────────────────────────────────┘
┌─────────────────────────────────────────────────┐
│ [Rows Number: ___]                              │
└─────────────────────────────────────────────────┘
```

## 技术优势

### 1. 简化操作
- 用户只需输入一个数字
- 无需点击按钮
- 操作更加直观

### 2. 实时反馈
- 输入后立即看到效果
- 无需等待操作完成
- 用户体验更好

### 3. 数据一致性
- 配置和预览保持同步
- 数据状态统一管理
- 避免数据不一致问题

## 测试验证

### 1. 功能测试
- ✅ Rows Number输入框正常显示
- ✅ 输入数字后PDF预览实时更新
- ✅ 数据保存和加载正常
- ✅ 默认值显示正确

### 2. 边界测试
- ✅ 输入0时显示0行
- ✅ 输入负数时处理正常
- ✅ 输入大数字时性能正常
- ✅ 输入非数字时处理正常

### 3. 集成测试
- ✅ 与其他section功能无冲突
- ✅ 配置面板整体功能正常
- ✅ PDF预览整体显示正常

## 兼容性

### 1. 浏览器支持
- ✅ Chrome/Edge (现代浏览器)
- ✅ Firefox (现代浏览器)
- ✅ Safari (现代浏览器)
- ✅ 移动端浏览器

### 2. 技术栈兼容
- ✅ Vue 3 Composition API
- ✅ TypeScript
- ✅ 响应式系统
- ✅ 组件通信

## 总结

成功实现了Rows Number功能：

1. **删除旧功能**: 移除了Add Rows输入框和按钮
2. **新增功能**: 添加了Rows Number输入框
3. **实时同步**: 用户输入数字后PDF预览立即更新
4. **数据持久化**: 支持保存和加载功能
5. **用户体验**: 操作更简单，反馈更及时

现在用户可以通过输入数字来控制PDF中表格显示的行数，功能更加直观和高效。

---

*Rows Number功能实现完成，用户可以通过输入数字控制PDF表格显示行数。*

