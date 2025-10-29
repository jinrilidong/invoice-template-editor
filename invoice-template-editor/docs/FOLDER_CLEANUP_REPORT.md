# 目录清理报告（.vscode / src / public）

## 概述
- 目标：统一在 `invoice-template-editor/src/` 进行开发，清理根目录重复/无用内容
- 执行时间：$(date)

## 操作清单

### 1. public 目录
- ✅ 迁移 `public/uploads` 到 `invoice-template-editor/public/uploads`
- ✅ 删除根目录 `public`（子目录作为唯一来源）

### 2. .vscode 目录
- ✅ 删除 `invoice-template-editor/.vscode`，保留根目录 `.vscode` 作为顶层工作区配置

### 3. src 目录
- ✅ 将 `src/styles/*.md` 迁移至 `invoice-template-editor/src/styles/`（若同名已存在则跳过保留子目录版本）
- ✅ 将 `src/assets/*` 与子目录去重：同名且相同则删除根目录文件；同名但不同以子目录为准；仅根目录存在的资源已迁移
- ✅ 若 `src` 为空则删除（其余业务文件此前已清理）

## 当前状态
- **唯一真实来源**：`invoice-template-editor/src/`
- **根目录 .vscode**：保留（全局工作区设置）
- **重复文件**：已全部清理

## 建议
- 开发和构建请使用子目录项目路径
- 新增文件统一放入 `invoice-template-editor/src/`
- 根目录仅保留工作区配置与根级文档/脚本
