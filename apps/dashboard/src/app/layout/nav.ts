/**
 * The sidebar's links: its sections and their screens.
 */

export type NavIcon =
  | 'modern'
  | 'analytics'
  | 'ecommerce'
  | 'saas'
  | 'school'
  | 'health'
  | 'ai'
  | 'calendar'
  | 'chats'
  | 'email'
  | 'contacts'
  | 'notes'
  | 'blog'
  | 'tickets'
  | 'invoice'
  | 'profile'
  | 'shop'
  | 'kanban'
  | 'customers'
  | 'orders'
  | 'table'
  | 'form'
  | 'settings'
  | 'faq'
  | 'pricing'
  | 'roles'
  | 'integrations'
  | 'ui'
  | 'form-layouts'
  | 'data-tables'
  | 'charts'
  | 'cards'
  | 'widget-charts'
  | 'icons'
  | 'error'
  | 'maintenance'
  | 'login'
  | 'register'
  | 'forgot'
  | 'two-steps';

export interface NavChild {
  readonly label: string;
  readonly url: string;
}

export interface NavLink {
  readonly label: string;
  readonly icon: NavIcon;
  /** A page of its own… */
  readonly url?: string;
  /** …or pages under it, in a submenu that opens on the pages under `base`. */
  readonly children?: readonly NavChild[];
  readonly base?: string;
}

export interface NavSection {
  readonly heading: string;
  readonly links: readonly NavLink[];
}

