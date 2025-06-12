import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Nhập router
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './style.css'; // Đảm bảo tệp CSS được nhập

const app = createApp(App);
app.use(router); // Sử dụng router
app.mount('#app');