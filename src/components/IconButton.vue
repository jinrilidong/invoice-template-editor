<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    @click="$emit('click', $event)"
    class="icon-button"
    :class="buttonClasses"
    :title="title"
    :aria-label="ariaLabel || title"
  >
    <!-- Loading spinner -->
    <svg
      v-if="loading"
      class="animate-spin"
      :class="iconSizeClass"
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
    
    <!-- Icon content -->
    <slot v-else />
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  variant?: 'default' | 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  loading?: boolean
  title?: string
  ariaLabel?: string
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  size: 'sm',
  type: 'button',
  disabled: false,
  loading: false,
  title: '',
  ariaLabel: ''
})

const emit = defineEmits<{
  click: [event: MouseEvent]
}>()

const buttonClasses = computed(() => {
  const classes = []
  
  // Base classes - 基于 Figma 设计规范
  classes.push('icon-button-base')
  
  // Variant styles
  const variantClasses = {
    default: 'icon-button-default',
    primary: 'icon-button-primary',
    secondary: 'icon-button-secondary',
    ghost: 'icon-button-ghost'
  }
  classes.push(variantClasses[props.variant])
  
  // Size styles
  const sizeClasses = {
    sm: 'icon-button-sm',
    md: 'icon-button-md',
    lg: 'icon-button-lg'
  }
  classes.push(sizeClasses[props.size])
  
  // State styles
  if (props.disabled || props.loading) {
    classes.push('icon-button-disabled')
  }
  
  return classes.join(' ')
})

const iconSizeClass = computed(() => {
  const sizeClasses = {
    sm: 'w-3 h-3',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  }
  return sizeClasses[props.size]
})
</script>

<style scoped>
/* 基础图标按钮样式 - 基于 Figma 设计规范 */
.icon-button-base {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 1px solid transparent;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  outline: none;
  gap: 4px;
  position: relative;
}

/* 默认变体 - 基于 Figma 设计 */
.icon-button-default {
  background-color: #ffffff;
  border-color: #c1ccd6;
  color: #2a3f4d;
}

.icon-button-default:hover:not(:disabled) {
  background-color: #f8f9fa;
  border-color: #9fb1bd;
}

.icon-button-default:active:not(:disabled) {
  background-color: #e7ecef;
  border-color: #7a909e;
}

/* 主要变体 */
.icon-button-primary {
  background-color: #ff761f;
  border-color: #ff761f;
  color: #ffffff;
}

.icon-button-primary:hover:not(:disabled) {
  background-color: #ff5b05;
  border-color: #ff5b05;
}

.icon-button-primary:active:not(:disabled) {
  background-color: #eb5100;
  border-color: #eb5100;
}

/* 次要变体 */
.icon-button-secondary {
  background-color: #f2f5f7;
  border-color: #c1ccd6;
  color: #2a3f4d;
}

.icon-button-secondary:hover:not(:disabled) {
  background-color: #e7ecef;
  border-color: #9fb1bd;
}

.icon-button-secondary:active:not(:disabled) {
  background-color: #dce3e8;
  border-color: #7a909e;
}

/* 幽灵变体 */
.icon-button-ghost {
  background-color: transparent;
  border-color: transparent;
  color: #2a3f4d;
}

.icon-button-ghost:hover:not(:disabled) {
  background-color: #f8f9fa;
  border-color: #c1ccd6;
}

.icon-button-ghost:active:not(:disabled) {
  background-color: #e7ecef;
  border-color: #9fb1bd;
}

/* 尺寸变体 */
.icon-button-sm {
  padding: 4px;
  min-width: 32px;
  min-height: 32px;
}

.icon-button-md {
  padding: 8px;
  min-width: 40px;
  min-height: 40px;
}

.icon-button-lg {
  padding: 12px;
  min-width: 48px;
  min-height: 48px;
}

/* 禁用状态 */
.icon-button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

/* 焦点状态 */
.icon-button-base:focus-visible {
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

/* 确保图标正确显示 */
.icon-button svg {
  display: block;
  flex-shrink: 0;
}

/* 图标颜色继承 */
.icon-button svg {
  color: inherit;
  fill: currentColor;
  stroke: currentColor;
}
</style>
