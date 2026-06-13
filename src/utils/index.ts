/**
 * 工具函数
 */

/** 格式化日期 */
export const formatDate = (date: Date | string): string => {
  const d = new Date(date)
  return d.toLocaleDateString('zh-CN')
}

/** 格式化时间 */
export const formatTime = (date: Date | string): string => {
  const d = new Date(date)
  return d.toLocaleTimeString('zh-CN')
}

/** 生成唯一 ID */
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

/** 防抖 */
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
