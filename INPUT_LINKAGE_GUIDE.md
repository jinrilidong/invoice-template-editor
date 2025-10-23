# 输入框联动开发指南

## 📋 概述

本指南说明如何为PDF模板编辑器添加新的输入框联动功能。所有输入框都应该能够实时更新PDF预览。

## 🏗️ 架构设计

### 数据流
```
用户输入 → Section组件 → App.vue (templateData) → PdfPreviewPanel → 实时预览
```

### 核心原则
1. **使用computed属性** - 避免循环更新问题
2. **统一类型定义** - 确保类型安全
3. **标准化组件结构** - 便于维护和扩展

## 🔧 添加新Section的步骤

### 1. 定义数据类型

在 `src/types/section.ts` 中添加新的数据类型：

```typescript
// 新增Section数据类型
export interface NewSectionData {
  field1: string
  field2: string
  field3?: string
}

// 更新TemplateData接口
export interface TemplateData {
  // ... 现有字段
  newSection?: NewSectionData
}
```

### 2. 创建Section组件

创建 `src/components/PdfNewSection.vue`：

```vue
<template>
  <UnifiedSection title="New Section">
    <!-- 输入组件 -->
    <UnifiedLInput
      v-model="sectionData.field1"
      label="Field 1"
    />
    <UnifiedLInput
      v-model="sectionData.field2"
      label="Field 2"
    />
    <UnifiedLInput
      v-model="sectionData.field3"
      label="Field 3"
    />
  </UnifiedSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UnifiedSection from './UnifiedSection.vue'
import UnifiedLInput from './UnifiedLInput.vue'
import type { 
  NewSectionData, 
  CreateSectionProps, 
  CreateSectionEmits 
} from '../types/section'

const props = defineProps<CreateSectionProps<NewSectionData>>()
const emit = defineEmits<CreateSectionEmits<NewSectionData>>()

// 默认数据
const defaultData: NewSectionData = {
  field1: 'Default Value 1',
  field2: 'Default Value 2',
  field3: 'Default Value 3'
}

// 使用computed管理数据，避免循环更新
const sectionData = computed({
  get: () => props.modelValue || defaultData,
  set: (value) => emit('update:modelValue', value)
})
</script>
```

### 3. 更新App.vue

在 `src/App.vue` 中添加新Section：

```typescript
// 1. 添加sectionStates
const sectionStates = ref({
  // ... 现有字段
  newSection: true
})

// 2. 添加templateData
const templateData = reactive({
  // ... 现有字段
  newSection: {
    field1: 'Default Value 1',
    field2: 'Default Value 2',
    field3: 'Default Value 3'
  }
})
```

### 4. 更新PdfConfigPanel

在 `src/components/PdfConfigPanel.vue` 中添加新Section：

```vue
<!-- 在Section Toggle中添加 -->
<ToggleItem
  :id="`toggle-newSection`"
  label="New Section"
  :model-value="sectionStates.newSection"
  @update:model-value="toggleSection('newSection')"
/>

<!-- 在Component Configuration Area中添加 -->
<div v-if="sectionStates.newSection" class="transition-all duration-300">
  <PdfNewSection 
    :model-value="templateData.newSection" 
    @update:model-value="newData => updateTemplateData('newSection', newData)" 
  />
</div>
```

### 5. 更新PdfPreviewPanel

在 `src/components/PdfPreviewPanel.vue` 中添加预览显示：

```vue
<!-- 在PDF Content中添加 -->
<div v-if="props.sectionStates.newSection" class="new-section w-full">
  <h3>{{ props.templateData.newSection?.field1 || 'Default Title' }}</h3>
  <p>{{ props.templateData.newSection?.field2 || 'Default Content' }}</p>
  <p v-if="props.templateData.newSection?.field3">
    {{ props.templateData.newSection.field3 }}
  </p>
</div>
```

## 🎯 数组类型Section

对于包含数组数据的Section（如Info Section、Item Section），使用 `useArraySectionData`：

```vue
<script setup lang="ts">
import { useArraySectionData, generateId } from '../composables/useSectionData'
import type { BaseItem, CreateArraySectionProps, CreateArraySectionEmits } from '../types/section'

const props = defineProps<CreateArraySectionProps<BaseItem>>()
const emit = defineEmits<CreateArraySectionEmits<BaseItem>>()

// 默认数据
const defaultItems: BaseItem[] = [
  { id: '1', label: 'Label 1', value: 'Value 1' },
  { id: '2', label: 'Label 2', value: 'Value 2' }
]

// 使用数组管理composable
const { items, addItem, removeItem } = useArraySectionData(
  defaultItems,
  props,
  emit
)

const addNewItem = () => {
  addItem({
    id: generateId(),
    label: 'New Label',
    value: 'New Value'
  })
}
</script>
```

## 🔍 调试技巧

### 1. 添加调试信息
```vue
<script setup lang="ts">
// 在computed中添加调试
const sectionData = computed({
  get: () => {
    const data = props.modelValue || defaultData
    console.log('Section data get:', data)
    return data
  },
  set: (value) => {
    console.log('Section data set:', value)
    emit('update:modelValue', value)
  }
})
</script>
```

### 2. 检查数据流
```typescript
// 在App.vue中添加watch
watch(templateData, (newValue) => {
  console.log('App.vue: templateData changed:', newValue)
}, { deep: true })
```

## ✅ 测试清单

添加新Section后，确保：

- [ ] 输入框变化时PDF预览立即更新
- [ ] 数据持久化正常工作
- [ ] Section开关功能正常
- [ ] 类型检查无错误
- [ ] 控制台无警告或错误

## 🚨 常见问题

### 1. 联动不工作
- 检查是否使用了computed属性
- 确认没有重复的事件监听器
- 验证数据流是否正确

### 2. 循环更新
- 使用computed替代watch
- 避免在watch中修改被监听的数据

### 3. 类型错误
- 确保类型定义正确
- 使用统一的类型接口

## 📚 相关文件

- `src/types/section.ts` - 类型定义
- `src/composables/useSectionData.ts` - 数据管理工具
- `src/components/templates/BaseSectionTemplate.vue` - 组件模板
- `src/components/UnifiedLInput.vue` - 统一输入组件

## 🎉 总结

遵循本指南，可以确保新添加的输入框具有：
- ✅ 实时联动效果
- ✅ 类型安全
- ✅ 代码一致性
- ✅ 易于维护

