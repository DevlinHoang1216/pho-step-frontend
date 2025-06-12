<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-4 flex-wrap" style="padding-left: 15px; padding-right: 15px;">
      <h3 class="business-speed m-0" style="font-weight: 700; font-size: 28px; padding-right: 20px;">Tốc độ kinh doanh</h3>
      <div class="d-flex align-items-center gap-2 flex-nowrap" style="min-width: 280px;">
        <label for="orderFromDate" class="m-0" style="white-space: nowrap;">Từ:</label>
        <input type="date" id="orderFromDate" v-model="orderFromDate" class="form-control form-control-sm" style="max-width: 150px;">
        <label for="orderToDate" class="m-0" style="white-space: nowrap;">Đến:</label>
        <input type="date" id="orderToDate" v-model="orderToDate" class="form-control form-control-sm" style="max-width: 150px;">
        <button class="btn btn-primary btn-sm" @click="filterOrders">Lọc</button>
      </div>
    </div>

    <div class="row gx-4 gy-3">
      <!-- Bảng thống kê sản phẩm -->
      <div class="col-lg-8">
        <div class="card shadow-sm">
          <div class="card-body p-3">
            <h5 class="card-title mb-3">Thống kê sản phẩm bán chạy hôm nay</h5>
            <table class="table table-bordered table-hover align-middle mb-0">
              <thead class="table-light">
                <tr>
                  <th style="width: 80px;">Ảnh</th>
                  <th>Tên sản phẩm</th>
                  <th>Loại giày</th>
                  <th>Màu sắc</th>
                  <th>Kích cỡ</th>
                  <th>Đế giày</th>
                  <th>Giá bán</th>
                  <th style="width: 90px;">Số lượng bán</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in products" :key="product.id">
                  <td class="p-1 text-center">
                    <img :src="product.image" :alt="product.name" class="img-fluid rounded" style="height: 60px; object-fit: contain;" />
                  </td>
                  <td>{{ product.name }}</td>
                  <td>{{ product.type }}</td>
                  <td>{{ product.color }}</td>
                  <td>{{ product.size }}</td>
                  <td>{{ product.sole }}</td>
                  <td>{{ product.price }}</td>
                  <td class="text-center">{{ product.quantity }}</td>
                </tr>
              </tbody>
            </table>
            <nav aria-label="Page navigation" class="mt-2">
              <ul class="pagination pagination-sm justify-content-center mb-0">
                <li class="page-item active"><a class="page-link" href="#">1</a></li>
              </ul>
            </nav>
          </div>
        </div>
      </div>

      <!-- Biểu đồ -->
      <div class="col-lg-4">
        <div class="card shadow-sm h-100">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title mb-3">Biểu đồ trạng thái đơn hàng hôm nay</h5>
            <canvas id="orderStatusChart" style="flex-grow: 1; min-height: 300px;"></canvas>
            <div class="mt-3 text-center small text-muted">
              <span class="me-3"><i class="fas fa-circle text-warning"></i> Đã hoàn thành</span>
              <span class="me-3"><i class="fas fa-circle text-success"></i> Chờ xác nhận</span>
              <span><i class="fas fa-circle text-danger"></i> Đã huỷ</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Chart from 'chart.js/auto';

const orderFromDate = ref('');
const orderToDate = ref('');

const products = ref([
  {
    id: 1,
    image: '/assets/images/products/adidas.jpg',
    name: 'Adidas Superstar',
    type: 'Casual Shoes',
    color: 'Trắng',
    size: 40,
    sole: 'PVC Sole',
    price: '2,200,000 VNĐ',
    quantity: 7,
  },
  {
    id: 2,
    image: '/assets/images/products/nike.jpg',
    name: 'Nike Air Max',
    type: 'Sports Shoes',
    color: 'Đen',
    size: 42,
    sole: 'Rubber Sole',
    price: '2,500,000 VNĐ',
    quantity: 1,
  },
]);

const filterOrders = () => {
  if (orderFromDate.value > orderToDate.value) {
    alert('Ngày bắt đầu không thể lớn hơn ngày kết thúc!');
    return;
  }
  alert(`Đang lọc đơn hàng từ ${orderFromDate.value} đến ${orderToDate.value}`);
};

onMounted(() => {
  const ctx = document.getElementById('orderStatusChart').getContext('2d');
  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Đã hoàn thành', 'Chờ xác nhận', 'Đã huỷ'],
      datasets: [{
        data: [50, 20, 30],
        backgroundColor: ['#f1c40f', '#2ecc71', '#e74c3c'],
        borderWidth: 1,
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            font: { size: 12 },
            color: '#666',
          },
        },
        tooltip: {
          enabled: true,
        },
      },
    },
  });
});
</script>