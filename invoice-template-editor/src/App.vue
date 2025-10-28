<script setup lang="ts">
import { ref, reactive, watch, onMounted, computed, provide, onUnmounted, nextTick } from 'vue'
import PdfPaginationPreview from './components/PdfPaginationPreview.vue'
import PdfConfigPanel from './components/PdfConfigPanel.vue'
import PdfStylePanel from './components/PdfStylePanel.vue'
import TextButton from './components/TextButton.vue'
import ConfirmDialog from './components/ConfirmDialog.vue'
import NotificationManager from './components/NotificationManager.vue'
import { useConfirmDialog } from './composables/useConfirmDialog'
import { useUndoSystem } from './composables/useUndoSystem'
import type { TemplateData } from './types/section'

// Local storage key names
const STORAGE_KEY = 'invoice-template-editor-data'
const STORAGE_VERSION = '1.1.0'

// Responsive detection
const windowWidth = ref(window.innerWidth)
const isMobile = computed(() => windowWidth.value < 1280)

// Notification manager reference
const notificationManager = ref()

// Right panel tabs state
type RightTab = 'config' | 'style'
const activeRightTab = ref<RightTab>('config')

// Export mode (for WYSIWYG DOM export)
const exportMode = ref(false)

// Preview refresh key for forcing component re-render
const previewKey = ref(0)

// Selected section for style panel
const selectedSection = ref<string | null>(null)

// Style configuration for PDF Template (colors, fonts, spacing)
const styleConfig = reactive({
  baseFontSize: 7,
  sectionGap: 10,
  sameTypeSectionGap: 8,
  summaryGap: 0,
  header: {
    titleColor: '#0e171f',
    titleSize: 20,
    titleWeight: 'semibold' as const,
    descriptionColor: '#919191',
    descriptionSize: 7,
    descriptionWeight: 'normal' as const,
  },
  info: {
    sectionTitleColor: '#6b7280',
    sectionTitleWeight: 'semibold' as const,
    labelColor: '#000000',
    labelWeight: 'semibold' as const,
    valueColor: '#919191',
    valueWeight: 'normal' as const,
    itemGap: 2,
    itemsPerRow: 5 as const,
    itemsSpacing: 4,
    labelValueGap: 2,
  },
  table: {
    sectionTitleColor: '#6b7280',
    subsectionTitleColor: '#000000',
    headerColor: '#919191',
    columnNameWeight: 'semibold' as const,
    rowTextColor: '#000000',
    borderColor: '#d2d2d2',
    rowHeight: 13,
    columnsPadding: 4,
  },
  description: {
    labelColor: '#000000',
    labelWeight: 'semibold' as const,
    textColor: '#919191',
    textWeight: 'normal' as const,
    textSize: 7,
    lineHeight: 1.2,
  },
  item: {
    sectionTitleColor: '#6b7280',
    sectionTitleWeight: 'semibold' as const,
    labelColor: '#000000',
    labelWeight: 'semibold' as const,
    valueColor: '#919191',
    valueWeight: 'normal' as const,
    itemGap: 2,
    itemsPerRow: 5 as const,
    itemsSpacing: 4,
    labelValueGap: 2,
  },
  footer: {
    textColor: '#000000',
    textSize: 7,
    textWeight: 'normal' as const,
  },
  footerInfo: {
    textColor: '#000000',
    textSize: 7,
    textWeight: 'normal' as const,
  },
  footerName: {
    textColor: '#000000',
    textSize: 7,
    textWeight: 'normal' as const,
  },
  hInfo: {
    sectionTitleColor: '#6b7280',
    sectionTitleWeight: 'semibold' as const,
    labelColor: '#000000',
    labelWeight: 'semibold' as const,
    valueColor: '#919191',
    valueWeight: 'normal' as const,
    labelWidth: 80,
    labelValueGap: 8,
    itemGap: 4,
    columnsPadding: 8,
  },
})

// Import file input ref
const importFileInputRef = ref<HTMLInputElement | null>(null)

// Active sections count
const activeSectionsCount = computed(() => {
  return Object.values(sectionStates.value).filter(Boolean).length
})

// Global confirm dialog
const confirmDialog = useConfirmDialog()

// Undo system
const undoSystem = useUndoSystem()

// Provide confirm dialog to child components
provide('confirmDialog', confirmDialog)

// Listen for window size changes
const handleResize = () => {
  windowWidth.value = window.innerWidth
}

// Cleanup event listeners
const cleanup = () => {
  window.removeEventListener('resize', handleResize)
}

// Component state management
const sectionStates = ref({
  header: true,
  info: true,
  hInfo: true,
  table: true,
  description: true,
  item: true,
  footer: true,
})

