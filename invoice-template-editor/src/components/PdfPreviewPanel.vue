<template>
  <div class="h-full bg-white rounded-xl shadow-lg border border-[#d3ddde] flex flex-col">
    <!-- Preview Header -->
    <div class="bg-gray-100 border-b border-[#d3ddde] flex-shrink-0 p-2 min-h-[3rem] w-full">
      <div class="flex items-center justify-between w-full">
        <h2 class="text-lg font-semibold text-primary">PDF Template Preview</h2>
        <div class="flex items-center gap-2">
          <!-- Zoom Controls -->
          <div class="flex items-center gap-2">
            <IconButton @click="zoomOut" title="Zoom Out">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 12H4"
                ></path>
              </svg>
            </IconButton>
            <span class="text-sm text-primary min-w-[3rem] text-center"
              >{{ Math.round(zoomLevel * 100) }}%</span
            >
            <IconButton @click="zoomIn" title="Zoom In">
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                ></path>
              </svg>
            </IconButton>
          </div>
          <div class="h-6 w-px bg-primary/20"></div>
          <TextButton @click="fitToWidth"> Fit to Width </TextButton>
          <div class="h-6 w-px bg-primary/20"></div>
          <div class="text-sm text-primary/90">U.S. Letter (612×792)</div>
        </div>
      </div>
    </div>

    <!-- PDF Preview Content - Fixed height, internal scroll -->
    <div ref="containerRef" class="flex-1 overflow-y-auto overflow-x-hidden bg-white">
      <div v-if="!props.exportMode" class="w-full flex justify-center" style="padding-top: 20px">
        <!-- Single PDF Page -->
        <div
          class="pdf-pages-container"
          :style="{ transform: `scale(${zoomLevel})`, transformOrigin: 'top center' }"
        >
          <!-- PDF Page -->
          <div
            class="pdf-container shadow-xl border border-[#d3ddde] rounded-lg"
            :style="{
              width: '612px',
              height: '792px',
              marginBottom: `${(zoomLevel - 1) * 792}px`,
              padding: '20px',
            }"
          >
            <!-- PDF Content -->
            <div
              class="pdf-content flex flex-col items-start"
              style="
                width: 572px;
                height: 723px;
                margin: 0;
                gap: 10px;
                box-sizing: content-box;
                position: relative;
              "
            >
              <!-- 1️⃣ Header Section -->
              <div
                v-if="props.sectionStates.header"
                class="header-section flex items-center justify-between w-full cursor-pointer transition-all duration-200"
                :class="getSectionHighlightClass('header-section')"
                @mouseenter="handleSectionHover('header-section')"
                @mouseleave="handleSectionLeave"
                @click="handleSectionClick('header-section')"
              >
                <div class="flex flex-col gap-px items-start justify-center">
                  <h1 class="font-semibold text-black leading-6" style="font-size: 20px">
                    {{ props.templateData.header?.title || 'Title' }}
                  </h1>
                  <p
                    v-if="props.templateData.header?.description"
                    class="font-normal leading-2.25"
                    style="font-size: 7px"
                  >
                    {{ props.templateData.header.description }}
                  </p>
                </div>
                <div
                  class="logo-container w-60 overflow-hidden relative flex items-center justify-end"
                  :style="{
                    height: (props.templateData.header?.logoSize === 'large' ? 72 : 48) + 'px',
                  }"
                >
                  <img
                    v-if="props.templateData.header?.logo"
                    :src="props.templateData.header.logo"
                    alt="Logo"
                    class="h-full w-full object-contain object-right"
                  />
                  <div
                    v-else
                    class="border border-black border-dashed w-60 flex items-center justify-center"
                    :style="{
                      height: (props.templateData.header?.logoSize === 'large' ? 72 : 48) + 'px',
                    }"
                  >
                    <span class="text-gray-400" style="font-size: 10px">Logo Placeholder</span>
                  </div>
                </div>
              </div>

              <!-- 2️⃣ Info Sections -->
              <div
                v-if="props.sectionStates.info"
                class="info-sections flex flex-col gap-4 items-start w-full cursor-pointer transition-all duration-200"
                :class="getSectionHighlightClass('info-section')"
                @mouseenter="handleSectionHover('info-section')"
                @mouseleave="handleSectionLeave"
                @click="handleSectionClick('info-section')"
              >
                <div
                  v-for="(infoSection, infoIndex) in (props.templateData.info as any[]) || []"
                  :key="infoSection.id"
                  class="info-section flex flex-col gap-0.5 items-start w-full cursor-pointer transition-all duration-200"
                  :class="getSectionHighlightClass(`info-section-${infoIndex}`)"
                  @mouseenter="handleSectionHover(`info-section-${infoIndex}`)"
                  @mouseleave="handleSectionLeave"
                  @click="handleSectionClick(`info-section-${infoIndex}`)"
                >
                  <p v-if="infoSection.sectionTitle" class="info-section-title">
                    {{ infoSection.sectionTitle }}
                  </p>
                  <div class="info-items-container">
                    <div
                      v-for="item in infoSection.items || []"
                      :key="item.id"
                      class="info-item cursor-pointer transition-all duration-200"
                      :class="getItemHighlightClass(`info-section-${infoIndex}`, item.id)"
                      @mouseenter="handleItemHover(`info-section-${infoIndex}`, item.id)"
                      @mouseleave="handleItemLeave"
                      @click.stop="handleItemClick(`info-section-${infoIndex}`, item.id)"
                    >
                      <p class="info-item-label">{{ item.label }}</p>
                      <p class="info-item-value">{{ item.value }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 3️⃣ Table Sections -->
              <div
                v-if="props.sectionStates.table"
                class="table-sections flex flex-col gap-4 items-start w-full cursor-pointer transition-all duration-200"
                :class="getSectionHighlightClass('table-section')"
                @mouseenter="handleSectionHover('table-section')"
                @mouseleave="handleSectionLeave"
                @click="handleSectionClick('table-section')"
              >
                <div
                  v-for="(table, tableIndex) in props.templateData.tables || []"
                  :key="table.id"
                  v-show="
                    console.log(
                      'Table data check:',
                      table,
                      'Index:',
                      tableIndex,
                      'Tables array:',
                      props.templateData.tables,
                    )
                  "
                  class="table-section flex flex-col gap-0.5 items-start w-full cursor-pointer transition-all duration-200"
                  :class="getSectionHighlightClass(`table-section-${tableIndex}`)"
                  @mouseenter="handleSectionHover(`table-section-${tableIndex}`)"
                  @mouseleave="handleSectionLeave"
                  @click="
                    handleSectionClick(`table-section-${tableIndex}`)
                    console.log('PDF Preview: Table section clicked:', tableIndex)
                  "
                >
                  <!-- Section Title -->
                  <div
                    v-if="table.sectionTitle"
                    class="flex gap-1 h-2.25 items-start w-full cursor-pointer transition-all duration-200"
                    :class="getItemHighlightClass(`table-section-${tableIndex}`, 'section-title')"
                    @mouseenter="handleItemHover(`table-section-${tableIndex}`, 'section-title')"
                    @mouseleave="handleItemLeave"
                    @click.stop="
                      handleItemClick(`table-section-${tableIndex}`, 'section-title')
                      console.log('PDF Preview: Section title clicked:', tableIndex)
                    "
                  >
                    <div class="flex grow items-start min-w-0">
                      <p class="font-semibold leading-2.25" style="font-size: 7px; color: #6b7280">
                        {{ table.sectionTitle }}
                      </p>
                    </div>
                  </div>

                  <!-- Subsection Title -->
                  <div
                    v-if="table.subsectionTitle"
                    class="flex gap-1 h-2.25 items-start w-full cursor-pointer transition-all duration-200"
                    :class="
                      getItemHighlightClass(`table-section-${tableIndex}`, 'subsection-title')
                    "
                    @mouseenter="handleItemHover(`table-section-${tableIndex}`, 'subsection-title')"
                    @mouseleave="handleItemLeave"
                    @click.stop="handleItemClick(`table-section-${tableIndex}`, 'subsection-title')"
                  >
                    <div class="flex grow items-start min-w-0">
                      <p class="font-semibold leading-2.25 text-black" style="font-size: 7px">
                        {{ table.subsectionTitle }}
                      </p>
                    </div>
                  </div>

                  <!-- Table -->
                  <div class="flex flex-col w-full">
                    <!-- Table Header -->
                    <div class="flex items-start w-full">
                      <div
                        v-for="(column, columnIndex) in table.columns || []"
                        :key="column.id"
                        class="flex flex-col items-start min-w-0 overflow-hidden"
                        :style="{ width: getTableColWidthStyle(table, column) }"
                      >
                        <!-- Header -->
                        <div
                          class="w-full h-3.25 cursor-pointer transition-all duration-200"
                          :class="
                            getItemHighlightClass(
                              `table-section-${tableIndex}`,
                              `column-header-${column.id}`,
                            )
                          "
                          @mouseenter="
                            handleItemHover(
                              `table-section-${tableIndex}`,
                              `column-header-${column.id}`,
                            )
                          "
                          @mouseleave="handleItemLeave"
                          @click.stop="
                            handleItemClick(
                              `table-section-${tableIndex}`,
                              `column-header-${column.id}`,
                            )
                          "
                        >
                          <div
                            class="py-0.5 w-full"
                            :class="{
                              'pl-0 pr-2': columnIndex === 0,
                              'pl-2 pr-0': columnIndex === (table.columns?.length || 1) - 1,
                              'px-2':
                                columnIndex > 0 && columnIndex < (table.columns?.length || 1) - 1,
                            }"
                          >
                            <p
                              class="font-medium leading-2.25"
                              :class="{ 'text-right': column.alignment === 'right' }"
                              style="font-size: 7px; color: #919191; text-align: left"
                            >
                              {{ column.name || 'Column Name' }}
                            </p>
                          </div>
                          <!-- Column Name Bottom Border -->
                          <div class="border-b border-color-d2d2d2 w-full"></div>
                        </div>
                      </div>
                    </div>

                    <!-- Table Body -->
                    <div class="flex flex-col w-full">
                      <div
                        v-for="(row, rowIndex) in getTableRows(table)"
                        :key="row.id"
                        class="flex items-stretch w-full cursor-pointer transition-all duration-200 min-h-[13px]"
                        :class="
                          getItemHighlightClass(`table-section-${tableIndex}`, `row-${rowIndex}`)
                        "
                        :title="`Row ${rowIndex + 1} of ${getTableRows(table).length}`"
                        @mouseenter="
                          handleItemHover(`table-section-${tableIndex}`, `row-${rowIndex}`)
                        "
                        @mouseleave="handleItemLeave"
                        @click.stop="
                          handleItemClick(`table-section-${tableIndex}`, `row-${rowIndex}`)
                        "
                      >
                        <div
                          v-for="(column, columnIndex) in table.columns || []"
                          :key="column.id"
                          class="flex items-start min-w-0 overflow-hidden"
                          :style="{ width: getTableColWidthStyle(table, column) }"
                        >
                          <div
                            class="flex items-start overflow-hidden py-0.5 w-full cursor-pointer transition-all duration-200 min-h-[13px]"
                            :class="
                              getItemHighlightClass(
                                `table-section-${tableIndex}`,
                                `column-value-${column.id}`,
                              )
                            "
                            @mouseenter="
                              handleItemHover(
                                `table-section-${tableIndex}`,
                                `column-value-${column.id}`,
                              )
                            "
                            @mouseleave="handleItemLeave"
                            @click.stop="
                              handleItemClick(
                                `table-section-${tableIndex}`,
                                `column-value-${column.id}`,
                              )
                            "
                          >
                            <div
                              class="flex items-start overflow-hidden w-full"
                              :class="{
                                'pl-0 pr-2': columnIndex === 0,
                                'pl-2 pr-0': columnIndex === (table.columns?.length || 1) - 1,
                                'px-2':
                                  columnIndex > 0 && columnIndex < (table.columns?.length || 1) - 1,
                              }"
                            >
                              <p
                                class="font-normal leading-2.25 text-black w-full"
                                :class="{ 'text-right': column.alignment === 'right' }"
                                style="font-size: 7px; word-wrap: break-word; white-space: normal"
                              >
                                {{ row.data[column.id] || '' }}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Table Bottom Border -->
                    <div class="border-b border-color-d2d2d2 w-full"></div>

                    <!-- Subtotal Row (Single) -->
                    <div
                      v-if="
                        (table as any).showSubtotal !== false &&
                        table.total !== null &&
                        table.total !== undefined
                      "
                      class="flex items-start w-full"
                    >
                      <div
                        v-for="(column, columnIndex) in table.columns || []"
                        :key="column.id"
                        class="flex flex-col items-start min-w-0 overflow-hidden"
                        :style="{ width: getTableColWidthStyle(table, column) }"
                      >
                        <div class="flex flex-col items-start justify-center w-full h-3.25">
                          <div class="flex items-center w-full h-full">
                            <div
                              v-if="columnIndex === (table.columns?.length || 0) - 1"
                              class="flex items-center justify-end w-full h-full"
                              :class="{
                                'pl-0 pr-0': columnIndex === (table.columns?.length || 1) - 1,
                                'px-2': columnIndex < (table.columns?.length || 1) - 1,
                              }"
                            >
                              <div class="text-right whitespace-nowrap">
                                <span class="font-medium" style="font-size: 7px; color: #919191"
                                  >Subtotal
                                </span>
                                <span class="font-semibold text-black" style="font-size: 7px"
                                  >${{ (table.total || 0).toFixed(2) }}</span
                                >
                              </div>
                            </div>
                            <div
                              v-else
                              class="w-full h-full"
                              :class="{
                                'pl-0 pr-2': columnIndex === 0,
                                'pl-2 pr-0': columnIndex === (table.columns?.length || 1) - 1,
                                'px-2':
                                  columnIndex > 0 && columnIndex < (table.columns?.length || 1) - 1,
                              }"
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 3️⃣ Summary Section -->
              <div
                v-if="props.sectionStates.summary"
                class="summary-section flex gap-3 h-4.25 items-end justify-end w-full"
              >
                <div class="flex gap-3 grow items-end min-w-0">
                  <div
                    class="flex gap-2.5 grow items-center justify-center min-w-0 overflow-hidden pb-px pt-0 px-0"
                  >
                    <p
                      class="font-semibold grow leading-2.25 min-w-0 text-right whitespace-nowrap"
                      style="font-size: 10px; color: #919191"
                    >
                      {{ props.templateData.summary?.labelText || 'Total USD' }}
                    </p>
                  </div>
                  <p
                    class="font-semibold leading-4.25 text-black text-right whitespace-pre"
                    style="font-size: 14px"
                  >
                    ${{ (props.templateData.summary?.amount || 0).toFixed(2) }}
                  </p>
                </div>
              </div>

              <!-- 4️⃣ Description Sections -->
              <div
                v-if="props.sectionStates.description"
                class="description-sections flex flex-col gap-4 items-start w-full cursor-pointer transition-all duration-200"
                :class="getSectionHighlightClass('description-section')"
                @mouseenter="handleSectionHover('description-section')"
                @mouseleave="handleSectionLeave"
                @click="handleSectionClick('description-section')"
              >
                <div
                  v-for="(descriptionSection, descIndex) in (props.templateData
                    .description as any[]) || []"
                  :key="descriptionSection.id"
                  class="description-section flex flex-col gap-0.5 items-start w-full cursor-pointer transition-all duration-200"
                  :class="getSectionHighlightClass(`description-section-${descIndex}`)"
                  @mouseenter="handleSectionHover(`description-section-${descIndex}`)"
                  @mouseleave="handleSectionLeave"
                  @click="handleSectionClick(`description-section-${descIndex}`)"
                >
                  <div class="description-content">
                    <p v-if="descriptionSection.sectionTitle" class="description-label">
                      {{ descriptionSection.sectionTitle }}
                    </p>
                    <p class="description-text">
                      {{
                        descriptionSection.content ||
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                      }}
                    </p>
                  </div>
                </div>
              </div>

              <!-- 5️⃣ Item Sections -->
              <div
                v-if="props.sectionStates.item"
                class="item-sections flex flex-col gap-4 items-start w-full cursor-pointer transition-all duration-200"
                :class="getSectionHighlightClass('item-section')"
                @mouseenter="handleSectionHover('item-section')"
                @mouseleave="handleSectionLeave"
                @click="handleSectionClick('item-section')"
              >
                <div
                  v-for="(itemSection, itemIndex) in (props.templateData.item as any[]) || []"
                  :key="itemSection.id"
                  class="item-section flex flex-col gap-0.5 items-start w-full cursor-pointer transition-all duration-200"
                  :class="getSectionHighlightClass(`item-section-${itemIndex}`)"
                  @mouseenter="handleSectionHover(`item-section-${itemIndex}`)"
                  @mouseleave="handleSectionLeave"
                  @click="handleSectionClick(`item-section-${itemIndex}`)"
                >
                  <p v-if="itemSection.sectionTitle" class="item-section-title">
                    {{ itemSection.sectionTitle }}
                  </p>
                  <div class="item-items-container">
                    <div
                      v-for="item in itemSection.items || []"
                      :key="item.id"
                      class="item-item cursor-pointer transition-all duration-200"
                      :class="getItemHighlightClass(`item-section-${itemIndex}`, item.id)"
                      @mouseenter="handleItemHover(`item-section-${itemIndex}`, item.id)"
                      @mouseleave="handleItemLeave"
                      @click.stop="handleItemClick(`item-section-${itemIndex}`, item.id)"
                    >
                      <p class="item-item-label">{{ item.label }}</p>
                      <p class="item-item-value">{{ item.value }}</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- 6️⃣ H-Info Sections -->
              <div
                v-if="props.sectionStates.hInfo"
                class="h-info-sections flex flex-col gap-4 items-start w-full cursor-pointer transition-all duration-200"
                :class="getSectionHighlightClass('h-info-section')"
                @mouseenter="handleSectionHover('h-info-section')"
                @mouseleave="handleSectionLeave"
                @click="handleSectionClick('h-info-section')"
              >
                <div
                  v-for="(hInfoSection, hInfoIndex) in (props.templateData.hInfo as any[]) || []"
                  :key="hInfoSection.id"
                  class="h-info-section flex flex-col gap-0.5 items-start w-full cursor-pointer transition-all duration-200"
                  :class="getSectionHighlightClass(`h-info-section-${hInfoIndex}`)"
                  @mouseenter="handleSectionHover(`h-info-section-${hInfoIndex}`)"
                  @mouseleave="handleSectionLeave"
                  @click="handleSectionClick(`h-info-section-${hInfoIndex}`)"
                >
                  <p v-if="hInfoSection.sectionTitle" class="h-info-section-title">
                    {{ hInfoSection.sectionTitle }}
                  </p>
                  <div class="h-info-columns-container" :style="getColumnContainerStyle()">
                    <div
                      v-for="column in hInfoSection.columns || []"
                      :key="column.id"
                      class="h-info-column"
                      :style="getColumnStyle(hInfoSection) as any"
                    >
                      <div
                        v-for="item in column.items || []"
                        :key="item.id"
                        class="h-info-item cursor-pointer transition-all duration-200"
                        :class="getItemHighlightClass(`h-info-section-${hInfoIndex}`, item.id)"
                        @mouseenter="handleItemHover(`h-info-section-${hInfoIndex}`, item.id)"
                        @mouseleave="handleItemLeave"
                        @click.stop="handleItemClick(`h-info-section-${hInfoIndex}`, item.id)"
                      >
                        <div class="h-info-item-content">
                          <span class="h-info-item-label">{{ item.label }}</span>
                          <span class="h-info-item-value">{{ item.value }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 7️⃣ Footer - Outside content area -->
            <div
              v-if="props.sectionStates.footer"
              class="footer-section flex h-2.25 items-start justify-between w-full cursor-pointer transition-all duration-200"
              :class="getSectionHighlightClass('footer-section')"
              @mouseenter="handleSectionHover('footer-section')"
              @mouseleave="handleSectionLeave"
              @click="handleSectionClick('footer-section')"
              style="width: 572px; margin: 0"
            >
              <div v-if="props.templateData.footer?.info" class="flex-1 text-left">
                <p class="font-normal leading-2.25 text-black" style="font-size: 7px">
                  {{ props.templateData.footer.info }}
                </p>
              </div>
              <div v-if="props.templateData.footer?.name" class="flex-1 text-center">
                <p class="font-normal leading-2.25 text-black" style="font-size: 7px">
                  {{ props.templateData.footer.name }}
                </p>
              </div>
              <div class="flex-1 text-right">
                <p class="font-normal leading-2.25 text-black" style="font-size: 7px">
                  Page: 1 of 1
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Export Mode: simple block layout for OpenHTMLtoPDF -->
      <div v-else class="w-full" style="padding: 16px 0">
        <div ref="exportContainerRef" :style="{ width: '572px', margin: '0 auto' }">
          <!-- Header -->
          <div
            v-if="props.sectionStates.header"
            :class="getSectionHighlightClass('header-section')"
            @mouseenter="handleSectionHover('header-section')"
            @mouseleave="handleSectionLeave"
            @click="handleSectionClick('header-section')"
            style="margin-bottom: 8px"
          >
            <h1 style="font-size: 20px; font-weight: 600; margin: 0">
              {{ props.templateData.header?.title || 'Title' }}
            </h1>
            <p
              v-if="props.templateData.header?.description"
              style="font-size: 7px; line-height: 9px; margin: 0"
            >
              {{ props.templateData.header.description }}
            </p>
          </div>

          <!-- Info -->
          <div v-if="props.sectionStates.info">
            <div
              v-for="(infoSection, infoIndex) in (props.templateData.info as any[]) || []"
              :key="infoSection.id"
              :class="getSectionHighlightClass('info-section-' + infoIndex)"
              @mouseenter="handleSectionHover('info-section-' + infoIndex)"
              @mouseleave="handleSectionLeave"
              @click="handleSectionClick('info-section-' + infoIndex)"
              style="margin-bottom: 8px"
            >
              <p
                v-if="infoSection.sectionTitle"
                style="
                  font-size: 7px;
                  font-weight: 600;
                  color: #6b7280;
                  line-height: 9px;
                  margin: 0 0 2px;
                "
              >
                {{ infoSection.sectionTitle }}
              </p>
              <div>
                <div
                  v-for="item in infoSection.items || []"
                  :key="item.id"
                  :class="getItemHighlightClass('info-section-' + infoIndex, item.id)"
                  @mouseenter="handleItemHover('info-section-' + infoIndex, item.id)"
                  @mouseleave="handleItemLeave"
                  @click.stop="handleItemClick('info-section-' + infoIndex, item.id)"
                  style="display: inline-block; width: 19%; margin-right: 1%; vertical-align: top"
                >
                  <p
                    style="
                      font-size: 7px;
                      font-weight: 600;
                      line-height: 9px;
                      margin: 0;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    "
                  >
                    {{ item.label }}
                  </p>
                  <p style="font-size: 7px; line-height: 9px; margin: 0; word-wrap: break-word">
                    {{ item.value }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Tables -->
          <div
            v-if="props.sectionStates.table"
            :class="getSectionHighlightClass('table-section')"
            @mouseenter="handleSectionHover('table-section')"
            @mouseleave="handleSectionLeave"
            @click="handleSectionClick('table-section')"
          >
            <div
              v-for="(table, tableIndex) in props.templateData.tables || []"
              :key="table.id"
              :class="getSectionHighlightClass('table-section-' + tableIndex)"
              @mouseenter="handleSectionHover('table-section-' + tableIndex)"
              @mouseleave="handleSectionLeave"
              @click="handleSectionClick('table-section-' + tableIndex)"
              style="margin-bottom: 8px"
            >
              <p
                v-if="table.sectionTitle"
                style="
                  font-size: 7px;
                  color: #6b7280;
                  font-weight: 600;
                  line-height: 9px;
                  margin: 0 0 2px;
                "
              >
                {{ table.sectionTitle }}
              </p>
              <p
                v-if="table.subsectionTitle"
                style="font-size: 7px; font-weight: 600; line-height: 9px; margin: 0 0 2px"
              >
                {{ table.subsectionTitle }}
              </p>
              <table style="width: 100%; border-collapse: collapse; table-layout: fixed">
                <thead>
                  <tr>
                    <th
                      v-for="(column, columnIndex) in table.columns || []"
                      :key="column.id"
                      :class="
                        getItemHighlightClass(
                          'table-section-' + tableIndex,
                          'column-header-' + column.id,
                        )
                      "
                      @mouseenter="
                        handleItemHover('table-section-' + tableIndex, 'column-header-' + column.id)
                      "
                      @mouseleave="handleItemLeave"
                      @click.stop="
                        handleItemClick('table-section-' + tableIndex, 'column-header-' + column.id)
                      "
                      :style="{
                        width: getTableColWidthExport(table, column),
                        padding:
                          columnIndex === 0
                            ? '0 8px 0 0'
                            : columnIndex === (table.columns?.length || 1) - 1
                              ? '0 0 0 8px'
                              : '0 8px',
                        'vertical-align': 'bottom',
                        'border-bottom': '1px solid #d2d2d2',
                        height: '13px',
                      }"
                    >
                      <span
                        :class="{ 'text-right': column.alignment === 'right' }"
                        style="
                          display: block;
                          width: 100%;
                          font-size: 7px;
                          color: #919191;
                          line-height: 9px;
                        "
                        >{{ column.name || 'Column Name' }}</span
                      >
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(row, rowIndex) in getTableRows(table)"
                    :key="row.id"
                    :class="getItemHighlightClass('table-section-' + tableIndex, 'row-' + rowIndex)"
                    @mouseenter="handleItemHover('table-section-' + tableIndex, 'row-' + rowIndex)"
                    @mouseleave="handleItemLeave"
                    @click.stop="handleItemClick('table-section-' + tableIndex, 'row-' + rowIndex)"
                  >
                    <td
                      v-for="(column, columnIndex) in table.columns || []"
                      :key="column.id"
                      :style="{
                        width: getTableColWidthExport(table, column),
                        padding:
                          columnIndex === 0
                            ? '2px 8px 2px 0'
                            : columnIndex === (table.columns?.length || 1) - 1
                              ? '2px 0 2px 8px'
                              : '2px 8px',
                        'vertical-align': 'top',
                      }"
                    >
                      <p
                        class="font-normal text-black"
                        :class="{ 'text-right': column.alignment === 'right' }"
                        style="font-size: 7px; line-height: 9px; margin: 0; word-wrap: break-word"
                      >
                        {{ row.data[column.id] || '' }}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div style="border-bottom: 1px solid #d2d2d2; width: 100%"></div>
              <div style="width: 100%; margin-top: 2px; text-align: right">
                <span style="font-size: 7px; color: #919191">Subtotal </span>
                <span style="font-size: 7px; font-weight: 600">${{ table.total || '0.00' }}</span>
              </div>
            </div>
          </div>

          <!-- Summary -->
          <div v-if="props.sectionStates.summary" style="margin: 8px 0; text-align: right">
            <span style="font-size: 10px; color: #919191; font-weight: 600; margin-right: 12px"
              >{{ props.templateData.summary?.labelText || 'Total USD' }}</span
            >
            <span style="font-size: 14px; font-weight: 600"
              >${{ (props.templateData.summary?.amount || 0).toFixed(2) }}</span
            >
          </div>

          <!-- Description -->
          <div v-if="props.sectionStates.description">
            <div
              v-for="(descriptionSection, descIndex) in (props.templateData.description as any[]) ||
              []"
              :key="descriptionSection.id"
              :class="getSectionHighlightClass('description-section-' + descIndex)"
              @mouseenter="handleSectionHover('description-section-' + descIndex)"
              @mouseleave="handleSectionLeave"
              @click="handleSectionClick('description-section-' + descIndex)"
              style="margin: 8px 0"
            >
              <p
                v-if="descriptionSection.sectionTitle"
                style="font-size: 7px; font-weight: 600; margin: 0 0 2px"
              >
                {{ descriptionSection.sectionTitle }}
              </p>
              <p style="font-size: 7px; line-height: 9px; margin: 0; word-wrap: break-word">
                {{ descriptionSection.content }}
              </p>
            </div>
          </div>

          <!-- Item -->
          <div v-if="props.sectionStates.item">
            <div
              v-for="(itemSection, itemIndex) in (props.templateData.item as any[]) || []"
              :key="itemSection.id"
              :class="getSectionHighlightClass('item-section-' + itemIndex)"
              @mouseenter="handleSectionHover('item-section-' + itemIndex)"
              @mouseleave="handleSectionLeave"
              @click="handleSectionClick('item-section-' + itemIndex)"
              style="margin: 8px 0"
            >
              <p
                v-if="itemSection.sectionTitle"
                style="
                  font-size: 7px;
                  font-weight: 600;
                  color: #6b7280;
                  line-height: 9px;
                  margin: 0 0 2px;
                "
              >
                {{ itemSection.sectionTitle }}
              </p>
              <div>
                <div
                  v-for="item in itemSection.items || []"
                  :key="item.id"
                  :class="getItemHighlightClass('item-section-' + itemIndex, item.id)"
                  @mouseenter="handleItemHover('item-section-' + itemIndex, item.id)"
                  @mouseleave="handleItemLeave"
                  @click.stop="handleItemClick('item-section-' + itemIndex, item.id)"
                  style="display: inline-block; width: 19%; margin-right: 1%; vertical-align: top"
                >
                  <p
                    style="
                      font-size: 7px;
                      font-weight: 600;
                      line-height: 9px;
                      margin: 0;
                      white-space: nowrap;
                      overflow: hidden;
                      text-overflow: ellipsis;
                    "
                  >
                    {{ item.label }}
                  </p>
                  <p style="font-size: 7px; line-height: 9px; margin: 0; word-wrap: break-word">
                    {{ item.value }}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- H-Info -->
          <div v-if="props.sectionStates.hInfo">
            <div
              v-for="(hInfoSection, hInfoIndex) in (props.templateData.hInfo as any[]) || []"
              :key="hInfoSection.id"
              :class="getSectionHighlightClass('h-info-section-' + hInfoIndex)"
              @mouseenter="handleSectionHover('h-info-section-' + hInfoIndex)"
              @mouseleave="handleSectionLeave"
              @click="handleSectionClick('h-info-section-' + hInfoIndex)"
              style="margin: 8px 0"
            >
              <p
                v-if="hInfoSection.sectionTitle"
                style="
                  font-size: 7px;
                  font-weight: 600;
                  color: #6b7280;
                  line-height: 9px;
                  margin: 0 0 2px;
                "
              >
                {{ hInfoSection.sectionTitle }}
              </p>
              <div style="display: flex; gap: 8px; width: 100%">
                <div
                  v-for="column in hInfoSection.columns || []"
                  :key="column.id"
                  :style="{
                    width: getColumnWidthStyle(hInfoSection),
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '4px',
                  }"
                >
                  <div
                    v-for="item in column.items || []"
                    :key="item.id"
                    :class="getItemHighlightClass('h-info-section-' + hInfoIndex, item.id)"
                    @mouseenter="handleItemHover('h-info-section-' + hInfoIndex, item.id)"
                    @mouseleave="handleItemLeave"
                    @click.stop="handleItemClick('h-info-section-' + hInfoIndex, item.id)"
                    style="display: flex; align-items: flex-start; gap: 8px"
                  >
                    <span
                      style="
                        font-size: 7px;
                        font-weight: 600;
                        line-height: 9px;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        width: 80px;
                        flex-shrink: 0;
                      "
                      >{{ item.label }}</span
                    >
                    <span
                      style="font-size: 7px; line-height: 9px; word-wrap: break-word; flex: 1"
                      >{{ item.value }}</span
                    >
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Footer -->
          <div
            v-if="props.sectionStates.footer"
            :class="getSectionHighlightClass('footer-section')"
            @mouseenter="handleSectionHover('footer-section')"
            @mouseleave="handleSectionLeave"
            @click="handleSectionClick('footer-section')"
            style="margin-top: 8px"
          >
            <div>
              <p
                v-if="props.templateData.footer?.info"
                style="font-size: 7px; line-height: 9px; margin: 0"
              >
                {{ props.templateData.footer.info }}
              </p>
              <p
                v-if="props.templateData.footer?.name"
                style="font-size: 7px; line-height: 9px; margin: 0; text-align: center"
              >
                {{ props.templateData.footer.name }}
              </p>
              <p style="font-size: 7px; line-height: 9px; margin: 0; text-align: right">
                Page: 1 of 1
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted } from 'vue'
import IconButton from './IconButton.vue'
import TextButton from './TextButton.vue'
import { usePdfInteraction } from '../composables/usePdfInteraction'

