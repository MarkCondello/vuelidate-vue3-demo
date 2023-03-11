import { createApp } from 'vue'
import { createPinia } from 'pinia'

//remove this
import './style.css'

import './scss/index.scss'
import App from './App.vue'

const app = createApp(App)
app.use(createPinia())
.mount('#app')