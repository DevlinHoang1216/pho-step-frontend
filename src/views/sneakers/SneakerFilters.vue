<!-- 📁 src/views/sneakers/SneakerFilters.vue -->
<template>
  <div class="row g-3 mb-4">
    <div class="col-md-3">
      <label class="form-label">Hãng</label>
      <select class="form-select" v-model="selected.brand" @change="emitFilter">
        <option value="">Tất cả</option>
        <option>Nike</option>
        <option>Adidas</option>
        <option>Puma</option>
        <option>Reebok</option>
        <option>New Balance</option>
      </select>
    </div>
    <div class="col-md-3">
      <label class="form-label">Kích cỡ</label>
      <select class="form-select" v-model="selected.size" @change="emitFilter">
        <option value="">Tất cả</option>
        <option>39</option>
        <option>40</option>
        <option>41</option>
        <option>42</option>
        <option>43</option>
      </select>
    </div>
    <div class="col-md-3">
      <label class="form-label">Giá</label>
      <select class="form-select" v-model="selected.priceRange" @change="emitFilter">
        <option value="">Tất cả</option>
        <option value="<1tr">Dưới 1 triệu</option>
        <option value="1-2tr">Từ 1 - 2 triệu</option>
        <option value=">2tr">Trên 2 triệu</option>
      </select>
    </div>
    <div class="col-md-3 d-flex align-items-end">
      <CButton color="secondary" class="w-100" @click="resetFilter">Xoá bộ lọc</CButton>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { CButton } from '@coreui/vue'

const emit = defineEmits(['filter-changed'])

const selected = ref({
  brand: '',
  size: '',
  priceRange: '',
})

function emitFilter() {
  emit('filter-changed', { ...selected.value })
}

function resetFilter() {
  selected.value = { brand: '', size: '', priceRange: '' }
  emitFilter()
}
</script>
