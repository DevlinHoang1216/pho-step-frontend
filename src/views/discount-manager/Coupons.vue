<template>
  <div class="container py-4">
    <h2 class="mb-4 fw-bold" :style="{ color: '#000000' }">Quan Ly Phieu Giam Gia</h2>

    <div class="mb-3 filter-section">
      <div class="filters-and-search d-flex flex-wrap align-items-center gap-3">
        <CInputGroup class="flex-grow-1">
          <CFormInput v-model="searchQuery" placeholder="Nhap vao ten phieu muon tim..." @keyup.enter="filterAndSearchCoupons" class="custom-input" />
        </CInputGroup>

        <CFormSelect v-model="filterCouponType" class="custom-select flex-grow-1">
          <option value="">Loai phieu (Tat ca)</option>
          <option v-for="type in couponTypes" :key="type" :value="type">{{ type }}</option>
        </CFormSelect>

        <CFormSelect v-model="filterDiscountType" class="custom-select flex-grow-1">
          <option value="">Loai giam gia (Tat ca)</option>
          <option v-for="type in discountTypes" :key="type" :value="type">{{ type }}</option>
        </CFormSelect>

        <CFormInput type="date" v-model="filterStartDate" class="custom-input flex-grow-1" />
        <CFormInput type="date" v-model="filterEndDate" class="custom-input flex-grow-1" />

        <CButton :style="{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }" class="ms-auto" @click="filterAndSearchCoupons">
          <CIcon icon="cilSearch" /> Tim kiem
        </CButton>
        <CButton :style="{ backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', color: '#000000' }" @click="refreshList">
          <CIcon icon="cilReload" /> Lam moi
        </CButton>
      </div>
    </div>

    <div class="mb-3">
      <CButton :style="{ backgroundColor: '#8B0000', borderColor: '#8B0000', color: '#FFFFFF' }" class="me-2" @click="navigateToAddCouponPage">+ Them phieu giam gia</CButton>
    </div>

    <div class="table-container">
      <table class="custom-table">
        <thead>
          <tr>
            <th class="text-center">STT</th>
            <th class="text-center">Mã phiếu giảm giá</th>
            <th class="text-center">Tên phiếu giảm giá</th>
            <th class="text-end">Số lượng phiếu giảm giá</th>
            <th class="text-center">Loại phiếu giảm giá</th>
            <th class="text-center">Loại giảm giá</th>
            <th class="text-end">Giá trị giảm</th>
            <th class="text-end">Giá trị đơn hàng tối thiểu đã áp dụng phiếu giảm giá</th>
            <th class="text-end">Giá trị giảm tối đa cho đơn hàng</th>
            <th class="text-center">Ngày bắt đầu</th>
            <th class="text-center">Ngày kết thúc</th>
            <th class="text-center status-cell">Trạng thái</th>
            <th class="text-center action-cell">Tác vụ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(coupon, index) in paginatedCoupons" :key="coupon.code">
            <td class="text-center">{{ index + 1 + (currentPage - 1) * pageSize }}</td>
            <td class="text-center">{{ coupon.code }}</td>
            <td class="text-center">{{ coupon.name }}</td> <td class="text-end">{{ coupon.quantity }}</td>
            <td class="text-center">{{ coupon.type }}</td>
            <td class="text-center">{{ coupon.discountType }}</td>
            <td class="text-end">{{ formatCurrency(coupon.discountValue, coupon.discountType) }}</td>
            <td class="text-end">{{ formatCurrency(coupon.minOrderValue, 'Số tiền cố định') }}</td>
            <td class="text-end">{{ formatCurrency(coupon.maxDiscountValue, 'Số tiền cố định') }}</td>
            <td class="text-center">{{ formatDate(coupon.startDate) }}</td>
            <td class="text-center">{{ formatDate(coupon.endDate) }}</td>
            <td class="text-center status-cell">
              <span :style="{ backgroundColor: coupon.active ? '#000000' : '#8B0000', color: '#FFFFFF', padding: '0.3rem 0.6rem', borderRadius: '0.25rem', fontSize: '0.85em' }">
                {{ coupon.active ? 'Hoat Dong' : 'Het Han' }}
              </span>
            </td>
            <td class="text-center action-cell">
              <label class="switch">
                <input type="checkbox" :checked="coupon.active" @change="toggleStatus(index, $event)">
                <span class="slider round"></span>
              </label>
              <CButton :style="{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }" variant="outline" size="sm" class="ms-1 px-2 py-1" @click="openEditCouponModal(index)">
                <CIcon icon="cil-pencil" />
              </CButton>
              <CButton :style="{ backgroundColor: '#8B0000', borderColor: '#8B0000', color: '#FFFFFF' }" variant="outline" size="sm" class="ms-1 px-2 py-1" @click="deleteCoupon(index)">
                <CIcon icon="cil-trash" />
              </CButton>
              <CButton :style="{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }" variant="outline" size="sm" class="ms-1 px-2 py-1" @click="viewCouponDetails(index)">
                <CIcon icon="cil-list" />
              </CButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <CPagination align="center" class="mt-3">
      <CPaginationItem
        :disabled="currentPage === 1"
        @click="changePage(currentPage - 1)"
      >
        Truoc
      </CPaginationItem>
      <CPaginationItem
        v-for="page in totalPages"
        :key="page"
        :active="page === currentPage"
        @click="changePage(page)"
      >
        {{ page }}
      </CPaginationItem>
      <CPaginationItem
        :disabled="currentPage === totalPages"
        @click="changePage(currentPage + 1)"
      >
        Sau
      </CPaginationItem>
    </CPagination>

    <CModal :visible="showEditCouponModal" @close="showEditCouponModal = false">
      <CModalHeader :style="{ backgroundColor: '#000000', color: '#FFFFFF' }">
        <CModalTitle :style="{ color: '#FFFFFF' }">Sua thong tin phieu giam gia</CModalTitle>
        <CButtonClose @click="showEditCouponModal = false" :style="{ color: '#FFFFFF' }" />
      </CModalHeader>
      <CModalBody>
        <p>Nhap thong tin muon sua.</p>
        <CFormInput v-model="editingCouponCode" placeholder="Ma phieu giam gia" class="mb-3 custom-input" disabled />
        <CFormInput v-model="editingCouponName" placeholder="Ten phieu giam gia" class="mb-3 custom-input" />
        <CFormInput type="number" v-model="editingCouponQuantity" placeholder="So luong phieu" class="mb-3 custom-input" />
        <CFormSelect v-model="editingCouponType" class="mb-3 custom-select">
          <option v-for="type in couponTypes" :key="type" :value="type">{{ type }}</option>
        </CFormSelect>
        <CFormSelect v-model="editingDiscountType" class="mb-3 custom-select">
          <option v-for="type in discountTypes" :key="type" :value="type">{{ type }}</option>
        </CFormSelect>
        <CFormInput type="number" v-model="editingDiscountValue" placeholder="Gia tri giam" class="mb-3 custom-input" />
        <CFormInput type="number" v-model="editingMinOrderValue" placeholder="Gia tri don hang toi thieu" class="mb-3 custom-input" />
        <CFormInput type="number" v-model="editingMaxDiscountValue" placeholder="Gia tri giam toi da" class="mb-3 custom-input" />
        <CFormInput type="datetime-local" v-model="editingStartDate" placeholder="Ngay bat dau" class="mb-3 custom-input" />
        <CFormInput type="datetime-local" v-model="editingEndDate" placeholder="Ngay ket thuc" class="mb-3 custom-input" />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="showEditCouponModal = false" :style="{ backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', color: '#000000' }">Huy</CButton>
        <CButton color="primary" @click="saveEditedCoupon" :style="{ backgroundColor: '#8B0000', borderColor: '#8B0000', color: '#FFFFFF' }">Xac nhan</CButton>
      </CModalFooter>
    </CModal>

    <CModal :visible="showViewDetailsModal" @close="showViewDetailsModal = false">
      <CModalHeader :style="{ backgroundColor: '#000000', color: '#FFFFFF' }">
        <CModalTitle :style="{ color: '#FFFFFF' }">Chi tiet phieu giam gia</CModalTitle>
        <CButtonClose @click="showViewDetailsModal = false" :style="{ color: '#FFFFFF' }" />
      </CModalHeader>
      <CModalBody v-if="viewingCoupon">
        <p><strong>Ma phieu:</strong> {{ viewingCoupon.code }}</p>
        <p><strong>Ten phieu:</strong> {{ viewingCoupon.name }}</p>
        <p><strong>So luong:</strong> {{ viewingCoupon.quantity }}</p>
        <p><strong>Loai phieu:</strong> {{ viewingCoupon.type }}</p>
        <p><strong>Loai giam gia:</strong> {{ viewingCoupon.discountType }}</p>
        <p><strong>Gia tri giam:</strong> {{ formatCurrency(viewingCoupon.discountValue, viewingCoupon.discountType) }}</p>
        <p><strong>Gia tri don hang toi thieu:</strong> {{ formatCurrency(viewingCoupon.minOrderValue, 'Số tiền cố định') }}</p>
        <p><strong>Gia tri giam toi da:</strong> {{ formatCurrency(viewingCoupon.maxDiscountValue, 'Số tiền cố định') }}</p>
        <p><strong>Ngay bat dau:</strong> {{ formatDate(viewingCoupon.startDate) }}</p>
        <p><strong>Ngay ket thuc:</strong> {{ formatDate(viewingCoupon.endDate) }}</p>
        <p><strong>Trang thai:</strong> {{ viewingCoupon.active ? 'Hoat dong' : 'Khong hoat dong' }}</p>
        <div v-if="viewingCoupon.type === 'Riêng tư' && viewingCoupon.customerIds && viewingCoupon.customerIds.length > 0">
            <h6 class="mt-3 fw-bold">Khách hàng áp dụng:</h6>
            <ul>
                <li v-for="custId in viewingCoupon.customerIds" :key="custId">
                    {{ getCustomerNameById(custId) }} (ID: {{ custId }})
                </li>
            </ul>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="showViewDetailsModal = false" :style="{ backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', color: '#000000' }">Dong</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>

