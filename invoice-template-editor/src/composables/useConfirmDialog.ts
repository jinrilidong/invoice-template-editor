import { ref } from 'vue'

export interface ConfirmDialogOptions {
  message?: string
  onConfirm: () => void
  onCancel?: () => void
  confirmLabel?: string
  cancelLabel?: string
  title?: string
}

export function useConfirmDialog() {
  const isVisible = ref(false)
  const message = ref('')
  const title = ref('Confirm')
  const confirmLabel = ref('Confirm')
  const cancelLabel = ref('Cancel')
  const onConfirmCallback = ref<(() => void) | null>(null)
  const onCancelCallback = ref<(() => void) | null>(null)

  const showConfirm = (options: ConfirmDialogOptions) => {
    message.value = options.message || 'Are you sure you want to delete this item? This action cannot be undone.'
    onConfirmCallback.value = options.onConfirm
    onCancelCallback.value = options.onCancel || (() => {})
    title.value = options.title || 'Confirm'
    confirmLabel.value = options.confirmLabel || 'Confirm'
    cancelLabel.value = options.cancelLabel || 'Cancel'
    isVisible.value = true
  }

  const handleConfirm = () => {
    if (onConfirmCallback.value) {
      onConfirmCallback.value()
    }
    isVisible.value = false
  }

  const handleCancel = () => {
    if (onCancelCallback.value) {
      onCancelCallback.value()
    }
    isVisible.value = false
  }

  return {
    isVisible,
    message,
    title,
    confirmLabel,
    cancelLabel,
    showConfirm,
    handleConfirm,
    handleCancel
  }
}