// Template data
const templateData = reactive<TemplateData>({
  header: {
    title: 'Invoice',
    description: 'Description',
    logo: '',
    companyName: '',
    logoSize: 'default', // 'default' | 'large'
    logoDescription: '',
  },
  info: [
    {
      id: '1',
      sectionTitle: 'Section title 1',
      items: [
        { id: '1', label: 'Invoice #', value: 'INV-001' },
        { id: '2', label: 'Date', value: '2024-01-01' },
        { id: '3', label: 'Due Date', value: '2024-01-31' },
        { id: '4', label: 'Client', value: 'Client Name' },
        { id: '5', label: 'Address', value: '123 Main St' },
      ],
    },
    {
      id: '2',
      sectionTitle: 'Section title 2',
      items: [
        { id: '6', label: 'Label', value: 'Value' },
        { id: '7', label: 'Label', value: 'Value' },
      ],
    },
  ],
  tables: [
    {
      id: '1',
      sectionTitle: 'Section title',
      subsectionTitle: 'Subsection title',
      columns: [
        {
          id: '1',
          name: 'Column Name',
          type: 'text',
          alignment: 'left' as 'left' | 'right',
          width: 100,
        },
        {
          id: '2',
          name: 'Column Name',
          type: 'text',
          alignment: 'left' as 'left' | 'right',
          width: 100,
        },
        {
          id: '3',
          name: 'Column Name',
          type: 'text',
          alignment: 'left' as 'left' | 'right',
          width: 100,
        },
        {
          id: '4',
          name: 'Column Name',
          type: 'text',
          alignment: 'right' as 'left' | 'right',
          width: 100,
        },
        {
          id: '5',
          name: 'Total',
          type: 'currency',
          alignment: 'right' as 'left' | 'right',
          width: 100,
        },
      ],
      rows: [
        {
          id: '1',
          data: {
            '1': 'Line 1',
            '2': 'Line 1',
            '3': 'Line 1',
            '4': 'Line 1',
            '5': '100',
          },
          total: 100,
        },
        {
          id: '2',
          data: {
            '1': 'Line 2',
            '2': 'Line 2',
            '3': 'Line 2',
            '4': 'Line 2',
            '5': '200',
          },
          total: 200,
        },
        {
          id: '3',
          data: {
            '1': 'Line 3',
            '2': 'Line 3',
            '3': 'Line 3',
            '4': 'Line 3',
            '5': '300',
          },
          total: 300,
        },
        {
          id: '4',
          data: {
            '1': 'Line 4',
            '2': 'Line 4',
            '3': 'Line 4',
            '4': 'Line 4',
            '5': '400',
          },
          total: 400,
        },
        {
          id: '5',
          data: {
            '1': 'Line 5',
            '2': 'Line 5',
            '3': 'Line 5',
            '4': 'Line 5',
            '5': '500',
          },
          total: 500,
        },
      ],
      total: 0,
      rowsNumber: 2,
      showSubtotal: true,
    },
    {
      id: '2',
      sectionTitle: 'Section title 2',
      subsectionTitle: 'Subsection title 2',
      columns: [
        {
          id: '1',
          name: 'Column Name',
          type: 'text',
          alignment: 'left' as 'left' | 'right',
          width: 100,
        },
        {
          id: '2',
          name: 'Column Name',
          type: 'text',
          alignment: 'left' as 'left' | 'right',
          width: 100,
        },
        {
          id: '3',
          name: 'Column Name',
          type: 'text',
          alignment: 'left' as 'left' | 'right',
          width: 100,
        },
        {
          id: '4',
          name: 'Column Name',
          type: 'text',
          alignment: 'right' as 'left' | 'right',
          width: 100,
        },
        {
          id: '5',
          name: 'Total',
          type: 'currency',
          alignment: 'right' as 'left' | 'right',
          width: 100,
        },
      ],
      rows: [
        {
          id: '1',
          data: {
            '1': 'Line 1',
            '2': 'Line 1',
            '3': 'Line 1',
            '4': 'Line 1',
            '5': '100',
          },
          total: 100,
        },
        {
          id: '2',
          data: {
            '1': 'Line 2',
            '2': 'Line 2',
            '3': 'Line 2',
            '4': 'Line 2',
            '5': '200',
          },
          total: 200,
        },
      ],
      total: 0,
      rowsNumber: 2,
      showSubtotal: true,
    },
  ],
  description: [
    {
      id: '1',
      sectionTitle: 'Description Section 1',
      content:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    {
      id: '2',
      sectionTitle: 'Description Section 2',
      content:
        'Second description section content. This is another description section to test same type section gap functionality.',
    },
  ],
  item: [
    {
      id: '1',
      sectionTitle: 'Section title 1',
      items: [
        { id: '1', label: 'Label', value: 'Value' },
        { id: '2', label: 'Label', value: 'Value' },
      ],
    },
    {
      id: '2',
      sectionTitle: 'Section title 2',
      items: [
        { id: '3', label: 'Label', value: 'Value' },
        { id: '4', label: 'Label', value: 'Value' },
      ],
    },
  ],
  hInfo: [
    {
      id: '1',
      sectionTitle: 'H-Info Section',
      labelValueLayout: 'horizontal' as 'horizontal' | 'vertical',
      columns: [
        {
          id: '1',
          items: [
            { id: '1', label: 'Label', value: 'Value' },
            { id: '2', label: 'Label', value: 'Value' },
          ],
        },
        {
          id: '2',
          items: [
            { id: '3', label: 'Label', value: 'Value' },
            { id: '4', label: 'Label', value: 'Value' },
          ],
        },
      ],
    },
  ],
  footer: {
    info: '',
    name: '',
  },
})

// Local storage functionality
const saveToLocalStorage = () => {
  try {
    const dataToSave = {
      version: STORAGE_VERSION,
      sections: sectionStates.value,
      data: templateData,
      styleConfig: styleConfig,
      lastSaved: new Date().toISOString(),
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dataToSave))
    console.log('Data saved to local storage')
    return true
  } catch (error) {
    console.error('Failed to save to local storage:', error)
    return false
  }
}

// Manual save with notification
const handleManualSave = () => {
  const success = saveToLocalStorage()
  if (success) {
    showNotification('保存成功', 'success')
  } else {
    showNotification('保存失败，请重试', 'error')
  }
}

// Validate imported JSON structure
const validateImportedData = (payload: any) => {
  if (!payload || typeof payload !== 'object') return '文件内容不是有效的 JSON 对象'
  if (!payload.data || !payload.sections) return '缺少必要字段：data 或 sections'
  if (typeof payload.sections !== 'object') return 'sections 字段格式不正确'
  if (typeof payload.data !== 'object') return 'data 字段格式不正确'
  return null
}

// Migrate imported data to current schema if needed (no-op for 1.0.0)
const migrateImportedData = (payload: any) => {
  // 预留版本迁移点
  return payload
}

// Handle JSON import
const importJsonTemplate = async () => {
  if (importFileInputRef.value) {
    importFileInputRef.value.value = ''
    importFileInputRef.value.click()
  }
}

const handleImportFileChange = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files && input.files[0]
  if (!file) return
  try {
    if (file.size > 2 * 1024 * 1024) {
      showNotification('文件过大，限制为 2MB', 'error')
      return
    }
    const text = await file.text()
    const parsed = JSON.parse(text)
    const error = validateImportedData(parsed)
    if (error) {
      showNotification(`导入失败：${error}`, 'error')
      return
    }
    const migrated = migrateImportedData(parsed)
    // 覆盖 sectionStates 和 templateData
    Object.assign(sectionStates.value, migrated.sections)
    Object.assign(templateData, migrated.data)
    // 保存历史节点
    undoSystem.saveState(sectionStates.value, templateData, styleConfig)
    saveToLocalStorage()
    showNotification('模板导入成功', 'success')
  } catch (e) {
    console.error('Import failed:', e)
    showNotification('导入失败，请确认文件为导出的 JSON 模板', 'error')
  } finally {
    if (importFileInputRef.value) importFileInputRef.value.value = ''
  }
}

