# Section内部间距修复回滚方案

## 问题分析

Section之间的间距没问题，但是每个Section内部的元素上下间距没有达到期望。主要原因是HTML导出中使用了`<br/>`标签产生默认行间距，而不是使用精确的CSS间距控制。

## 修复内容

### 1. Header Section 内部间距修复
```css
/* 修改前 */
.header-description {
    font-size: 7px;
    color: #000000;
    line-height: 9px;
}

/* 修改后 */
.header-description {
    font-size: 7px;
    color: #000000;
    line-height: 9px;
    margin-top: 1px;    /* 标准：标题和描述间距 1px */
}
```

```html
<!-- 修改前 -->
<span class="header-title">${header.title || 'Title'}</span><br/>
<span class="header-description">${header.description}</span>

<!-- 修改后 -->
<span class="header-title">${header.title || 'Title'}</span>
<span class="header-description">${header.description}</span>
```

### 2. Info Section 内部间距修复
```css
/* 修改前 */
.info-section-title {
    font-size: 7px;
    font-weight: 600;
    color: #6b7280;
    line-height: 9px;
}

.info-item-value {
    font-size: 7px;
    font-weight: 400;
    color: #919191;
    line-height: 9px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}

/* 修改后 */
.info-section-title {
    font-size: 7px;
    font-weight: 600;
    color: #6b7280;
    line-height: 9px;
    margin-bottom: 2px;  /* 标准：Section标题和items间距 2px */
}

.info-item-value {
    font-size: 7px;
    font-weight: 400;
    color: #919191;
    line-height: 9px;
    margin-top: 2px;     /* 标准：Item标签和值间距 2px */
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}
```

```html
<!-- 修改前 -->
<span class="info-section-title">${info.sectionTitle}</span><br/>
<span class="info-item-label">${item.label}</span><br/>
<span class="info-item-value">${item.value}</span>

<!-- 修改后 -->
<span class="info-section-title">${info.sectionTitle}</span>
<span class="info-item-label">${item.label}</span>
<span class="info-item-value">${item.value}</span>
```

### 3. Table Section 内部间距修复
```css
/* 修改前 */
.table-section-title {
    font-size: 7px;
    font-weight: 600;
    color: #6b7280;
    line-height: 9px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}

.table-subsection-title {
    font-size: 7px;
    font-weight: 600;
    color: #000000;
    line-height: 9px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}

/* 修改后 */
.table-section-title {
    font-size: 7px;
    font-weight: 600;
    color: #6b7280;
    line-height: 9px;
    margin-bottom: 2px;  /* 标准：Section标题间距 2px */
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}

.table-subsection-title {
    font-size: 7px;
    font-weight: 600;
    color: #000000;
    line-height: 9px;
    margin-bottom: 2px;  /* 标准：Subsection标题间距 2px */
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}
```

```html
<!-- 修改前 -->
<span class="table-section-title">${table.sectionTitle}</span><br/>
<span class="table-subsection-title">${table.subsectionTitle}</span><br/>

<!-- 修改后 -->
<span class="table-section-title">${table.sectionTitle}</span>
<span class="table-subsection-title">${table.subsectionTitle}</span>
```

### 4. Item Section 内部间距修复
```css
/* 修改前 */
.item-section-title {
    font-size: 7px;
    font-weight: 600;
    color: #6b7280;
    line-height: 9px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}

.item-item-value {
    font-size: 7px;
    font-weight: 400;
    color: #919191;
    line-height: 9px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}

/* 修改后 */
.item-section-title {
    font-size: 7px;
    font-weight: 600;
    color: #6b7280;
    line-height: 9px;
    margin-bottom: 2px;  /* 标准：Section标题和items间距 2px */
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}

.item-item-value {
    font-size: 7px;
    font-weight: 400;
    color: #919191;
    line-height: 9px;
    margin-top: 2px;     /* 标准：Item标签和值间距 2px */
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}
```

```html
<!-- 修改前 -->
<span class="item-section-title">${item.sectionTitle}</span><br/>
<span class="item-item-label">${itemData.label}</span><br/>
<span class="item-item-value">${itemData.value}</span>

<!-- 修改后 -->
<span class="item-section-title">${item.sectionTitle}</span>
<span class="item-item-label">${itemData.label}</span>
<span class="item-item-value">${itemData.value}</span>
```

### 5. Description Section 内部间距修复
```css
/* 修改前 */
.description-text {
    font-size: 7px;
    font-weight: 400;
    color: #919191;
    line-height: 9px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}

/* 修改后 */
.description-text {
    font-size: 7px;
    font-weight: 400;
    color: #919191;
    line-height: 9px;
    margin-top: 2px;     /* 标准：Description标签和内容间距 2px */
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}
```

