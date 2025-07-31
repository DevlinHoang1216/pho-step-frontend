<template>
  <CCol xs="12" sm="6" md="4" lg="3" class="mb-4">
    <CCard class="h-100">
      <CImg :src="product.imageUrl" class="card-img-top" :alt="product.name" />
      <CCardBody>
        <h6>{{ product.name }}</h6>
        <p class="text-danger fw-bold">{{ formatCurrency(product.price) }}</p>
      </CCardBody>
      <CCardFooter class="d-flex justify-content-between">
        <CButton
          color="primary"
          @click="$emit('add-to-cart', product)"
          :aria-label="`Thêm ${product.name} vào giỏ hàng`"
        >
          Thêm vào giỏ
        </CButton>
        <CIcon
          icon="cil-heart"
          @click="$emit('add-to-wishlist', product)"
          :aria-label="`Thêm ${product.name} vào danh sách yêu thích`"
        />
      </CCardFooter>
    </CCard>
  </CCol>
</template>

<script setup>
import { CCol, CCard, CCardBody, CCardFooter, CButton, CImg, CIcon } from '@coreui/vue'
const props = defineProps(['product'])

const formatCurrency = (value) =>
  new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value)
</script>