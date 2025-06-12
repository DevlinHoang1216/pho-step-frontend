<template>
  <aside class="left-sidebar">
    <div>
      <div class="brand-logo d-flex align-items-center justify-content-between">
        <router-link to="/" class="text-nowrap logo-img">
          <img src="/src/assets/images/logos/Pho-Step_logo.png" alt="PhoStep Logo" style="max-width: 200px; height: auto;" />
        </router-link>
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
            <router-link class="sidebar-link" to="/" aria-expanded="false">
              <i class="ti ti-atom"></i>
              <span class="hide-menu">Tổng Quan</span>
            </router-link>
          </li>
          <li class="sidebar-item">
            <router-link class="sidebar-link justify-content-between" to="/business-speed" aria-expanded="false">
              <div class="d-flex align-items-center gap-3">
                <span class="d-flex">
                  <i class="ti ti-aperture"></i>
                </span>
                <span class="hide-menu">Tốc độ kinh doanh</span>
              </div>
            </router-link>
          </li>
          <!-- Thêm các router-link khác tương ứng -->
        </ul>
      </nav>
    </div>
  </aside>
</template>

<script setup>
import { ref } from 'vue';

const isSidebarOpen = ref(false);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};
</script>