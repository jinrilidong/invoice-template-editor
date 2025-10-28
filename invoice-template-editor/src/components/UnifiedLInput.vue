<template>
  <!-- Input Container -->
  <div
    class="relative w-full bg-white rounded-lg transition-colors duration-200"
    :class="multiline ? 'min-h-[80px]' : 'h-[44px]'"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- Floating Label (when focused or has value) -->
    <div v-if="isFocused || modelValue" class="absolute -top-3 left-2 z-10 bg-white px-1">
      <label
        class="font-['Inter:Regular',_sans-serif] font-normal text-[16px] leading-[24px] text-[#3e5463]"
      >
        {{ label }}
      </label>
    </div>

    <!-- Default Label (when not focused and no value) -->
    <div
      v-else
      class="absolute inset-0 flex items-center px-3"
      :class="multiline ? 'items-start pt-3' : ''"
    >
      <label
        class="font-['Inter:Regular',_sans-serif] font-normal text-[16px] leading-[24px] text-[#9fb1bd]"
      >
        {{ label }}
      </label>
    </div>

    <!-- Single-line Input Field -->
    <input
      v-if="!multiline"
      :type="type"
      :value="modelValue"
      :step="type === 'number' ? 1 : undefined"
      :min="type === 'number' ? 1 : undefined"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      class="absolute inset-0 w-full h-full px-3 bg-transparent border-[1px] rounded-lg outline-none font-['Inter:Regular',_sans-serif] font-normal !text-[16px] leading-[24px] text-[#0e171f] transition-colors duration-200"
      :class="[
        // Border colors based on state
        isFocused ? 'border-[#ff5b05]' : isHovered ? 'border-[#7a909e]' : 'border-[#c1ccd6]',
      ]"
      :placeholder="isFocused ? '' : label"
      :disabled="disabled"
    />

    <!-- Multi-line Textarea Field -->
    <textarea
      v-else
      :value="modelValue"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      class="absolute inset-0 w-full h-full px-3 py-3 bg-transparent border-[1px] rounded-lg outline-none font-['Inter:Regular',_sans-serif] font-normal !text-[16px] leading-[24px] text-[#0e171f] transition-colors duration-200 resize-none"
      :class="[
        // Border colors based on state
        isFocused ? 'border-[#ff5b05]' : isHovered ? 'border-[#7a909e]' : 'border-[#c1ccd6]',
      ]"
      :placeholder="isFocused ? '' : label"
      :disabled="disabled"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  multiline: {
    type: Boolean,
    default: false,
  },
})

// Emits
const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

// State
const isFocused = ref(false)
const isHovered = ref(false)

// Methods
const handleInput = (event: Event) => {
  const value = (event.target as HTMLInputElement | HTMLTextAreaElement).value
  console.log('UnifiedLInput: handleInput called', { value, type: props.type })
  emit('update:modelValue', value)
}

const handleFocus = (event: Event) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event: Event) => {
  isFocused.value = false
  emit('blur', event)
}
</script>
