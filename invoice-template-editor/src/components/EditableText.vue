<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'

const props = defineProps<{
  modelValue: string
  editing: boolean
  placeholder?: string
}>()
const emit = defineEmits<{ 'update:modelValue': [val: string] }>()
const elRef = ref<HTMLElement | null>(null)

const htmlToPlain = (html: string) => {
  let h = html
    .replace(/<\/div>\s*<div>/gi, '\n')
    .replace(/<br\s*\/>/gi, '\n')
    .replace(/<br\s*>/gi, '\n')
    .replace(/<\/p>\s*<p>/gi, '\n')
    .replace(/<\/?div[^>]*>/gi, '')
    .replace(/<\/?p[^>]*>/gi, '')
    .replace(/&nbsp;/g, ' ')
  h = h.replace(/<\/?[^>]+(>|$)/g, '')
  return h
}

const plainToHtml = (text: string) => (text || '').replace(/\n/g, '<br />')

const syncFromModel = () => {
  if (!elRef.value) return
  if (props.editing) {
    const current = elRef.value.innerText
    const target = props.modelValue || ''
    // 避免在编辑中重复覆盖，导致光标跳动
    if (current !== target) {
      elRef.value.innerText = target
    }
  } else {
    elRef.value.innerHTML = plainToHtml(props.modelValue || '')
  }
}

onMounted(syncFromModel)
watch(() => props.modelValue, syncFromModel)
watch(() => props.editing, syncFromModel)

const onInput = () => {
  if (!elRef.value) return
  emit('update:modelValue', htmlToPlain(elRef.value.innerHTML))
}
</script>

<template>
  <div
    ref="elRef"
    :contenteditable="editing ? 'plaintext-only' : undefined"
    :data-editing="editing ? 'true' : 'false'"
    :placeholder="placeholder || ''"
    @input="onInput"
    style="white-space: pre-wrap; word-break: break-word; outline: none"
  />
</template>

<style scoped>
div[contenteditable][data-editing='true']:empty::before {
  content: attr(placeholder);
  color: #9ca3af;
}
</style>
