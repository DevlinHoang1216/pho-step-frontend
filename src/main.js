import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

// ----------------------------------------------------
// THÊM CÁC DÒNG IMPORT CSS NÀY VÀO ĐÂY
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap 5 CSS
import '@coreui/coreui/dist/css/coreui.min.css'; // CoreUI CSS
// ----------------------------------------------------
// Import Toast Plugin
import ToastPlugin from './plugins/toast-plugin'; // Đường dẫn tới file plugin bạn vừa tạo
import CoreUI from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import * as icons from '@coreui/icons'
import DocsComponents from '@/components/DocsComponents'
import DocsExample from '@/components/DocsExample'
import DocsIcons from '@/components/DocsIcons'

// Import vue-color (Không cần đăng ký toàn cục Sketch picker ở đây,
// hãy import nó trực tiếp trong component AddProductForm.vue nơi bạn sử dụng nó)
// import VueColorKit from 'vue-color-kit'; // Dòng này được loại bỏ

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(CoreUI)
// app.use(VueColorKit) // Dòng này được loại bỏ vì Sketch picker sẽ được import cục bộ
app.provide('icons', icons)
app.component('CIcon', CIcon)
app.component('DocsComponents', DocsComponents)
app.component('DocsExample', DocsExample)
app.component('DocsIcons', DocsIcons)

// Đăng ký Toast Plugin
app.use(ToastPlugin);

app.mount('#app')