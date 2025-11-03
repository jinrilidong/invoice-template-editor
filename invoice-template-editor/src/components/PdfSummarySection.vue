<template>
  <UnifiedSection title="Summary Section" id="config-summary-section">
    <!-- Label Text Input -->
    <UnifiedLInput
      :model-value="summaryData.labelText || ''"
      @update:model-value="updateField('labelText', $event)"
      label="Label Text"
    />

    <!-- Amount Input -->
    <UnifiedLInput
      :model-value="summaryData.amount || ''"
      @update:model-value="updateField('amount', $event)"
      label="Amount"
      placeholder="Enter amount (e.g., 1,234.56 or $1,234.56)"
    />

    <!-- Help Text -->
    <div>
      <p class="text-sm text-[#9fb1bd]">
        Summary section displays the total amount. Amount can also be calculated automatically from table subtotals if left empty.
      </p>
    </div>
  </UnifiedSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UnifiedSection from './UnifiedSection.vue'
import UnifiedLInput from './UnifiedLInput.vue'
import type { SummaryData, BaseSectionProps, BaseSectionEmits } from '../types/section'

const props = defineProps<BaseSectionProps<SummaryData>>()

const emit = defineEmits<BaseSectionEmits<SummaryData>>()

// 默认数据
const defaultData: SummaryData = {
  labelText: 'Total USD',
  amount: undefined,
}

// 使用computed管理数据
const summaryData = computed({
  get: () => props.modelValue || defaultData,
  set: (value) => emit('update:modelValue', value),
})

// 更新字段
const updateField = (field: keyof SummaryData, value: string) => {
  const newData = { ...summaryData.value }
  if (field === 'amount') {
    // 处理 amount: 空字符串设为 undefined，否则直接存储字符串
    newData.amount = value === '' ? undefined : value
  } else {
    newData[field] = value
  }
  emit('update:modelValue', newData)
}
</script>
