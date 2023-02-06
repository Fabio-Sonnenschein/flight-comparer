import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import './assets/main.css'

const app = createApp(App)

app.use(router)

app.mount('#app')
