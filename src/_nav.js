export default [
  {
    component: 'CNavItem',
    name: 'Thong Ke',
    to: '/dashboard',
    icon: 'cil-speedometer',
    badge: {
      color: 'primary',
      text: 'NEW',
    },
  },
  {
    component: 'CNavTitle',
    name: 'Theme',
  },
  {
    component: 'CNavItem',
    name: 'Ban Tai Quay',
    to: '/theme/typography',
    icon: 'cil-basket', // Changed from cil-pencil to cil-basket for better representation
  },
  {
    component: 'CNavTitle',
    name: 'Components',
  },
  {
    component: 'CNavGroup',
    name: 'Quan Ly Tai Quay',
    to: '/base',
    icon: 'cil-puzzle', // Kept cil-puzzle, as it can represent components/structure
    items: [
      {
        component: 'CNavItem',
        name: 'Accordion',
        to: '/base/accordion',
      },
      {
        component: 'CNavItem',
        name: 'Breadcrumbs',
        to: '/base/breadcrumbs',
      },
      {
        component: 'CNavItem',
        name: 'Cards',
        to: '/base/cards',
      },
      {
        component: 'CNavItem',
        name: 'Calendar',
        href: 'https://coreui.io/vue/docs/components/calendar.html',
        external: true,
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: 'CNavItem',
        name: 'Carousels',
        to: '/base/carousels',
      },
      {
        component: 'CNavItem',
        name: 'Collapses',
        to: '/base/collapses',
      },
      {
        component: 'CNavItem',
        name: 'List Groups',
        to: '/base/list-groups',
      },
      {
        component: 'CNavItem',
        name: 'Navs & Tabs',
        to: '/base/navs',
      },
      {
        component: 'CNavItem',
        name: 'Paginations',
        to: '/base/paginations',
      },
      {
        component: 'CNavItem',
        name: 'Placeholders',
        to: '/base/placeholders',
      },
      {
        component: 'CNavItem',
        name: 'Popovers',
        to: '/base/popovers',
      },
      {
        component: 'CNavItem',
        name: 'Progress',
        to: '/base/progress',
      },
      {
        component: 'CNavItem',
        name: 'Smart Pagination',
        href: 'https://coreui.io/vue/docs/components/smart-pagination.html',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: 'CNavItem',
        name: 'Smart Table',
        external: true,
        href: 'https://coreui.io/vue/docs/components/smart-table.html',
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      },
      {
        component: 'CNavItem',
        name: 'Spinners',
        to: '/base/spinners',
      },
      {
        component: 'CNavItem',
        name: 'Tables',
        to: '/base/tables',
      },
      {
        component: 'CNavItem',
        name: 'Tabs',
        to: '/base/tabs',
      },
      {
        component: 'CNavItem',
        name: 'Tooltips',
        to: '/base/tooltips',
      },
      {
        component: 'CNavItem',
        name: 'Virtual Scroller',
        href: 'https://coreui.io/vue/docs/components/virtual-scroller.html',
        external: true,
        badge: {
          color: 'danger',
          text: 'PRO',
        },
      }
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Quan Ly San Pham',
    to: '/products-manager',
    icon: 'cil-settings', // Changed from cil-sun to cil-settings for better representation of 'management'
    items: [
      {
        component: 'CNavItem',
        name: 'San Pham',
        icon: 'cil-layers', // Kept cil-layers, suitable for products
        to: '/products-manager/products-list',
      },
        {
        component: 'CNavItem',
        name: 'Thuoc Tinh',
        to: '/products-manager',
        icon: 'cil-notes', // Kept cil-notes, suitable for attributes
        items: [
      {
        component: 'CNavItem',
        name: 'Hang',
        to: '/products-manager',
      },
      {
        component: 'CNavItem',
         name: 'Chat Lieu',
        to: '/products-manager',
      },
      {
        component: 'CNavItem',
        name: 'Mau Sac',
        to: '/products-manager',
      },
      {
        component: 'CNavItem',
        name: 'Kich Co',
        to: '/products-manager',
      },
      {
        component: 'CNavItem',
        name: 'Loai Giay',
        to: '/products-manager',
      },
      {
        component: 'CNavItem',
        name: 'Nha San Xuat',
         icon: 'cil-layers',
        to: '/products-manager',
      },
    ],
  },
    ],
  },
  {
    component: 'CNavItem',
    name: 'Hoa Don',
    to: '/charts',
    icon: 'cil-file', // Changed from cil-chart-pie to cil-file for better representation of 'invoice'
  },
  {
    component: 'CNavGroup',
    name: 'Phieu Giam Gia',
    to: '/discount-manager',
    icon: 'cil-star', // Kept cil-star, can represent special offers
    items: [
      {
        component: 'CNavItem',
        name: 'Dot Giam Gia',
        to: '/discount-manager/sales',
      },
      {
        component: 'CNavItem',
        name: 'Phieu Giam Gia',
        to: '/discount-manager/coupons', // Fixed path: changed from '/discount-manager/coupon' to '/discount-manager/coupons'
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Nhan Vien',
    to: '/notifications',
    icon: 'cil-people', // Changed from cil-bell to cil-people for better representation of 'employees'
    items: [

    ],
  },

  {
    component: 'CNavItem',
    name: 'Khach Hang',
    to: '/widgets',
    icon: 'cil-user', // Changed from cil-calculator to cil-user for better representation of 'customers'
    badge: {
      color: 'primary',
      text: 'NEW',
      shape: 'pill',
    },
  },
  {
    component: 'CNavTitle',
    name: 'Extras',
  },
  {
    component: 'CNavGroup',
    name: 'Nhan Vien',
    to: '/pages',
    icon: 'cil-star', // This 'Nhan Vien' group refers to 'Pages', so cil-star is acceptable here for 'extra' pages.
    items: [
      {
        component: 'CNavItem',
        name: 'Login',
        to: '/pages/login',
      },
      {
        component: 'CNavItem',
        name: 'Register',
        to: '/pages/register',
      },
      {
        component: 'CNavItem',
        name: 'Error 404',
        to: '/pages/404',
      },
      {
        component: 'CNavItem',
        name: 'Error 500',
        to: '/pages/500',
      },
    ],
  },
]