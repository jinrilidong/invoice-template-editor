<template>
  <UnifiedSection title="Footer Section" id="config-footer-section">
    <!-- Footer Info Input -->
    <UnifiedLInput
      v-model="footerData.info"
      label="Footer Info"
    />

    <!-- Footer Name Input -->
    <UnifiedLInput
      v-model="footerData.name"
      label="Footer Name"
    />

    <!-- Help Text -->
    <div>
      <p class="text-sm text-[#9fb1bd]">Footer will display centered at the bottom of each page, page numbers will be automatically generated</p>
    </div>
  </UnifiedSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UnifiedSection from './UnifiedSection.vue'
import UnifiedLInput from './UnifiedLInput.vue'
import type { FooterData, BaseSectionProps, BaseSectionEmits } from '../types/section'

const props = defineProps<BaseSectionProps<FooterData>>()

const emit = defineEmits<BaseSectionEmits<FooterData>>()

// 默认数据
const defaultData: FooterData = {
  info: '',
  name: ''
}

// 使用computed管理数据，避免循环更新
const footerData = computed({
  get: () => props.modelValue || defaultData,
  set: (value) => emit('update:modelValue', value)
})
</script>