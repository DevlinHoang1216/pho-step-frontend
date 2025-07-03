<template>
  <div>
    <!-- Tiêu đề -->
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>Danh Mục</h4>
    </div>

    <!-- Ô tìm kiếm + Thêm mới -->
    <CRow class="mb-3">
      <CCol md="9">
        <CFormInput
          v-model="searchQuery"
          placeholder="Tìm kiếm danh mục theo tên hoặc mã..."
          @keyup.enter="handleSearch"
        />
      </CCol>
      <CCol md="3" class="d-flex justify-content-end gap-2">
        <CButton color="info" @click="handleSearch">
          <CIcon icon="cil-search" class="me-2" />
          Tìm kiếm
        </CButton>
        <CButton color="primary" @click="openAddModal">
          <CIcon icon="cil-plus" class="me-2" />
          Thêm Mới
        </CButton>
      </CCol>
    </CRow>

    <!-- Thông báo (Success/Error) -->
    <CAlert :color="messageType" v-if="message" class="mb-3">{{ message }}</CAlert>

    <!-- Bảng danh mục -->
    <div v-if="loading" class="text-center">Đang tải dữ liệu...</div>
    <CTable striped hover responsive v-else>
      <CTableHead>
        <CTableRow>
          <CTableHeaderCell>#</CTableHeaderCell>
          <CTableHeaderCell>Tên danh mục</CTableHeaderCell>
          <CTableHeaderCell>Mã danh mục</CTableHeaderCell>
          <CTableHeaderCell>Ngày tạo</CTableHeaderCell>
          <CTableHeaderCell>Ngày cập nhật</CTableHeaderCell>
          <CTableHeaderCell>Thao tác</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow v-if="danhMucs.length === 0">
          <CTableDataCell colspan="6" class="text-center">Không có danh mục nào.</CTableDataCell>
        </CTableRow>
        <CTableRow v-for="(item, index) in danhMucs" :key="item.id">
          <CTableHeaderCell>{{ index + 1 }}</CTableHeaderCell>
          <CTableDataCell>{{ item.tenDanhMuc }}</CTableDataCell>
          <CTableDataCell>{{ item.maDanhMuc }}</CTableDataCell>
          <CTableDataCell>{{ formatDate(item.ngayTao) }}</CTableDataCell>
          <CTableDataCell>{{ formatDate(item.ngayCapNhat) }}</CTableDataCell>
          <CTableDataCell>
            <CButton size="sm" color="info" class="me-2" @click="openEditModal(item)">
              <CIcon icon="cil-pencil" />
            </CButton>
            <CButton size="sm" color="danger" @click="deleteDanhMuc(item.id)">
              <CIcon icon="cil-trash" />
            </CButton>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>

    <!-- Modal thêm mới -->
    <CModal :visible="visibleAddModal" @close="visibleAddModal = false">
      <CModalHeader>
        <CModalTitle>Thêm danh mục mới</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput
            v-model="newDanhMuc.tenDanhMuc"
            label="Tên danh mục"
            placeholder="Nhập tên danh mục"
            class="mb-3"
          />
          <CFormInput
            v-model="newDanhMuc.maDanhMuc"
            label="Mã danh mục"
            placeholder="Nhập mã danh mục"
            class="mb-3"
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="visibleAddModal = false">Hủy</CButton>
        <CButton color="primary" @click="addDanhMuc">Lưu</CButton>
      </CModalFooter>
    </CModal>

    <!-- Modal chỉnh sửa -->
    <CModal :visible="visibleEditModal" @close="visibleEditModal = false">
      <CModalHeader>
        <CModalTitle>Cập nhật danh mục</CModalTitle>
      </CModalHeader>
      <CModalBody v-if="currentDanhMuc">
        <CForm>
          <CFormInput
            v-model="currentDanhMuc.tenDanhMuc"
            label="Tên danh mục"
            placeholder="Nhập tên danh mục"
            class="mb-3"
          />
          <CFormInput
            v-model="currentDanhMuc.maDanhMuc"
            label="Mã danh mục"
            placeholder="Nhập mã danh mục"
            class="mb-3"
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="visibleEditModal = false">Hủy</CButton>
        <CButton color="primary" @click="updateDanhMuc">Cập nhật</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios'; // Import Axios
import {
  CAlert,
  CButton,
  CCol,
  CForm,
  CFormInput,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/vue'; // Import các components CoreUI bạn đang dùng
import CIcon from '@coreui/icons-vue'; // Import CIcon nếu bạn dùng icon

// Base URL cho API của bạn
const API_BASE_URL = 'http://localhost:8080/api/danhmuc'; // URL cho API Danh Mục

// --- Reactive State ---
const danhMucs = ref([]); // Danh sách danh mục
const loading = ref(true); // Trạng thái tải dữ liệu
const message = ref(''); // Thông báo cho người dùng
const messageType = ref(''); // Loại thông báo (success, danger, info, etc.)

const visibleAddModal = ref(false); // Trạng thái hiển thị modal thêm mới
const visibleEditModal = ref(false); // Trạng thái hiển thị modal chỉnh sửa

const newDanhMuc = ref({ // Dữ liệu cho danh mục mới
  tenDanhMuc: '',
  maDanhMuc: '',
});

const currentDanhMuc = ref(null); // Dữ liệu danh mục đang được chỉnh sửa

const searchQuery = ref(''); // Dữ liệu cho ô tìm kiếm

// --- Lifecycle Hook ---
onMounted(() => {
  fetchDanhMucs(); // Tải dữ liệu khi component được mount
});

// --- Methods ---

// Hàm hiển thị thông báo
const showMessage = (text, type = 'info') => {
  message.value = text;
  messageType.value = type;
  setTimeout(() => {
    message.value = '';
    messageType.value = '';
  }, 3000); // Ẩn thông báo sau 3 giây
};

// Hàm định dạng ngày tháng
const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN'); // Định dạng theo ngôn ngữ Việt Nam
};

