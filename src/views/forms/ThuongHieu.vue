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
          v-model="searchQuery"
          placeholder="Tìm kiếm thương hiệu theo tên hoặc mã..."
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

    <!-- Bảng dữ liệu -->
    <div v-if="loading" class="text-center">Đang tải dữ liệu...</div>
    <CTable striped hover responsive v-else>
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
        <CTableRow v-if="thuongHieus.length === 0">
          <CTableDataCell colspan="6" class="text-center">Không có thương hiệu nào.</CTableDataCell>
        </CTableRow>
        <CTableRow v-for="(item, index) in thuongHieus" :key="item.id">
          <CTableHeaderCell>{{ index + 1 }}</CTableHeaderCell>
          <CTableDataCell>{{ item.tenThuongHieu }}</CTableDataCell>
          <CTableDataCell>{{ item.maThuongHieu }}</CTableDataCell>
          <CTableDataCell>{{ formatDate(item.ngayTao) }}</CTableDataCell>
          <CTableDataCell>{{ formatDate(item.ngayCapNhat) }}</CTableDataCell>
          <CTableDataCell>
            <!-- Sửa -->
            <CButton size="sm" color="info" class="me-2" @click="openEditModal(item)">
              <CIcon icon="cil-pencil" />
            </CButton>
            <!-- Xóa -->
            <CButton size="sm" color="danger" @click="deleteThuongHieu(item.id)">
              <CIcon icon="cil-trash" />
            </CButton>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>

    <!-- Modal Thêm Mới -->
    <CModal :visible="visibleAddModal" @close="visibleAddModal = false">
      <CModalHeader>
        <CModalTitle>Thêm thương hiệu mới</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput
            v-model="newThuongHieu.tenThuongHieu"
            label="Tên thương hiệu"
            placeholder="Nhập tên thương hiệu"
            class="mb-3"
          />
          <CFormInput
            v-model="newThuongHieu.maThuongHieu"
            label="Mã thương hiệu"
            placeholder="Nhập mã thương hiệu"
            class="mb-3"
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="visibleAddModal = false">Hủy</CButton>
        <CButton color="primary" @click="addThuongHieu">Lưu</CButton>
      </CModalFooter>
    </CModal>

    <!-- Modal Chỉnh Sửa -->
    <CModal :visible="visibleEditModal" @close="visibleEditModal = false">
      <CModalHeader>
        <CModalTitle>Chỉnh sửa thương hiệu</CModalTitle>
      </CModalHeader>
      <CModalBody v-if="currentThuongHieu">
        <CForm>
          <CFormInput
            v-model="currentThuongHieu.tenThuongHieu"
            label="Tên thương hiệu"
            placeholder="Nhập tên thương hiệu"
            class="mb-3"
          />
          <CFormInput
            v-model="currentThuongHieu.maThuongHieu"
            label="Mã thương hiệu"
            placeholder="Nhập mã thương hiệu"
            class="mb-3"
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="visibleEditModal = false">Hủy</CButton>
        <CButton color="primary" @click="updateThuongHieu">Lưu thay đổi</CButton>
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
const API_BASE_URL = 'http://localhost:8080/api/thuonghieu'; // URL cho API Thương Hiệu

// --- Reactive State ---
const thuongHieus = ref([]); // Danh sách thương hiệu
const loading = ref(true); // Trạng thái tải dữ liệu
const message = ref(''); // Thông báo cho người dùng
const messageType = ref(''); // Loại thông báo (success, danger, info, etc.)

const visibleAddModal = ref(false); // Trạng thái hiển thị modal thêm mới
const visibleEditModal = ref(false); // Trạng thái hiển thị modal chỉnh sửa

const newThuongHieu = ref({ // Dữ liệu cho thương hiệu mới
  tenThuongHieu: '',
  maThuongHieu: '',
});

const currentThuongHieu = ref(null); // Dữ liệu thương hiệu đang được chỉnh sửa

const searchQuery = ref(''); // Dữ liệu cho ô tìm kiếm

