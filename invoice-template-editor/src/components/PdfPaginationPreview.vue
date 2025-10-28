<template>
  <div
    class="h-full bg-white rounded-xl shadow-lg border border-[#d3ddde] flex flex-col"
    @click="handleBackgroundClick"
  >
    <!-- Preview Header -->
    <div class="bg-gray-100 border-b border-[#d3ddde] flex-shrink-0 p-2 min-h-[3rem] w-full">
      <div class="flex items-center justify-between w-full">
        <h2 class="text-lg font-semibold text-primary">PDF Template Preview</h2>
        <div class="flex items-center gap-2">
          <!-- Page Navigation -->
          <div class="flex items-center gap-2">
            <IconButton
              @click="goToPreviousPage"
              :disabled="currentPage <= 1"
              title="Previous Page"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                ></path>
              </svg>
            </IconButton>
            <span class="text-sm text-primary min-w-[4rem] text-center">
              Page {{ currentPage }} of {{ totalPages }}
            </span>
            <IconButton
              @click="goToNextPage"
              :disabled="currentPage >= totalPages"
              title="Next Page"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5l7 7-7 7"
                ></path>
              </svg>
            </IconButton>
          </div>
          <div class="h-6 w-px bg-primary/20"></div>
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
      <div v-if="!isExportMode" class="w-full flex justify-center" style="padding-top: 20px">
        <!-- PDF Pages Container -->
        <div
          class="pdf-pages-container"
          :style="{
            transform: 'scale(' + zoomLevel + ')',
            'transform-origin': 'top center',
          }"
        >
          <!-- Current PDF Page -->
          <div
            class="pdf-container shadow-xl border border-[#d3ddde] rounded-lg"
            :style="{
              width: PAGE_WIDTH + 'px',
              height: PAGE_HEIGHT + 'px',
              marginBottom: (zoomLevel - 1) * PAGE_HEIGHT + 'px',
              padding: '0',
              display: 'flex',
              'flex-direction': 'column',
              'align-items': 'center',
              'justify-content': 'flex-start',
              position: 'relative',
              overflow: 'hidden',
            }"
          >
            <!-- 顶部间距 -->
            <div
              :style="{
                height: '24px',
                'min-height': '24px',
                'max-height': '24px',
                width: '100%',
                position: 'absolute',
                top: '0px',
                left: '0px',
              }"
            ></div>

            <!-- PDF Content -->
            <div
              class="pdf-content"
              :style="{
                width: CONTENT_WIDTH + 'px',
                height: CONTENT_HEIGHT + 'px',
                'min-height': CONTENT_HEIGHT + 'px',
                'max-height': CONTENT_HEIGHT + 'px',
                'box-sizing': 'border-box',
                position: 'absolute',
                top: '24px',
                left: '24px',
                display: 'flex',
                'flex-direction': 'column',
                'align-items': 'flex-start',
                overflow: 'hidden',
              }"
            >
              <!-- Render sections for current page (excluding footer) -->
              <template
                v-for="section in currentPageSections.filter((s: any) => s.type !== 'footer')"
                :key="section.id"
              >
                <!-- Header Section -->
                <div
                  v-if="section.type === 'header'"
                  class="header-section flex items-center w-full cursor-pointer transition-all duration-200"
                  :class="[
                    getSectionHighlightClass('header-section'),
                    shouldHeaderAlignLeft(section.content) ? 'justify-start' : 'justify-between',
                  ]"
                  :style="`margin-bottom: ${getSectionMarginBottom(section, 0)};`"
                  @mouseenter="handleSectionHover('header-section')"
                  @mouseleave="handleSectionLeave"
                  @click.stop="handleSectionClick('header-section')"
                >
                  <!-- Title and Description Section (only show if not empty) -->
                  <div
                    v-if="!shouldHeaderAlignLeft(section.content)"
                    class="flex flex-col gap-px items-start justify-center"
                  >
                    <h1
                      v-if="section.content?.title"
                      class="font-semibold leading-6"
                      :style="{
                        fontSize: (props.styleConfig?.header?.titleSize || 20) + 'px',
                        color: props.styleConfig?.header?.titleColor || '#0e171f',
                        fontWeight: getFontWeight(props.styleConfig?.header?.titleWeight),
                      }"
                    >
                      {{ section.content.title }}
                    </h1>
                    <p
                      v-if="section.content?.description"
                      class="font-normal leading-2.25"
                      :style="{
                        fontSize: (props.styleConfig?.header?.descriptionSize || 7) + 'px',
                        color: props.styleConfig?.header?.descriptionColor || '#919191',
                        fontWeight: getFontWeight(props.styleConfig?.header?.descriptionWeight),
                      }"
                    >
                      {{ section.content.description }}
                    </p>
                  </div>

                  <!-- Logo Container -->
                  <div
                    class="logo-container w-60 overflow-hidden relative flex flex-col justify-center"
                    :class="shouldHeaderAlignLeft(section.content) ? 'items-start' : 'items-end'"
                  >
                    <div
                      class="w-full"
                      :style="{ height: (section.content?.logoSize === 'large' ? 72 : 48) + 'px' }"
                    >
                      <img
                        v-if="section.content?.logo"
                        :src="section.content.logo"
                        alt="Logo"
                        :class="
                          shouldHeaderAlignLeft(section.content)
                            ? 'object-contain object-left'
                            : 'object-contain object-right'
                        "
                        class="h-full w-full"
                      />
                      <div
                        v-else
                        class="border border-black border-dashed w-full h-full flex items-center justify-center"
                      >
                        <span class="text-gray-400" style="font-size: 10px">Logo Placeholder</span>
                      </div>
                    </div>

                    <!-- Logo Description -->
                    <p
                      v-if="section.content?.logoDescription"
                      class="mt-1 text-xs"
                      :class="shouldHeaderAlignLeft(section.content) ? 'text-left' : 'text-right'"
                      style="font-size: 7px; margin-top: 4px; color: #919191"
                    >
                      {{ section.content.logoDescription }}
                    </p>
                  </div>
                </div>

                <!-- Info Section - 完整的 section block -->
                <div
                  v-if="section.type === 'info'"
                  class="info-section w-full cursor-pointer transition-all duration-200"
                  :style="`margin-bottom: ${getSectionMarginBottom(section, 0)};`"
                  :class="getSectionHighlightClass('info-section')"
                  @mouseenter="handleSectionHover('info-section')"
                  @mouseleave="handleSectionLeave"
                  @click.stop="handleSectionClick('info-section')"
                >
                  <!-- Section Title -->
                  <div v-if="section.content.sectionTitle" class="info-section-title-container">
                    <p
                      class="info-section-title"
                      :style="{
                        fontWeight: getFontWeight(props.styleConfig?.info?.sectionTitleWeight),
                        color: props.styleConfig?.info?.sectionTitleColor || '#6b7280',
                      }"
                    >
                      {{ section.content.sectionTitle }}
                    </p>
                  </div>

                  <!-- Items 按行渲染 -->
                  <div
                    v-for="(row, rowIndex) in getInfoRows(section.content.items)"
                    :key="rowIndex"
                    class="info-section-row"
                  >
                    <div
                      class="info-items-container"
                      :style="{ gap: (props.styleConfig?.info?.itemGap ?? 2) + 'px' }"
                    >
                      <div
                        v-for="item in row"
                        :key="item.id"
                        class="info-item cursor-pointer transition-all duration-200"
                        :class="getItemHighlightClass('info-section', item.id)"
                        :style="getItemWidthStyle('info')"
                        @mouseenter="handleItemHover('info-section', item.id)"
                        @mouseleave="handleItemLeave"
                        @click.stop="handleItemClick('info-section', item.id)"
                      >
                        <p
                          class="info-item-label"
                          :style="{
                            fontWeight: getFontWeight(props.styleConfig?.info?.labelWeight),
                            color: props.styleConfig?.info?.labelColor || '#000000',
                          }"
                        >
                          {{ item.label || '&nbsp;' }}
                        </p>
                        <p
                          class="info-item-value"
                          :style="{
                            fontWeight: getFontWeight(props.styleConfig?.info?.valueWeight),
                            color: props.styleConfig?.info?.valueColor || '#919191',
                            marginTop: (props.styleConfig?.info?.labelValueGap || 2) + 'px',
                          }"
                        >
                          {{ item.value || '&nbsp;' }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Table Section (semantic HTML table for WYSIWYG) -->
                <div
                  v-if="section.type === 'table' && section.content.type !== 'summary'"
                  class="table-section w-full cursor-pointer transition-all duration-200"
                  :style="`margin-bottom: ${getSectionMarginBottom(section, 0)};`"
                  :class="getSectionHighlightClass('table-section-' + section.id)"
                  @mouseenter="handleSectionHover('table-section-' + section.id)"
                  @mouseleave="handleSectionLeave"
                  @click.stop="handleSectionClick('table-section-' + section.id)"
                >
                  <!-- Section Title (只在第一部分显示) -->
                  <div
                    v-if="section.content.sectionTitle && section.content.showHeader !== false"
                    class="flex gap-1 h-2.25 items-start w-full"
                  >
                    <div class="flex grow items-start min-w-0">
                      <p
                        class="font-semibold leading-2.25"
                        :style="{
                          fontSize: '7px',
                          color: props.styleConfig?.table?.sectionTitleColor || '#6b7280',
                          fontWeight: getFontWeight(props.styleConfig?.table?.sectionTitleWeight),
                        }"
                      >
                        {{ section.content.sectionTitle }}
                      </p>
                    </div>
                  </div>

                  <!-- Subsection Title (只在第一部分显示) -->
                  <div
                    v-if="section.content.subsectionTitle && section.content.showHeader !== false"
                    class="flex gap-1 h-2.25 items-start w-full"
                  >
                    <div class="flex grow items-start min-w-0">
                      <p
                        class="font-semibold leading-2.25"
                        :style="{
                          fontSize: '7px',
                          color: props.styleConfig?.table?.subsectionTitleColor || '#000000',
                          fontWeight: getFontWeight(
                            props.styleConfig?.table?.subsectionTitleWeight,
                          ),
                        }"
                      >
                        {{ section.content.subsectionTitle }}
                      </p>
                    </div>
                  </div>

                  <!-- HTML Table -->
                  <table
                    class="wysiwyg-table"
                    style="width: 100%; border-collapse: collapse; table-layout: fixed"
                  >
                    <!-- Table Header (只在第一部分显示) -->
                    <thead v-if="section.content.showHeader !== false">
                      <tr>
                        <th
                          v-for="(column, columnIndex) in section.content.columns || []"
                          :key="column.id"
                          :style="{
                            width: getColumnWidth(section.content.columns, column),
                            padding:
                              columnIndex === 0
                                ? `0 ${props.styleConfig?.table?.columnsPadding ?? 8}px 0 0`
                                : columnIndex === (section.content.columns?.length || 1) - 1
                                  ? `0 0 0 ${props.styleConfig?.table?.columnsPadding ?? 8}px`
                                  : `0 ${props.styleConfig?.table?.columnsPadding ?? 8}px`,
                            'vertical-align': 'bottom',
                            'border-bottom': '1px solid #d2d2d2',
                            height: '13px',
                          }"
                          class="font-medium"
                          :class="getItemHighlightClass('table-section-' + section.id, column.id)"
                          @mouseenter="handleItemHover('table-section-' + section.id, column.id)"
                          @mouseleave="handleItemLeave"
                          @click.stop="handleItemClick('table-section-' + section.id, column.id)"
                        >
                          <span
                            :class="{
                              'text-right': column.alignment === 'right',
                              'text-left': column.alignment === 'left',
                            }"
                            :style="{
                              display: 'block',
                              width: '100%',
                              fontSize: '7px',
                              color: props.styleConfig?.table?.headerColor || '#919191',
                              lineHeight: '9px',
                              fontWeight: getFontWeight(props.styleConfig?.table?.columnNameWeight),
                            }"
                            >{{ column.name || 'Column Name' }}</span
                          >
                        </th>
                      </tr>
                    </thead>

                    <!-- Table Body -->
                    <tbody>
                      <tr
                        v-for="(row, rowIndex) in getTableRows(section.content)"
                        :key="row.id"
                        :class="
                          getItemHighlightClass('table-section-' + section.id, 'row-' + rowIndex)
                        "
                        :title="
                          'Row ' + (rowIndex + 1) + ' of ' + getTableRows(section.content).length
                        "
                        @mouseenter="
                          handleItemHover('table-section-' + section.id, 'row-' + rowIndex)
                        "
                        @mouseleave="handleItemLeave"
                        @click.stop="
                          handleItemClick('table-section-' + section.id, 'row-' + rowIndex)
                        "
                      >
                        <td
                          v-for="(column, columnIndex) in section.content.columns || []"
                          :key="column.id"
                          :style="{
                            width: getColumnWidth(section.content.columns, column),
                            padding:
                              columnIndex === 0
                                ? `2px ${props.styleConfig?.table?.columnsPadding ?? 8}px 2px 0`
                                : columnIndex === (section.content.columns?.length || 1) - 1
                                  ? `2px 0 2px ${props.styleConfig?.table?.columnsPadding ?? 8}px`
                                  : `2px ${props.styleConfig?.table?.columnsPadding ?? 8}px`,
                            'vertical-align': 'top',
                          }"
                        >
                          <p
                            class="font-normal text-black w-full"
                            :class="{
                              'text-right': column.alignment === 'right',
                              'text-left': column.alignment === 'left',
                            }"
                            style="
                              font-size: 7px;
                              line-height: 9px;
                              margin: 0;
                              word-wrap: break-word;
                              white-space: normal;
                            "
                            contenteditable
                            v-ce-model="row.data[column.id]"
                            @input="onCellInput(section.content, row, column, $event)"
                          ></p>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  <!-- Table Bottom Border (只在最后一部分显示) -->
                  <div
                    v-if="section.content.showBorder !== false"
                    class="border-b border-[#d2d2d2] w-full"
                  ></div>

                  <!-- Subtotal Row (只在最后一部分显示) -->
                  <div
                    v-if="section.content.showSubtotal !== false"
                    class="flex items-start w-full"
                  >
                    <div
                      v-for="(column, columnIndex) in section.content.columns || []"
                      :key="column.id"
                      class="flex flex-col items-start min-w-0 overflow-hidden"
                      :style="{ width: 100 / (section.content.columns?.length || 1) + '%' }"
                    >
                      <div class="flex flex-col items-start justify-center w-full h-3.25">
                        <div class="flex items-center w-full h-full">
                          <div
                            v-if="columnIndex === (section.content.columns?.length || 0) - 1"
                            class="flex items-center justify-end w-full h-full"
                            :class="{
                              'pl-0 pr-0':
                                columnIndex === (section.content.columns?.length || 1) - 1,
                              'px-2': columnIndex < (section.content.columns?.length || 1) - 1,
                            }"
                          >
                            <div class="text-right whitespace-nowrap">
                              <span class="font-medium" style="font-size: 7px; color: #919191"
                                >Subtotal
                              </span>
                              <span class="font-semibold text-black" style="font-size: 7px"
                                >${{ section.content.total || '0.00' }}</span
                              >
                            </div>
                          </div>
                          <div
                            v-else
                            class="w-full h-full"
                            :class="{
                              'pl-0 pr-2': columnIndex === 0,
                              'pl-2 pr-0':
                                columnIndex === (section.content.columns?.length || 1) - 1,
                              'px-2':
                                columnIndex > 0 &&
                                columnIndex < (section.content.columns?.length || 1) - 1,
                            }"
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Summary Section -->
                <div
                  v-if="section.type === 'table' && section.content.type === 'summary'"
                  class="summary-section flex gap-3 h-4.25 items-end justify-end w-full"
                  :style="`margin-bottom: ${getSectionMarginBottom(section, 0)};`"
                >
                  <div class="flex gap-3 grow items-end min-w-0">
                    <div
                      class="flex gap-2.5 grow items-center justify-center min-w-0 overflow-hidden pb-px pt-0 px-0"
                    >
                      <p
                        class="font-semibold grow leading-2.25 min-w-0 text-right whitespace-nowrap"
                        style="font-size: 10px; color: #919191"
                      >
                        Total USD
                      </p>
                    </div>
                    <p
                      class="font-semibold leading-4.25 text-black text-right whitespace-pre"
                      style="font-size: 14px"
                    >
                      ${{
                        (props.templateData.tables || [])
                          .reduce((sum: number, table: any) => sum + (table.total || 0), 0)
                          .toFixed(2)
                      }}
                    </p>
                  </div>
                </div>

                <!-- Description Section -->
                <div
                  v-if="section.type === 'description'"
                  class="description-section w-full cursor-pointer transition-all duration-200"
                  :style="`margin-bottom: ${getSectionMarginBottom(section, 0)};`"
                  :class="getSectionHighlightClass('description-section')"
                  @mouseenter="handleSectionHover('description-section')"
                  @mouseleave="handleSectionLeave"
                  @click.stop="handleSectionClick('description-section')"
                >
                  <div class="description-content">
                    <p v-if="section.content?.sectionTitle" class="description-label">
                      {{ section.content.sectionTitle }}
                    </p>
                    <p class="description-text">
                      {{
                        section.content?.content ||
                        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
                      }}
                    </p>
                  </div>
                </div>

                <!-- Item Section - 完整的 section block -->
                <div
                  v-if="section.type === 'item'"
                  class="item-section w-full cursor-pointer transition-all duration-200"
                  :style="`margin-bottom: ${getSectionMarginBottom(section, 0)};`"
                  :class="getSectionHighlightClass('item-section')"
                  @mouseenter="handleSectionHover('item-section')"
                  @mouseleave="handleSectionLeave"
                  @click.stop="handleSectionClick('item-section')"
                >
                  <!-- Section Title -->
                  <div v-if="section.content.sectionTitle" class="item-section-title-container">
                    <p
                      class="item-section-title"
                      :style="{
                        fontWeight: getFontWeight(props.styleConfig?.item?.sectionTitleWeight),
                        color: props.styleConfig?.item?.sectionTitleColor || '#6b7280',
                      }"
                    >
                      {{ section.content.sectionTitle }}
                    </p>
                  </div>

                  <!-- Items 按行渲染 -->
                  <div
                    v-for="(row, rowIndex) in getItemRows(section.content.items)"
                    :key="rowIndex"
                    class="item-section-row"
                  >
                    <div
                      class="item-items-container"
                      :style="{ gap: (props.styleConfig?.item?.itemGap ?? 2) + 'px' }"
                    >
                      <div
                        v-for="item in row"
                        :key="item.id"
                        class="item-item cursor-pointer transition-all duration-200"
                        :class="getItemHighlightClass('item-section', item.id)"
                        :style="getItemWidthStyle('item')"
                        @mouseenter="handleItemHover('item-section', item.id)"
                        @mouseleave="handleItemLeave"
                        @click.stop="handleItemClick('item-section', item.id)"
                      >
                        <p
                          class="item-item-label"
                          :style="{
                            fontWeight: getFontWeight(props.styleConfig?.item?.labelWeight),
                            color: props.styleConfig?.item?.labelColor || '#000000',
                          }"
                        >
                          {{ item.label || '&nbsp;' }}
                        </p>
                        <p
                          class="item-item-value"
                          :style="{
                            fontWeight: getFontWeight(props.styleConfig?.item?.valueWeight),
                            color: props.styleConfig?.item?.valueColor || '#919191',
                            marginTop: (props.styleConfig?.item?.labelValueGap || 2) + 'px',
                          }"
                        >
                          {{ item.value || '&nbsp;' }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- H-Info Section - 完整的 section block -->
                <div
                  v-if="section.type === 'hInfo'"
                  class="h-info-section w-full cursor-pointer transition-all duration-200"
                  :style="`margin-bottom: ${getSectionMarginBottom(section, 0)};`"
                  :class="getSectionHighlightClass('h-info-section')"
                  @mouseenter="handleSectionHover('h-info-section')"
                  @mouseleave="handleSectionLeave"
                  @click.stop="handleSectionClick('h-info-section')"
                >
                  <!-- Section Title -->
                  <div v-if="section.content.sectionTitle" class="h-info-section-title-container">
                    <p
                      class="h-info-section-title"
                      :style="{
                        fontWeight: getFontWeight(props.styleConfig?.hInfo?.sectionTitleWeight),
                        color: props.styleConfig?.hInfo?.sectionTitleColor || '#6b7280',
                      }"
                    >
                      {{ section.content.sectionTitle }}
                    </p>
                  </div>

                  <!-- Columns Container -->
                  <div
                    class="h-info-columns-container"
                    :style="{
                      display: 'flex',
                      gap: (props.styleConfig?.hInfo?.columnsPadding || 8) + 'px',
                      width: '100%',
                    }"
                  >
                    <div
                      v-for="(column, columnIndex) in section.content.columns || []"
                      :key="column.id"
                      class="h-info-column"
                      :style="{
                        width: getHInfoColumnWidthStyle(section.content),
                        display: 'flex',
                        flexDirection: 'column',
                        gap: (props.styleConfig?.hInfo?.itemGap || 4) + 'px',
                      }"
                    >
                      <div
                        v-for="(item, itemIndex) in column.items || []"
                        :key="item.id"
                        class="h-info-item cursor-pointer transition-all duration-200"
                        :class="getItemHighlightClass('h-info-section', item.id)"
                        @mouseenter="handleItemHover('h-info-section', item.id)"
                        @mouseleave="handleItemLeave"
                        @click.stop="handleItemClick('h-info-section', item.id)"
                      >
                        <!-- Horizontal Layout -->
                        <div
                          v-if="(section.content.labelValueLayout || 'horizontal') === 'horizontal'"
                          class="h-info-item-content"
                          :style="{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: (props.styleConfig?.hInfo?.labelValueGap || 8) + 'px',
                          }"
                        >
                          <span
                            class="h-info-item-label"
                            :style="{
                              fontWeight: getFontWeight(props.styleConfig?.hInfo?.labelWeight),
                              color: props.styleConfig?.hInfo?.labelColor || '#000000',
                              width: (props.styleConfig?.hInfo?.labelWidth || 80) + 'px',
                            }"
                            >{{ item.label || '&nbsp;' }}</span
                          >
                          <span
                            class="h-info-item-value"
                            :style="{
                              fontWeight: getFontWeight(props.styleConfig?.hInfo?.valueWeight),
                              color: props.styleConfig?.hInfo?.valueColor || '#919191',
                              whiteSpace: 'pre-wrap',
                            }"
                            >{{ item.value || '&nbsp;' }}</span
                          >
                        </div>

                        <!-- Vertical Layout -->
                        <div
                          v-else
                          class="h-info-item-content-vertical"
                          :style="{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: (props.styleConfig?.hInfo?.labelValueGap || 8) + 'px',
                          }"
                        >
                          <span
                            class="h-info-item-label"
                            :style="{
                              fontWeight: getFontWeight(props.styleConfig?.hInfo?.labelWeight),
                              color: props.styleConfig?.hInfo?.labelColor || '#000000',
                            }"
                            >{{ item.label || '&nbsp;' }}</span
                          >
                          <span
                            class="h-info-item-value"
                            :style="{
                              fontWeight: getFontWeight(props.styleConfig?.hInfo?.valueWeight),
                              color: props.styleConfig?.hInfo?.valueColor || '#919191',
                              whiteSpace: 'pre-wrap',
                            }"
                            >{{ item.value || '&nbsp;' }}</span
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </template>
            </div>

            <!-- 8px间距 - 调试用橙色 -->
            <div
              :style="{
                height: '8px',
                'min-height': '8px',
                'max-height': '8px',
                width: '100%',
                position: 'absolute',
                top: 24 + 727 + 'px',
                left: '0px',
              }"
            ></div>

            <!-- Footer Section -->
            <div
              v-if="currentPageSections.some((s: any) => s.type === 'footer')"
              class="footer-section flex items-start justify-between w-full cursor-pointer transition-all duration-200"
              :class="getSectionHighlightClass('footer-section')"
              @mouseenter="handleSectionHover('footer-section')"
              @mouseleave="handleSectionLeave"
              @click="handleSectionClick('footer-section')"
              :style="{
                width: CONTENT_WIDTH + 'px',
                height: '9px',
                'min-height': '9px',
                'max-height': '9px',
                position: 'absolute',
                top: 24 + 727 + 8 + 'px',
                left: '24px',
              }"
            >
              <div v-if="getFooterContent()?.info" class="flex-1 text-left">
                <p
                  class="font-normal leading-2.25"
                  :style="{
                    fontSize: (props.styleConfig?.footerInfo?.textSize || 7) + 'px',
                    color: props.styleConfig?.footerInfo?.textColor || '#000000',
                    fontWeight: getFontWeight(props.styleConfig?.footerInfo?.textWeight),
                  }"
                >
                  {{ getFooterContent().info }}
                </p>
              </div>
              <div v-if="getFooterContent()?.name" class="flex-1 text-center">
                <p
                  class="font-normal leading-2.25"
                  :style="{
                    fontSize: (props.styleConfig?.footerName?.textSize || 7) + 'px',
                    color: props.styleConfig?.footerName?.textColor || '#000000',
                    fontWeight: getFontWeight(props.styleConfig?.footerName?.textWeight),
                  }"
                >
                  {{ getFooterContent().name }}
                </p>
              </div>
              <div class="flex-1 text-right">
                <p class="font-normal leading-2.25 text-black" style="font-size: 7px">
                  Page: {{ currentPage }} of {{ totalPages }}
                </p>
              </div>
            </div>

            <!-- 底部间距 -->
            <div
              :style="{
                height: '24px',
                'min-height': '24px',
                'max-height': '24px',
                width: '100%',
                position: 'absolute',
                top: 24 + 727 + 8 + 9 + 'px',
                left: '0',
              }"
            ></div>
          </div>
        </div>
      </div>

      <!-- Export Mode: block layout without transform/absolute/flex -->
      <div v-else class="w-full" style="padding: 16px 0">
        <div
          ref="exportContainerRef"
          :data-export-root="'pagination'"
          :style="{ width: CONTENT_WIDTH + 'px', margin: '0 auto' }"
        >
          <table
            :style="{
              width: '100%',
              borderCollapse: 'collapse',
              tableLayout: 'fixed',
              height: '744px',
            }"
          >
            <tbody>
              <tr>
                <td style="vertical-align: top; padding: 0; height: 727px">
                  <template
                    v-for="section in currentPageSections.filter((s: any) => s.type !== 'footer')"
                    :key="section.id"
                  >
                    <!-- Header -->
                    <div
                      v-if="section.type === 'header'"
                      :class="getSectionHighlightClass('header-section')"
                      @mouseenter="handleSectionHover('header-section')"
                      @mouseleave="handleSectionLeave"
                      @click.stop="handleSectionClick('header-section')"
                      :style="`margin-bottom: ${getSectionMarginBottom(section, 0)};`"
                    >
                      <!-- Title and Description (only show if not empty) -->
                      <div v-if="!shouldHeaderAlignLeft(section.content)">
                        <h1
                          v-if="section.content?.title"
                          :style="{
                            ...getDynamicStyle('header', 'title'),
                            fontWeight: '600',
                            margin: '0',
                          }"
                        >
                          {{ section.content.title }}
                        </h1>
                        <p
                          v-if="section.content?.description"
                          :style="{
                            ...getDynamicStyle('header', 'description'),
                            lineHeight: '9px',
                            margin: '0',
                          }"
                        >
                          {{ section.content.description }}
                        </p>
                      </div>

                      <!-- Logo Description -->
                      <p
                        v-if="section.content?.logoDescription"
                        :style="{
                          fontSize: '7px',
                          color: '#919191',
                          textAlign: shouldHeaderAlignLeft(section.content) ? 'left' : 'right',
                          margin: '4px 0 0 0',
                        }"
                      >
                        {{ section.content.logoDescription }}
                      </p>
                    </div>

                    <!-- Info Section - 完整的 section block -->
                    <div
                      v-if="section.type === 'info'"
                      :class="getSectionHighlightClass('info-section')"
                      @mouseenter="handleSectionHover('info-section')"
                      @mouseleave="handleSectionLeave"
                      @click.stop="handleSectionClick('info-section')"
                      :style="`margin-bottom: ${getSectionMarginBottom(section, 0)};`"
                    >
                      <!-- Section Title -->
                      <div v-if="section.content.sectionTitle" style="margin-bottom: 2px">
                        <p
                          :style="{
                            ...getDynamicStyle('info', 'title'),
                            fontWeight: getFontWeight(props.styleConfig?.info?.sectionTitleWeight),
                            lineHeight: '9px',
                            margin: '0',
                          }"
                        >
                          {{ section.content.sectionTitle }}
                        </p>
                      </div>

                      <!-- Items 按行渲染 - 使用表格布局 -->
                      <div
                        v-for="(row, rowIndex) in getInfoRows(section.content.items)"
                        :key="rowIndex"
                        style="margin-bottom: 4px"
                      >
                        <table
                          :style="
                            StyleCalculator.generateInfoSectionStyles(props.styleConfig || {})
                              .container
                          "
                        >
                          <tr>
                            <td
                              v-for="item in row"
                              :key="item.id"
                              :class="
                                item.isEmpty ? '' : getItemHighlightClass('info-section', item.id)
                              "
                              @mouseenter="
                                !item.isEmpty && handleItemHover('info-section', item.id)
                              "
                              @mouseleave="!item.isEmpty && handleItemLeave"
                              @click.stop="
                                !item.isEmpty && handleItemClick('info-section', item.id)
                              "
                              :style="getItemWidthStyle('info')"
                            >
                              <p
                                v-if="!item.isEmpty"
                                :style="{
                                  ...getDynamicStyle('info', 'label'),
                                  lineHeight: '9px',
                                  margin: '0',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }"
                              >
                                {{ item.label || '&nbsp;' }}
                              </p>
                              <p
                                v-if="!item.isEmpty"
                                :style="{
                                  ...getDynamicStyle('info', 'value'),
                                  lineHeight: '9px',
                                  margin: '0',
                                  paddingTop: '2px',
                                  wordWrap: 'break-word',
                                  whiteSpace: 'pre-wrap',
                                }"
                              >
                                {{ item.value || '&nbsp;' }}
                              </p>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>

                    <!-- Table (safe) -->
                    <div
                      v-if="section.type === 'table' && section.content.type !== 'summary'"
                      :class="getSectionHighlightClass('table-section-' + section.id)"
                      @mouseenter="handleSectionHover('table-section-' + section.id)"
                      @mouseleave="handleSectionLeave"
                      @click.stop="handleSectionClick('table-section-' + section.id)"
                      :style="`margin-bottom: ${getSectionMarginBottom(section, 0)};`"
                    >
                      <p
                        v-if="section.content.sectionTitle && section.content.showHeader !== false"
                        :style="{
                          fontSize: '7px',
                          color: props.styleConfig?.table?.sectionTitleColor || '#6b7280',
                          fontWeight: getFontWeight(props.styleConfig?.table?.sectionTitleWeight),
                          lineHeight: '9px',
                          margin: '0 0 2px',
                        }"
                      >
                        {{ section.content.sectionTitle }}
                      </p>
                      <p
                        v-if="
                          section.content.subsectionTitle && section.content.showHeader !== false
                        "
                        :style="{
                          fontSize: '7px',
                          fontWeight: getFontWeight(
                            props.styleConfig?.table?.subsectionTitleWeight,
                          ),
                          color: props.styleConfig?.table?.subsectionTitleColor || '#000000',
                          lineHeight: '9px',
                          margin: '0 0 2px',
                        }"
                      >
                        {{ section.content.subsectionTitle }}
                      </p>
                      <table style="width: 100%; border-collapse: collapse; table-layout: fixed">
                        <thead v-if="section.content.showHeader !== false">
                          <tr>
                            <th
                              v-for="(column, columnIndex) in section.content.columns || []"
                              :key="column.id"
                              :class="
                                getItemHighlightClass('table-section-' + section.id, column.id)
                              "
                              @mouseenter="
                                handleItemHover('table-section-' + section.id, column.id)
                              "
                              @mouseleave="handleItemLeave"
                              @click.stop="
                                handleItemClick('table-section-' + section.id, column.id)
                              "
                              :style="{
                                width: getColumnWidth(section.content.columns, column),
                                padding:
                                  columnIndex === 0
                                    ? `0 ${props.styleConfig?.table?.columnsPadding ?? 8}px 0 0`
                                    : columnIndex === (section.content.columns?.length || 1) - 1
                                      ? `0 0 0 ${props.styleConfig?.table?.columnsPadding ?? 8}px`
                                      : `0 ${props.styleConfig?.table?.columnsPadding ?? 8}px`,
                                'vertical-align': 'bottom',
                                'border-bottom': '1px solid #d2d2d2',
                                height: '13px',
                              }"
                            >
                              <span
                                :style="{
                                  display: 'block',
                                  width: '100%',
                                  fontSize: '7px',
                                  color: props.styleConfig?.table?.headerColor || '#919191',
                                  lineHeight: '9px',
                                  fontWeight: getFontWeight(
                                    props.styleConfig?.table?.columnNameWeight,
                                  ),
                                  textAlign: column.alignment === 'right' ? 'right' : 'left',
                                }"
                                >{{ column.name || 'Column Name' }}</span
                              >
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr
                            v-for="(row, rowIndex) in getTableRows(section.content)"
                            :key="row.id"
                            :class="
                              getItemHighlightClass(
                                'table-section-' + section.id,
                                'row-' + rowIndex,
                              )
                            "
                            @mouseenter="
                              handleItemHover('table-section-' + section.id, 'row-' + rowIndex)
                            "
                            @mouseleave="handleItemLeave"
                            @click.stop="
                              handleItemClick('table-section-' + section.id, 'row-' + rowIndex)
                            "
                          >
                            <td
                              v-for="(column, columnIndex) in section.content.columns || []"
                              :key="column.id"
                              :style="{
                                width: getColumnWidth(section.content.columns, column),
                                padding:
                                  columnIndex === 0
                                    ? `2px ${props.styleConfig?.table?.columnsPadding ?? 8}px 2px 0`
                                    : columnIndex === (section.content.columns?.length || 1) - 1
                                      ? `2px 0 2px ${props.styleConfig?.table?.columnsPadding ?? 8}px`
                                      : `2px ${props.styleConfig?.table?.columnsPadding ?? 8}px`,
                                'vertical-align': 'top',
                              }"
                            >
                              <p
                                class="font-normal"
                                :style="{
                                  fontSize: '7px',
                                  color: props.styleConfig?.table?.rowTextColor || '#000000',
                                  lineHeight: '9px',
                                  margin: '0',
                                  wordWrap: 'break-word',
                                  textAlign: column.alignment === 'right' ? 'right' : 'left',
                                  fontWeight: getFontWeight(
                                    props.styleConfig?.table?.rowTextWeight,
                                  ),
                                }"
                                :contenteditable="!props.exportMode"
                                v-ce-model="row.data[column.id]"
                                @input="onCellInput(section.content, row, column, $event)"
                              ></p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div
                        v-if="section.content.showBorder !== false"
                        style="border-bottom: 1px solid #d2d2d2; width: 100%"
                      ></div>
                      <div
                        v-if="section.content.showSubtotal !== false"
                        style="width: 100%; margin-top: 2px; text-align: right"
                      >
                        <span style="font-size: 7px; color: #919191">Subtotal </span>
                        <span style="font-size: 7px; font-weight: 600"
                          >${{ section.content.total || '0.00' }}</span
                        >
                      </div>
                    </div>

                    <!-- Summary -->
                    <div
                      v-if="section.type === 'table' && section.content.type === 'summary'"
                      :style="`margin-bottom: ${getSectionMarginBottom(section, 0)}; text-align: right;`"
                    >
                      <span
                        style="
                          font-size: 10px;
                          color: #919191;
                          font-weight: 600;
                          margin-right: 12px;
                        "
                        >Total USD</span
                      >
                      <span style="font-size: 14px; font-weight: 600"
                        >${{
                          (props.templateData.tables || [])
                            .reduce((sum: number, table: any) => sum + (table.total || 0), 0)
                            .toFixed(2)
                        }}</span
                      >
                    </div>

                    <!-- Description -->
                    <div
                      v-if="section.type === 'description'"
                      :class="getSectionHighlightClass('description-section')"
                      @mouseenter="handleSectionHover('description-section')"
                      @mouseleave="handleSectionLeave"
                      @click.stop="handleSectionClick('description-section')"
                      :style="`margin-bottom: ${getSectionMarginBottom(section, 0)};`"
                    >
                      <p
                        v-if="section.content?.sectionTitle"
                        style="font-size: 7px; font-weight: 600; margin: 0 0 2px"
                      >
                        {{ section.content.sectionTitle }}
                      </p>
                      <p
                        :style="{
                          fontSize: '7px',
                          lineHeight: getDynamicStyle('description', 'text').lineHeight || '1.2',
                          margin: '0',
                          wordWrap: 'break-word',
                          color: '#919191',
                        }"
                      >
                        {{ section.content?.content }}
                      </p>
                    </div>

                    <!-- Item Section - 在 export mode 中使用内联样式，与 Info Section 保持一致 -->
                    <div
                      v-if="section.type === 'item'"
                      :style="`margin-bottom: ${getSectionMarginBottom(section, 0)};`"
                      :class="getSectionHighlightClass('item-section')"
                      @mouseenter="handleSectionHover('item-section')"
                      @mouseleave="handleSectionLeave"
                      @click.stop="handleSectionClick('item-section')"
                    >
                      <!-- Section Title -->
                      <div v-if="section.content.sectionTitle" style="margin-bottom: 2px">
                        <p
                          :style="{
                            fontSize: '7px',
                            fontWeight: getFontWeight(props.styleConfig?.item?.sectionTitleWeight),
                            color: props.styleConfig?.item?.sectionTitleColor || '#6b7280',
                            lineHeight: '9px',
                            margin: '0',
                          }"
                        >
                          {{ section.content.sectionTitle }}
                        </p>
                      </div>

                      <!-- Items 按行渲染 - 使用表格布局 -->
                      <div
                        v-for="(row, rowIndex) in getItemRows(section.content.items)"
                        :key="rowIndex"
                        style="margin-bottom: 4px"
                      >
                        <table
                          :style="
                            StyleCalculator.generateItemSectionStyles(props.styleConfig || {})
                              .container
                          "
                        >
                          <tr>
                            <td
                              v-for="item in row"
                              :key="item.id"
                              :class="
                                item.isEmpty ? '' : getItemHighlightClass('item-section', item.id)
                              "
                              @mouseenter="
                                !item.isEmpty && handleItemHover('item-section', item.id)
                              "
                              @mouseleave="!item.isEmpty && handleItemLeave"
                              @click.stop="
                                !item.isEmpty && handleItemClick('item-section', item.id)
                              "
                              :style="getItemWidthStyle('item')"
                            >
                              <p
                                v-if="!item.isEmpty"
                                :style="{
                                  ...getDynamicStyle('item', 'label'),
                                  lineHeight: '9px',
                                  margin: '0',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }"
                              >
                                {{ item.label || '&nbsp;' }}
                              </p>
                              <p
                                v-if="!item.isEmpty"
                                :style="{
                                  ...getDynamicStyle('item', 'value'),
                                  lineHeight: '9px',
                                  margin: '0',
                                  paddingTop: '2px',
                                  wordWrap: 'break-word',
                                  whiteSpace: 'pre-wrap',
                                }"
                              >
                                {{ item.value || '&nbsp;' }}
                              </p>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>

                    <!-- H-Info Section - 在 export mode 中使用内联样式 -->
                    <div
                      v-if="section.type === 'hInfo'"
                      :style="`margin-bottom: ${getSectionMarginBottom(section, 0)};`"
                      :class="getSectionHighlightClass('h-info-section')"
                      @mouseenter="handleSectionHover('h-info-section')"
                      @mouseleave="handleSectionLeave"
                      @click.stop="handleSectionClick('h-info-section')"
                    >
                      <!-- Section Title -->
                      <div v-if="section.content.sectionTitle" style="margin-bottom: 2px">
                        <p
                          :style="{
                            fontSize: '7px',
                            fontWeight: getFontWeight(props.styleConfig?.hInfo?.sectionTitleWeight),
                            color: props.styleConfig?.hInfo?.sectionTitleColor || '#6b7280',
                            lineHeight: '9px',
                            margin: '0',
                          }"
                        >
                          {{ section.content.sectionTitle }}
                        </p>
                      </div>

                      <!-- Columns Container - 使用表格布局 -->
                      <table :style="getCompatibleHInfoStyles(section.content).container">
                        <tr>
                          <td
                            v-for="(column, columnIndex) in section.content.columns || []"
                            :key="column.id"
                            :style="getCompatibleHInfoStyles(section.content).column"
                          >
                            <div
                              v-for="item in column.items || []"
                              :key="item.id"
                              :class="getItemHighlightClass('h-info-section', item.id)"
                              @mouseenter="handleItemHover('h-info-section', item.id)"
                              @mouseleave="handleItemLeave"
                              @click.stop="handleItemClick('h-info-section', item.id)"
                              :style="getCompatibleHInfoStyles(section.content).item"
                            >
                              <!-- Horizontal Layout: Label and Value side by side -->
                              <template
                                v-if="
                                  (section.content.labelValueLayout || 'horizontal') ===
                                  'horizontal'
                                "
                              >
                                <table
                                  :style="getCompatibleHInfoStyles(section.content).itemContent"
                                >
                                  <tr>
                                    <td :style="getCompatibleHInfoStyles(section.content).label">
                                      <span
                                        :style="{
                                          fontSize: '7px',
                                          fontWeight: getFontWeight(
                                            props.styleConfig?.hInfo?.labelWeight,
                                          ),
                                          color: props.styleConfig?.hInfo?.labelColor || '#000000',
                                          lineHeight: '9px',
                                          whiteSpace: 'nowrap',
                                          overflow: 'hidden',
                                          textOverflow: 'ellipsis',
                                        }"
                                        >{{ item.label || '&nbsp;' }}</span
                                      >
                                    </td>
                                    <td :style="getCompatibleHInfoStyles(section.content).value">
                                      <span
                                        :style="{
                                          fontSize: '7px',
                                          fontWeight: getFontWeight(
                                            props.styleConfig?.hInfo?.valueWeight,
                                          ),
                                          color: props.styleConfig?.hInfo?.valueColor || '#919191',
                                          lineHeight: '9px',
                                          wordWrap: 'break-word',
                                          whiteSpace: 'pre-wrap',
                                        }"
                                        >{{ item.value || '&nbsp;' }}</span
                                      >
                                    </td>
                                  </tr>
                                </table>
                              </template>

                              <!-- Vertical Layout: Label above Value -->
                              <template v-else>
                                <div :style="getCompatibleHInfoStyles(section.content).itemContent">
                                  <div :style="getCompatibleHInfoStyles(section.content).label">
                                    <span
                                      :style="{
                                        fontSize: '7px',
                                        fontWeight: getFontWeight(
                                          props.styleConfig?.hInfo?.labelWeight,
                                        ),
                                        color: props.styleConfig?.hInfo?.labelColor || '#000000',
                                        lineHeight: '9px',
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                      }"
                                      >{{ item.label || '&nbsp;' }}</span
                                    >
                                  </div>
                                  <div :style="getCompatibleHInfoStyles(section.content).value">
                                    <span
                                      :style="{
                                        fontSize: '7px',
                                        fontWeight: getFontWeight(
                                          props.styleConfig?.hInfo?.valueWeight,
                                        ),
                                        color: props.styleConfig?.hInfo?.valueColor || '#919191',
                                        lineHeight: '9px',
                                        wordWrap: 'break-word',
                                      }"
                                      >{{ item.value || '&nbsp;' }}</span
                                    >
                                  </div>
                                </div>
                              </template>
                            </div>
                          </td>
                        </tr>
                      </table>
                    </div>
                  </template>
                </td>
              </tr>
              <tr>
                <td style="height: 7px"></td>
              </tr>
              <tr>
                <td style="vertical-align: bottom; padding: 0; height: 8px">
                  <div
                    v-if="currentPageSections.some((s: any) => s.type === 'footer')"
                    :class="getSectionHighlightClass('footer-section')"
                    @mouseenter="handleSectionHover('footer-section')"
                    @mouseleave="handleSectionLeave"
                    @click.stop="handleSectionClick('footer-section')"
                    style="width: 100%; display: table; table-layout: fixed"
                  >
                    <div style="display: table-row">
                      <div
                        v-if="getFooterContent()?.info"
                        style="
                          display: table-cell;
                          text-align: left;
                          font-size: 7px;
                          line-height: 9px;
                          color: #000000;
                        "
                      >
                        {{ getFooterContent().info }}
                      </div>
                      <div
                        v-if="getFooterContent()?.name"
                        style="
                          display: table-cell;
                          text-align: center;
                          font-size: 7px;
                          line-height: 9px;
                          color: #000000;
                        "
                      >
                        {{ getFooterContent().name }}
                      </div>
                      <div
                        style="
                          display: table-cell;
                          text-align: right;
                          font-size: 7px;
                          line-height: 9px;
                          color: #000000;
                        "
                      >
                        Page: {{ currentPage }} of {{ totalPages }}
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch, onMounted, onUnmounted, type Directive, nextTick } from 'vue'
import IconButton from './IconButton.vue'
import TextButton from './TextButton.vue'
import { usePdfInteraction } from '../composables/usePdfInteraction'
import { usePdfPagination, type SectionData } from '../composables/usePdfPagination'
import { OpenHTMLtoPDFAdapter } from '../css-compatibility/OpenHTMLtoPDFAdapter'
import { StyleCalculator } from '../css-compatibility/StyleCalculator'