interface SectionStates {
  header: boolean
  info: boolean
  table: boolean
  summary: boolean
  description: boolean
  item: boolean
  hInfo: boolean
  footer: boolean
}

interface TemplateData {
  header?: {
    title?: string
    description?: string
    logo?: string
    companyName?: string
    logoSize?: 'default' | 'large'
  }
  info?: Array<{
    id?: string
    sectionTitle?: string
    items?: Array<{
      id: string
      label: string
      value: string
    }>
  }>
  tables?: Array<{
    id?: string
    sectionTitle?: string
    subsectionTitle?: string
    columns: Array<{
      id: string
      name: string
      type: string
      alignment: 'left' | 'right'
      width?: number
    }>
    rows: Array<{
      id: string
      data: Record<string, string>
      total: number
    }>
    total: number
    rowsNumber?: number
  }>
  description?: Array<{
    id?: string
    content: string
  }>
  item?: Array<{
    id?: string
    sectionTitle?: string
    items?: Array<{
      id: string
      label: string
      value: string
    }>
  }>
  hInfo?: Array<{
    id?: string
    sectionTitle?: string
    columns: Array<{
      id: string
      items: Array<{
        id: string
        label: string
        value: string
      }>
    }>
  }>
  footer?: {
    info?: string
    name: string
  }
}

