# Vue v-model 错误修复

## 问题描述

在PdfConfigPanel.vue中出现了Vue错误：
```
[plugin:vite:vue] v-model cannot be used on v-for or v-slot scope variables because they are not writable.
```

## 问题原因

在v-for循环中，我们尝试使用v-model绑定到循环变量`enabled`：

```vue
<Toggle
  v-model="enabled"  <!-- 错误：enabled是v-for循环变量 -->
  @update:modelValue="toggleSection(section as keyof SectionStates)"
/>
```

Vue不允许在v-for或v-slot作用域变量上使用v-model，因为这些变量不是可写的。

## 解决方案

将v-model拆分为`:model-value`和`@update:model-value`：

### 修复前
```vue
<Toggle
  :id="`toggle-${section}`"
  v-model="enabled"  <!-- 错误 -->
  @update:modelValue="toggleSection(section as keyof SectionStates)"
  size="md"
  :aria-label="`Toggle ${getSectionName(section)} section`"
/>
```

### 修复后
```vue
<Toggle
  :id="`toggle-${section}`"
  :model-value="enabled"  <!-- 正确：单向绑定 -->
  @update:model-value="toggleSection(section as keyof SectionStates)"  <!-- 正确：事件监听 -->
  size="md"
  :aria-label="`Toggle ${getSectionName(section)} section`"
/>
```

## 技术说明

### v-model的本质
v-model是`:model-value`和`@update:model-value`的语法糖：

```vue
<!-- 这两种写法是等价的 -->
<Component v-model="value" />
<Component :model-value="value" @update:model-value="value = $event" />
```

### 在v-for中的限制
在v-for循环中，循环变量（如`enabled`）是只读的，不能直接赋值：

```vue
<!-- 错误：不能直接修改循环变量 -->
<div v-for="(enabled, section) in sectionStates" :key="section">
  <Toggle v-model="enabled" />  <!-- 错误 -->
</div>

<!-- 正确：通过事件处理函数修改 -->
<div v-for="(enabled, section) in sectionStates" :key="section">
  <Toggle 
    :model-value="enabled" 
    @update:model-value="toggleSection(section)" 
  />
</div>
```

## 修复效果

### 功能保持
- ✅ Toggle组件状态显示正确
- ✅ 点击切换功能正常
- ✅ 状态变化正确反映在UI上
- ✅ 数据绑定正常工作

### 错误消除
- ✅ Vue编译错误已解决
- ✅ 开发服务器正常运行
- ✅ 控制台无错误信息

## 最佳实践

### 在v-for中使用双向绑定
1. **避免直接使用v-model**: 在v-for中不要直接使用v-model
2. **使用单向绑定**: 使用`:model-value`进行单向数据绑定
3. **使用事件处理**: 通过`@update:model-value`事件处理状态变化
4. **保持数据流清晰**: 确保数据流是单向的，通过事件向上传递

### 示例代码
```vue
<template>
  <div v-for="(item, index) in items" :key="index">
    <!-- 正确的方式 -->
    <Toggle
      :model-value="item.enabled"
      @update:model-value="updateItem(index, $event)"
    />
    
    <!-- 错误的方式 -->
    <!-- <Toggle v-model="item.enabled" /> -->
  </div>
</template>

<script setup>
const updateItem = (index, newValue) => {
  items[index].enabled = newValue
}
</script>
```

## 相关概念

### Vue 3 Composition API
- **响应式数据**: 使用`ref`或`reactive`创建响应式数据
- **事件处理**: 使用`@event`监听事件
- **数据绑定**: 使用`:prop`进行单向绑定

### v-for循环
- **循环变量**: 在v-for中定义的变量是只读的
- **数据修改**: 需要通过索引或唯一标识符修改数组/对象
- **事件传递**: 通过事件将数据变化传递给父组件

## 总结

通过将v-model拆分为`:model-value`和`@update:model-value`，我们解决了Vue编译错误，同时保持了组件的功能完整性。这是处理v-for循环中双向绑定的标准做法。

---

*修复完成，Vue编译错误已解决，Toggle组件功能正常。*