interface SectionStates {
  header: boolean
  info: boolean
  table: boolean
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

interface StyleConfig {
  baseFontSize: number
  sectionGap: number
  sameTypeSectionGap: number
  summaryGap: number
  header: {
    titleColor: string
    titleSize: number
    titleWeight?: 'normal' | 'semibold' | 'bold'
    descriptionColor: string
    descriptionSize: number
    descriptionWeight?: 'normal' | 'semibold' | 'bold'
  }
  info: {
    sectionTitleColor: string
    sectionTitleWeight?: 'normal' | 'semibold' | 'bold'
    labelColor: string
    labelWeight?: 'normal' | 'semibold' | 'bold'
    valueColor: string
    valueWeight?: 'normal' | 'semibold' | 'bold'
    itemGap: number
    itemsPerRow?: 2 | 3 | 4 | 5
  }
  table: {
    sectionTitleColor: string
    sectionTitleWeight?: 'normal' | 'semibold' | 'bold'
    subsectionTitleColor: string
    subsectionTitleWeight?: 'normal' | 'semibold' | 'bold'
    headerColor: string
    columnNameWeight?: 'normal' | 'semibold' | 'bold'
    rowTextColor: string
    rowTextWeight?: 'normal' | 'semibold' | 'bold'
    borderColor: string
    rowHeight: number
    columnsPadding: number
  }
  description: {
    labelColor: string
    labelWeight?: 'normal' | 'semibold' | 'bold'
    textColor: string
    textWeight?: 'normal' | 'semibold' | 'bold'
    textSize: number
    lineHeight: number
  }
  item: {
    sectionTitleColor: string
    sectionTitleWeight?: 'normal' | 'semibold' | 'bold'
    labelColor: string
    labelWeight?: 'normal' | 'semibold' | 'bold'
    valueColor: string
    valueWeight?: 'normal' | 'semibold' | 'bold'
    itemGap: number
    itemsPerRow?: 2 | 3 | 4 | 5
  }
  footer: {
    textColor: string
    textSize: number
    textWeight?: 'normal' | 'semibold' | 'bold'
  }
  footerInfo?: {
    textColor: string
    textSize: number
    textWeight?: 'normal' | 'semibold' | 'bold'
  }
  footerName?: {
    textColor: string
    textSize: number
    textWeight?: 'normal' | 'semibold' | 'bold'
  }
  hInfo: {
    sectionTitleColor: string
    sectionTitleWeight?: 'normal' | 'semibold' | 'bold'
    labelColor: string
    labelWeight?: 'normal' | 'semibold' | 'bold'
    valueColor: string
    valueWeight?: 'normal' | 'semibold' | 'bold'
    labelWidth: number
    labelValueGap: number
    itemGap: number
    columnsPadding: number
  }
}

const props = defineProps<{
  sectionStates: SectionStates
  templateData: TemplateData
  styleConfig?: StyleConfig
  exportMode?: boolean
  selectedSection?: string | null
}>()

const emit = defineEmits<{
  'section-select': [sectionType: string | null]
}>()

// PDF interaction system
const {
  handleSectionHover,
  handleSectionLeave,
  handleItemHover,
  handleItemLeave,
  handleItemClick,
  getSectionHighlightClass,
  getItemHighlightClass,
} = usePdfInteraction(props.sectionStates)

// Handle section click with selection
const handleSectionClick = (sectionType: string) => {
  console.log('Section clicked:', sectionType)
  emit('section-select', sectionType)
}

// Handle background click to deselect
const handleBackgroundClick = () => {
  emit('section-select', null)
}

// PDF pagination system
const {
  pages,
  currentPage,
  totalPages,
  updatePagination,
  getPageSections,
  PAGE_WIDTH,
  PAGE_HEIGHT,
  CONTENT_WIDTH,
  CONTENT_HEIGHT,
  SECTION_GAP,
} = usePdfPagination()

// Zoom functionality and export mode
const zoomLevel = ref(1.2)
const containerRef = ref<HTMLElement>()
const exportContainerRef = ref<HTMLElement>()
const isExportMode = computed(() => props.exportMode === true)

// ----- WYSIWYG: 列宽调节与单元格编辑 -----
const resizingState = ref<{
  tableRef: any | null
  columnIndex: number
  startX: number
  startWidths: number[]
} | null>(null)

const getColumnWidth = (columns: any[], column: any) => {
  // 如果任意列有定义 width（百分比），按 width；否则平均分配
  if (columns && columns.some((c) => typeof c.width === 'number')) {
    const width = typeof column.width === 'number' ? column.width : 0
    return width + '%'
  }

  // HTML table cell paddings to preserve visual spacing
  const headerPadding = (columnIndex: number, length: number) => {
    const padding = props.styleConfig?.table?.columnsPadding ?? 8
    if (columnIndex === 0) return `0 ${padding}px 0 0` // pl-0 pr-2
    if (columnIndex === length - 1) return `0 0 0 ${padding}px` // pl-2 pr-0
    return `0 ${padding}px` // px-2
  }

  const cellPadding = (columnIndex: number, length: number) => {
    const padding = props.styleConfig?.table?.columnsPadding ?? 8
    if (columnIndex === 0) return `2px ${padding}px 2px 0` // pl-0 pr-2 with py-0.5
    if (columnIndex === length - 1) return `2px 0 2px ${padding}px` // pl-2 pr-0 with py-0.5
    return `2px ${padding}px` // px-2 with py-0.5
  }
  const percent = 100 / (columns?.length || 1)
  return percent + '%'
}

const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val))