const props = defineProps<{
  sectionStates: SectionStates
  templateData: TemplateData
  exportMode?: boolean
}>()

// PDF interaction system
const {
  handleSectionHover,
  handleSectionLeave,
  handleItemHover,
  handleItemLeave,
  handleSectionClick,
  handleItemClick,
  getSectionHighlightClass,
  getItemHighlightClass,
} = usePdfInteraction(props.sectionStates)

// Zoom functionality
const zoomLevel = ref(1.2)
const containerRef = ref<HTMLElement>()
const exportContainerRef = ref<HTMLElement>()

// 动态生成表格行数据
const getTableRows = (table: {
  rows?: Array<{ id: string; data: Record<string, string>; total: number }>
  rowsNumber?: number
  columns?: Array<{ id: string }>
}) => {
  const baseRows = table.rows || []
  const rowsNumber = table.rowsNumber || 2

  // 如果需要的行数大于现有行数，动态生成更多行
  if (rowsNumber > baseRows.length) {
    const additionalRows = []
    for (let i = baseRows.length; i < rowsNumber; i++) {
      const newRow = {
        id: `generated-${i + 1}`,
        data: {} as Record<string, string>,
        total: 0,
      }

      // 为每个列生成数据
      if (table.columns) {
        table.columns.forEach((column: { id: string }) => {
          // 使用第一行的数据作为模板，或者使用默认值
          const templateValue = baseRows[0]?.data[column.id] || 'Placeholder'
          newRow.data[column.id] = templateValue.replace(/\d+/, String(i + 1))
        })
      }

      additionalRows.push(newRow)
    }
    return [...baseRows, ...additionalRows]
  }

  return baseRows.slice(0, rowsNumber)
}

