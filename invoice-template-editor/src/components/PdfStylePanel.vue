<template>
  <div
    class="h-full bg-white rounded-xl shadow-lg border border-[#d3ddde] flex flex-col w-full min-w-0"
  >
    <!-- Header -->
    <div class="bg-gray-100 border-b border-[#d3ddde] flex-shrink-0 p-4 min-h-[3rem] w-full">
      <div class="flex items-center justify-between w-full">
        <h2 class="text-lg font-semibold text-[#0e171f]">PDF Style</h2>
        <div class="flex items-center gap-2">
          <TextButton
            @click="refreshPreview"
            variant="default"
            size="sm"
            class="text-gray-600 hover:text-gray-800"
          >
            <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              ></path>
            </svg>
            Refresh
          </TextButton>
        </div>
      </div>
    </div>

    <!-- Body -->
    <div class="flex-1 overflow-y-auto overflow-x-hidden w-full min-w-0 p-4 space-y-6">
      <!-- Global Settings -->
      <section v-if="showGlobalSettings">
        <h3 class="text-sm font-semibold text-[#0e171f] mb-3">Global Settings</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Base Font Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.baseFontSize"
              min="6"
              max="24"
            />
          </div>
        </div>
      </section>

      <!-- Header Section -->
      <section v-if="showHeaderSettings">
        <h3 class="text-sm font-semibold text-[#0e171f] mb-3">Header Section</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Vertical Align</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.header.verticalAlign"
            >
              <option value="top">Top</option>
              <option value="middle">Middle</option>
              <option value="bottom">Bottom</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Title Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="local.header.titleColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.header.titleColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Title Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.header.titleSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Title Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.header.titleWeight"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Description Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="local.header.descriptionColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.header.descriptionColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Description Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.header.descriptionSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Description Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.header.descriptionWeight"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <!-- Logo Height -->
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Logo Height (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.header.logoHeight"
              min="20"
              max="200"
            />
          </div>
          <!-- Logo Description -->
          <div class="border-t border-[#d3ddde] pt-4 mt-4">
            <h4 class="text-xs font-semibold text-[#0e171f] mb-3">Logo Description</h4>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <label class="w-32 text-sm text-[#0e171f]">Color</label>
                <input
                  type="color"
                  class="h-8 w-12 border border-[#d3ddde] rounded"
                  v-model="local.header.logoDescriptionColor"
                />
                <input
                  type="text"
                  class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
                  v-model="local.header.logoDescriptionColor"
                />
              </div>
              <div class="flex items-center gap-3">
                <label class="w-32 text-sm text-[#0e171f]">Size (px)</label>
                <input
                  type="number"
                  class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
                  v-model.number="local.header.logoDescriptionSize"
                  min="6"
                  max="24"
                />
              </div>
              <div class="flex items-center gap-3">
                <label class="w-32 text-sm text-[#0e171f]">Weight</label>
                <select
                  class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
                  v-model="local.header.logoDescriptionWeight"
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Info Section -->
      <section v-if="showInfoSettings">
        <h3 class="text-sm font-semibold text-[#0e171f] mb-3">Info Section {{ currentInfoIndex > 0 ? `#${currentInfoIndex + 1}` : '' }}</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="currentInfoStyle.sectionTitleColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentInfoStyle.sectionTitleColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentInfoStyle.sectionTitleSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentInfoStyle.sectionTitleWeight"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Bottom Margin (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentInfoStyle.sectionTitleBottomMargin"
              min="0"
              max="16"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="currentInfoStyle.labelColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentInfoStyle.labelColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentInfoStyle.labelSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentInfoStyle.labelWeight"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Value Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="currentInfoStyle.valueColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentInfoStyle.valueColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Value Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentInfoStyle.valueSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Value Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentInfoStyle.valueWeight"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Item Gap (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentInfoStyle.itemGap"
              min="0"
              max="16"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Items Per Row</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentInfoStyle.itemsPerRow"
            >
              <option :value="5">1/5</option>
              <option :value="4">1/4</option>
              <option :value="3">1/3</option>
              <option :value="2">1/2</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Items Spacing (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentInfoStyle.itemsSpacing"
              min="0"
              max="16"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label-Value Gap (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentInfoStyle.labelValueGap"
              min="0"
              max="16"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Top Margin (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentInfoStyle.topMargin"
              min="0"
              max="24"
            />
          </div>
        </div>
      </section>

      <!-- Table Section -->
      <section v-if="showTableSettings">
        <h3 class="text-sm font-semibold text-[#0e171f] mb-3">Table Section {{ currentTableIndex > 0 ? `#${currentTableIndex + 1}` : '' }}</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="currentTableStyle.sectionTitleColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentTableStyle.sectionTitleColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentTableStyle.sectionTitleSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentTableStyle.sectionTitleWeight"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Bottom Margin (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentTableStyle.sectionTitleBottomMargin"
              min="0"
              max="16"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Subsection Title Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="currentTableStyle.subsectionTitleColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentTableStyle.subsectionTitleColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Subsection Title Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentTableStyle.subsectionTitleSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Subsection Title Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentTableStyle.subsectionTitleWeight"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Subsection Title Bottom Margin (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentTableStyle.subsectionTitleBottomMargin"
              min="0"
              max="16"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Header Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="currentTableStyle.headerColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentTableStyle.headerColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Column Name Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentTableStyle.columnNameWeight"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Column Name Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentTableStyle.columnNameSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Row Text Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="currentTableStyle.rowTextColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentTableStyle.rowTextColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Row Text Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentTableStyle.rowTextSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Border Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="currentTableStyle.borderColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentTableStyle.borderColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Row Height (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentTableStyle.rowHeight"
              min="8"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Row Spacing (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentTableStyle.rowSpacing"
              min="0"
              max="10"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Columns Padding (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentTableStyle.columnsPadding"
              min="0"
              max="16"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Subtotal Offset (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentTableStyle.subtotalOffset"
              min="-200"
              max="200"
            />
            <span class="text-xs text-gray-500">Positive: left, Negative: right</span>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Top Margin (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentTableStyle.topMargin"
              min="0"
              max="24"
            />
          </div>
        </div>
      </section>

      <!-- Summary Section -->
      <section v-if="showSummarySettings">
        <h3 class="text-sm font-semibold text-[#0e171f] mb-3">Summary Section</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Text</label>
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.summary.labelText"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="local.summary.labelColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.summary.labelColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.summary.labelWeight"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.summary.labelSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Content Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="local.summary.contentColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.summary.contentColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Content Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.summary.contentWeight"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Content Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.summary.contentSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label-Content Gap (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.summary.labelContentGap"
              min="0"
              max="48"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Top Margin (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.summary.topMargin"
              min="0"
              max="24"
            />
          </div>
        </div>
      </section>

      <!-- Description Section -->
      <section v-if="showDescriptionSettings">
        <h3 class="text-sm font-semibold text-[#0e171f] mb-3">Description Section {{ currentDescriptionIndex > 0 ? `#${currentDescriptionIndex + 1}` : '' }}</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="currentDescriptionStyle.labelColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentDescriptionStyle.labelColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.description.labelSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentDescriptionStyle.labelWeight"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Bottom Margin (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentDescriptionStyle.labelBottomMargin"
              min="0"
              max="16"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Text Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="currentDescriptionStyle.textColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentDescriptionStyle.textColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Text Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentDescriptionStyle.textWeight"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Text Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.description.textSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Line Height</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.description.lineHeight"
              min="1"
              max="2"
              step="0.1"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Top Margin (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.description.topMargin"
              min="0"
              max="24"
            />
          </div>
        </div>
      </section>

      <!-- Item Section -->
      <section v-if="showItemSettings">
        <h3 class="text-sm font-semibold text-[#0e171f] mb-3">Item Section {{ currentItemIndex > 0 ? `#${currentItemIndex + 1}` : '' }}</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="currentItemStyle.sectionTitleColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentItemStyle.sectionTitleColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.item.sectionTitleSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentItemStyle.sectionTitleWeight"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Bottom Margin (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentItemStyle.sectionTitleBottomMargin"
              min="0"
              max="16"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="currentItemStyle.labelColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentItemStyle.labelColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.item.labelSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentItemStyle.labelWeight"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Value Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="currentItemStyle.valueColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentItemStyle.valueColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Value Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.item.valueSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Value Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentItemStyle.valueWeight"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Item Gap (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.item.itemGap"
              min="0"
              max="16"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Items Per Row</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.item.itemsPerRow"
            >
              <option :value="5">1/5</option>
              <option :value="4">1/4</option>
              <option :value="3">1/3</option>
              <option :value="2">1/2</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Items Spacing (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.item.itemsSpacing"
              min="0"
              max="16"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label-Value Gap (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.item.labelValueGap"
              min="0"
              max="16"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Top Margin (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.item.topMargin"
              min="0"
              max="24"
            />
          </div>
        </div>
      </section>

      <!-- H-Info Section -->
      <section v-if="showHInfoSettings">
        <h3 class="text-sm font-semibold text-[#0e171f] mb-3">H-Info Section {{ currentHInfoIndex > 0 ? `#${currentHInfoIndex + 1}` : '' }}</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="currentHInfoStyle.sectionTitleColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentHInfoStyle.sectionTitleColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.hInfo.sectionTitleSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentHInfoStyle.sectionTitleWeight"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Bottom Margin (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="currentHInfoStyle.sectionTitleBottomMargin"
              min="0"
              max="16"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="currentHInfoStyle.labelColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentHInfoStyle.labelColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.hInfo.labelSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentHInfoStyle.labelWeight"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Value Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="currentHInfoStyle.valueColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentHInfoStyle.valueColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Value Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.hInfo.valueSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Value Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="currentHInfoStyle.valueWeight"
            >
              <option value="normal">Normal</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Width (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.hInfo.labelWidth"
              min="40"
              max="200"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label-Value Gap (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.hInfo.labelValueGap"
              min="4"
              max="32"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Item Gap (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.hInfo.itemGap"
              min="0"
              max="16"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Column Gap (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.hInfo.columnGap"
              min="4"
              max="32"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Columns Padding (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.hInfo.columnsPadding"
              min="0"
              max="32"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Top Margin (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.hInfo.topMargin"
              min="0"
              max="24"
            />
          </div>
        </div>
      </section>

      <!-- Footer Pagination -->
      <section v-if="showFooterSettings">
        <h3 class="text-sm font-semibold text-[#0e171f] mb-3">Footer Pagination</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Text Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="local.footer.textColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.footer.textColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Text Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.footer.textSize"
              min="6"
              max="24"
            />
          </div>
          <!-- Footer Info (moved from Global Settings) -->
          <div class="border-t border-[#d3ddde] pt-4 mt-4">
            <h4 class="text-xs font-semibold text-[#0e171f] mb-3">Footer Info</h4>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <label class="w-32 text-sm text-[#0e171f]">Text Color</label>
                <input
                  type="color"
                  class="h-8 w-12 border border-[#d3ddde] rounded"
                  v-model="local.footerInfo.textColor"
                />
                <input
                  type="text"
                  class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
                  v-model="local.footerInfo.textColor"
                />
              </div>
              <div class="flex items-center gap-3">
                <label class="w-32 text-sm text-[#0e171f]">Text Size (px)</label>
                <input
                  type="number"
                  class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
                  v-model.number="local.footerInfo.textSize"
                  min="6"
                  max="24"
                />
              </div>
              <div class="flex items-center gap-3">
                <label class="w-32 text-sm text-[#0e171f]">Text Weight</label>
                <select
                  class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
                  v-model="local.footerInfo.textWeight"
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Footer Name (moved from Global Settings) -->
          <div class="border-t border-[#d3ddde] pt-4 mt-4">
            <h4 class="text-xs font-semibold text-[#0e171f] mb-3">Footer Name</h4>
            <div class="space-y-3">
              <div class="flex items-center gap-3">
                <label class="w-32 text-sm text-[#0e171f]">Text Color</label>
                <input
                  type="color"
                  class="h-8 w-12 border border-[#d3ddde] rounded"
                  v-model="local.footerName.textColor"
                />
                <input
                  type="text"
                  class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
                  v-model="local.footerName.textColor"
                />
              </div>
              <div class="flex items-center gap-3">
                <label class="w-32 text-sm text-[#0e171f]">Text Size (px)</label>
                <input
                  type="number"
                  class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
                  v-model.number="local.footerName.textSize"
                  min="6"
                  max="24"
                />
              </div>
              <div class="flex items-center gap-3">
                <label class="w-32 text-sm text-[#0e171f]">Text Weight</label>
                <select
                  class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
                  v-model="local.footerName.textWeight"
                >
                  <option value="normal">Normal</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, watch, computed } from 'vue'
import TextButton from './TextButton.vue'
import type { StyleConfig } from '@/types/style'
import {
  getInfoStyle,
  getTableStyle,
  getDescriptionStyle,
  getItemStyle,
  getHInfoStyle,
  createDefaultInfoStyle,
  createDefaultTableStyle,
  createDefaultDescriptionStyle,
  createDefaultItemStyle,
  createDefaultHInfoStyle,
  cloneStyle,
} from '@/utils/style-helper'

interface SectionStyle {
  // Summary Section
  summary: {
    labelText?: string
    labelColor: string
    labelWeight?: 'normal' | 'bold'
    contentColor: string
    contentWeight?: 'normal' | 'bold'
    labelSize: number
    contentSize: number
    labelContentGap: number
    topMargin?: number
  }
  // Header Section
  header: {
    titleColor: string
    titleSize: number
    titleWeight?: 'normal' | 'bold'
    descriptionColor: string
    descriptionSize: number
    descriptionWeight?: 'normal' | 'bold'
    verticalAlign?: 'top' | 'middle' | 'bottom'
    // Logo description below the logo
    logoDescriptionColor?: string
    logoDescriptionSize?: number
    logoDescriptionWeight?: 'normal' | 'bold'
    // Logo height in pixels (maintains aspect ratio)
    logoHeight?: number
  }
  // Info Section
  info: {
    sectionTitleColor: string
    sectionTitleWeight?: 'normal' | 'bold'
    sectionTitleSize?: number
    labelColor: string
    labelWeight?: 'normal' | 'bold'
    labelSize?: number
    valueColor: string
    valueWeight?: 'normal' | 'bold'
    valueSize?: number
    itemGap: number
    itemsPerRow?: 2 | 3 | 4 | 5
    itemsSpacing: number
    labelValueGap: number
    topMargin?: number
  }
  // Table Section
  table: {
    sectionTitleColor: string
    sectionTitleWeight?: 'normal' | 'bold'
    sectionTitleSize?: number
    subsectionTitleColor: string
    subsectionTitleWeight?: 'normal' | 'bold'
    subsectionTitleSize?: number
    headerColor: string
    columnNameWeight?: 'normal' | 'bold'
    columnNameSize?: number
    rowTextColor: string
    rowTextSize?: number
    borderColor: string
    rowHeight: number
    rowSpacing?: number
    columnsPadding: number
    subtotalOffset?: number
    topMargin?: number
  }
  // Description Section
  description: {
    labelColor: string
    labelSize?: number
    labelWeight?: 'normal' | 'bold'
    textColor: string
    textWeight?: 'normal' | 'bold'
    textSize: number
    lineHeight: number
    topMargin?: number
  }
  // Item Section
  item: {
    sectionTitleColor: string
    sectionTitleWeight?: 'normal' | 'bold'
    sectionTitleSize?: number
    labelColor: string
    labelWeight?: 'normal' | 'bold'
    labelSize?: number
    valueColor: string
    valueWeight?: 'normal' | 'bold'
    valueSize?: number
    itemGap: number
    itemsPerRow?: 2 | 3 | 4 | 5
    itemsSpacing: number
    labelValueGap: number
    topMargin?: number
  }
  // H-Info Section
  hInfo: {
    sectionTitleColor: string
    sectionTitleWeight?: 'normal' | 'bold'
    sectionTitleSize?: number
    labelColor: string
    labelWeight?: 'normal' | 'bold'
    labelSize?: number
    valueColor: string
    valueWeight?: 'normal' | 'bold'
    valueSize?: number
    labelWidth: number
    labelValueGap: number
    itemGap: number
    columnGap?: number
    columnsPadding: number
    topMargin?: number
  }
  // Footer Section
  footer: {
    textColor: string
    textSize: number
    textWeight?: 'normal' | 'bold'
  }
}

const props = defineProps<{
  modelValue: StyleConfig
  selectedSection?: string | null
}>()

const emit = defineEmits<{
  'update:modelValue': [StyleConfig]
  'refresh-preview': []
}>()

// Computed property to determine which panel to show
const showGlobalSettings = computed(() => {
  return !props.selectedSection || props.selectedSection === null
})

const showHeaderSettings = computed(() => {
  return props.selectedSection === 'header-section'
})

const showInfoSettings = computed(() => {
  return props.selectedSection?.startsWith('info-section')
})

const showHInfoSettings = computed(() => {
  return props.selectedSection?.startsWith('h-info-section')
})

const showTableSettings = computed(() => {
  return props.selectedSection?.startsWith('table-section-')
})

const showSummarySettings = computed(() => {
  return props.selectedSection === 'summary-section'
})

const showDescriptionSettings = computed(() => {
  return props.selectedSection?.startsWith('description-section')
})

const showItemSettings = computed(() => {
  return props.selectedSection?.startsWith('item-section')
})

// 从 selectedSection 提取索引
// 支持格式：info-section-0, table-section-1, item-section-2, h-info-section-0, description-section-1
const getSectionIndex = (sectionType: string | null | undefined): number => {
  if (!sectionType) return 0
  
  // 匹配末尾的数字，如 info-section-0, table-section-1
  const match = sectionType.match(/-(\d+)$/)
  if (match) {
    return parseInt(match[1], 10)
  }
  
  // 如果没有匹配到数字，返回 0（默认第一个）
  return 0
}

// 获取当前选中的 section 索引
const currentInfoIndex = computed(() => getSectionIndex(props.selectedSection))
const currentTableIndex = computed(() => getSectionIndex(props.selectedSection))
const currentDescriptionIndex = computed(() => getSectionIndex(props.selectedSection))
const currentItemIndex = computed(() => getSectionIndex(props.selectedSection))
const currentHInfoIndex = computed(() => getSectionIndex(props.selectedSection))

const showFooterSettings = computed(() => {
  return props.selectedSection === 'footer-section'
})

const local = reactive({
  baseFontSize: props.modelValue.baseFontSize,
  summary: {
    labelText: props.modelValue.summary?.labelText || 'Total USD',
    labelColor: props.modelValue.summary?.labelColor || '#000000',
    labelWeight: (props.modelValue.summary?.labelWeight || 'bold') as 'normal' | 'bold',
    contentColor: props.modelValue.summary?.contentColor || '#000000',
    contentWeight: (props.modelValue.summary?.contentWeight || 'bold') as 'normal' | 'bold',
    labelSize: props.modelValue.summary?.labelSize || 10,
    contentSize: props.modelValue.summary?.contentSize || 14,
    labelContentGap: props.modelValue.summary?.labelContentGap ?? 12,
    topMargin: props.modelValue.summary?.topMargin ?? 10,
  },
  header: {
    titleColor: props.modelValue.header?.titleColor || '#0e171f',
    titleSize: props.modelValue.header?.titleSize || 20,
    titleWeight: props.modelValue.header?.titleWeight || 'bold',
    descriptionColor: props.modelValue.header?.descriptionColor || '#919191',
    descriptionSize: props.modelValue.header?.descriptionSize || 7,
    descriptionWeight: props.modelValue.header?.descriptionWeight || 'normal',
    logoDescriptionColor: props.modelValue.header?.logoDescriptionColor || '#919191',
    logoDescriptionSize: props.modelValue.header?.logoDescriptionSize || 7,
    logoDescriptionWeight: props.modelValue.header?.logoDescriptionWeight || 'normal',
    verticalAlign: props.modelValue.header?.verticalAlign || 'top',
    logoHeight: props.modelValue.header?.logoHeight ?? 48,
  },
  info: {} as StyleConfig['info'],
  table: {} as StyleConfig['table'],
  description: {} as StyleConfig['description'],
  item: {} as StyleConfig['item'],
  hInfo: {} as StyleConfig['hInfo'],
  footer: {
    textColor: props.modelValue.footer?.textColor || '#000000',
    textSize: props.modelValue.footer?.textSize || 7,
    textWeight: props.modelValue.footer?.textWeight || 'normal',
  },
  footerInfo: {
    textColor: props.modelValue.footerInfo?.textColor || '#000000',
    textSize: props.modelValue.footerInfo?.textSize || 7,
    textWeight: props.modelValue.footerInfo?.textWeight || 'normal',
  },
  footerName: {
    textColor: props.modelValue.footerName?.textColor || '#000000',
    textSize: props.modelValue.footerName?.textSize || 7,
    textWeight: props.modelValue.footerName?.textWeight || 'normal',
  },
} as StyleConfig)

// 初始化：从 modelValue 同步所有已存在的样式配置
const syncStylesFromModelValue = () => {
  // 同步 info 样式
  if (props.modelValue.info) {
    Object.keys(props.modelValue.info).forEach((key) => {
      const index = Number(key)
      const style = props.modelValue.info[index]
      if (style && !local.info[index]) {
        local.info[index] = cloneStyle(style)
      }
    })
  }
  // 同步 table 样式
  if (props.modelValue.table) {
    Object.keys(props.modelValue.table).forEach((key) => {
      const index = Number(key)
      const style = props.modelValue.table[index]
      if (style && !local.table[index]) {
        local.table[index] = cloneStyle(style)
      }
    })
  }
  // 同步 description 样式
  if (props.modelValue.description) {
    Object.keys(props.modelValue.description).forEach((key) => {
      const index = Number(key)
      const style = props.modelValue.description[index]
      if (style && !local.description[index]) {
        local.description[index] = cloneStyle(style)
      }
    })
  }
  // 同步 item 样式
  if (props.modelValue.item) {
    Object.keys(props.modelValue.item).forEach((key) => {
      const index = Number(key)
      const style = props.modelValue.item[index]
      if (style && !local.item[index]) {
        local.item[index] = cloneStyle(style)
      }
    })
  }
  // 同步 hInfo 样式
  if (props.modelValue.hInfo) {
    Object.keys(props.modelValue.hInfo).forEach((key) => {
      const index = Number(key)
      const style = props.modelValue.hInfo[index]
      if (style && !local.hInfo[index]) {
        local.hInfo[index] = cloneStyle(style)
      }
    })
  }
}

// 初始化时同步
syncStylesFromModelValue()

// 监听 modelValue 变化，同步新添加的样式配置
watch(
  () => props.modelValue,
  () => {
    syncStylesFromModelValue()
  },
  { deep: true },
)

// 获取当前选中索引的样式对象（用于编辑）
const currentInfoStyle = computed({
  get: () => {
    const index = currentInfoIndex.value
    // 如果该索引的样式不存在，从 modelValue 获取或创建默认样式
    if (!local.info[index]) {
      const existing = getInfoStyle(props.modelValue, index)
      local.info[index] = existing ? cloneStyle(existing) : createDefaultInfoStyle()
    }
    return local.info[index]
  },
  set: (value) => {
    const index = currentInfoIndex.value
    local.info[index] = value
  },
})

const currentTableStyle = computed({
  get: () => {
    const index = currentTableIndex.value
    if (!local.table[index]) {
      const existing = getTableStyle(props.modelValue, index)
      local.table[index] = existing ? cloneStyle(existing) : createDefaultTableStyle()
    }
    return local.table[index]
  },
  set: (value) => {
    const index = currentTableIndex.value
    local.table[index] = value
  },
})

const currentDescriptionStyle = computed({
  get: () => {
    const index = currentDescriptionIndex.value
    if (!local.description[index]) {
      const existing = getDescriptionStyle(props.modelValue, index)
      local.description[index] = existing
        ? cloneStyle(existing)
        : createDefaultDescriptionStyle()
    }
    return local.description[index]
  },
  set: (value) => {
    const index = currentDescriptionIndex.value
    local.description[index] = value
  },
})

const currentItemStyle = computed({
  get: () => {
    const index = currentItemIndex.value
    if (!local.item[index]) {
      const existing = getItemStyle(props.modelValue, index)
      local.item[index] = existing ? cloneStyle(existing) : createDefaultItemStyle()
    }
    return local.item[index]
  },
  set: (value) => {
    const index = currentItemIndex.value
    local.item[index] = value
  },
})

const currentHInfoStyle = computed({
  get: () => {
    const index = currentHInfoIndex.value
    if (!local.hInfo[index]) {
      const existing = getHInfoStyle(props.modelValue, index)
      local.hInfo[index] = existing ? cloneStyle(existing) : createDefaultHInfoStyle()
    }
    return local.hInfo[index]
  },
  set: (value) => {
    const index = currentHInfoIndex.value
    local.hInfo[index] = value
  },
})

watch(
  local,
  () => {
    emit('update:modelValue', { ...local } as StyleConfig)
  },
  { deep: true },
)

const refreshPreview = () => {
  emit('refresh-preview')
}
</script>
