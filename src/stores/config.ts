import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConfigStore = defineStore('config', () => {
  // 主题
  const theme = ref<'dark' | 'light'>('light')
  
  // pyAgent 配置
  const pyAgentUrl = ref('http://localhost:8000')
  const timeout = ref(30000)
  
  // 编辑器配置
  const fontSize = ref(14)
  const tabSize = ref(2)
  
  // 方法
  const toggleTheme = () => {
    theme.value = theme.value === 'dark' ? 'light' : 'dark'
  }
  
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
