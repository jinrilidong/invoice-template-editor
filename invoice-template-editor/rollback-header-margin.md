# Header上边距修复回滚方案

## 修复内容
已修改以下设置以与PDF预览保持一致：

### 修改1：Header上边距
```css
/* 修改前 */
.header-table {
    margin-top: 24px;
}

/* 修改后 */
.header-table {
    margin-top: 10px;
}
```

### 修改2：Section间距
```css
/* 修改前 */
.section-spacer {
    height: 8px;
}

.section-spacer td {
    height: 8px;
}

/* 修改后 */
.section-spacer {
    height: 10px;
}

.section-spacer td {
    height: 10px;
}
```

## 回滚方案

如果效果不好，可以执行以下回滚操作：

### 回滚1：恢复Header上边距
```css
.header-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 24px; /* 恢复为24px */
}
```

### 回滚2：恢复Section间距
```css
.section-spacer {
    height: 8px; /* 恢复为8px */
}

.section-spacer td {
    height: 8px; /* 恢复为8px */
}
```

## 回滚命令

如果需要回滚，请执行以下操作：

1. 打开 `/src/App.vue` 文件
2. 找到 `.header-table` 样式
3. 将 `margin-top: 10px;` 改为 `margin-top: 24px;`
4. 找到 `.section-spacer` 样式
5. 将 `height: 10px;` 改为 `height: 8px;`
6. 将 `.section-spacer td` 的 `height: 10px;` 改为 `height: 8px;`

## 测试建议

修复后请测试：
1. 导出HTML并检查header上边距
2. 对比PDF预览和HTML导出的视觉效果
3. 检查整体布局是否协调
4. 如果间距过小或过大，可以调整数值

## 备选方案

如果10px间距不合适，可以考虑：
- 12px：介于8px和24px之间
- 15px：更接近PDF预览的视觉效果
- 保持24px：如果PDF预览需要调整

---
**修复时间：** 2024年1月
**状态：** 待测试
**回滚准备：** ✅ 完成
















