<template>
  <CToaster placement="top-end" class="p-3">
    <CToast
      v-for="toast in globalToasts"
      :key="toast.id"
      :autohide="false"
      :visible="toast.visible"
      :class="['custom-toast', toast.colorClass]"
      @hidden="removeGlobalToast(toast.id)"
    >
      <div class="toast-content">
        <div class="column">
          <CIcon :icon="icons[toast.iconName]" class="toast-icon me-2" />
          <CToastBody class="toast-text flex-grow-1">
            {{ toast.message }}
          </CToastBody>
        </div>
        <CToastClose class="toast-close-btn" @click="removeGlobalToast(toast.id)" />
      </div>
      <div class="progress-bar-wrapper" v-if="toast.autohide > 0">
        <div
          class="progress-bar"
          :style="{ animationDuration: toast.autohide + 'ms' }"
        ></div>
      </div>
    </CToast>
  </CToaster>
</template>

<script>
import { CToaster, CToast, CToastBody, CToastClose } from '@coreui/vue';
import { inject } from 'vue';
import { CIcon } from '@coreui/icons-vue';
import * as icons from '@coreui/icons';

export default {
  name: 'GlobalToastContainer',
  components: {
    CToaster,
    CToast,
    CToastBody,
    CToastClose,
    CIcon,
  },
  setup() {
    const globalToasts = inject('globalToasts');
    const removeGlobalToast = inject('removeGlobalToast');

    return {
      globalToasts,
      removeGlobalToast,
      icons,
    };
  },
};
</script>

<style scoped>
.custom-toast {
  width: 400px;
  border-radius: 8px;
  overflow: hidden;
  background: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  padding: 0;
  margin-bottom: 10px;
  border-left: 5px solid transparent;
  position: relative;
}

.toast-content {
  display: flex;
  align-items: center;
  padding: 16px;
  width: 100%;
}

.column {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.toast-icon {
  font-size: 1.5rem;
}

.toast-text {
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  color: #333;
  padding: 0;
  line-height: 1.3;
}

.toast-close-btn {
  cursor: pointer;
  color: #7f8c8d;
  font-size: 1.2rem;
  transition: color 0.3s ease;
}
.toast-close-btn:hover {
  color: #34495e;
}

.progress-bar-wrapper {
  width: 100%;
  height: 4px;
  background: #f0f0f0;
  margin-top: 8px;
}

.progress-bar {
  height: 100%;
  width: 100%;
  animation: progress linear forwards;
}

@keyframes progress {
  0% { width: 100%; }
  100% { width: 0%; }
}

.toast-success {
  border-left-color: #2ecc71;
}
.toast-success .toast-icon {
  color: #2ecc71;
}
.toast-success .progress-bar {
  background: #2ecc71;
}

.toast-error {
  border-left-color: #e74c3c;
}
.toast-error .toast-icon {
  color: #e74c3c;
}
.toast-error .progress-bar {
  background: #e74c3c;
}

.toast-warning {
  border-left-color: #f1c40f;
}
.toast-warning .toast-icon {
  color: #f1c40f;
}
.toast-warning .progress-bar {
  background: #f1c40f;
}

.toast-info {
  border-left-color: #3498db;
}
.toast-info .toast-icon {
  color: #3498db;
}
.toast-info .progress-bar {
  background: #3498db;
}

@media (max-width: 530px) {
  .custom-toast {
    width: 100%;
    margin-left: 20px;
  }
}
</style>