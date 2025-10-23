<template>
  <div v-if="isVisible" class="fixed inset-0 flex items-center justify-center z-50" style="background-color: rgba(0, 0, 0, 0.3);">
    <div class="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
      <!-- Header -->
      <div class="px-6 py-4 border-b border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900">Confirm Delete</h3>
      </div>
      
      <!-- Content -->
      <div class="px-6 py-4">
        <p class="text-gray-600">{{ message || 'Are you sure you want to delete this item? This action cannot be undone.' }}</p>
      </div>
      
      <!-- Actions -->
      <div class="px-6 py-4 bg-gray-50 rounded-b-lg flex justify-end gap-3">
        <button
          @click="handleCancel"
          class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
        >
          Cancel
        </button>
        <button
          @click="handleConfirm"
          class="px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

interface Props {
  visible: boolean
  message?: string
}

interface Emits {
  (e: 'update:visible', value: boolean): void
  (e: 'confirm'): void
  (e: 'cancel'): void
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const isVisible = ref(props.visible)

watch(() => props.visible, (newValue) => {
  isVisible.value = newValue
})

const handleConfirm = () => {
  emit('confirm')
  emit('update:visible', false)
  isVisible.value = false
}

const handleCancel = () => {
  emit('cancel')
  emit('update:visible', false)
  isVisible.value = false
}

// 监听 ESC 键
const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Escape') {
    handleCancel()
  }
}

// 添加/移除键盘事件监听器
watch(isVisible, (visible) => {
  if (visible) {
    document.addEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'hidden'
  } else {
    document.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  }
})
</script>
