<template>
  <div class="container py-4">
    <h2 class="mb-4 fw-bold text-center" :style="{ color: '#000000' }">Thêm Sản Phẩm</h2>

    <CForm @submit.prevent="submitProduct">
      <CRow class="mb-4 justify-content-center">
        <CCol md="6" class="text-center">
          <div class="mb-4">
            <CFormLabel for="tenSanPham" class="fw-bold"
              >Tên Sản Phẩm <span class="text-danger">*</span></CFormLabel
            >
            <CFormInput
              id="tenSanPham"
              v-model="product.tenSanPham"
              placeholder="Nhập tên sản phẩm"
              required
              class="custom-input text-center"
              :class="{ 'is-invalid': !isTenSanPhamValid }"
              @blur="validateTenSanPham"
            />
          </div>
        </CCol>
      </CRow>
      <CRow class="mb-4 justify-content-center">
        <CCol md="6" class="text-center">
          <div class="mb-4">
            <CFormLabel for="moTaSanPham" class="fw-bold">Mô Tả Sản Phẩm</CFormLabel>
            <CFormTextarea
              id="moTaSanPham"
              v-model="product.moTaSanPham"
              rows="5"
              placeholder="Mô tả chi tiết về sản phẩm"
              class="custom-input text-center"
            />
          </div>
        </CCol>
      </CRow>

      <CRow class="mb-4">
        <CCol md="6">
          <div class="mb-4">
            <CFormLabel for="thuongHieu" class="fw-bold"
              >Thương Hiệu <span class="text-danger">*</span></CFormLabel
            >
            <CFormSelect
              id="thuongHieu"
              v-model="product.thuongHieu"
              required
              class="custom-input"
              :class="{ 'is-invalid': !isThuongHieuValid }"
            >
              <option value="">Vui lòng chọn thương hiệu</option>
              <option value="nike">Nike</option>
              <option value="adidas">Adidas</option>
              <option value="puma">Puma</option>
              <option value="converse">Converse</option>
              <option value="vans">Vans</option>
              <option value="newbalance">New Balance</option>
              <option value="underarmour">Under Armour</option>
              <option value="reebok">Reebok</option>
              <option value="asics">Asics</option>
              <option value="skechers">Skechers</option>
              <option value="jordan">Jordan</option>
              <option value="yeezy">Yeezy</option>
              <option value="balenciaga">Balenciaga</option>
              <option value="gucci">Gucci</option>
              <option value="louisvuitton">Louis Vuitton</option>
              <option value="offwhite">Off-White</option>
              <option value="fendi">Fendi</option>
              <option value="prada">Prada</option>
              <option value="versace">Versace</option>
              <option value="bape">Bape</option>
              <option value="supreme">Supreme</option>
              <option value="champion">Champion</option>
              <option value="diadora">Diadora</option>
              <option value="karhu">Karhu</option>
              <option value="mizuno">Mizuno</option>
            </CFormSelect>
          </div>
        </CCol>
        <CCol md="6">
          <div class="mb-4">
            <CFormLabel for="danhMuc" class="fw-bold"
              >Thể Loại (Danh mục của giày) <span class="text-danger">*</span></CFormLabel
            >
            <CFormSelect
              id="danhMuc"
              v-model="product.danhMuc"
              required
              class="custom-input"
              :class="{ 'is-invalid': !isDanhMucValid }"
            >
              <option value="">Vui lòng chọn thể loại</option>
              <option value="running">Running (Chạy bộ)</option>
              <option value="casual">Casual (Thường ngày)</option>
              <option value="basketball">Basketball (Bóng rổ)</option>
              <option value="training">Training (Tập luyện)</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="skateboarding">Skateboarding</option>
              <option value="hiking">Hiking (Đi bộ địa hình)</option>
              <option value="soccer">Soccer (Bóng đá)</option>
              <option value="fashion">Fashion (Thời trang cao cấp)</option>
              <option value="streetwear">Streetwear</option>
              <option value="retro">Retro</option>
              <option value="collabs">Collaborations (Hợp tác)</option>
              <option value="limitededition">Limited Edition</option>
              <option value="lowtop">Low-Top</option>
              <option value="hightop">High-Top</option>
              <option value="midtop">Mid-Top</option>
              <option value="slipon">Slip-On</option>
              <option value="platform">Platform</option>
              <option value="chunky">Chunky</option>
              <option value="vegan">Vegan</option>
              <option value="custom">Custom (Tùy chỉnh)</option>
            </CFormSelect>
          </div>
        </CCol>
      </CRow>

      <CRow class="mb-4">
        <CCol md="6">
          <div class="mb-4">
            <CFormLabel for="chatLieu" class="fw-bold"
              >Chất Liệu <span class="text-danger">*</span></CFormLabel
            >
            <CFormSelect
              id="chatLieu"
              v-model="product.chatLieu"
              required
              class="custom-input"
              :class="{ 'is-invalid': !isChatLieuValid }"
            >
              <option value="">Vui lòng chọn chất liệu</option>
              <option value="Da">Da</option>
              <option value="Vải">Vải</option>
              <option value="Cao su">Cao su</option>
              <option value="Tổng hợp">Tổng hợp</option>
            </CFormSelect>
          </div>
        </CCol>
        <CCol md="6">
          <div class="mb-4">
            <CFormLabel for="trangThai" class="fw-bold"
              >Trạng Thái <span class="text-danger">*</span></CFormLabel
            >
            <CFormSelect
              id="trangThai"
              v-model="product.trangThai"
              required
              class="custom-input"
            >
              <option value="">Vui lòng chọn trạng thái</option>
              <option value="dang_ban" selected>Đang bán</option>
              <option value="het_hang">Hết hàng</option>
            </CFormSelect>
          </div>
        </CCol>
      </CRow>

      <hr class="my-4" />

      <h3 class="mb-4 fw-bold">Chọn Màu Sắc và Kích Cỡ</h3>
      <CRow class="mb-4 align-items-end">
        <CCol md="6">
          <div class="mb-4">
            <CFormLabel class="fw-bold">Màu Sắc</CFormLabel>
            <div class="d-flex align-items-center">
              <div
                class="color-display-area border p-3 rounded me-3 d-flex flex-wrap"
                style="min-height: 50px; min-width: 250px"
              >
                <div
                  v-for="color in selectedColors"
                  :key="color"
                  :style="{
                    backgroundColor: color,
                    width: '30px',
                    height: '30px',
                    borderRadius: '5px',
                    margin: '5px',
                    border: '1px solid #ccc',
                  }"
                  :title="color"
                ></div>
              </div>
              <CButton
                :style="{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }"
                @click="showColorModal = true"
              >
                <CIcon icon="cil-plus" class="me-1" /> Chọn Màu Sắc
              </CButton>
            </div>
            <div v-if="!isSelectedColorsValid" class="text-warning mt-1">
              Vui lòng chọn ít nhất một màu sắc.
            </div>
          </div>
        </CCol>
        <CCol md="6">
          <div class="mb-4">
            <CFormLabel class="fw-bold">Kích Cỡ</CFormLabel>
            <div class="d-flex align-items-center">
              <div
                class="size-display-area border p-3 rounded me-3 d-flex flex-wrap"
                style="min-height: 50px; min-width: 250px; background-color: #f8f9fa"
              >
                <CBadge
                  v-for="size in selectedSizes"
                  :key="size"
                  class="me-2 mb-2 p-2"
                  :style="{ backgroundColor: '#000000', color: '#FFFFFF' }"
                  >{{ size }}</CBadge
                >
              </div>
              <CButton
                :style="{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }"
                @click="selectAllSizes"
              >
                <CIcon icon="cil-plus" class="me-1" /> Chọn Tất Cả Kích Cỡ
              </CButton>
            </div>
          </div>
        </CCol>
      </CRow>

      <hr class="my-4" />

      <h3 class="mb-4 fw-bold">Biến Thể Sản Phẩm</h3>
      <div
        v-if="productVariations.length === 0"
        class="alert alert-info p-3"
        style="border-left: 4px solid #000000; background-color: #f8f9fa"
      >
        Vui lòng chọn Màu Sắc và Kích Cỡ để tạo biến thể sản phẩm.
      </div>
      <div v-else class="table-responsive">
        <table class="table table-bordered table-striped custom-table">
          <thead>
            <tr>
              <th class="text-center">STT</th>
              <th class="text-center">Tên Sản Phẩm</th>
              <th class="text-center">Màu Sắc</th>
              <th class="text-center">Kích Cỡ</th>
              <th class="text-center">Số Lượng</th>
              <th class="text-center">Giá Bán</th>
              <th class="text-center">Ảnh</th>
              <th class="text-center">Hành Động</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(variation, index) in productVariations" :key="index">
              <td class="text-center">{{ index + 1 }}</td>
              <td>
                {{ product.tenSanPham }} ({{ variation.colorDisplayName }} - {{ variation.size }})
              </td>
              <td class="text-center">
                <div
                  :style="{
                    backgroundColor: variation.color,
                    width: '30px',
                    height: '30px',
                    borderRadius: '5px',
                    margin: 'auto',
                    border: '1px solid #ccc',
                  }"
                  :title="variation.color"
                ></div>
              </td>
              <td class="text-center">{{ variation.size }}</td>
              <td>
                <CFormInput
                  type="number"
                  v-model.number="variation.quantity"
                  min="0"
                  required
                  class="custom-input"
                  :class="{ 'is-invalid': !isQuantityValid(index) }"
                  @input="validateQuantity(index)"
                />
              </td>
              <td>
                <CFormInput
                  type="number"
                  v-model.number="variation.price"
                  min="0"
                  step="0.01"
                  required
                  class="custom-input"
                  :class="{ 'is-invalid': !isPriceValid(index) }"
                  @input="validatePrice(index)"
                />
              </td>
              <td class="text-center">
                <div class="image-preview-thumbnail-container d-flex flex-wrap gap-2">
                  <img
                    v-for="(img, imgIndex) in variation.images"
                    :key="imgIndex"
                    :src="img.url"
                    alt="Product Image"
                    class="img-thumbnail"
                    style="width: 50px; height: 50px; object-fit: cover"
                  />
                  <CIcon v-if="variation.images.length === 0" icon="cil-image" size="xl" class="text-secondary" />
                </div>
                <CButton
                  :style="{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }"
                  size="sm"
                  class="mt-2"
                  @click="openImageUploadModal(index)"
                  >Upload Ảnh</CButton
                >
                <div v-if="!isImagesValid(index)" class="text-warning mt-1">
                  Vui lòng tải lên ít nhất một ảnh.
                </div>
              </td>
              <td class="text-center">
                <CButton
                  :style="{ backgroundColor: '#8B0000', borderColor: '#8B0000', color: '#FFFFFF' }"
                  size="sm"
                  @click="removeVariation(index)"
                  >Xóa</CButton
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="d-flex justify-content-end mt-4">
        <CButton
          :style="{ backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', color: '#000000' }"
          class="me-2"
          @click="cancelAdd"
          >Hủy</CButton
        >
        <CButton
          type="submit"
          :style="{ backgroundColor: '#8B0000', borderColor: '#8B0000', color: '#FFFFFF' }"
          >Thêm Sản Phẩm</CButton
        >
      </div>
    </CForm>

    <CModal :visible="showColorModal" @close="closeColorModal" size="xl">
      <CModalHeader :style="{ backgroundColor: '#000000', color: '#FFFFFF' }">
        <CModalTitle :style="{ color: '#FFFFFF' }">Chọn Màu Sắc</CModalTitle>
        <CButtonClose @click="closeColorModal" :style="{ color: '#FFFFFF' }" />
      </CModalHeader>
      <CModalBody>
        <CRow>
          <CCol md="12">
            <div class="mb-4">
              <CFormLabel class="fw-bold">Chọn màu sắc</CFormLabel>
              <div class="d-flex flex-column flex-md-row gap-4">
                <div class="color-controls-left w-100 w-md-50 pe-3">
                  <div class="color-preview mb-3">
                    <div class="preview-box" :style="{ backgroundColor: currentColor.hex }"></div>
                  </div>
                  <div class="input-group mb-3">
                    <CFormInput
                      v-model="currentColor.hex"
                      @input="updateFromHex"
                      placeholder="HEX (e.g., #111B26)"
                      class="custom-input"
                    />
                    <CButton
                      :style="{
                        backgroundColor: '#000000',
                        borderColor: '#000000',
                        color: '#FFFFFF',
                      }"
                      @click="copyColor('hex')"
                    >
                      <CIcon icon="cil-copy" />
                    </CButton>
                  </div>
                  <div class="input-group mb-3">
                    <CFormSelect
                      v-model="selectedFormat"
                      @change="updateFormat"
                      class="custom-input me-2"
                      style="width: 100px"
                    >
                      <option value="rgb">RGB</option>
                      <option value="hsv">HSV</option>
                      <option value="hsl">HSL</option>
                      <option value="cmyk">CMYK</option>
                    </CFormSelect>
                    <CFormInput
                      v-model="formatValue"
                      @input="updateFromFormat"
                      :placeholder="getFormatPlaceholder()"
                      class="custom-input"
                    />
                    <CButton
                      :style="{
                        backgroundColor: '#000000',
                        borderColor: '#000000',
                        color: '#FFFFFF',
                      }"
                      @click="copyColor(selectedFormat)"
                    >
                      <CIcon icon="cil-copy" />
                    </CButton>
                  </div>
                  <div class="basic-colors mb-3">
                    <CFormLabel class="fw-bold">Basic Colors</CFormLabel>
                    <div class="d-flex flex-wrap gap-2 justify-content-center">
                      <div
                        v-for="color in basicColors"
                        :key="color"
                        :style="{
                          backgroundColor: color,
                          width: '30px',
                          height: '30px',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                        }"
                        @click="selectBasicColor(color)"
                        class="cursor-pointer"
                      ></div>
                    </div>
                  </div>
                  <div v-if="colorHistory.length > 0" class="color-history mt-3">
                    <CFormLabel class="fw-bold">Lịch sử màu tùy chỉnh</CFormLabel>
                    <div class="d-flex flex-wrap gap-2 justify-content-center bg-light p-2 rounded">
                      <div
                        v-for="(color, index) in colorHistory"
                        :key="index"
                        :style="{
                          backgroundColor: color,
                          width: '30px',
                          height: '30px',
                          borderRadius: '5px',
                          border: '1px solid #ccc',
                        }"
                        @click="selectCustomColor(color)"
                        class="cursor-pointer position-relative"
                      >
                        <CButton
                          :style="{
                            backgroundColor: '#8B0000',
                            borderColor: '#8B0000',
                            color: '#FFFFFF',
                          }"
                          size="sm"
                          class="remove-history-btn"
                          @click.stop="removeHistoryColor(index)"
                          >x</CButton
                        >
                      </div>
                    </div>
                  </div>
                </div>
                <div class="color-picker-right w-100 w-md-50 ps-3">
                  <div class="saturation-hue-container mb-3">
                    <div
                      class="saturation-area"
                      @mousedown="startDragging"
                      @mousemove="handleDrag"
                      @mouseup="stopDragging"
                      @mouseleave="stopDragging"
                      :style="{ '--hue': `${currentColor.hsv.h}deg` }"
                    >
                      <div class="saturation-white">
                        <div class="saturation-black"></div>
                        <div
                          class="saturation-pointer"
                          :style="{ left: saturationX + 'px', top: saturationY + 'px' }"
                        ></div>
                      </div>
                    </div>
                    <div class="hue-area">
                      <div
                        class="hue-slider"
                        @mousedown="startHueDragging"
                        @mousemove="handleHueDrag"
                        @mouseup="stopHueDragging"
                        @mouseleave="stopHueDragging"
                      >
                        <div class="hue-pointer" :style="{ top: hueY + 'px' }"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <CButton
                :style="{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }"
                @click="addSelectedColor"
                class="w-100 mt-3"
                >Thêm Màu</CButton
              >
              <div class="selected-colors mt-3">
                <CFormLabel class="fw-bold">Màu sắc đã chọn:</CFormLabel>
                <div
                  class="d-flex flex-wrap border p-3 rounded"
                  style="min-height: 100px; background-color: #f8f9fa"
                >
                  <div
                    v-for="(color, index) in selectedColors"
                    :key="index"
                    class="d-flex align-items-center me-3 mb-3 p-2 border rounded"
                  >
                    <div
                      :style="{
                        backgroundColor: color,
                        width: '25px',
                        height: '25px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                      }"
                      class="me-2"
                    ></div>
                    <span>{{ color }}</span>
                    <CButton
                      :style="{
                        backgroundColor: '#8B0000',
                        borderColor: '#8B0000',
                        color: '#FFFFFF',
                      }"
                      size="sm"
                      variant="ghost"
                      class="ms-2"
                      @click="removeSelectedColor(index)"
                      >x</CButton
                    >
                  </div>
                  <div v-if="selectedColors.length === 0" class="text-muted">
                    Chưa có màu nào được chọn.
                  </div>
                </div>
              </div>
            </div>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton
          :style="{ backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', color: '#000000' }"
          @click="closeColorModal"
          >Hủy</CButton
        >
        <CButton
          :style="{ backgroundColor: '#8B0000', borderColor: '#8B0000', color: '#FFFFFF' }"
          @click="confirmColors"
          >Xác nhận</CButton
        >
      </CModalFooter>
    </CModal>

    <CModal :visible="showSizeModal" @close="closeSizeModal" class="size-modal">
      <CModalHeader :style="{ backgroundColor: '#000000', color: '#FFFFFF' }">
        <CModalTitle :style="{ color: '#FFFFFF' }">Chọn Kích Cỡ</CModalTitle>
        <CButtonClose @click="closeSizeModal" :style="{ color: '#FFFFFF' }" />
      </CModalHeader>
      <CModalBody>
        <div class="size-selection-container">
          <CFormLabel class="fw-bold mb-3">Chọn kích cỡ</CFormLabel>
          <div class="size-grid mb-3">
            <CButton
              v-for="size in standardSizes"
              :key="size"
              :color="selectedSizes.includes(size) ? 'primary' : 'secondary'"
              variant="outline"
              :style="{
                backgroundColor: selectedSizes.includes(size) ? '#000000' : 'transparent',
                color: selectedSizes.includes(size) ? '#FFFFFF' : '#000000',
                borderColor: '#000000',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                padding: '0',
                fontWeight: 'bold',
                margin: '5px',
                transition: 'all 0.3s ease',
              }"
              @click="toggleSize(size)"
            >
              {{ size }}
            </CButton>
          </div>
          <CInputGroup class="mb-3">
            <CFormInput
              v-model="newSizeInput"
              placeholder="Nhập kích cỡ đặc biệt (ví dụ: 44.2, 36.7)"
              class="custom-input"
              @keyup.enter="addCustomSize"
            />
            <CButton
              :style="{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }"
              @click="addCustomSize"
            >
              Thêm
            </CButton>
          </CInputGroup>
          <div v-if="selectedSizes.length > 0" class="selected-sizes-preview">
            <CButton
              v-for="(size, index) in selectedSizes"
              :key="size"
              :style="{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                margin: '5px',
                padding: '0',
                fontWeight: 'bold',
                transition: 'all 0.3s ease',
              }"
              @click="removeSelectedSize(index)"
            >
              {{ size }}
            </CButton>
          </div>
          <div v-else class="text-muted">Chưa chọn kích cỡ nào.</div>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton
          :style="{ backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', color: '#000000' }"
          @click="closeSizeModal"
        >
          Hủy
        </CButton>
        <CButton
          :style="{ backgroundColor: '#8B0000', borderColor: '#8B0000', color: '#FFFFFF' }"
          @click="confirmSizes"
        >
          Xác nhận
        </CButton>
      </CModalFooter>
    </CModal>

    <CModal :visible="showImageUploadModal" @close="closeImageUploadModal" size="lg">
      <CModalHeader :style="{ backgroundColor: '#000000', color: '#FFFFFF' }">
        <CModalTitle :style="{ color: '#FFFFFF' }">Tải Ảnh Lên và Chọn Ảnh</CModalTitle>
        <CButtonClose @click="showImageUploadModal = false" :style="{ color: '#FFFFFF' }" />
      </CModalHeader>
      <CModalBody>
        <div class="mb-3">
          <CFormLabel class="fw-bold">Tải ảnh lên (Kéo thả hoặc chọn file)</CFormLabel>
          <input
            type="file"
            ref="fileInput"
            multiple
            @change="handleFileUpload"
            class="form-control mb-2 custom-input"
          />
          <CFormInput
            v-model="newImageUrl"
            placeholder="Hoặc nhập URL ảnh"
            @keyup.enter="addImageUrl"
            class="mb-2 custom-input"
          />
          <CButton
            :style="{ backgroundColor: '#000000', borderColor: '#000000', color: '#FFFFFF' }"
            @click="addImageUrl"
            >Thêm từ URL</CButton
          >
        </div>

        <div class="image-upload-preview border p-3 rounded mb-3" style="min-height: 200px">
          <h5 class="mb-3">Ảnh đã tải lên:</h5>
          <div v-if="uploadedImages.length === 0" class="text-muted">
            Chưa có ảnh nào được tải lên.
          </div>
          <div class="d-flex flex-wrap">
            <div
              v-for="(image, index) in uploadedImages"
              :key="index"
              class="image-item me-3 mb-3 border rounded p-2"
              :class="{ 'image-selected': image.selected }"
              @mouseover="image.hover = true"
              @mouseleave="image.hover = false"
              style="width: 120px; height: 120px; position: relative; cursor: pointer"
            >
              <img
                :src="image.url"
                alt="Uploaded Image"
                class="img-thumbnail"
                style="width: 100%; height: 100%; object-fit: cover"
              />
              <div class="image-checkbox-overlay" @click.stop="toggleImageSelection(index)">
                <input type="checkbox" :checked="image.selected" class="image-checkbox-input" />
              </div>
              <div v-if="image.selected && !image.hover" class="image-checkmark">
                <CIcon icon="cil-check-circle" size="xl" class="text-success" />
              </div>
              <div v-if="image.hover" class="image-actions">
                <CButton
                  :style="{
                    backgroundColor: 'rgba(139, 0, 0, 0.7)',
                    borderColor: 'rgba(139, 0, 0, 0.7)',
                    color: '#FFFFFF',
                  }"
                  size="sm"
                  @click.stop="removeUploadedImage(index)"
                >
                  <CIcon icon="cil-x" /> Xóa
                </CButton>
              </div>
            </div>
          </div>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton
          :style="{ backgroundColor: '#D3D3D3', borderColor: '#D3D3D3', color: '#000000' }"
          @click="closeImageUploadModal"
          >Hủy</CButton
        >
        <CButton
          :style="{ backgroundColor: '#8B0000', borderColor: '#8B0000', color: '#FFFFFF' }"
          @click="confirmImages"
          >Xác nhận Ảnh</CButton
        >
      </CModalFooter>
    </CModal>
  </div>
