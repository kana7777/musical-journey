import { createApp } from 'vue'
 
import App from './App.vue'
 
// Import Bootstrap and BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import './assets/style.scss';
import router from './router';  

const app = createApp(App);
app.use(router); // 使用 router
app.mount('#app');  