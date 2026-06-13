/**
 * @description 应用常量
 * @author ByteSoul Team
 * @created 2024-01-15
 * 
 * 功能说明：
 * - 统一管理应用常量
 * - 避免魔法字符串
 */

// ==================== 一、主题常量 ====================

// 1、主题类型
export const THEMES = {
  DARK: 'dark',
  LIGHT: 'light'
} as const

// ==================== 二、消息常量 ====================

// 1、消息角色类型
export const MESSAGE_ROLES = {
  USER: 'user',
  ASSISTANT: 'assistant',
  SYSTEM: 'system'
} as const

// ==================== 三、文件常量 ====================

// 1、文件类型
export const FILE_TYPES = {
  FILE: 'file',
  DIRECTORY: 'directory'
} as const
