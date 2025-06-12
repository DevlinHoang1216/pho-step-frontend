import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import CoreUI from '@coreui/vue' // Sửa tên module thành CoreUI
import CIcon from '@coreui/icons-vue'
import * as icons from '@coreui/icons' // Import toàn bộ icon từ @coreui/icons thay vì custom file
import DocsComponents from '@/components/DocsComponents'
import DocsExample from '@/components/DocsExample'
import DocsIcons from '@/components/DocsIcons'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(CoreUI)
app.provide('icons', icons) // Cung cấp toàn bộ icon từ @coreui/icons
app.component('CIcon', CIcon)
app.component('DocsComponents', DocsComponents)
app.component('DocsExample', DocsExample)
app.component('DocsIcons', DocsIcons)

app.mount('#app')