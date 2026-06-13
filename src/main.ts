/**
 * @description 应用入口文件
 * @author ByteSoul Team
 * @created 2024-01-15
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'

// ==================== 一、样式导入 ====================

// 1、PrimeVue 组件库样式（Aura 亮色主题 - 官网默认）
import 'primevue/resources/themes/aura-light-noir/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

// 2、全局自定义样式
import './assets/styles/global.css'

// ==================== 二、创建应用 ====================

// 1、创建 Vue 应用实例
const app = createApp(App)

// 2、注册插件
app.use(createPinia())  // 状态管理
app.use(router)         // 路由
app.use(PrimeVue, {     // UI 组件库
  ripple: false,        // 禁用水波纹效果
  inputStyle: 'outlined' // 输入框样式
})

// 3、挂载到 DOM
app.mount('#app')
