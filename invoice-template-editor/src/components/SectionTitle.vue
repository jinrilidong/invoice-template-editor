<template>
  <div class="section-title-container">
    <div class="flex items-center gap-2">
      <!-- Expand/Collapse Button -->
      <button 
        v-if="showExpandButton"
        @click="$emit('toggle-expand')"
        class="flex items-center justify-center w-6 h-6 rounded hover:bg-gray-100 transition-colors"
        :title="isExpanded ? 'Collapse section' : 'Expand section'"
      >
        <svg 
          class="w-4 h-4 text-gray-600 transition-transform" 
          :class="{ 'rotate-180': isExpanded }"
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
      </button>
      
      <!-- Section Title -->
      <h3 class="section-title text-base font-semibold text-[#0e171f]">
        {{ title }}
      </h3>
    </div>
    
    <div v-if="$slots.actions" class="section-actions">
      <slot name="actions" />
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string
  showExpandButton?: boolean
  isExpanded?: boolean
}

defineProps<Props>()

defineEmits<{
  'toggle-expand': []
}>()
</script>

<style scoped>
.section-title-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 20px 0 20px 0; /* 上边距20px，下边距20px */
  width: 100%;
}

.section-title {
  margin: 0;
  flex: 1;
}

.section-actions {
  display: flex;
  align-items: center;
  gap: 8px; /* 按钮间距8px */
  flex-shrink: 0;
}
</style>