// 列宽样式（编辑预览区域，容器宽度固定 572px）
const getTableColWidthStyle = (table: unknown, column: unknown): string => {
  const t = table as { columns?: Array<{ width?: number }>; columnsWidthUnit?: 'percent' | 'px' }
  const col = column as { width?: number }
  const unit = t.columnsWidthUnit || 'percent'
  const cols = t.columns || []
  if (!cols.length) return '100%'
  if (unit === 'px') {
    const px = typeof col.width === 'number' ? col.width : Math.floor(572 / cols.length)
    return `${px}px`
  }
  // percent（按权重归一化）
  const weights = cols.map((c) => (typeof c.width === 'number' ? c.width : 100))
  const total = weights.reduce((a, b) => a + b, 0) || 1
  const current = typeof col.width === 'number' ? col.width : 100
  const percent = (current / total) * 100
  return `${percent}%`
}

// 导出模式下列宽（table/th/td 支持 px 或 %）
const getTableColWidthExport = (table: unknown, column: unknown): string => {
  const t = table as { columns?: Array<{ width?: number }>; columnsWidthUnit?: 'percent' | 'px' }
  const col = column as { width?: number }
  const unit = t.columnsWidthUnit || 'percent'
  if (unit === 'px') {
    const px =
      typeof col.width === 'number' ? col.width : Math.floor(572 / ((t.columns || []).length || 1))
    return `${px}px`
  }
  const cols = t.columns || []
  if (!cols.length) return '100%'
  const weights = cols.map((c) => (typeof c.width === 'number' ? c.width : 100))
  const total = weights.reduce((a, b) => a + b, 0) || 1
  const current = typeof col.width === 'number' ? col.width : 100
  const percent = (current / total) * 100
  return `${percent}%`
}

