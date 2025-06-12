import { createRouter, createWebHistory } from 'vue-router';
import App from '../App.vue';
import BusinessSpeed from '../components/BusinessSpeed.vue';
import Header from '../components/Header.vue';
import HelloWorld from '../components/HelloWorld.vue';
import LowStockProducts from '../components/LowStockProducts.vue';
import OrderCustomization from '../components/OrderCustomization.vue';
import OverviewCard from '../components/OverviewCard.vue';
import Sidebar from '../components/Sidebar.vue';
import StoreGrowth from '../components/StoreGrowth.vue';

// Định nghĩa các tuyến đường
const routes = [
  {
    path: '/',
    name: 'Home',
    component: App, // Trang chủ sử dụng App.vue làm thành phần chính
  },
  {
    path: '/business-speed',
    name: 'BusinessSpeed',
    component: BusinessSpeed,
  },
  {
    path: '/header',
    name: 'Header',
    component: Header,
  },
  {
    path: '/hello-world',
    name: 'HelloWorld',
    component: HelloWorld,
  },
  {
    path: '/low-stock-products',
    name: 'LowStockProducts',
    component: LowStockProducts,
  },
  {
    path: '/order-customization',
    name: 'OrderCustomization',
    component: OrderCustomization,
  },
  {
    path: '/overview-card',
    name: 'OverviewCard',
    component: OverviewCard,
  },
  {
    path: '/sidebar',
    name: 'Sidebar',
    component: Sidebar,
  },
  {
    path: '/store-growth',
    name: 'StoreGrowth',
    component: StoreGrowth,
  },
];

// Tạo router instance
const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;