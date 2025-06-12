<template>
  <div class="container py-4">
    <h2 class="mb-4 fw-bold" :style="{ color: '#000000' }">Quản Lý Sản Phẩm</h2>

    <CInputGroup class="mb-3">
      <CFormInput v-model="searchQuery" placeholder="Nhập vào tên sản phẩm muốn tìm..." @keyup.enter="searchProducts" class="custom-input"/>
      <CButton :style="{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }" @click="searchProducts">Tìm kiếm</CButton>
    </CInputGroup>

    <div class="mb-3">
      <CButton :style="{ backgroundColor: '#8B0000', borderColor: '#8B0000', color: '#FFFFFF' }" class="me-2" @click="showAddProductModal = true">+ Thêm sản phẩm</CButton>
      <CButton :style="{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }" class="me-2" @click="viewDetails">Xem chi tiết sản phẩm</CButton>
      <CButton :style="{ backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', color: '#000000' }" @click="refreshList">Làm mới</CButton>
    </div>

    <div class="table-container">
      <table class="custom-table">
        <thead>
          <tr>
            <th class="text-center">STT</th>
            <th class="text-center">Ảnh</th>
            <th>Tên sản phẩm</th>
            <th class="text-end">Số lượng</th>
            <th class="text-center status-cell">Trạng thái</th>
            <th class="text-center">Thao tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(product, index) in paginatedProducts" :key="index">
            <td class="text-center">{{ index + 1 + (currentPage - 1) * pageSize }}</td>
            <td class="text-center">
              <img :src="product.image" alt="product image" width="50" class="rounded" />
            </td>
            <td>{{ product.name }}</td>
            <td class="text-end">{{ product.quantity }}</td>
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
              <CButton :style="{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }" variant="outline" size="sm" class="ms-2" @click="openEditProductModal(index)">
                <CIcon icon="cil-pencil" />
              </CButton>
              <CButton :style="{ backgroundColor: '#8B0000', borderColor: '#8B0000', color: '#FFFFFF' }" variant="outline" size="sm" class="ms-2" @click="deleteProduct(index)">
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

    <CModal :visible="showAddProductModal" @close="showAddProductModal = false">
      <CModalHeader :style="{ backgroundColor: '#000000', color: '#FFFFFF' }">
        <CModalTitle :style="{ color: '#FFFFFF' }">Thêm sản phẩm mới</CModalTitle>
        <CButtonClose @click="showAddProductModal = false" :style="{ color: '#FFFFFF' }" />
      </CModalHeader>
      <CModalBody>
        <CFormInput v-model="newProductName" placeholder="Tên sản phẩm mới" class="mb-3 custom-input" />
        <CFormInput v-model="newProductImage" placeholder="URL ảnh sản phẩm (ví dụ: https://example.com/image.jpg)" class="mb-3 custom-input" />
        <CFormInput type="number" v-model="newProductQuantity" placeholder="Số lượng" class="mb-3 custom-input" />
        <CFormCheck
          id="flexCheckDefault"
          label="Đang bán"
          v-model="newProductActive"
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="showAddProductModal = false" :style="{ backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', color: '#000000' }">Hủy</CButton>
        <CButton color="primary" @click="addNewProduct" :style="{ backgroundColor: '#8B0000', borderColor: '#8B0000', color: '#FFFFFF' }">Thêm sản phẩm</CButton>
      </CModalFooter>
    </CModal>

    <CModal :visible="showEditProductModal" @close="showEditProductModal = false">
      <CModalHeader :style="{ backgroundColor: '#000000', color: '#FFFFFF' }">
        <CModalTitle :style="{ color: '#FFFFFF' }">Sửa tên sản phẩm</CModalTitle>
        <CButtonClose @click="showEditProductModal = false" :style="{ color: '#FFFFFF' }" />
      </CModalHeader>
      <CModalBody>
        <p>Nhập thông tin muốn sửa.</p>
        <CFormInput v-model="editingProductName" placeholder="Tên sản phẩm" class="mb-3 custom-input" />
        <CFormInput v-model="editingProductImage" placeholder="URL ảnh sản phẩm (ví dụ: https://example.com/image.jpg)" class="mb-3 custom-input" />
        </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="showEditProductModal = false" :style="{ backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', color: '#000000' }">Hủy</CButton>
        <CButton color="primary" @click="saveEditedProduct" :style="{ backgroundColor: '#8B0000', borderColor: '#8B0000', color: '#FFFFFF' }">Xác nhận</CButton>
      </CModalFooter>
    </CModal>

  </div>
</template>

<script>
import { CIcon } from '@coreui/icons-vue';
import * as icon from '@coreui/icons';

