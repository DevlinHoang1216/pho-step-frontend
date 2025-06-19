// main.js (Không cần sửa đổi)
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// ----------------------------------------------------
// THÊM CÁC DÒNG IMPORT CSS NÀY VÀO ĐÂY
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 5 CSS
import '@coreui/coreui/dist/css/coreui.min.css'; // CoreUI CSS
// ----------------------------------------------------\
// Import Toast Plugin
import ToastPlugin from './plugins/toast-plugin'; // Đường dẫn tới file plugin bạn vừa tạo
import CoreUI from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import * as icons from '@coreui/icons'
import DocsComponents from '@/components/DocsComponents'
import DocsExample from '@/components/DocsExample'
import DocsIcons from '@/components/DocsIcons'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(CoreUI)
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsComponents', DocsComponents)
app.component('DocsExample', DocsExample)
app.component('DocsIcons', DocsIcons)

// Đăng ký Toast Plugin
app.use(ToastPlugin);

app.mount('#app')