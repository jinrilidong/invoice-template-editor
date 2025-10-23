# Logo上传功能实现

## 功能概述

实现了完整的logo上传功能，支持文件选择、拖拽上传、图片预览、文件验证等功能。

## 主要特性

### 1. 文件上传方式
- **点击上传**: 点击上传区域选择文件
- **拖拽上传**: 支持拖拽图片文件到上传区域
- **文件类型限制**: 支持 JPG, PNG, GIF, WebP 格式
- **文件大小限制**: 最大 5MB

### 2. 图片预览
- **缩略图预览**: 上传后显示 48x48px 的缩略图
- **文件信息显示**: 显示文件名和文件大小
- **实时预览**: 在PDF预览面板中实时显示logo

### 3. 操作功能
- **重新选择**: 可以重新选择不同的图片文件
- **删除功能**: 可以删除已上传的logo
- **错误处理**: 显示详细的错误信息

### 4. 用户体验
- **悬停效果**: 鼠标悬停时显示视觉反馈
- **状态指示**: 清晰的状态指示和错误提示
- **响应式设计**: 适配不同屏幕尺寸

## 技术实现

### 组件结构
```
LogoUpload.vue
├── 上传区域 (未上传状态)
│   ├── 拖拽区域
│   ├── 点击上传
│   └── 隐藏的文件输入
├── 预览区域 (已上传状态)
│   ├── 缩略图
│   ├── 文件信息
│   ├── 重新选择按钮
│   └── 删除按钮
└── 错误提示区域
```

### 核心功能

#### 1. 文件验证
```javascript
// 文件类型验证
const acceptedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
if (!acceptedTypes.includes(file.type)) {
  errorMessage.value = '请选择图片文件 (JPG, PNG, GIF, WebP)';
  return;
}

// 文件大小验证
if (file.size > props.maxSize) {
  errorMessage.value = `文件大小不能超过 ${formatFileSize(props.maxSize)}`;
  return;
}
```

#### 2. 文件读取
```javascript
const reader = new FileReader();
reader.onload = (e) => {
  const result = e.target.result; // Base64编码的图片数据
  emit('update:modelValue', result);
};
reader.readAsDataURL(file);
```

#### 3. 拖拽处理
```javascript
const handleDrop = (event) => {
  const files = event.dataTransfer.files;
  if (files.length > 0) {
    processFile(files[0]);
  }
};
```

## 集成方式

### 1. 在PdfHeaderSection中使用
```vue
<template>
  <UnifiedSection title="Header Section">
    <UnifiedLInput v-model="headerData.title" label="Title" />
    <UnifiedLInput v-model="headerData.description" label="Description" />
    <LogoUpload v-model="headerData.logo" label="Logo upload" />
  </UnifiedSection>
</template>

<script setup>
import LogoUpload from './LogoUpload.vue'
</script>
```

### 2. 数据流
```
用户选择文件 → LogoUpload组件 → 转换为Base64 → 更新headerData.logo → PDF预览面板显示
```

## 样式设计

### 1. 上传区域样式
- 高度: 44px (与UnifiedLInput保持一致)
- 边框: 1px solid #c1ccd6
- 悬停效果: 边框颜色变为 #7a909e
- 圆角: 8px

### 2. 预览区域样式
- 内边距: 12px
- 缩略图: 48x48px，圆角4px
- 按钮: 32x32px，悬停效果
- 文件信息: 14px字体，灰色文字

### 3. 交互效果
- 悬停时按钮背景色变化
- 删除按钮悬停时变红色
- 重新选择按钮悬停时变橙色

## 错误处理

### 1. 文件类型错误
```
错误信息: "请选择图片文件 (JPG, PNG, GIF, WebP)"
```

### 2. 文件大小错误
```
错误信息: "文件大小不能超过 5 MB"
```

### 3. 文件读取错误
```
错误信息: "文件读取失败，请重试"
```

## 测试

### 1. 功能测试
- 创建了 `test-logo-upload.html` 测试文件
- 包含基本上传、拖拽上传、文件验证测试
- 可以在浏览器中直接打开测试

### 2. 测试用例
1. **正常上传**: 选择有效的图片文件
2. **拖拽上传**: 拖拽图片文件到上传区域
3. **文件类型验证**: 尝试上传非图片文件
4. **文件大小验证**: 尝试上传超大文件
5. **重新选择**: 上传后重新选择其他文件
6. **删除功能**: 删除已上传的logo

## 兼容性

- 支持现代浏览器 (Chrome, Firefox, Safari, Edge)
- 使用FileReader API读取文件
- 使用DataTransfer API处理拖拽
- 响应式设计，支持移动端

## 未来优化

1. **图片压缩**: 自动压缩大尺寸图片
2. **多格式支持**: 支持更多图片格式
3. **云存储**: 集成云存储服务
4. **批量上传**: 支持多文件上传
5. **图片编辑**: 内置图片编辑功能












