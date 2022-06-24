import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import './index.css'
import  'boxicons'
import 'flowbite';
const app = createApp(App)
import {store} from './store/index'
app.use(router)
app.use(store)
app.mount('#app')