const normalizeWidths = (widths: number[]) => {
  const sum = widths.reduce((s, v) => s + v, 0)
  if (Math.abs(sum - 100) < 0.001) return widths
  // 归一化为总和100
  return widths.map((v) => (v / sum) * 100)
}

const startResizing = (table: any, columnIndex: number, event: MouseEvent) => {
  if (!table || !table.columns || table.columns.length === 0) return
  const cols = table.columns
  let widths = cols.map((c: any) => (typeof c.width === 'number' ? c.width : 100 / cols.length))
  widths = normalizeWidths(widths)

  resizingState.value = {
    tableRef: table,
    columnIndex,
    startX: event.clientX,
    startWidths: widths,
  }

  window.addEventListener('mousemove', handleResizing)
  window.addEventListener('mouseup', stopResizing)
}

const handleResizing = (event: MouseEvent) => {
  const state = resizingState.value
  if (!state) return
  const table = state.tableRef
  if (!table || !table.columns) return

  const dx = event.clientX - state.startX
  // CONTENT_WIDTH 为 px，转为百分比调整：以内容宽度为基准
  const contentWidth = Number((CONTENT_WIDTH as unknown as number) || 1)
  const deltaPercent = (dx / contentWidth) * 100

  const i = state.columnIndex
  const j = i + 1
  const widths = [...state.startWidths]

  if (i < 0 || i >= widths.length) return
  if (j < 0 || j >= widths.length) return
  const wi = widths[i]
  const wj = widths[j]
  if (wi === undefined || wj === undefined) return

  // 只在相邻两列之间分配宽度，保持总和恒定
  const minCol = 5 // 每列最小百分比，避免为0
  const maxCol = 90

  const newI = clamp(wi + deltaPercent, minCol, maxCol)
  const diff = newI - wi
  const newJ = clamp(wj - diff, minCol, maxCol)

  // 如果右侧列不能再缩，回退
  if (Math.abs(newJ - wj) < Math.abs(diff)) {
    return
  }

  widths[i] = newI
  widths[j] = newJ

  const normalized = normalizeWidths(widths)
  // 写回到列定义
  normalized.forEach((w, idx) => {
    table.columns[idx].width = Math.round(w * 1000) / 1000 // 保留三位小数
  })
}

