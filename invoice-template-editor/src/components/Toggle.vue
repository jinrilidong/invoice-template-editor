<template>
  <button
    :id="id"
    @click="toggle"
    :disabled="disabled"
    :aria-pressed="modelValue"
    :aria-label="ariaLabel"
    class="toggle-switch"
    :class="[
      modelValue ? 'toggle-switch--active' : 'toggle-switch--inactive',
      disabled ? 'toggle-switch--disabled' : '',
      size === 'sm' ? 'toggle-switch--sm' : 'toggle-switch--md',
    ]"
  >
    <span
      class="toggle-switch__thumb"
      :class="modelValue ? 'toggle-switch__thumb--active' : 'toggle-switch__thumb--inactive'"
    ></span>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  modelValue: boolean
  id?: string
  disabled?: boolean
  ariaLabel?: string
  size?: 'sm' | 'md'
}

interface Emits {
  (e: 'update:modelValue', value: boolean): void
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
  size: 'md',
  ariaLabel: 'Toggle switch',
})

const emit = defineEmits<Emits>()

const toggle = () => {
  if (!props.disabled) {
    emit('update:modelValue', !props.modelValue)
  }
}
</script>

<style scoped>
.toggle-switch {
  /* Base styles */
  position: relative;
  display: inline-flex;
  align-items: center;
  border: none;
  outline: none;
  cursor: pointer;
  transition: all 200ms ease-in-out;
  border-radius: 12px;

  /* Focus styles */
  &:focus-visible {
    outline: 2px solid #ff5b05;
    outline-offset: 2px;
  }

  /* Disabled styles */
  :is(&--disabled) {
    cursor: not-allowed;
    opacity: 0.5;
  }
}

/* Medium size (default) */
.toggle-switch--md {
  width: 44px;
  height: 24px;
  padding: 2px;
}

/* Small size */
.toggle-switch--sm {
  width: 36px;
  height: 20px;
  padding: 2px;
}

/* Inactive state */
.toggle-switch--inactive {
  background-color: #d3ddde; /* bg - cloudy.200 */
  border: 1px solid #d3ddde; /* 1px描边 */
}

/* Active state */
.toggle-switch--active {
  background-color: #16a163; /* color/icon/status/green */
  border: 1px solid #16a163; /* 1px描边 */
}

/* Thumb styles */
.toggle-switch__thumb {
  position: absolute;
  border-radius: 50%;
  background-color: #ffffff;
  transition: transform 200ms ease-in-out;
  box-shadow:
    0 1px 3px 0 rgba(0, 0, 0, 0.1),
    0 1px 2px 0 rgba(0, 0, 0, 0.06);
}

/* Medium thumb */
.toggle-switch--md .toggle-switch__thumb {
  width: 20px;
  height: 20px;
}

/* Small thumb */
.toggle-switch--sm .toggle-switch__thumb {
  width: 16px;
  height: 16px;
}

/* Thumb positions */
.toggle-switch__thumb--inactive {
  transform: translateX(0);
}

.toggle-switch__thumb--active {
  transform: translateX(20px); /* 44px - 20px - 4px (padding) */
}

.toggle-switch--sm .toggle-switch__thumb--active {
  transform: translateX(16px); /* 36px - 16px - 4px (padding) */
}

/* Hover effects */
.toggle-switch:not(.toggle-switch--disabled):hover {
  &.toggle-switch--inactive {
    background-color: #9ca8aa; /* cloudy.400 */
    border-color: #9ca8aa; /* 悬停时描边颜色 */
  }

  &.toggle-switch--active {
    background-color: #138a55; /* darker green for hover */
    border-color: #138a55; /* 悬停时描边颜色 */
  }
}

/* Active state with brand color option */
.toggle-switch--brand.toggle-switch--active {
  background-color: #ff761f; /* brand.500 */
}

.toggle-switch--brand:not(.toggle-switch--disabled):hover.toggle-switch--active {
  background-color: #ff5b05; /* brand.600 */
}
</style>
