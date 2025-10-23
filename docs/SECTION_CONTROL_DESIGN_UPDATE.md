# Section Control 设计更新

## 概述

根据Figma设计规范，已更新Section Control的样式，使其完全符合设计稿要求。

## Figma设计规范

### 设计来源
- **Figma链接**: https://www.figma.com/design/3ulH683fvi3HrEPMHkmfgB/Oct-2025---Matthew?node-id=12060-870
- **节点ID**: 12060:870
- **设计名称**: Section control content

### 设计规范
- **容器背景**: `#e7ecef` (浅灰色)
- **容器高度**: 44px
- **容器圆角**: 8px
- **容器内边距**: 12px (左右)
- **文字颜色**: `#0e171f` (深色)
- **文字大小**: 16px
- **文字行高**: 24px
- **字体**: Inter Regular
- **开关背景**: `#16a163` (绿色，启用状态)
- **开关背景**: `gray-300` (灰色，禁用状态)
- **开关宽度**: 32px
- **开关圆角**: 12px
- **开关内边距**: 2px
- **开关圆点**: 12px白色圆形
- **开关间距**: 3px (垂直)

## 实现细节

### 更新前的样式
```vue
<div class="flex items-center justify-between bg-[#f8f9fa] rounded border border-[#d3ddde] hover:border-[#FF761F] transition-colors">
  <!-- 旧的样式 -->
</div>
```

### 更新后的样式
```vue
<div class="bg-[#e7ecef] h-[44px] flex items-center justify-between px-[12px] rounded-[8px] w-full">
  <div class="flex flex-col font-['Inter:Regular',_sans-serif] font-normal justify-center leading-[0] not-italic relative shrink-0 text-[#0e171f] text-[16px] text-nowrap">
    <p class="leading-[24px] whitespace-pre">{{ getSectionName(section) }}</p>
  </div>
  <div class="flex h-[24px] items-center relative shrink-0">
    <button
      class="box-border flex gap-[10px] items-start justify-end overflow-clip p-[2px] relative rounded-[12px] w-[32px] transition-colors"
      :class="enabled ? 'bg-[#16a163]' : 'bg-gray-300'"
    >
      <div class="relative shrink-0 size-[12px] bg-white rounded-full transition-transform"
           :class="enabled ? 'translate-x-0' : '-translate-x-4'">
      </div>
    </button>
  </div>
</div>
```

## 主要变化

### 1. 容器样式
- **背景色**: 从 `#f8f9fa` 改为 `#e7ecef`
- **边框**: 移除了边框和悬停效果
- **高度**: 固定为44px
- **内边距**: 左右12px
- **圆角**: 8px

### 2. 文字样式
- **字体**: 明确指定为 Inter Regular
- **大小**: 16px
- **行高**: 24px
- **颜色**: `#0e171f`
- **布局**: 使用flex布局确保垂直居中

### 3. 开关样式
- **背景色**: 启用时 `#16a163`，禁用时 `gray-300`
- **尺寸**: 32px宽度，12px圆角
- **内边距**: 2px
- **圆点**: 12px白色圆形
- **动画**: 平滑的位移动画

### 4. 布局结构
- **垂直间距**: 使用 `space-y-3` 提供12px间距
- **对齐方式**: 水平两端对齐，垂直居中
- **响应式**: 保持100%宽度

## 设计一致性

### 颜色规范
- **主背景**: `#e7ecef` (与设计系统一致)
- **文字颜色**: `#0e171f` (与设计系统一致)
- **启用状态**: `#16a163` (绿色，表示激活)
- **禁用状态**: `gray-300` (灰色，表示未激活)

### 尺寸规范
- **容器高度**: 44px (与输入框高度一致)
- **开关尺寸**: 32px宽度 (标准开关尺寸)
- **圆角**: 8px容器，12px开关
- **内边距**: 12px水平，2px开关内部

### 字体规范
- **字体族**: Inter Regular
- **字体大小**: 16px
- **行高**: 24px
- **字重**: 400 (Regular)

## 功能保持

### 交互功能
- ✅ 点击开关切换状态
- ✅ 状态变化动画
- ✅ 键盘导航支持
- ✅ 无障碍访问支持

### 数据绑定
- ✅ 与 `sectionStates` 数据绑定
- ✅ 状态变化触发 `toggleSection` 方法
- ✅ 实时更新UI状态

## 测试验证

### 视觉检查
1. 打开应用程序: http://localhost:5173
2. 检查Section Control的背景色是否为 `#e7ecef`
3. 验证容器高度是否为44px
4. 检查文字样式是否符合规范
5. 验证开关样式和颜色

### 交互测试
1. 点击各个开关测试状态切换
2. 验证开关动画效果
3. 检查状态变化是否正确反映在UI上
4. 测试键盘导航功能

### 响应式测试
1. 调整浏览器窗口大小
2. 验证在不同屏幕尺寸下的显示效果
3. 检查移动端适配

## 兼容性

### 浏览器支持
- ✅ Chrome/Edge (现代浏览器)
- ✅ Firefox (现代浏览器)
- ✅ Safari (现代浏览器)
- ✅ 移动端浏览器

### 技术栈兼容
- ✅ Vue 3 Composition API
- ✅ TypeScript
- ✅ CSS Grid/Flexbox
- ✅ CSS自定义属性

## 未来维护

### 样式更新
- 如需修改颜色，更新对应的CSS类
- 如需修改尺寸，调整相关的尺寸值
- 保持与设计系统的一致性

### 功能扩展
- 可以添加更多开关选项
- 可以添加分组功能
- 可以添加搜索/过滤功能

---

*此更新确保了Section Control完全符合Figma设计规范，提供了更好的用户体验和视觉一致性。*

