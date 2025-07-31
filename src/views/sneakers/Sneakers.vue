<template>
  <div class="container py-3">
    <h4 class="mb-3">Tất cả sản phẩm</h4>

    <!-- Bộ lọc nâng cao -->
    <SneakerFilters @filter-changed="onFilterChanged" />

    <div class="mb-4">
      <input
        v-model="search"
        class="form-control"
        placeholder="Tìm kiếm theo tên giày..."
        aria-label="Tìm kiếm sản phẩm"
      />
    </div>

    <CRow>
      <SneakerCard
        v-for="product in paginatedSneakers"
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
        @add-to-wishlist="addToWishlist"
      />
    </CRow>

    <div class="d-flex justify-content-center mt-4">
      <CPagination
        :active-page="currentPage"
        :pages="totalPages"
        @update:activePage="currentPage = $event"
      />
    </div>

    <!-- Sidebar giỏ hàng -->
    <CartSidebar :items="cart" :visible="isCartOpen" @close="isCartOpen = false" />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CRow, CPagination } from '@coreui/vue'
import SneakerCard from './SneakerCard.vue'
import SneakerFilters from './SneakerFilters.vue'
import CartSidebar from './CartSidebar.vue'
import { useCartStore } from '@/store/cart'
import { useWishlistStore } from '@/store/wishlist'

const cartStore = useCartStore()
const wishlistStore = useWishlistStore()
const search = ref('')
const currentPage = ref(1)
const perPage = 8
const filters = ref({ brand: '', size: '', priceRange: '' })
const isCartOpen = ref(false)

const sneakers = ref([
  { id: 1, name: 'Nike Air Max 270', price: 2400000, imageUrl: '/sneakers/sneaker-1.jpg', brand: 'Nike', size: 40 },
  { id: 2, name: 'Adidas UltraBoost', price: 2200000, imageUrl: '/sneakers/sneaker-2.jpg', brand: 'Adidas', size: 41 },
  { id: 3, name: 'Converse Classic', price: 980000, imageUrl: '/sneakers/sneaker-3.jpg', brand: 'Converse', size: 39 },
  { id: 4, name: 'Vans Old Skool', price: 1050000, imageUrl: '/sneakers/sneaker-4.jpg', brand: 'Vans', size: 42 },
  { id: 5, name: 'Puma RS-X', price: 1950000, imageUrl: '/sneakers/sneaker-5.jpg', brand: 'Puma', size: 43 },
  { id: 6, name: 'Nike Air Jordan 1', price: 3500000, imageUrl: '/sneakers/sneaker-6.jpg', brand: 'Nike', size: 41 },
  { id: 7, name: 'New Balance 550', price: 2100000, imageUrl: '/sneakers/sneaker-7.jpg', brand: 'New Balance', size: 40 },
  { id: 8, name: 'Reebok Classic', price: 1120000, imageUrl: '/sneakers/sneaker-8.jpg', brand: 'Reebok', size: 39 },
  { id: 9, name: 'Fila Disruptor', price: 990000, imageUrl: '/sneakers/sneaker-9.jpg', brand: 'Fila', size: 42 },
  { id: 10, name: 'Asics Gel-Lyte', price: 1250000, imageUrl: '/sneakers/sneaker-10.jpg', brand: 'Asics', size: 41 },
  { id: 11, name: 'Under Armour HOVR', price: 1800000, imageUrl: '/sneakers/sneaker-11.jpg', brand: 'Under Armour', size: 43 },
  { id: 12, name: 'Lacoste Gripshot', price: 1590000, imageUrl: '/sneakers/sneaker-12.jpg', brand: 'Lacoste', size: 40 },
])

const filteredSneakers = computed(() => {
  let result = sneakers.value.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase())
  )
  if (filters.value.brand) result = result.filter(p => p.brand === filters.value.brand)
  if (filters.value.size) result = result.filter(p => p.size == filters.value.size)
  if (filters.value.priceRange === '<1tr') result = result.filter(p => p.price < 1000000)
  if (filters.value.priceRange === '1-2tr') result = result.filter(p => p.price >= 1000000 && p.price <= 2000000)
  if (filters.value.priceRange === '>2tr') result = result.filter(p => p.price > 2000000)

  return result
})

const totalPages = computed(() => Math.ceil(filteredSneakers.value.length / perPage))

const paginatedSneakers = computed(() =>
  filteredSneakers.value.slice((currentPage.value - 1) * perPage, currentPage.value * perPage)
)

const cart = computed(() => cartStore.cart)

function addToCart(product) {
  cartStore.addToCart(product)
  isCartOpen.value = true
}

function addToWishlist(product) {
  wishlistStore.addToWishlist(product)
  alert(`${product.name} đã được thêm vào danh sách yêu thích!`)
}

function onFilterChanged(newFilters) {
  filters.value = newFilters
  currentPage.value = 1
}
</script>