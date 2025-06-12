<template>
  <div class="container py-4">
    <h2 class="mb-4 fw-bold" :style="{ color: '#000000' }">Quản Lý Sản Phẩm Chi Tiết</h2>

    <CInputGroup class="mb-3">
      <CFormInput v-model="searchQuery" placeholder="Nhập vào tên sản phẩm muốn tìm..." @keyup.enter="searchProducts" class="custom-input" />
      <CButton :style="{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }" @click="searchProducts">Tìm kiếm</CButton>
    </CInputGroup>

    <div class="mb-3 d-flex gap-2 flex-wrap">
      <CFormSelect v-model="filterProduct" @change="filterAndSortProducts" class="me-2">
        <option value="">Tất cả sản phẩm</option>
        <option v-for="product in uniqueProducts" :key="product" :value="product">{{ product }}</option>
      </CFormSelect>
      <CFormSelect v-model="filterBrand" @change="filterAndSortProducts" class="me-2">
        <option value="">Tất cả hãng</option>
        <option v-for="brand in uniqueBrands" :key="brand" :value="brand">{{ brand }}</option>
      </CFormSelect>
      <CFormSelect v-model="filterType" @change="filterAndSortProducts" class="me-2">
        <option value="">Tất cả loại giày</option>
        <option v-for="type in uniqueTypes" :key="type" :value="type">{{ type }}</option>
      </CFormSelect>
      <CFormSelect v-model="filterColor" @change="filterAndSortProducts" class="me-2">
        <option value="">Tất cả màu sắc</option>
        <option v-for="color in uniqueColors" :key="color" :value="color">{{ color }}</option>
      </CFormSelect>
      <CFormSelect v-model="filterMaterial" @change="filterAndSortProducts" class="me-2">
        <option value="">Tất cả chất liệu</option>
        <option v-for="material in uniqueMaterials" :key="material" :value="material">{{ material }}</option>
      </CFormSelect>
      <CFormSelect v-model="filterSize" @change="filterAndSortProducts" class="me-2">
        <option value="">Tất cả kích cỡ</option>
        <option v-for="size in uniqueSizes" :key="size" :value="size">{{ size }}</option>
      </CFormSelect>
      <CFormSelect v-model="sortOrder" @change="filterAndSortProducts" class="me-2">
        <option value="">Sắp xếp</option>
        <option value="price-asc">Giá: Thấp đến Cao</option>
        <option value="price-desc">Giá: Cao đến Thấp</option>
        <option value="name-asc">Tên: A-Z</option>
        <option value="name-desc">Tên: Z-A</option>
      </CFormSelect>
    </div>

    <div class="mb-3 d-flex gap-2 flex-wrap"> <CButton :style="{ backgroundColor: '#006400', borderColor: '#006400', color: '#FFFFFF' }" @click="exportToExcel">
        <CIcon icon="cil-data-transfer-down" class="me-1" /> Xuất file Excel
      </CButton>
      <CButton :style="{ backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', color: '#000000' }" @click="refreshList">
        <CIcon icon="cil-loop" class="me-1" /> Làm mới
      </CButton>
      <CButton :style="{ backgroundColor: '#8B0000', borderColor: '#8B0000', color: '#FFFFFF' }" @click="showAddProductDetailModal = true">
        <CIcon icon="cil-plus" class="me-1" /> Thêm chi tiết sản phẩm
      </CButton>
    </div>

    <div class="table-container">
      <table class="custom-table">
        <thead>
          <tr>
            <th class="text-center">#</th>
            <th class="text-center">Ảnh sản phẩm</th>
            <th>Tên sản phẩm</th>
            <th>Hãng</th>
            <th>Loại giày</th>
            <th>Màu sắc</th>
            <th>Chất liệu</th>
            <th>Kích cỡ</th>
            <th class="text-end">Số lượng</th>
            <th class="text-end">Giá</th>
            <th class="text-center status-cell">Trạng thái</th>
            <th class="text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in paginatedProducts" :key="product.id"> <td class="text-center">{{ index + 1 + (currentPage - 1) * pageSize }}</td>
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
                {{ product.active ? 'Đang bán' : 'Hết hàng' }}
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
        Trước
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
        <CModalTitle :style="{ color: '#FFFFFF' }">Thêm chi tiết sản phẩm mới</CModalTitle>
        <CButtonClose @click="closeAddProductDetailModal" :style="{ color: '#FFFFFF' }" />
      </CModalHeader>
      <CModalBody>
        <CFormInput v-model="newProductDetail.parentProductId" label="ID Sản phẩm gốc" class="mb-3 custom-input" @blur="loadParentProductInfo" placeholder="Nhập ID sản phẩm đã tạo" />
        <CFormInput v-model="newProductDetail.name" label="Tên sản phẩm" class="mb-3 custom-input" disabled />
        <CFormInput v-model="newProductDetail.image" label="URL ảnh sản phẩm" class="mb-3 custom-input" disabled />

        <CFormInput v-model="newProductDetail.brand" label="Hãng" class="mb-3 custom-input" />
        <CFormInput v-model="newProductDetail.type" label="Loại giày" class="mb-3 custom-input" />
        <CFormInput v-model="newProductDetail.color" label="Màu sắc" class="mb-3 custom-input" />
        <CFormInput v-model="newProductDetail.material" label="Chất liệu" class="mb-3 custom-input" />
        <CFormInput v-model="newProductDetail.size" label="Kích cỡ" class="mb-3 custom-input" />
        <CFormInput type="number" v-model="newProductDetail.quantity" label="Số lượng" class="mb-3 custom-input" />
        <CFormInput type="number" v-model="newProductDetail.price" label="Giá" class="mb-3 custom-input" />
        <CFormCheck
          id="flexCheckDefaultDetail"
          label="Đang bán"
          v-model="newProductDetail.active"
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="closeAddProductDetailModal" :style="{ backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', color: '#000000' }">Hủy</CButton>
        <CButton color="primary" @click="addNewProductDetail" :style="{ backgroundColor: '#8B0000', borderColor: '#8B0000', color: '#FFFFFF' }">Thêm chi tiết</CButton>
      </CModalFooter>
    </CModal>

    <CModal :visible="showEditProductDetailModal" @close="showEditProductDetailModal = false">
      <CModalHeader :style="{ backgroundColor: '#000000', color: '#FFFFFF' }">
        <CModalTitle :style="{ color: '#FFFFFF' }">Sửa chi tiết sản phẩm</CModalTitle>
        <CButtonClose @click="showEditProductDetailModal = false" :style="{ color: '#FFFFFF' }" />
      </CModalHeader>
      <CModalBody>
        <p>Nhập thông tin muốn sửa (Hãng, Loại giày, Màu sắc, Chất liệu, Kích cỡ, Giá, Số lượng).</p>
        <CFormInput v-model="editingProductDetail.name" label="Tên sản phẩm" class="mb-3 custom-input" disabled />
        <CFormInput v-model="editingProductDetail.image" label="URL ảnh sản phẩm" class="mb-3 custom-input" disabled />
        <CFormInput v-model="editingProductDetail.brand" label="Hãng" class="mb-3 custom-input" />
        <CFormInput v-model="editingProductDetail.type" label="Loại giày" class="mb-3 custom-input" />
        <CFormInput v-model="editingProductDetail.color" label="Màu sắc" class="mb-3 custom-input" />
        <CFormInput v-model="editingProductDetail.material" label="Chất liệu" class="mb-3 custom-input" />
        <CFormInput v-model="editingProductDetail.size" label="Kích cỡ" class="mb-3 custom-input" />
        <CFormInput type="number" v-model="editingProductDetail.quantity" label="Số lượng" class="mb-3 custom-input" />
        <CFormInput type="number" v-model="editingProductDetail.price" label="Giá" class="mb-3 custom-input" />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="showEditProductDetailModal = false" :style="{ backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', color: '#000000' }">Hủy</CButton>
        <CButton color="primary" @click="saveEditedProductDetail" :style="{ backgroundColor: '#8B0000', borderColor: '#8B0000', color: '#FFFFFF' }">Xác nhận</CButton>
      </CModalFooter>
    </CModal>
  </div>
