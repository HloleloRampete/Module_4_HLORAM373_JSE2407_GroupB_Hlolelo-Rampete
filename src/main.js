import './assets/main.css'

import { createApp } from 'vue' // import the root component App from a single-file component.
import App from './App.vue'
import router from './router';

createApp(App).use(router).mount('#app') // The object we are passing into 'createApp' is in fact a component. 
