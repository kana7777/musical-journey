import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'

// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
