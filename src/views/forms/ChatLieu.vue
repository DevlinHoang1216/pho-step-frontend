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
          v-model="searchQuery"
          placeholder="Tìm kiếm theo tên hoặc mã chất liệu..."
          @keyup.enter="handleSearch"
        />
      </CCol>
      <CCol md="3" class="d-flex justify-content-end gap-2">
        <CButton color="info" @click="handleSearch">
          <CIcon icon="cil-search" class="me-2" />
          Tìm kiếm
        </CButton>
        <CButton color="primary" @click="visibleAddModal = true">
          <CIcon icon="cil-plus" class="me-2" />
          Thêm Mới
        </CButton>
      </CCol>
    </CRow>

    <!-- Thông báo (Success/Error) -->
    <CAlert :color="messageType" v-if="message" class="mb-3">{{ message }}</CAlert>

    <!-- Bảng hiển thị chất liệu -->
    <div v-if="loading" class="text-center">Đang tải dữ liệu...</div>
    <CTable striped hover responsive v-else>
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
        <CTableRow v-if="chatLieus.length === 0">
          <CTableDataCell colspan="6" class="text-center">Không có chất liệu nào.</CTableDataCell>
        </CTableRow>
        <CTableRow v-for="(item, index) in chatLieus" :key="item.id">
          <CTableHeaderCell>{{ index + 1 }}</CTableHeaderCell>
          <CTableDataCell>{{ item.tenChatLieu }}</CTableDataCell>
          <CTableDataCell>{{ item.maChatLieu }}</CTableDataCell>
          <CTableDataCell>{{ formatDate(item.ngayTao) }}</CTableDataCell>
          <CTableDataCell>{{ formatDate(item.ngayCapNhat) }}</CTableDataCell>
          <CTableDataCell>
            <!-- Sửa -->
            <CButton size="sm" color="info" class="me-2" @click="openEditModal(item)">
              <CIcon icon="cil-pencil" />
            </CButton>
            <!-- Xóa -->
            <CButton size="sm" color="danger" @click="deleteChatLieu(item.id)">
              <CIcon icon="cil-trash" />
            </CButton>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>

    <!-- Modal Thêm Mới -->
    <CModal :visible="visibleAddModal" @close="visibleAddModal = false">
      <CModalHeader>
        <CModalTitle>Thêm chất liệu mới</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CForm>
          <CFormInput
            v-model="newChatLieu.tenChatLieu"
            label="Tên chất liệu"
            placeholder="Nhập tên chất liệu"
            class="mb-3"
          />
          <CFormInput
            v-model="newChatLieu.maChatLieu"
            label="Mã chất liệu"
            placeholder="Nhập mã chất liệu"
            class="mb-3"
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="visibleAddModal = false">Hủy</CButton>
        <CButton color="primary" @click="addChatLieu">Lưu</CButton>
      </CModalFooter>
    </CModal>

    <!-- Modal Chỉnh Sửa -->
    <CModal :visible="visibleEditModal" @close="visibleEditModal = false">
      <CModalHeader>
        <CModalTitle>Chỉnh sửa chất liệu</CModalTitle>
      </CModalHeader>
      <CModalBody v-if="currentChatLieu">
        <CForm>
          <CFormInput
            v-model="currentChatLieu.tenChatLieu"
            label="Tên chất liệu"
            placeholder="Nhập tên chất liệu"
            class="mb-3"
          />
          <CFormInput
            v-model="currentChatLieu.maChatLieu"
            label="Mã chất liệu"
            placeholder="Nhập mã chất liệu"
            class="mb-3"
          />
        </CForm>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="visibleEditModal = false">Hủy</CButton>
        <CButton color="primary" @click="updateChatLieu">Lưu thay đổi</CButton>
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
const API_BASE_URL = 'http://localhost:8080/api/chatlieu';

// --- Reactive State ---
const chatLieus = ref([]); // Danh sách chất liệu
const loading = ref(true); // Trạng thái tải dữ liệu
const message = ref(''); // Thông báo cho người dùng
const messageType = ref(''); // Loại thông báo (success, danger, info, etc.)

const visibleAddModal = ref(false); // Trạng thái hiển thị modal thêm mới
const visibleEditModal = ref(false); // Trạng thái hiển thị modal chỉnh sửa

const newChatLieu = ref({ // Dữ liệu cho chất liệu mới
  tenChatLieu: '',
  maChatLieu: '',
});

const currentChatLieu = ref(null); // Dữ liệu chất liệu đang được chỉnh sửa

const searchQuery = ref(''); // Dữ liệu cho ô tìm kiếm