export default {
  components: {
    CIcon
  },
  data() {
    return {
      searchQuery: '',
      currentPage: 1,
      pageSize: 10,
      originalProducts: [],
      products: [],
      showAddProductModal: false,
      newProductName: '',
      newProductImage: '',
      newProductQuantity: 0,
      newProductActive: true,
      showEditProductModal: false,
      editingProductName: '',
      editingProductImage: '',
      editingProductIndex: -1,
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
  },
  created() {
    this.loadProducts();
  },
  methods: {
    loadProducts() {
      const storedProducts = localStorage.getItem('productsData');
      if (storedProducts) {
        this.originalProducts = JSON.parse(storedProducts);
      } else {
        this.originalProducts = [
          { image: 'https://cdn.tgdd.vn/Products/Images/6535/268999/Slider/giay-nike-air-zoom-pegasus-40-black-wolf-grey-5.jpg', name: 'Nike Air Zoom Pegasus 40', quantity: 120, active: true },
          { image: 'https://static.nike.com/a/images/c_limit,w_592,f_auto/t_product_v1/3fa462b9-51ee-423f-8f4c-40b49f3aad91/air-force-1-07-shoes-Ry8nSw.png', name: 'Nike Air Force 1 ’07', quantity: 200, active: true },
          { image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/ultra-boost-5-damen-schuh-HL3280_21_standard.jpg', name: 'Adidas Ultra Boost', quantity: 185, active: true },
          { image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/stan-smith-shoes-BD7442_01_standard.jpg', name: 'Adidas Stan Smith', quantity: 160, active: false },
          { image: 'https://images.stockx.com/images/Air-Jordan-4-Industrial-Blue.jpg', name: 'Air Jordan 4 Industrial Blue', quantity: 80, active: true },
          { image: 'https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/samba-shoes-S76551_01_standard.jpg', name: 'Adidas Samba OG', quantity: 95, active: true },
          { image: 'https://images.stockx.com/images/Air-Jordan-1-Mid-Pine-Green.jpg', name: 'Air Jordan 1 Mid Pine Green', quantity: 70, active: false },
          { image: 'https://product.hstatic.net/200000265619/product/af1-low-white_9a4ae5a999584145ab05e7c4aeb7b9f5.jpg', name: 'Nike Air Force 1 Low White', quantity: 240, active: true },
          { image: 'https://ananas.vn/wp-content/uploads/Pro_A61072_1.jpg', name: 'Ananas Urbas Corluray Mix', quantity: 105, active: true },
          { image: 'https://ananas.vn/wp-content/uploads/Pro_A61082_1.jpg', name: 'Ananas Urbas SC Cream', quantity: 60, active: false },
          { image: 'https://ananas.vn/wp-content/uploads/Pro_A61063_1.jpg', name: 'Ananas Vintas Saigon', quantity: 125, active: true },
          { image: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/438/408/products/giay-mlb-bigball-chunky-boston-1.jpg', name: 'MLB Big Ball Chunky Boston', quantity: 75, active: true },
          { image: 'https://media.canifa.com/Simiconnector/products/giay-sneaker-nam-5.jpg', name: 'Canifa Sneaker Men 2024', quantity: 98, active: true },
          { image: 'https://product.hstatic.net/200000426229/product/giay-thoi-trang-nam-bitis-hunter-x2-men-dsmh09000cam-1_40c0be84933c4e1f8b2d2cb7ae93284c_grande.jpg', name: 'Biti’s Hunter X2', quantity: 138, active: true },
          { image: 'https://down-vn.img.susercontent.com/file/sg-11134201-23010-p39z8vtzghnvb1', name: 'Converse Chuck 70 Classic', quantity: 112, active: true },
          { image: 'https://cdn.tgdd.vn/Products/Images/9981/318284/giay-the-thao-nam-361-do-ds666010905-202307251146401373.jpg', name: '361 Độ Lifestyle 2024', quantity: 102, active: true },
          { image: 'https://giaygiare.vn/wp-content/uploads/2022/04/z3362700001143_e53a2b3795894f7451f7e4f89c0de812.jpg', name: 'Vans Old Skool Classic Black', quantity: 150, active: true },
          { image: 'https://bizweb.dktcdn.net/thumb/large/100/347/923/products/giay-thoi-trang-cho-nam-sneaker-zapas-nam-trang-04.jpg', name: 'Zapas Streetstyle White', quantity: 86, active: true },
          { image: 'https://cdn2.yame.vn/pimg/giay-the-thao-05-0020416/1696d7b3-3c83-b900-eec0-001af5e3d8b6.jpg', name: 'YaMe Urban Classic 05', quantity: 143, active: false },
          { image: 'https://ananas.vn/wp-content/uploads/Pro_A61057_1.jpg', name: 'Ananas Urbas Polar White', quantity: 111, active: true },
        ];
        localStorage.setItem('productsData', JSON.stringify(this.originalProducts));
      }
      this.products = [...this.originalProducts];
    },
    saveProducts() {
      localStorage.setItem('productsData', JSON.stringify(this.originalProducts));
    },
    searchProducts() {
      if (this.searchQuery.trim()) {
        this.products = this.originalProducts.filter((product) =>
          product.name.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        this.currentPage = 1;
      } else {
        this.refreshList();
      }
    },
    addNewProduct() {
      if (this.newProductName.trim()) {
        const newProduct = {
          image: this.newProductImage.trim() || 'https://via.placeholder.com/50',
          name: this.newProductName.trim(),
          quantity: parseInt(this.newProductQuantity, 10) || 0,
          active: this.newProductActive,
        };
        // Thêm sản phẩm mới vào đầu danh sách
        this.originalProducts.unshift(newProduct);
        this.saveProducts();

        // Đồng bộ dữ liệu sang Products-Detail.vue
        const storedDetailProducts = JSON.parse(localStorage.getItem('productsDetailData') || '[]');
        const newProductDetailEntry = {
          image: newProduct.image,
          name: newProduct.name,
          brand: 'Chưa cập nhật',
          type: 'Chưa cập nhật',
          color: 'Chưa cập nhật',
          material: 'Chưa cập nhật',
          size: 'Chưa cập nhật',
          quantity: newProduct.quantity,
          price: 0, // Giá mặc định, có thể cần sửa thủ công sau
          active: newProduct.active,
        };
        storedDetailProducts.unshift(newProductDetailEntry); // Thêm vào đầu danh sách chi tiết
        localStorage.setItem('productsDetailData', JSON.stringify(storedDetailProducts));

        this.refreshList();
        this.showAddProductModal = false;
        this.newProductName = '';
        this.newProductImage = '';
        this.newProductQuantity = 0;
        this.newProductActive = true;
      } else {
        alert('Tên sản phẩm không được để trống!');
      }
    },
    openEditProductModal(index) {
      this.editingProductIndex = (this.currentPage - 1) * this.pageSize + index;
      const productToEdit = this.products[this.editingProductIndex];
      this.editingProductName = productToEdit.name;
      this.editingProductImage = productToEdit.image;
      this.showEditProductModal = true;
    },
    saveEditedProduct() {
      if (this.editingProductName.trim() && this.editingProductIndex !== -1) {
        const product = this.products[this.editingProductIndex];
        const oldName = product.name; // Lưu tên cũ để tìm và cập nhật trong productsDetailData
        product.name = this.editingProductName.trim();
        product.image = this.editingProductImage.trim() || 'https://via.placeholder.com/50';

        const originalIndex = this.originalProducts.findIndex(p => p === product);
        if (originalIndex !== -1) {
          this.originalProducts[originalIndex] = { ...product };
        }
        this.saveProducts();

        // Cập nhật tên sản phẩm trong productsDetailData nếu tên cũ khớp
        const storedDetailProducts = JSON.parse(localStorage.getItem('productsDetailData') || '[]');
        const updatedDetailProducts = storedDetailProducts.map(detail => {
          if (detail.name === oldName) {
            return { ...detail, name: product.name, image: product.image };
          }
          return detail;
        });
        localStorage.setItem('productsDetailData', JSON.stringify(updatedDetailProducts));

        this.showEditProductModal = false;
        this.editingProductName = '';
        this.editingProductImage = '';
        this.editingProductIndex = -1;
      } else {
        alert('Tên sản phẩm không được để trống!');
      }
    },
    viewDetails() {
      this.$router.push({ name: 'Sản Phẩm Chi Tiết' });
    },
    refreshList() {
      this.loadProducts();
      this.searchQuery = '';
      this.currentPage = 1;
    },
    toggleStatus(index, event) {
      const globalIndex = (this.currentPage - 1) * this.pageSize + index;
      const product = this.products[globalIndex];
      product.active = event.target.checked;

      const originalIndex = this.originalProducts.findIndex(p => p === product);
      if (originalIndex !== -1) {
        this.originalProducts[originalIndex] = { ...product };
      }
      this.saveProducts();

      // Cập nhật trạng thái trong productsDetailData
      const storedDetailProducts = JSON.parse(localStorage.getItem('productsDetailData') || '[]');
      const updatedDetailProducts = storedDetailProducts.map(detail => {
        if (detail.name === product.name) {
          return { ...detail, active: product.active };
        }
        return detail;
      });
      localStorage.setItem('productsDetailData', JSON.stringify(updatedDetailProducts));
    },
    deleteProduct(index) {
      const globalIndex = (this.currentPage - 1) * this.pageSize + index;
      const productToDelete = this.products[globalIndex];

      if (confirm(`Bạn có chắc muốn xóa mềm sản phẩm: ${productToDelete.name}?`)) {
        // Xóa mềm: đặt active về false
        productToDelete.active = false;
        const originalIndex = this.originalProducts.findIndex(p => p === productToDelete);
        if (originalIndex !== -1) {
          this.originalProducts[originalIndex] = { ...productToDelete };
        }
        this.saveProducts();

        // Cập nhật trạng thái trong productsDetailData
        const storedDetailProducts = JSON.parse(localStorage.getItem('productsDetailData') || '[]');
        const updatedDetailProducts = storedDetailProducts.map(detail => {
          if (detail.name === productToDelete.name) {
            return { ...detail, active: false }; // Đặt trạng thái về hết hàng
          }
          return detail;
        });
        localStorage.setItem('productsDetailData', JSON.stringify(updatedDetailProducts));

        this.refreshList();
      }
    },
    changePage(page) {
      if (page >= 1 && page <= this.totalPages) {
        this.currentPage = page;
      }
    },
  },
  icons: {
    ...icon,
  },
};
</script>

<style scoped>
/* Giữ nguyên style từ Products.vue và thêm/sửa một số chi tiết */
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