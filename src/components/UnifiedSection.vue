<template>
  <div :id="id" class="w-full mb-0">
    <!-- Section Title -->
    <SectionTitle 
      :title="title"
      :show-expand-button="true"
      :is-expanded="isExpanded"
      @toggle-expand="toggleExpanded"
    >
      <template #actions>
        <slot name="actions" />
      </template>
    </SectionTitle>

    <!-- Section Content -->
    <div v-if="isExpanded" class="space-y-4">
      <slot />
    </div>

    <!-- Bottom Divider - 已移除，由Configuration Panel统一管理 -->
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SectionTitle from './SectionTitle.vue'

// Props
defineProps({
  title: {
    type: String,
    required: true
  },
  id: {
    type: String,
    default: ''
  }
})

// 展开状态管理
const isExpanded = ref(true) // 默认展开

// 切换展开状态
const toggleExpanded = () => {
  isExpanded.value = !isExpanded.value
}

// 监听全局 collapse-all-sections 事件
const handleCollapseAll = () => {
  isExpanded.value = false
}

onMounted(() => {
  window.addEventListener('collapse-all-sections', handleCollapseAll)
})

onUnmounted(() => {
  window.removeEventListener('collapse-all-sections', handleCollapseAll)
})
</script>
