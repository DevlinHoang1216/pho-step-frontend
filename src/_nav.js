export default [
  {
    component: 'CNavItem',
    name: 'Thống Kê',
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
    name: 'Đợt Giảm Giá',
    to: '/theme/colors',
    icon: 'cil-drop',
  },
  {
    component: 'CNavItem',
    name: 'Bán Tại Quầy',
    to: '/theme/typography',
    icon: 'cil-pencil',
  },
  {
    component: 'CNavTitle',
    name: 'Components',
  },
  {
    component: 'CNavGroup',
    name: 'Quản Lý Tại Quầy',
    to: '/base',
    icon: 'cil-puzzle',
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
    name: 'Quản Lý Sản Phẩm',
    to: '/products-manager',
    icon: 'cil-sun',
    items: [
      {
        component: 'CNavItem',
        name: 'Sản Phẩm',
        icon: 'cil-layers',
        to: '/products-manager/products-list',
      },
        {
        component: 'CNavItem',
        name: 'Thuộc Tính',
        to: '/products-manager',
        icon: 'cil-notes',
        items: [
      {
        component: 'CNavItem',
        name: 'Hãng',
        to: '/products-manager',
      },
      {
        component: 'CNavItem',
         name: 'Chất Liệu',
        to: '/products-manager',
      },
      {
        component: 'CNavItem',
        name: 'Màu Sắc',
        to: '/products-manager',
      },
      {
        component: 'CNavItem',
        name: 'Kích Cỡ',
        to: '/products-manager',
      },
      {
        component: 'CNavItem',
        name: 'Loại Giày',
        to: '/products-manager',
      },
      {
        component: 'CNavItem',
        name: 'Nhà Sản Xuất',
         icon: 'cil-layers',
        to: '/products-manager',
      },
    ],
  },
    ],
    
  },

  {
    component: 'CNavItem',
    name: 'Hóa Đơn',
    to: '/charts',
    icon: 'cil-chart-pie',
  },
  {
    component: 'CNavGroup',
    name: 'Phiếu Giảm Giá',
    to: '/icons',
    icon: 'cil-star',
    items: [
      {
        component: 'CNavItem',
        name: 'CoreUI Icons',
        to: '/icons/coreui-icons',
        badge: {
          color: 'info',
          text: 'NEW',
        },
      },
      {
        component: 'CNavItem',
        name: 'Brands',
        to: '/icons/brands',
      },
      {
        component: 'CNavItem',
        name: 'Flags',
        to: '/icons/flags',
      },
    ],
  },
  {
    component: 'CNavGroup',
    name: 'Nhân Viên',
    to: '/notifications',
    icon: 'cil-bell',
    items: [

    ],
  },

  {
    component: 'CNavItem',
    name: 'Khách Hàng',
    to: '/widgets',
    icon: 'cil-calculator',
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
    name: 'Nhân Viên',
    to: '/pages',
    icon: 'cil-star',
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
