import { createApp } from 'vue'
import App from './App.vue'
import LoadScript from "vue-plugin-load-script";

let app = createApp(App);
app.use(LoadScript);
app.mount('#app');
