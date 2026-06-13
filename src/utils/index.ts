/**
 * @description 工具函数
 * @author ByteSoul Team
 * @created 2024-01-15
 * 
 * 功能说明：
 * - 提供通用工具函数
 * - 日期格式化、ID 生成、防抖等
 */

// ==================== 一、日期工具 ====================

/** 格式化日期（yyyy-MM-dd） */
export const formatDate = (date: Date | string): string => {
  const d = new Date(date)
  return d.toLocaleDateString('zh-CN')
}

/** 格式化时间（HH:mm:ss） */
export const formatTime = (date: Date | string): string => {
  const d = new Date(date)
  return d.toLocaleTimeString('zh-CN')
}

// ==================== 二、ID 生成 ====================

/** 生成唯一 ID（时间戳 + 随机数） */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

// ==================== 三、函数工具 ====================

/** 防抖函数 */
export const debounce = <T extends (...args: unknown[]) => unknown>(
  fn: T,
  delay: number
) => {
  let timer: ReturnType<typeof setTimeout>
  return (...args: Parameters<T>) => {
    clearTimeout(timer)
    timer = setTimeout(() => fn(...args), delay)
  }
}
