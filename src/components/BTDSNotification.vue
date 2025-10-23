<template>
  <Transition
    enter-active-class="transition-all duration-300 ease-out"
    enter-from-class="opacity-0 transform -translate-y-4 scale-95"
    enter-to-class="opacity-100 transform translate-y-0 scale-100"
    leave-active-class="transition-all duration-300 ease-in"
    leave-from-class="opacity-100 transform translate-y-0 scale-100"
    leave-to-class="opacity-0 transform -translate-y-4 scale-95"
  >
    <div
      v-if="visible"
      :class="notificationClasses"
      class="px-4 py-3 rounded-lg shadow-lg border max-w-md mx-auto"
    >
      <div class="flex items-center gap-3">
        <!-- Icon -->
        <div :class="iconClasses" class="flex-shrink-0">
          <svg v-if="type === 'success'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <svg v-else-if="type === 'error'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
          </svg>
          <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" />
          </svg>
        </div>
        
        <!-- Message -->
        <div class="flex-1">
          <p class="text-sm font-medium">{{ message }}</p>
        </div>
        
        <!-- Close Button -->
        <button
          @click="close"
          class="flex-shrink-0 p-1 rounded-md hover:bg-black/10 transition-colors"
        >
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

interface Props {
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  duration: 3000
})

const emit = defineEmits<{
  close: []
}>()

const visible = ref(false)

const notificationClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-white border-[#10B981] text-[#065F46]'
    case 'error':
      return 'bg-white border-[#EF4444] text-[#991B1B]'
    case 'info':
      return 'bg-white border-[#3B82F6] text-[#1E40AF]'
    default:
      return 'bg-white border-gray-300 text-gray-700'
  }
})

const iconClasses = computed(() => {
  switch (props.type) {
    case 'success':
      return 'text-[#10B981]'
    case 'error':
      return 'text-[#EF4444]'
    case 'info':
      return 'text-[#3B82F6]'
    default:
      return 'text-gray-500'
  }
})

const close = () => {
  visible.value = false
  setTimeout(() => {
    emit('close')
  }, 300)
}

onMounted(() => {
  visible.value = true
  
  if (props.duration > 0) {
    setTimeout(() => {
      close()
    }, props.duration)
  }
})
</script>

<style scoped>
/* BTDS Foundation 3.0 Notification Styles */
.notification-enter-active,
.notification-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.notification-enter-from {
  opacity: 0;
  transform: translate(-50%, -20px) scale(0.95);
}

.notification-leave-to {
  opacity: 0;
  transform: translate(-50%, -20px) scale(0.95);
}
</style>










