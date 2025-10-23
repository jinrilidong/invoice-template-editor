/**
 * 生成唯一ID的工具函数
 */
export function generateId(): string {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}