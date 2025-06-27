<template>
  <div class="container py-4">
    <h2 class="mb-4 fw-bold" :style="{ color: '#000000' }">Quan Ly San Pham Chi Tiet</h2>

    <CInputGroup class="mb-3">
      <CFormInput v-model="searchQuery" placeholder="Nhap vao ten san pham muon tim..." @keyup.enter="searchProducts" class="custom-input" />
      <CButton :style="{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }" @click="searchProducts">Tim kiem</CButton>
    </CInputGroup>

    <div class="row mb-3">
      <div class="col-md-4 col-sm-6 col-12 mb-2">
        <CFormSelect v-model="filterProduct" @change="filterAndSortProducts">
          <option value="">Tat ca san pham</option>
          <option v-for="product in uniqueProducts" :key="product" :value="product">{{ product }}</option>
        </CFormSelect>
      </div>
      <div class="col-md-4 col-sm-6 col-12 mb-2">
        <CFormSelect v-model="filterBrand" @change="filterAndSortProducts">
          <option value="">Tat ca hang</option>
          <option v-for="brand in uniqueBrands" :key="brand" :value="brand">{{ brand }}</option>
        </CFormSelect>
      </div>
      <div class="col-md-4 col-sm-6 col-12 mb-2">
        <CFormSelect v-model="filterType" @change="filterAndSortProducts">
          <option value="">Tat ca loai giay</option>
          <option v-for="type in uniqueTypes" :key="type" :value="type">{{ type }}</option>
        </CFormSelect>
      </div>
      <div class="col-md-4 col-sm-6 col-12 mb-2">
        <CFormSelect v-model="filterColor" @change="filterAndSortProducts">
          <option value="">Tat ca mau sac</option>
          <option v-for="color in uniqueColors" :key="color" :value="color">{{ color }}</option>
        </CFormSelect>
      </div>
      <div class="col-md-4 col-sm-6 col-12 mb-2">
        <CFormSelect v-model="filterMaterial" @change="filterAndSortProducts">
          <option value="">Tat ca chat lieu</option>
          <option v-for="material in uniqueMaterials" :key="material" :value="material">{{ material }}</option>
        </CFormSelect>
      </div>
      <div class="col-md-4 col-sm-6 col-12 mb-2">
        <CFormSelect v-model="filterSize" @change="filterAndSortProducts">
          <option value="">Tat ca kich co</option>
          <option v-for="size in uniqueSizes" :key="size" :value="size">{{ size }}</option>
        </CFormSelect>
      </div>
      <div class="col-md-4 col-sm-6 col-12 mb-2">
        <CFormSelect v-model="sortOrder" @change="filterAndSortProducts">
          <option value="">Sap xep</option>
          <option value="price-asc">Gia: Thap den Cao</option>
          <option value="price-desc">Gia: Cao den Thap</option>
          <option value="name-asc">Ten: A-Z</option>
          <option value="name-desc">Ten: Z-A</option>
        </CFormSelect>
      </div>
    </div>

    <div class="mb-3 d-flex gap-2 flex-wrap">
      <CButton :style="{ backgroundColor: '#006400', borderColor: '#006400', color: '#FFFFFF' }" @click="exportToExcel">
        <CIcon icon="cil-data-transfer-down" class="me-1" /> Xuat file Excel
      </CButton>
      <CButton :style="{ backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', color: '#000000' }" @click="refreshList">
        <CIcon icon="cil-loop" class="me-1" /> Lam moi
      </CButton>
    </div>

    <div class="table-container">
      <table class="custom-table">
        <thead>
          <tr>
            <th class="text-center">#</th>
            <th class="text-center">Anh san pham</th>
            <th>Ten san pham</th>
            <th>Hang</th>
            <th>Loai giay</th>
            <th>Mau sac</th>
            <th>Chat lieu</th>
            <th>Kich co</th>
            <th class="text-end">So luong</th>
            <th class="text-end">Gia</th>
            <th class="text-center status-cell">Trang thai</th>
            <th class="text-center">Thao tac</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in paginatedProducts" :key="product.id">
            <td class="text-center">{{ index + 1 + (currentPage - 1) * pageSize }}</td>
            <td class="text-center">
              <img :src="product.image" alt="product image" width="50" class="rounded" />
            </td>
            <td>{{ product.name }}</td>
            <td>{{ product.brand }}</td>
            <td>{{ product.type }}</td>
            <td>{{ product.color }}</td>
            <td>{{ product.material }}</td>
            <td>{{ product.size }}</td>
            <td class="text-end">{{ product.quantity }}</td>
            <td class="text-end">{{ product.price }} VND</td>
            <td class="text-center status-cell">
              <span :style="{ backgroundColor: product.active ? '#000000' : '#8B0000', color: '#FFFFFF', padding: '0.5rem 1rem', borderRadius: '0.25rem' }">
                {{ product.active ? 'Dang ban' : 'Het hang' }}
              </span>
            </td>
            <td class="text-center action-cell">
              <label class="switch">
                <input type="checkbox" :checked="product.active" @change="toggleStatus(index, $event)">
                <span class="slider round"></span>
              </label>
              <CButton :style="{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }" variant="outline" size="sm" class="ms-2" @click="openEditProductDetailModal(index)">
                <CIcon icon="cil-pencil" />
              </CButton>
              <CButton :style="{ backgroundColor: '#8B0000', borderColor: '#8B0000', color: '#FFFFFF' }" variant="outline" size="sm" class="ms-2" @click="deleteProductDetail(index)">
                <CIcon icon="cil-trash" />
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

    <CModal :visible="showAddProductDetailModal" @close="closeAddProductDetailModal">
      <CModalHeader :style="{ backgroundColor: '#000000', color: '#FFFFFF' }">
        <CModalTitle :style="{ color: '#FFFFFF' }">Them chi tiet san pham moi</CModalTitle>
        <CButtonClose @click="closeAddProductDetailModal" :style="{ color: '#FFFFFF' }" />
      </CModalHeader>
      <CModalBody>
        <CFormInput v-model="newProductDetail.parentProductId" label="ID San pham goc" class="mb-3 custom-input" @blur="loadParentProductInfo" placeholder="Nhap ID san pham da tao" />
        <CFormInput v-model="newProductDetail.name" label="Ten san pham" class="mb-3 custom-input" disabled />
        <CFormInput v-model="newProductDetail.image" label="URL anh san pham" class="mb-3 custom-input" disabled />

        <CFormInput v-model="newProductDetail.brand" label="Hang" class="mb-3 custom-input" />
        <CFormInput v-model="newProductDetail.type" label="Loai giay" class="mb-3 custom-input" />
        <CFormInput v-model="newProductDetail.color" label="Mau sac" class="mb-3 custom-input" />
        <CFormInput v-model="newProductDetail.material" label="Chat lieu" class="mb-3 custom-input" />
        <CFormInput v-model="newProductDetail.size" label="Kich co" class="mb-3 custom-input" />
        <CFormInput type="number" v-model="newProductDetail.quantity" label="So luong" class="mb-3 custom-input" />
        <CFormInput type="number" v-model="newProductDetail.price" label="Gia" class="mb-3 custom-input" />
        <CFormCheck
          id="flexCheckDefaultDetail"
          label="Dang ban"
          v-model="newProductDetail.active"
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeAddProductDetailModal" :style="{ backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', color: '#000000' }">Huy</CButton>
        <CButton color="primary" @click="addNewProductDetail" :style="{ backgroundColor: '#8B0000', borderColor: '#8B0000', color: '#FFFFFF' }">Them chi tiet</CButton>
      </CModalFooter>
    </CModal>

    <CModal :visible="showEditProductDetailModal" @close="showEditProductDetailModal = false">
      <CModalHeader :style="{ backgroundColor: '#000000', color: '#FFFFFF' }">
        <CModalTitle :style="{ color: '#FFFFFF' }">Sua chi tiet san pham</CModalTitle>
        <CButtonClose @click="showEditProductDetailModal = false" :style="{ color: '#FFFFFF' }" />
      </CModalHeader>
      <CModalBody>
        <p>Nhap thong tin muon sua (Hang, Loai giay, Mau sac, Chat lieu, Kich co, Gia, So luong).</p>
        <CFormInput v-model="editingProductDetail.name" label="Ten san pham" class="mb-3 custom-input" disabled />
        <CFormInput v-model="editingProductDetail.image" label="URL anh san pham" class="mb-3 custom-input" disabled />
        <CFormInput v-model="editingProductDetail.brand" label="Hang" class="mb-3 custom-input" />
        <CFormInput v-model="editingProductDetail.type" label="Loai giay" class="mb-3 custom-input" />
        <CFormInput v-model="editingProductDetail.color" label="Mau sac" class="mb-3 custom-input" />
        <CFormInput v-model="editingProductDetail.material" label="Chat lieu" class="mb-3 custom-input" />
        <CFormInput v-model="editingProductDetail.size" label="Kich co" class="mb-3 custom-input" />
        <CFormInput type="number" v-model="editingProductDetail.quantity" label="So luong" class="mb-3 custom-input" />
        <CFormInput type="number" v-model="editingProductDetail.price" label="Gia" class="mb-3 custom-input" />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="showEditProductDetailModal = false" :style="{ backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', color: '#000000' }">Huy</CButton>
        <CButton color="primary" @click="saveEditedProductDetail" :style="{ backgroundColor: '#8B0000', borderColor: '#8B0000', color: '#FFFFFF' }">Xac nhan</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>

<script>
import { CIcon } from '@coreui/icons-vue';
import * as icon from '@coreui/icons';
import * as XLSX from 'xlsx';
import { inject } from 'vue'; // Import inject để sử dụng toast

export default {
  components: {
    CIcon
  },
  setup() {
    const toast = inject('$toast'); // Inject toast vào setup
    return { toast }; // Trả về toast để có thể sử dụng trong data và methods
  },
  data() {
    return {
      searchQuery: '',
      filterProduct: '',
      filterBrand: '',
      filterType: '',
      filterColor: '',
      filterMaterial: '',
      filterSize: '',
      sortOrder: '',
      currentPage: 1,
      pageSize: 10,
      originalProducts: [], // Day la noi luu tru tat ca cac chi tiet san pham (bien the)
      products: [], // Mang nay se chua du lieu da loc va sap xep de hien thi
      showEditProductDetailModal: false,
      editingProductDetail: {},
      editingProductDetailIndex: -1,
      showAddProductDetailModal: false,
      newProductDetail: {
        parentProductId: null, // ID cua san pham goc
        id: null, // ID cua bien the nay (se duoc tao tu dong)
        image: '', // Anh san pham goc (tu dong dien)
        name: '', // Ten san pham goc (tu dong dien)
        brand: '', type: '', color: '', material: '', size: '', quantity: 0, price: 0, active: true
      },
      // Mang gia dinh cho cac san pham goc (duoc lay tu Products.vue hoac API)
      parentProducts: [
        { id: 101, name: 'Nike Air Zoom Pegasus 40', image: 'https://cdn.tgdd.vn/Products/Images/6535/268999/Slider/giay-nike-air-zoom-pegasus-40-black-wolf-grey-5.jpg' },
        { id: 102, name: 'Nike Air Force 1 ’07', image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3fa462b9-51ee-423f-8f4c-40b49f3aad91/air-force-1-07-shoes-Ry8nSw.png' },
        { id: 103, name: 'Adidas Ultra Boost', image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ultra-boost-5-damen-schuh-HL3280_21_standard.jpg' },
        { id: 104, name: 'Adidas Stan Smith', image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/stan-smith-shoes-BD7442_01_standard.jpg' },
        { id: 105, name: 'Air Jordan 4 Industrial Blue', image: 'https://images.stockx.com/images/Air-Jordan-4-Industrial-Blue.jpg' },
        { id: 106, name: 'Adidas Samba OG', image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/samba-shoes-S76551_01_standard.jpg' },
      ],
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.products.length / this.pageSize);
    },
    paginatedProducts() {
      const start = (this.currentPage - 1) * this.pageSize;
      return this.products.slice(start, start + this.pageSize);
    },
    uniqueProducts() {
      // Get unique product names from originalProducts
      return [...new Set(this.originalProducts.map(p => p.name))].sort();
    },
    uniqueBrands() {
      return [...new Set(this.originalProducts.map(p => p.brand))].sort();
    },
    uniqueTypes() {
      return [...new Set(this.originalProducts.map(p => p.type))].sort();
    },
    uniqueColors() {
      return [...new Set(this.originalProducts.map(p => p.color))].sort();
    },
    uniqueMaterials() {
      return [...new Set(this.originalProducts.map(p => p.material))].sort();
    },
    uniqueSizes() {
      return [...new Set(this.originalProducts.map(p => p.size))].sort();
    },
  },
  created() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      const storedProducts = localStorage.getItem('productsDetailData');
      if (storedProducts) {
        this.originalProducts = JSON.parse(storedProducts);
      } else {
        // Du lieu mau voi ID cho moi chi tiet san pham va productId lien ket
        this.originalProducts = [
          { id: 1, productId: 101, image: 'https://cdn.tgdd.vn/Products/Images/6535/268999/Slider/giay-nike-air-zoom-pegasus-40-black-wolf-grey-5.jpg', name: 'Nike Air Zoom Pegasus 40', quantity: 120, active: true, brand: 'Nike', type: 'Running', color: 'Black', material: 'Mesh', size: '42', price: 2500000 },
          { id: 2, productId: 101, image: 'https://cdn.tgdd.vn/Products/Images/6535/268999/Slider/giay-nike-air-zoom-pegasus-40-black-wolf-grey-5.jpg', name: 'Nike Air Zoom Pegasus 40', quantity: 50, active: true, brand: 'Nike', type: 'Running', color: 'White', material: 'Mesh', size: '43', price: 2500000 },
          { id: 3, productId: 102, image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3fa462b9-51ee-423f-8f4c-40b49f3aad91/air-force-1-07-shoes-Ry8nSw.png', name: 'Nike Air Force 1 ’07', quantity: 200, active: true, brand: 'Nike', type: 'Casual', color: 'White', material: 'Leather', size: '41', price: 3000000 },
          { id: 4, productId: 103, image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ultra-boost-5-damen-schuh-HL3280_21_standard.jpg', name: 'Adidas Ultra Boost', quantity: 185, active: true, brand: 'Adidas', type: 'Running', color: 'Grey', material: 'Primeknit', size: '43', price: 3500000 },
          { id: 5, productId: 104, image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/stan-smith-shoes-BD7442_01_standard.jpg', name: 'Adidas Stan Smith', quantity: 160, active: false, brand: 'Adidas', type: 'Casual', color: 'Green', material: 'Leather', size: '40', price: 2000000 },
          { id: 6, productId: 105, image: 'https://images.stockx.com/images/Air-Jordan-4-Industrial-Blue.jpg', name: 'Air Jordan 4 Industrial Blue', quantity: 80, active: true, brand: 'Jordan', type: 'Basketball', color: 'Blue', material: 'Suede', size: '44', price: 4500000 },
          { id: 7, productId: 106, image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/samba-shoes-S76551_01_standard.jpg', name: 'Adidas Samba OG', quantity: 95, active: true, brand: 'Adidas', type: 'Soccer', color: 'Black', material: 'Leather', size: '42', price: 2200000 },
        ];
        localStorage.setItem('productsDetailData', JSON.stringify(this.originalProducts));
      }
      this.products = [...this.originalProducts];
    },
    saveProducts() {
      localStorage.setItem('productsDetailData', JSON.stringify(this.originalProducts));
    },
    searchProducts() {
      this.filterAndSortProducts();
      if (this.searchQuery.trim()) {
        this.toast.info(`Da tim thay ${this.products.length} san pham phu hop.`); // Them toast
      } else {
        this.toast.info('Da lam moi danh sach san pham chi tiet.'); // Them toast
      }
    },
    filterAndSortProducts() {
      let filtered = [...this.originalProducts];

      // Filter by search query (name of product detail)
      if (this.searchQuery.trim()) {
        filtered = filtered.filter(product =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
      }

      // Apply other filters
      if (this.filterProduct) {
        filtered = filtered.filter(product => product.name === this.filterProduct);
      }
      if (this.filterBrand) {
        filtered = filtered.filter(product => product.brand === this.filterBrand);
      }
      if (this.filterType) {
        filtered = filtered.filter(product => product.type === this.filterType);
      }
      if (this.filterColor) {
        filtered = filtered.filter(product => product.color === this.filterColor);
      }
      if (this.filterMaterial) {
        filtered = filtered.filter(product => product.material === this.filterMaterial);
      }
      if (this.filterSize) {
        filtered = filtered.filter(product => product.size === this.filterSize);
      }

      // Apply sorting
      if (this.sortOrder) {
        filtered.sort((a, b) => {
          if (this.sortOrder === 'price-asc') {
            return a.price - b.price;
          } else if (this.sortOrder === 'price-desc') {
            return b.price - a.price;
          } else if (this.sortOrder === 'name-asc') {
            return a.name.localeCompare(b.name);
          } else if (this.sortOrder === 'name-desc') {
            return b.name.localeCompare(a.name);
          }
          return 0;
        });
      }

      this.products = filtered;
      this.currentPage = 1;
    },
    // Phuong thuc de dien thong tin san pham goc khi nhap ID
    loadParentProductInfo() {
      const parentProductId = parseInt(this.newProductDetail.parentProductId, 10);
      const parentProduct = this.parentProducts.find(p => p.id === parentProductId);

      if (parentProduct) {
        this.newProductDetail.name = parentProduct.name;
        this.newProductDetail.image = parentProduct.image;
      } else {
        this.newProductDetail.name = '';
        this.newProductDetail.image = '';
        if (this.newProductDetail.parentProductId) { // Chi thong bao neu nguoi dung da nhap gi do
            this.toast.error('Khong tim thay san pham goc voi ID nay. Vui long kiem tra lai.'); // Them toast
        }
      }
    },
    addNewProductDetail() {
      if (!this.newProductDetail.parentProductId) {
        this.toast.error('Vui long nhap ID san pham goc.'); // Them toast
        return;
      }
      if (!this.newProductDetail.name) { // Kiem tra xem ten san pham da duoc tu dong dien chua
        this.toast.error('ID san pham goc khong hop le hoac chua duoc tai thong tin.'); // Them toast
        return;
      }
      if (this.newProductDetail.quantity < 0 || this.newProductDetail.price < 0) {
        this.toast.error('So luong va gia phai lon hon hoac bang 0.'); // Them toast
        return;
      }
      if (this.newProductDetail.brand.trim() === '' || this.newProductDetail.type.trim() === '' ||
          this.newProductDetail.color.trim() === '' || this.newProductDetail.material.trim() === '' ||
          this.newProductDetail.size.trim() === '') {
          this.toast.error('Vui long dien day du thong tin chi tiet (Hang, Loai giay, Mau sac, Chat lieu, Kich co).'); // Them toast
          return;
      }

      // Tao mot ID duy nhat cho bien the moi
      const newDetailId = this.originalProducts.length > 0 ? Math.max(...this.originalProducts.map(p => p.id || 0)) + 1 : 1;

      const newDetail = {
        id: newDetailId,
        productId: parseInt(this.newProductDetail.parentProductId, 10), // Luu productId
        image: this.newProductDetail.image,
        name: this.newProductDetail.name,
        brand: this.newProductDetail.brand,
        type: this.newProductDetail.type,
        color: this.newProductDetail.color,
        material: this.newProductDetail.material,
        size: this.newProductDetail.size,
        quantity: parseInt(this.newProductDetail.quantity, 10),
        price: parseFloat(this.newProductDetail.price),
        active: this.newProductDetail.active,
      };

      this.originalProducts.unshift(newDetail); // Them vao dau danh sach
      this.saveProducts();
      this.refreshList(); // Tai lai danh sach de ap dung bo loc/sap xep
      this.closeAddProductDetailModal();
      this.toast.success('Them chi tiet san pham thanh cong!'); // Them toast
    },
    closeAddProductDetailModal() {
        this.showAddProductDetailModal = false;
        this.resetNewProductDetail();
    },
    resetNewProductDetail() {
      this.newProductDetail = {
        parentProductId: null,
        id: null,
        image: '', name: '', brand: '', type: '', color: '', material: '', size: '', quantity: 0, price: 0, active: true
      };
    },
    toggleStatus(index, event) {
      const product = this.paginatedProducts[index]; // Lay san pham tu trang hien tai
      const oldActiveStatus = product.active; // Luu trang thai cu de thong bao chinh xac
      product.active = event.target.checked;

      // Tim va cap nhat san pham trong originalProducts
      const originalIndex = this.originalProducts.findIndex(p => p.id === product.id);
      if (originalIndex !== -1) {
        this.originalProducts[originalIndex] = { ...product };
      }
      this.saveProducts();

      // Them toast voi thong bao cu the
      if (oldActiveStatus !== product.active) {
        if (product.active) {
          this.toast.success(`Chi tiet san pham "${product.name} - ${product.color} - ${product.size}" da duoc chuyen sang trang thai "Dang ban".`);
        } else {
          this.toast.warning(`Chi tiet san pham "${product.name} - ${product.color} - ${product.size}" da duoc chuyen sang trang thai "Het hang".`);
        }
      }
    },
    openEditProductDetailModal(index) {
      this.editingProductDetailIndex = index; // Luu index cua san pham tren trang hien tai
      this.editingProductDetail = { ...this.paginatedProducts[index] }; // Tao ban sao de chinh sua
      this.showEditProductDetailModal = true;
    },
   saveEditedProductDetail() {
  if (this.editingProductDetailIndex !== -1) {
    if (this.editingProductDetail.quantity < 0 || this.editingProductDetail.price < 0) {
      this.toast.error('So luong va gia phai lon hon hoac bang 0.');
      return;
    }
    if (
      this.editingProductDetail.brand.trim() === '' ||
      this.editingProductDetail.type.trim() === '' ||
      this.editingProductDetail.color.trim() === '' ||
      this.editingProductDetail.material.trim() === '' ||
      this.editingProductDetail.size.trim() === ''
    ) {
      this.toast.error('Vui long dien day du thong tin chi tiet (Hang, Loai giay, Mau sac, Chat lieu, Kich co).');
      return;
    }

    const productInPaginated = this.paginatedProducts[this.editingProductDetailIndex];

    // Cập nhật các thuộc tính chi tiết từ editingProductDetail
    productInPaginated.brand = this.editingProductDetail.brand;
    productInPaginated.type = this.editingProductDetail.type;
    productInPaginated.color = this.editingProductDetail.color;
    productInPaginated.material = this.editingProductDetail.material;
    productInPaginated.size = this.editingProductDetail.size;
    productInPaginated.quantity = parseInt(this.editingProductDetail.quantity, 10);
    productInPaginated.price = parseFloat(this.editingProductDetail.price);

    // Cập nhật trong originalProducts
    const originalIndex = this.originalProducts.findIndex(p => p.id === productInPaginated.id);
    if (originalIndex !== -1) {
      this.originalProducts[originalIndex] = { ...productInPaginated };
    }
    this.saveProducts();

    // Cập nhật tổng số lượng trong productsData
    const storedProducts = JSON.parse(localStorage.getItem('productsData') || '[]');
    const updatedProducts = storedProducts.map(product => {
      if (product.id === productInPaginated.productId) {
        const relatedDetails = this.originalProducts.filter(d => d.productId === product.id);
        const totalQuantity = relatedDetails.reduce((sum, d) => sum + d.quantity, 0);
        return { ...product, quantity: totalQuantity };
      }
      return product;
    });
    localStorage.setItem('productsData', JSON.stringify(updatedProducts));

    this.showEditProductDetailModal = false;
    this.editingProductDetailIndex = -1;
    this.editingProductDetail = {};
    this.refreshList();
    this.toast.success('Cap nhat chi tiet san pham thanh cong!');
  } else {
    this.toast.error('Co loi xay ra khi luu san pham chi tiet.');
  }
},
 deleteProductDetail(index) {
  const productToDelete = this.paginatedProducts[index];
  if (confirm(`Ban co chac muon xoa chi tiet san pham: ${productToDelete.name} - ${productToDelete.color} - ${productToDelete.size}?`)) {
    // Xóa khỏi originalProducts
    const originalIndex = this.originalProducts.findIndex(p => p.id === productToDelete.id);
    if (originalIndex !== -1) {
      this.originalProducts.splice(originalIndex, 1);
    }
    this.saveProducts();

    // Cập nhật tổng số lượng trong productsData
    const storedProducts = JSON.parse(localStorage.getItem('productsData') || '[]');
    const updatedProducts = storedProducts.map(product => {
      if (product.id === productToDelete.productId) {
        const relatedDetails = this.originalProducts.filter(d => d.productId === product.id);
        const totalQuantity = relatedDetails.reduce((sum, d) => sum + d.quantity, 0);
        return { ...product, quantity: totalQuantity };
      }
      return product;
    });
    localStorage.setItem('productsData', JSON.stringify(updatedProducts));

    this.refreshList();
    this.toast.warning(`Chi tiet san pham "${productToDelete.name} - ${productToDelete.color} - ${productToDelete.size}" da bi xoa.`);
  }
},
    refreshList() {
      this.loadProducts(); // Tai lai du lieu goc
      this.searchQuery = '';
      this.filterProduct = '';
      this.filterBrand = '';
      this.filterType = '';
      this.filterColor = '';
      this.filterMaterial = '';
      this.filterSize = '';
      this.sortOrder = '';
      this.currentPage = 1;
      this.filterAndSortProducts(); // Ap dung lai cac filter/sort (hien tai la reset)
      this.toast.info('Danh sach chi tiet san pham da duoc lam moi.'); // Them toast
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    exportToExcel() {
      const data = this.products.map(product => ({
        'Ten san pham': product.name,
        'Hang': product.brand,
        'Loai giay': product.type,
        'Mau sac': product.color,
        'Chat lieu': product.material,
        'Kich co': product.size,
        'So luong': product.quantity,
        'Gia': product.price,
        'Trang thai': product.active ? 'Dang ban' : 'Het hang',
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'ChiTietSanPham');
      XLSX.writeFile(workbook, 'ChiTietSanPham.xlsx');
      this.toast.success('Xuat file Excel thanh cong!'); // Them toast
    }
  },
  icons: {
    ...icon,
  },
};
</script>

<style scoped>
/* Giu nguyen style tu Products-Detail.vue va them/sua mot so chi tiet */
.container {
  padding: 1rem;
}

.table-container {
  overflow-x: auto;
  max-width: 100%;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;
}

.custom-table th,
.custom-table td {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #dee2e6;
  text-align: left;
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

.custom-table th.text-end,
.custom-table td.text-end {
  text-align: right;
  vertical-align: middle;
}

.custom-table td.status-cell {
  min-width: 120px;
  white-space: nowrap;
  overflow: visible;
  padding: 0.5rem;
  vertical-align: middle;
}

.custom-table td.action-cell {
  min-width: 200px;
  white-space: nowrap;
  overflow: visible;
  padding: 0.5rem;
  vertical-align: middle;
}

.custom-table tr:hover {
  background-color: #f8f9fa;
}

.switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 24px;
  margin-right: 0.5rem;
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
  background-color: #8B0000;
  transition: 0.4s;
  border-radius: 24px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 3px;
  bottom: 3px;
  background-color: white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: #000000;
}

input:checked + .slider:before {
  transform: translateX(26px);
}

.round {
  border-radius: 24px;
}

/* Custom input style */
.custom-input .form-control:focus {
  border-color: #ced4da !important; /* Mau xam */
  box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.25) !important; /* Mau xam nhat */
}

/* Them CSS de CFormSelect chiem toan bo chieu rong cua cot */
.col-md-4 .form-select,
.col-sm-6 .form-select,
.col-12 .form-select {
  width: 100%;
}

.form-select {
  height: calc(1.5em + 0.75rem + 2px); /* Chieu cao mac dinh cua form-select trong Bootstrap */
}

@media (max-width: 768px) {
  .custom-table td.status-cell {
    min-width: 100px;
  }
  .custom-table td.action-cell {
    min-width: 180px;
  }
}
</style>