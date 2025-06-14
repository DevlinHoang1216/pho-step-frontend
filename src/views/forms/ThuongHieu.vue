<template>
  <div>
    <!-- Tiêu đề + nút Thêm mới -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>Thương Hiệu</h4>
    </div>

<!-- Tìm kiếm + Nút + Thêm mới -->
<CRow class="mb-3">
  <CCol md="9">
    <CFormInput
      v-model="search"
      placeholder="Tìm kiếm thương hiệu..."
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
          <CTableHeaderCell>Tên thương hiệu</CTableHeaderCell>
          <CTableHeaderCell>Mã thương hiệu</CTableHeaderCell>
          <CTableHeaderCell>Ngày tạo</CTableHeaderCell>
          <CTableHeaderCell>Ngày cập nhật</CTableHeaderCell>
          <CTableHeaderCell>Thao tác</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="(item, index) in filteredItems" :key="index">
          <CTableHeaderCell>{{ index + 1 }}</CTableHeaderCell>
          <CTableDataCell>{{ item.ten_thuong_hieu }}</CTableDataCell>
          <CTableDataCell>{{ item.ma_thuong_hieu }}</CTableDataCell>
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

    <!-- Modal thêm mới -->
    <CModal :visible="visible" @close="visible = false">
      <CModalHeader>
        <CModalTitle>Thêm thương hiệu</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput
            v-model="newItem.ten_thuong_hieu"
            label="Tên thương hiệu"
            placeholder="Nhập tên thương hiệu"
            class="mb-3"
          />
          <CFormInput
            v-model="newItem.ma_thuong_hieu"
            label="Mã thương hiệu"
            placeholder="Nhập mã thương hiệu"
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
import { ref, computed } from 'vue'

const visible = ref(false)
const search = ref('')
const items = ref([
  { ten_thuong_hieu: 'Adidas', ma_thuong_hieu: 'TH01', ngay_tao: '22-02-2024', ngay_cap_nhat: '12-06-2025' },
  { ten_thuong_hieu: 'Vans', ma_thuong_hieu: 'TH02', ngay_tao: '14-02-2024', ngay_cap_nhat: '12-06-2025' },
  { ten_thuong_hieu: 'Nike', ma_thuong_hieu: 'TH03', ngay_tao: '13-02-2024', ngay_cap_nhat: '12-06-2025' },
  { ten_thuong_hieu: 'Converse', ma_thuong_hieu: 'TH04', ngay_tao: '05-02-2024', ngay_cap_nhat: '12-06-2025' },
])

const filteredItems = ref([...items.value])

const handleSearch = () => {
  const keyword = search.value.toLowerCase().trim()
  if (keyword === '') {
    filteredItems.value = [...items.value]
  } else {
    filteredItems.value = items.value.filter(item =>
      item.ten_thuong_hieu.toLowerCase().includes(keyword)
    )
  }
}

const newItem = ref({
  ten_thuong_hieu: '',
  ma_thuong_hieu: '',
})

const addItem = () => {
  const today = new Date().toLocaleDateString('vi-VN')
  if (!newItem.value.ten_thuong_hieu || !newItem.value.ma_thuong_hieu) return

  const newObj = {
    ...newItem.value,
    ngay_tao: today,
    ngay_cap_nhat: today,
  }
  items.value.push(newObj)
  filteredItems.value.push(newObj)

  newItem.value.ten_thuong_hieu = ''
  newItem.value.ma_thuong_hieu = ''
  visible.value = false
}
</script>
