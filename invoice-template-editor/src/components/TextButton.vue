<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
    :class="buttonClasses"
  >
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-2 h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>
    
    <!-- Button content -->
    <slot />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  fullWidth?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'sm',
  type: 'button',
  disabled: false,
  loading: false,
  fullWidth: false
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const classes = []
  
  // Base classes - 基于 Figma 设计规范
  classes.push('text-button-base')
  
  // Variant styles
  const variantClasses = {
    default: 'text-button-default',
    primary: 'text-button-primary',
    secondary: 'text-button-secondary',
    ghost: 'text-button-ghost',
    danger: 'text-button-danger'
  }
  classes.push(variantClasses[props.variant])
  
  // Size styles
  const sizeClasses = {
    sm: 'text-button-sm',
    md: 'text-button-md',
    lg: 'text-button-lg'
  }
  classes.push(sizeClasses[props.size])
  
  // State styles
  if (props.disabled || props.loading) {
    classes.push('text-button-disabled')
  }
  
  if (props.fullWidth) {
    classes.push('text-button-full-width')
  }
  
  return classes.join(' ')
})
</script>

<style scoped>
/* 基础按钮样式 - 基于 Figma 设计规范 */
.text-button-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-family: 'Inter', system-ui, sans-serif;
  font-weight: 600;
  line-height: 1;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  text-decoration: none;
  outline: none;
  gap: 2px;
}

/* 默认变体 - 基于 Figma 设计 */
.text-button-base.text-button-default {
  background-color: #ffffff !important;
  border-color: #c1ccd6 !important;
  color: #2a3f4d !important;
}

.text-button-base.text-button-default:hover:not(:disabled) {
  background-color: #f8f9fa !important;
  border-color: #9fb1bd !important;
}

.text-button-base.text-button-default:active:not(:disabled) {
  background-color: #e7ecef !important;
  border-color: #7a909e !important;
}

/* 主要变体 */
.text-button-base.text-button-primary {
  background-color: #ff761f !important;
  border-color: #ff761f !important;
  color: #ffffff !important;
}

.text-button-base.text-button-primary:hover:not(:disabled) {
  background-color: #ff5b05 !important;
  border-color: #ff5b05 !important;
}

.text-button-base.text-button-primary:active:not(:disabled) {
  background-color: #eb5100 !important;
  border-color: #eb5100 !important;
}

/* 次要变体 */
.text-button-base.text-button-secondary {
  background-color: #f2f5f7 !important;
  border-color: #c1ccd6 !important;
  color: #2a3f4d !important;
}

.text-button-base.text-button-secondary:hover:not(:disabled) {
  background-color: #e7ecef !important;
  border-color: #9fb1bd !important;
}

.text-button-base.text-button-secondary:active:not(:disabled) {
  background-color: #dce3e8 !important;
  border-color: #7a909e !important;
}

/* 幽灵变体 */
.text-button-base.text-button-ghost {
  background-color: transparent !important;
  border-color: transparent !important;
  color: #2a3f4d !important;
}

.text-button-base.text-button-ghost:hover:not(:disabled) {
  background-color: #f8f9fa !important;
  border-color: #c1ccd6 !important;
}

.text-button-base.text-button-ghost:active:not(:disabled) {
  background-color: #e7ecef !important;
  border-color: #9fb1bd !important;
}

/* 危险变体 */
.text-button-base.text-button-danger {
  background-color: #dc2626 !important;
  border-color: #dc2626 !important;
  color: #ffffff !important;
}

.text-button-base.text-button-danger:hover:not(:disabled) {
  background-color: #b91c1c !important;
  border-color: #b91c1c !important;
}

.text-button-base.text-button-danger:active:not(:disabled) {
  background-color: #991b1b !important;
  border-color: #991b1b !important;
}

/* 尺寸变体 */
.text-button-sm {
  font-size: 10px;
  line-height: 12px;
  padding: 4px 8px;
  min-width: 32px;
  min-height: 32px;
}

.text-button-md {
  font-size: 12px;
  line-height: 12px;
  padding: 8px 12px;
  min-width: 40px;
  min-height: 40px;
}

.text-button-lg {
  font-size: 14px;
  line-height: 16px;
  padding: 12px 16px;
  min-width: 48px;
  min-height: 48px;
}

/* 禁用状态 */
.text-button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* 全宽按钮 */
.text-button-full-width {
  width: 100%;
}

/* 焦点状态 */
.text-button-base:focus-visible {
  box-shadow: 0 0 0 2px #ff5b05;
  border-color: #ff5b05;
}

/* 加载状态动画 */
@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
