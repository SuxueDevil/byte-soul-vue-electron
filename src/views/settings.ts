// SettingsView 逻辑
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import { useConfigStore } from '@/stores/config'

export const useSettingsView = () => {
  const router = useRouter()
  const configStore = useConfigStore()

  return {
    router,
    configStore
  }
}