const loadFromLocalStorage = () => {
  try {
    const savedData = localStorage.getItem(STORAGE_KEY)
    if (savedData) {
      const parsedData = JSON.parse(savedData)

      // 检查版本兼容性并处理数据迁移
      if (parsedData.version === STORAGE_VERSION) {
        // 当前版本 - 正常恢复
        if (parsedData.sections) {
          sectionStates.value = {
            ...sectionStates.value, // 保留默认值（包含新的 hInfo）
            ...parsedData.sections, // 覆盖已保存的值
          }
        }
      } else if (parsedData.version === '1.0.0') {
        // 迁移旧版本数据 - 添加新的 section states
        if (parsedData.sections) {
          const migratedSections = {
            ...parsedData.sections,
            hInfo: true, // 添加新的 hInfo section
          }
          sectionStates.value = {
            ...sectionStates.value, // 保留默认值
            ...migratedSections, // 使用迁移后的数据
          }
        }
        console.log('Migrated data from version 1.0.0 to 1.1.0')
        showNotification('Data migrated to new version', 'info')
      } else {
        console.warn('Storage data version mismatch, using default data')
        showNotification('Data version updated, using default configuration', 'info')
      }

      // Restore template data (适用于所有版本)
      if (parsedData.data) {
        // 确保 header.logoDescription 有默认值（向后兼容）
        if (parsedData.data.header && !parsedData.data.header.logoDescription) {
          parsedData.data.header.logoDescription = ''
        }
        Object.assign(templateData, parsedData.data)
      }

      // Restore style config (适用于所有版本)
      if (parsedData.styleConfig) {
        Object.assign(styleConfig, parsedData.styleConfig)
      }

      console.log('Data loaded from local storage')
      showNotification('Restored previous editing data', 'success')
      return true
    }
  } catch (error) {
    console.error('Failed to load from local storage:', error)
    showNotification('Failed to load saved data, using default configuration', 'error')
  }
  return false
}

// Export JSON template
const exportJsonTemplate = () => {
  try {
    const exportData = {
      sections: sectionStates.value,
      data: templateData,
      metadata: {
        createdAt: new Date().toISOString(),
        version: '1.0.0',
        description: 'Invoice Template Configuration',
        totalSections: Object.values(sectionStates.value).filter(Boolean).length,
      },
    }

    const dataStr = JSON.stringify(exportData, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)

    // Generate filename (with timestamp)
    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
    const filename = `invoice-template-${timestamp}.json`

    const link = document.createElement('a')
    link.href = url
    link.download = filename
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    // Show success message
    showNotification('JSON template exported successfully!', 'success')
  } catch (error) {
    console.error('Export failed:', error)
    showNotification('Export failed, please try again', 'error')
  }
}

// HTML 格式化函数
const formatHtml = (html: string): string => {
  let formatted = html
  let indent = 0
  const indentStr = '  '

  // 处理自闭合标签
  formatted = formatted.replace(/<([^>]+)\/>/g, '<$1 />')

  // 分割标签和内容
  const parts = formatted.split(/(<[^>]*>)/g)
  const result: string[] = []

  for (let i = 0; i < parts.length; i++) {
    const part = parts[i]
    if (!part) continue

    if (part.startsWith('<')) {
      // 这是标签
      if (part.startsWith('</')) {
        // 闭合标签，减少缩进
        indent = Math.max(0, indent - 1)
        result.push(indentStr.repeat(indent) + part)
      } else if (part.endsWith('/>') || part.endsWith(' />')) {
        // 自闭合标签，不改变缩进
        result.push(indentStr.repeat(indent) + part)
      } else {
        // 开始标签，增加缩进
        result.push(indentStr.repeat(indent) + part)
        if (!part.includes('</') && !part.endsWith('/>')) {
          indent++
        }
      }
    } else if (part.trim()) {
      // 这是文本内容
      result.push(indentStr.repeat(indent) + part)
    }
  }

  return result.join('\n')
}

