import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from './pages/Home.vue'
import FavoritesPage from './pages/Favorites.vue'
// import ProfilePage from './pages/ProfilePage.vue' // Đảm bảo tên file đúng
import ProductDetailCard from './components/ProductDetailCard.vue'
import AuthForm from './components/AuthForm.vue'
import CheckoutPage from './components/CheckoutPage.vue' // <<< Đã thêm import
import OrderSuccessPage from './components/OrderSuccessPage.vue'; // Import OrderSuccessPage mới

const routes = [
  { path: '/', name: 'home', component: HomePage },
  { path: '/favorites', name: 'favorites', component: FavoritesPage },
  // { path: '/profile', name: 'profile', component: ProfilePage },
  { path: '/product/:id', name: 'product-detail', component: ProductDetailCard },
  { path: '/auth', name: 'auth', component: AuthForm },
  { path: '/checkout', name: 'checkout', component: CheckoutPage }, // <<< Đã thêm route
   { path: '/order-success/:orderId/:paymentStatus?', component: OrderSuccessPage, name: 'order-success', props: true }, // Route mới cho trang thành công
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router