<template>
  <!-- Input Container -->
  <div 
    class="relative w-full h-[44px] bg-white rounded-lg transition-colors duration-200"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
      <!-- Floating Label (when focused or has value) -->
      <div 
        v-if="isFocused || modelValue"
        class="absolute -top-3 left-2 z-10 bg-white px-1"
      >
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
      >
        <label 
          class="font-['Inter:Regular',_sans-serif] font-normal text-[16px] leading-[24px] text-[#9fb1bd]"
        >
          {{ label }}
        </label>
      </div>

      <!-- Input Field -->
      <input
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
          isFocused ? 'border-[#ff5b05]' : 
          isHovered ? 'border-[#7a909e]' : 
          'border-[#c1ccd6]'
        ]"
        :placeholder="isFocused ? '' : label"
        :disabled="disabled"
      />
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'focus', 'blur'])

// State
const isFocused = ref(false)
const isHovered = ref(false)

// Methods
const handleInput = (event) => {
  const value = event.target.value
  console.log('UnifiedLInput: handleInput called', { value, type: props.type })
  emit('update:modelValue', value)
}

const handleFocus = (event) => {
  isFocused.value = true
  emit('focus', event)
}

const handleBlur = (event) => {
  isFocused.value = false
  emit('blur', event)
}
</script>
