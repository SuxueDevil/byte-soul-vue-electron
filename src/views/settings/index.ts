/**
 * @description 设置页逻辑
 * @author ByteSoul Team
 * @created 2024-01-15
 * 
 * 功能说明：
 * - 提供路由和配置状态
 */

import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import { useConfigStore } from '@/stores/config'

// ==================== 一、组合函数 ====================

export const useSettingsView = () => {
  // 1、路由实例
  const router = useRouter()
  // 2、配置状态
  const configStore = useConfigStore()

  // 3、导出
  return {
    router,
    configStore
  }
}
