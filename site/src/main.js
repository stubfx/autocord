import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import store from './store.js'
import router from "./router.js";
import {initTracker} from "../trackingUtils.js";

initTracker()

createApp(App)
    .use(store)
    .use(router)
    .mount('#app')