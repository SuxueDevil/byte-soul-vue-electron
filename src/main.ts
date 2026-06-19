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
      50: '{zinc.50}',
      100: '{zinc.100}',
      200: '{zinc.200}',
      300: '{zinc.300}',
      400: '{zinc.400}',
      500: '{zinc.500}',
      600: '{zinc.600}',
      700: '{zinc.700}',
      800: '{zinc.800}',
      900: '{zinc.900}',
      950: '{zinc.950}'
    },
    colorScheme: {
      light: {
        primary: {
          color: '{zinc.950}',
          inverseColor: '#ffffff',
          hoverColor: '{zinc.900}',
          activeColor: '{zinc.800}'
        },
        highlight: {
          background: '{zinc.950}',
          focusBackground: '{zinc.700}',
          color: '#ffffff',
          focusColor: '#ffffff'
        }
      },
      dark: {
        primary: {
          color: '{zinc.50}',
          inverseColor: '{zinc.950}',
          hoverColor: '{zinc.100}',
          activeColor: '{zinc.200}'
        },
        highlight: {
          background: 'rgba(250, 250, 250, .16)',
          focusBackground: 'rgba(250, 250, 250, .24)',
          color: 'rgba(255,255,255,.87)',
          focusColor: 'rgba(255,255,255,.87)'
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