export const NAV: readonly NavSection[] = [
  {
    heading: $localize`:@@layout.nav.dashboards:Dashboards`,
    links: [
      {
        label: $localize`:@@layout.nav.modern:Modern`,
        url: '/',
        icon: 'modern',
      },
      {
        label: $localize`:@@layout.nav.analytics:Analytics`,
        url: '/dashboards/analytics',
        icon: 'analytics',
      },
      {
        label: $localize`:@@layout.nav.ecommerce:eCommerce`,
        url: '/dashboards/ecommerce',
        icon: 'ecommerce',
      },
      {
        label: $localize`:@@layout.nav.saasAi:SaaS + AI`,
        url: '/dashboards/saas-ai',
        icon: 'saas',
      },
      {
        label: $localize`:@@layout.nav.school:School`,
        url: '/dashboards/school',
        icon: 'school',
      },
      {
        label: $localize`:@@layout.nav.health:Health`,
        url: '/dashboards/health',
        icon: 'health',
      },
    ],
  },
  {
    heading: $localize`:@@layout.nav.apps:Apps`,
    links: [
      {
        label: $localize`:@@layout.nav.ai:AI`,
        icon: 'ai',
        base: '/apps/ai',
        children: [
          { label: $localize`:@@layout.nav.chat:Chat`, url: '/apps/ai/chat' },
          {
            label: $localize`:@@layout.nav.image:Image`,
            url: '/apps/ai/image',
          },
        ],
      },
      {
        label: $localize`:@@layout.nav.calendar:Calendar`,
        url: '/apps/calendar',
        icon: 'calendar',
      },
      {
        label: $localize`:@@layout.nav.chats:Chats`,
        url: '/apps/chats',
        icon: 'chats',
      },
      {
        label: $localize`:@@layout.nav.email:Email`,
        url: '/apps/email',
        icon: 'email',
      },
      {
        label: $localize`:@@layout.nav.contacts:Contacts`,
        url: '/apps/contacts',
        icon: 'contacts',
      },
      {
        label: $localize`:@@layout.nav.notes:Notes`,
        url: '/apps/notes',
        icon: 'notes',
      },
      {
        label: $localize`:@@layout.nav.blogs:Blogs`,
        icon: 'blog',
        base: '/apps/blog',
        children: [
          {
            label: $localize`:@@layout.nav.blogListing:Blog Listing`,
            url: '/apps/blog/post',
          },
          {
            label: $localize`:@@layout.nav.blogDetail:Blog Detail`,
            url: '/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',
          },
          {
            label: $localize`:@@layout.nav.blogEdit:Blog Edit`,
            url: '/apps/blog/edit/5',
          },
          {
            label: $localize`:@@layout.nav.blogCreate:Blog Create`,
            url: '/apps/blog/create',
          },
          {
            label: $localize`:@@layout.nav.manageBlog:Manage Blog`,
            url: '/apps/blog/manage-blog',
          },
        ],
      },
      {
        label: $localize`:@@layout.nav.tickets:Tickets`,
        url: '/apps/tickets',
        icon: 'tickets',
      },
      {
        label: $localize`:@@layout.nav.invoice:Invoice`,
        icon: 'invoice',
        base: '/apps/invoice',
        children: [
          {
            label: $localize`:@@layout.nav.list:List`,
            url: '/apps/invoice/list',
          },
          {
            label: $localize`:@@layout.nav.details:Details`,
            url: '/apps/invoice/detail/INV-1042',
          },
          {
            label: $localize`:@@layout.nav.create:Create`,
            url: '/apps/invoice/create',
          },
          {
            label: $localize`:@@layout.nav.edit:Edit`,
            url: '/apps/invoice/edit/INV-1042',
          },
        ],
      },
      {
        label: $localize`:@@layout.nav.userProfile:User Profile`,
        icon: 'profile',
        base: '/apps/user-profile',
        children: [
          {
            label: $localize`:@@layout.nav.profile:Profile`,
            url: '/apps/user-profile/profile',
          },
          {
            label: $localize`:@@layout.nav.followers:Followers`,
            url: '/apps/user-profile/followers',
          },
          {
            label: $localize`:@@layout.nav.friends:Friends`,
            url: '/apps/user-profile/friends',
          },
          {
            label: $localize`:@@layout.nav.gallery:Gallery`,
            url: '/apps/user-profile/gallery',
          },
        ],
      },
      {
        label: $localize`:@@layout.nav.ecommerce2:Ecommerce`,
        icon: 'shop',
        base: '/apps/ecommerce',
        children: [
          {
            label: $localize`:@@layout.nav.shop:Shop`,
            url: '/apps/ecommerce/shop',
          },
          {
            label: $localize`:@@layout.nav.details:Details`,
            url: '/apps/ecommerce/detail/3',
          },
          {
            label: $localize`:@@layout.nav.list:List`,
            url: '/apps/ecommerce/list',
          },
          {
            label: $localize`:@@layout.nav.checkout:Checkout`,
            url: '/apps/ecommerce/checkout',
          },
          {
            label: $localize`:@@layout.nav.addProduct:Add Product`,
            url: '/apps/ecommerce/add-product',
          },
          {
            label: $localize`:@@layout.nav.editProduct:Edit Product`,
            url: '/apps/ecommerce/edit-product/3',
          },
        ],
      },
      {
        label: $localize`:@@layout.nav.kanban:Kanban`,
        url: '/apps/kanban',
        icon: 'kanban',
      },
      {
        label: $localize`:@@layout.nav.customers:Customers`,
        url: '/apps/customers',
        icon: 'customers',
      },
      {
        label: $localize`:@@layout.nav.orders:Orders`,
        url: '/apps/orders',
        icon: 'orders',
      },
    ],
  },
  {
    heading: $localize`:@@layout.nav.pages:Pages`,
    links: [
      {
        label: $localize`:@@layout.nav.table:Table`,
        url: '/pages/tables',
        icon: 'table',
      },
      {
        label: $localize`:@@layout.nav.form:Form`,
        url: '/pages/form',
        icon: 'form',
      },
      {
        label: $localize`:@@layout.nav.userProfile:User Profile`,
        url: '/pages/user-profile',
        icon: 'profile',
      },
      {
        label: $localize`:@@layout.nav.accountSettings:Account Settings`,
        url: '/pages/account-settings',
        icon: 'settings',
      },
      { label: 'FAQ', url: '/pages/faq', icon: 'faq' },
      {
        label: $localize`:@@layout.nav.pricing:Pricing`,
        url: '/pages/pricing',
        icon: 'pricing',
      },
      {
        label: $localize`:@@layout.nav.rolesPermissions:Roles & Permissions`,
        url: '/pages/roles',
        icon: 'roles',
      },
      {
        label: $localize`:@@layout.nav.integrations:Integrations`,
        url: '/pages/integrations',
        icon: 'integrations',
      },
    ],
  },
  {
    heading: $localize`:@@layout.nav.uiElements:UI Elements`,
    links: [
      {
        label: $localize`:@@layout.nav.components:Components`,
        icon: 'ui',
        base: '/ui',
        children: [
          { label: $localize`:@@layout.nav.button:Button`, url: '/ui/button' },
          { label: $localize`:@@layout.nav.avatar:Avatar`, url: '/ui/avatar' },
          { label: $localize`:@@layout.nav.badge:Badge`, url: '/ui/badge' },
          {
            label: $localize`:@@layout.nav.tooltip:Tooltip`,
            url: '/ui/tooltip',
          },
          { label: $localize`:@@layout.nav.input:Input`, url: '/ui/input' },
          {
            label: $localize`:@@layout.nav.textarea:Textarea`,
            url: '/ui/textarea',
          },
          { label: $localize`:@@layout.nav.switch:Switch`, url: '/ui/switch' },
          { label: $localize`:@@layout.nav.tabs:Tabs`, url: '/ui/tabs' },
          { label: $localize`:@@layout.nav.select:Select`, url: '/ui/select' },
          {
            label: $localize`:@@layout.nav.checkbox:Checkbox`,
            url: '/ui/checkbox',
          },
          {
            label: $localize`:@@layout.nav.accordion:Accordion`,
            url: '/ui/accordion',
          },
          { label: $localize`:@@layout.nav.card:Card`, url: '/ui/card' },
          {
            label: $localize`:@@layout.nav.radioGroup:Radio Group`,
            url: '/ui/radio-group',
          },
          {
            label: $localize`:@@layout.nav.datePicker:Date Picker`,
            url: '/ui/date-picker',
          },
        ],
      },
    ],
  },
  {
    heading: $localize`:@@layout.nav.forms:Forms`,
    links: [
      {
        label: $localize`:@@layout.nav.formLayouts:Form Layouts`,
        icon: 'form-layouts',
        base: '/forms',
        children: [
          {
            label: $localize`:@@layout.nav.layouts:Layouts`,
            url: '/forms/layouts',
          },
          {
            label: $localize`:@@layout.nav.validation:Validation`,
            url: '/forms/validation',
          },
          {
            label: $localize`:@@layout.nav.examples:Examples`,
            url: '/forms/examples',
          },
          {
            label: $localize`:@@layout.nav.repeater:Repeater`,
            url: '/forms/repeater',
          },
          {
            label: $localize`:@@layout.nav.wizard:Wizard`,
            url: '/forms/wizard',
          },
        ],
      },
    ],
  },
  {
    heading: $localize`:@@layout.nav.tables:Tables`,
    links: [
      {
        label: $localize`:@@layout.nav.dataTables:Data Tables`,
        icon: 'data-tables',
        base: '/tables',
        children: [
          { label: $localize`:@@layout.nav.basic:Basic`, url: '/tables/basic' },
          { label: $localize`:@@layout.nav.dense:Dense`, url: '/tables/dense' },
          {
            label: $localize`:@@layout.nav.sorting:Sorting`,
            url: '/tables/sorting',
          },
          {
            label: $localize`:@@layout.nav.filtering:Filtering`,
            url: '/tables/filtering',
          },
          {
            label: $localize`:@@layout.nav.pagination:Pagination`,
            url: '/tables/pagination',
          },
          {
            label: $localize`:@@layout.nav.rowSelection:Row Selection`,
            url: '/tables/row-selection',
          },
          {
            label: $localize`:@@layout.nav.columnVisibility:Column Visibility`,
            url: '/tables/column-visibility',
          },
          {
            label: $localize`:@@layout.nav.editable:Editable`,
            url: '/tables/editable',
          },
          {
            label: $localize`:@@layout.nav.sticky:Sticky`,
            url: '/tables/sticky',
          },
          {
            label: $localize`:@@layout.nav.dragDrop:Drag & Drop`,
            url: '/tables/drag-drop',
          },
          { label: $localize`:@@layout.nav.empty:Empty`, url: '/tables/empty' },
          {
            label: $localize`:@@layout.nav.expanding:Expanding`,
            url: '/tables/expanding',
          },
        ],
      },
    ],
  },
  {
    heading: $localize`:@@layout.nav.charts:Charts`,
    links: [
      {
        label: $localize`:@@layout.nav.charts:Charts`,
        icon: 'charts',
        base: '/charts',
        children: [
          { label: $localize`:@@layout.nav.line:Line`, url: '/charts/line' },
          { label: $localize`:@@layout.nav.area:Area`, url: '/charts/area' },
          { label: $localize`:@@layout.nav.bar:Bar`, url: '/charts/bar' },
          {
            label: $localize`:@@layout.nav.pieDonut:Pie & Donut`,
            url: '/charts/pie',
          },
          { label: $localize`:@@layout.nav.radar:Radar`, url: '/charts/radar' },
          {
            label: $localize`:@@layout.nav.radial:Radial`,
            url: '/charts/radial',
          },
        ],
      },
    ],
  },
  {
    heading: $localize`:@@layout.nav.widgets:Widgets`,
    links: [
      {
        label: $localize`:@@layout.nav.cards:Cards`,
        url: '/widgets/cards',
        icon: 'cards',
      },
      {
        label: $localize`:@@layout.nav.charts:Charts`,
        url: '/widgets/charts',
        icon: 'widget-charts',
      },
    ],
  },
  {
    heading: $localize`:@@layout.nav.icons:Icons`,
    links: [
      {
        label: $localize`:@@layout.nav.lucideIcons:Lucide Icons`,
        url: '/icons',
        icon: 'icons',
      },
    ],
  },
  {
    heading: $localize`:@@layout.nav.auth:Auth`,
    links: [
      {
        label: $localize`:@@layout.nav.error:Error`,
        url: '/auth/404',
        icon: 'error',
      },
      {
        label: $localize`:@@layout.nav.maintenance:Maintenance`,
        url: '/auth/maintenance',
        icon: 'maintenance',
      },
      {
        label: $localize`:@@layout.nav.login:Login`,
        icon: 'login',
        base: '/auth/login',
        children: [
          {
            label: $localize`:@@layout.nav.sideLogin:Side Login`,
            url: '/auth/side/login',
          },
          {
            label: $localize`:@@layout.nav.boxedLogin:Boxed Login`,
            url: '/auth/login',
          },
        ],
      },
      {
        label: $localize`:@@layout.nav.register:Register`,
        icon: 'register',
        children: [
          {
            label: $localize`:@@layout.nav.sideRegister:Side Register`,
            url: '/auth/side/register',
          },
          {
            label: $localize`:@@layout.nav.boxedRegister:Boxed Register`,
            url: '/auth/register',
          },
        ],
      },
      {
        label: $localize`:@@layout.nav.forgotPassword:Forgot Password`,
        icon: 'forgot',
        children: [
          {
            label: $localize`:@@layout.nav.sideForgotPassword:Side Forgot Password`,
            url: '/auth/side/forgot-password',
          },
          {
            label: $localize`:@@layout.nav.boxedForgotPassword:Boxed Forgot Password`,
            url: '/auth/forgot-password',
          },
        ],
      },
      {
        label: $localize`:@@layout.nav.twoSteps:Two Steps`,
        icon: 'two-steps',
        children: [
          {
            label: $localize`:@@layout.nav.sideTwoSteps:Side Two Steps`,
            url: '/auth/side/two-steps',
          },
          {
            label: $localize`:@@layout.nav.boxedTwoSteps:Boxed Two Steps`,
            url: '/auth/two-steps',
          },
        ],
      },
    ],
  },
];
