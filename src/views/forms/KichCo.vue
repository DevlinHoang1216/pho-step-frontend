<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>Kích Cỡ</h4>
    </div>

<!-- Tìm kiếm + Nút + Thêm mới -->
<CRow class="mb-3">
  <CCol md="9">
    <CFormInput
      v-model="search"
      placeholder="Tìm kiếm kích cỡ..."
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

    <CTable striped hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>#</CTableHeaderCell>
          <CTableHeaderCell>Tên kích cỡ</CTableHeaderCell>
          <CTableHeaderCell>Mã kích cỡ</CTableHeaderCell>
          <CTableHeaderCell>Ngày tạo</CTableHeaderCell>
          <CTableHeaderCell>Ngày cập nhật</CTableHeaderCell>
          <CTableHeaderCell>Thao tác</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="(item, index) in items" :key="index">
          <CTableHeaderCell>{{ index + 1 }}</CTableHeaderCell>
          <CTableDataCell>{{ item.ten_kich_co }}</CTableDataCell>
          <CTableDataCell>{{ item.ma_kich_co }}</CTableDataCell>
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
        <CModalTitle>Thêm kích cỡ</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput
            v-model="newItem.ten_kich_co"
            label="Tên kích cỡ"
            placeholder="Nhập tên kích cỡ"
            class="mb-3"
          />
          <CFormInput
            v-model="newItem.ma_kich_co"
            label="Mã kích cỡ"
            placeholder="Nhập mã kích cỡ"
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
  { ten_kich_co: 'Size 36', ma_kich_co: 'S36', ngay_tao: '10-06-2024', ngay_cap_nhat: '12-06-2025' },
  { ten_kich_co: 'Size 37', ma_kich_co: 'S37', ngay_tao: '11-06-2024', ngay_cap_nhat: '12-06-2025' },
  { ten_kich_co: 'Size 38', ma_kich_co: 'S38', ngay_tao: '12-06-2024', ngay_cap_nhat: '12-06-2025' },
])

const newItem = ref({
  ten_kich_co: '',
  ma_kich_co: '',
})

const addItem = () => {
  const today = new Date().toLocaleDateString('vi-VN')
  if (!newItem.value.ten_kich_co || !newItem.value.ma_kich_co) return

  items.value.push({
    ...newItem.value,
    ngay_tao: today,
    ngay_cap_nhat: today,
  })
  newItem.value.ten_kich_co = ''
  newItem.value.ma_kich_co = ''
  visible.value = false
}
</script>
