// src/plugins/toast-plugin.js
import { reactive } from 'vue';

const toasts = reactive([]);

const addToast = (message, type = 'info', autohide = 5000) => {
  const id = Date.now() + Math.random();
  let colorClass = '';
  let iconName = '';

  switch (type) {
    case 'success':
      colorClass = 'toast-success';
      iconName = 'cilCheckCircle';
      break;
    case 'error':
    case 'danger':
    case 'validation':
      colorClass = 'toast-error';
      iconName = 'cilXCircle';
      break;
    case 'warning':
      colorClass = 'toast-warning';
      iconName = 'cilWarning';
      break;
    case 'info':
      colorClass = 'toast-info';
      iconName = 'cilInfo';
      break;
    default:
      colorClass = 'toast-info';
      iconName = 'cilInfo';
      break;
  }

  const newToast = {
    id,
    message,
    type,
    colorClass,
    iconName,
    autohide,
    visible: true,
  };

  toasts.push(newToast);

  if (autohide > 0) {
    setTimeout(() => {
      newToast.visible = false;
      setTimeout(() => removeToast(id), 300);
    }, autohide);
  }
};

const removeToast = (id) => {
  const index = toasts.findIndex(toast => toast.id === id);
  if (index !== -1) {
    toasts.splice(index, 1);
  }
};

export default {
  install: (app) => {
    app.config.globalProperties.$toast = {
      show: addToast,
      success: (message, autohide = 5000) => addToast(message, 'success', autohide),
      error: (message, autohide = 5000) => addToast(message, 'error', autohide),
      danger: (message, autohide = 5000) => addToast(message, 'danger', autohide),
      validation: (message, autohide = 5000) => addToast(message, 'validation', autohide),
      warning: (message, autohide = 5000) => addToast(message, 'warning', autohide),
      info: (message, autohide = 5000) => addToast(message, 'info', autohide),
    };

    app.provide('$toast', app.config.globalProperties.$toast);
    app.provide('globalToasts', toasts);
    app.provide('removeGlobalToast', removeToast);
  },
};