</template>

<script>
import { CIcon } from '@coreui/icons-vue';
import * as icon from '@coreui/icons';
import * as XLSX from 'xlsx';

export default {
  components: {
    CIcon
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
      originalProducts: [], // Đây là nơi lưu trữ tất cả các chi tiết sản phẩm (biến thể)
      products: [], // Mảng này sẽ chứa dữ liệu đã lọc và sắp xếp để hiển thị
      showEditProductDetailModal: false,
      editingProductDetail: {},
      editingProductDetailIndex: -1,
      showAddProductDetailModal: false,
      newProductDetail: {
        parentProductId: null, // ID của sản phẩm gốc
        id: null, // ID của biến thể này (sẽ được tạo tự động)
        image: '', // Ảnh sản phẩm gốc (tự động điền)
        name: '', // Tên sản phẩm gốc (tự động điền)
        brand: '', type: '', color: '', material: '', size: '', quantity: 0, price: 0, active: true
      },
      // Mảng giả định cho các sản phẩm gốc (được lấy từ Products.vue hoặc API)
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
        // Dữ liệu mẫu với ID cho mỗi chi tiết sản phẩm và productId liên kết
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
    // Phương thức để điền thông tin sản phẩm gốc khi nhập ID
    loadParentProductInfo() {
      const parentProductId = parseInt(this.newProductDetail.parentProductId, 10);
      const parentProduct = this.parentProducts.find(p => p.id === parentProductId);

      if (parentProduct) {
        this.newProductDetail.name = parentProduct.name;
        this.newProductDetail.image = parentProduct.image;
      } else {
        this.newProductDetail.name = '';
        this.newProductDetail.image = '';
        if (this.newProductDetail.parentProductId) { // Chỉ thông báo nếu người dùng đã nhập gì đó
            alert('Không tìm thấy sản phẩm gốc với ID này. Vui lòng kiểm tra lại.');
        }
      }
    },
    addNewProductDetail() {
      if (!this.newProductDetail.parentProductId) {
        alert('Vui lòng nhập ID sản phẩm gốc.');
        return;
      }
      if (!this.newProductDetail.name) { // Kiểm tra xem tên sản phẩm đã được tự động điền chưa
        alert('ID sản phẩm gốc không hợp lệ hoặc chưa được tải thông tin.');
        return;
      }
      if (this.newProductDetail.quantity < 0 || this.newProductDetail.price < 0) {
        alert('Số lượng và giá phải lớn hơn hoặc bằng 0.');
        return;
      }
      if (this.newProductDetail.brand.trim() === '' || this.newProductDetail.type.trim() === '' ||
          this.newProductDetail.color.trim() === '' || this.newProductDetail.material.trim() === '' ||
          this.newProductDetail.size.trim() === '') {
          alert('Vui lòng điền đầy đủ thông tin chi tiết (Hãng, Loại giày, Màu sắc, Chất liệu, Kích cỡ).');
          return;
      }

      // Tạo một ID duy nhất cho biến thể mới
      const newDetailId = this.originalProducts.length > 0 ? Math.max(...this.originalProducts.map(p => p.id || 0)) + 1 : 1;

      const newDetail = {
        id: newDetailId,
        productId: parseInt(this.newProductDetail.parentProductId, 10), // Lưu productId
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
      
      this.originalProducts.unshift(newDetail); // Thêm vào đầu danh sách
      this.saveProducts();
      this.refreshList(); // Tải lại danh sách để áp dụng bộ lọc/sắp xếp
      this.closeAddProductDetailModal();
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
      const product = this.paginatedProducts[index]; // Lấy sản phẩm từ trang hiện tại
      product.active = event.target.checked;

      // Tìm và cập nhật sản phẩm trong originalProducts
      const originalIndex = this.originalProducts.findIndex(p => p.id === product.id);
      if (originalIndex !== -1) {
        this.originalProducts[originalIndex] = { ...product };
      }
      this.saveProducts();
    },
    openEditProductDetailModal(index) {
      this.editingProductDetailIndex = index; // Lưu index của sản phẩm trên trang hiện tại
      this.editingProductDetail = { ...this.paginatedProducts[index] }; // Tạo bản sao để chỉnh sửa
      this.showEditProductDetailModal = true;
    },
    saveEditedProductDetail() {
      if (this.editingProductDetailIndex !== -1) {
        const productInPaginated = this.paginatedProducts[this.editingProductDetailIndex];
        
        // Cập nhật các thuộc tính chi tiết từ editingProductDetail
        productInPaginated.brand = this.editingProductDetail.brand;
        productInPaginated.type = this.editingProductDetail.type;
        productInPaginated.color = this.editingProductDetail.color;
        productInPaginated.material = this.editingProductDetail.material;
        productInPaginated.size = this.editingProductDetail.size;
        productInPaginated.quantity = parseInt(this.editingProductDetail.quantity, 10);
        productInPaginated.price = parseFloat(this.editingProductDetail.price);

        // Tìm và cập nhật trong originalProducts (quan trọng để lưu trữ)
        const originalIndex = this.originalProducts.findIndex(p => p.id === productInPaginated.id);
        if (originalIndex !== -1) {
          this.originalProducts[originalIndex] = { ...productInPaginated };
        }
        this.saveProducts();
        this.showEditProductDetailModal = false;
        this.editingProductDetailIndex = -1;
        this.editingProductDetail = {};
        this.refreshList(); // Cập nhật lại danh sách hiển thị
      } else {
        alert('Có lỗi xảy ra khi lưu sản phẩm chi tiết.');
      }
    },
    deleteProductDetail(index) {
      const productToDelete = this.paginatedProducts[index];
      if (confirm(`Bạn có chắc muốn xóa chi tiết sản phẩm: ${productToDelete.name} - ${productToDelete.color} - ${productToDelete.size}?`)) {
        // Xóa khỏi originalProducts
        const originalIndex = this.originalProducts.findIndex(p => p.id === productToDelete.id);
        if (originalIndex !== -1) {
          this.originalProducts.splice(originalIndex, 1);
        }
        this.saveProducts(); // Lưu lại vào localStorage
        this.refreshList(); // Cập nhật lại danh sách hiển thị
      }
    },
    refreshList() {
      this.loadProducts(); // Tải lại dữ liệu gốc
      this.searchQuery = '';
      this.filterProduct = '';
      this.filterBrand = '';
      this.filterType = '';
      this.filterColor = '';
      this.filterMaterial = '';
      this.filterSize = '';
      this.sortOrder = '';
      this.currentPage = 1;
      this.filterAndSortProducts(); // Áp dụng lại các filter/sort (hiện tại là reset)
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
    exportToExcel() {
      const data = this.products.map(product => ({
        'Tên sản phẩm': product.name,
        'Hãng': product.brand,
        'Loại giày': product.type,
        'Màu sắc': product.color,
        'Chất liệu': product.material,
        'Kích cỡ': product.size,
        'Số lượng': product.quantity,
        'Giá': product.price,
        'Trạng thái': product.active ? 'Đang bán' : 'Hết hàng',
      }));

      const worksheet = XLSX.utils.json_to_sheet(data);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'ChiTietSanPham');
      XLSX.writeFile(workbook, 'ChiTietSanPham.xlsx');
    }
  },
  icons: {
    ...icon,
  },
};
</script>

<style scoped>
/* Giữ nguyên style từ Products-Detail.vue và thêm/sửa một số chi tiết */
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
  border-color: #ced4da !important; /* Màu xám */
  box-shadow: 0 0 0 0.25rem rgba(108, 117, 125, 0.25) !important; /* Màu xám nhạt */
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