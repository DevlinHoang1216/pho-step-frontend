<template>
  <div
    v-if="visible"
    class="position-fixed top-0 end-0 bg-white shadow p-4"
    style="width: 350px; height: 100vh; z-index: 1050; overflow-y: auto;"
  >
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h5 class="mb-0">🛒 Giỏ hàng</h5>
      <CButton
        color="danger"
        size="sm"
        @click="$emit('close')"
        aria-label="Đóng giỏ hàng"
      >
        Đóng
      </CButton>
    </div>

    <div v-if="items.length === 0" class="text-muted">Chưa có sản phẩm nào</div>

    <div v-else>
      <div v-for="item in items" :key="item.id" class="mb-3 border-bottom pb-2">
        <div class="d-flex align-items-center">
          <img :src="item.imageUrl" :alt="item.name" width="60" class="me-3" />
          <div>
            <h6 class="mb-1">{{ item.name }}</h6>
            <small>Số lượng: {{ item.quantity }}</small><br />
            <strong class="text-danger">{{ formatCurrency(item.price * item.quantity) }}</strong>
          </div>
        </div>
      </div>

      <div class="mt-4">
        <h6>Tổng cộng:</h6>
        <p class="text-success fw-bold fs-5">{{ totalPriceFormatted }}</p>
        <CButton
          color="success"
          class="w-100 mt-2"
          aria-label="Thanh toán giỏ hàng"
        >
          Thanh toán
        </CButton>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { CButton } from '@coreui/vue'

const props = defineProps({
  items: Array,
  visible: Boolean,
})

const totalPrice = computed(() =>
  props.items.reduce((total, item) => total + item.price * item.quantity, 0)
)

const totalPriceFormatted = computed(() =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalPrice.value)
)
</script>