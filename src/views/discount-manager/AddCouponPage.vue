<template>
  <div class="container py-4">
    <h2 class="mb-4 fw-bold" :style="{ color: '#000000' }">Thêm Phiếu Giảm Giá Mới</h2>

    <CForm @submit.prevent="submitCoupon" class="coupon-form mb-4 p-4">
      <h5 class="fw-bold mb-3">Thông tin phiếu giảm giá</h5>

      <CRow class="mb-3 align-items-center">
        <CCol md="3">
          <CFormLabel for="couponName" class="col-form-label">Tên phiếu giảm giá:</CFormLabel>
        </CCol>
        <CCol md="9">
          <CInputGroup>
            <CFormInput id="couponName" v-model="newCoupon.name" placeholder="Nhập tên phiếu giảm giá" maxlength="100" />
            <CInputGroupText>{{ newCoupon.name.length }}/100</CInputGroupText>
          </CInputGroup>
        </CCol>
      </CRow>

      <CRow class="mb-3 align-items-center">
        <CCol md="3">
          <CFormLabel for="couponType" class="col-form-label">Loại phiếu giảm giá:</CFormLabel>
        </CCol>
        <CCol md="9">
          <CFormSelect id="couponType" v-model="newCoupon.type">
            <option value="Công khai">Công khai</option>
            <option value="Riêng tư">Riêng tư</option>
          </CFormSelect>
        </CCol>
      </CRow>

      <CRow class="mb-3 align-items-center" v-if="newCoupon.type === 'Công khai'">
        <CCol md="3">
          <CFormLabel for="couponQuantity" class="col-form-label">Số lượng:</CFormLabel>
        </CCol>
        <CCol md="9">
          <CFormInput id="couponQuantity" type="number" v-model.number="newCoupon.quantity" min="1" placeholder="Nhập số lượng phiếu" />
        </CCol>
      </CRow>

      <CRow class="mb-3 align-items-center">
        <CCol md="3">
          <CFormLabel class="col-form-label">Giá trị giảm:</CFormLabel>
        </CCol>
        <CCol md="9">
          <CInputGroup>
            <CFormInput type="number" v-model.number="newCoupon.discountValue" placeholder="Nhập giá trị giảm" />
            <CInputGroupText>
              <CFormCheck type="radio" name="discountType" id="discountPercent" value="Phần trăm" v-model="newCoupon.discountType" label="%" />
              <CFormCheck type="radio" name="discountType" id="discountFixed" value="Số tiền cố định" v-model="newCoupon.discountType" label="VND" class="ms-2" />
            </CInputGroupText>
          </CInputGroup>
        </CCol>
      </CRow>

      <CRow class="mb-3 align-items-center">
        <CCol md="3">
          <CFormLabel for="minOrderValue" class="col-form-label">Giá trị đơn hàng tối thiểu:</CFormLabel>
        </CCol>
        <CCol md="9">
          <CFormInput id="minOrderValue" type="number" v-model.number="newCoupon.minOrderValue" min="0" placeholder="Nhập giá trị đơn hàng tối thiểu" />
        </CCol>
      </CRow>

      <CRow class="mb-3 align-items-center">
        <CCol md="3">
          <CFormLabel for="maxDiscountValue" class="col-form-label">Giá trị giảm tối đa (Áp dụng cho %):</CFormLabel>
        </CCol>
        <CCol md="9">
          <CFormInput id="maxDiscountValue" type="number" v-model.number="newCoupon.maxDiscountValue" min="0" placeholder="Nhập giá trị giảm tối đa" :disabled="newCoupon.discountType !== 'Phần trăm'" />
        </CCol>
      </CRow>

      <CRow class="mb-3 align-items-center">
        <CCol md="3">
          <CFormLabel for="startDate" class="col-form-label">Ngày bắt đầu:</CFormLabel>
        </CCol>
        <CCol md="9">
          <CFormInput id="startDate" type="datetime-local" v-model="newCoupon.startDate" />
        </CCol>
      </CRow>

      <CRow class="mb-3 align-items-center">
        <CCol md="3">
          <CFormLabel for="endDate" class="col-form-label">Ngày kết thúc:</CFormLabel>
        </CCol>
        <CCol md="9">
          <CFormInput id="endDate" type="datetime-local" v-model="newCoupon.endDate" />
        </CCol>
      </CRow>

      <div class="d-flex justify-content-end gap-2">
        <CButton color="secondary" @click="cancelAdd" :style="{ backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', color: '#000000' }">Hủy</CButton>
        <CButton type="submit" :style="{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }">Thêm phiếu giảm giá</CButton>
      </div>
    </CForm>

    <div v-if="newCoupon.type === 'Riêng tư'" class="customer-selection-section p-4 mt-4">
      <h5 class="fw-bold mb-3">Chọn khách hàng áp dụng</h5>
      <p class="mb-3">Đã chọn: <strong>{{ newCoupon.customerIds.length }}</strong> khách hàng</p>

      <div class="mb-3 filter-section">
        <div class="filters-and-search d-flex flex-wrap align-items-center gap-3">
          <CButton :style="{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }" class="me-2" @click="loadAllCustomers">
            <CIcon icon="cilCloudDownload" /> Tải lại danh sách khách hàng
          </CButton>
          <CInputGroup class="flex-grow-1">
            <CFormInput v-model="customerSearchQuery" placeholder="Tìm kiếm theo tên, CCCD, SDT, Email..." @keyup.enter="filterCustomers" class="custom-input" />
          </CInputGroup>

          <CFormSelect v-model="customerStatusFilter" class="custom-select flex-grow-1" @change="filterCustomers">
            <option value="">Trạng thái (Tất cả)</option>
            <option value="Hoạt động">Hoạt động</option>
            <option value="Không hoạt động">Không hoạt động</option>
          </CFormSelect>

          <CFormInput type="date" v-model="customerDOBStartFilter" class="custom-input flex-grow-1" @change="filterCustomers" />
          <CFormInput type="date" v-model="customerDOBEndFilter" class="custom-input flex-grow-1" @change="filterCustomers" />

          <div class="flex-grow-1 age-range-slider">
            <CFormLabel class="mb-0">Khoảng tuổi: {{ ageRange[0] }} - {{ ageRange[1] }}</CFormLabel>
            <CRow>
              <CCol><input type="range" class="form-range" min="0" max="100" v-model.lazy="ageRange[0]" @change="filterCustomers" /></CCol>
              <CCol><input type="range" class="form-range" min="0" max="100" v-model.lazy="ageRange[1]" @change="filterCustomers" /></CCol>
            </CRow>
          </div>

          <CButton :style="{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }" class="ms-auto" @click="filterCustomers">
            <CIcon icon="cilSearch" /> Tìm kiếm
          </CButton>
          <CButton :style="{ backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', color: '#000000' }" @click="resetCustomerFilters">
            <CIcon icon="cilReload" /> Làm mới bộ lọc
          </CButton>
          <CButton :style="{ backgroundColor: '#8B0000', borderColor: '#8B0000', color: '#FFFFFF' }" @click="addNewCustomerPlaceholder">
            <CIcon icon="cilPlus" /> Thêm mới
          </CButton>
        </div>
      </div>

      <div class="table-container">
        <table class="custom-table">
          <thead>
            <tr>
              <th class="text-center">STT</th>
              <th></th>
              <th>Họ và tên</th>
              <th>CCCD</th>
              <th>Email</th>
              <th>Số Điện thoại</th>
              <th class="text-center">Ngày sinh</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(customer, index) in paginatedCustomers" :key="customer.id">
              <td class="text-center">{{ index + 1 + (currentCustomerPage - 1) * customerPageSize }}</td>
              <td class="text-center">
                <CFormCheck type="checkbox" :value="customer.id" v-model="newCoupon.customerIds" />
              </td>
              <td>{{ customer.name }}</td>
              <td>{{ customer.cccd }}</td>
              <td>{{ customer.email }}</td>
              <td>{{ customer.phone }}</td>
              <td class="text-center">{{ formatDate(customer.dob) }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <CPagination align="center" class="mt-3">
        <CPaginationItem
          :disabled="currentCustomerPage === 1"
          @click="changeCustomerPage(currentCustomerPage - 1)"
        >
          Trước
        </CPaginationItem>
        <CPaginationItem
          v-for="page in totalCustomerPages"
          :key="page"
          :active="page === currentCustomerPage"
          @click="changeCustomerPage(page)"
        >
          {{ page }}
        </CPaginationItem>
        <CPaginationItem
          :disabled="currentCustomerPage === totalCustomerPages"
          @click="changeCustomerPage(currentCustomerPage + 1)"
        >
          Sau
        </CPaginationItem>
      </CPagination>
    </div>
  </div>
</template>

<script>
import { CIcon } from '@coreui/icons-vue';
import * as icon from '@coreui/icons';
import {
  CForm,
  CRow,
  CCol,
  CFormLabel,
  CInputGroup,
  CFormInput,
  CInputGroupText,
  CFormCheck,
  CFormSelect,
  CButton,
  CPagination,
  CPaginationItem
} from '@coreui/vue';
import { inject } from 'vue';

export default {
  name: 'AddCouponPage',
  components: {
    CIcon,
    CForm,
    CRow,
    CCol,
    CFormLabel,
    CInputGroup,
    CFormInput,
    CInputGroupText,
    CFormCheck,
    CFormSelect,
    CButton,
    CPagination,
    CPaginationItem,
  },
  setup() {
    const toast = inject('$toast');
    return { toast };
  },
  data() {
    const now = new Date();
    const oneYearLater = new Date();
    oneYearLater.setFullYear(now.getFullYear() + 1);

    return {
      newCoupon: {
        code: '',
        name: '',
        quantity: 1,
        type: 'Công khai',
        discountType: 'Phần trăm',
        discountValue: 0,
        minOrderValue: 0,
        maxDiscountValue: 0,
        startDate: this.formatDateForInput(now),
        endDate: this.formatDateForInput(oneYearLater),
        active: true,
        customerIds: [],
      },
      originalCustomers: [],
      customers: [],
      customerSearchQuery: '',
      customerStatusFilter: '',
      customerDOBStartFilter: '',
      customerDOBEndFilter: '',
      ageRange: [0, 100],
      currentCustomerPage: 1,
      customerPageSize: 10,
    };
  },
  computed: {
    totalCustomerPages() {
      return Math.ceil(this.customers.length / this.customerPageSize);
    },
    paginatedCustomers() {
      const start = (this.currentCustomerPage - 1) * this.customerPageSize;
      return this.customers.slice(start, start + this.customerPageSize);
    },
    // Xóa bỏ isDiscountValueInvalid và isTimeRangeInvalid
    /*
    isDiscountValueInvalid() {
      const value = parseFloat(this.newCoupon.discountValue);
      if (isNaN(value) || value <= 0) return true;
      if (this.newCoupon.discountType === 'Phần trăm' && value > 100) return true;
      if (this.newCoupon.discountType === 'Số tiền cố định' && (value < 10000 || value > 1000000)) return true;
      return false;
    },
    isTimeRangeInvalid() {
      const start = new Date(this.newCoupon.startDate);
      const end = new Date(this.newCoupon.endDate);
      if (isNaN(start.getTime()) || isNaN(end.getTime())) return true;
      return start.getTime() >= end.getTime();
    }
    */
  },
  created() {
    this.loadAllCustomers();
  },
  watch: {
    'newCoupon.type'(newType) {
      if (newType === 'Riêng tư') {
        this.newCoupon.quantity = this.newCoupon.customerIds.length;
      } else {
        this.newCoupon.customerIds = [];
        this.newCoupon.quantity = 1;
      }
    },
    'newCoupon.customerIds': {
      handler(newCustomerIds) {
        if (this.newCoupon.type === 'Riêng tư') {
          this.newCoupon.quantity = newCustomerIds.length;
        }
      },
      deep: true
    },
    'newCoupon.discountType'(newType) {
      if (newType !== 'Phần trăm') {
        this.newCoupon.maxDiscountValue = 0;
      }
    },
    'newCoupon.startDate'(newVal) {
      if (newVal && this.newCoupon.endDate && new Date(newVal) > new Date(this.newCoupon.endDate)) {
        this.newCoupon.endDate = newVal;
      }
    },
    'newCoupon.endDate'(newVal) {
      if (newVal && this.newCoupon.startDate && new Date(newVal) < new Date(this.newCoupon.startDate)) {
        this.newCoupon.startDate = newVal;
      }
    }
  },
  methods: {
    formatDateForInput(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    },
    loadAllCustomers() {
      const storedCustomers = localStorage.getItem('customersData');
      if (storedCustomers) {
        this.originalCustomers = JSON.parse(storedCustomers);
      } else {
        this.originalCustomers = [
          { id: 'KH001', name: 'Nguyễn Văn A', cccd: '001122334455', email: 'vana@example.com', phone: '0901234567', dob: '1990-05-10', status: 'Hoạt động' },
          { id: 'KH002', name: 'Trần Thị B', cccd: '002233445566', email: 'thib@example.com', phone: '0902345678', dob: '1995-11-20', status: 'Hoạt động' },
          { id: 'KH003', name: 'Lê Văn C', cccd: '003344556677', email: 'vanc@example.com', phone: '0903456789', dob: '1988-01-15', status: 'Không hoạt động' },
          { id: 'KH004', name: 'Phạm Thị D', cccd: '004455667788', email: 'thid@example.com', phone: '0904567890', dob: '2000-07-01', status: 'Hoạt động' },
          { id: 'KH005', name: 'Hoàng Văn E', cccd: '005566778899', email: 'vane@example.com', phone: '0905678901', dob: '1975-03-25', status: 'Hoạt động' },
          { id: 'KH006', name: 'Đặng Thị F', cccd: '006677889900', email: 'thif@example.com', phone: '0906789012', dob: '1992-09-05', status: 'Hoạt động' },
          { id: 'KH007', name: 'Bùi Văn G', cccd: '007788990011', email: 'vang@example.com', phone: '0907890123', dob: '1980-04-30', status: 'Hoạt động' },
          { id: 'KH008', name: 'Ngô Thị H', cccd: '008899001122', email: 'thih@example.com', phone: '0908901234', dob: '2002-12-12', status: 'Không hoạt động' },
          { id: 'KH009', name: 'Chu Văn I', cccd: '009900112233', email: 'vani@example.com', phone: '0909012345', dob: '1998-02-28', status: 'Hoạt động' },
          { id: 'KH010', name: 'Võ Thị K', cccd: '010011223344', email: 'thik@example.com', phone: '0910123456', dob: '1985-06-18', status: 'Hoạt động' },
          { id: 'KH011', name: 'Đỗ Văn L', cccd: '011122334455', email: 'vanl@example.com', phone: '0911234567', dob: '1993-08-08', status: 'Hoạt động' },
          { id: 'KH012', name: 'Trịnh Thị M', cccd: '012233445566', email: 'thim@example.com', phone: '0912345678', dob: '1997-01-22', status: 'Hoạt động' },
          { id: 'KH013', name: 'Mai Văn N', cccd: '013344556677', email: 'vann@example.com', phone: '0913456789', dob: '1982-10-03', status: 'Hoạt động' },
          { id: 'KH014', name: 'Dương Thị O', cccd: '014455667788', email: 'thio@example.com', phone: '0914567890', dob: '2005-04-14', status: 'Không hoạt động' },
          { id: 'KH015', name: 'Nguyễn Văn P', cccd: '015566778899', email: 'vanp@example.com', phone: '0915678901', dob: '1970-12-01', status: 'Hoạt động' },
        ];
        localStorage.setItem('customersData', JSON.stringify(this.originalCustomers));
      }
      this.newCoupon.customerIds = [];
      this.resetCustomerFilters();
    },
    filterCustomers() {
      let filtered = [...this.originalCustomers];

      if (this.customerSearchQuery.trim()) {
        const query = this.customerSearchQuery.toLowerCase();
        filtered = filtered.filter(customer =>
          customer.name.toLowerCase().includes(query) ||
          customer.cccd.toLowerCase().includes(query) ||
          customer.phone.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query)
        );
      }

      if (this.customerStatusFilter) {
        filtered = filtered.filter(customer => customer.status === this.customerStatusFilter);
      }

      if (this.customerDOBStartFilter) {
        filtered = filtered.filter(customer => {
          const customerDob = new Date(customer.dob);
          const filterDob = new Date(this.customerDOBStartFilter);
          return customerDob >= filterDob;
        });
      }

      if (this.customerDOBEndFilter) {
        filtered = filtered.filter(customer => {
          const customerDob = new Date(customer.dob);
          const filterDob = new Date(this.customerDOBEndFilter);
          filterDob.setHours(23, 59, 59, 999);
          return customerDob <= filterDob;
        });
      }

      filtered = filtered.filter(customer => {
        const dob = new Date(customer.dob);
        if (isNaN(dob.getTime())) return false;
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) age--;
        return age >= this.ageRange[0] && age <= this.ageRange[1];
      });

      this.customers = filtered;
      this.currentCustomerPage = 1;
    },
    resetCustomerFilters() {
      this.customerSearchQuery = '';
      this.customerStatusFilter = '';
      this.customerDOBStartFilter = '';
      this.customerDOBEndFilter = '';
      this.ageRange = [0, 100];
      this.filterCustomers();
      this.toast.info('Đã làm mới bộ lọc khách hàng.');
    },
    addNewCustomerPlaceholder() {
      this.toast.warning('Chức năng "Thêm mới khách hàng" sẽ được phát triển sau.');
    },
    changeCustomerPage(page) {
      if (page >= 1 && page <= this.totalCustomerPages) {
        this.currentCustomerPage = page;
      }
    },
    generateCouponCode() {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 8; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    },
    submitCoupon() {
      // Coupon Name Validation
      if (!this.newCoupon.name.trim()) {
        this.toast.error('Tên phiếu giảm giá không được để trống.');
        return;
      }

      // Coupon Type Validation
      if (!this.newCoupon.type) {
        this.toast.error('Loại phiếu giảm giá không được để trống.');
        return;
      }

      // Quantity Validation (for Public Coupons)
      if (this.newCoupon.type === 'Công khai' && (this.newCoupon.quantity <= 0 || isNaN(this.newCoupon.quantity))) {
        this.toast.error('Số lượng phải là một số nguyên dương.');
        return;
      }

      // Discount Value Validation
      const discountValue = parseFloat(this.newCoupon.discountValue);
      if (isNaN(discountValue) || discountValue <= 0) {
        this.toast.error('Giá trị giảm phải là một số dương.');
        return;
      }
      if (this.newCoupon.discountType === 'Phần trăm' && discountValue > 100) {
        this.toast.error('Giá trị giảm phần trăm không được vượt quá 100%.');
        return;
      }
      if (this.newCoupon.discountType === 'Số tiền cố định' && (discountValue < 10000 || discountValue > 1000000)) {
        this.toast.error('Giá trị giảm số tiền cố định phải từ 10.000 VND đến 1.000.000 VND.');
        return;
      }

      // Max Discount Value Validation (for Percentage Discount)
      // Thêm kiểm tra nếu discountValue là Phần trăm và maxDiscountValue <= 0 (nếu có nhập giá trị)
      if (this.newCoupon.discountType === 'Phần trăm' && this.newCoupon.maxDiscountValue <= 0 && this.newCoupon.discountValue > 0) {
          this.toast.error('Giá trị giảm tối đa phải là một số dương khi giảm giá theo phần trăm.');
          return;
      }


      // Start and End Date Validation
      const startDate = new Date(this.newCoupon.startDate);
      const endDate = new Date(this.newCoupon.endDate);

      if (isNaN(startDate.getTime()) || isNaN(endDate.getTime())) {
          this.toast.error('Ngày bắt đầu hoặc ngày kết thúc không hợp lệ.');
          return;
      }

      if (startDate.getTime() >= endDate.getTime()) {
        this.toast.error('Thời gian kết thúc phải sau thời gian bắt đầu.');
        return;
      }

      // Customer Selection Validation (for Private Coupons)
      if (this.newCoupon.type === 'Riêng tư' && this.newCoupon.customerIds.length === 0) {
        this.toast.error('Vui lòng chọn ít nhất một khách hàng cho phiếu giảm giá riêng tư.');
        return;
      }

      const coupons = JSON.parse(localStorage.getItem('couponsData') || '[]');

      const newCouponData = {
        ...this.newCoupon,
        code: this.generateCouponCode(),
        active: true,
      };

      if (newCouponData.type === 'Riêng tư') {
        newCouponData.quantity = newCouponData.customerIds.length;
      }

      coupons.push(newCouponData);
      localStorage.setItem('couponsData', JSON.stringify(coupons));
      this.toast.success('Phiếu giảm giá đã được thêm thành công.');
      this.resetForm();
      this.$router.push({ name: 'Phieu Giam Gia' });
    },
    resetForm() {
      const now = new Date();
      const oneYearLater = new Date();
      oneYearLater.setFullYear(now.getFullYear() + 1);

      this.newCoupon = {
        code: '',
        name: '',
        quantity: 1,
        type: 'Công khai',
        discountType: 'Phần trăm',
        discountValue: 0,
        minOrderValue: 0,
        maxDiscountValue: 0,
        startDate: this.formatDateForInput(now),
        endDate: this.formatDateForInput(oneYearLater),
        active: true,
        customerIds: [],
      };
      this.customerSearchQuery = '';
      this.customerStatusFilter = '';
      this.customerDOBStartFilter = '';
      this.customerDOBEndFilter = '';
      this.ageRange = [0, 100];
      this.currentCustomerPage = 1;
      this.filterCustomers();
    },
    cancelAdd() {
      if (confirm('Bạn có chắc chắn muốn hủy bỏ việc thêm phiếu giảm giá?')) {
        this.$router.push({ name: 'Phieu Giam Gia' });
      }
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return date.toLocaleDateString('vi-VN');
    },
  },
  icons: {
    ...icon,
  },
};
</script>