const stopResizing = () => {
  if (!resizingState.value) return
  window.removeEventListener('mousemove', handleResizing)
  window.removeEventListener('mouseup', stopResizing)
  resizingState.value = null
}

const onCellInput = (table: any, row: any, column: any, event: Event) => {
  const target = event.target as HTMLElement
  const text = target.textContent ?? ''
  if (!row || !row.data || !column) return
  row.data[column.id] = text
}

// contenteditable 指令，防止输入时光标回弹
type CeElement = HTMLElement & {
  __ceFocused?: boolean
  __ceComposing?: boolean
  __ceHandlers?: {
    focus: (e: Event) => void
    blur: (e: Event) => void
    compStart: (e: Event) => void
    compEnd: (e: Event) => void
  }
}

const vCeModel: Directive<CeElement, string | undefined> = {
  mounted(el, binding) {
    el.textContent = (binding.value ?? '') as string
    const onFocus = () => {
      el.__ceFocused = true
    }
    const onBlur = async () => {
      el.__ceFocused = false
      await nextTick()
      // 失焦后以绑定值为准进行一次同步
      if (typeof binding.value === 'string' && el.textContent !== binding.value) {
        el.textContent = binding.value
      }
    }
    const onCompStart = () => {
      el.__ceComposing = true
    }
    const onCompEnd = () => {
      el.__ceComposing = false
    }
    el.addEventListener('focus', onFocus)
    el.addEventListener('blur', onBlur)
    el.addEventListener('compositionstart', onCompStart)
    el.addEventListener('compositionend', onCompEnd)
    el.__ceHandlers = { focus: onFocus, blur: onBlur, compStart: onCompStart, compEnd: onCompEnd }
  },
  updated(el, binding) {
    // 输入法组合或聚焦期间不回写，避免光标跳动
    if (el.__ceFocused || el.__ceComposing) return
    const nextVal = (binding.value ?? '') as string
    if (el.textContent !== nextVal) {
      el.textContent = nextVal
    }
  },
  beforeUnmount(el) {
    if (el.__ceHandlers) {
      el.removeEventListener('focus', el.__ceHandlers.focus)
      el.removeEventListener('blur', el.__ceHandlers.blur)
      el.removeEventListener('compositionstart', el.__ceHandlers.compStart)
      el.removeEventListener('compositionend', el.__ceHandlers.compEnd)
      el.__ceHandlers = undefined
    }
  },
}

