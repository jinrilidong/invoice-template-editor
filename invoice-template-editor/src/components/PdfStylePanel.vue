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
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Gap (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.sectionGap"
              min="0"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Same Type Section Gap (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.sameTypeSectionGap"
              min="0"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Summary Gap (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.summaryGap"
              min="0"
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
              <option value="semibold">Semibold</option>
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
              <option value="semibold">Semibold</option>
              <option value="bold">Bold</option>
            </select>
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
                  <option value="semibold">Semibold</option>
                  <option value="bold">Bold</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Info Section -->
      <section v-if="showInfoSettings">
        <h3 class="text-sm font-semibold text-[#0e171f] mb-3">Info Section</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="local.info.sectionTitleColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.info.sectionTitleColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.info.sectionTitleSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.info.sectionTitleWeight"
            >
              <option value="normal">Normal</option>
              <option value="semibold">Semibold</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="local.info.labelColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.info.labelColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.info.labelSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.info.labelWeight"
            >
              <option value="normal">Normal</option>
              <option value="semibold">Semibold</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Value Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="local.info.valueColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.info.valueColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Value Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.info.valueSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Value Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.info.valueWeight"
            >
              <option value="normal">Normal</option>
              <option value="semibold">Semibold</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Item Gap (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.info.itemGap"
              min="0"
              max="16"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Items Per Row</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.info.itemsPerRow"
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
              v-model.number="local.info.itemsSpacing"
              min="0"
              max="16"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label-Value Gap (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.info.labelValueGap"
              min="0"
              max="16"
            />
          </div>
        </div>
      </section>

      <!-- Table Section -->
      <section v-if="showTableSettings">
        <h3 class="text-sm font-semibold text-[#0e171f] mb-3">Table Section</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="local.table.sectionTitleColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.table.sectionTitleColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.table.sectionTitleSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.table.sectionTitleWeight"
            >
              <option value="normal">Normal</option>
              <option value="semibold">Semibold</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Subsection Title Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="local.table.subsectionTitleColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.table.subsectionTitleColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Subsection Title Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.table.subsectionTitleSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Subsection Title Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.table.subsectionTitleWeight"
            >
              <option value="normal">Normal</option>
              <option value="semibold">Semibold</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Header Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="local.table.headerColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.table.headerColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Column Name Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.table.columnNameWeight"
            >
              <option value="normal">Normal</option>
              <option value="semibold">Semibold</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Column Name Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.table.columnNameSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Row Text Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="local.table.rowTextColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.table.rowTextColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Row Text Size (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.table.rowTextSize"
              min="6"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Border Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="local.table.borderColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.table.borderColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Row Height (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.table.rowHeight"
              min="8"
              max="24"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Columns Padding (px)</label>
            <input
              type="number"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model.number="local.table.columnsPadding"
              min="0"
              max="16"
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
              <option value="semibold">Semibold</option>
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
              <option value="semibold">Semibold</option>
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
        </div>
      </section>

      <!-- Description Section -->
      <section v-if="showDescriptionSettings">
        <h3 class="text-sm font-semibold text-[#0e171f] mb-3">Description Section</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="local.description.labelColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.description.labelColor"
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
              v-model="local.description.labelWeight"
            >
              <option value="normal">Normal</option>
              <option value="semibold">Semibold</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Text Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="local.description.textColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.description.textColor"
            />
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Text Weight</label>
            <select
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.description.textWeight"
            >
              <option value="normal">Normal</option>
              <option value="semibold">Semibold</option>
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
        </div>
      </section>

      <!-- Item Section -->
      <section v-if="showItemSettings">
        <h3 class="text-sm font-semibold text-[#0e171f] mb-3">Item Section</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="local.item.sectionTitleColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.item.sectionTitleColor"
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
              v-model="local.item.sectionTitleWeight"
            >
              <option value="normal">Normal</option>
              <option value="semibold">Semibold</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="local.item.labelColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.item.labelColor"
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
              v-model="local.item.labelWeight"
            >
              <option value="normal">Normal</option>
              <option value="semibold">Semibold</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Value Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="local.item.valueColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.item.valueColor"
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
              v-model="local.item.valueWeight"
            >
              <option value="normal">Normal</option>
              <option value="semibold">Semibold</option>
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
        </div>
      </section>

      <!-- H-Info Section -->
      <section v-if="showHInfoSettings">
        <h3 class="text-sm font-semibold text-[#0e171f] mb-3">H-Info Section</h3>
        <div class="space-y-3">
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Section Title Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="local.hInfo.sectionTitleColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.hInfo.sectionTitleColor"
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
              v-model="local.hInfo.sectionTitleWeight"
            >
              <option value="normal">Normal</option>
              <option value="semibold">Semibold</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Label Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="local.hInfo.labelColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.hInfo.labelColor"
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
              v-model="local.hInfo.labelWeight"
            >
              <option value="normal">Normal</option>
              <option value="semibold">Semibold</option>
              <option value="bold">Bold</option>
            </select>
          </div>
          <div class="flex items-center gap-3">
            <label class="w-32 text-sm text-[#0e171f]">Value Color</label>
            <input
              type="color"
              class="h-8 w-12 border border-[#d3ddde] rounded"
              v-model="local.hInfo.valueColor"
            />
            <input
              type="text"
              class="flex-1 border border-[#d3ddde] rounded px-2 py-1 text-sm"
              v-model="local.hInfo.valueColor"
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
              v-model="local.hInfo.valueWeight"
            >
              <option value="normal">Normal</option>
              <option value="semibold">Semibold</option>
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
                  <option value="semibold">Semibold</option>
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
                  <option value="semibold">Semibold</option>
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

interface SectionStyle {
  // Summary Section
  summary: {
    labelText?: string
    labelColor: string
    labelWeight?: 'normal' | 'semibold' | 'bold'
    contentColor: string
    contentWeight?: 'normal' | 'semibold' | 'bold'
    labelSize: number
    contentSize: number
    labelContentGap: number
  }
  // Header Section
  header: {
    titleColor: string
    titleSize: number
    titleWeight?: 'normal' | 'semibold' | 'bold'
    descriptionColor: string
    descriptionSize: number
    descriptionWeight?: 'normal' | 'semibold' | 'bold'
    verticalAlign?: 'top' | 'middle' | 'bottom'
    // Logo description below the logo
    logoDescriptionColor?: string
    logoDescriptionSize?: number
    logoDescriptionWeight?: 'normal' | 'semibold' | 'bold'
  }
  // Info Section
  info: {
    sectionTitleColor: string
    sectionTitleWeight?: 'normal' | 'semibold' | 'bold'
    sectionTitleSize?: number
    labelColor: string
    labelWeight?: 'normal' | 'semibold' | 'bold'
    labelSize?: number
    valueColor: string
    valueWeight?: 'normal' | 'semibold' | 'bold'
    valueSize?: number
    itemGap: number
    itemsPerRow?: 2 | 3 | 4 | 5
    itemsSpacing: number
    labelValueGap: number
  }
  // Table Section
  table: {
    sectionTitleColor: string
    sectionTitleWeight?: 'normal' | 'semibold' | 'bold'
    sectionTitleSize?: number
    subsectionTitleColor: string
    subsectionTitleWeight?: 'normal' | 'semibold' | 'bold'
    subsectionTitleSize?: number
    headerColor: string
    columnNameWeight?: 'normal' | 'semibold' | 'bold'
    columnNameSize?: number
    rowTextColor: string
    rowTextSize?: number
    borderColor: string
    rowHeight: number
    columnsPadding: number
  }
  // Description Section
  description: {
    labelColor: string
    labelSize?: number
    labelWeight?: 'normal' | 'semibold' | 'bold'
    textColor: string
    textWeight?: 'normal' | 'semibold' | 'bold'
    textSize: number
    lineHeight: number
  }
  // Item Section
  item: {
    sectionTitleColor: string
    sectionTitleWeight?: 'normal' | 'semibold' | 'bold'
    sectionTitleSize?: number
    labelColor: string
    labelWeight?: 'normal' | 'semibold' | 'bold'
    labelSize?: number
    valueColor: string
    valueWeight?: 'normal' | 'semibold' | 'bold'
    valueSize?: number
    itemGap: number
    itemsPerRow?: 2 | 3 | 4 | 5
    itemsSpacing: number
    labelValueGap: number
  }
  // H-Info Section
  hInfo: {
    sectionTitleColor: string
    sectionTitleWeight?: 'normal' | 'semibold' | 'bold'
    sectionTitleSize?: number
    labelColor: string
    labelWeight?: 'normal' | 'semibold' | 'bold'
    labelSize?: number
    valueColor: string
    valueWeight?: 'normal' | 'semibold' | 'bold'
    valueSize?: number
    labelWidth: number
    labelValueGap: number
    itemGap: number
    columnGap?: number
    columnsPadding: number
  }
  // Footer Section
  footer: {
    textColor: string
    textSize: number
    textWeight?: 'normal' | 'semibold' | 'bold'
  }
}

interface StyleConfig extends SectionStyle {
  baseFontSize: number
  sectionGap: number
  sameTypeSectionGap: number
  summaryGap: number
  footerInfo: {
    textColor: string
    textSize: number
    textWeight?: 'normal' | 'semibold' | 'bold'
  }
  footerName: {
    textColor: string
    textSize: number
    textWeight?: 'normal' | 'semibold' | 'bold'
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
  return props.selectedSection === 'info-section'
})

const showHInfoSettings = computed(() => {
  return props.selectedSection === 'h-info-section'
})

const showTableSettings = computed(() => {
  return props.selectedSection?.startsWith('table-section-')
})

const showSummarySettings = computed(() => {
  return props.selectedSection === 'summary-section'
})

const showDescriptionSettings = computed(() => {
  return props.selectedSection === 'description-section'
})

const showItemSettings = computed(() => {
  return props.selectedSection === 'item-section'
})

const showFooterSettings = computed(() => {
  return props.selectedSection === 'footer-section'
})

const local = reactive<StyleConfig>({
  baseFontSize: props.modelValue.baseFontSize,
  sectionGap: props.modelValue.sectionGap,
  sameTypeSectionGap: props.modelValue.sameTypeSectionGap,
  summaryGap: props.modelValue.summaryGap,
  summary: {
    labelText: props.modelValue.summary?.labelText || 'Total USD',
    labelColor: props.modelValue.summary?.labelColor || '#000000',
    labelWeight: props.modelValue.summary?.labelWeight || 'semibold',
    contentColor: props.modelValue.summary?.contentColor || '#000000',
    contentWeight: props.modelValue.summary?.contentWeight || 'semibold',
    labelSize: props.modelValue.summary?.labelSize || 10,
    contentSize: props.modelValue.summary?.contentSize || 14,
    labelContentGap: props.modelValue.summary?.labelContentGap ?? 12,
  },
  header: {
    titleColor: props.modelValue.header?.titleColor || '#0e171f',
    titleSize: props.modelValue.header?.titleSize || 20,
    titleWeight: props.modelValue.header?.titleWeight || 'semibold',
    descriptionColor: props.modelValue.header?.descriptionColor || '#919191',
    descriptionSize: props.modelValue.header?.descriptionSize || 7,
    descriptionWeight: props.modelValue.header?.descriptionWeight || 'normal',
    logoDescriptionColor: props.modelValue.header?.logoDescriptionColor || '#919191',
    logoDescriptionSize: props.modelValue.header?.logoDescriptionSize || 7,
    logoDescriptionWeight: props.modelValue.header?.logoDescriptionWeight || 'normal',
    verticalAlign: props.modelValue.header?.verticalAlign || 'top',
  },
  info: {
    sectionTitleColor: props.modelValue.info?.sectionTitleColor || '#6b7280',
    sectionTitleWeight: props.modelValue.info?.sectionTitleWeight || 'semibold',
    sectionTitleSize: props.modelValue.info?.sectionTitleSize || 7,
    labelColor: props.modelValue.info?.labelColor || '#000000',
    labelWeight: props.modelValue.info?.labelWeight || 'semibold',
    labelSize: props.modelValue.info?.labelSize || 7,
    valueColor: props.modelValue.info?.valueColor || '#919191',
    valueWeight: props.modelValue.info?.valueWeight || 'normal',
    valueSize: props.modelValue.info?.valueSize || 7,
    itemGap: props.modelValue.info?.itemGap ?? 2,
    itemsPerRow: props.modelValue.info?.itemsPerRow || 5,
    itemsSpacing: props.modelValue.info?.itemsSpacing ?? 4,
    labelValueGap: props.modelValue.info?.labelValueGap ?? 2,
  },
  table: {
    sectionTitleColor: props.modelValue.table?.sectionTitleColor || '#6b7280',
    sectionTitleSize: props.modelValue.table?.sectionTitleSize || 7,
    subsectionTitleColor: props.modelValue.table?.subsectionTitleColor || '#000000',
    subsectionTitleSize: props.modelValue.table?.subsectionTitleSize || 7,
    headerColor: props.modelValue.table?.headerColor || '#919191',
    columnNameWeight: props.modelValue.table?.columnNameWeight || 'semibold',
    columnNameSize: props.modelValue.table?.columnNameSize || 7,
    rowTextColor: props.modelValue.table?.rowTextColor || '#000000',
    rowTextSize: props.modelValue.table?.rowTextSize || 7,
    borderColor: props.modelValue.table?.borderColor || '#d2d2d2',
    rowHeight: props.modelValue.table?.rowHeight || 13,
    columnsPadding: props.modelValue.table?.columnsPadding ?? 4,
  },
  description: {
    labelColor: props.modelValue.description?.labelColor || '#000000',
    labelSize: props.modelValue.description?.labelSize || 7,
    labelWeight: props.modelValue.description?.labelWeight || 'semibold',
    textColor: props.modelValue.description?.textColor || '#919191',
    textWeight: props.modelValue.description?.textWeight || 'normal',
    textSize: props.modelValue.description?.textSize || 7,
    lineHeight: props.modelValue.description?.lineHeight || 1.2,
  },
  item: {
    sectionTitleColor: props.modelValue.item?.sectionTitleColor || '#6b7280',
    sectionTitleWeight: props.modelValue.item?.sectionTitleWeight || 'semibold',
    sectionTitleSize: props.modelValue.item?.sectionTitleSize || 7,
    labelColor: props.modelValue.item?.labelColor || '#000000',
    labelWeight: props.modelValue.item?.labelWeight || 'semibold',
    labelSize: props.modelValue.item?.labelSize || 7,
    valueColor: props.modelValue.item?.valueColor || '#919191',
    valueWeight: props.modelValue.item?.valueWeight || 'normal',
    valueSize: props.modelValue.item?.valueSize || 7,
    itemGap: props.modelValue.item?.itemGap ?? 2,
    itemsPerRow: props.modelValue.item?.itemsPerRow || 5,
    itemsSpacing: props.modelValue.item?.itemsSpacing ?? 4,
    labelValueGap: props.modelValue.item?.labelValueGap ?? 2,
  },
  hInfo: {
    sectionTitleColor: props.modelValue.hInfo?.sectionTitleColor || '#6b7280',
    sectionTitleWeight: props.modelValue.hInfo?.sectionTitleWeight || 'semibold',
    sectionTitleSize: props.modelValue.hInfo?.sectionTitleSize || 7,
    labelColor: props.modelValue.hInfo?.labelColor || '#000000',
    labelWeight: props.modelValue.hInfo?.labelWeight || 'semibold',
    labelSize: props.modelValue.hInfo?.labelSize || 7,
    valueColor: props.modelValue.hInfo?.valueColor || '#919191',
    valueWeight: props.modelValue.hInfo?.valueWeight || 'normal',
    valueSize: props.modelValue.hInfo?.valueSize || 7,
    labelWidth: props.modelValue.hInfo?.labelWidth ?? 80,
    labelValueGap: props.modelValue.hInfo?.labelValueGap ?? 8,
    itemGap: props.modelValue.hInfo?.itemGap ?? 4,
    columnGap: props.modelValue.hInfo?.columnGap ?? 8,
    columnsPadding: props.modelValue.hInfo?.columnsPadding ?? 8,
  },
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
})

watch(
  local,
  () => {
    emit('update:modelValue', { ...local })
  },
  { deep: true },
)

const refreshPreview = () => {
  emit('refresh-preview')
}
</script>