// Lấy danh sách danh mục từ API
const fetchDanhMucs = async () => {
  loading.value = true;
  try {
    const response = await axios.get(API_BASE_URL);
    danhMucs.value = response.data;
  } catch (error) {
    console.error('Lỗi khi tải danh sách danh mục:', error);
    showMessage('Không thể tải dữ liệu danh mục. Vui lòng thử lại.', 'danger');
  } finally {
    loading.value = false;
  }
};

// Thêm danh mục mới
const addDanhMuc = async () => {
  if (!newDanhMuc.value.tenDanhMuc || !newDanhMuc.value.maDanhMuc) {
    showMessage('Vui lòng điền đầy đủ tên và mã danh mục.', 'warning');
    return;
  }

  try {
    const response = await axios.post(API_BASE_URL, newDanhMuc.value);
    danhMucs.value.push(response.data); // Thêm danh mục mới vào danh sách
    showMessage('Thêm danh mục thành công!', 'success');
    newDanhMuc.value = { tenDanhMuc: '', maDanhMuc: '' }; // Reset form
    visibleAddModal.value = false; // Đóng modal
  } catch (error) {
    console.error('Lỗi khi thêm danh mục:', error);
    if (error.response && error.response.status === 400) {
      showMessage('Mã danh mục đã tồn tại hoặc dữ liệu không hợp lệ.', 'danger');
    } else {
      showMessage('Thêm danh mục thất bại. Vui lòng thử lại.', 'danger');
    }
  }
};

// Mở modal chỉnh sửa và gán dữ liệu
const openEditModal = (item) => {
  currentDanhMuc.value = { ...item }; // Tạo bản sao để tránh sửa trực tiếp trên dữ liệu gốc
  visibleEditModal.value = true;
};

// Cập nhật danh mục
const updateDanhMuc = async () => {
  if (!currentDanhMuc.value.tenDanhMuc || !currentDanhMuc.value.maDanhMuc) {
    showMessage('Vui lòng điền đầy đủ tên và mã danh mục.', 'warning');
    return;
  }

  try {
    const response = await axios.put(`${API_BASE_URL}/${currentDanhMuc.value.id}`, currentDanhMuc.value);
    // Cập nhật danh mục trong danh sách hiện tại
    const index = danhMucs.value.findIndex(dm => dm.id === response.data.id);
    if (index !== -1) {
      danhMucs.value[index] = response.data;
    }
    showMessage('Cập nhật danh mục thành công!', 'success');
    visibleEditModal.value = false; // Đóng modal
    currentDanhMuc.value = null; // Reset
  } catch (error) {
    console.error('Lỗi khi cập nhật danh mục:', error);
    if (error.response && error.response.status === 400) {
      showMessage('Mã danh mục đã tồn tại hoặc dữ liệu không hợp lệ.', 'danger');
    } else if (error.response && error.response.status === 404) {
      showMessage('Không tìm thấy danh mục để cập nhật.', 'danger');
    } else {
      showMessage('Cập nhật danh mục thất bại. Vui lòng thử lại.', 'danger');
    }
  }
};

// Xóa danh mục
const deleteDanhMuc = async (id) => {
  if (!confirm('Bạn có chắc chắn muốn xóa danh mục này không?')) {
    return;
  }

  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
    danhMucs.value = danhMucs.value.filter(dm => dm.id !== id); // Xóa khỏi danh sách
    showMessage('Xóa danh mục thành công!', 'success');
  } catch (error) {
    console.error('Lỗi khi xóa danh mục:', error);
    if (error.response && error.response.status === 404) {
      showMessage('Không tìm thấy danh mục để xóa.', 'danger');
    } else {
      showMessage('Xóa danh mục thất bại. Vui lòng thử lại.', 'danger');
    }
  }
};

// Xử lý tìm kiếm
const handleSearch = async () => {
  loading.value = true;
  try {
    let response;
    if (searchQuery.value.trim() === '') {
      // Nếu ô tìm kiếm rỗng, hiển thị tất cả
      response = await axios.get(API_BASE_URL);
    } else {
      // Thử tìm kiếm theo tên trước, nếu không có kết quả thì tìm theo mã
      response = await axios.get(`${API_BASE_URL}/search?ten=${searchQuery.value}`);
      if (response.data.length === 0) {
          response = await axios.get(`${API_BASE_URL}/search?ma=${searchQuery.value}`);
      }
    }
    danhMucs.value = response.data;
    if (danhMucs.value.length === 0 && searchQuery.value.trim() !== '') {
        showMessage('Không tìm thấy kết quả nào cho tìm kiếm của bạn.', 'info');
    } else if (searchQuery.value.trim() !== '') {
        showMessage('Tìm kiếm thành công!', 'success');
    }
  } catch (error) {
    console.error('Lỗi khi tìm kiếm danh mục:', error);
    showMessage('Lỗi khi tìm kiếm danh mục. Vui lòng thử lại.', 'danger');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Các class CoreUI và d-flex (Bootstrap) đã được sử dụng. */
/* Đảm bảo dự án Vue của bạn đã tích hợp CoreUI và Bootstrap/Tailwind CSS */
</style>