// Debug: Log table data changes
const debugTableData = computed(() => {
  if (props.sectionStates.table && props.templateData.tables) {
    console.log(
      'PdfPreviewPanel: table data updated',
      props.templateData.tables.map((table) => ({
        id: table.id,
        rowsNumber: table.rowsNumber,
        baseRowsCount: table.rows?.length || 0,
        actualRowsToShow: getTableRows(table).length,
      })),
    )
  }
  return props.templateData.tables
})

// 使用 debugTableData 来触发调试日志
watch(
  debugTableData,
  () => {
    // 这个 watch 会触发 debugTableData 的重新计算，从而输出调试信息
  },
  { immediate: true },
)

// H-Info Section 样式计算函数
const getColumnContainerStyle = () => {
  // 当前容器始终占满 100%，间距固定
  return {
    display: 'flex',
    gap: '8px',
    width: '100%',
  }
}

const getColumnStyle = (hInfoSection: unknown) => {
  const section = hInfoSection as { columnWidth?: '1/2' | '1/3' | '1/4' }
  const columnWidth = section.columnWidth || '1/2'

  let widthPercent = 50
  if (columnWidth === '1/3') widthPercent = 33.33
  else if (columnWidth === '1/4') widthPercent = 25

  return {
    width: `${widthPercent}%`,
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  }
}

