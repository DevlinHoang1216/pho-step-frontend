<template>
  <div class="col-lg-8 mb-4">
    <div class="card shadow-sm">
      <div class="card-body">
        <h5 class="card-title mb-3">Sản phẩm sắp hết hàng</h5>
        <div class="mb-3 w-25">
          <input type="number" class="form-control" v-model="rowsToShow" placeholder="Hiển thị số dòng">
        </div>
        <div class="table-responsive">
          <table class="table table-bordered align-middle text-center">
            <thead class="table-light">
              <tr>
                <th>Ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Loại giày</th>
                <th>Màu sắc</th>
                <th>Kích cỡ</th>
                <th>Đế giày</th>
                <th>Giới tính</th>
                <th>Giá bán</th>
                <th>Số lượng</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in lowStockProducts" :key="product.id">
                <td><img :src="product.image" :alt="product.name" width="40"></td>
                <td>{{ product.name }}</td>
                <td>{{ product.type }}</td>
                <td>{{ product.color }}</td>
                <td>{{ product.size }}</td>
                <td>{{ product.sole }}</td>
                <td>{{ product.gender }}</td>
                <td>{{ product.price }}</td>
                <td>{{ product.quantity }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="d-flex justify-content-end">
          <nav>
            <ul class="pagination">
              <li class="page-item disabled"><a class="page-link">‹</a></li>
              <li class="page-item active"><a class="page-link">1</a></li>
              <li class="page-item"><a class="page-link">›</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const rowsToShow = ref(10);
const lowStockProducts = ref([
  {
    id: 1,
    image: '/assets/images/products/product.png',
    name: 'Nike Zoom Pegasus',
    type: 'Slippers',
    color: 'Nâu',
    size: 46,
    sole: 'Foam Sole',
    gender: 'Nam/Nữ',
    price: '1,200,000 VNĐ',
    quantity: 1,
  },
]);
</script>