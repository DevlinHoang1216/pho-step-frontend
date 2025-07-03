<template>
  <div>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <h4>Màu Sắc</h4>
    </div>

    <!-- Tìm kiếm + Nút + Thêm mới -->
    <CRow class="mb-3">
      <CCol md="9">
        <CFormInput
          v-model="searchQuery"
          placeholder="Tìm kiếm màu sắc theo tên hoặc mã..."
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

    <div v-if="loading" class="text-center">Đang tải dữ liệu...</div>
    <CTable striped hover responsive v-else>
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
        <CTableRow v-if="mauSacs.length === 0">
          <CTableDataCell colspan="6" class="text-center">Không có màu sắc nào.</CTableDataCell>
        </CTableRow>
        <CTableRow v-for="(item, index) in mauSacs" :key="item.id">
          <CTableHeaderCell>{{ index + 1 }}</CTableHeaderCell>
          <CTableDataCell>{{ item.tenMauSac }}</CTableDataCell>
          <CTableDataCell>{{ item.maMauSac }}</CTableDataCell>
          <CTableDataCell>{{ formatDate(item.ngayTao) }}</CTableDataCell>
          <CTableDataCell>{{ formatDate(item.ngayCapNhat) }}</CTableDataCell>
          <CTableDataCell>
            <!-- Sửa -->
            <CButton size="sm" color="info" class="me-2" @click="openEditModal(item)">
              <CIcon icon="cil-pencil" />
            </CButton>
            <!-- Xóa -->
            <CButton size="sm" color="danger" @click="deleteMauSac(item.id)">
              <CIcon icon="cil-trash" />
            </CButton>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>

    <!-- Modal Thêm Mới -->
    <CModal :visible="visibleAddModal" @close="visibleAddModal = false">
      <CModalHeader>
        <CModalTitle>Thêm màu sắc mới</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput
            v-model="newMauSac.tenMauSac"
            label="Tên màu sắc"
            placeholder="Nhập tên màu sắc"
            class="mb-3"
          />
          <CFormInput
            v-model="newMauSac.maMauSac"
            label="Mã màu sắc"
            placeholder="Nhập mã màu sắc"
            class="mb-3"
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="visibleAddModal = false">Hủy</CButton>
        <CButton color="primary" @click="addMauSac">Lưu</CButton>
      </CModalFooter>
    </CModal>

    <!-- Modal Chỉnh Sửa -->
    <CModal :visible="visibleEditModal" @close="visibleEditModal = false">
      <CModalHeader>
        <CModalTitle>Chỉnh sửa màu sắc</CModalTitle>
      </CModalHeader>
      <CModalBody v-if="currentMauSac">
        <CForm>
          <CFormInput
            v-model="currentMauSac.tenMauSac"
            label="Tên màu sắc"
            placeholder="Nhập tên màu sắc"
            class="mb-3"
          />
          <CFormInput
            v-model="currentMauSac.maMauSac"
            label="Mã màu sắc"
            placeholder="Nhập mã màu sắc"
            class="mb-3"
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="visibleEditModal = false">Hủy</CButton>
        <CButton color="primary" @click="updateMauSac">Lưu thay đổi</CButton>
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
const API_BASE_URL = 'http://localhost:8080/api/mausac'; // URL cho API Màu Sắc

// --- Reactive State ---
const mauSacs = ref([]); // Danh sách màu sắc
const loading = ref(true); // Trạng thái tải dữ liệu
const message = ref(''); // Thông báo cho người dùng
const messageType = ref(''); // Loại thông báo (success, danger, info, etc.)

const visibleAddModal = ref(false); // Trạng thái hiển thị modal thêm mới
const visibleEditModal = ref(false); // Trạng thái hiển thị modal chỉnh sửa

const newMauSac = ref({ // Dữ liệu cho màu sắc mới
  tenMauSac: '',
  maMauSac: '',
});

const currentMauSac = ref(null); // Dữ liệu màu sắc đang được chỉnh sửa

const searchQuery = ref(''); // Dữ liệu cho ô tìm kiếm