<script>
import { CIcon } from '@coreui/icons-vue';
import * as icon from '@coreui/icons';
import { CFormSelect } from '@coreui/vue';

export default {
  components: {
    CIcon,
    CFormSelect,
  },
  data() {
    return {
      // Filter data
      searchQuery: '',
      filterCouponType: '',
      filterDiscountType: '',
      filterStartDate: '',
      filterEndDate: '',

      // Pagination data
      currentPage: 1,
      pageSize: 10,

      // Coupon data
      originalCoupons: [], // Full list of coupons
      coupons: [], // Filtered/searched list of coupons

      // Edit Coupon Modal data
      showEditCouponModal: false,
      editingCouponCode: '',
      editingCouponName: '',
      editingCouponQuantity: 0,
      editingCouponType: '',
      editingDiscountType: '',
      editingDiscountValue: 0,
      editingMinOrderValue: 0,
      editingMaxDiscountValue: 0,
      editingStartDate: '',
      editingEndDate: '',
      editingCouponIndex: -1,

      // View Details Modal data
      showViewDetailsModal: false,
      viewingCoupon: null,
      allCustomers: [], // Để tra cứu tên khách hàng khi xem chi tiết

      // Dropdown options
      couponTypes: ['Công khai', 'Riêng tư'],
      discountTypes: ['Phần trăm', 'Số tiền cố định'],
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.coupons.length / this.pageSize);
    },
    paginatedCoupons() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.coupons.slice(start, start + this.pageSize);
    },
  },
  created() {
    this.loadCoupons();
    this.loadAllCustomers(); // Tải tất cả khách hàng để phục vụ tra cứu
  },
  methods: {
    loadCoupons() {
      const storedCoupons = localStorage.getItem('couponsData');
      if (storedCoupons) {
        this.originalCoupons = JSON.parse(storedCoupons);
      } else {
        // Initial dummy data
        this.originalCoupons = [
          {
            code: 'SALE2024',
            name: 'Giảm 10% cho mọi đơn hàng',
            quantity: 150,
            type: 'Công khai',
            discountType: 'Phần trăm',
            discountValue: 10,
            minOrderValue: 100000,
            maxDiscountValue: 50000,
            startDate: '2025-06-01T09:00', // Added time
            endDate: '2025-06-30T23:59', // Added time
            active: true
          },
          {
            code: 'FREESHIP',
            name: 'Miễn phí vận chuyển',
            quantity: 50,
            type: 'Công khai',
            discountType: 'Số tiền cố định',
            discountValue: 25000,
            minOrderValue: 0,
            maxDiscountValue: 25000,
            startDate: '2025-06-10T00:00', // Added time
            endDate: '2025-07-10T23:59', // Added time
            active: true
          },
          {
            code: 'VIPDISC',
            name: 'Ưu đãi dành cho khách hàng VIP',
            quantity: 20,
            type: 'Riêng tư',
            discountType: 'Phần trăm',
            discountValue: 15,
            minOrderValue: 500000,
            maxDiscountValue: 100000,
            startDate: '2025-05-15T10:30', // Added time
            endDate: '2025-08-15T18:00', // Added time
            active: true,
            customerIds: ['KH001', 'KH005', 'KH007'] // Thêm trường customerIds
          },
          {
            code: 'HAPPYBIRTHDAY',
            name: 'Giảm giá sinh nhật',
            quantity: 0, // Hết hàng
            type: 'Riêng tư',
            discountType: 'Số tiền cố định',
            discountValue: 30000,
            minOrderValue: 0,
            maxDiscountValue: 30000,
            startDate: '2025-01-01T00:00', // Added time
            endDate: '2025-12-31T23:59', // Added time
            active: false,
            customerIds: ['KH002']
          },
          {
            code: 'SUMMERSALE',
            name: 'Giảm 20% cho mùa hè',
            quantity: 200,
            type: 'Công khai',
            discountType: 'Phần trăm',
            discountValue: 20,
            minOrderValue: 300000,
            maxDiscountValue: 70000,
            startDate: '2025-07-01T09:00',
            endDate: '2025-08-31T23:59',
            active: true
          },
          {
            code: 'NEWYEAR25',
            name: 'Ưu đãi chào năm mới',
            quantity: 80,
            type: 'Công khai',
            discountType: 'Số tiền cố định',
            discountValue: 50000,
            minOrderValue: 250000,
            maxDiscountValue: 50000,
            startDate: '2025-01-01T00:00',
            endDate: '2025-01-31T23:59',
            active: false
          },
          {
            code: 'OCTOBERFEST',
            name: 'Khuyến mãi tháng 10',
            quantity: 75,
            type: 'Công khai',
            discountType: 'Phần trăm',
            discountValue: 8,
            minOrderValue: 100000,
            maxDiscountValue: 30000,
            startDate: '2025-10-01T09:00',
            endDate: '2025-10-31T23:59',
            active: true
          },
          {
            code: 'STUDENTPERK',
            name: 'Giảm giá cho sinh viên',
            quantity: 40,
            type: 'Riêng tư',
            discountType: 'Phần trăm',
            discountValue: 12,
            minOrderValue: 150000,
            maxDiscountValue: 40000,
            startDate: '2025-09-01T08:00',
            endDate: '2025-12-31T23:59',
            active: true,
            customerIds: ['KH004', 'KH008']
          },
          {
            code: 'SPRINGDEAL',
            name: 'Ưu đãi mùa xuân',
            quantity: 110,
            type: 'Công khai',
            discountType: 'Số tiền cố định',
            discountValue: 15000,
            minOrderValue: 80000,
            maxDiscountValue: 15000,
            startDate: '2025-03-01T09:00',
            endDate: '2025-04-30T23:59',
            active: true
          },
          {
            code: 'GAMERDISC',
            name: 'Mã giảm giá cho game thủ',
            quantity: 60,
            type: 'Riêng tư',
            discountType: 'Phần trăm',
            discountValue: 7,
            minOrderValue: 200000,
            maxDiscountValue: 25000,
            startDate: '2025-06-01T10:00',
            endDate: '2025-07-31T23:59',
            active: true,
            customerIds: ['KH009', 'KH012', 'KH011']
          },
          {
            code: 'FIRSTORDER',
            name: 'Chào mừng đơn hàng đầu tiên',
            quantity: 300,
            type: 'Công khai',
            discountType: 'Số tiền cố định',
            discountValue: 20000,
            minOrderValue: 50000,
            maxDiscountValue: 20000,
            startDate: '2025-01-01T00:00',
            endDate: '2025-12-31T23:59',
            active: true
          },
          {
            code: 'BANKPROMO',
            name: 'Ưu đãi từ ngân hàng ABC',
            quantity: 90,
            type: 'Riêng tư',
            discountType: 'Phần trăm',
            discountValue: 10,
            minOrderValue: 400000,
            maxDiscountValue: 60000,
            startDate: '2025-06-15T11:00',
            endDate: '2025-09-15T23:59',
            active: true,
            customerIds: ['KH010', 'KH013', 'KH015']
          },
        ];
        localStorage.setItem('couponsData', JSON.stringify(this.originalCoupons));
      }
      this.filterAndSearchCoupons(); // Apply filters on load
    },
    loadAllCustomers() {
        // Tải tất cả khách hàng (từ nguồn dữ liệu của bạn, ví dụ API hoặc localStorage)
        // Hiện tại dùng dữ liệu giả định giống trong AddCouponPage
        const storedCustomers = localStorage.getItem('customersData');
        if (storedCustomers) {
            this.allCustomers = JSON.parse(storedCustomers);
        } else {
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
    },
    getCustomerNameById(customerId) {
        const customer = this.allCustomers.find(c => c.id === customerId);
        return customer ? customer.name : 'Không tìm thấy';
    },
    saveCoupons() {
      localStorage.setItem('couponsData', JSON.stringify(this.originalCoupons));
    },
    filterAndSearchCoupons() {
      let filtered = [...this.originalCoupons];

      // Filter by search query (coupon name or code)
      if (this.searchQuery.trim()) {
        const query = this.searchQuery.toLowerCase();
        filtered = filtered.filter(coupon =>
          coupon.name.toLowerCase().includes(query) ||
          coupon.code.toLowerCase().includes(query)
        );
      }

      // Filter by coupon type
      if (this.filterCouponType) {
        filtered = filtered.filter(coupon => coupon.type === this.filterCouponType);
      }

      // Filter by discount type
      if (this.filterDiscountType) {
        filtered = filtered.filter(coupon => coupon.discountType === this.filterDiscountType);
      }

      // Filter by start date (now also considers time)
      if (this.filterStartDate) {
        filtered = filtered.filter(coupon => new Date(coupon.startDate) >= new Date(this.filterStartDate));
      }

      // Filter by end date (now also considers time)
      if (this.filterEndDate) {
        filtered = filtered.filter(coupon => new Date(coupon.endDate) <= new Date(this.filterEndDate));
      }

      this.coupons = filtered;
      this.currentPage = 1; // Reset to first page after filtering
    },
    // PHƯƠNG THỨC ĐIỀU HƯỚNG MỚI
    navigateToAddCouponPage() {
        this.$router.push({ name: 'AddCouponPage' }); // Chuyển hướng đến route có tên 'AddCouponPage'
    },
    openEditCouponModal(index) {
      this.editingCouponIndex = (this.currentPage - 1) * this.pageSize + index;
      const couponToEdit = this.coupons[this.editingCouponIndex];

      this.editingCouponCode = couponToEdit.code;
      this.editingCouponName = couponToEdit.name;
      this.editingCouponQuantity = couponToEdit.quantity;
      this.editingCouponType = couponToEdit.type;
      this.editingDiscountType = couponToEdit.discountType;
      this.editingDiscountValue = couponToEdit.discountValue;
      this.editingMinOrderValue = couponToEdit.minOrderValue;
      this.editingMaxDiscountValue = couponToEdit.maxDiscountValue;
      // Ensure the date strings are in 'YYYY-MM-DDTHH:mm' format for datetime-local input
      this.editingStartDate = couponToEdit.startDate.slice(0, 16);
      this.editingEndDate = couponToEdit.endDate.slice(0, 16);
      // Active status is handled by the toggle switch, not directly edited in modal for now

      this.showEditCouponModal = true;
    },
    saveEditedCoupon() {
      if (!this.editingCouponName || !this.editingCouponType || !this.editingDiscountType || this.editingCouponIndex === -1) {
        alert('Vui lòng điền đầy đủ các trường bắt buộc (Tên, Loại phiếu, Loại giảm giá)!');
        return;
      }

      const coupon = this.coupons[this.editingCouponIndex];
      coupon.name = this.editingCouponName.trim();
      coupon.quantity = parseInt(this.editingCouponQuantity, 10) || 0;
      coupon.type = this.editingCouponType;
      coupon.discountType = this.editingDiscountType;
      coupon.discountValue = parseFloat(this.editingDiscountValue) || 0;
      coupon.minOrderValue = parseFloat(this.editingMinOrderValue) || 0;
      coupon.maxDiscountValue = parseFloat(this.editingMaxDiscountValue) || 0;
      // Ensure dates are saved with time component
      coupon.startDate = this.editingStartDate;
      coupon.endDate = this.editingEndDate;

      // Find the coupon in the original list and update it
      const originalIndex = this.originalCoupons.findIndex(c => c.code === coupon.code);
      if (originalIndex !== -1) {
        this.originalCoupons[originalIndex] = { ...coupon };
      }
      this.saveCoupons();
      this.filterAndSearchCoupons(); // Re-apply filters and reload
      this.showEditCouponModal = false;

      // Reset editing fields
      this.editingCouponCode = '';
      this.editingCouponName = '';
      this.editingCouponQuantity = 0;
      this.editingCouponType = '';
      this.editingDiscountType = '';
      this.editingDiscountValue = 0;
      this.editingMinOrderValue = 0;
      this.editingMaxDiscountValue = 0;
      this.editingStartDate = '';
      this.editingEndDate = '';
      this.editingCouponIndex = -1;
    },
    viewCouponDetails(index) {
      const globalIndex = (this.currentPage - 1) * this.pageSize + index;
      this.viewingCoupon = this.coupons[globalIndex];
      this.showViewDetailsModal = true;
    },
    refreshList() {
      this.searchQuery = '';
      this.filterCouponType = '';
      this.filterDiscountType = '';
      this.filterStartDate = '';
      this.filterEndDate = '';
      this.loadCoupons(); // Reload original data and apply empty filters
    },
    toggleStatus(index, event) {
      const globalIndex = (this.currentPage - 1) * this.pageSize + index;
      const coupon = this.coupons[globalIndex];
      coupon.active = event.target.checked;

      const originalIndex = this.originalCoupons.findIndex(c => c.code === coupon.code);
      if (originalIndex !== -1) {
        this.originalCoupons[originalIndex] = { ...coupon };
      }
      this.saveCoupons();
      this.filterAndSearchCoupons(); // Re-apply filters to ensure view consistency
    },
    deleteCoupon(index) {
      const globalIndex = (this.currentPage - 1) * this.pageSize + index;
      const couponToDelete = this.coupons[globalIndex];

      if (confirm(`Ban co chac muon chuyen trang thai phieu "${couponToDelete.name}" sang "Khong hoat dong"?`)) {
        // Soft delete: set active to false
        couponToDelete.active = false;
        const originalIndex = this.originalCoupons.findIndex(c => c.code === couponToDelete.code);
        if (originalIndex !== -1) {
          this.originalCoupons[originalIndex] = { ...couponToDelete };
        }
        this.saveCoupons();
        this.filterAndSearchCoupons(); // Re-apply filters to ensure view consistency
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    formatDate(dateString) {
      if (!dateString) return '';
      const date = new Date(dateString);
      // Format to Vietnamese date and time string (e.g., 20/06/2025, 14:30)
      return date.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    },
    formatCurrency(value, type) {
      if (type === 'Phần trăm') {
        return `${value}%`;
      }
      return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value);
    }
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
  color: #000000; /* Deep red for headings */
}

.filter-section {
  background-color: #f8f9fa;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.filters-and-search {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.custom-input,
.custom-select {
  border-radius: 0.5rem;
  border: 1px solid #ced4da;
  padding: 0.5rem 0.75rem;
}

.custom-input:focus,
.custom-select:focus {
  border-color: #8B0000; /* Deep red focus */
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

.btn-primary {
  background-color: #8B0000; /* Deep red */
  border-color: #8B0000;
}

.btn-primary:hover {
  background-color: #6a0000; /* Darker red on hover */
  border-color: #6a0000;
}

.btn-secondary {
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-secondary:hover {
  background-color: #5a6268;
  border-color: #5a6268;
}

.table-container {
  overflow-x: auto;
  margin-top: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
}

.custom-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  min-width: 1200px; /* Ensure table doesn't shrink too much */
}

.custom-table th,
.custom-table td {
  padding: 1rem 1.2rem;
  vertical-align: middle;
  border-bottom: 1px solid #dee2e6;
}

.custom-table th {
  background-color: #000000; /* Dark header */
  color: #FFFFFF;
  text-align: left;
  font-weight: bold;
  white-space: nowrap; /* Prevent wrapping of headers */
}

.custom-table tbody tr:hover {
  background-color: #f1f1f1;
}

.custom-table tbody tr:last-child td {
  border-bottom: none;
}

.custom-table th:first-child,
.custom-table td:first-child {
  border-top-left-radius: 8px;
}
.custom-table th:last-child,
.custom-table td:last-child {
  border-top-right-radius: 8px;
}
.custom-table tr:last-child td:first-child {
  border-bottom-left-radius: 8px;
}
.custom-table tr:last-child td:last-child {
  border-bottom-right-radius: 8px;
}

.status-cell span {
  font-weight: bold;
  white-space: nowrap;
}

.action-cell {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap; /* Keep action buttons on one line */
}

.action-cell .btn {
  padding: 0.375rem 0.75rem;
  font-size: 0.875rem;
}

/* Toggle Switch Styles */
.switch {
  position: relative;
  display: inline-block;
  width: 40px;
  height: 20px;
  margin: 0 8px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ccc;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 20px; /* Make it round */
}

.slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  -webkit-transition: .4s;
  transition: .4s;
  border-radius: 50%; /* Make it round */
}

input:checked + .slider {
  background-color: #000000; /* Deep red when checked */
}

input:focus + .slider {
  box-shadow: 0 0 1px #000000; /* Deep red focus */
}

input:checked + .slider:before {
  -webkit-transform: translateX(20px);
  -ms-transform: translateX(20px);
  transform: translateX(20px);
}

/* Rounded sliders */
.slider.round {
  border-radius: 20px;
}

.slider.round:before {
  border-radius: 50%;
}

.CModalHeader {
  background-color: #000000; /* Deep red for modal header */
  color: #FFFFFF;
}

.CModalTitle {
  color: #FFFFFF;
}

.CButtonClose {
  color: #FFFFFF;
}

.CModalFooter .btn {
  min-width: 80px;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 1.5rem;
}

.page-item .page-link {
  color: #000000; /* Black for page numbers */
  border-color: #dee2e6;
}

.page-item.active .page-link {
  background-color: #8B0000; /* Deep red for active page */
  border-color: #8B0000;
  color: #FFFFFF;
}

.page-item.disabled .page-link {
  color: #6c757d;
}

.filters-and-search .btn .cil-search,
.filters-and-search .btn .cil-reload {
  margin-right: 0.25rem;
}

/* Responsive adjustments */
@media (max-width: 992px) {
  .custom-table th,
  .custom-table td {
    padding: 0.4rem 0.6rem;
    font-size: 0.8em;
  }

  .custom-table td.status-cell {
    min-width: 80px;
  }
  .custom-table td.action-cell {
    min-width: 150px;
  }

  .action-cell .btn {
    padding: 0.2rem 0.4rem;
    font-size: 0.75em;
    margin-left: 0.2rem !important;
    margin-right: 0.2rem !important;
  }

  .switch {
    width: 36px;
    height: 18px;
  }
  .slider:before {
    height: 14px;
    width: 14px;
    left: 2px;
    bottom: 2px;
  }
  input:checked + .slider:before {
    transform: translateX(16px);
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

  .filter-section {
    padding: 1rem;
  }

  .btn {
    padding: 0.4rem 0.8rem;
    font-size: 0.9rem;
  }
}
</style>