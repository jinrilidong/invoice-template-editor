<template>
  <UnifiedSection title="Summary Section" id="config-summary-section">
    <!-- Label Text Input -->
    <UnifiedLInput
      v-model="summaryData.labelText"
      label="Label Text"
      placeholder="Enter label text (e.g., Total USD)"
    />

    <!-- Amount Input -->
    <UnifiedLInput
      v-model="summaryData.amount"
      label="Amount"
      type="number"
      placeholder="Enter amount"
    />
  </UnifiedSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UnifiedSection from './UnifiedSection.vue'
import UnifiedLInput from './UnifiedLInput.vue'
import type { SummaryData, BaseSectionProps, BaseSectionEmits } from '../types/section'

const props = defineProps<BaseSectionProps<SummaryData>>()

const emit = defineEmits<BaseSectionEmits<SummaryData>>()

// 使用computed来避免循环更新
const summaryData = computed({
  get: () => props.modelValue || {
    labelText: 'Total USD',
    amount: 0
  },
  set: (value) => {
    emit('update:modelValue', value)
  }
})
</script>