// --- Lifecycle Hook ---
onMounted(() => {
  fetchMauSacs(); // Tải dữ liệu khi component được mount
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

// Lấy danh sách màu sắc từ API
const fetchMauSacs = async () => {
  loading.value = true;
  try {
    const response = await axios.get(API_BASE_URL);
    mauSacs.value = response.data;
  } catch (error) {
    console.error('Lỗi khi tải danh sách màu sắc:', error);
    showMessage('Không thể tải dữ liệu màu sắc. Vui lòng thử lại.', 'danger');
  } finally {
    loading.value = false;
  }
};

// Hàm mở modal thêm mới
const openAddModal = () => {
  newMauSac.value = { tenMauSac: '', maMauSac: '' }; // Reset form
  visibleAddModal.value = true; // Hiển thị modal
};

// Thêm màu sắc mới
const addMauSac = async () => {
  if (!newMauSac.value.tenMauSac || !newMauSac.value.maMauSac) {
    showMessage('Vui lòng điền đầy đủ tên và mã màu sắc.', 'warning');
    return;
  }

  try {
    const response = await axios.post(API_BASE_URL, newMauSac.value);
    mauSacs.value.push(response.data); // Thêm màu sắc mới vào danh sách
    showMessage('Thêm màu sắc thành công!', 'success');
    newMauSac.value = { tenMauSac: '', maMauSac: '' }; // Reset form
    visibleAddModal.value = false; // Đóng modal
  } catch (error) {
    console.error('Lỗi khi thêm màu sắc:', error);
    if (error.response && error.response.status === 400) {
      showMessage('Mã màu sắc đã tồn tại hoặc dữ liệu không hợp lệ.', 'danger');
    } else {
      showMessage('Thêm màu sắc thất bại. Vui lòng thử lại.', 'danger');
    }
  }
};

// Mở modal chỉnh sửa và gán dữ liệu
const openEditModal = (item) => {
  currentMauSac.value = { ...item }; // Tạo bản sao để tránh sửa trực tiếp trên dữ liệu gốc
  visibleEditModal.value = true;
};

// Cập nhật màu sắc
const updateMauSac = async () => {
  if (!currentMauSac.value.tenMauSac || !currentMauSac.value.maMauSac) {
    showMessage('Vui lòng điền đầy đủ tên và mã màu sắc.', 'warning');
    return;
  }

  try {
    const response = await axios.put(`${API_BASE_URL}/${currentMauSac.value.id}`, currentMauSac.value);
    // Cập nhật màu sắc trong danh sách hiện tại
    const index = mauSacs.value.findIndex(ms => ms.id === response.data.id);
    if (index !== -1) {
      mauSacs.value[index] = response.data;
    }
    showMessage('Cập nhật màu sắc thành công!', 'success');
    visibleEditModal.value = false; // Đóng modal
    currentMauSac.value = null; // Reset
  } catch (error) {
    console.error('Lỗi khi cập nhật màu sắc:', error);
    if (error.response && error.response.status === 400) {
      showMessage('Mã màu sắc đã tồn tại hoặc dữ liệu không hợp lệ.', 'danger');
    } else if (error.response && error.response.status === 404) {
      showMessage('Không tìm thấy màu sắc để cập nhật.', 'danger');
    } else {
      showMessage('Cập nhật màu sắc thất bại. Vui lòng thử lại.', 'danger');
    }
  }
};

// Xóa màu sắc
const deleteMauSac = async (id) => {
  if (!confirm('Bạn có chắc chắn muốn xóa màu sắc này không?')) {
    return;
  }

  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
    mauSacs.value = mauSacs.value.filter(ms => ms.id !== id); // Xóa khỏi danh sách
    showMessage('Xóa màu sắc thành công!', 'success');
  } catch (error) {
    console.error('Lỗi khi xóa màu sắc:', error);
    if (error.response && error.response.status === 404) {
      showMessage('Không tìm thấy màu sắc để xóa.', 'danger');
    } else {
      showMessage('Xóa màu sắc thất bại. Vui lòng thử lại.', 'danger');
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
    mauSacs.value = response.data;
    if (mauSacs.value.length === 0 && searchQuery.value.trim() !== '') {
        showMessage('Không tìm thấy kết quả nào cho tìm kiếm của bạn.', 'info');
    } else if (searchQuery.value.trim() !== '') {
        showMessage('Tìm kiếm thành công!', 'success');
    }
  } catch (error) {
    console.error('Lỗi khi tìm kiếm màu sắc:', error);
    showMessage('Lỗi khi tìm kiếm màu sắc. Vui lòng thử lại.', 'danger');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Các class CoreUI và d-flex (Bootstrap) đã được sử dụng. */
/* Đảm bảo dự án Vue của bạn đã tích hợp CoreUI và Bootstrap/Tailwind CSS */
</style>
