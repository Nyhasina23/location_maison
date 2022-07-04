import { createApp } from 'vue'
import App from './App.vue'
import router from '@/router'
import './index.css'
import  'boxicons'
import 'flowbite';
const app = createApp(App)
import {store} from './store/index'
import { createI18n } from 'vue-i18n/index.mjs';

import en from './english.json'
import fr from './french.json'
import mg from './malagasy.json'

const i18n = createI18n({
    locale: localStorage.getItem('lang') || 'fr',
    messages: {
      mg ,
      en,
      fr
    }
  
  })
  
app.use(i18n);
app.use(router)
app.use(store)
app.mount('#app')
