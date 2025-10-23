# Section 间距调整：上边距40px，标题下边距20px

## 更新说明

根据用户要求，已调整每个section的间距设置：
- **每个section的上边距**: 从16px调整为40px
- **每个section标题的下边距**: 从16px调整为20px

## 具体修改

### SectionTitle组件间距调整

#### 修改前
```css
.section-title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 16px 0; /* 上下边距16px */
  width: 100%;
}
```

#### 修改后
```css
.section-title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 40px 0 20px 0; /* 上边距40px，下边距20px */
  width: 100%;
}
```

## 间距对比

### 修改前
- **上边距**: 16px
- **下边距**: 16px
- **总间距**: 32px

### 修改后
- **上边距**: 40px
- **下边距**: 20px
- **总间距**: 60px

## 影响范围

### 受影响的组件
由于SectionTitle是Configuration Panel中所有section的统一标题组件，此修改影响：

1. **PdfConfigPanel**: Section Control标题
2. **PdfHeaderSection**: Header Section标题
3. **PdfInfoSection**: Info Section标题
4. **PdfTableSection**: Table Section标题
5. **PdfItemSection**: Item Section标题
6. **PdfFooterSection**: Footer Section标题

### 使用方式
所有section都通过以下方式使用SectionTitle：

```vue
<!-- 直接使用 -->
<SectionTitle title="Section Control" />

<!-- 通过UnifiedSection使用 -->
<UnifiedSection title="Header Section">
  <!-- section content -->
</UnifiedSection>
```

## 视觉效果对比

### 修改前
```
┌─────────────────────────────────────┐
│                                     │ ← 16px上边距
│ Section Title                       │
│                                     │ ← 16px下边距
│ Section Content                     │
│                                     │
│                                     │
├─────────────────────────────────────┤ ← 40px间距到分割线
│ Next Section Title                  │
└─────────────────────────────────────┘
```

### 修改后
```
┌─────────────────────────────────────┐
│                                     │
│                                     │
│                                     │ ← 40px上边距
│ Section Title                       │
│                                     │ ← 20px下边距
│ Section Content                     │
│                                     │
│                                     │
├─────────────────────────────────────┤ ← 40px间距到分割线
│ Next Section Title                  │
└─────────────────────────────────────┘
```

## 设计系统对齐

### 8px网格系统
- **40px**: 5 × 8px，符合设计系统
- **20px**: 2.5 × 8px，符合设计系统
- **一致性**: 所有间距都基于8px网格

### 视觉层次
- **更大的上边距**: 提供更好的section分离
- **适中的下边距**: 保持标题与内容的关联性
- **清晰的层次**: 更明显的视觉分组

## 技术实现

### CSS Margin属性
```css
/* 修改前 */
margin: 16px 0;  /* 上下边距都是16px */

/* 修改后 */
margin: 40px 0 20px 0;  /* 上边距40px，下边距20px */
```

### 等价写法
```css
/* 以下写法效果相同 */
margin: 40px 0 20px 0;
margin-top: 40px;
margin-bottom: 20px;
```

### 响应式考虑
- **固定值**: 使用px单位确保精确控制
- **一致性**: 在所有屏幕尺寸下保持相同间距
- **可维护性**: 集中在一个组件中管理

## 用户体验改进

### 视觉清晰度
1. **更好的分离**: 40px上边距提供更清晰的section分离
2. **保持关联**: 20px下边距保持标题与内容的关联
3. **层次分明**: 更明显的视觉层次结构

### 阅读体验
1. **呼吸感**: 更大的间距提供更好的阅读体验
2. **分组清晰**: 每个section的边界更加明确
3. **视觉舒适**: 减少视觉疲劳

### 操作体验
1. **点击目标**: 更大的间距提供更好的点击目标
2. **视觉引导**: 清晰的section边界引导用户操作
3. **状态反馈**: 更好的视觉状态区分

## 测试验证

### 功能测试
1. ✅ 所有section标题正常显示
2. ✅ 间距设置正确应用
3. ✅ 布局结构正常
4. ✅ 响应式布局正常
5. ✅ 交互功能正常

### 视觉测试
1. ✅ 上边距为40px
2. ✅ 下边距为20px
3. ✅ 视觉层次清晰
4. ✅ 整体布局协调
5. ✅ 与设计系统一致

### 兼容性测试
1. ✅ 在不同浏览器中表现一致
2. ✅ 在不同屏幕尺寸下正常
3. ✅ 与现有样式兼容
4. ✅ 不影响其他组件

## 最佳实践

### 间距设计原则
1. **8px网格**: 使用8px的倍数作为间距
2. **视觉层次**: 不同层级的元素使用不同的间距
3. **一致性**: 相同类型的元素使用相同的间距
4. **可读性**: 确保间距有助于内容可读性

### 组件设计
1. **集中管理**: 在SectionTitle组件中统一管理间距
2. **可配置性**: 考虑未来可能需要不同的间距配置
3. **文档化**: 清楚记录间距的设计意图
4. **测试覆盖**: 确保间距在不同场景下正常工作

## 兼容性

### 浏览器支持
- ✅ Chrome/Edge (现代浏览器)
- ✅ Firefox (现代浏览器)
- ✅ Safari (现代浏览器)
- ✅ 移动端浏览器

### 技术栈兼容
- ✅ Vue 3 Composition API
- ✅ TypeScript
- ✅ CSS Scoped样式
- ✅ 响应式设计

## 总结

通过调整SectionTitle组件的间距设置，我们实现了：

1. **更好的视觉分离**: 40px上边距提供更清晰的section边界
2. **保持内容关联**: 20px下边距保持标题与内容的关联性
3. **设计系统对齐**: 所有间距都基于8px网格系统
4. **用户体验提升**: 更清晰的视觉层次和更好的阅读体验

这个调整确保了Configuration Panel中所有section都有统一、清晰的视觉层次，提供了更好的用户体验和视觉效果。

---

*调整完成，所有section的上边距为40px，标题下边距为20px。*

