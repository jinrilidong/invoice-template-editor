<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Icon Button Test View</h1>
      <div class="space-y-4">
        <p class="text-gray-600">Icon button component testing page.</p>
        <div class="flex space-x-4">
          <IconButton variant="default" icon="edit" />
          <IconButton variant="primary" icon="save" />
          <IconButton variant="secondary" icon="delete" />
          <IconButton variant="ghost" icon="settings" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconButton from '@/components/IconButton.vue'
</script>