// 获取当前页面的sections
const currentPageSections = computed(() => {
  return getPageSections(currentPage.value)
})

// 判断 Header Section 是否应该左对齐（当 title 和 description 都为空时）
const shouldHeaderAlignLeft = (headerContent: any) => {
  return !headerContent?.title && !headerContent?.description
}

// 动态生成表格行数据
const getTableRows = (table: any) => {
  const baseRows = table.rows || []
  const rowsNumber = table.rowsNumber || 2
  const startRowIndex = table.startRowIndex || 0

  // 如果需要的行数大于现有行数，动态生成更多行
  if (rowsNumber + startRowIndex > baseRows.length) {
    const additionalRows = []
    for (let i = baseRows.length; i < rowsNumber + startRowIndex; i++) {
      const newRow = {
        id: `generated-${i + 1}`,
        data: {} as Record<string, string>,
        total: 0,
      }

      // 为每个列生成数据
      if (table.columns) {
        table.columns.forEach((column: any) => {
          // 使用第一行的数据作为模板，或者使用默认值
          const templateValue = baseRows[0]?.data[column.id] || 'Placeholder'
          newRow.data[column.id] = templateValue.replace(/\d+/, i + 1)
        })
      }

      additionalRows.push(newRow)
    }
    baseRows.push(...additionalRows)
  }

  // 如果是拆分的table，只返回对应的行
  if (table.isSecondPart) {
    return baseRows.slice(startRowIndex, startRowIndex + rowsNumber)
  }

  return baseRows.slice(0, rowsNumber)
}