const getColumnWidthStyle = (hInfoSection: unknown) => {
  const section = hInfoSection as { columnWidth?: '1/2' | '1/3' | '1/4' }
  const columnWidth = section.columnWidth || '1/2'

  if (columnWidth === '1/3') return '33.33%'
  else if (columnWidth === '1/4') return '25%'
  else return '50%' // 默认 1/2
}

// Responsive detection (不再使用，移除以避免 linter 报错)

// Zoom controls
const zoomIn = () => {
  if (zoomLevel.value < 2) {
    zoomLevel.value = Math.min(2, zoomLevel.value + 0.1)
  }
}

const zoomOut = () => {
  if (zoomLevel.value > 0.3) {
    zoomLevel.value = Math.max(0.3, zoomLevel.value - 0.1)
  }
}

const fitToWidth = () => {
  if (!containerRef.value) return

  // Get container width (minus padding)
  const containerWidth = containerRef.value.clientWidth - 64 // 32px padding on each side
  const pdfWidth = 612 // U.S. Letter width in pixels

  // Calculate zoom to fit width
  const calculatedZoom = containerWidth / pdfWidth

  // Set zoom level, but don't exceed 2.0 (200%)
  zoomLevel.value = Math.min(calculatedZoom, 2.0)
}

// Listen for window size changes
const handleResize = () => {
  // Recalculate fit to width when window resizes
  if (zoomLevel.value >= 1.7) {
    // If currently at or near fit-to-width zoom
    fitToWidth()
  }
}

