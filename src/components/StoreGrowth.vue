<template>
  <div class="col-lg-4 mb-4">
    <div class="card shadow-sm h-100">
      <div class="card-body">
        <h5 class="card-title mb-3">Tăng trưởng cửa hàng</h5>
        <div v-for="stat in growthStats" :key="stat.id" class="mb-3 p-3 border rounded d-flex justify-content-between align-items-center">
          <div><i :class="stat.icon" class="me-2"></i> {{ stat.title }}</div>
          <div class="text-end">
            <strong>{{ stat.value }}</strong><br>
            <span class="text-success">{{ stat.growth }} <i class="fas fa-arrow-up"></i></span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const growthStats = ref([
  { id: 1, title: 'Doanh thu năm', value: '449,651,000 VNĐ', growth: '100%', icon: 'fas fa-box text-warning' },
  { id: 2, title: 'Doanh thu tháng', value: '449,651,000 VNĐ', growth: '100%', icon: 'fas fa-calendar-alt text-warning' },
  { id: 3, title: 'Bán theo năm', value: '24 ĐƠN', growth: '100%', icon: 'fas fa-boxes text-warning' },
  { id: 4, title: 'Bán theo tháng', value: '24 ĐƠN', growth: '100%', icon: 'fas fa-box-open text-warning' },
]);
</script>