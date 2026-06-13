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
  padding: var(--spacing-2xl);
  max-width: 800px;
  margin: 0 auto;
}

.settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--spacing-2xl);
}

.settings-header h1 {
  font-size: 32px;
  font-weight: 700;
}

.settings-section {
  margin-bottom: var(--spacing-2xl);
}

.settings-section h2 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: var(--spacing-lg);
  padding-bottom: var(--spacing-sm);
  border-bottom: 1px solid var(--color-secondary);
}

.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: var(--spacing-md) 0;
}

.setting-item label {
  font-weight: 500;
}

.theme-toggle {
  display: flex;
  gap: var(--spacing-sm);
}

.theme-toggle .active {
  background-color: var(--color-cta);
  color: #000;
}
</style>
