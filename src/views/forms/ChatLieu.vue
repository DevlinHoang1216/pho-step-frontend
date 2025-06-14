<template>
  <div>
    <!-- Tiêu đề + nút thêm mới -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>Chất liệu</h4>
    </div>

<!-- Tìm kiếm + Nút + Thêm mới -->
<CRow class="mb-3">
  <CCol md="9">
    <CFormInput
      v-model="search"
      placeholder="Tìm kiếm chất liệu..."
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

    <!-- Bảng hiển thị chất liệu -->
    <CTable striped hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>#</CTableHeaderCell>
          <CTableHeaderCell>Tên</CTableHeaderCell>
          <CTableHeaderCell>Mã chất liệu</CTableHeaderCell>
          <CTableHeaderCell>Ngày tạo</CTableHeaderCell>
          <CTableHeaderCell>Ngày cập nhật</CTableHeaderCell>
          <CTableHeaderCell>Thao tác</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="(item, index) in items" :key="index">
          <CTableHeaderCell>{{ index + 1 }}</CTableHeaderCell>
          <CTableDataCell>{{ item.ten }}</CTableDataCell>
          <CTableDataCell>{{ item.machatlieu }}</CTableDataCell>
          <CTableDataCell>{{ item.ngaytao }}</CTableDataCell>
          <CTableDataCell>{{ item.ngaycapnhat }}</CTableDataCell>
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
        <CModalTitle>Thêm chất liệu</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput
            v-model="newItem.ten"
            label="Tên chất liệu"
            placeholder="Nhập tên chất liệu"
            class="mb-3"
          />
          <CFormInput
            v-model="newItem.machatlieu"
            label="Mã chất liệu"
            placeholder="Nhập mã chất liệu"
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
  { ten: 'Cao su', machatlieu: 'ma1', ngaytao: '22-02-2024', ngaycapnhat: '12-06-2025' },
  { ten: 'Da', machatlieu: 'ma2', ngaytao: '14-02-2024', ngaycapnhat: '12-06-2025' },
  { ten: 'Vải', machatlieu: 'ma3', ngaytao: '13-02-2024', ngaycapnhat: '12-06-2025' },
  { ten: 'Nhựa', machatlieu: 'ma4', ngaytao: '05-02-2024', ngaycapnhat: '12-06-2025' },
])

const newItem = ref({
  ten: '',
  machatlieu: '',
})

const addItem = () => {
  const today = new Date().toLocaleDateString('vi-VN')
  if (!newItem.value.ten || !newItem.value.machatlieu) return

  items.value.push({
    ...newItem.value,
    ngaytao: today,
    ngaycapnhat: today,
  })
  newItem.value.ten = ''
  newItem.value.machatlieu = ''
  visible.value = false
}
</script>
