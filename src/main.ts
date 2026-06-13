/**
 * @description 应用入口文件
 * @author ByteSoul Team
 * @created 2024-01-15
 */

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'

const Noir = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{neutral.50}',
      100: '{neutral.100}',
      200: '{neutral.200}',
      300: '{neutral.300}',
      400: '{neutral.400}',
      500: '{neutral.500}',
      600: '{neutral.600}',
      700: '{neutral.700}',
      800: '{neutral.800}',
      900: '{neutral.900}',
      950: '{neutral.950}'
    },
    colorScheme: {
      light: {
        surface: {
          0: '{neutral.0}',
          50: '{neutral.50}',
          100: '{neutral.100}',
          200: '{neutral.200}',
          300: '{neutral.300}',
          400: '{neutral.400}',
          500: '{neutral.500}',
          600: '{neutral.600}',
          700: '{neutral.700}',
          800: '{neutral.800}',
          900: '{neutral.900}',
          950: '{neutral.950}'
        }
      }
    }
  }
})
import App from './App.vue'
import router from './router'

// ==================== 一、样式导入 ====================

// 1、PrimeVue 图标样式
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
  theme: {
    preset: Noir,
    options: {
      prefix: 'p',
      darkModeSelector: '[data-theme="dark"]',
      cssLayer: false
    }
  },
  ripple: false
})

// 3、挂载到 DOM
app.mount('#app')