<style scoped>
.container {
  padding: 1rem;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #000000;
}

.coupon-form,
.customer-selection-section {
  background-color: #f8f9fa;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filter-section {
  background-color: #ffffff;
  padding: 1rem;
  border-radius: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.filters-and-search {
  justify-content: flex-start;
}

.filters-and-search .flex-grow-1 {
  flex-basis: 0;
  min-width: 180px;
}

.filters-and-search .ms-auto {
  margin-left: auto !important;
}

.filters-and-search .btn {
  display: flex;
  align-items: center;
  justify-content: center;
}

.filters-and-search .btn .cil-search,
.filters-and-search .btn .cil-reload,
.filters-and-search .btn .cil-plus,
.filters-and-search .btn .cil-cloud-download {
  margin-right: 0.25rem;
}

.table-container {
  overflow-x: auto;
  max-width: 100%;
  margin-top: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
  font-size: 0.9em;
}

.custom-table th,
.custom-table td {
  padding: 0.5rem 0.8rem;
  border-bottom: 1px solid #dee2e6;
  text-align: left;
  white-space: nowrap;
}

.custom-table th {
  background-color: #000000;
  color: #ffffff;
  font-weight: bold;
}

.custom-table th.text-center,
.custom-table td.text-center {
  text-align: center;
}

.custom-table tr:hover {
  background-color: #f8f9fa;
}

.custom-input,
.custom-select {
  border-radius: 0.5rem;
  border: 1px solid #ced4da;
  padding: 0.5rem 0.75rem;
}

.custom-input:focus,
.custom-select:focus {
  border-color: #8B0000;
  box-shadow: 0 0 0 0.25rem rgba(139, 0, 0, 0.25);
}

.age-range-slider .form-range {
  padding: 0;
  width: 100%;
}
.age-range-slider .form-range::-webkit-slider-thumb {
  background-color: #000000;
}
.age-range-slider .form-range::-moz-range-thumb {
  background-color: #000000;
}

.btn {
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: bold;
}

.btn[style*="background-color: rgb(0, 0, 0)"] {
  background-color: #000000 !important;
  border-color: #000000 !important;
  color: #FFFFFF !important;
}

.btn[style*="background-color: rgb(0, 0, 0)"]:hover {
  background-color: #333333 !important;
  border-color: #333333 !important;
}

.btn[style*="background-color: rgb(211, 211, 211)"] {
  background-color: #D3D3D3 !important;
  border-color: #D3D3D3 !important;
  color: #000000 !important;
}

.btn[style*="background-color: rgb(211, 211, 211)"]:hover {
  background-color: #B0B0B0 !important;
  border-color: #B0B0B0 !important;
}

.btn[style*="background-color: rgb(139, 0, 0)"] {
  background-color: #8B0000 !important;
  border-color: #8B0000 !important;
  color: #FFFFFF !important;
}

.btn[style*="background-color: rgb(139, 0, 0)"]:hover {
  background-color: #6a0000 !important;
  border-color: #6a0000 !important;
}

.page-item .page-link {
  color: #000000;
  border-color: #dee2e6;
}

.page-item.active .page-link {
  background-color: #000000;
  border-color: #000000;
  color: #FFFFFF;
}

.page-item.disabled .page-link {
  color: #6c757d;
}

@media (max-width: 992px) {
  .custom-table th,
  .custom-table td {
    padding: 0.4rem 0.6rem;
    font-size: 0.8em;
  }

  .filters-and-search {
    flex-direction: column;
    align-items: stretch;
    gap: 0.5rem;
  }

  .filters-and-search > * {
    width: 100%;
  }

  .filters-and-search .ms-auto {
    margin-left: 0 !important;
  }
}

@media (max-width: 768px) {
  h2 {
    font-size: 1.3rem;
  }

  .coupon-form,
  .customer-selection-section {
    padding: 1rem;
  }

  .custom-table th,
  .custom-table td {
    padding: 0.3rem 0.5rem;
    font-size: 0.75em;
  }

  .custom-input,
  .custom-select {
    padding: 0.4rem 0.6rem;
    font-size: 0.8rem;
  }

  .btn {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }
}
</style>