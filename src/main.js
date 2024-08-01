import './assets/main.css'

import { createApp } from 'vue' // import the root component App from a single-file component.
import App from './App.vue'

createApp(App).mount('#app') // The object we are passing into 'createApp' is in fact a component. 