// --- Lifecycle Hook ---
onMounted(() => {
  fetchChatLieus(); // Tải dữ liệu khi component được mount
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

// Lấy danh sách chất liệu từ API
const fetchChatLieus = async () => {
  loading.value = true;
  try {
    const response = await axios.get(API_BASE_URL);
    chatLieus.value = response.data;
  } catch (error) {
    console.error('Lỗi khi tải danh sách chất liệu:', error);
    showMessage('Không thể tải dữ liệu chất liệu. Vui lòng thử lại.', 'danger');
  } finally {
    loading.value = false;
  }
};

// Thêm chất liệu mới
const addChatLieu = async () => {
  if (!newChatLieu.value.tenChatLieu || !newChatLieu.value.maChatLieu) {
    showMessage('Vui lòng điền đầy đủ tên và mã chất liệu.', 'warning');
    return;
  }

  try {
    const response = await axios.post(API_BASE_URL, newChatLieu.value);
    chatLieus.value.push(response.data); // Thêm chất liệu mới vào danh sách
    showMessage('Thêm chất liệu thành công!', 'success');
    newChatLieu.value = { tenChatLieu: '', maChatLieu: '' }; // Reset form
    visibleAddModal.value = false; // Đóng modal
  } catch (error) {
    console.error('Lỗi khi thêm chất liệu:', error);
    if (error.response && error.response.status === 400) {
      showMessage('Mã chất liệu đã tồn tại hoặc dữ liệu không hợp lệ.', 'danger');
    } else {
      showMessage('Thêm chất liệu thất bại. Vui lòng thử lại.', 'danger');
    }
  }
};

// Mở modal chỉnh sửa và gán dữ liệu
const openEditModal = (item) => {
  currentChatLieu.value = { ...item }; // Tạo bản sao để tránh sửa trực tiếp trên dữ liệu gốc
  visibleEditModal.value = true;
};

// Cập nhật chất liệu
const updateChatLieu = async () => {
  if (!currentChatLieu.value.tenChatLieu || !currentChatLieu.value.maChatLieu) {
    showMessage('Vui lòng điền đầy đủ tên và mã chất liệu.', 'warning');
    return;
  }

  try {
    const response = await axios.put(`${API_BASE_URL}/${currentChatLieu.value.id}`, currentChatLieu.value);
    // Cập nhật chất liệu trong danh sách hiện tại
    const index = chatLieus.value.findIndex(cl => cl.id === response.data.id);
    if (index !== -1) {
      chatLieus.value[index] = response.data;
    }
    showMessage('Cập nhật chất liệu thành công!', 'success');
    visibleEditModal.value = false; // Đóng modal
    currentChatLieu.value = null; // Reset
  } catch (error) {
    console.error('Lỗi khi cập nhật chất liệu:', error);
    if (error.response && error.response.status === 400) {
      showMessage('Mã chất liệu đã tồn tại hoặc dữ liệu không hợp lệ.', 'danger');
    } else if (error.response && error.response.status === 404) {
      showMessage('Không tìm thấy chất liệu để cập nhật.', 'danger');
    } else {
      showMessage('Cập nhật chất liệu thất bại. Vui lòng thử lại.', 'danger');
    }
  }
};

// Xóa chất liệu
const deleteChatLieu = async (id) => {
  if (!confirm('Bạn có chắc chắn muốn xóa chất liệu này không?')) {
    return;
  }

  try {
    await axios.delete(`${API_BASE_URL}/${id}`);
    chatLieus.value = chatLieus.value.filter(cl => cl.id !== id); // Xóa khỏi danh sách
    showMessage('Xóa chất liệu thành công!', 'success');
  } catch (error) {
    console.error('Lỗi khi xóa chất liệu:', error);
    if (error.response && error.response.status === 404) {
      showMessage('Không tìm thấy chất liệu để xóa.', 'danger');
    } else {
      showMessage('Xóa chất liệu thất bại. Vui lòng thử lại.', 'danger');
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
    chatLieus.value = response.data;
    if (chatLieus.value.length === 0 && searchQuery.value.trim() !== '') {
        showMessage('Không tìm thấy kết quả nào cho tìm kiếm của bạn.', 'info');
    } else if (searchQuery.value.trim() !== '') {
        showMessage('Tìm kiếm thành công!', 'success');
    }
  } catch (error) {
    console.error('Lỗi khi tìm kiếm chất liệu:', error);
    showMessage('Lỗi khi tìm kiếm chất liệu. Vui lòng thử lại.', 'danger');
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
/* Các class CoreUI và d-flex (Bootstrap) đã được sử dụng. */
/* Đảm bảo dự án Vue của bạn đã tích hợp CoreUI và Bootstrap/Tailwind CSS */
</style>
