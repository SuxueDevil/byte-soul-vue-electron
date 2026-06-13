import { createApp } from 'vue'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'

// 样式导入
import 'primeicons/primeicons.css'
import './assets/styles/global.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue)

app.mount('#app')