// 获取footer内容
const getFooterContent = () => {
  const footerSection = currentPageSections.value.find((s) => s.type === 'footer')
  return footerSection?.content
}

// 获取动态样式 - 使用计算属性以利用Vue响应式系统
const getDynamicStyle = computed(() => {
  return (sectionType: string, elementType: string) => {
    if (!props.styleConfig) return {}

    const config = props.styleConfig
    switch (sectionType) {
      case 'header':
        if (elementType === 'title') {
          return {
            fontSize: `${config.header?.titleSize || 20}px`,
            color: config.header?.titleColor || '#0e171f',
          }
        } else if (elementType === 'description') {
          return {
            fontSize: `${config.header?.descriptionSize || 7}px`,
            color: config.header?.descriptionColor || '#919191',
          }
        }
        break
      case 'info':
        if (elementType === 'title') {
          return {
            fontSize: '7px',
            color: config.info?.sectionTitleColor || '#6b7280',
          }
        } else if (elementType === 'label') {
          return {
            fontSize: '7px',
            color: config.info?.labelColor || '#000000',
          }
        } else if (elementType === 'value') {
          return {
            fontSize: '7px',
            color: config.info?.valueColor || '#919191',
          }
        }
        break
      case 'table':
        if (elementType === 'title') {
          return {
            fontSize: '7px',
            color: config.table?.sectionTitleColor || '#6b7280',
          }
        } else if (elementType === 'subtitle') {
          return {
            fontSize: '7px',
            color: config.table?.subsectionTitleColor || '#000000',
          }
        } else if (elementType === 'header') {
          return {
            fontSize: '7px',
            color: config.table?.headerColor || '#919191',
          }
        } else if (elementType === 'cell') {
          return {
            fontSize: '7px',
            color: config.table?.rowTextColor || '#000000',
          }
        }
        break
      case 'description':
        if (elementType === 'label') {
          return {
            fontSize: '7px',
            color: config.description?.labelColor || '#000000',
          }
        } else if (elementType === 'text') {
          return {
            fontSize: `${config.description?.textSize || 7}px`,
            color: config.description?.textColor || '#919191',
            lineHeight: config.description?.lineHeight || 1.2,
          }
        }
        break
      case 'item':
        if (elementType === 'title') {
          return {
            fontSize: '7px',
            color: config.item?.sectionTitleColor || '#6b7280',
          }
        } else if (elementType === 'label') {
          return {
            fontSize: '7px',
            color: config.item?.labelColor || '#000000',
          }
        } else if (elementType === 'value') {
          return {
            fontSize: '7px',
            color: config.item?.valueColor || '#919191',
          }
        }
        break
      case 'footer':
        return {
          fontSize: `${config.footer?.textSize || 7}px`,
          color: config.footer?.textColor || '#000000',
        }
    }
    return {}
  }
})

