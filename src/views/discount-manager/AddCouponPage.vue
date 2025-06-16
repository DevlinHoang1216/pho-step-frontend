<template>
  <div class="container py-4">
    <h2 class="mb-4 fw-bold" :style="{ color: '#000000' }">Them Phieu Giam Gia Moi</h2>

    <CForm @submit.prevent="submitCoupon" class="coupon-form mb-4 p-4">
      <h5 class="fw-bold mb-3">Thong tin phieu giam gia</h5>

      <CRow class="mb-3 align-items-center">
        <CCol md="3">
          <CFormLabel for="couponName" class="col-form-label">Ten phieu giam gia:</CFormLabel>
        </CCol>
        <CCol md="9">
          <CInputGroup>
            <CFormInput id="couponName" v-model="newCoupon.name" placeholder="Nhap ten phieu giam gia" maxlength="100" required />
            <CInputGroupText>{{ newCoupon.name.length }}/100</CInputGroupText>
          </CInputGroup>
        </CCol>
      </CRow>

      <CRow class="mb-3 align-items-center">
        <CCol md="3">
          <CFormLabel for="couponCode" class="col-form-label">Ma phieu giam gia:</CFormLabel>
        </CCol>
        <CCol md="9">
          <CFormInput id="couponCode" v-model="newCoupon.code" placeholder="Tu dong tao hoac nhap thu cong" :disabled="!isManualCode" />
          <CFormCheck class="mt-2" label="Tao ma thu cong" v-model="isManualCode" />
        </CCol>
      </CRow>

      <CRow class="mb-3 align-items-center">
        <CCol md="3">
          <CFormLabel for="couponQuantity" class="col-form-label">So luong phieu:</CFormLabel>
        </CCol>
        <CCol md="9">
          <CFormInput type="number" id="couponQuantity" v-model="newCoupon.quantity" min="0" placeholder="Nhap so luong phieu" required />
        </CCol>
      </CRow>

      <CRow class="mb-3 align-items-center">
        <CCol md="3">
          <CFormLabel for="couponType" class="col-form-label">Loai phieu giam gia:</CFormLabel>
        </CCol>
        <CCol md="9">
          <CFormSelect id="couponType" v-model="newCoupon.type" required>
            <option value="">Chon loai phieu</option>
            <option v-for="type in couponTypes" :key="type" :value="type">{{ type }}</option>
          </CFormSelect>
        </CCol>
      </CRow>

      <CRow class="mb-3 align-items-center">
        <CCol md="3">
          <CFormLabel for="discountType" class="col-form-label">Loai giam gia:</CFormLabel>
        </CCol>
        <CCol md="9">
          <CFormSelect id="discountType" v-model="newCoupon.discountType" required>
            <option value="">Chon loai giam gia</option>
            <option v-for="type in discountTypes" :key="type" :value="type">{{ type }}</option>
          </CFormSelect>
        </CCol>
      </CRow>

      <CRow class="mb-3 align-items-center">
        <CCol md="3">
          <CFormLabel for="discountValue" class="col-form-label">Gia tri giam:</CFormLabel>
        </CCol>
        <CCol md="9">
          <CFormInput type="number" id="discountValue" v-model="newCoupon.discountValue" min="0" placeholder="Nhap gia tri giam" required />
        </CCol>
      </CRow>

      <CRow class="mb-3 align-items-center">
        <CCol md="3">
          <CFormLabel for="minOrderValue" class="col-form-label">Gia tri don hang toi thieu:</CFormLabel>
        </CCol>
        <CCol md="9">
          <CFormInput type="number" id="minOrderValue" v-model="newCoupon.minOrderValue" min="0" placeholder="Nhap gia tri don hang toi thieu" />
        </CCol>
      </CRow>

      <CRow class="mb-3 align-items-center">
        <CCol md="3">
          <CFormLabel for="maxDiscountValue" class="col-form-label">Gia tri giam toi da (Ap dung cho giam gia phan tram):</CFormLabel>
        </CCol>
        <CCol md="9">
          <CFormInput type="number" id="maxDiscountValue" v-model="newCoupon.maxDiscountValue" min="0" placeholder="Nhap gia tri giam toi da" :disabled="newCoupon.discountType !== 'Phần trăm'" />
        </CCol>
      </CRow>

      <CRow class="mb-3 align-items-center">
        <CCol md="3">
          <CFormLabel for="startDate" class="col-form-label">Ngay bat dau:</CFormLabel>
        </CCol>
        <CCol md="9">
          <CFormInput type="datetime-local" id="startDate" v-model="newCoupon.startDate" required />
        </CCol>
      </CRow>

      <CRow class="mb-3 align-items-center">
        <CCol md="3">
          <CFormLabel for="endDate" class="col-form-label">Ngay ket thuc:</CFormLabel>
        </CCol>
        <CCol md="9">
          <CFormInput type="datetime-local" id="endDate" v-model="newCoupon.endDate" required />
        </CCol>
      </CRow>

      <CRow class="mb-3 align-items-start" v-if="newCoupon.type === 'Riêng tư'">
        <CCol md="3">
          <CFormLabel for="customerSelect" class="col-form-label">Chon khach hang (ap dung rieng tu):</CFormLabel>
        </CCol>
        <CCol md="9">
          <CFormSelect id="customerSelect" v-model="selectedCustomerId" @change="addCustomerToCoupon" class="custom-select">
            <option value="">Chon khach hang</option>
            <option v-for="customer in availableCustomers" :key="customer.id" :value="customer.id">
              {{ customer.name }} ({{ customer.email }})
            </option>
          </CFormSelect>
          <div class="selected-customers-list mt-2">
            <CBadge v-for="custId in newCoupon.customerIds" :key="custId" color="info" class="me-1 mb-1 d-inline-flex align-items-center">
              {{ getCustomerNameById(custId) }}
              <CButtonClose @click="removeCustomer(custId)" class="ms-2" white />
            </CBadge>
            <p v-if="newCoupon.customerIds.length === 0" class="text-muted mt-2">Chua co khach hang nao duoc chon.</p>
          </div>
        </CCol>
      </CRow>


      <div class="d-flex justify-content-end gap-2 mt-4">
        <CButton :style="{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }" type="submit">Tao phieu giam gia</CButton>
        <CButton :style="{ backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', color: '#000000' }" type="button" @click="resetForm">Dat lai</CButton>
      </div>
    </CForm>

    <h5 class="mb-3 fw-bold">Quan Ly Khach Hang</h5>
    <div class="mb-3 filter-section">
      <div class="filters-and-search d-flex flex-wrap align-items-center gap-3">
        <CInputGroup class="flex-grow-1">
          <CFormInput v-model="searchCustomerQuery" placeholder="Tim khach hang theo ten, email, CCCD, SDT..." @keyup.enter="filterCustomers" class="custom-input" />
        </CInputGroup>

        <CFormSelect v-model="filterCustomerStatus" class="custom-select flex-grow-1">
          <option value="">Trang thai (Tat ca)</option>
          <option value="Hoạt động">Hoat dong</option>
          <option value="Không hoạt động">Khong hoat dong</option>
        </CFormSelect>

        <label class="col-form-label ms-2 me-2">Độ tuổi:</label>
        <div class="age-range-slider flex-grow-1 d-flex align-items-center">
          <span class="me-2">{{ filterCustomerAge[0] }}</span>
          <CRange v-model="filterCustomerAge" :min="0" :max="100" class="form-range flex-grow-1" />
          <span class="ms-2">{{ filterCustomerAge[1] }}</span>
        </div>

        <CButton :style="{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }" class="ms-auto" @click="filterCustomers">
          <CIcon icon="cilSearch" /> Tim kiem
        </CButton>
        <CButton :style="{ backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', color: '#000000' }" @click="resetCustomerFilters">
          <CIcon icon="cilReload" /> Lam moi bo loc
        </CButton>
        <CButton :style="{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }" @click="loadAllCustomers">
          <CIcon icon="cilCloudDownload" /> Tai lai danh sach khach hang
        </CButton>
      </div>
    </div>

    <div class="table-container">
      <table class="custom-table">
        <thead>
          <tr>
            <th class="text-center">STT</th>
            <th class="text-center">ID</th>
            <th class="text-center">Tên khách hàng</th>
            <th class="text-center">Email</th>
            <th class="text-center">SDT</th>
            <th class="text-center">Ngày sinh</th>
            <th class="text-center">Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(customer, index) in paginatedCustomers" :key="customer.id">
            <td class="text-center">{{ index + 1 + (currentPageCustomers - 1) * pageSizeCustomers }}</td>
            <td class="text-center">{{ customer.id }}</td>
            <td class="text-center">{{ customer.name }}</td>
            <td class="text-center">{{ customer.email }}</td>
            <td class="text-center">{{ customer.phone }}</td>
            <td class="text-center">{{ customer.dob }}</td>
            <td class="text-center">{{ customer.status }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <CPagination align="center" class="mt-3">
      <CPaginationItem :disabled="currentPageCustomers === 1" @click="changeCustomerPage(currentPageCustomers - 1)">Truoc</CPaginationItem>
      <CPaginationItem v-for="page in totalPagesCustomers" :key="page" :active="page === currentPageCustomers" @click="changeCustomerPage(page)">
        {{ page }}
      </CPaginationItem>
      <CPaginationItem :disabled="currentPageCustomers === totalPagesCustomers" @click="changeCustomerPage(currentPageCustomers + 1)">Sau</CPaginationItem>
    </CPagination>
  </div>
</template>

<script>
import { CIcon } from '@coreui/icons-vue';
import * as icon from '@coreui/icons';
import { CFormSelect, CFormCheck, CInputGroup, CInputGroupText, CBadge, CButtonClose } from '@coreui/vue';

export default {
  components: {
    CIcon,
    CFormSelect,
    CFormCheck,
    CInputGroup,
    CInputGroupText,
    CBadge,
    CButtonClose,
  },
  data() {
    return {
      // Coupon form data
      newCoupon: {
        code: '',
        name: '',
        quantity: 1,
        type: 'Công khai', // Mặc định là Công khai
        discountType: '',
        discountValue: 0,
        minOrderValue: 0,
        maxDiscountValue: 0,
        startDate: this.getFormattedDateTime(new Date()),
        endDate: this.getFormattedDateTime(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)), // Mặc định 7 ngày sau
        active: true,
        customerIds: [], // Dùng cho loại phiếu "Riêng tư"
      },
      isManualCode: false, // Để người dùng tự nhập mã hay tạo tự động

      // Customer management data
      allCustomers: [], // Danh sách khách hàng gốc
      searchCustomerQuery: '',
      filterCustomerStatus: '',
      filterCustomerAge: [18, 60], // Mặc định độ tuổi từ 18 đến 60
      currentPageCustomers: 1,
      pageSizeCustomers: 10,
      
      // Selected customer for private coupon
      selectedCustomerId: '', 

      // Dropdown options
      couponTypes: ['Công khai', 'Riêng tư'],
      discountTypes: ['Phần trăm', 'Số tiền cố định'],
    };
  },
  computed: {
    // Computed property for customers table pagination and filtering
    filteredCustomers() {
      let filtered = [...this.allCustomers]; // Bắt đầu với tất cả khách hàng

      // Lọc theo tìm kiếm
      if (this.searchCustomerQuery.trim()) {
        const query = this.searchCustomerQuery.toLowerCase();
        filtered = filtered.filter(customer =>
          customer.name.toLowerCase().includes(query) ||
          customer.email.toLowerCase().includes(query) ||
          customer.cccd.toLowerCase().includes(query) ||
          customer.phone.toLowerCase().includes(query)
        );
      }

      // Lọc theo trạng thái
      if (this.filterCustomerStatus) {
        filtered = filtered.filter(customer => customer.status === this.filterCustomerStatus);
      }

      // Lọc theo độ tuổi
      const [minAge, maxAge] = this.filterCustomerAge;
      filtered = filtered.filter(customer => {
        const dob = new Date(customer.dob);
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
          age--;
        }
        return age >= minAge && age <= maxAge;
      });

      return filtered;
    },
    paginatedCustomers() {
      const start = (this.currentPageCustomers - 1) * this.pageSizeCustomers;
      return this.filteredCustomers.slice(start, start + this.pageSizeCustomers);
    },
    totalPagesCustomers() {
      return Math.ceil(this.filteredCustomers.length / this.pageSizeCustomers);
    },
    // Computed property for available customers in private coupon selection
    availableCustomers() {
        // Lọc ra những khách hàng chưa được thêm vào phiếu
        return this.allCustomers.filter(customer => !this.newCoupon.customerIds.includes(customer.id));
    }
  },
  watch: {
    // Tự động tạo mã nếu không chọn tạo thủ công
    isManualCode(newVal) {
      if (!newVal) {
        this.newCoupon.code = this.generateCouponCode();
      } else {
        this.newCoupon.code = ''; // Xóa mã nếu chọn nhập thủ công
      }
    },
    // Reset maxDiscountValue nếu loại giảm giá không phải "Phần trăm"
    'newCoupon.discountType'(newType) {
      if (newType !== 'Phần trăm') {
        this.newCoupon.maxDiscountValue = 0;
      }
    },
    // Đảm bảo startDate luôn nhỏ hơn hoặc bằng endDate
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
  created() {
    this.loadAllCustomers(); // Tải danh sách khách hàng khi component được tạo
    // Tạo mã coupon tự động khi khởi tạo nếu không phải mã thủ công
    if (!this.isManualCode) {
      this.newCoupon.code = this.generateCouponCode();
    }
  },
  methods: {
    getFormattedDateTime(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      return `${year}-${month}-${day}T${hours}:${minutes}`;
    },
    generateCouponCode() {
      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 8; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
      return result;
    },
    loadAllCustomers() {
      const storedCustomers = localStorage.getItem('customersData');
      if (storedCustomers) {
        this.allCustomers = JSON.parse(storedCustomers);
      } else {
        // Dummy data for customers if not found in localStorage
        this.allCustomers = [
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
        localStorage.setItem('customersData', JSON.stringify(this.allCustomers));
      }
      // SAU KHI TẢI LẠI DANH SÁCH GỐC, GỌI resetCustomerFilters ĐỂ HIỂN THỊ TOÀN BỘ DANH SÁCH
      this.resetCustomerFilters();
    },
    getCustomerNameById(customerId) {
      const customer = this.allCustomers.find(c => c.id === customerId);
      return customer ? customer.name : 'Khong tim thay';
    },
    // Logic cho Customer Selection (Phieu rieng tu)
    addCustomerToCoupon() {
      if (this.selectedCustomerId && !this.newCoupon.customerIds.includes(this.selectedCustomerId)) {
        this.newCoupon.customerIds.push(this.selectedCustomerId);
        this.selectedCustomerId = ''; // Reset dropdown sau khi chọn
      }
    },
    removeCustomer(customerId) {
      this.newCoupon.customerIds = this.newCoupon.customerIds.filter(id => id !== customerId);
    },

    submitCoupon() {
      // Validate coupon code
      if (!this.newCoupon.code) {
        alert('Mã phiếu giảm giá không được để trống!');
        return;
      }
      // Check for duplicate coupon code if not a manual code (or if manual code and duplicated)
      const existingCoupons = JSON.parse(localStorage.getItem('couponsData') || '[]');
      if (existingCoupons.some(coupon => coupon.code === this.newCoupon.code)) {
        alert('Mã phiếu giảm giá đã tồn tại. Vui lòng nhập mã khác hoặc tạo mã tự động.');
        return;
      }

      // Validate date range
      if (new Date(this.newCoupon.startDate) > new Date(this.newCoupon.endDate)) {
        alert('Ngày bắt đầu không thể lớn hơn ngày kết thúc!');
        return;
      }

      // Validate customerIds for private coupon
      if (this.newCoupon.type === 'Riêng tư' && this.newCoupon.customerIds.length === 0) {
          alert('Phiếu giảm giá "Riêng tư" phải có ít nhất một khách hàng được chọn.');
          return;
      }

      // Save coupon to localStorage
      const coupons = JSON.parse(localStorage.getItem('couponsData') || '[]');
      coupons.push({ ...this.newCoupon });
      localStorage.setItem('couponsData', JSON.stringify(coupons));
      alert('Đã thêm phiếu giảm giá thành công!');
      this.resetForm();
    },
    resetForm() {
      this.newCoupon = {
        code: this.isManualCode ? '' : this.generateCouponCode(),
        name: '',
        quantity: 1,
        type: 'Công khai',
        discountType: '',
        discountValue: 0,
        minOrderValue: 0,
        maxDiscountValue: 0,
        startDate: this.getFormattedDateTime(new Date()),
        endDate: this.getFormattedDateTime(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
        active: true,
        customerIds: [],
      };
      this.selectedCustomerId = ''; // Reset selected customer for private coupon
      // Keep isManualCode as is, or reset if desired: this.isManualCode = false;
    },

    // Customer table filtering methods
    filterCustomers() {
      this.currentPageCustomers = 1; // Reset to first page when applying filters
      // The computed property `filteredCustomers` will automatically react to changes in filter variables.
    },
    resetCustomerFilters() {
      this.searchCustomerQuery = '';
      this.filterCustomerStatus = '';
      this.filterCustomerAge = [18, 60]; // Reset to default range
      this.currentPageCustomers = 1;
      // The computed property `filteredCustomers` will automatically react to these changes.
    },
    changeCustomerPage(page) {
      if (page >= 1 && page <= this.totalPagesCustomers) {
        this.currentPageCustomers = page;
      }
    },
  },
  icons: {
    ...icon,
  },
};
</script>

<style scoped>
.container {
  font-family: 'Arial', sans-serif;
  color: #333;
}

h2 {
  text-align: center;
  margin-bottom: 2rem;
  color: #000000;
}

.coupon-form,
.filter-section {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.form-label {
  font-weight: bold;
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

.btn {
  border-radius: 0.5rem;
  padding: 0.5rem 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Specific button styles */
.btn[type="submit"],
.btn[type="button"][style*="background-color: rgb(0, 0, 0)"] { /* for "Tao phieu giam gia" and "Tai lai danh sach khach hang" */
  background-color: #000000 !important;
  border-color: #000000 !important;
  color: #FFFFFF !important;
}

.btn[type="submit"]:hover,
.btn[type="button"][style*="background-color: rgb(0, 0, 0)"]:hover {
  background-color: #333333 !important;
  border-color: #333333 !important;
}

.btn[style*="background-color: rgb(211, 211, 211)"] { /* for "Dat lai" and "Lam moi bo loc" */
  background-color: #D3D3D3 !important;
  border-color: #D3D3D3 !important;
  color: #000000 !important;
}

.btn[style*="background-color: rgb(211, 211, 211)"]:hover {
  background-color: #B0B0B0 !important;
  border-color: #B0B0B0 !important;
}


.table-container {
  overflow-x: auto;
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
  white-space: nowrap; /* Prevent text wrapping in table cells */
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

.age-range-slider {
  width: 100%;
  max-width: 200px; /* Adjust as needed */
}

/* Styles for selected customer badges */
.selected-customers-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 0.5rem;
}

.selected-customers-list .badge {
  background-color: #000000; /* Dark background for badges */
  color: #FFFFFF;
  padding: 0.5em 0.75em;
  border-radius: 0.25rem;
  font-size: 0.85em;
  display: inline-flex;
  align-items: center;
  white-space: nowrap;
}

.selected-customers-list .btn-close {
  font-size: 0.7em;
  margin-left: 0.5em;
  opacity: 0.8;
}

.selected-customers-list .btn-close:hover {
  opacity: 1;
}

/* Pagination styles */
.page-item .page-link {
  color: #000000; /* Black for page numbers */
  border-color: #dee2e6;
}

.page-item.active .page-link {
  background-color: #000000; /* Black for active page */
  border-color: #000000;
  color: #FFFFFF;
}

.page-item.disabled .page-link {
  color: #6c757d;
}

/* Icon spacing */
.btn .cil-search,
.btn .cil-reload,
.btn .cil-cloud-download {
  margin-right: 0.25rem;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .coupon-form,
  .filter-section {
    padding: 1rem;
  }
  .table-container {
    min-width: 100%;
  }
  .custom-table th,
  .custom-table td {
    padding: 0.4rem 0.6rem;
    font-size: 0.8em;
  }
  .btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.85rem;
  }
  .filters-and-search {
    flex-direction: column;
    align-items: stretch;
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
    font-size: 1.5rem;
  }
  .coupon-form h5 {
    font-size: 1.2rem;
  }
}
</style>