</template>

<script>
import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
  CFormSelect,
  CFormTextarea,
  CRow,
  CCol,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CInputGroup,
  CBadge,
} from '@coreui/vue';
import CIcon from '@coreui/icons-vue';
import { cilPlus, cilImage, cilCopy, cilCheckCircle, cilX, cilMinus } from '@coreui/icons';
import axios from 'axios';
import { inject } from 'vue';

export default {
  name: 'AddProductForm',
  components: {
    CButton,
    CForm,
    CFormInput,
    CFormLabel,
    CFormSelect,
    CFormTextarea,
    CRow,
    CCol,
    CModal,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    CInputGroup,
    CBadge,
    CIcon,
  },
  setup() {
    const toast = inject('$toast');
    return { toast };
  },
  data() {
    return {
      icons: { cilPlus, cilImage, cilCopy, cilCheckCircle, cilX, cilMinus },
      product: {
        tenSanPham: '',
        moTaSanPham: '',
        thuongHieu: '',
        chatLieu: '',
        danhMuc: '',
        trangThai: 'dang_ban',
      },
      danhMucs: [],

      showColorModal: false,
      currentColor: {
        hex: '#111B26',
        rgb: { r: 17, g: 27, b: 38 },
        hsv: { h: 210, s: 0.55, v: 0.15 },
        hsl: { h: 210, s: 0.39, l: 0.08 },
        cmyk: { c: 0.55, m: 0.29, y: 0, k: 0.85 },
      },
      saturationX: 165,
      saturationY: 165,
      hueY: 175,
      isDragging: false,
      isHueDragging: false,
      selectedColors: [],
      basicColors: [
        '#FF0000',
        '#0000FF',
        '#00FF00',
        '#FFFF00',
        '#000000',
        '#FFFFFF',
        '#808080',
        '#FFA500',
        '#800080',
        '#FFC0CB',
      ],
      colorHistory: [],

      showSizeModal: false,
      newSizeInput: '',
      selectedSizes: [],
      standardSizes: Array.from({ length: 9 }, (_, i) => 36 + i),

      productVariations: [],

      showImageUploadModal: false,
      currentVariationIndex: null,
      newImageUrl: '',
      uploadedImages: [],

      isTenSanPhamValid: true,
      isThuongHieuValid: true,
      isDanhMucValid: true,
      isChatLieuValid: true,
      isSelectedColorsValid: true,
    };
  },
  watch: {
    selectedColors(newValue) {
      this.validateSelectedColors();
      this.generateProductVariations();
    },
    selectedSizes: {
      handler(newValue) {
        this.generateProductVariations();
      },
      immediate: true,
    },
  },
  methods: {
    async fetchDanhMucs() {
      try {
        const response = await axios.get('');
        this.danhMucs = response.data;
      } catch (error) {
        console.error('Error fetching categories:', error);
        this.toast.error('Lỗi khi tải danh mục. Vui lòng thử lại.');
      }
    },

    startDragging(e) {
      this.isDragging = true;
      this.handleDrag(e);
    },
    stopDragging() {
      this.isDragging = false;
    },
    handleDrag(e) {
      if (!this.isDragging) return;
      const rect = e.target.getBoundingClientRect();
      this.saturationX = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
      this.saturationY = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
      this.updateColorFromSaturation();
    },
    startHueDragging(e) {
      this.isHueDragging = true;
      this.handleHueDrag(e);
    },
    stopHueDragging() {
      this.isHueDragging = false;
    },
    handleHueDrag(e) {
      if (!this.isHueDragging) return;
      const rect = e.target.getBoundingClientRect();
      this.hueY = Math.max(0, Math.min(e.clientY - rect.top, rect.height));
      this.updateColorFromHue();
    },
    updateColorFromSaturation() {
      const s = this.saturationX / 300;
      const v = 1 - this.saturationY / 300;
      this.currentColor.hsv.s = s;
      this.currentColor.hsv.v = v;
      this.updateRGBFromHSV();
      this.updateOtherFormats();
    },
    updateColorFromHue() {
      const h = (this.hueY / 300) * 360;
      this.currentColor.hsv.h = h;
      this.updateRGBFromHSV();
      this.updateOtherFormats();
    },
    updateRGBFromHSV() {
      let h = this.currentColor.hsv.h / 60;
      let s = this.currentColor.hsv.s;
      let v = this.currentColor.hsv.v;
      let hi = Math.floor(h) % 6;
      let f = h - Math.floor(h);
      let p = v * (1 - s);
      let q = v * (1 - f * s);
      let t = v * (1 - (1 - f) * s);
      let r, g, b;
      switch (hi) {
        case 0:
          r = v;
          g = t;
          b = p;
          break;
        case 1:
          r = q;
          g = v;
          b = p;
          break;
        case 2:
          r = p;
          g = v;
          b = t;
          break;
        case 3:
          r = p;
          g = q;
          b = v;
          break;
        case 4:
          r = t;
          g = p;
          b = v;
          break;
        case 5:
          r = v;
          g = p;
          b = q;
          break;
      }
      this.currentColor.rgb.r = Math.round(r * 255);
      this.currentColor.rgb.g = Math.round(g * 255);
      this.currentColor.rgb.b = Math.round(b * 255);
      this.currentColor.hex = `#${this.componentToHex(
        this.currentColor.rgb.r,
      )}${this.componentToHex(this.currentColor.rgb.g)}${this.componentToHex(
        this.currentColor.rgb.b,
      )}`.toUpperCase();
    },
    updateFromHex() {
      const hex = this.currentColor.hex.replace('#', '');
      if (/^[0-9A-Fa-f]{6}$/.test(hex)) {
        this.currentColor.rgb.r = parseInt(hex.substr(0, 2), 16);
        this.currentColor.rgb.g = parseInt(hex.substr(2, 2), 16);
        this.currentColor.rgb.b = parseInt(hex.substr(4, 2), 16);
        this.updateHSVFromRGB();
        this.updateOtherFormats();
      }
    },
    updateFromFormat() {
      const [r, g, b] = this.formatValue.split(',').map((n) => parseInt(n.trim()));
      if (
        this.selectedFormat === 'rgb' &&
        r >= 0 &&
        r <= 255 &&
        g >= 0 &&
        g <= 255 &&
        b >= 0 &&
        b <= 255
      ) {
        this.currentColor.rgb.r = r;
        this.currentColor.rgb.g = g;
        this.currentColor.rgb.b = b;
        this.updateHSVFromRGB();
      } else if (this.selectedFormat === 'hsv') {
        const [h, s, v] = this.formatValue
          .split(',')
          .map(
            (n) =>
              parseFloat(n.trim().replace('%', '')) / (this.selectedFormat === 'hsv' ? 100 : 1),
          );
        if (h >= 0 && h <= 360 && s >= 0 && s <= 1 && v >= 0 && v <= 1) {
          this.currentColor.hsv.h = h;
          this.currentColor.hsv.s = s;
          this.currentColor.hsv.v = v;
          this.updateRGBFromHSV();
        }
      } else if (this.selectedFormat === 'hsl') {
        const [h, s, l] = this.formatValue
          .split(',')
          .map(
            (n) =>
              parseFloat(n.trim().replace('%', '')) / (this.selectedFormat === 'hsl' ? 100 : 1),
          );
        if (h >= 0 && h <= 360 && s >= 0 && s <= 1 && l >= 0 && l <= 1) {
          this.currentColor.hsl.h = h;
          this.currentColor.hsl.s = s;
          this.currentColor.hsl.l = l;
          this.rgbFromHSL();
        }
      } else if (this.selectedFormat === 'cmyk') {
        const [c, m, y, k] = this.formatValue
          .split(',')
          .map((n) => parseFloat(n.trim().replace('%', '')) / 100);
        if (c >= 0 && c <= 1 && m >= 0 && m <= 1 && y >= 0 && y <= 1 && k >= 0 && k <= 1) {
          this.currentColor.cmyk.c = c;
          this.currentColor.cmyk.m = m;
          this.currentColor.cmyk.y = y;
          this.currentColor.cmyk.k = k;
          this.rgbFromCMYK();
        }
      }
      this.updateOtherFormats();
    },
    updateFormat() {
      this.updateFormatValue();
    },
    updateHSVFromRGB() {
      let r = this.currentColor.rgb.r / 255;
      let g = this.currentColor.rgb.g / 255;
      let b = this.currentColor.rgb.b / 255;
      let max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      let h,
        s,
        v = max;

      let d = max - min;
      s = max === 0 ? 0 : d / max;

      if (max === min) {
        h = 0;
      } else {
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      this.currentColor.hsv.h = h * 360;
      this.currentColor.hsv.s = s;
      this.currentColor.hsv.v = v;
      this.saturationX = this.currentColor.hsv.s * 300;
      this.saturationY = (1 - this.currentColor.hsv.v) * 300;
      this.hueY = (this.currentColor.hsv.h / 360) * 300;
    },
    rgbFromHSL() {
      let h = this.currentColor.hsl.h / 360;
      let s = this.currentColor.hsl.s;
      let l = this.currentColor.hsl.l;
      let r, g, b;

      if (s === 0) {
        r = g = b = l;
      } else {
        const hue2rgb = (p, q, t) => {
          if (t < 0) t += 1;
          if (t > 1) t -= 1;
          if (t < 1 / 6) return p + (q - p) * 6 * t;
          if (t < 1 / 2) return q;
          if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
          return p;
        };

        let q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        let p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
      }

      this.currentColor.rgb.r = Math.round(r * 255);
      this.currentColor.rgb.g = Math.round(g * 255);
      this.currentColor.rgb.b = Math.round(b * 255);
      this.currentColor.hex = `#${this.componentToHex(
        this.currentColor.rgb.r,
      )}${this.componentToHex(this.currentColor.rgb.g)}${this.componentToHex(
        this.currentColor.rgb.b,
      )}`.toUpperCase();
      this.updateHSVFromRGB();
    },
    rgbFromCMYK() {
      let c = this.currentColor.cmyk.c;
      let m = this.currentColor.cmyk.m;
      let y = this.currentColor.cmyk.y;
      let k = this.currentColor.cmyk.k;
      this.currentColor.rgb.r = Math.round(255 * (1 - c) * (1 - k));
      this.currentColor.rgb.g = Math.round(255 * (1 - m) * (1 - k));
      this.currentColor.rgb.b = Math.round(255 * (1 - y) * (1 - k));
      this.currentColor.hex = `#${this.componentToHex(
        this.currentColor.rgb.r,
      )}${this.componentToHex(this.currentColor.rgb.g)}${this.componentToHex(
        this.currentColor.rgb.b,
      )}`.toUpperCase();
      this.updateHSVFromRGB();
    },
    updateOtherFormats() {
      this.updateFormatValue();
      this.updateHSL();
      this.updateCMYK();
    },
    updateHSL() {
      let r = this.currentColor.rgb.r / 255;
      let g = this.currentColor.rgb.g / 255;
      let b = this.currentColor.rgb.b / 255;
      let max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      let h,
        s,
        l = (max + min) / 2;

      let d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      if (max === min) {
        h = 0;
      } else {
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }

      this.currentColor.hsl.h = h * 360;
      this.currentColor.hsl.s = s;
      this.currentColor.hsl.l = l;
    },
    updateCMYK() {
      let r = this.currentColor.rgb.r / 255;
      let g = this.currentColor.rgb.g / 255;
      let b = this.currentColor.rgb.b / 255;
      let k = 1 - Math.max(r, g, b);
      this.currentColor.cmyk.c = (1 - r - k) / (1 - k) || 0;
      this.currentColor.cmyk.m = (1 - g - k) / (1 - k) || 0;
      this.currentColor.cmyk.y = (1 - b - k) / (1 - k) || 0;
      this.currentColor.cmyk.k = k;
    },
    updateFormatValue() {
      if (this.selectedFormat === 'rgb') {
        this.formatValue = `${this.currentColor.rgb.r}, ${this.currentColor.rgb.g}, ${this.currentColor.rgb.b}`;
      } else if (this.selectedFormat === 'hsv') {
        this.formatValue = `${Math.round(this.currentColor.hsv.h)}, ${Math.round(
          this.currentColor.hsv.s * 100,
        )}%, ${Math.round(this.currentColor.hsv.v * 100)}%`;
      } else if (this.selectedFormat === 'hsl') {
        this.formatValue = `${Math.round(this.currentColor.hsl.h)}, ${Math.round(
          this.currentColor.hsl.s * 100,
        )}%, ${Math.round(this.currentColor.hsl.l * 100)}%`;
      } else if (this.selectedFormat === 'cmyk') {
        this.formatValue = `${Math.round(this.currentColor.cmyk.c * 100)}%, ${Math.round(
          this.currentColor.cmyk.m * 100,
        )}%, ${Math.round(this.currentColor.cmyk.y * 100)}%, ${Math.round(
          this.currentColor.cmyk.k * 100,
        )}%`;
      }
    },
    getFormatPlaceholder() {
      return this.selectedFormat === 'rgb'
        ? 'R, G, B'
        : this.selectedFormat === 'hsv'
        ? 'H, S%, V%'
        : this.selectedFormat === 'hsl'
        ? 'H, S%, L%'
        : 'C%, M%, Y%, K%';
    },
    componentToHex(c) {
      const hex = c.toString(16);
      return hex.length === 1 ? `0${hex}` : hex;
    },
    addSelectedColor() {
      const hexColor = this.currentColor.hex.toUpperCase();
      if (!this.selectedColors.includes(hexColor) && !this.basicColors.includes(hexColor)) {
        this.selectedColors.push(hexColor);
        if (
          !this.colorHistory.includes(hexColor) &&
          (this.currentColor.hex.match(/^#[0-9A-Fa-f]{6}$/) || this.formatValue)
        ) {
          this.colorHistory.push(hexColor);
          if (this.colorHistory.length > 10) this.colorHistory.shift();
        }
        this.toast.success('Đã thêm màu thành công!');
      } else {
        this.toast.warning('Màu đã tồn tại hoặc không hợp lệ!');
      }
    },
    selectBasicColor(color) {
      if (!this.selectedColors.includes(color)) {
        this.selectedColors.push(color);
        this.toast.success('Đã chọn màu cơ bản!');
      }
      this.currentColor.hex = color;
      this.updateFromHex();
    },
    selectCustomColor(color) {
      if (!this.selectedColors.includes(color)) {
        this.selectedColors.push(color);
        this.toast.success('Đã chọn màu tùy chỉnh!');
      }
      this.currentColor.hex = color;
      this.updateFromHex();
    },
    removeHistoryColor(index) {
      this.colorHistory.splice(index, 1);
      this.toast.success('Đã xóa màu khỏi lịch sử!');
    },
    copyColor(format) {
      let value = '';
      if (format === 'hex') value = this.currentColor.hex;
      else if (format === 'rgb')
        value = `${this.currentColor.rgb.r}, ${this.currentColor.rgb.g}, ${this.currentColor.rgb.b}`;
      else if (format === 'hsv')
        value = `${Math.round(this.currentColor.hsv.h)}, ${Math.round(
          this.currentColor.hsv.s * 100,
        )}%, ${Math.round(this.currentColor.hsv.v * 100)}%`;
      else if (format === 'hsl')
        value = `${Math.round(this.currentColor.hsl.h)}, ${Math.round(
          this.currentColor.hsl.s * 100,
        )}%, ${Math.round(this.currentColor.hsl.l * 100)}%`;
      else if (format === 'cmyk')
        value = `${Math.round(this.currentColor.cmyk.c * 100)}%, ${Math.round(
          this.currentColor.cmyk.m * 100,
        )}%, ${Math.round(this.currentColor.cmyk.y * 100)}%, ${Math.round(
          this.currentColor.cmyk.k * 100,
        )}%`;
      navigator.clipboard.writeText(value);
      this.toast.success('Mã màu đã được sao chép!');
    },
    removeSelectedColor(index) {
      this.selectedColors.splice(index, 1);
      this.validateSelectedColors();
      this.toast.success('Đã xóa màu đã chọn!');
    },
    closeColorModal() {
      this.currentColor = {
        hex: '#111B26',
        rgb: { r: 17, g: 27, b: 38 },
        hsv: { h: 210, s: 0.55, v: 0.15 },
        hsl: { h: 210, s: 0.39, l: 0.08 },
        cmyk: { c: 0.55, m: 0.29, y: 0, k: 0.85 },
      };
      this.saturationX = this.currentColor.hsv.s * 300;
      this.saturationY = (1 - this.currentColor.hsv.v) * 300;
      this.hueY = (this.currentColor.hsv.h / 360) * 300;
      this.showColorModal = false;
    },
    confirmColors() {
      this.showColorModal = false;
      this.validateSelectedColors();
      this.toast.success('Xác nhận màu sắc thành công!');
    },

    selectAllSizes() {
      this.selectedSizes = [...this.standardSizes];
      this.showSizeModal = true;
      this.toast.success('Đã chọn tất cả kích cỡ tiêu chuẩn!');
    },

    addCustomSize() {
      const sizeInput = this.newSizeInput.trim();
      if (sizeInput) {
        const newSize = parseFloat(sizeInput);
        if (
          !isNaN(newSize) &&
          !this.selectedSizes.includes(newSize) &&
          !this.standardSizes.includes(newSize)
        ) {
          this.selectedSizes.push(newSize);
          this.sortSizes();
          this.newSizeInput = '';
          this.toast.success('Thêm kích cỡ thành công!');
        } else {
          this.toast.warning('Kích cỡ không hợp lệ hoặc đã tồn tại.');
        }
      }
    },
    removeSelectedSize(index) {
      this.selectedSizes.splice(index, 1);
      this.sortSizes();
      this.toast.success('Đã xóa kích cỡ!');
    },
    closeSizeModal() {
      this.newSizeInput = '';
      this.showSizeModal = false;
    },
    confirmSizes() {
      this.selectedSizes = [...new Set(this.selectedSizes)].sort((a, b) => a - b);
      this.showSizeModal = false;
      this.toast.success('Xác nhận kích cỡ thành công!');
    },
    toggleSize(size) {
      const index = this.selectedSizes.indexOf(size);
      if (index > -1) {
        this.selectedSizes.splice(index, 1);
        this.toast.success('Đã bỏ chọn kích cỡ!');
      } else {
        this.selectedSizes.push(size);
        this.toast.success('Đã chọn kích cỡ!');
      }
      this.sortSizes();
    },
    sortSizes() {
      this.selectedSizes.sort((a, b) => a - b);
    },

    generateProductVariations() {
      const newVariations = [];
      const existingVariationsMap = new Map(
        this.productVariations.map((v) => [`${v.color}-${v.size}`, v]),
      );

      if (this.selectedColors.length > 0 && this.selectedSizes.length > 0) {
        this.selectedColors.forEach((color) => {
          this.selectedSizes.forEach((size) => {
            const key = `${color}-${size}`;
            if (existingVariationsMap.has(key)) {
              newVariations.push(existingVariationsMap.get(key));
            } else {
              newVariations.push({
                color: color,
                colorDisplayName: this.getColorName(color),
                size: size,
                quantity: 0,
                price: 0,
                images: [],
              });
            }
          });
        });
      }
      this.productVariations = newVariations;
    },
    removeVariation(index) {
      if (confirm('Bạn có chắc chắn muốn xóa biến thể này không?')) {
        this.productVariations.splice(index, 1);
        this.toast.success('Đã xóa biến thể!');
      }
    },
    getColorName(colorCode) {
      const commonColors = {
        '#FF0000': 'Đỏ',
        red: 'Đỏ',
        '#0000FF': 'Xanh Dương',
        blue: 'Xanh Dương',
        '#00FF00': 'Xanh Lá',
        green: 'Xanh Lá',
        '#FFFF00': 'Vàng',
        yellow: 'Vàng',
        '#000000': 'Đen',
        black: 'Đen',
        '#FFFFFF': 'Trắng',
        white: 'Trắng',
        '#808080': 'Xám',
        gray: 'Xám',
        '#A52A2A': 'Nâu',
        brown: 'Nâu',
        '#FFA500': 'Cam',
        orange: 'Cam',
        '#800080': 'Tím',
        purple: 'Tím',
        '#FFC0CB': 'Hồng',
        pink: 'Hồng',
        '#00FFFF': 'Xanh lam',
        cyan: 'Xanh lam',
        '#7B68EE': 'Xanh đá',
        mediumslateblue: 'Xanh đá',
        '#F5DEB3': 'Kem',
        wheat: 'Kem',
        '#4CE457': 'Xanh Lá Cây Neon',
        '#111B26': 'Xanh Đen',
      };
      return commonColors[colorCode.toUpperCase()] || colorCode;
    },

    openImageUploadModal(variationIndex) {
      if (variationIndex >= 0 && variationIndex < this.productVariations.length) {
        this.currentVariationIndex = variationIndex;
        const currentImages = this.productVariations[variationIndex].images || [];
        this.uploadedImages = this.uploadedImages.length
          ? this.uploadedImages.map((img) => ({
              ...img,
              selected: currentImages.some((ci) => ci.url === img.url),
              hover: false,
            }))
          : [];
        this.showImageUploadModal = true;
        this.toast.info('Đang mở modal upload ảnh!');
      } else {
        console.warn('Invalid variationIndex:', variationIndex);
      }
    },
    closeImageUploadModal() {
      this.showImageUploadModal = false;
      this.currentVariationIndex = null;
      this.newImageUrl = '';
      this.uploadedImages = this.uploadedImages.map((img) => ({
        ...img,
        selected: false,
        hover: false,
      }));
      this.toast.info('Đã đóng modal upload ảnh!');
    },
    handleFileUpload(event) {
      const files = Array.from(event.target.files);
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (!this.uploadedImages.some((img) => img.url === e.target.result)) {
            this.uploadedImages.push({ url: e.target.result, selected: false, hover: false });
            this.toast.success('Đã tải ảnh lên thành công!');
          } else {
            this.toast.warning('Ảnh đã tồn tại trong danh sách!');
          }
        };
        reader.readAsDataURL(file);
      });
      this.$refs.fileInput.value = '';
    },
    addImageUrl() {
      const url = this.newImageUrl.trim();
      if (url) {
        try {
          new URL(url);
          if (!this.uploadedImages.some((img) => img.url === url)) {
            this.uploadedImages.push({ url: url, selected: false, hover: false });
            this.newImageUrl = '';
            this.toast.success('Đã thêm ảnh từ URL!');
          } else {
            this.toast.warning('Ảnh với URL này đã tồn tại.');
          }
        } catch (e) {
          this.toast.warning('URL ảnh không hợp lệ.');
        }
      }
    },
    toggleImageSelection(index) {
      this.uploadedImages = this.uploadedImages.map((img, i) => ({
        ...img,
        selected: i === index ? !img.selected : img.selected,
      }));
      this.toast.success('Đã cập nhật lựa chọn ảnh!');
    },
    removeUploadedImage(index) {
      if (confirm('Bạn có chắc chắn muốn xóa ảnh này khỏi danh sách không?')) {
        const removedImageUrl = this.uploadedImages[index].url;
        this.uploadedImages.splice(index, 1);

        this.productVariations.forEach((variation) => {
          if (variation.images) {
            variation.images = variation.images.filter((img) => img.url !== removedImageUrl);
          }
        });
        this.toast.success('Đã xóa ảnh!');
      }
    },
    confirmImages() {
      if (this.currentVariationIndex !== null && this.currentVariationIndex >= 0 && this.currentVariationIndex < this.productVariations.length) {
        const selectedImages = this.uploadedImages.filter((img) => img.selected);
        const currentVariation = this.productVariations[this.currentVariationIndex];
        const currentColor = currentVariation.color;

        if (selectedImages.length > 0) {
          currentVariation.images = selectedImages.map((img) => ({ url: img.url }));

          this.productVariations.forEach((variation, index) => {
            if (index !== this.currentVariationIndex && variation.color === currentColor) {
              variation.images = selectedImages.map((img) => ({ url: img.url }));
            }
          });

          this.toast.success(`Đã cập nhật ảnh cho biến thể màu ${currentVariation.colorDisplayName}, kích cỡ ${currentVariation.size}.`);
        } else {
          this.toast.warning('Vui lòng chọn ít nhất một ảnh cho biến thể.');
        }
      } else {
        this.toast.warning('Có lỗi xảy ra khi chọn ảnh biến thể. Vui lòng thử lại.');
      }
      this.closeImageUploadModal();
    },
async submitProduct() {
  this.validateTenSanPham();
  this.validateThuongHieu();
  this.validateDanhMuc();
  this.validateChatLieu();
  this.validateSelectedColors();

  if (
    !this.isTenSanPhamValid ||
    !this.isThuongHieuValid ||
    !this.isDanhMucValid ||
    !this.isChatLieuValid ||
    !this.isSelectedColorsValid
  ) {
    this.toast.warning('Vui lòng kiểm tra các trường bắt buộc.');
    return;
  }

  if (this.productVariations.length === 0) {
    this.toast.warning('Vui lòng thêm ít nhất một biến thể sản phẩm (chọn màu sắc và kích cỡ).');
    return;
  }

  for (let i = 0; i < this.productVariations.length; i++) {
    this.validateQuantity(i);
    this.validatePrice(i);
    this.validateImages(i);

    if (!this.isQuantityValid(i) || !this.isPriceValid(i) || !this.isImagesValid(i)) {
      this.toast.warning(`Vui lòng kiểm tra biến thể tại dòng ${i + 1}.`);
      return;
    }
  }

  // Tính tổng số lượng từ các biến thể
  const totalQuantity = this.productVariations.reduce((sum, v) => sum + v.quantity, 0);

  // Tạo ID duy nhất cho sản phẩm chính
  const storedProducts = JSON.parse(localStorage.getItem('productsData') || '[]');
  const newProductId = storedProducts.length > 0 ? Math.max(...storedProducts.map(p => p.id || 0)) + 1 : 101;

  // Tạo đối tượng sản phẩm chính
  const productData = {
    id: newProductId,
    name: this.product.tenSanPham,
    image: this.productVariations[0]?.images[0]?.url || 'https://via.placeholder.com/50',
    quantity: totalQuantity,
    active: this.product.trangThai === 'dang_ban',
  };

  // Lưu sản phẩm chính vào productsData
  storedProducts.push(productData);
  localStorage.setItem('productsData', JSON.stringify(storedProducts));

  // Tạo và lưu các biến thể sản phẩm vào productsDetailData
  const storedDetailProducts = JSON.parse(localStorage.getItem('productsDetailData') || '[]');
  const newDetailIdStart = storedDetailProducts.length > 0 ? Math.max(...storedDetailProducts.map(p => p.id || 0)) + 1 : 1;

  const productDetails = this.productVariations.map((v, index) => ({
    id: newDetailIdStart + index,
    productId: newProductId,
    image: v.images[0]?.url || 'https://via.placeholder.com/50',
    name: this.product.tenSanPham,
    brand: this.product.thuongHieu,
    type: this.product.danhMuc,
    color: this.getColorName(v.color),
    material: this.product.chatLieu,
    size: v.size.toString(),
    quantity: v.quantity,
    price: v.price,
    active: this.product.trangThai === 'dang_ban',
  }));

  storedDetailProducts.push(...productDetails);
  localStorage.setItem('productsDetailData', JSON.stringify(storedDetailProducts));

  this.toast.success('Thêm sản phẩm và các biến thể thành công!');
  this.$router.push({ name: 'Quan Ly San Pham' });
},
    cancelAdd() {
      if (
        confirm(
          'Bạn có chắc chắn muốn hủy bỏ việc thêm sản phẩm này không? Tất cả dữ liệu sẽ bị mất.',
        )
      ) {
        this.$router.push({ name: 'Quan Ly San Pham' });
        this.toast.info('Đã hủy thêm sản phẩm!');
      }
    },

    validateTenSanPham() {
      this.isTenSanPhamValid = this.product.tenSanPham.trim().length > 0;
      if (!this.isTenSanPhamValid) {
        this.toast.warning('Vui lòng nhập tên sản phẩm.');
      }
    },
    validateThuongHieu() {
      this.isThuongHieuValid = !!this.product.thuongHieu && this.product.thuongHieu !== '';
      if (!this.isThuongHieuValid) {
        this.toast.warning('Vui lòng chọn thương hiệu.');
      }
    },
    validateDanhMuc() {
      this.isDanhMucValid = !!this.product.danhMuc && this.product.danhMuc !== '';
      if (!this.isDanhMucValid) {
        this.toast.warning('Vui lòng chọn thể loại.');
      }
    },
    validateChatLieu() {
      this.isChatLieuValid = !!this.product.chatLieu && this.product.chatLieu !== '';
      if (!this.isChatLieuValid) {
        this.toast.warning('Vui lòng chọn chất liệu.');
      }
    },
    validateSelectedColors() {
      this.isSelectedColorsValid = this.selectedColors.length > 0;
      if (!this.isSelectedColorsValid) {
        this.toast.warning('Vui lòng chọn ít nhất một màu sắc.');
      }
    },
    validateQuantity(index) {
      const quantity = this.productVariations[index].quantity;
      this.productVariations[index].quantity = Math.max(0, quantity || 0);
      if (quantity < 0) {
        this.toast.warning(`Số lượng của biến thể tại dòng ${index + 1} phải lớn hơn hoặc bằng 0.`);
      }
    },
    validatePrice(index) {
      const price = this.productVariations[index].price;
      this.productVariations[index].price = Math.max(0, price || 0);
      if (price < 0) {
        this.toast.warning(`Giá bán của biến thể tại dòng ${index + 1} phải lớn hơn hoặc bằng 0.`);
      }
    },
    validateImages(index) {
      return this.productVariations[index].images.length > 0;
    },
    isQuantityValid(index) {
      return this.productVariations[index].quantity >= 0;
    },
    isPriceValid(index) {
      return this.productVariations[index].price >= 0;
    },
    isImagesValid(index) {
      return this.productVariations[index].images.length > 0;
    },
  },
  created() {
    this.fetchDanhMucs();
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding-bottom: 50px;
}

.fw-bold {
  font-weight: bold;
}

.custom-input {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.75rem 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  background-color: #ffffff;
  color: #000000;
}

.custom-input:focus {
  border-color: #000000;
  box-shadow: 0 0 0 0.25rem rgba(0, 0, 0, 0.25);
}

.custom-input.is-invalid {
  border-color: #ffc107;
  background-image: none;
}

.custom-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 0.9rem;
}

