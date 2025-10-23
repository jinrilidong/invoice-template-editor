# PDF交互系统实现文档

## 功能概述

成功实现了用户请求的PDF模板交互功能：

1. ✅ **鼠标悬停高亮** - 当用户鼠标悬停在PDF模板section上时，高亮显示该section
2. ✅ **点击滚动定位** - 用户点击具体item时，配置面板自动滚动到对应的item
3. ✅ **Item点击跳转** - 当用户点击具体Item时，跳转到对应的Item并高亮1秒
4. ✅ **Table Column交互** - 支持Table Section的Column级别交互定位
5. ✅ **Section映射关系** - 建立了PDF section与配置面板的完整映射关系
6. ✅ **平滑滚动动画** - 添加了平滑的滚动动画效果

## 技术实现

### 1. 交互系统核心 (`usePdfInteraction.ts`)

创建了专门的composable来管理PDF交互功能：

```typescript
// 主要功能
- handleSectionHover(): 处理section悬停事件
- handleSectionLeave(): 处理section离开事件
- handleItemHover(): 处理item悬停事件（新增）
- handleItemLeave(): 处理item离开事件（新增）
- handleSectionClick(): 处理section点击事件
- handleItemClick(): 处理item点击事件
- getSectionHighlightClass(): 获取section高亮样式类
- getItemHighlightClass(): 获取item高亮样式类
```

**特性：**
- 完整的section映射系统
- 智能滚动定位
- 临时高亮效果
- 事件冒泡控制
- Item点击跳转定位（修改）
- Table Column交互支持（新增）
- 修复跨section高亮bug（修复）

### 2. PDF预览面板集成 (`PdfPreviewPanel.vue`)

**交互功能：**
- 为所有section添加了鼠标事件监听
- 实现了悬停高亮效果
- 添加了点击滚动功能
- 支持item级别的精确点击
- 支持item级别的点击跳转功能
- 支持Table Column级别的交互
- 修复跨section高亮问题

**视觉反馈：**
- 悬停时的淡色高亮
- 点击时的橙色边框高亮
- 平滑的过渡动画
- 鼠标指针变化

### 3. 配置面板集成 (`PdfConfigPanel.vue`)

**滚动定位：**
- 为每个section添加了唯一ID
- 支持平滑滚动到目标位置
- 临时高亮目标section
- 自动居中显示

**样式系统：**
- 配置面板高亮样式
- 临时高亮效果
- 平滑过渡动画

## Section映射关系

| PDF Section | Config Section ID | 功能描述 |
|-------------|-------------------|----------|
| header-section | config-header-section | 头部区域配置 |
| info-section | config-info-section | 信息区域配置 |
| table-section | config-table-section | 表格区域配置 |
| description-section | config-description-section | 描述区域配置 |
| item-section | config-item-section | 项目区域配置 |
| footer-section | config-footer-section | 页脚区域配置 |

## 交互流程

### 1. 悬停交互
```
用户鼠标悬停 → 触发handleSectionHover → 应用高亮样式 → 视觉反馈
```

### 2. 点击交互
```
用户点击section → 触发handleSectionClick → 查找映射关系 → 滚动到配置面板 → 临时高亮
```

### 3. Item点击交互
```
用户点击item → 触发handleItemClick → 先滚动到section → 再定位到具体item → 双重高亮
```

### 4. Item点击交互（修改）
```
用户点击item → 触发handleItemClick → 滚动到section → 定位到item → 高亮1秒
```

### 5. Table Column交互（新增）
```
用户点击table column → 触发handleItemClick → 滚动到table section → 定位到column → 高亮1秒
```

## 样式系统（简化版）

### PDF预览面板高亮样式
```css
.pdf-section-highlight {
  background-color: rgba(255, 193, 7, 0.16);
}

.pdf-item-highlight {
  background-color: rgba(255, 193, 7, 0.16);
}

.pdf-item-hover {
  background-color: rgba(255, 193, 7, 0.04);
}
```

