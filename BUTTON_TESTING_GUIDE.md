# 按钮功能测试指南

## 测试环境

开发服务器运行在: http://localhost:5173

## 测试步骤

### 1. Info Section 测试

#### 添加Item功能测试
1. 打开浏览器开发者工具 (F12)
2. 切换到 Console 标签页
3. 在配置面板中找到 "Info Section"
4. 点击 "Add Item" 按钮
5. **预期结果**:
   - 控制台显示: `Info Section: addInfoItem called`
   - 控制台显示: `Info Section: Adding new item: {id: "...", label: "Label", value: "Value"}`
   - 控制台显示: `Info Section: Updated items: [...]`
   - 界面中新增一个Item容器
   - PDF预览中显示新的Item

#### 删除Item功能测试
1. 在Info Section中找到任意一个Item
2. 点击该Item右上角的X按钮
3. **预期结果**:
   - 控制台显示: `Info Section: removeInfoItem called with index: X`
   - 控制台显示: `Info Section: Updated items after removal: [...]`
   - 界面中该Item被删除
   - PDF预览中对应Item消失

### 2. Table Section 测试

#### 添加Column功能测试
1. 在配置面板中找到 "Table Section"
2. 点击 "Add Column" 按钮
3. **预期结果**:
   - 控制台显示: `Table Section: addColumn called`
   - 控制台显示: `Table Section: Adding new column: {...}`
   - 控制台显示: `Table Section: Updated table data: {...}`
   - 界面中新增一个Column输入框
   - 所有现有Row都新增对应的输入框

#### 删除Column功能测试
1. 在Table Section的Column Headers区域
2. 点击任意Column右侧的X按钮
3. **预期结果**:
   - 控制台显示: `Table Section: removeColumn called with index: X`
   - 控制台显示: `Table Section: Removing column: {...}`
   - 控制台显示: `Table Section: Updated table data: {...}`
   - 界面中该Column被删除
   - 所有Row中对应的输入框被删除

#### 添加Row功能测试
1. 在Table Section中点击 "Add Row" 按钮
2. **预期结果**:
   - 控制台显示: `Table Section: addRow called`
   - 控制台显示: `Table Section: Adding new row: {...}`
   - 控制台显示: `Table Section: Updated table data: {...}`
   - 界面中新增一个Row容器
   - 该Row包含所有Column的输入框

#### 删除Row功能测试
1. 在Table Section的Table Rows区域
2. 点击任意Row右上角的X按钮
3. **预期结果**:
   - 控制台显示: `Table Section: removeRow called with index: X`
   - 控制台显示: `Table Section: Removing row at index: X`
   - 控制台显示: `Table Section: Updated table data: {...}`
   - 界面中该Row被删除

#### 批量添加Rows功能测试
1. 在Table Section的Table Rows区域底部
2. 在 "Add Rows" 输入框中输入数字 (例如: 3)
3. 点击 "Add Rows" 按钮
4. **预期结果**:
   - 控制台显示: `Table Section: addMultipleRows called`
   - 控制台显示: `Table Section: Adding 3 rows`
   - 控制台显示: `Table Section: Adding multiple rows: [...]`
   - 控制台显示: `Table Section: Updated table data: {...}`
   - 界面中新增3个Row容器
   - "Add Rows" 输入框重置为1

## 问题排查

### 如果按钮没有反应

#### 检查控制台错误
1. 打开浏览器开发者工具 (F12)
2. 查看 Console 标签页是否有错误信息
3. 查看 Network 标签页是否有请求失败

#### 检查函数调用
1. 确认控制台是否显示相应的调试信息
2. 如果没有调试信息，说明函数没有被调用
3. 如果有调试信息但界面没有更新，说明数据更新有问题

#### 常见问题
1. **循环引用**: 如果看到无限循环的日志，说明存在循环引用问题
2. **数据格式错误**: 如果看到数据格式相关的错误，检查数据结构
3. **组件未挂载**: 如果完全没有反应，检查组件是否正确挂载

### 修复步骤

#### 如果Info Section按钮无反应
1. 检查 `PdfInfoSection.vue` 中的computed属性
2. 确认setter中直接emit事件而不是循环引用
3. 检查 `items` computed的setter实现

#### 如果Table Section按钮无反应
1. 检查 `PdfTableSection.vue` 中的函数实现
2. 确认所有函数都正确更新 `tableData.value`
3. 检查数据结构的完整性

## 测试完成标准

### 功能测试通过标准
1. ✅ 所有按钮点击都有控制台调试信息
2. ✅ 界面实时更新显示变化
3. ✅ PDF预览实时反映配置变化
4. ✅ 数据持久化正常 (保存/加载)
5. ✅ 没有控制台错误信息

### 性能测试标准
1. ✅ 按钮响应时间 < 100ms
2. ✅ 界面更新流畅，无卡顿
3. ✅ 内存使用正常，无内存泄漏

## 测试报告模板

```
测试日期: [日期]
测试环境: Chrome/Edge/Firefox [版本]
测试结果: ✅ 通过 / ❌ 失败

Info Section:
- Add Item: ✅ / ❌
- Remove Item: ✅ / ❌

Table Section:
- Add Column: ✅ / ❌
- Remove Column: ✅ / ❌
- Add Row: ✅ / ❌
- Remove Row: ✅ / ❌
- Add Multiple Rows: ✅ / ❌

问题记录:
[记录任何发现的问题]

修复状态:
[记录修复进度]
```

## 下一步

测试完成后，如果所有功能正常，可以移除调试信息中的console.log语句，保持代码整洁。

---

*测试指南完成，请按照步骤进行测试。*

