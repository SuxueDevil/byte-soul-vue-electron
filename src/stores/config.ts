/**
 * @description 配置状态管理
 * @author ByteSoul Team
 * @created 2024-01-15
 * 
 * 功能说明：
 * - 管理应用主题（dark/light）
 * - 管理 pyAgent 连接配置
 * - 管理编辑器配置
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore('config', () => {
  // ==================== 一、状态定义 ====================

  // 1、主题配置（默认亮色）
  const theme = ref<'dark' | 'light'>('light')
  
  // 2、pyAgent 连接配置
  const pyAgentUrl = ref('http://localhost:8000')
  const timeout = ref(30000)
  
  // 3、编辑器配置
  const fontSize = ref(14)
  const tabSize = ref(2)
  
  // ==================== 二、方法 ====================

  // 1、切换主题
  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  
  // 2、更新配置
  const updateConfig = (newConfig: Partial<{
    pyAgentUrl: string
    timeout: number
    fontSize: number
    tabSize: number
  }>) => {
    if (newConfig.pyAgentUrl) pyAgentUrl.value = newConfig.pyAgentUrl
    if (newConfig.timeout) timeout.value = newConfig.timeout
    if (newConfig.fontSize) fontSize.value = newConfig.fontSize
    if (newConfig.tabSize) tabSize.value = newConfig.tabSize
  }
  
  // ==================== 三、导出 ====================
  
  return {
    theme,
    pyAgentUrl,
    timeout,
    fontSize,
    tabSize,
    toggleTheme,
    updateConfig
  }
})