// Export HTML template (Simplified - Direct DOM export)
const exportHtmlTemplate = async () => {
  try {
    // 1) Switch to export mode to render OpenHTMLtoPDF-safe DOM
    exportMode.value = true
    await nextTick()

    // 2) Capture the rendered DOM from paginated preview export container
    const container = document.querySelector(
      '[data-export-root="pagination"]',
    ) as HTMLElement | null
    if (!container) throw new Error('Export container not found')
    const cloned = container.cloneNode(true) as HTMLElement

    // 3) Remove any interactive attributes
    cloned
      .querySelectorAll('[contenteditable]')
      .forEach((el) => el.removeAttribute('contenteditable'))

    cloned.querySelectorAll('[draggable]').forEach((el) => el.removeAttribute('draggable'))

    // 4) Remove all data-* and aria-* attributes for cleaner HTML
    const removeAttributes = (element: HTMLElement) => {
      const attributesToRemove = []
      for (let i = 0; i < element.attributes.length; i++) {
        const attr = element.attributes[i]
        if (
          attr.name.startsWith('data-') ||
          attr.name.startsWith('aria-') ||
          attr.name === 'role'
        ) {
          attributesToRemove.push(attr.name)
        }
      }
      attributesToRemove.forEach((attrName) => element.removeAttribute(attrName))

      // Process children
      Array.from(element.children).forEach((child) => {
        if (child instanceof HTMLElement) {
          removeAttributes(child)
        }
      })
    }

    removeAttributes(cloned)

    // 5) Convert images to data URLs to avoid remote loading issues
    const inlineImages = async () => {
      const imgEls = Array.from(cloned.querySelectorAll('img')) as HTMLImageElement[]
      for (const img of imgEls) {
        const src = img.getAttribute('src') || ''
        if (!src) {
          img.remove()
          continue
        }
        if (src.startsWith('data:')) continue
        try {
          const resp = await fetch(src, { mode: 'cors' })
          const blob = await resp.blob()
          const dataUrl = await new Promise<string>((resolve, reject) => {
            const reader = new FileReader()
            reader.onload = () => resolve(String(reader.result || ''))
            reader.onerror = reject
            reader.readAsDataURL(blob)
          })
          img.setAttribute('src', dataUrl)
        } catch (e) {
          // fallback: remove image to prevent renderer failure
          img.remove()
        }
      }
    }
    await inlineImages()

    const inner = cloned.innerHTML

    // 6) Restore normal preview mode
    exportMode.value = false
    await nextTick()

    // 7) Clean up HTML and ensure XHTML compliance
    const sanitized = inner
      // ensure <br> and <img> are self-closed for XHTML
      .replace(/<br(\s*?)>/g, '<br$1 />')
      .replace(/<img([^>]*?)(?<!\/)>/g, '<img$1 />')

    // 8) Format HTML code
    const formattedBody = formatHtml(sanitized)

    // 9) Wrap as XHTML document for OpenHTMLtoPDF
    const doc = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <style type="text/css">
    @page { size: 612px 792px; margin: 0; }
    html, body { margin: 0; padding: 0; }
    body { font-family: Arial, sans-serif; font-size: 7px; color: #000; }
    table { width: 100%; border-collapse: collapse; table-layout: fixed; }
    td, th { vertical-align: top; padding: 0; }
    p { margin: 0; line-height: 9px; }
  </style>
  <title>Invoice Template</title>
</head>
<body>
${formattedBody}
</body>
</html>`

    const blob = new Blob([doc], { type: 'text/html' })
    const url = URL.createObjectURL(blob)

    const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-')
    const filename = `invoice-template-${timestamp}.html`

    const a = document.createElement('a')
    a.href = url
    a.download = filename
    a.style.display = 'none'
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    showNotification('HTML template exported successfully!', 'success')
  } catch (error) {
    console.error('Export failed:', error)
    showNotification('Export failed, please try again', 'error')
  }
}

// Generate pages with pagination logic for HTML export
const generatePagesWithPagination = (data: any, sections: any) => {
  const PAGE_WIDTH = 612
  const PAGE_HEIGHT = 792
  const PAGE_PADDING = 24
  const CONTENT_HEIGHT = 727 // 固定高度727px
  const SECTION_GAP = 8 // 8px section间距

  const pages: any[] = []
  let currentPageSections: any[] = []
  let currentPageHeight = 0
  let pageNumber = 1

  // 获取可见的sections
  const visibleSections = []
  if (sections.header && data.header) {
    visibleSections.push({
      type: 'header',
      content: data.header,
      height: 48,
    })
  }

  if (sections.info && data.info) {
    const infoHeight = 9 + (data.info.items ? Math.ceil(data.info.items.length / 5) * 18 : 0)
    visibleSections.push({
      type: 'info',
      content: data.info,
      height: infoHeight,
    })
  }

  if (sections.table && data.tables && data.tables.length > 0) {
    data.tables.forEach((table: any) => {
      const tableHeight =
        9 + (table.subsectionTitle ? 9 : 0) + 13 + (table.rowsNumber || 2) * 13 + 13 + 1
      visibleSections.push({
        type: 'table',
        content: table,
        height: tableHeight,
      })
    })
  }

  if (sections.description && data.description) {
    const descHeight = 9 + Math.ceil((data.description.content || '').length / 60) * 9
    visibleSections.push({
      type: 'description',
      content: data.description,
      height: descHeight,
    })
  }

  if (sections.item && data.item) {
    const itemHeight = 9 + (data.item.items ? Math.ceil(data.item.items.length / 5) * 18 : 0)
    visibleSections.push({
      type: 'item',
      content: data.item,
      height: itemHeight,
    })
  }

  // 添加Summary section - 在table和description之间
  if (sections.table && data.tables && data.tables.length > 0) {
    // 找到table section的索引
    const tableIndex = visibleSections.findIndex((s) => s.type === 'table')
    if (tableIndex !== -1) {
      // 在table section之后插入summary section
      visibleSections.splice(tableIndex + 1, 0, {
        type: 'summary',
        content: {
          total: data.tables.reduce((sum: number, table: any) => sum + (table.total || 0), 0),
        },
        height: 18,
      })
    }
  }

  const footerSection =
    sections.footer && data.footer
      ? {
          type: 'footer',
          content: data.footer,
          height: 9,
        }
      : null

  // 分页逻辑
  for (let i = 0; i < visibleSections.length; i++) {
    const section = visibleSections[i]
    if (!section) continue

    const gap = currentPageSections.length > 0 ? SECTION_GAP : 0
    const sectionHeightWithGap = section.height + gap

    // 检查是否需要新页面
    if (currentPageHeight + sectionHeightWithGap > CONTENT_HEIGHT) {
      // 如果是table section，尝试拆分
      if (section.type === 'table') {
        const splitResult = splitTableSectionForHtml(section, currentPageHeight, CONTENT_HEIGHT)

        if (splitResult.firstPart) {
          // 添加第一部分到当前页面
          currentPageSections.push(splitResult.firstPart)
          currentPageHeight += splitResult.firstPartHeight + gap
        }

        // 保存当前页面
        const pageSections = [...currentPageSections]
        if (footerSection) {
          pageSections.push(footerSection)
        }
        pages.push({
          id: `page-${pageNumber}`,
          sections: pageSections,
          totalHeight: currentPageHeight,
          pageNumber: pageNumber,
        })

        // 开始新页面
        pageNumber++
        currentPageSections = []
        currentPageHeight = 0

        // 添加第二部分到新页面
        if (splitResult.secondPart) {
          currentPageSections.push(splitResult.secondPart)
          currentPageHeight += splitResult.secondPartHeight
        }

        // 为新页面添加footer
        if (footerSection) {
          currentPageSections.push(footerSection)
          currentPageHeight += footerSection.height
        }
      } else {
        // 非table section，正常分页
        // 保存当前页面
        const pageSections = [...currentPageSections]
        if (footerSection) {
          pageSections.push(footerSection)
        }
        pages.push({
          id: `page-${pageNumber}`,
          sections: pageSections,
          totalHeight: currentPageHeight,
          pageNumber: pageNumber,
        })

        // 开始新页面
        pageNumber++
        currentPageSections = []
        currentPageHeight = 0

        // 添加section到新页面
        currentPageSections.push(section)
        currentPageHeight += sectionHeightWithGap

        // 为新页面添加footer
        if (footerSection) {
          currentPageSections.push(footerSection)
          currentPageHeight += footerSection.height
        }
      }
    } else {
      // 添加section到当前页面
      currentPageSections.push(section)
      currentPageHeight += sectionHeightWithGap
    }
  }

  // 添加最后一页
  if (currentPageSections.length > 0) {
    const pageSections = [...currentPageSections]
    if (footerSection) {
      pageSections.push(footerSection)
    }
    pages.push({
      id: `page-${pageNumber}`,
      sections: pageSections,
      totalHeight: currentPageHeight,
      pageNumber: pageNumber,
    })
  }

  return pages
}

// Split table section for HTML export
const splitTableSectionForHtml = (
  section: any,
  currentPageHeight: number,
  contentHeight: number,
) => {
  const table = section.content
  const availableHeight = contentHeight - currentPageHeight

  // 计算table各部分的高度
  let titleHeight = 0
  let subtitleHeight = 0
  const headerHeight = 13
  const rowHeight = 13
  const subtotalHeight = 13
  const borderHeight = 1

  if (table.sectionTitle) titleHeight = 9
  if (table.subsectionTitle) subtitleHeight = 9

  // 计算第一部分可以包含多少行
  let firstPartRows = 0
  let firstPartHeight = titleHeight + subtitleHeight + headerHeight

  const rowsNumber = table.rowsNumber || 2
  for (let i = 0; i < rowsNumber; i++) {
    if (firstPartHeight + rowHeight <= availableHeight) {
      firstPartRows++
      firstPartHeight += rowHeight
    } else {
      break
    }
  }

  // 如果第一部分可以包含所有行，则不需要拆分
  if (firstPartRows >= rowsNumber) {
    return {
      firstPart: section,
      firstPartHeight: section.height,
      secondPart: null,
      secondPartHeight: 0,
    }
  }

  // 创建第一部分（包含标题、子标题、表头、部分数据行）
  const firstPart = {
    ...section,
    id: `${section.id}-part1`,
    content: {
      ...table,
      rowsNumber: firstPartRows,
      isFirstPart: true,
      showHeader: true, // 显示标题、副标题、表头
      showSubtotal: false, // 不显示小计和边框
      showBorder: false,
    },
    height: firstPartHeight,
  }

  // 创建第二部分（只包含剩余数据行、小计、边框）
  const secondPartRows = rowsNumber - firstPartRows
  const secondPartHeight = secondPartRows * rowHeight + subtotalHeight + borderHeight

  const secondPart = {
    ...section,
    id: `${section.id}-part2`,
    content: {
      ...table,
      rowsNumber: secondPartRows,
      startRowIndex: firstPartRows,
      isSecondPart: true,
      showHeader: false, // 不显示标题、副标题、表头
      showSubtotal: true, // 显示小计和边框
      showBorder: true,
    },
    height: secondPartHeight,
  }

  return {
    firstPart,
    firstPartHeight,
    secondPart,
    secondPartHeight,
  }
}

// Generate HTML template content with pagination support
const generateHtmlTemplate = () => {
  const { sections, data } = { sections: sectionStates.value, data: templateData }

  // 使用PDF分页逻辑生成页面
  const pages = generatePagesWithPagination(data, sections)

  let htmlContent = `
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml" lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Invoice Template</title>
    <style type="text/css">
        @page {
            size: 612px 792px;
            margin: 23px;
        }

        body {
            margin: 0;
            padding: 15px;
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 12px;
            line-height: 1.2;
            min-height: 762px; /* 792px - 30px padding */
            width: 612px; /* PDF页面宽度 */
            max-width: 612px; /* 限制最大宽度 */
            word-wrap: break-word; /* 允许长单词换行 */
            overflow-wrap: break-word; /* 现代浏览器的换行支持 */
            white-space: normal; /* 确保文本可以换行 */
        }

        .invoice-container {
            width: 582px; /* 内容区域宽度 (612px - 15px*2) */
            min-height: 722px; /* 762px - 40px padding */
            position: relative;
        }

        .page-break {
            page-break-before: always;
        }

        .section-spacer {
            height: 6px;
        }

        .section-spacer td {
            height: 6px;
        }

        .header-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 6px;
        }

        .header-table td {
            vertical-align: top;
            padding: 0;
        }

        .header-title {
            font-size: 20px;
            font-weight: bold;
            color: #000000;
            line-height: 24px;
        }

        .header-description {
            font-size: 7px;
            color: #000000;
            line-height: 9px;
            margin-top: 1px;
        }

        .logo-container {
            text-align: right;
            width: 240px;
        }

        .logo-container.default img {
            height: 48px;
            width: 240px;
        }

        .logo-container.large img {
            height: 72px; /* 48px * 1.5 */
            width: 240px;
        }

        .logo-placeholder {
            border: 1px dashed #000000;
            text-align: center;
            color: #919191;
            font-size: 7px;
            line-height: 9px;
            height: 48px;
            width: 240px;
        }

        .logo-placeholder td {
            text-align: center;
            height: 48px;
            width: 240px;
        }

        .info-section-title {
            font-size: 7px;
            font-weight: 600;
            color: #6b7280;
            line-height: 9px;
            margin-bottom: 2px;
        }

        .info-items-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
        }

        .info-items-table td {
            width: 20%;
            padding: 0 8px; /* 上下0px，左右8px */
            vertical-align: top; /* 顶部对齐 */
        }

        .info-items-table td:first-child {
            padding-left: 0; /* 第一列左边无间距 */
        }

        .info-items-table td:last-child {
            padding-right: 0; /* 最后一列右边无间距 */
        }

        .info-items-table tr:not(:first-child) td {
            padding-top: 2px;
        }

        .info-item-label {
            font-size: 7px;
            font-weight: 600;
            color: #000000;
            line-height: 9px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
        }

        .info-item-value {
            font-size: 7px;
            font-weight: 400;
            color: #919191;
            line-height: 9px;
            margin-top: 2px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
        }

        .table-section-title {
            font-size: 7px;
            font-weight: 600;
            color: #6b7280;
            line-height: 9px;
            margin-bottom: 2px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
        }

        .table-subsection-title {
            font-size: 7px;
            font-weight: 600;
            color: #000000;
            line-height: 9px;
            margin-bottom: 2px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
        }

        .data-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
        }

        .data-table th,
        .data-table td {
            padding: 2px 8px; /* 上下2px，左右8px */
            font-size: 7px;
            line-height: 9px;
            height: 13px;
            word-wrap: break-word; /* 允许长单词换行 */
            overflow-wrap: break-word; /* 现代浏览器的换行支持 */
            white-space: normal; /* 确保文本可以换行 */
            vertical-align: top; /* 顶部对齐 */
        }

        .data-table th:first-child,
        .data-table td:first-child {
            width: 25%;
            padding-left: 0; /* 第一列左边无间距 */
        }

        .data-table th:nth-child(2),
        .data-table td:nth-child(2) {
            width: 25%;
        }

        .data-table th:nth-child(3),
        .data-table td:nth-child(3) {
            width: 25%;
        }

        .data-table th:last-child,
        .data-table td:last-child {
            width: 25%;
            padding-right: 0; /* 最后一列右边无间距 */
        }

        .data-table th {
            font-weight: 500;
            text-align: left;
            color: #6b7280;
            border-bottom: 1px solid #d2d2d2;
        }

        .data-table th.text-right {
            text-align: right;
        }

        .data-table td {
            text-align: left;
            color: #000000;
        }

        .data-table td.text-right {
            text-align: right;
        }

        .subtotal-table {
            width: 100%;
            border-collapse: collapse;
        }

        .subtotal-table td {
            padding: 0;
            font-size: 7px;
            line-height: 9px;
            border-top: 1px solid #d2d2d2;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
            vertical-align: top; /* 顶部对齐 */
        }

        .subtotal-value {
            font-weight: 600;
            text-align: right;
            color: #919191;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
        }

        .summary-table {
            width: 100%;
            border-collapse: collapse;
        }

        .summary-table td {
            padding: 0;
            vertical-align: top; /* 顶部对齐 */
            text-align: right;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
        }

        .summary-content {
            font-size: 14px;
            font-weight: 600;
            color: #000000;
            line-height: 17px;
            margin-top: 2px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
        }

        .summary-label {
            font-size: 10px;
            font-weight: 600;
            color: #000000;
            line-height: 9px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
        }

        .description-label {
            font-size: 7px;
            font-weight: 600;
            color: #000000;
            line-height: 9px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
        }

        .description-text {
            font-size: 7px;
            font-weight: 400;
            color: #919191;
            line-height: 9px;
            margin-top: 2px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
        }

        .item-section-title {
            font-size: 7px;
            font-weight: 600;
            color: #6b7280;
            line-height: 9px;
            margin-bottom: 2px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
        }

        .item-items-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
        }

        .item-items-table td {
            padding: 0 8px; /* 上下0px，左右8px */
            vertical-align: top; /* 顶部对齐 */
            width: 20%;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
        }

        .item-items-table td:first-child {
            padding-left: 0; /* 第一列左边无间距 */
        }

        .item-items-table td:last-child {
            padding-right: 0; /* 最后一列右边无间距 */
        }

        .item-item-label {
            font-size: 7px;
            font-weight: 600;
            color: #000000;
            line-height: 9px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
        }

        .item-item-value {
            font-size: 7px;
            font-weight: 400;
            color: #919191;
            line-height: 9px;
            margin-top: 2px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
        }

        .footer-section {
            width: 100%;
            border-collapse: collapse;
            position: absolute;
            bottom: -40px;
            left: 0;
        }

        .footer-section td {
            padding: 0;
            font-size: 7px;
            line-height: 9px;
            word-wrap: break-word;
            overflow-wrap: break-word;
            white-space: normal;
            vertical-align: top; /* 顶部对齐 */
        }

        .footer-info {
            text-align: left;
        }

        .footer-name {
            text-align: center;
        }

        .footer-page {
            text-align: right;
        }

        tr, tfoot {
            page-break-inside: avoid;
        }
    </style>
