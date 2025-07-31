<!-- src/views/sneakers/Cart.vue -->
<template>
  <div class="container py-3">
    <h4 class="mb-4">Giỏ hàng của bạn</h4>

    <div v-if="cart.length === 0">
      <p class="text-muted">Không có sản phẩm nào trong giỏ hàng.</p>
    </div>

    <CListGroup v-else>
      <CListGroupItem
        v-for="(item, index) in cart"
        :key="item.id"
        class="d-flex justify-content-between align-items-center"
      >
        <div class="d-flex align-items-center">
          <img :src="item.imageUrl" alt="..." width="60" class="me-3" />
          <div>
            <h6 class="mb-1">{{ item.name }}</h6>
            <small class="text-danger fw-bold">{{ formatCurrency(item.price) }}</small>
          </div>
        </div>

        <div class="d-flex align-items-center">
          <input
            type="number"
            v-model.number="item.quantity"
            class="form-control me-2"
            min="1"
            style="width: 70px"
          />
          <CButton color="danger" @click="removeItem(index)">Xoá</CButton>
        </div>
      </CListGroupItem>
    </CListGroup>

    <div class="mt-4 text-end">
      <h5>Tổng cộng: <span class="text-success">{{ formatCurrency(totalAmount) }}</span></h5>
      <CButton color="success" class="mt-2" :disabled="cart.length === 0" @click="checkout">
        Thanh toán
      </CButton>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { CListGroup, CListGroupItem, CButton } from '@coreui/vue'

const cart = ref([
  { id: 1, name: 'Nike Air Max', price: 2400000, imageUrl: '/sneakers/shoe1.jpg', quantity: 1 },
  { id: 2, name: 'Adidas Boost', price: 1800000, imageUrl: '/sneakers/shoe2.jpg', quantity: 2 },
])

const formatCurrency = (value) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)

const totalAmount = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
)

function removeItem(index) {
  cart.value.splice(index, 1)
}

function checkout() {
  alert('Tính năng thanh toán đang được phát triển 🚧')
}
</script>
