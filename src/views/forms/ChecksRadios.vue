<template>
  <div>
    <h4>Chất liệu</h4>

    <CRow class="mb-3">
      <CCol xs="12">
        <CFormInput placeholder="Tìm kiếm chất liệu..." />
      </CCol>
    </CRow>

    <CTable striped hover responsive>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">Tên</CTableHeaderCell>
          <CTableHeaderCell scope="col">Mã chất liệu</CTableHeaderCell>
          <CTableHeaderCell scope="col">Ngày tạo</CTableHeaderCell>
          <CTableHeaderCell scope="col">Ngày cập nhật</CTableHeaderCell>
          <CTableHeaderCell scope="col">Trạng thái</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-for="(item, index) in items" :key="index">
          <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
          <CTableDataCell>{{ item.ten }}</CTableDataCell>
          <CTableDataCell>{{ item.machatlieu }}</CTableDataCell>
          <CTableDataCell>{{ item.ngaytao }}</CTableDataCell>
          <CTableDataCell>{{ item.ngaycapnhat }}</CTableDataCell>

          <CTableDataCell>
            <CButton size="sm" color="info" class="me-2">
              <CIcon icon="cil-pencil" />
            </CButton>
            <CButton size="sm" color="danger">
              <CIcon icon="cil-trash" />
            </CButton>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const items = ref([
  { ten: 'Cao su', machatlieu: 'ma1', ngaytao: '22-02-2024', ngaycapnhat:'12-06-2025' },
  { ten: 'Da', machatlieu: 'ma2', ngaytao: '14-02-2024', ngaycapnhat:'12-06-2025' },
  { ten: 'Vải', machatlieu: 'ma3', ngaytao: '13-02-2024', ngaycapnhat:'12-06-2025' },
  { ten: 'Nhựa', machatlieu: 'ma4', ngaytao: '05-02-2024', ngaycapnhat:'12-06-2025' },
])
</script>