### 配置面板高亮样式
```css
.config-section-highlight {
  background-color: rgba(255, 193, 7, 0.08);
}

.config-item-highlight {
  background-color: rgba(255, 193, 7, 0.16);
  border: 2px solid rgba(255, 193, 7, 0.56);
  border-radius: 8px;
  box-shadow: 0 0 8px rgba(255, 193, 7, 0.16);
  transition: all 0.3s ease-in-out;
}
```

**高亮特点：**
- 使用黄色主题（rgba(255, 193, 7)）
- 添加黄色边框和阴影效果
- 1.5秒高亮持续时间
- 平滑的过渡动画
- 清晰的视觉反馈
- 修复了Item group容器的高亮显示问题
- 修复了多个Table Section的Column定位问题
- 为每个Table Section创建独立的ID和映射关系
- 修复了PDF Column高亮显示问题
- 优化了高亮时间到1.5秒
- 实现了自动展开收起状态的section功能
- 优化了所有高亮效果的透明度，降低30%（10% + 20%）
- 将高亮颜色从蓝色改为黄色

## 用户体验优化

**视觉反馈：**
- 悬停时的黄色背景提示
- 点击时的黄色高亮
- 配置面板的1.5秒黄色边框高亮效果
- 黄色边框和阴影的强化视觉效果

**交互体验：**
- 鼠标指针自动变为手型
- 事件冒泡控制，避免冲突
- 智能滚动定位到窗口顶部
- 优化的高亮系统
- 自动展开收起状态的section

**性能优化：**
- 简化的CSS样式，减少渲染负担
- 事件委托减少监听器数量
- 智能的DOM查询和操作
- 减少内存占用

## 文件修改清单

1. **新增文件：**
   - `src/composables/usePdfInteraction.ts` - 交互系统核心逻辑

2. **修改文件：**
   - `src/components/PdfPreviewPanel.vue` - 添加交互功能和样式
   - `src/components/PdfConfigPanel.vue` - 添加ID和样式支持

## 使用说明

1. **悬停高亮：** 将鼠标悬停在PDF模板的任何section上，会看到淡色高亮效果
2. **点击滚动：** 点击PDF模板的section，配置面板会自动滚动到对应的配置区域
3. **Item定位：** 点击具体的item（如info item或item item），会先滚动到section，再定位到具体item
4. **Item点击跳转：** 点击具体的item，会自动跳转到配置面板对应的item并高亮1.5秒
5. **Table Column交互：** 点击Table Section的Column，会自动跳转到配置面板对应的Column并高亮1.5秒
6. **自动展开section：** 如果目标item所属的section是收起状态，会自动展开
7. **视觉反馈：** 所有交互都有相应的视觉反馈，包括高亮、边框、阴影等效果

## 技术特点

- **响应式设计：** 使用Vue 3 Composition API
- **类型安全：** 完整的TypeScript支持
- **性能优化：** 高效的DOM操作和事件处理
- **用户体验：** 丰富的视觉反馈和交互效果
- **可扩展性：** 易于添加新的section映射关系

## 测试建议

1. 测试所有section的悬停高亮效果
2. 测试点击section后的滚动定位功能
3. 测试item点击的双重定位功能
4. 测试item点击跳转功能
5. 测试Table Column点击跳转功能
6. 验证配置面板的临时高亮效果（1.5秒Blue 700边框高亮）
7. 测试在不同缩放级别下的交互效果
8. 验证事件冒泡控制的正确性
9. 验证跨section高亮bug修复
10. 验证配置面板Item group边框高亮效果正确显示
11. 验证多个Table Section的Column定位功能
12. 验证每个Table Section的独立映射和跳转功能
13. 验证PDF Column高亮效果正确显示
14. 验证1.5秒高亮时间设置
15. 验证自动展开收起状态的section功能
16. 验证高亮透明度优化效果（降低30%）
17. 验证高亮颜色从蓝色改为黄色
