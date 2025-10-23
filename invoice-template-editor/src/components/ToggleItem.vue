<template>
  <div class="toggle-item">
    <div class="toggle-item__content">
      <div class="toggle-item__text">
        <p class="toggle-item__label">{{ label }}</p>
      </div>
      <div class="toggle-item__toggle">
        <Toggle
          :id="id"
          :model-value="modelValue"
          @update:model-value="$emit('update:modelValue', $event)"
          size="md"
          :aria-label="`Toggle ${label}`"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Toggle from './Toggle.vue'

interface Props {
  id: string
  label: string
  modelValue: boolean
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
}

defineProps<Props>()
defineEmits<Emits>()
</script>

<style scoped>
.toggle-item {
  background-color: #f3f4f6; /* gray-100 - 更明显的颜色 */
  height: 44px;
  border-radius: 8px;
  width: 100%;
}

.toggle-item__content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  padding: 0 12px;
}

.toggle-item__text {
  display: flex;
  flex-direction: column;
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 400;
  justify-content: center;
  line-height: 0;
  position: relative;
  flex-shrink: 0;
  color: #0e171f;
  font-size: 16px;
  white-space: nowrap;
}

.toggle-item__label {
  line-height: 24px;
  white-space: pre;
  margin: 0;
}

.toggle-item__toggle {
  display: flex;
  height: 24px;
  align-items: center;
  position: relative;
  flex-shrink: 0;
}
</style>