// --- Lifecycle Hook ---
onMounted(() => {
  fetchThuongHieus(); // Tải dữ liệu khi component được mount
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

// Lấy danh sách thương hiệu từ API
const fetchThuongHieus = async () => {
  loading.value = true;
  try {
    const response = await axios.get(API_BASE_URL);
    thuongHieus.value = response.data;
  } catch (error) {
    console.error('Lỗi khi tải danh sách thương hiệu:', error);
    showMessage('Không thể tải dữ liệu thương hiệu. Vui lòng thử lại.', 'danger');
  } finally {
    loading.value = false;
  }
};

// Hàm mở modal thêm mới
const openAddModal = () => {
  newThuongHieu.value = { tenThuongHieu: '', maThuongHieu: '' }; // Reset form
  visibleAddModal.value = true; // Hiển thị modal
};

// Thêm thương hiệu mới
const addThuongHieu = async () => {
  if (!newThuongHieu.value.tenThuongHieu || !newThuongHieu.value.maThuongHieu) {
    showMessage('Vui lòng điền đầy đủ tên và mã thương hiệu.', 'warning');
    return;
  }

  try {
    const response = await axios.post(API_BASE_URL, newThuongHieu.value);
    thuongHieus.value.push(response.data); // Thêm thương hiệu mới vào danh sách
    showMessage('Thêm thương hiệu thành công!', 'success');
    newThuongHieu.value = { tenThuongHieu: '', maThuongHieu: '' }; // Reset form
    visibleAddModal.value = false; // Đóng modal
  } catch (error) {
    console.error('Lỗi khi thêm thương hiệu:', error);
    if (error.response && error.response.status === 400) {
      showMessage('Mã thương hiệu đã tồn tại hoặc dữ liệu không hợp lệ.', 'danger');
    } else {
      showMessage('Thêm thương hiệu thất bại. Vui lòng thử lại.', 'danger');
    }
  }
};

// Mở modal chỉnh sửa và gán dữ liệu
const openEditModal = (item) => {
  currentThuongHieu.value = { ...item }; // Tạo bản sao để tránh sửa trực tiếp trên dữ liệu gốc
  visibleEditModal.value = true;
};

// Cập nhật thương hiệu
const updateThuongHieu = async () => {
  if (!currentThuongHieu.value.tenThuongHieu || !currentThuongHieu.value.maThuongHieu) {
    showMessage('Vui lòng điền đầy đủ tên và mã thương hiệu.', 'warning');
    return;
  }

  try {
    const response = await axios.put(`${API_BASE_URL}/${currentThuongHieu.value.id}`, currentThuongHieu.value);
    // Cập nhật thương hiệu trong danh sách hiện tại
    const index = thuongHieus.value.findIndex(th => th.id === response.data.id);
    if (index !== -1) {
      thuongHieus.value[index] = response.data;
    }
    showMessage('Cập nhật thương hiệu thành công!', 'success');
    visibleEditModal.value = false; // Đóng modal
    currentThuongHieu.value = null; // Reset
  } catch (error) {
    console.error('Lỗi khi cập nhật thương hiệu:', error);
    if (error.response && error.response.status === 400) {
      showMessage('Mã thương hiệu đã tồn tại hoặc dữ liệu không hợp lệ.', 'danger');
    } else if (error.response && error.response.status === 404) {
      showMessage('Không tìm thấy thương hiệu để cập nhật.', 'danger');
    } else {
      showMessage('Cập nhật thương hiệu thất bại. Vui lòng thử lại.', 'danger');
    }
  }
};

// Xóa thương hiệu
const deleteThuongHieu = async (id) => {
  if (!confirm('Bạn có chắc chắn muốn xóa thương hiệu này không?')) {
    return;
  }

  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
    thuongHieus.value = thuongHieus.value.filter(th => th.id !== id); // Xóa khỏi danh sách
    showMessage('Xóa thương hiệu thành công!', 'success');
  } catch (error) {
    console.error('Lỗi khi xóa thương hiệu:', error);
    if (error.response && error.response.status === 404) {
      showMessage('Không tìm thấy thương hiệu để xóa.', 'danger');
    } else {
      showMessage('Xóa thương hiệu thất bại. Vui lòng thử lại.', 'danger');
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
    thuongHieus.value = response.data;
    if (thuongHieus.value.length === 0 && searchQuery.value.trim() !== '') {
        showMessage('Không tìm thấy kết quả nào cho tìm kiếm của bạn.', 'info');
    } else if (searchQuery.value.trim() !== '') {
        showMessage('Tìm kiếm thành công!', 'success');
    }
  } catch (error) {
    console.error('Lỗi khi tìm kiếm thương hiệu:', error);
    showMessage('Lỗi khi tìm kiếm thương hiệu. Vui lòng thử lại.', 'danger');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Các class CoreUI và d-flex (Bootstrap) đã được sử dụng. */
/* Đảm bảo dự án Vue của bạn đã tích hợp CoreUI và Bootstrap/Tailwind CSS */
</style>