</head>
<body>
`

  // 生成每一页的内容
  pages.forEach((page, pageIndex) => {
    if (pageIndex > 0) {
      htmlContent += `<div class="page-break"></div>`
    }

    htmlContent += `
    <table class="invoice-container">
        <tr>
            <td>
`

    // 生成页面中的每个section
    page.sections.forEach((section: any) => {
      if (section.type === 'header') {
        htmlContent += generateHeaderSection(section.content)
      } else if (section.type === 'info') {
        htmlContent += generateInfoSection(section.content)
      } else if (section.type === 'table') {
        htmlContent += generateTableSection(section.content)
      } else if (section.type === 'summary') {
        htmlContent += generateSummarySection(section.content)
      } else if (section.type === 'description') {
        htmlContent += generateDescriptionSection(section.content)
      } else if (section.type === 'item') {
        htmlContent += generateItemSection(section.content)
      } else if (section.type === 'footer') {
        htmlContent += generateFooterSection(section.content, page.pageNumber, pages.length)
      }
    })

    htmlContent += `
            </td>
        </tr>
    </table>
`
  })

  htmlContent += `
</body>
</html>
  `

  return htmlContent
}

// Generate header section HTML
const generateHeaderSection = (header: any) => {
  const hasTitleOrDescription = header.title || header.description
  const logoAlign = hasTitleOrDescription ? 'right' : 'left'

  return `
        <table class="header-table">
            <tr>
                ${
                  hasTitleOrDescription
                    ? `
                <td>
                    ${header.title ? `<span class="header-title">${header.title}</span>` : ''}
                    ${header.description ? `<span class="header-description">${header.description}</span>` : ''}
                </td>
                `
                    : ''
                }
                <td class="logo-container ${header.logoSize === 'large' ? 'large' : 'default'}" ${!hasTitleOrDescription ? 'colspan="2"' : ''}>
                    ${
                      header.logo
                        ? `<img src="${header.logo}" alt="Logo" style="object-position: ${logoAlign};" />`
                        : `<table class="logo-placeholder"><tr><td>Logo Placeholder</td></tr></table>`
                    }
                    ${header.logoDescription ? `<div class="logo-description" style="font-size: 7px; color: #919191; text-align: ${logoAlign}; margin-top: 4px;">${header.logoDescription}</div>` : ''}
                </td>
            </tr>
        </table>
    `
}

// Generate info section HTML
const generateInfoSection = (info: any) => {
  let html = `
        ${info.sectionTitle ? `<span class="info-section-title">${info.sectionTitle}</span>` : ''}
        <table class="info-items-table">
            <tr>
    `
  if (info.items && info.items.length > 0) {
    info.items.forEach((item: any, index: number) => {
      if (index > 0 && index % 5 === 0) {
        html += `
            </tr>
            <tr>
          `
      }
      html += `
                <td style="width: 20%;">
                    <span class="info-item-label">${item.label || ''}</span>
                    <span class="info-item-value">${item.value || ''}</span>
                </td>
        `
    })
    // 填充剩余的空单元格
    const remainingCells = 5 - (info.items.length % 5)
    if (remainingCells < 5) {
      for (let i = 0; i < remainingCells; i++) {
        html += `
                <td style="width: 20%;"></td>
          `
      }
    }
  }
  html += `
            </tr>
        </table>
    `
  return html
}

// Generate table section HTML with pagination support
const generateTableSection = (table: any) => {
  let html = ''

  // 根据分页状态决定是否显示标题和副标题
  if (table.showHeader !== false) {
    html += `
        ${table.sectionTitle ? `<span class="table-section-title">${table.sectionTitle}</span>` : ''}
        ${table.subsectionTitle ? `<span class="table-subsection-title">${table.subsectionTitle}</span>` : ''}
    `
  }

  html += `
        <table class="data-table">
    `

  // 根据分页状态决定是否显示表头
  if (table.showHeader !== false) {
    html += `
            <thead>
                <tr>
        `
    if (table.columns && table.columns.length > 0) {
      {
        const weights = table.columns.map((c: any) => (typeof c.width === 'number' ? c.width : 100))
        const total = weights.reduce((a: number, b: number) => a + b, 0) || 1
        table.columns.forEach((column: any, columnIndex: number) => {
          const w = typeof column.width === 'number' ? column.width : 100
          const width = (w / total) * 100
          html += `
                        <th class="${column.alignment === 'right' ? 'text-right' : ''}" style="width: ${width}%;">${column.name || 'Column Name'}</th>
            `
        })
      }
    }
    html += `
                </tr>
            </thead>
        `
  }

  html += `
            <tbody>
      `

  if (table.rows && table.rows.length > 0) {
    // 获取要显示的行数据
    const rowsToShow = getTableRowsForPage(table)

    rowsToShow.forEach((row: any) => {
      html += `
                <tr>
          `
      if (table.columns && table.columns.length > 0) {
        {
          const weights = table.columns.map((c: any) =>
            typeof c.width === 'number' ? c.width : 100,
          )
          const total = weights.reduce((a: number, b: number) => a + b, 0) || 1
          table.columns.forEach((column: any, columnIndex: number) => {
            const value = row.data[column.id] || ''
            const w = typeof column.width === 'number' ? column.width : 100
            const width = (w / total) * 100
            html += `
                    <td class="${column.alignment === 'right' ? 'text-right' : ''}" style="width: ${width}%;">${value}</td>
              `
          })
        }
      }
      html += `
                </tr>
          `
    })
  }

  html += `
            </tbody>
        </table>
    `

  // 根据分页状态决定是否显示小计
  if (table.showSubtotal !== false && table.total !== null && table.total !== undefined) {
    html += `
        <table class="subtotal-table">
            <tr>
        `
    if (table.columns && table.columns.length > 0) {
      table.columns.forEach((column: any, columnIndex: number) => {
        if (columnIndex === table.columns.length - 1) {
          html += `
                        <td class="subtotal-value">Subtotal $${(table.total || 0).toFixed(2)}</td>
                `
        } else {
          html += `
                        <td></td>
                `
        }
      })
    }
    html += `
            </tr>
        </table>
    `
  }

  return html
}

// Get table rows for current page (with pagination support)
const getTableRowsForPage = (table: any) => {
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

  // 返回当前页面应该显示的行
  return baseRows.slice(startRowIndex, startRowIndex + rowsNumber)
}

// Generate summary section HTML
const generateSummarySection = (summary: any) => {
  return `
        <table class="summary-table">
            <tr>
                <td>
                    <span class="summary-label">Total USD</span>
                    <span class="summary-content">$${summary.total.toFixed(2)}</span>
                </td>
            </tr>
        </table>
    `
}

// Generate description section HTML
const generateDescriptionSection = (description: any) => {
  return `
        ${description.sectionTitle ? `<span class="description-label">${description.sectionTitle}</span>` : ''}
        <span class="description-text">${description.content || 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'}</span>
    `
}

// Generate item section HTML
const generateItemSection = (item: any) => {
  let html = `
        ${item.sectionTitle ? `<span class="item-section-title">${item.sectionTitle}</span>` : ''}
        <table class="item-items-table">
            <tr>
    `
  if (item.items && item.items.length > 0) {
    item.items.forEach((itemData: any, index: number) => {
      if (index > 0 && index % 5 === 0) {
        html += `
            </tr>
            <tr>
          `
      }
      html += `
                <td style="width: 20%;">
                    <span class="item-item-label">${itemData.label || ''}</span>
                    <span class="item-item-value">${itemData.value || ''}</span>
                </td>
        `
    })
    // 填充剩余的空单元格
    const remainingCells = 5 - (item.items.length % 5)
    if (remainingCells < 5) {
      for (let i = 0; i < remainingCells; i++) {
        html += `
                <td style="width: 20%;"></td>
          `
      }
    }
  }
  html += `
            </tr>
        </table>
    `
  return html
}

// Generate footer section HTML
const generateFooterSection = (footer: any, currentPage: number, totalPages: number) => {
  const footerInfoStyle = {
    fontSize: styleConfig.footerInfo.textSize + 'px',
    color: styleConfig.footerInfo.textColor,
    fontWeight:
      (styleConfig.footerInfo.textWeight as string) === 'semibold'
        ? '600'
        : (styleConfig.footerInfo.textWeight as string) === 'bold'
          ? '700'
          : '400',
  }
  const footerNameStyle = {
    fontSize: styleConfig.footerName.textSize + 'px',
    color: styleConfig.footerName.textColor,
    fontWeight:
      (styleConfig.footerName.textWeight as string) === 'semibold'
        ? '600'
        : (styleConfig.footerName.textWeight as string) === 'bold'
          ? '700'
          : '400',
  }

  return `
        <table class="footer-section">
            <tr>
                <td class="footer-info" style="font-size: ${footerInfoStyle.fontSize}; color: ${footerInfoStyle.color}; font-weight: ${footerInfoStyle.fontWeight};">${footer.info || ''}</td>
                <td class="footer-name" style="font-size: ${footerNameStyle.fontSize}; color: ${footerNameStyle.color}; font-weight: ${footerNameStyle.fontWeight};">${footer.name || ''}</td>
                <td class="footer-page">Page: ${currentPage} of ${totalPages}</td>
            </tr>
        </table>
    `
}

// Show notification message
const showNotification = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
  if (notificationManager.value) {
    notificationManager.value.addNotification(message, type)
  }
}

// Auto save functionality
let saveTimeout: number | null = null
const autoSave = () => {
  if (saveTimeout) {
    clearTimeout(saveTimeout)
  }
  saveTimeout = setTimeout(() => {
    saveToLocalStorage()
  }, 1000) // Auto save after 1 second
}

// Listen for data changes, auto save and save to history
watch(
  [sectionStates, templateData, styleConfig],
  () => {
    autoSave()
    // 保存到历史记录（延迟保存，避免频繁操作）
    setTimeout(() => {
      undoSystem.saveState(sectionStates.value, templateData, styleConfig)
    }, 100)
  },
  { deep: true },
)

// Restore data when page loads
onMounted(() => {
  loadFromLocalStorage()
  window.addEventListener('resize', handleResize)
  // 初始化时保存当前状态到历史记录
  undoSystem.saveState(sectionStates.value, templateData, styleConfig)
})

// Update template data function
const updateTemplateData = (newData: any) => {
  console.log('App.vue: updateTemplateData called', newData)
  // 更新 reactive 对象的属性
  Object.assign(templateData, newData)
  console.log('App.vue: templateData updated', templateData)
}

// Undo function
const handleUndo = () => {
  const previousState = undoSystem.undo()
  if (previousState) {
    // 恢复section states
    Object.assign(sectionStates.value, previousState.sectionStates)
    // 恢复template data
    Object.assign(templateData, previousState.templateData)
    // 恢复style config
    Object.assign(styleConfig, previousState.styleConfig)
    showNotification('已回撤到上一步', 'success')
  }
}

// Redo function
const handleRedo = () => {
  const nextState = undoSystem.redo()
  if (nextState) {
    // 恢复section states
    Object.assign(sectionStates.value, nextState.sectionStates)
    // 恢复template data
    Object.assign(templateData, nextState.templateData)
    // 恢复style config
    Object.assign(styleConfig, nextState.styleConfig)
    showNotification('已前进到下一步', 'success')
  }
}

// Refresh preview function
const handleRefreshPreview = () => {
  previewKey.value++
}

// Handle section selection
const handleSectionSelect = (sectionType: string | null) => {
  selectedSection.value = sectionType
}

// Save data before page unload and clear history
window.addEventListener('beforeunload', () => {
  saveToLocalStorage()
  undoSystem.clearHistory()
})

// Cleanup on unmount
onUnmounted(() => {
  cleanup()
  undoSystem.clearHistory()
})
</script>

<template>
  <div
    class="h-full w-full bg-white overflow-hidden flex flex-col"
    style="width: 100% !important; height: 100% !important; overflow-x: hidden !important"
  >
    <!-- Header Title -->
    <header class="bg-white shadow-sm border-b border-[#d3ddde] flex-shrink-0 min-h-[72px]">
      <div class="w-full h-full px-4 py-4">
        <div class="flex justify-between items-center gap-2 h-full">
          <div class="flex items-center gap-2">
            <!-- BTDS Logo Placeholder -->
            <div class="h-8 w-8 bg-[#FF761F] rounded flex items-center justify-center">
              <span class="text-white font-bold text-sm">BT</span>
            </div>
            <div>
              <h1 class="text-lg font-semibold text-[#0e171f]">PDF Template Editor</h1>
              <p class="text-[9px] text-color-919191">@Matthew Li</p>
            </div>
          </div>

          <!-- Status Indicators and Export Buttons -->
          <div class="flex items-center gap-4">
            <div class="flex items-center gap-2">
              <div class="w-2 h-2 bg-[#FF761F] rounded-full animate-pulse"></div>
              <span class="text-sm text-[#0e171f]">Auto Save</span>
            </div>
            <div class="h-6 w-px bg-[#d3ddde]"></div>
            <!-- Undo/Redo Buttons -->
            <div class="flex items-center gap-1">
              <!-- Undo Button -->
              <TextButton
                @click="handleUndo"
                :disabled="!undoSystem.canUndo()"
                variant="default"
                size="sm"
                class="!px-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  ></path>
                </svg>
              </TextButton>
              <!-- Redo Button -->
              <TextButton
                @click="handleRedo"
                :disabled="!undoSystem.canRedo()"
                variant="default"
                size="sm"
                class="!px-2"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M21 10H11a8 8 0 00-8 8v2M21 10l-6 6m6-6l-6-6"
                  ></path>
                </svg>
              </TextButton>
            </div>
            <div class="h-6 w-px bg-[#d3ddde]"></div>
            <!-- Save Button -->
            <TextButton
              @click="handleManualSave"
              variant="default"
              size="sm"
              class="bg-[#FF761F] text-white hover:bg-[#e66a1a]"
            >
              <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Save
            </TextButton>
            <div class="h-6 w-px bg-[#d3ddde]"></div>
            <!-- Export Buttons -->
            <div class="flex items-center gap-2">
              <TextButton @click="importJsonTemplate" variant="default" size="sm">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 14V8m0 0l-3 3m3-3l3 3M5 20h14a2 2 0 002-2V7.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0014.586 1H7a2 2 0 00-2 2v15a2 2 0 002 2z"
                  />
                </svg>
                Import JSON
              </TextButton>
              <TextButton @click="exportJsonTemplate" variant="default" size="sm">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                Export JSON
              </TextButton>
              <TextButton @click="exportHtmlTemplate" variant="primary" size="sm">
                <svg class="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  ></path>
                </svg>
                Export HTML
              </TextButton>
              <!-- Hidden file input for JSON import -->
              <input
                ref="importFileInputRef"
                type="file"
                accept="application/json"
                class="hidden"
                @change="handleImportFileChange"
              />
            </div>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content Area -->
    <main
      class="w-full flex-1 overflow-hidden bg-white"
      style="overflow-x: hidden !important; padding: 20px 40px 0 40px"
    >
      <div class="flex flex-col xl:flex-row h-full w-full gap-5">
        <!-- Left PDF Preview Area (70%) -->
        <div
          class="flex-1 xl:flex-none"
          :style="isMobile ? 'height: 50vh;' : 'flex: 0 0 calc(70% - 10px); height: 100%;'"
        >
          <div class="h-full bg-white rounded-xl shadow-lg border border-[#d3ddde] overflow-hidden">
            <PdfPaginationPreview
              :key="previewKey"
              :section-states="sectionStates"
              :template-data="templateData"
              :style-config="styleConfig"
              :export-mode="exportMode"
              :selected-section="selectedSection"
              @section-select="handleSectionSelect"
            />
          </div>
        </div>

        <!-- Right Configuration Area (30%) -->
        <div
          class="flex-1 xl:flex-none"
          :style="
            isMobile ? 'height: 50vh;' : 'flex: 0 0 calc(30% - 10px); height: 100%; min-width: 0;'
          "
        >
          <div class="h-full flex flex-col">
            <!-- Tabs Header -->
            <div
              class="flex items-center gap-3 w-full border-b border-[#d3ddde] bg-white/60 backdrop-blur-sm p-5"
            >
              <TextButton
                :variant="activeRightTab === 'config' ? 'secondary' : 'default'"
                size="md"
                @click="activeRightTab = 'config'"
              >
                Configuration Panel
              </TextButton>
              <TextButton
                :variant="activeRightTab === 'style' ? 'secondary' : 'default'"
                size="md"
                @click="activeRightTab = 'style'"
              >
                PDF Style
              </TextButton>
            </div>

            <!-- Right Panel Body -->
            <div class="flex-1 overflow-y-auto overflow-x-hidden">
              <template v-if="activeRightTab === 'config'">
                <PdfConfigPanel
                  v-model:sectionStates="sectionStates"
                  :templateData="templateData"
                  @update:templateData="updateTemplateData"
                />
              </template>
              <template v-else>
                <PdfStylePanel
                  :model-value="styleConfig"
                  @update:model-value="
                    (newStyleConfig: any) => Object.assign(styleConfig, newStyleConfig)
                  "
                  :selected-section="selectedSection"
                  @refresh-preview="handleRefreshPreview"
                />
              </template>
            </div>
          </div>
        </div>
      </div>
    </main>

    <!-- Global Confirm Dialog -->
    <ConfirmDialog
      v-model:visible="confirmDialog.isVisible.value"
      :message="confirmDialog.message.value"
      @confirm="confirmDialog.handleConfirm"
      @cancel="confirmDialog.handleCancel"
    />

    <!-- Notification Manager -->
    <NotificationManager ref="notificationManager" />
  </div>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

/* 禁用横向滚动 */
* {
  overflow-x: hidden !important;
}

/* 确保主要内容区域不会产生横向滚动 */
main {
  overflow-x: hidden !important;
}

/* 确保所有子元素也不会产生横向滚动 */
main > * {
  overflow-x: hidden !important;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