// 计算section间距的函数 - 简化逻辑
const calculateSectionGap = (currentSection: any, prevSection: any, styleConfig?: any): number => {
  // 特殊规则：Summary 和 Table 之间使用专门的 summaryGap
  if (
    (currentSection?.content?.type === 'summary' && prevSection?.type === 'table') ||
    (currentSection?.type === 'table' && prevSection?.content?.type === 'summary')
  ) {
    return styleConfig?.summaryGap || 0 // Summary 和 Table 之间的专门间距
  }

  // 相同类型 section 间距
  if (currentSection?.type === prevSection?.type) {
    return styleConfig?.sameTypeSectionGap || 8 // 相同类型section间距
  }

  // 不同类型 section 间距（包括 Summary 和其他 section 类型）
  return styleConfig?.sectionGap || 10 // 不同类型section间距
}

// 检查是否是相同类型 - 简化逻辑
const isSameType = (currentSection: any, prevSection: any): boolean => {
  return currentSection?.type === prevSection?.type
}

// 计算section的底部间距
const getSectionMarginBottom = (section: any, index: number) => {
  const sections = currentPageSections.value.filter((s) => s.type !== 'footer')
  const currentIndex = sections.findIndex((s) => s.id === section.id)

  if (currentIndex === -1 || currentIndex === sections.length - 1) {
    return '0px' // 最后一个section不需要底部间距
  }

  const currentSection = sections[currentIndex]
  const nextSection = sections[currentIndex + 1]

  // 使用统一的间距计算逻辑（修复参数顺序）
  const gap = calculateSectionGap(nextSection, currentSection, props.styleConfig)
  return `${gap}px`
}

