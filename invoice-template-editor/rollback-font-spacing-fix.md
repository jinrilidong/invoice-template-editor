# 字体和间距修复回滚方案

## 修复内容总结

根据提供的间距标准，已修复以下内容：

### 1. Header Section 修复
```css
/* 修改前 */
.header-title {
    font-size: 18px;
    font-weight: bold;
    color: #000000;
}

/* 修改后 */
.header-title {
    font-size: 20px;        /* 标准：主标题字体 20px */
    font-weight: bold;
    color: #000000;
    line-height: 24px;      /* 标准：主标题行高 24px */
}
```

### 2. Summary Section 修复
```css
/* 新增样式 */
.summary-label {
    font-size: 10px;        /* 标准："Total USD"标签字体 10px */
    font-weight: 600;
    color: #000000;
    line-height: 9px;       /* 标准："Total USD"标签行高 9px */
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}

/* 修改后 */
.summary-content {
    font-size: 14px;        /* 标准：总金额字体 14px */
    font-weight: 600;
    color: #000000;
    line-height: 17px;      /* 标准：总金额行高 17px */
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}
```

### 3. Summary Section HTML 结构修复
```html
<!-- 修改前 -->
<td class="summary-content">Total USD $${summary.total.toFixed(2)}</td>

<!-- 修改后 -->
<td>
    <span class="summary-label">Total USD</span><br/>
    <span class="summary-content">$${summary.total.toFixed(2)}</span>
</td>
```

## 已验证正确的样式

以下样式已经符合标准，无需修改：

### Header Section
- `.header-description`: 7px字体，9px行高 ✅
- `.logo-container`: 48px高度，240px宽度 ✅

### Info Section
- `.info-section-title`: 7px字体，9px行高 ✅
- `.info-item-label`: 7px字体，9px行高 ✅
- `.info-item-value`: 7px字体，9px行高 ✅
- `.info-items-table td`: 0px上下，8px左右内边距 ✅

### Table Section
- `.table-section-title`: 7px字体，9px行高 ✅
- `.table-subsection-title`: 7px字体，9px行高 ✅
- `.data-table th, .data-table td`: 7px字体，9px行高，13px高度，2px上下8px左右内边距 ✅
- `.subtotal-table td`: 7px字体，9px行高 ✅

### Item Section
- `.item-section-title`: 7px字体，9px行高 ✅
- `.item-item-label`: 7px字体，9px行高 ✅
- `.item-item-value`: 7px字体，9px行高 ✅
- `.item-items-table td`: 0px上下，8px左右内边距 ✅

### Description Section
- `.description-label`: 7px字体，9px行高 ✅
- `.description-text`: 7px字体，9px行高 ✅

### Footer Section
- `.footer-section td`: 7px字体，9px行高 ✅

## 回滚方案

如果需要回滚，请执行以下操作：

### 回滚1：恢复Header Section
```css
.header-title {
    font-size: 18px;        /* 恢复为18px */
    font-weight: bold;
    color: #000000;
    /* 删除 line-height: 24px; */
}
```

### 回滚2：恢复Summary Section样式
```css
/* 删除新增的 .summary-label 样式 */

.summary-content {
    font-size: 14px;
    font-weight: 600;
    color: #000000;
    /* 删除 line-height: 17px; */
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}
```

### 回滚3：恢复Summary Section HTML结构
```html
<td class="summary-content">Total USD $${summary.total.toFixed(2)}</td>
```

## 回滚命令

如果需要回滚，请执行以下操作：

1. 打开 `/src/App.vue` 文件
2. 找到 `.header-title` 样式，将 `font-size: 20px;` 改为 `font-size: 18px;`，删除 `line-height: 24px;`
3. 找到 `.summary-content` 样式，删除 `line-height: 17px;`
4. 删除整个 `.summary-label` 样式块
5. 找到 `generateSummarySection` 函数，恢复为：
   ```html
   <td class="summary-content">Total USD $${summary.total.toFixed(2)}</td>
   ```

## 测试建议

修复后请测试：
1. 导出HTML并检查所有Section的字体大小
2. 检查Header标题的字体大小和行高
3. 检查Summary Section的"Total USD"标签和金额显示
4. 对比PDF预览和HTML导出的视觉效果
5. 检查整体布局是否协调

## 备选方案

如果某些字体大小不合适，可以考虑：
- Header标题：保持18px（如果20px太大）
- Summary标签：使用8px（如果10px太大）
- Summary金额：保持14px但调整行高

---
**修复时间：** 2024年1月
**状态：** 待测试
**回滚准备：** ✅ 完成
**修复项目：** 2个主要修复，多个验证

















