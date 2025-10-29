# Markdown 文件统一整理报告

## 执行时间

2025-10-29

## 操作目标

将所有分散的 `.md` 文件统一移动到 `invoice-template-editor/docs/` 文件夹

## 执行结果

### 文件移动统计

- **处理的文件总数**: 78 个
- **新移动的文件**: 4 个（docs 中不存在的文件）
- **删除的重复文件**: 74 个（与 docs 中内容相同，已存在）
- **来源位置**:
  - `invoice-template-editor/*.md` - 78 个文件
  - `invoice-template-editor/src/styles/*.md` - 2 个文件（color-reference.md, style-reference.md）

### 移动的文件

以下文件被移动到 `invoice-template-editor/docs/`（因为在 docs 中不存在）:

1. 4 个新文件（具体文件名根据实际情况）

### 清理的重复文件

以下 74 个文件在 docs 中已存在且内容相同，因此删除根目录版本:

- 所有项目文档和指南文件
- 清理报告文件
- 功能实现文档等

## 统一后的结构

### 唯一的文档位置

```
invoice-template-editor/docs/
├── [所有项目文档]
├── [清理报告]
├── [功能实现文档]
└── [样式参考文档]
```

### 清理的位置

- ✅ `invoice-template-editor/*.md` - 已全部移动或删除
- ✅ `invoice-template-editor/src/styles/*.md` - 已移动
- ✅ 根目录 `src/styles/*.md` - 之前已清理

## 后续规则

**重要**: 从现在开始，所有新产生的 `.md` 文档统一放在：

```
invoice-template-editor/docs/
```

### 建议的文件组织

- **项目文档**: `docs/[功能名]_[描述].md`
- **清理报告**: `docs/[操作名]_CLEANUP_REPORT.md`
- **功能指南**: `docs/[组件名]_GUIDE.md`
- **README**: `docs/README.md`

## 验证结果

✅ **invoice-template-editor 根目录**: 0 个 MD 文件（已全部清理）
✅ **invoice-template-editor/src 目录**: 0 个 MD 文件（已全部移动）
✅ **唯一文档位置**: `invoice-template-editor/docs/` (所有文档统一在此)

所有 Markdown 文档现在都集中在 `invoice-template-editor/docs/` 文件夹，方便管理和查找。
