<template>
  <div>
    <!-- Tiêu đề + nút thêm mới -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>Màu Sắc</h4>
    </div>

<!-- Tìm kiếm + Nút + Thêm mới -->
<CRow class="mb-3">
  <CCol md="9">
    <CFormInput
      v-model="search"
      placeholder="Tìm kiếm màu sắc..."
    />
  </CCol>
  <CCol md="3" class="d-flex justify-content-end gap-2">
    <CButton color="info" @click="handleSearch">
      <CIcon icon="cil-search" class="me-2" />
      Tìm kiếm
    </CButton>
    <CButton color="primary" @click="visible = true">
      <CIcon icon="cil-plus" class="me-2" />
      Thêm Mới
    </CButton>
  </CCol>
</CRow>

    <!-- Bảng dữ liệu -->
    <CTable striped hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>#</CTableHeaderCell>
          <CTableHeaderCell>Tên màu sắc</CTableHeaderCell>
          <CTableHeaderCell>Mã màu sắc</CTableHeaderCell>
          <CTableHeaderCell>Ngày tạo</CTableHeaderCell>
          <CTableHeaderCell>Ngày cập nhật</CTableHeaderCell>
          <CTableHeaderCell>Thao tác</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="(item, index) in items" :key="index">
          <CTableHeaderCell>{{ index + 1 }}</CTableHeaderCell>
          <CTableDataCell>{{ item.ten_mau_sac }}</CTableDataCell>
          <CTableDataCell>{{ item.ma_mau_sac }}</CTableDataCell>
          <CTableDataCell>{{ item.ngay_tao }}</CTableDataCell>
          <CTableDataCell>{{ item.ngay_cap_nhat }}</CTableDataCell>
          <CTableDataCell>
            <!-- Sửa -->
            <CButton size="sm" color="info" class="me-2">
              <CIcon icon="cil-pencil" />
            </CButton>
            <!-- Xóa -->
            <CButton size="sm" color="danger">
              <CIcon icon="cil-trash" />
            </CButton>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>

    <!-- Modal Thêm Mới -->
    <CModal :visible="visible" @close="visible = false">
      <CModalHeader>
        <CModalTitle>Thêm màu sắc</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput
            v-model="newItem.ten_mau_sac"
            label="Tên màu sắc"
            placeholder="Nhập tên màu sắc"
            class="mb-3"
          />
          <CFormInput
            v-model="newItem.ma_mau_sac"
            label="Mã màu sắc"
            placeholder="Nhập mã màu sắc"
            class="mb-3"
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="visible = false">Hủy</CButton>
        <CButton color="primary" @click="addItem">Lưu</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const visible = ref(false)

const items = ref([
  { ten_mau_sac: 'Đỏ', ma_mau_sac: 'MS01', ngay_tao: '10-06-2024', ngay_cap_nhat: '12-06-2025' },
  { ten_mau_sac: 'Xanh', ma_mau_sac: 'MS02', ngay_tao: '11-06-2024', ngay_cap_nhat: '12-06-2025' },
  { ten_mau_sac: 'Đen', ma_mau_sac: 'MS03', ngay_tao: '12-06-2024', ngay_cap_nhat: '12-06-2025' },
])

const newItem = ref({
  ten_mau_sac: '',
  ma_mau_sac: '',
})

const addItem = () => {
  const today = new Date().toLocaleDateString('vi-VN')
  if (!newItem.value.ten_mau_sac || !newItem.value.ma_mau_sac) return

  items.value.push({
    ...newItem.value,
    ngay_tao: today,
    ngay_cap_nhat: today,
  })
  newItem.value.ten_mau_sac = ''
  newItem.value.ma_mau_sac = ''
  visible.value = false
}
</script>