```html
<!-- 修改前 -->
<span class="description-label">Item Name</span><br/>
<span class="description-text">${description.content}</span>

<!-- 修改后 -->
<span class="description-label">Item Name</span>
<span class="description-text">${description.content}</span>
```

### 6. Summary Section 内部间距修复
```css
/* 修改前 */
.summary-content {
    font-size: 14px;
    font-weight: 600;
    color: #000000;
    line-height: 17px;
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}

/* 修改后 */
.summary-content {
    font-size: 14px;
    font-weight: 600;
    color: #000000;
    line-height: 17px;
    margin-top: 2px;     /* 标准：Summary标签和内容间距 2px */
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}
```

```html
<!-- 修改前 -->
<span class="summary-label">Total USD</span><br/>
<span class="summary-content">$${summary.total.toFixed(2)}</span>

<!-- 修改后 -->
<span class="summary-label">Total USD</span>
<span class="summary-content">$${summary.total.toFixed(2)}</span>
```

## 修复原理

1. **移除`<br/>`标签：** 所有Section内部元素之间的`<br/>`标签都被移除
2. **使用CSS margin：** 使用精确的CSS margin来控制元素间距
3. **符合标准：** 所有间距都符合提供的标准规范

## 回滚方案

如果需要回滚，请执行以下操作：

### 回滚1：恢复Header Section
```css
.header-description {
    font-size: 7px;
    color: #000000;
    line-height: 9px;
    /* 删除 margin-top: 1px; */
}
```

```html
<span class="header-title">${header.title || 'Title'}</span><br/>
<span class="header-description">${header.description}</span>
```

### 回滚2：恢复Info Section
```css
.info-section-title {
    font-size: 7px;
    font-weight: 600;
    color: #6b7280;
    line-height: 9px;
    /* 删除 margin-bottom: 2px; */
}

.info-item-value {
    font-size: 7px;
    font-weight: 400;
    color: #919191;
    line-height: 9px;
    /* 删除 margin-top: 2px; */
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}
```

```html
<span class="info-section-title">${info.sectionTitle}</span><br/>
<span class="info-item-label">${item.label}</span><br/>
<span class="info-item-value">${item.value}</span>
```

### 回滚3：恢复Table Section
```css
.table-section-title {
    font-size: 7px;
    font-weight: 600;
    color: #6b7280;
    line-height: 9px;
    /* 删除 margin-bottom: 2px; */
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}

.table-subsection-title {
    font-size: 7px;
    font-weight: 600;
    color: #000000;
    line-height: 9px;
    /* 删除 margin-bottom: 2px; */
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}
```

```html
<span class="table-section-title">${table.sectionTitle}</span><br/>
<span class="table-subsection-title">${table.subsectionTitle}</span><br/>
```

### 回滚4：恢复Item Section
```css
.item-section-title {
    font-size: 7px;
    font-weight: 600;
    color: #6b7280;
    line-height: 9px;
    /* 删除 margin-bottom: 2px; */
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}

.item-item-value {
    font-size: 7px;
    font-weight: 400;
    color: #919191;
    line-height: 9px;
    /* 删除 margin-top: 2px; */
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}
```

```html
<span class="item-section-title">${item.sectionTitle}</span><br/>
<span class="item-item-label">${itemData.label}</span><br/>
<span class="item-item-value">${itemData.value}</span>
```

### 回滚5：恢复Description Section
```css
.description-text {
    font-size: 7px;
    font-weight: 400;
    color: #919191;
    line-height: 9px;
    /* 删除 margin-top: 2px; */
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}
```

```html
<span class="description-label">Item Name</span><br/>
<span class="description-text">${description.content}</span>
```

### 回滚6：恢复Summary Section
```css
.summary-content {
    font-size: 14px;
    font-weight: 600;
    color: #000000;
    line-height: 17px;
    /* 删除 margin-top: 2px; */
    word-wrap: break-word;
    overflow-wrap: break-word;
    white-space: normal;
}
```

```html
<span class="summary-label">Total USD</span><br/>
<span class="summary-content">$${summary.total.toFixed(2)}</span>
```

## 测试建议

修复后请测试：
1. 导出HTML并检查所有Section内部元素的间距
2. 检查Header标题和描述的间距
3. 检查Info Section的标题和items间距
4. 检查Table Section的标题间距
5. 检查Item Section的标题和items间距
6. 检查Description Section的标签和内容间距
7. 检查Summary Section的标签和金额间距
8. 对比PDF预览和HTML导出的视觉效果

## 备选方案

如果某些间距不合适，可以考虑：
- 减少间距：使用1px而不是2px
- 增加间距：使用3px或4px
- 混合间距：不同Section使用不同的间距值

---
**修复时间：** 2024年1月
**状态：** 待测试
**回滚准备：** ✅ 完成
**修复项目：** 6个Section的内部间距修复










