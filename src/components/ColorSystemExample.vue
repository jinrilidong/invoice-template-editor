<template>
  <div class="p-8 bg-white">
    <h1 class="text-3xl font-bold mb-8 text-[#0e171f]">Color System Example</h1>
    
    <!-- Primitive Colors Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6 text-[#0e171f]">Primitive Colors</h2>
      
      <!-- Blue Colors -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4 text-[#3e5463]">Blue</h3>
        <div class="grid grid-cols-6 gap-4">
          <div v-for="(color, shade) in blueColors" :key="shade" class="text-center">
            <div 
              class="w-16 h-16 rounded-lg border border-gray-200 mb-2 mx-auto"
              :style="{ backgroundColor: color }"
            ></div>
            <p class="text-xs text-[#7a909e]">{{ shade }}</p>
            <p class="text-xs font-mono text-[#5b7282]">{{ color }}</p>
          </div>
        </div>
      </div>

      <!-- Orange Colors -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4 text-[#3e5463]">Orange (Brand Colors)</h3>
        <div class="grid grid-cols-6 gap-4">
          <div v-for="(color, shade) in orangeColors" :key="shade" class="text-center">
            <div 
              class="w-16 h-16 rounded-lg border border-gray-200 mb-2 mx-auto"
              :style="{ backgroundColor: color }"
            ></div>
            <p class="text-xs text-[#7a909e]">{{ shade }}</p>
            <p class="text-xs font-mono text-[#5b7282]">{{ color }}</p>
          </div>
        </div>
      </div>

      <!-- Gray Colors -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4 text-[#3e5463]">Gray</h3>
        <div class="grid grid-cols-6 gap-4">
          <div v-for="(color, shade) in grayColors" :key="shade" class="text-center">
            <div 
              class="w-16 h-16 rounded-lg border border-gray-200 mb-2 mx-auto"
              :style="{ backgroundColor: color }"
            ></div>
            <p class="text-xs text-[#7a909e]">{{ shade }}</p>
            <p class="text-xs font-mono text-[#5b7282]">{{ color }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Semantic Tokens Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6 text-[#0e171f]">Semantic Color Tokens</h2>
      
      <!-- Border Colors -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4 text-[#3e5463]">Border Colors</h3>
        <div class="grid grid-cols-4 gap-4">
          <div v-for="(color, variant) in borderColors" :key="variant" class="text-center">
            <div 
              class="w-16 h-16 rounded-lg border-4 mb-2 mx-auto"
              :style="{ borderColor: color }"
            ></div>
            <p class="text-xs text-[#7a909e]">{{ variant }}</p>
            <p class="text-xs font-mono text-[#5b7282]">{{ color }}</p>
          </div>
        </div>
      </div>

      <!-- Text Colors -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4 text-[#3e5463]">Text Colors</h3>
        <div class="space-y-2">
          <div v-for="(color, variant) in textColors" :key="variant" class="flex items-center gap-4">
            <div 
              class="w-8 h-8 rounded border border-gray-200"
              :style="{ backgroundColor: color }"
            ></div>
            <span class="text-sm font-medium text-[#3e5463]">{{ variant }}:</span>
            <span class="text-sm font-mono text-[#5b7282]">{{ color }}</span>
            <span class="text-sm" :style="{ color: color }">Sample Text</span>
          </div>
        </div>
      </div>

      <!-- Icon Colors -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4 text-[#3e5463]">Icon Colors</h3>
        <div class="grid grid-cols-4 gap-4">
          <div v-for="(color, variant) in iconColors" :key="variant" class="text-center">
            <div 
              class="w-16 h-16 rounded-lg border border-gray-200 mb-2 mx-auto flex items-center justify-center"
              :style="{ backgroundColor: color }"
            >
              <svg class="w-8 h-8" :style="{ color: variant.includes('onDark') ? '#ffffff' : '#2a3f4d' }" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
            <p class="text-xs text-[#7a909e]">{{ variant }}</p>
            <p class="text-xs font-mono text-[#5b7282]">{{ color }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Background Colors Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6 text-[#0e171f]">Background Colors</h2>
      
      <!-- Surface Backgrounds -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4 text-[#3e5463]">Surface Backgrounds</h3>
        <div class="grid grid-cols-4 gap-4">
          <div v-for="(color, variant) in surfaceBackgrounds" :key="variant" class="text-center">
            <div 
              class="w-16 h-16 rounded-lg border border-gray-200 mb-2 mx-auto"
              :style="{ backgroundColor: color }"
            ></div>
            <p class="text-xs text-[#7a909e]">{{ variant }}</p>
            <p class="text-xs font-mono text-[#5b7282]">{{ color }}</p>
          </div>
        </div>
      </div>

      <!-- Fill Backgrounds -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4 text-[#3e5463]">Fill Backgrounds</h3>
        <div class="grid grid-cols-4 gap-4">
          <div v-for="(color, variant) in fillBackgrounds" :key="variant" class="text-center">
            <div 
              class="w-16 h-16 rounded-lg border border-gray-200 mb-2 mx-auto"
              :style="{ backgroundColor: color }"
            ></div>
            <p class="text-xs text-[#7a909e]">{{ variant }}</p>
            <p class="text-xs font-mono text-[#5b7282]">{{ color }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Spacing and Radius Section -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6 text-[#0e171f]">Spacing & Radius Values</h2>
      
      <!-- Spacing Examples -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4 text-[#3e5463]">Spacing Values</h3>
        <div class="space-y-4">
          <div v-for="(value, size) in spacingValues" :key="size" class="flex items-center gap-4">
            <div class="w-16 text-sm font-mono text-[#5b7282]">{{ size }}:</div>
            <div class="w-16 text-sm font-mono text-[#5b7282]">{{ value }}</div>
            <div class="flex items-center">
              <div class="bg-[#ff5b05] h-4" :style="{ width: value }"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- Radius Examples -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4 text-[#3e5463]">Radius Values</h3>
        <div class="flex gap-8">
          <div v-for="(value, size) in radiusValues" :key="size" class="text-center">
            <div 
              class="w-16 h-16 bg-[#ff5b05] mb-2"
              :style="{ borderRadius: value }"
            ></div>
            <p class="text-xs text-[#7a909e]">{{ size }}:</p>
            <p class="text-xs font-mono text-[#5b7282]">{{ value }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Usage Examples -->
    <section class="mb-12">
      <h2 class="text-2xl font-bold mb-6 text-[#0e171f]">Usage Examples</h2>
      
      <!-- Button Examples -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4 text-[#3e5463]">Button Examples</h3>
        <div class="flex gap-4">
          <button 
            class="px-4 py-2 rounded-lg text-white font-medium"
            :style="{ backgroundColor: getTokenColor('border', 'brand') }"
          >
            Primary Button
          </button>
          <button 
            class="px-4 py-2 rounded-lg border-2 font-medium"
            :style="{ 
              borderColor: getTokenColor('border', 'secondary'),
              color: getTokenColor('text', 'primary')
            }"
          >
            Secondary Button
          </button>
          <button 
            class="px-4 py-2 rounded-lg font-medium"
            :style="{ 
              backgroundColor: getBackgroundColor('bgFillSecondary'),
              color: getTokenColor('text', 'brand')
            }"
          >
            Tertiary Button
          </button>
        </div>
      </div>

      <!-- Input Examples -->
      <div class="mb-8">
        <h3 class="text-lg font-semibold mb-4 text-[#3e5463]">Input Examples</h3>
        <div class="space-y-4 max-w-md">
          <input 
            type="text" 
            placeholder="Default input"
            class="w-full px-3 py-2 rounded-lg border-2 focus:outline-none"
            :style="{ 
              borderColor: getTokenColor('borderInput', 'border'),
              backgroundColor: getBackgroundColor('inputBgFillEnabled')
            }"
          >
          <input 
            type="text" 
            placeholder="Focused input"
            class="w-full px-3 py-2 rounded-lg border-2 focus:outline-none"
            :style="{ 
              borderColor: getTokenColor('borderInput', 'borderHighlight'),
              backgroundColor: getBackgroundColor('inputBgFillEnabled')
            }"
          >
          <input 
            type="text" 
            placeholder="Error input"
            class="w-full px-3 py-2 rounded-lg border-2 focus:outline-none"
            :style="{ 
              borderColor: getTokenColor('borderInput', 'borderError'),
              backgroundColor: getBackgroundColor('inputBgFillError')
            }"
          >
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { 
  getPrimitiveColor, 
  getTokenColor, 
  getBackgroundColor, 
  getSpacingValue, 
  getRadiusValue 
} from '@/styles/design-system'

// Primitive colors
const blueColors = {
  '900': getPrimitiveColor('blue', '900'),
  '800': getPrimitiveColor('blue', '800'),
  '700': getPrimitiveColor('blue', '700'),
  '600': getPrimitiveColor('blue', '600'),
  '500': getPrimitiveColor('blue', '500'),
  '400': getPrimitiveColor('blue', '400'),
  '300': getPrimitiveColor('blue', '300'),
  '200': getPrimitiveColor('blue', '200'),
  '100': getPrimitiveColor('blue', '100')
}

const orangeColors = {
  '900': getPrimitiveColor('orange', '900'),
  '800': getPrimitiveColor('orange', '800'),
  '700': getPrimitiveColor('orange', '700'),
  '600': getPrimitiveColor('orange', '600'),
  '500': getPrimitiveColor('orange', '500'),
  '400': getPrimitiveColor('orange', '400'),
  '300': getPrimitiveColor('orange', '300'),
  '200': getPrimitiveColor('orange', '200'),
  '100': getPrimitiveColor('orange', '100'),
  '50': getPrimitiveColor('orange', '50')
}

const grayColors = {
  '900': getPrimitiveColor('gray', '900'),
  '800': getPrimitiveColor('gray', '800'),
  '700': getPrimitiveColor('gray', '700'),
  '600': getPrimitiveColor('gray', '600'),
  '500': getPrimitiveColor('gray', '500'),
  '400': getPrimitiveColor('gray', '400'),
  '300': getPrimitiveColor('gray', '300'),
  '200': getPrimitiveColor('gray', '200'),
  '100': getPrimitiveColor('gray', '100'),
  '50': getPrimitiveColor('gray', '50')
}

// Semantic tokens
const borderColors = {
  'brand': getTokenColor('border', 'brand'),
  'secondary': getTokenColor('border', 'secondary'),
  'info': getTokenColor('border', 'info'),
  'success': getTokenColor('border', 'success'),
  'warning': getTokenColor('border', 'warning'),
  'critical': getTokenColor('border', 'critical')
}

const textColors = {
  'primary': getTokenColor('text', 'primary'),
  'secondary': getTokenColor('text', 'secondary'),
  'disabled': getTokenColor('text', 'disabled'),
  'link': getTokenColor('text', 'link'),
  'brand': getTokenColor('text', 'brand'),
  'success': getTokenColor('text', 'success'),
  'warning': getTokenColor('text', 'warning'),
  'critical': getTokenColor('text', 'critical')
}

const iconColors = {
  'primary': getTokenColor('icon', 'primary'),
  'secondary': getTokenColor('icon', 'secondary'),
  'success': getTokenColor('icon', 'success'),
  'warning': getTokenColor('icon', 'warning'),
  'critical': getTokenColor('icon', 'critical'),
  'onDark': getTokenColor('icon', 'onDark')
}

// Background colors
const surfaceBackgrounds = {
  'bgSurface': getBackgroundColor('bgSurface'),
  'bgSurfaceDisabled': getBackgroundColor('bgSurfaceDisabled'),
  'bgSurfaceSuccess': getBackgroundColor('bgSurfaceSuccess'),
  'bgSurfaceWarning': getBackgroundColor('bgSurfaceWarning'),
  'bgSurfaceCritical': getBackgroundColor('bgSurfaceCritical')
}

const fillBackgrounds = {
  'bgFill': getBackgroundColor('bgFill'),
  'bgFillPrimary': getBackgroundColor('bgFillPrimary'),
  'bgFillSecondary': getBackgroundColor('bgFillSecondary'),
  'bgFillTertiary': getBackgroundColor('bgFillTertiary'),
  'bgFillDisabled': getBackgroundColor('bgFillDisabled'),
  'bgFillError': getBackgroundColor('bgFillError')
}

// Spacing and radius values
const spacingValues = {
  '100': getSpacingValue('100'),
  '200': getSpacingValue('200'),
  '300': getSpacingValue('300'),
  '400': getSpacingValue('400'),
  '600': getSpacingValue('600'),
  '800': getSpacingValue('800')
}

const radiusValues = {
  '100': getRadiusValue('100'),
  '200': getRadiusValue('200'),
  '300': getRadiusValue('300')
}
</script>