onMounted(() => {
  // Initialize with fit to width
  setTimeout(() => {
    fitToWidth()
  }, 100)

  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.pdf-container {
  font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    Roboto,
    sans-serif;
  box-sizing: border-box;
  transition: transform 0.2s ease-in-out;
}

.pdf-content {
  line-height: 1.2;
}

/* Ensure table column width adapts */
.table-column-header,
.table-cell {
  min-width: 0;
  word-wrap: break-word;
}

/* Ensure text alignment is correct */
.text-right {
  text-align: right;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

/* Stronger left align to override any inherited/parent center align */
.force-text-left {
  text-align: left !important;
}

/* Figma design precise styles */
.header-section .logo-container {
  position: relative;
}

.footer-section {
  position: relative;
}

.footer-section > div {
  position: relative;
}

/* Precise color values */
.text-color-5b7282 {
  color: #5b7282;
}

.text-color-919191 {
  color: #919191;
}

.border-color-d2d2d2 {
  border-color: #d2d2d2;
}

/* Info Section Styles */
.info-section {
  display: flex;
  flex-direction: column;
  gap: 2px; /* 2px spacing between section title and items */
}

.info-section-title {
  font-size: 7px;
  font-weight: 600;
  color: #6b7280; /* gray-600 */
  line-height: 9px;
  margin: 0;
}

.info-items-container {
  display: flex;
  flex-wrap: wrap;
  gap: 4px; /* 4px spacing between items */
}

.info-item {
  width: calc(20% - 3.2px); /* Each item takes 1/5 of width minus gap */
  display: flex;
  flex-direction: column;
  gap: 2px; /* 2px spacing between label and value */
  min-width: 0;
}

.info-item-label {
  font-size: 7px;
  font-weight: 600;
  color: #000000; /* black */
  line-height: 9px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.info-item-value {
  font-size: 7px;
  font-weight: 400;
  color: #919191;
  line-height: 9px;
  margin: 0;
  min-width: 0;
  word-wrap: break-word;
}

/* Description Section Styles */
.description-section {
  margin-top: 10px; /* 10px spacing between Description Section and Total USD */
}

.description-content {
  display: flex;
  flex-direction: column;
  gap: 2px; /* 2px spacing between Item Name and description content */
}

.description-label {
  font-size: 7px;
  font-weight: 600;
  color: #000000; /* black */
  line-height: 9px;
  margin: 0;
  white-space: nowrap;
}

.description-text {
  font-size: 7px;
  font-weight: 400;
  color: #919191;
  line-height: 9px; /* description content line height */
  margin: 0;
  min-width: 0;
  word-wrap: break-word;
}

/* Item Section Styles - Same as Info Section */
.item-section {
  margin-top: 10px; /* 10px spacing between Item Section and Description Section */
  display: flex;
  flex-direction: column;
  gap: 2px; /* 2px spacing between section title and items */
}

.item-section-title {
  font-size: 7px;
  font-weight: 600;
  color: #6b7280; /* gray-600 */
  line-height: 9px;
  margin: 0;
}

.item-items-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2px; /* 2px spacing between items */
}

.item-item {
  width: calc(20% - 2px); /* Each item takes 1/5 of width minus gap */
  display: flex;
  flex-direction: column;
  gap: 2px; /* 2px spacing between label and value */
  min-width: 0;
}

.item-item-label {
  font-size: 7px;
  font-weight: 600;
  color: #000000; /* black */
  line-height: 9px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.item-item-value {
  font-size: 7px;
  font-weight: 400;
  color: #919191;
  line-height: 9px;
  margin: 0;
  min-width: 0;
  word-wrap: break-word;
}

/* H-Info Section Styles */
.h-info-section {
  display: flex;
  flex-direction: column;
  gap: 2px; /* 2px spacing between section title and columns */
}

.h-info-section-title {
  font-size: 7px;
  font-weight: 600;
  color: #6b7280; /* gray-600 */
  line-height: 9px;
  margin: 0;
}

.h-info-columns-container {
  display: flex;
  gap: 8px; /* 8px spacing between columns */
  width: 100%;
}

.h-info-column {
  display: flex;
  flex-direction: column;
  gap: 4px; /* 4px spacing between items in column */
}

.h-info-item {
  display: flex;
  flex-direction: column;
  min-width: 0;
}

.h-info-item-content {
  display: flex;
  align-items: flex-start;
  gap: 8px; /* 8px spacing between label and value */
}

.h-info-item-label {
  font-size: 7px;
  font-weight: 600;
  color: #000000; /* black */
  line-height: 9px;
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-shrink: 0;
  width: 80px; /* 固定宽度 80px */
}

.h-info-item-value {
  font-size: 7px;
  font-weight: 400;
  color: #919191;
  line-height: 9px;
  margin: 0;
  min-width: 0;
  word-wrap: break-word;
  flex: 1;
}

/* Precise spacing - Completely consistent with Figma design */
.gap-2\.5 {
  gap: 0.625rem; /* 10px - Main section spacing */
}

.gap-1 {
  gap: 0.25rem; /* 4px - Info Section internal spacing */
}

.gap-0\.5 {
  gap: 0.125rem; /* 2px - Info Section item spacing and label-value spacing */
}

.gap-3\.75 {
  gap: 0.9375rem; /* 15px - Table header spacing */
}

.gap-1\.5 {
  gap: 0.375rem; /* 6px - Item Section internal spacing */
}

.gap-px {
  gap: 1px; /* 1px - Header title and description spacing */
}

.gap-3 {
  gap: 0.75rem; /* 12px - Summary Section spacing */
}

/* Precise heights */
.h-2\.25 {
  height: 0.5625rem;
}

.h-3\.25 {
  height: 0.8125rem; /* 13px */
}

.h-4\.25 {
  height: 1.0625rem;
}

.h-8 {
  height: 2rem;
}

.h-12 {
  height: 3rem;
}

/* Precise line heights */
.leading-2\.25 {
  line-height: 0.5625rem;
}

.leading-4\.25 {
  line-height: 1.0625rem;
}

.leading-6 {
  line-height: 1.5rem;
}

/* Precise widths */
.w-60 {
  width: 15rem;
}

.w-12\.5 {
  width: 3.125rem;
}

/* Precise padding */
.p-6 {
  padding: 1.5rem;
}

.pr-1 {
  padding-right: 0.25rem;
}

.py-0 {
  padding-top: 0;
  padding-bottom: 0;
}

.py-0\.5 {
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
}

.pb-px {
  padding-bottom: 1px;
}

.pt-0 {
  padding-top: 0;
}

.px-0 {
  padding-left: 0;
  padding-right: 0;
}

/* Precise borders */
.border-\[#d2d2d2\] {
  border-color: #d2d2d2;
}

.border-b {
  border-bottom-width: 1px;
}

/* Precise font weights */
.font-semibold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
}

.font-normal {
  font-weight: 400;
}

/* Precise text alignment */
.text-right {
  text-align: right;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

/* Precise overflow handling */
.overflow-hidden {
  overflow: hidden;
}

.overflow-clip {
  overflow: clip;
}

/* Precise positioning */
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

/* Precise transforms */
.-translate-y-1\/2 {
  transform: translateY(-50%);
}

/* Footer fixed at bottom */
.footer-section {
  margin-top: auto;
}

/* Ensure PDF content uses flex layout */
.pdf-content {
  display: flex;
  flex-direction: column;
  min-height: 100%;
}

/* Table row height 13px */
.h-3\.25 {
  height: 0.8125rem; /* 13px */
}

/* Table row consistency - ensure all cells in a row have the same height */
.table-row {
  display: flex;
  align-items: stretch;
  min-height: 13px;
}

.table-cell {
  display: flex;
  align-items: flex-start;
  min-height: 13px;
  flex: 1;
}

/* PDF Interaction Hover Effects */
.pdf-section-highlight {
  background-color: rgba(255, 193, 7, 0.16) !important;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
}

.pdf-item-highlight {
  background-color: rgba(255, 193, 7, 0.16) !important;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
}

.pdf-item-hover {
  background-color: rgba(255, 193, 7, 0.08) !important;
  border-radius: 4px;
  transition: background-color 0.2s ease-in-out;
}
</style>
