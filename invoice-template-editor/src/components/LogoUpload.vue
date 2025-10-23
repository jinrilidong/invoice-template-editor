<template>
  <div class="w-full">
    <!-- 上传区域 -->
    <div 
      v-if="!modelValue"
      class="relative w-full h-[44px] bg-white rounded-lg border-[1px] border-[#c1ccd6] transition-colors duration-200 cursor-pointer hover:border-[#7a909e]"
      @click="triggerFileInput"
      @mouseenter="isHovered = true"
      @mouseleave="isHovered = false"
    >
      <!-- 拖拽上传区域 -->
      <div 
        class="absolute inset-0 flex items-center justify-center px-3"
        @dragover.prevent
        @dragenter.prevent
        @drop.prevent="handleDrop"
      >
        <div class="flex items-center gap-2 text-[#9fb1bd]">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
          <span class="font-['Inter:Regular',_sans-serif] font-normal text-[16px] leading-[24px]">
            {{ label }}
          </span>
        </div>
      </div>
      
      <!-- 隐藏的文件输入 -->
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileSelect"
      />
    </div>

    <!-- 图片预览区域 -->
    <div 
      v-else
      class="relative w-full bg-white rounded-lg border-[1px] border-[#c1ccd6] p-3"
    >
      <!-- 图片预览 -->
      <div class="flex items-center gap-3">
        <div class="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            :src="modelValue" 
            alt="Logo preview" 
            class="w-full h-full object-cover"
          />
        </div>
        
        <!-- 文件信息 -->
        <div class="flex-1 min-w-0">
          <p class="font-['Inter:Regular',_sans-serif] font-normal text-[14px] leading-[20px] text-[#0e171f] truncate">
            {{ fileName || 'Logo' }}
          </p>
          <p class="font-['Inter:Regular',_sans-serif] font-normal text-[12px] leading-[16px] text-[#9fb1bd]">
            {{ fileSize || 'Image file' }}
          </p>
        </div>
        
        <!-- 操作按钮 -->
        <div class="flex items-center gap-2">
          <!-- 重新选择按钮 -->
          <button
            @click="triggerFileInput"
            class="p-2 text-[#7a909e] hover:text-[#ff5b05] hover:bg-[#fff5f0] rounded-lg transition-colors duration-200"
            title="重新选择"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
          </button>
          
          <!-- 删除按钮 -->
          <button
            @click="removeLogo"
            class="p-2 text-[#7a909e] hover:text-[#dc2626] hover:bg-[#fef2f2] rounded-lg transition-colors duration-200"
            title="删除"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      
      <!-- 隐藏的文件输入 -->
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileSelect"
      />
    </div>

    <!-- 错误提示 -->
    <div v-if="errorMessage" class="mt-2 text-[12px] text-[#dc2626]">
      {{ errorMessage }}
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: '上传Logo'
  },
  maxSize: {
    type: Number,
    default: 5 * 1024 * 1024 // 5MB
  },
  acceptedTypes: {
    type: Array,
    default: () => ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  }
})

// Emits
const emit = defineEmits(['update:modelValue', 'error'])

// Refs
const fileInput = ref(null)
const isHovered = ref(false)
const errorMessage = ref('')
const fileName = ref('')
const fileSize = ref('')

// Methods
const triggerFileInput = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event) => {
  const file = event.target.files?.[0]
  if (file) {
    processFile(file)
  }
}

const handleDrop = (event) => {
  const files = event.dataTransfer.files
  if (files.length > 0) {
    processFile(files[0])
  }
}

const processFile = (file) => {
  // 清除之前的错误
  errorMessage.value = ''
  
  // 验证文件类型
  if (!props.acceptedTypes.includes(file.type)) {
    errorMessage.value = '请选择图片文件 (JPG, PNG, GIF, WebP)'
    emit('error', errorMessage.value)
    return
  }
  
  // 验证文件大小
  if (file.size > props.maxSize) {
    errorMessage.value = `文件大小不能超过 ${formatFileSize(props.maxSize)}`
    emit('error', errorMessage.value)
    return
  }
  
  // 读取文件并转换为base64
  const reader = new FileReader()
  reader.onload = (e) => {
    const result = e.target.result
    emit('update:modelValue', result)
    
    // 保存文件信息
    fileName.value = file.name
    fileSize.value = formatFileSize(file.size)
  }
  reader.onerror = () => {
    errorMessage.value = '文件读取失败，请重试'
    emit('error', errorMessage.value)
  }
  reader.readAsDataURL(file)
}

const removeLogo = () => {
  emit('update:modelValue', '')
  fileName.value = ''
  fileSize.value = ''
  errorMessage.value = ''
  
  // 清空文件输入
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>












