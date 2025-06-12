<template>
  <div class="page-wrapper" id="main-wrapper" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed">
    <!-- App Topstrip -->
    <div class="app-topstrip bg-dark py-6 px-3 w-100 d-lg-flex align-items-center justify-content-between">
      <div class="d-flex align-items-center justify-content-center gap-5 mb-2 mb-lg-0"></div>
      <div class="d-lg-flex align-items-center gap-2">
        <div class="d-flex align-items-center justify-content-center gap-2">
          <div class="dropdown d-flex">
            <a class="btn btn-primary d-flex align-items-center gap-1" href="#" id="drop4" data-bs-toggle="dropdown" aria-expanded="false">
              <i class="ti ti-shopping-cart fs-5"></i>
              Mua Ngay
              <i class="ti ti-chevron-down fs-5"></i>
            </a>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <aside class="left-sidebar">
      <div>
        <div class="brand-logo d-flex align-items-center justify-content-between">
          <a href="#" class="text-nowrap logo-img">
            <img src="/src/assets/images/logos/Pho-Step_logo.png" alt="PhoStep Logo" style="max-width: 200px; height: auto;" />
          </a>
          <div class="close-btn d-xl-none d-block sidebartoggler cursor-pointer" @click="toggleSidebar">
            <i class="ti ti-x fs-6"></i>
          </div>
        </div>
        <nav class="sidebar-nav scroll-sidebar" data-simplebar>
          <ul id="sidebarnav">
            <li class="nav-small-cap">
              <iconify-icon icon="solar:menu-dots-linear" class="nav-small-cap-icon fs-4"></iconify-icon>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="#" @click.prevent="activeSection = 'overview'">
                <i class="ti ti-atom"></i>
                <span class="hide-menu">Tổng Quan</span>
              </a>
            </li>
            <li class="sidebar-item">
              <a class="sidebar-link" href="#" @click.prevent="activeSection = 'business-speed'">
                <i class="ti ti-aperture"></i>
                <span class="hide-menu">Tốc độ kinh doanh</span>
              </a>
            </li>
            <!-- Thêm các mục khác nếu cần -->
          </ul>
        </nav>
      </div>
    </aside>

    <!-- Main Content -->
    <div class="body-wrapper">
      <!-- Header -->
      <header class="app-header">
        <nav class="navbar navbar-expand-lg navbar-light">
          <ul class="navbar-nav">
            <li class="nav-item d-block d-xl-none">
              <a class="nav-link sidebartoggler" href="#" @click.prevent="toggleSidebar">
                <i class="ti ti-menu-2"></i>
              </a>
            </li>
            <li class="nav-item dropdown">
              <a class="nav-link" href="#" id="drop1" data-bs-toggle="dropdown" aria-expanded="false">
                <i class="ti ti-bell"></i>
                <div class="notification bg-primary rounded-circle"></div>
              </a>
              <div class="dropdown-menu dropdown-menu-animate-up" aria-labelledby="drop1">
                <div class="message-body">
                  <a href="#" class="dropdown-item">Thông báo 1</a>
                  <a href="#" class="dropdown-item">Thông báo 2</a>
                </div>
              </div>
            </li>
          </ul>
          <div class="navbar-collapse justify-content-end px-0" id="navbarNav">
            <ul class="navbar-nav flex-row ms-auto align-items-center justify-content-end">
              <li class="nav-item dropdown">
                <a class="nav-link" href="#" id="drop2" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src="/src/assets/images/profile/user-1.jpg" alt="" width="35" height="35" class="rounded-circle">
                </a>
                <div class="dropdown-menu dropdown-menu-end dropdown-menu-animate-up" aria-labelledby="drop2">
                  <div class="message-body">
                    <a href="#" class="d-flex align-items-center gap-2 dropdown-item">
                      <i class="ti ti-user fs-6"></i>
                      <p class="mb-0 fs-3">Hồ sơ</p>
                    </a>
                    <a href="#" class="d-flex align-items-center gap-2 dropdown-item">
                      <i class="ti ti-mail fs-6"></i>
                      <p class="mb-0 fs-3">Tài khoản</p>
                    </a>
                    <a href="#" class="d-flex align-items-center gap-2 dropdown-item">
                      <i class="ti ti-list-check fs-6"></i>
                      <p class="mb-0 fs-3">Nhiệm vụ</p>
                    </a>
                    <a href="#" class="btn btn-outline-primary mx-3 mt-2 d-block">Đăng xuất</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <!-- Nội dung chính -->
      <div class="body-wrapper-inner">
        <div class="container-fluid">
          <!-- Tiêu đề tổng quan -->
          <div class="row mb-4" v-if="activeSection === 'overview'">
            <div class="col-12 text-center">
              <h2 class="overview-title">TỔNG QUAN ĐƠN HÀNG</h2>
            </div>
          </div>

          <!-- Card tổng quan -->
          <div class="row g-3" v-if="activeSection === 'overview'">
            <div class="col-12 col-sm-6 col-lg-3">
              <div class="overview-card">
                <h5 class="card-subtitle">Hôm qua</h5>
                <h3 class="card-title">41,451,000 VNĐ</h3>
                <div class="icons">
                  <span class="icon trend-up">+12</span>
                  <span class="icon trend-down">-8</span>
                  <span class="icon trend-neutral">+3</span>
                  <span class="icon trend-down">0</span>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-lg-3">
              <div class="overview-card">
                <h5 class="card-subtitle">Tuần</h5>
                <h3 class="card-title">572,651,000 VNĐ</h3>
                <div class="icons">
                  <span class="icon trend-up">+27</span>
                  <span class="icon trend-down">-119</span>
                  <span class="icon trend-neutral">+19</span>
                  <span class="icon trend-down">0</span>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-lg-3">
              <div class="overview-card">
                <h5 class="card-subtitle">Tháng</h5>
                <h3 class="card-title">572,651,000 VNĐ</h3>
                <div class="icons">
                  <span class="icon trend-up">+27</span>
                  <span class="icon trend-down">-24</span>
                  <span class="icon trend-neutral">+10</span>
                  <span class="icon trend-down">0</span>
                </div>
              </div>
            </div>
            <div class="col-12 col-sm-6 col-lg-3">
              <div class="overview-card">
                <h5 class="card-subtitle">Năm</h5>
                <h3 class="card-title">572,651,000 VNĐ</h3>
                <div class="icons">
                  <span class="icon trend-up">+27</span>
                  <span class="icon trend-down">-24</span>
                  <span class="icon trend-neutral">+10</span>
                  <span class="icon trend-down">0</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Tùy chỉnh đơn hàng -->
          <div class="order-customization mt-4 p-3 border rounded bg-light" v-if="activeSection === 'overview'">
            <h5 class="mb-3">Tùy chỉnh đơn hàng</h5>
            <div class="d-flex gap-3 flex-wrap">
              <button class="btn btn-primary btn-sm">Đơn hàng online</button>
              <button class="btn btn-success btn-sm">Tốc độ bán tại quầy</button>
              <button class="btn btn-warning btn-sm">Đơn hàng tại quầy</button>
              <button class="btn btn-danger btn-sm">Đơn hàng</button>
            </div>
          </div>

          <!-- Legend -->
          <div class="legend mt-4" v-if="activeSection === 'overview'">
            <span><span class="dot" style="background-color: #3498db;"></span>Đơn hàng online</span>
            <span><span class="dot" style="background-color: #f1c40f;"></span>Tốc độ bán tại quầy</span>
            <span><span class="dot" style="background-color: #2ecc71;"></span>Đơn hàng tại quầy</span>
            <span><span class="dot" style="background-color: #e74c3c;"></span>Đơn hàng</span>
          </div>

          <!-- Tốc độ kinh doanh -->
          <div v-if="activeSection === 'business-speed'">
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

          <!-- Thống kê sản phẩm sắp hết hàng và tăng trưởng -->
          <div class="container mt-5" v-if="activeSection === 'overview'">
            <h4 class="mb-4 fw-bold">Thống kê sản phẩm sắp hết hàng và tốc độ tăng trưởng của cửa hàng</h4>
            <div class="row">
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

