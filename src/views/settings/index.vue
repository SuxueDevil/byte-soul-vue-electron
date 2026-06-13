<template>
  <div class="settings-view">
    <div class="settings-header">
      <h1>设置</h1>
      <Button icon="pi pi-arrow-left" text @click="router.back()" />
    </div>
    
    <div class="settings-content">
      <!-- 主题设置 -->
      <div class="settings-section">
        <h2>外观</h2>
        <div class="setting-item">
          <label>主题</label>
          <div class="theme-toggle">
            <Button
              :class="{ active: configStore.theme === 'dark' }"
              @click="configStore.theme = 'dark'"
            >
              <i class="pi pi-moon"></i>
              暗色
            </Button>
            <Button
              :class="{ active: configStore.theme === 'light' }"
              @click="configStore.theme = 'light'"
            >
              <i class="pi pi-sun"></i>
              亮色
            </Button>
          </div>
        </div>
      </div>
      
      <!-- 模型设置 -->
      <div class="settings-section">
        <h2>模型配置</h2>
        <div class="setting-item">
          <label>pyAgent 地址</label>
          <InputText v-model="configStore.pyAgentUrl" />
        </div>
        <div class="setting-item">
          <label>超时时间 (ms)</label>
          <InputNumber v-model="configStore.timeout" :min="5000" :max="120000" />
        </div>
      </div>
      
      <!-- 编辑器设置 -->
      <div class="settings-section">
        <h2>编辑器</h2>
        <div class="setting-item">
          <label>字体大小</label>
          <InputNumber v-model="configStore.fontSize" :min="12" :max="24" />
        </div>
        <div class="setting-item">
          <label>Tab 大小</label>
          <InputNumber v-model="configStore.tabSize" :min="2" :max="8" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import InputNumber from 'primevue/inputnumber'
import { useConfigStore } from '@/stores/config'

const router = useRouter()
const configStore = useConfigStore()
</script>

<style scoped>
.settings-view {
  padding: 48px;
  max-width: 800px;
  margin: 0 auto;
  background-color: #FFFFFF;
  color: #111827;
  min-height: 100vh;
}

.settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 48px;
}

.settings-header h1 {
  font-size: 32px;
  font-weight: 700;
  color: #111827;
}

.settings-section {
  margin-bottom: 48px;
}

.settings-section h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 1px solid #E5E7EB;
  color: #374151;
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px 0;
}

.setting-item label {
  font-weight: 500;
  color: #374151;
}

.theme-toggle {
  display: flex;
  gap: 8px;
}

.theme-toggle :deep(.p-button) {
  background-color: #F3F4F6 !important;
  border-color: #D1D5DB !important;
  color: #374151 !important;
}

.theme-toggle :deep(.p-button:hover) {
  background-color: #E5E7EB !important;
  border-color: #9CA3AF !important;
}

.theme-toggle :deep(.p-button.active) {
  background-color: #2563EB !important;
  border-color: #2563EB !important;
  color: #FFFFFF !important;
}

/* 覆盖输入框样式 */
:deep(.p-inputtext) {
  background-color: #FFFFFF !important;
  border-color: #D1D5DB !important;
  color: #111827 !important;
}

:deep(.p-inputtext:focus) {
  border-color: #2563EB !important;
  box-shadow: 0 0 0 1px #2563EB !important;
}

:deep(.p-inputnumber) {
  background-color: #FFFFFF !important;
  border-color: #D1D5DB !important;
}

:deep(.p-inputnumber:focus-within) {
  border-color: #2563EB !important;
  box-shadow: 0 0 0 1px #2563EB !important;
}
</style>
