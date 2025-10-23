<template>
  <div class="min-h-screen bg-gray-50">
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8">Button Test View</h1>
      <div class="space-y-4">
        <p class="text-gray-600">Button component testing page.</p>
        <div class="flex space-x-4">
          <TextButton variant="default">Default Button</TextButton>
          <TextButton variant="primary">Primary Button</TextButton>
          <TextButton variant="secondary">Secondary Button</TextButton>
          <TextButton variant="ghost">Ghost Button</TextButton>
          <TextButton variant="danger">Danger Button</TextButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import TextButton from '@/components/TextButton.vue'
</script>



