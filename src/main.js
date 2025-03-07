import { createApp } from 'vue'
import './style.css'
import 'element-plus/dist/index.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')