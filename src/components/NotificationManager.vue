<template>
  <div class="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 space-y-2 pointer-events-none">
    <TransitionGroup
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 transform -translate-y-4 scale-95"
      enter-to-class="opacity-100 transform translate-y-0 scale-100"
      leave-active-class="transition-all duration-300 ease-in"
      leave-from-class="opacity-100 transform translate-y-0 scale-100"
      leave-to-class="opacity-0 transform -translate-y-4 scale-95"
    >
      <BTDSNotification
        v-for="notification in notifications"
        :key="notification.id"
        :message="notification.message"
        :type="notification.type"
        :duration="notification.duration"
        @close="removeNotification(notification.id)"
        class="pointer-events-auto"
      />
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import BTDSNotification from './BTDSNotification.vue'

interface Notification {
  id: string
  message: string
  type: 'success' | 'error' | 'info'
  duration?: number
}

const notifications = ref<Notification[]>([])

let notificationId = 0

const addNotification = (message: string, type: 'success' | 'error' | 'info' = 'success', duration: number = 3000) => {
  const id = `notification-${++notificationId}`
  notifications.value.push({
    id,
    message,
    type,
    duration
  })
}

const removeNotification = (id: string) => {
  const index = notifications.value.findIndex(n => n.id === id)
  if (index > -1) {
    notifications.value.splice(index, 1)
  }
}

// Expose methods for parent components
defineExpose({
  addNotification,
  removeNotification
})
</script>









