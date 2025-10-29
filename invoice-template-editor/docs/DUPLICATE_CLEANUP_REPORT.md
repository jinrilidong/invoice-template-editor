# 重复文件清理与版本统一报告

## 概述
- 目标：统一子目录较新版本到根目录；删除根目录重复文件；固定后续编辑路径为 `invoice-template-editor/src/`。
- 执行时间：$(date)

## 统一到根目录的文件（11 个）
- src/App.vue （来自 invoice-template-editor/src/App.vue，已修复 PdfStylePanel 导入到 `../invoice-template-editor/src/components/PdfStylePanel.vue`）
- src/components/PdfPaginationPreview.vue
- src/components/PdfTableSection.vue
- src/components/PdfPreviewPanel.vue
- src/components/PdfDescriptionSection.vue
- src/components/PdfHInfoSection.vue
- src/components/PdfInfoSection.vue
- src/components/PdfItemSection.vue
- src/components/Toggle.vue
- src/components/UnifiedLInput.vue
- src/types/section.ts

## 删除的重复文件（根目录，27 个）
- src/components/BTDSNotification.vue
- src/components/ConfirmDialog.vue
- src/components/IconButton.vue
- src/components/LogoUpload.vue
- src/components/NotificationManager.vue
- src/components/PdfConfigPanel.vue
- src/components/PdfFooterSection.vue
- src/components/PdfHeaderSection.vue
- src/components/SectionTitle.vue
- src/components/TextButton.vue
- src/components/ToggleItem.vue
- src/components/UnifiedSection.vue
- src/components/shims-vue.d.ts
- src/composables/useConfirmDialog.ts
- src/composables/usePdfInteraction.ts
- src/composables/usePdfPagination.ts
- src/composables/useSectionData.ts
- src/composables/useUndoSystem.ts
- src/css-compatibility/OpenHTMLtoPDFAdapter.d.ts
- src/css-compatibility/StyleCalculator.d.ts
- src/utils/design-system.ts
- src/views/AboutView.vue
- src/views/ButtonTestView.vue
- src/views/HomeView.vue
- src/views/IconButtonTestView.vue

（注：未删除入口相关文件 `main.ts`、`router/index.ts` 以降低风险）

## 风险与说明
- 根目录 `src/App.vue` 现依赖子目录的 `PdfStylePanel.vue`，导入路径：`../invoice-template-editor/src/components/PdfStylePanel.vue`
- 子目录为唯一真实来源；根目录存在的文件仅作为镜像或兼容

## 建议
- 后续改动只编辑：`invoice-template-editor/src/`
- 若不再需要根目录应用，建议后续统一移除或使用工作区配置避免重复构建
