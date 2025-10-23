<template>
  <UnifiedSection title="Header Section" id="config-header-section">
    <!-- Title Input -->
    <UnifiedLInput
      v-model="headerData.title"
      label="Title"
    />

    <!-- Description Input -->
    <UnifiedLInput
      v-model="headerData.description"
      label="Description"
    />

    <!-- Logo Upload -->
    <LogoUpload
      v-model="headerData.logo"
      label="Logo upload"
    />

    <!-- Logo Size -->
    <div class="mt-2">
      <label class="text-sm font-medium">Logo size</label>
      <select v-model="headerData.logoSize" class="border rounded p-1 text-sm w-full">
        <option value="default">默认尺寸</option>
        <option value="large">大尺寸（高度 + 1/2）</option>
      </select>
    </div>
  </UnifiedSection>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import UnifiedSection from './UnifiedSection.vue'
import UnifiedLInput from './UnifiedLInput.vue'
import LogoUpload from './LogoUpload.vue'
import type { HeaderData, BaseSectionProps, BaseSectionEmits } from '../types/section'

const props = defineProps<BaseSectionProps<HeaderData>>()

const emit = defineEmits<BaseSectionEmits<HeaderData>>()

// 使用computed来避免循环更新
const headerData = computed({
  get: () => props.modelValue || {
    title: 'Invoice',
    description: '',
    logo: '',
    logoSize: 'default' as 'default' | 'large'
  },
  set: (value) => {
    emit('update:modelValue', value)
  }
})
</script>