<template>
  <transition name="fade">
    <div
      v-if="isVisible"
      :class="['notification', type, { 'notification-dismissible': dismissible }]"
      @click="dismissible ? hideNotification() : null"
    >
      <div class="notification-icon">
        <svg v-if="type === 'success'" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-2 15l-5-5 1.41-1.41 3.59 3.59 7.59-7.59L20 8.59 10 17z"/></svg>
        <svg v-else-if="type === 'error'" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.707 13.293a1 1 0 01-1.414 0L12 13.414l-2.293 2.293a1 1 0 01-1.414-1.414L10.586 12l-2.293-2.293a1 1 0 011.414-1.414L12 10.586l2.293-2.293a1 1 0 011.414 1.414L13.414 12l2.293 2.293a1 1 0 010 1.414z"/></svg>
        <svg v-else-if="type === 'warning'" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-.007 15.5a1 1 0 100-2 1 1 0 000 2zM12 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"/></svg>
        <svg v-else-if="type === 'info'" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-.007 15.5a1 1 0 100-2 1 1 0 000 2zM12 7a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"/></svg>
      </div>
      <div class="notification-content">
        <p class="notification-message">{{ message }}</p>
        <p v-if="detail" class="notification-detail">{{ detail }}</p>
      </div>
      <button v-if="dismissible" class="notification-close" @click.stop="hideNotification">&times;</button>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'NotificationComponent', // Đổi tên thành NotificationComponent để tránh trùng với thẻ HTML notification
  props: {
    isVisible: {
      type: Boolean,
      default: false,
    },
    message: {
      type: String,
      required: true,
    },
    detail: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'info', // success, error, warning, info
      validator: (value) => ['success', 'error', 'warning', 'info'].includes(value),
    },
    duration: {
      type: Number,
      default: 3000, // in milliseconds, 0 for sticky notification
    },
    dismissible: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['update:isVisible'], // Khai báo emit sự kiện

  watch: {
    isVisible(newValue) {
      if (newValue && this.duration > 0) {
        this.timeout = setTimeout(() => {
          this.hideNotification();
        }, this.duration);
      } else if (!newValue && this.timeout) {
        clearTimeout(this.timeout);
      }
    },
  },
  data() {
    return {
      timeout: null,
    };
  },
  methods: {
    hideNotification() {
      this.$emit('update:isVisible', false);
    },
  },
  beforeUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout);
    }
  },
};
</script>

<style scoped>
.notification {
  position: fixed;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: center;
  padding: 15px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  font-family: 'Arial', sans-serif;
  max-width: 400px;
  min-width: 280px;
  z-index: 1000;
  cursor: default; /* Default cursor for non-dismissible */
  animation: slideIn 0.3s ease-out forwards; /* Animation for showing */
}

.notification-dismissible {
  cursor: pointer; /* Pointer for dismissible notifications */
}

.notification-icon {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  margin-right: 15px;
}

.notification-icon svg {
  width: 100%;
  height: 100%;
}

.notification-content {
  flex-grow: 1;
}

.notification-message {
  font-weight: bold;
  margin: 0;
  line-height: 1.4;
  color: #333;
}

.notification-detail {
  font-size: 0.9em;
  color: #555;
  margin: 5px 0 0;
  line-height: 1.4;
}

.notification-close {
  background: none;
  border: none;
  font-size: 1.5em;
  cursor: pointer;
  color: #999;
  margin-left: 15px;
  padding: 0;
  line-height: 1;
  transition: color 0.2s ease;
}

.notification-close:hover {
  color: #333;
}

/* Type specific styles */
.notification.success {
  background-color: #e6ffed;
  border-left: 5px solid #28a745;
}
.notification.success .notification-icon svg {
  color: #28a745;
}
.notification.success .notification-message {
  color: #1e7e34;
}
.notification.success .notification-detail {
  color: #218838;
}

.notification.error {
  background-color: #ffe6e6;
  border-left: 5px solid #dc3545;
}
.notification.error .notification-icon svg {
  color: #dc3545;
}
.notification.error .notification-message {
  color: #b30000;
}
.notification.error .notification-detail {
  color: #c82333;
}

.notification.warning {
  background-color: #fff9e6;
  border-left: 5px solid #ffc107;
}
.notification.warning .notification-icon svg {
  color: #ffc107;
}
.notification.warning .notification-message {
  color: #856404;
}
.notification.warning .notification-detail {
  color: #d39e00;
}

.notification.info {
  background-color: #e6f7ff;
  border-left: 5px solid #007bff;
}
.notification.info .notification-icon svg {
  color: #007bff;
}
.notification.info .notification-message {
  color: #004085;
}
.notification.info .notification-detail {
  color: #0056b3;
}

/* Transitions */
.fade-enter-active, .fade-leave-active {
  transition: all 0.3s ease-out;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

@keyframes slideIn {
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}
</style>