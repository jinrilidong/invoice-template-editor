import { ref, reactive } from 'vue'

interface SectionMapping {
  pdfSection: string
  configSection: string
  configElementId: string
}

export function usePdfInteraction(sectionStates?: any) {
  const highlightedSection = ref<string | null>(null)
  const highlightedItem = ref<string | null>(null)
  const configPanelRef = ref<HTMLElement | null>(null)
  const hoverTimeout = ref<number | null>(null)

  // Section mapping between PDF sections and config panel elements
  const sectionMappings: SectionMapping[] = [
    {
      pdfSection: 'header-section',
      configSection: 'header',
      configElementId: 'config-header-section',
    },
    { pdfSection: 'info-section', configSection: 'info', configElementId: 'config-info-section' },
    {
      pdfSection: 'h-info-section',
      configSection: 'hInfo',
      configElementId: 'config-h-info-section',
    },
    {
      pdfSection: 'table-section',
      configSection: 'table',
      configElementId: 'config-table-section',
    },
    {
      pdfSection: 'table-section-0',
      configSection: 'table',
      configElementId: 'config-table-0-section',
    },
    {
      pdfSection: 'table-section-1',
      configSection: 'table',
      configElementId: 'config-table-1-section',
    },
    {
      pdfSection: 'table-section-2',
      configSection: 'table',
      configElementId: 'config-table-2-section',
    },
    {
      pdfSection: 'table-section-3',
      configSection: 'table',
      configElementId: 'config-table-3-section',
    },
    {
      pdfSection: 'table-section-4',
      configSection: 'table',
      configElementId: 'config-table-4-section',
    },
    {
      pdfSection: 'table-section-table-0',
      configSection: 'table',
      configElementId: 'config-table-0-section',
    },
    {
      pdfSection: 'table-section-table-1',
      configSection: 'table',
      configElementId: 'config-table-1-section',
    },
    {
      pdfSection: 'table-section-table-2',
      configSection: 'table',
      configElementId: 'config-table-2-section',
    },
    {
      pdfSection: 'table-section-table-3',
      configSection: 'table',
      configElementId: 'config-table-3-section',
    },
    {
      pdfSection: 'table-section-table-4',
      configSection: 'table',
      configElementId: 'config-table-4-section',
    },
    {
      pdfSection: 'table-section-table-0-part1',
      configSection: 'table',
      configElementId: 'config-table-0-section',
    },
    {
      pdfSection: 'table-section-table-1-part1',
      configSection: 'table',
      configElementId: 'config-table-1-section',
    },
    {
      pdfSection: 'table-section-table-2-part1',
      configSection: 'table',
      configElementId: 'config-table-2-section',
    },
    {
      pdfSection: 'table-section-table-3-part1',
      configSection: 'table',
      configElementId: 'config-table-3-section',
    },
    {
      pdfSection: 'table-section-table-4-part1',
      configSection: 'table',
      configElementId: 'config-table-4-section',
    },
    {
      pdfSection: 'description-section',
      configSection: 'description',
      configElementId: 'config-description-section',
    },
    { pdfSection: 'item-section', configSection: 'item', configElementId: 'config-item-section' },
    {
      pdfSection: 'footer-section',
      configSection: 'footer',
      configElementId: 'config-footer-section',
    },
  ]

  // Function to expand section if it's collapsed
  const expandSectionIfNeeded = (sectionName: string) => {
    if (!sectionStates) return

    // Map PDF section names to config section names
    const sectionMap: { [key: string]: string } = {
      'header-section': 'header',
      'info-section': 'info',
      'table-section': 'table',
      'table-section-0': 'table',
      'table-section-1': 'table',
      'table-section-2': 'table',
      'table-section-3': 'table',
      'table-section-4': 'table',
      'table-section-table-0': 'table',
      'table-section-table-1': 'table',
      'table-section-table-2': 'table',
      'table-section-table-3': 'table',
      'table-section-table-4': 'table',
      'table-section-table-0-part1': 'table',
      'table-section-table-1-part1': 'table',
      'table-section-table-2-part1': 'table',
      'table-section-table-3-part1': 'table',
      'table-section-table-4-part1': 'table',
      'description-section': 'description',
      'item-section': 'item',
      'footer-section': 'footer',
    }

    const configSectionName = sectionMap[sectionName]
    if (configSectionName && !sectionStates[configSectionName]) {
      sectionStates[configSectionName] = true
    }

    // For table sections, also expand the specific table
    if (sectionName.startsWith('table-section-')) {
      let tableIndex = ''
      if (sectionName.startsWith('table-section-table-')) {
        tableIndex = sectionName.split('-')[3] || '0'
      } else {
        tableIndex = sectionName.split('-')[2] || '0'
      }

      // Dispatch event to expand the specific table
      window.dispatchEvent(
        new CustomEvent('expand-table-section', {
          detail: { tableIndex: parseInt(tableIndex) },
        }),
      )
    }
  }

  // Handle mouse enter on PDF section
  const handleSectionHover = (sectionName: string) => {
    highlightedSection.value = sectionName
  }

  // Handle mouse leave on PDF section
  const handleSectionLeave = () => {
    highlightedSection.value = null
  }

  // Handle mouse enter on PDF item (only for highlighting, no auto-scroll)
  const handleItemHover = (sectionName: string, itemId: string) => {
    highlightedSection.value = sectionName
    highlightedItem.value = itemId
  }

  // Handle mouse leave on PDF item
  const handleItemLeave = () => {
    highlightedItem.value = null
  }

  // Handle click on PDF section or item
  const handleSectionClick = (sectionName: string, itemId?: string) => {
    console.log('usePdfInteraction: handleSectionClick called with:', sectionName, itemId)

    // Expand section if it's collapsed
    expandSectionIfNeeded(sectionName)

    const mapping = sectionMappings.find((m) => m.pdfSection === sectionName)
    if (!mapping) {
      console.log('usePdfInteraction: No mapping found for section:', sectionName)
      console.log(
        'usePdfInteraction: Available mappings:',
        sectionMappings.map((m) => m.pdfSection),
      )
      return
    }

    console.log('usePdfInteraction: Found mapping:', mapping)

    // Find the target element in config panel
    const targetElement = document.getElementById(mapping.configElementId)
    if (!targetElement) {
      console.log('usePdfInteraction: Target element not found:', mapping.configElementId)
      console.log(
        'usePdfInteraction: Available elements with config- prefix:',
        Array.from(document.querySelectorAll('[id^="config-"]')).map((el) => el.id),
      )
      return
    }

    console.log('usePdfInteraction: Target element found:', targetElement)

    // Scroll to the target element with smooth animation
    targetElement.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    })

    // Add temporary highlight to the target section
    targetElement.classList.add('config-section-highlight')
    setTimeout(() => {
      targetElement.classList.remove('config-section-highlight')
    }, 1000)
  }

  // Handle click on specific item within a section
  const handleItemClick = (sectionName: string, itemId: string) => {
    console.log('usePdfInteraction: handleItemClick called with:', sectionName, itemId)

    // Expand section if it's collapsed
    expandSectionIfNeeded(sectionName)

    const mapping = sectionMappings.find((m) => m.pdfSection === sectionName)
    if (!mapping) {
      console.log('usePdfInteraction: No mapping found for section:', sectionName)
      return
    }

    console.log('usePdfInteraction: Found mapping:', mapping)

    // First scroll to the section
    const sectionElement = document.getElementById(mapping.configElementId)
    if (sectionElement) {
      console.log('usePdfInteraction: Section element found:', sectionElement)
      sectionElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
        inline: 'nearest',
      })

      // Then try to find and highlight the specific item
      let itemElement = null

      // Handle different section types
      if (sectionName.startsWith('table-section-')) {
        // Extract table index from section name
        let tableIndex = ''
        if (sectionName.startsWith('table-section-table-')) {
          // Handle format like "table-section-table-0" or "table-section-table-0-part1" -> "0"
          tableIndex = sectionName.split('-')[3] || '0'
        } else {
          // Handle format like "table-section-0" -> "0"
          tableIndex = sectionName.split('-')[2] || '0'
        }

        console.log('usePdfInteraction: Table index:', tableIndex)

        // Handle different table item types
        if (itemId === 'section-title') {
          const elementId = `config-table-${tableIndex}-section-title`
          console.log('usePdfInteraction: Looking for section title element:', elementId)
          itemElement = document.getElementById(elementId)
        } else if (itemId === 'subsection-title') {
          const elementId = `config-table-${tableIndex}-subsection-title`
          console.log('usePdfInteraction: Looking for subsection title element:', elementId)
          itemElement = document.getElementById(elementId)
        } else if (itemId.startsWith('column-header-')) {
          const columnId = itemId.replace('column-header-', '')
          const elementId = `config-table-${tableIndex}-column-header-${columnId}`
          console.log('usePdfInteraction: Looking for column header element:', elementId)
          itemElement = document.getElementById(elementId)
        } else if (itemId.startsWith('column-value-')) {
          const columnId = itemId.replace('column-value-', '')
          const elementId = `config-table-${tableIndex}-column-value-${columnId}`
          console.log('usePdfInteraction: Looking for column value element:', elementId)
          itemElement = document.getElementById(elementId)
        } else if (itemId.startsWith('row-')) {
          // When clicking on a row, scroll to the column value section
          const elementId = `config-table-${tableIndex}-column-value-section`
          console.log('usePdfInteraction: Looking for column value section element:', elementId)
          itemElement = document.getElementById(elementId)
        } else {
          // Fallback to original column logic
          const elementId = `config-table-${tableIndex}-column-${itemId}`
          console.log('usePdfInteraction: Looking for fallback column element:', elementId)
          itemElement = document.getElementById(elementId)
        }
      } else {
        const elementId = `config-${sectionName.split('-')[0]}-item-${itemId}`
        console.log('usePdfInteraction: Looking for other section element:', elementId)
        itemElement = document.getElementById(elementId)
      }

      console.log('usePdfInteraction: Item element found:', itemElement)

      if (itemElement) {
        setTimeout(() => {
          itemElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
            inline: 'nearest',
          })

          // Highlight the specific item for 1.5 seconds
          itemElement.classList.add('config-item-highlight')
          setTimeout(() => {
            itemElement.classList.remove('config-item-highlight')
          }, 1500)
        }, 300) // Wait for section scroll to complete
      } else {
        console.log('usePdfInteraction: Item element not found')
      }
    } else {
      console.log('usePdfInteraction: Section element not found:', mapping.configElementId)
    }
  }

  // Get CSS class for section highlighting
  const getSectionHighlightClass = (sectionName: string) => {
    return highlightedSection.value === sectionName ? 'pdf-section-highlight' : ''
  }

  // Get CSS class for item highlighting
  const getItemHighlightClass = (sectionName: string, itemId: string) => {
    // Only highlight if the current section is hovered AND the item is hovered
    if (highlightedSection.value === sectionName && highlightedItem.value === itemId) {
      return 'pdf-item-highlight'
    }
    // Show hover effect only for the current section
    if (highlightedSection.value === sectionName) {
      return 'pdf-item-hover'
    }
    return ''
  }

  return {
    highlightedSection,
    highlightedItem,
    configPanelRef,
    handleSectionHover,
    handleSectionLeave,
    handleItemHover,
    handleItemLeave,
    handleSectionClick,
    handleItemClick,
    getSectionHighlightClass,
    getItemHighlightClass,
  }
}
