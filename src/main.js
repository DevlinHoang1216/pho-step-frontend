import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import CoreuiVue from '@coreui/vue'
import CIcon from '@coreui/icons-vue'
import * as icons from '@coreui/icons' // ✅ Sửa ở đây

import DocsComponents from '@/components/DocsComponents'
import DocsExample from '@/components/DocsExample'
import DocsIcons from '@/components/DocsIcons'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(CoreuiVue)

app.provide('icons', icons) // ✅ Đảm bảo dùng icons gốc đầy đủ
app.component('CIcon', CIcon)
app.component('DocsComponents', DocsComponents)
app.component('DocsExample', DocsExample)
app.component('DocsIcons', DocsIcons)

app.mount('#app')