// Quản lý trạng thái báo cáo
const fromDate = ref('');
const toDate = ref('');
const orderFromDate = ref('');
const orderToDate = ref('');
const rowsToShow = ref(10);
const activeSection = ref('overview'); // Mặc định hiển thị phần Tổng Quan

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

const growthStats = ref([
  { id: 1, title: 'Doanh thu năm', value: '449,651,000 VNĐ', growth: '100%', icon: 'fas fa-box text-warning' },
  { id: 2, title: 'Doanh thu tháng', value: '449,651,000 VNĐ', growth: '100%', icon: 'fas fa-calendar-alt text-warning' },
  { id: 3, title: 'Bán theo năm', value: '24 ĐƠN', growth: '100%', icon: 'fas fa-boxes text-warning' },
  { id: 4, title: 'Bán theo tháng', value: '24 ĐƠN', growth: '100%', icon: 'fas fa-box-open text-warning' },
]);

const submitReport = () => {
  if (fromDate.value > toDate.value) {
    alert('Ngày bắt đầu không thể lớn hơn ngày kết thúc!');
    return;
  }
  alert(`Báo cáo doanh thu từ ${fromDate.value} đến ${toDate.value} đã được gửi!`);
};

const filterOrders = () => {
  if (orderFromDate.value > orderToDate.value) {
    alert('Ngày bắt đầu không thể lớn hơn ngày kết thúc!');
    return;
  }
  alert(`Đang lọc đơn hàng từ ${orderFromDate.value} đến ${orderToDate.value}`);
};

const isSidebarOpen = ref(false);
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

onMounted(() => {
  const ctx = document.getElementById('orderStatusChart')?.getContext('2d');
  if (ctx) {
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
  }
});
</script>

<style>
@import './assets/css/styles.min.css';
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
@import 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css';

.left-sidebar {
  background: #fff;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  height: 100vh;
  position: fixed;
  width: 250px;
  z-index: 1000;
  transition: transform 0.3s;
}

@media (max-width: 1199px) {
  .left-sidebar {
    transform: translateX(-250px);
  }
  .left-sidebar.open {
    transform: translateX(0);
  }
}

.overview-title {
  font-size: 36px;
  font-weight: 800;
  color: #2c3e50;
  text-transform: uppercase;
  margin-bottom: 40px;
}

.overview-card {
  border: 1px solid #e0e0e0;
  border-radius: 12px;
  padding: 20px;
  text-align: center;
  background: linear-gradient(145deg, #ffffff, #f8f9fa);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  height: 100%;
}

.overview-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
}

.overview-card .card-subtitle {
  font-size: 14px;
  color: #7f8c8d;
  margin-bottom: 10px;
  text-transform: uppercase;
}

.icons .icon {
  display: inline-block;
  margin: 0 5px;
  font-size: 12px;
}

.order-customization {
  margin-top: 20px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #f8f9fa;
}

.legend span {
  margin-right: 15px;
}

.legend .dot {
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-right: 5px;
}
</style>