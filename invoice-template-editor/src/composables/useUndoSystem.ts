import { ref, reactive } from 'vue'

interface HistoryState {
  sectionStates: any
  templateData: any
  styleConfig: any
  timestamp: number
}

export function useUndoSystem() {
  const history = ref<HistoryState[]>([])
  const currentIndex = ref(-1)
  const maxHistorySize = 50 // 最多保存50步历史

  // 保存当前状态到历史记录
  const saveState = (sectionStates: any, templateData: any, styleConfig: any) => {
    const state: HistoryState = {
      sectionStates: JSON.parse(JSON.stringify(sectionStates)),
      templateData: JSON.parse(JSON.stringify(templateData)),
      styleConfig: JSON.parse(JSON.stringify(styleConfig)),
      timestamp: Date.now()
    }

    // 如果当前不在历史记录的末尾，删除后面的记录
    if (currentIndex.value < history.value.length - 1) {
      history.value = history.value.slice(0, currentIndex.value + 1)
    }

    // 添加新状态
    history.value.push(state)
    currentIndex.value = history.value.length - 1

    // 限制历史记录大小
    if (history.value.length > maxHistorySize) {
      history.value.shift()
      currentIndex.value = history.value.length - 1
    }
  }

  // 回撤到上一步
  const undo = () => {
    if (currentIndex.value > 0) {
      currentIndex.value--
      return history.value[currentIndex.value]
    }
    return null
  }

  // 前进到下一步
  const redo = () => {
    if (currentIndex.value < history.value.length - 1) {
      currentIndex.value++
      return history.value[currentIndex.value]
    }
    return null
  }

  // 检查是否可以回撤
  const canUndo = () => {
    return currentIndex.value > 0
  }

  // 检查是否可以前进
  const canRedo = () => {
    return currentIndex.value < history.value.length - 1
  }

  // 清空历史记录
  const clearHistory = () => {
    history.value = []
    currentIndex.value = -1
  }

  // 获取当前历史记录数量
  const getHistoryCount = () => {
    return currentIndex.value + 1
  }

  return {
    saveState,
    undo,
    redo,
    canUndo,
    canRedo,
    clearHistory,
    getHistoryCount
  }
}