.custom-table th,
.custom-table td {
  border: 1px solid #dee2e6;
  padding: 1rem;
  text-align: left;
  vertical-align: middle;
}

.custom-table thead th {
  background-color: #000000;
  color: #ffffff;
  font-weight: bold;
}

.custom-table th.text-center,
.custom-table td.text-center {
  text-align: center;
  vertical-align: middle;
}

.color-display-area,
.size-display-area {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.75rem;
  min-height: 50px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  background-color: #f8f9fa;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.image-preview-thumbnail-container {
  display: inline-block;
  width: auto;
  height: 50px;
  border: 1px solid #ccc;
  border-radius: 5px;
  overflow: hidden;
  vertical-align: middle;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Custom Color Picker Styles */
.custom-color-picker {
  padding: 20px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.color-controls-left,
.color-picker-right {
  padding: 10px;
}

.color-preview {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.preview-box {
  width: 300px;
  height: 120px;
  border: 2px solid #000;
  border-radius: 8px;
}

.input-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.saturation-hue-container {
  display: flex;
  gap: 20px;
}

.saturation-area {
  position: relative;
  width: 300px;
  height: 300px;
  border-radius: 8px;
  overflow: hidden;
  background: linear-gradient(to right, #fff, rgba(255, 255, 255, 0)),
    linear-gradient(to top, #000, rgba(0, 0, 0, 0));
}

.saturation-white {
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, #fff, hsl(var(--hue), 100%, 50%));
}

.saturation-black {
  width: 100%;
  height: 100%;
  background: linear-gradient(to top, #000, transparent);
}

.saturation-pointer {
  position: absolute;
  width: 15px;
  height: 15px;
  border: 2px solid #fff;
  border-radius: 50%;
  box-shadow: 0 0 0 1px #000;
  transform: translate(-50%, -50%);
  cursor: pointer;
}

.hue-area {
  width: 30px;
  height: 300px;
  position: relative;
}

.hue-slider {
  position: relative;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to top,
    #ff0000 0%,
    #ffff00 17%,
    #00ff00 33%,
    #00ffff 50%,
    #0000ff 67%,
    #ff00ff 83%,
    #ff0000 100%
  );
  border-radius: 8px;
  cursor: ns-resize;
}

.hue-pointer {
  position: absolute;
  width: 100%;
  height: 4px;
  background: #fff;
  border: 2px solid #000;
  border-radius: 2px;
  transform: translateY(-50%);
  cursor: ns-resize;
}

.basic-colors {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
}

.basic-colors .cursor-pointer:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}

.color-history {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  justify-content: center;
}

.color-history .cursor-pointer:hover {
  transform: scale(1.1);
  transition: transform 0.2s ease;
}

.color-history .remove-history-btn {
  position: absolute;
  top: -5px;
  right: -5px;
  width: 15px;
  height: 15px;
  font-size: 0.6rem;
  padding: 0;
  border-radius: 50%;
}

.selected-colors {
  margin-top: 20px;
}

/* Style for Size Modal */
.size-modal .modal-content {
  border-radius: 10px;
  border: 1px solid #000000;
}

.size-selection-container {
  padding: 15px;
}

.size-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
}

.size-grid .btn {
  transition: all 0.3s ease;
}

.size-grid .btn:hover {
  transform: scale(1.1);
  background-color: #333333 !important;
  color: #ffffff !important;
  border-color: #333333 !important;
}

.selected-sizes-preview {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5px;
  padding: 10px;
  background-color: #f8f9fa;
  border-radius: 8px;
}

.selected-sizes-preview .btn:hover {
  background-color: #333333 !important;
  transform: scale(1.1);
}

/* NEW IMAGE UPLOAD STYLES (Adjusted for checkbox) */
.image-item {
  position: relative;
  width: 120px;
  height: 120px;
  border: 2px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  transition: border-color 0.2s ease;
}

.image-item:hover {
  border-color: #808080;
}

.image-item.image-selected {
  border-color: #000000;
}

.image-item.image-selected:hover {
  border-color: #000000;
}

.image-checkmark {
  position: absolute;
  top: 5px;
  right: 5px;
  color: #28a745;
  font-size: 1.5rem;
  background-color: rgba(255, 255, 255, 0.7);
  border-radius: 50%;
  padding: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

.image-actions {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s ease;
  z-index: 9;
}

.image-item:hover .image-actions {
  opacity: 1;
}

.image-actions .btn {
  margin: 5px 0;
  width: 80%;
  font-size: 0.8rem;
}

.image-checkbox-overlay {
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 11;
  cursor: pointer;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-checkbox-input {
  width: 20px;
  height: 20px;
  cursor: pointer;
  margin: 0;
  appearance: none;
  border: 2px solid #ccc;
  border-radius: 4px;
  background-color: #fff;
  transition: all 0.2s ease;
  position: relative;
}

.image-checkbox-input:checked {
  background-color: #000000;
  border-color: #000000;
}

.image-checkbox-input:checked::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 6px;
  width: 6px;
  height: 12px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