// 页面导航
const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

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
  const pdfWidth = PAGE_WIDTH // U.S. Letter width in pixels

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

// 监听模板数据变化，更新分页
watch(
  () => [props.templateData, props.sectionStates, props.styleConfig],
  () => {
    updatePagination(props.templateData, props.sectionStates, props.styleConfig)
  },
  { deep: true, immediate: true },
)

// 监听styleConfig变化，强制重新计算间距
watch(
  () => props.styleConfig,
  () => {
    // 强制重新计算所有section的间距
    nextTick(() => {
      // 触发响应式更新 - 重新计算分页
      updatePagination(props.templateData, props.sectionStates, props.styleConfig)
    })
  },
  { deep: true },
)

// 辅助函数：处理 Info section 的行渲染
const getInfoRows = (items: any[]) => {
  if (!items || items.length === 0) return []
  const itemsPerRow = props.styleConfig?.info?.itemsPerRow || 5
  const rows = []

  for (let i = 0; i < items.length; i += itemsPerRow) {
    const row = items.slice(i, i + itemsPerRow)
    // 填充空位到固定数量，确保每行都有固定数量的items
    while (row.length < itemsPerRow) {
      row.push({
        id: `empty-${i}-${row.length}`,
        label: '',
        value: '',
        isEmpty: true,
      })
    }
    rows.push(row)
  }
  return rows
}

// 辅助函数：处理 Item section 的行渲染
const getItemRows = (items: any[]) => {
  if (!items || items.length === 0) return []
  const itemsPerRow = props.styleConfig?.item?.itemsPerRow || 5
  const rows = []

  for (let i = 0; i < items.length; i += itemsPerRow) {
    const row = items.slice(i, i + itemsPerRow)
    // 填充空位到固定数量，确保每行都有固定数量的items
    while (row.length < itemsPerRow) {
      row.push({
        id: `empty-${i}-${row.length}`,
        label: '',
        value: '',
        isEmpty: true,
      })
    }
    rows.push(row)
  }
  return rows
}

// H-Info Section 样式计算函数
const getHInfoColumnContainerStyle = (hInfoSection: any) => {
  const columnsPadding = props.styleConfig?.hInfo?.columnsPadding || 8
  return {
    display: 'flex',
    gap: `${columnsPadding}px`,
    width: '100%',
  }
}

const getHInfoColumnStyle = (hInfoSection: any) => {
  const columnWidth = hInfoSection.columnWidth || '1/2'
  const itemGap = props.styleConfig?.hInfo?.itemGap || 4

  let widthPercent = 50 // 默认 1/2
  if (columnWidth === '1/3') widthPercent = 33.33
  else if (columnWidth === '1/4') widthPercent = 25

  return {
    width: `${widthPercent}%`,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: `${itemGap}px`,
  }
}

const getHInfoColumnWidthStyle = (hInfoSection: any) => {
  const columnWidth = hInfoSection.columnWidth || '1/2'

  if (columnWidth === '1/3') return '33.33%'
  else if (columnWidth === '1/4') return '25%'
  else return '50%' // 默认 1/2
}

// 动态计算字体粗细
const getFontWeight = (weight: 'normal' | 'semibold' | 'bold' | undefined): number => {
  switch (weight) {
    case 'semibold':
      return 600
    case 'bold':
      return 700
    default:
      return 400
  }
}

// 兼容性计算函数
const getCompatibleItemWidthStyle = (section: 'info' | 'item') => {
  const itemsPerRow =
    section === 'info'
      ? props.styleConfig?.info?.itemsPerRow || 5
      : props.styleConfig?.item?.itemsPerRow || 5
  const gap =
    section === 'info'
      ? (props.styleConfig?.info?.itemGap ?? 2)
      : (props.styleConfig?.item?.itemGap ?? 2)

  // 使用固定宽度，与预览模式保持一致
  // 预览模式使用 calc(20% - 0.8px)，这里使用20%
  const fixedWidth = 100 / itemsPerRow

  return {
    display: 'table-cell',
    width: `${fixedWidth}%`,
    paddingRight: `${gap}px`,
    verticalAlign: 'top',
  }
}

const getCompatibleHInfoStyles = (hInfoConfig: any) => {
  return StyleCalculator.generateHInfoSectionStyles(props.styleConfig || {}, hInfoConfig)
}

// 格式化文本，将换行符转换为HTML <br> 标签
const formatTextWithBreaks = (text: string) => {
  if (!text) return '&nbsp;'
  return text.split('\n').join('<br>')
}

// 根据 itemsPerRow 和 itemGap 计算单项宽度
const getItemWidthStyle = (section: 'info' | 'item') => {
  if (props.exportMode) {
    return getCompatibleItemWidthStyle(section)
  }

  // 预览模式使用原有逻辑
  const itemsPerRow =
    section === 'info'
      ? props.styleConfig?.info?.itemsPerRow || 5
      : props.styleConfig?.item?.itemsPerRow || 5
  const gap =
    section === 'info'
      ? (props.styleConfig?.info?.itemGap ?? 2)
      : (props.styleConfig?.item?.itemGap ?? 2)
  // 总宽度100%，列数 itemsPerRow，列之间有 (itemsPerRow - 1) 个gap，平均到每列
  const gapPerCol = ((itemsPerRow - 1) * gap) / itemsPerRow
  return {
    width: `calc(${100 / itemsPerRow}% - ${gapPerCol}px)`,
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
/* ===== BASE STYLES ===== */
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

/* ===== UTILITY CLASSES ===== */
/* Text alignment utilities */
.text-right {
  text-align: right;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

/* Table utilities */
.table-column-header,
.table-cell {
  min-width: 0;
  word-wrap: break-word;
}

/* ===== SECTION-SPECIFIC STYLES ===== */
/* Header Section */
.header-section .logo-container {
  position: relative;
}

/* Footer Section */
.footer-section {
  position: relative;
}

.footer-section > div {
  position: relative;
}

/* ===== COLOR UTILITIES ===== */
.text-\[#5b7282\] {
  color: #5b7282;
}

.text-\[#919191\] {
  color: #919191;
}

.border-\[#d2d2d2\] {
  border-color: #d2d2d2;
}

/* ===== INFO SECTION ===== */
.info-section {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.info-section-title {
  font-size: 7px;
  font-weight: 600;
  color: #6b7280;
  line-height: 9px;
  margin: 0;
}

.info-items-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
}

.info-item {
  width: calc(20% - 0.8px);
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.info-item-label {
  font-size: 7px;
  font-weight: 600;
  color: #000000;
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

/* ===== DESCRIPTION SECTION ===== */
.description-content {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.description-label {
  font-size: 7px;
  font-weight: 600;
  color: #000000;
  line-height: 9px;
  margin: 0;
  white-space: nowrap;
}

.description-text {
  font-size: 7px;
  font-weight: 400;
  color: #919191;
  line-height: 9px;
  margin: 0;
  min-width: 0;
  word-wrap: break-word;
}

/* ===== ITEM SECTION ===== */
.item-section {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.item-section-title {
  font-size: 7px;
  font-weight: 600;
  color: #6b7280;
  line-height: 9px;
  margin: 0;
}

.item-items-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2px;
}

.item-item {
  width: calc(20% - 0.8px);
  display: flex;
  flex-direction: column;
  gap: 2px;
  min-width: 0;
}

.item-item-label {
  font-size: 7px;
  font-weight: 600;
  color: #000000;
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

/* ===== SPACING UTILITIES ===== */
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

/* ===== DIMENSION UTILITIES ===== */
/* Heights */
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

/* Line heights */
.leading-2\.25 {
  line-height: 0.5625rem;
}

.leading-4\.25 {
  line-height: 1.0625rem;
}

.leading-6 {
  line-height: 1.5rem;
}

/* Widths */
.w-60 {
  width: 15rem;
}

.w-12\.5 {
  width: 3.125rem;
}

/* ===== LAYOUT UTILITIES ===== */
/* Padding */
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

/* Borders */
.border-\[#d2d2d2\] {
  border-color: #d2d2d2;
}

.border-b {
  border-bottom-width: 1px;
}

/* ===== TYPOGRAPHY UTILITIES ===== */
/* Font weights */
.font-semibold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
}

.font-normal {
  font-weight: 400;
}

/* ===== LAYOUT UTILITIES (continued) ===== */
/* Overflow handling */
.overflow-hidden {
  overflow: hidden;
}

.overflow-clip {
  overflow: clip;
}

/* Positioning */
.relative {
  position: relative;
}

.absolute {
  position: absolute;
}

/* Transforms */
.-translate-y-1\/2 {
  transform: translateY(-50%);
}

/* ===== TABLE UTILITIES ===== */
/* Table row consistency */
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

/* ===== INTERACTION EFFECTS ===== */
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

/* ===== H-INFO SECTION STYLES ===== */
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
  white-space: pre-wrap;
  flex: 1;
}
</style>
