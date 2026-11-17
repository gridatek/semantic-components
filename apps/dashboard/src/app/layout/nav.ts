/**
 * The sidebar's links: shadcndashboard's sections (sidebar/sidebaritems.ts),
 * its free screens and the Pro ones, each made here.
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
    heading: 'Dashboards',
    links: [
      { label: 'Modern', url: '/', icon: 'modern' },
      { label: 'Analytics', url: '/dashboards/analytics', icon: 'analytics' },
      { label: 'eCommerce', url: '/dashboards/ecommerce', icon: 'ecommerce' },
      { label: 'SaaS + AI', url: '/dashboards/saas-ai', icon: 'saas' },
      { label: 'School', url: '/dashboards/school', icon: 'school' },
      { label: 'Health', url: '/dashboards/health', icon: 'health' },
    ],
  },
  {
    heading: 'Apps',
    links: [
      {
        label: 'AI',
        icon: 'ai',
        base: '/apps/ai',
        children: [
          { label: 'Chat', url: '/apps/ai/chat' },
          { label: 'Image', url: '/apps/ai/image' },
        ],
      },
      { label: 'Calendar', url: '/apps/calendar', icon: 'calendar' },
      { label: 'Chats', url: '/apps/chats', icon: 'chats' },
      { label: 'Email', url: '/apps/email', icon: 'email' },
      { label: 'Contacts', url: '/apps/contacts', icon: 'contacts' },
      { label: 'Notes', url: '/apps/notes', icon: 'notes' },
      {
        label: 'Blogs',
        icon: 'blog',
        base: '/apps/blog',
        children: [
          { label: 'Blog Listing', url: '/apps/blog/post' },
          {
            label: 'Blog Detail',
            url: '/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',
          },
          { label: 'Blog Edit', url: '/apps/blog/edit/5' },
          { label: 'Blog Create', url: '/apps/blog/create' },
          { label: 'Manage Blog', url: '/apps/blog/manage-blog' },
        ],
      },
      { label: 'Tickets', url: '/apps/tickets', icon: 'tickets' },
      {
        label: 'Invoice',
        icon: 'invoice',
        base: '/apps/invoice',
        children: [
          { label: 'List', url: '/apps/invoice/list' },
          { label: 'Details', url: '/apps/invoice/detail/INV-1042' },
          { label: 'Create', url: '/apps/invoice/create' },
          { label: 'Edit', url: '/apps/invoice/edit/INV-1042' },
        ],
      },
      {
        label: 'User Profile',
        icon: 'profile',
        base: '/apps/user-profile',
        children: [
          { label: 'Profile', url: '/apps/user-profile/profile' },
          { label: 'Followers', url: '/apps/user-profile/followers' },
          { label: 'Friends', url: '/apps/user-profile/friends' },
          { label: 'Gallery', url: '/apps/user-profile/gallery' },
        ],
      },
      {
        label: 'Ecommerce',
        icon: 'shop',
        base: '/apps/ecommerce',
        children: [
          { label: 'Shop', url: '/apps/ecommerce/shop' },
          { label: 'Details', url: '/apps/ecommerce/detail/3' },
          { label: 'List', url: '/apps/ecommerce/list' },
          { label: 'Checkout', url: '/apps/ecommerce/checkout' },
          { label: 'Add Product', url: '/apps/ecommerce/add-product' },
          { label: 'Edit Product', url: '/apps/ecommerce/edit-product/3' },
        ],
      },
      { label: 'Kanban', url: '/apps/kanban', icon: 'kanban' },
      { label: 'Customers', url: '/apps/customers', icon: 'customers' },
      { label: 'Orders', url: '/apps/orders', icon: 'orders' },
    ],
  },
  {
    heading: 'Pages',
    links: [
      { label: 'Table', url: '/pages/tables', icon: 'table' },
      { label: 'Form', url: '/pages/form', icon: 'form' },
      { label: 'User Profile', url: '/pages/user-profile', icon: 'profile' },
      {
        label: 'Account Settings',
        url: '/pages/account-settings',
        icon: 'settings',
      },
      { label: 'FAQ', url: '/pages/faq', icon: 'faq' },
      { label: 'Pricing', url: '/pages/pricing', icon: 'pricing' },
      { label: 'Roles & Permissions', url: '/pages/roles', icon: 'roles' },
      {
        label: 'Integrations',
        url: '/pages/integrations',
        icon: 'integrations',
      },
    ],
  },
  {
    heading: 'UI Elements',
    links: [
      {
        label: 'Components',
        icon: 'ui',
        base: '/ui',
        children: [
          { label: 'Button', url: '/ui/button' },
          { label: 'Avatar', url: '/ui/avatar' },
          { label: 'Badge', url: '/ui/badge' },
          { label: 'Tooltip', url: '/ui/tooltip' },
          { label: 'Input', url: '/ui/input' },
          { label: 'Textarea', url: '/ui/textarea' },
          { label: 'Switch', url: '/ui/switch' },
          { label: 'Tabs', url: '/ui/tabs' },
          { label: 'Select', url: '/ui/select' },
          { label: 'Checkbox', url: '/ui/checkbox' },
          { label: 'Accordion', url: '/ui/accordion' },
          { label: 'Card', url: '/ui/card' },
          { label: 'Radio Group', url: '/ui/radio-group' },
          { label: 'Date Picker', url: '/ui/date-picker' },
        ],
      },
    ],
  },
  {
    heading: 'Forms',
    links: [
      {
        label: 'Form Layouts',
        icon: 'form-layouts',
        base: '/forms',
        children: [
          { label: 'Layouts', url: '/forms/layouts' },
          { label: 'Validation', url: '/forms/validation' },
          { label: 'Examples', url: '/forms/examples' },
          { label: 'Repeater', url: '/forms/repeater' },
          { label: 'Wizard', url: '/forms/wizard' },
        ],
      },
    ],
  },
  {
    heading: 'Tables',
    links: [
      {
        label: 'Data Tables',
        icon: 'data-tables',
        base: '/tables',
        children: [
          { label: 'Basic', url: '/tables/basic' },
          { label: 'Dense', url: '/tables/dense' },
          { label: 'Sorting', url: '/tables/sorting' },
          { label: 'Filtering', url: '/tables/filtering' },
          { label: 'Pagination', url: '/tables/pagination' },
          { label: 'Row Selection', url: '/tables/row-selection' },
          { label: 'Column Visibility', url: '/tables/column-visibility' },
          { label: 'Editable', url: '/tables/editable' },
          { label: 'Sticky', url: '/tables/sticky' },
          { label: 'Drag & Drop', url: '/tables/drag-drop' },
          { label: 'Empty', url: '/tables/empty' },
          { label: 'Expanding', url: '/tables/expanding' },
        ],
      },
    ],
  },
  {
    heading: 'Charts',
    links: [
      {
        label: 'Charts',
        icon: 'charts',
        base: '/charts',
        children: [
          { label: 'Line', url: '/charts/line' },
          { label: 'Area', url: '/charts/area' },
          { label: 'Bar', url: '/charts/bar' },
          { label: 'Pie & Donut', url: '/charts/pie' },
          { label: 'Radar', url: '/charts/radar' },
          { label: 'Radial', url: '/charts/radial' },
        ],
      },
    ],
  },
  {
    heading: 'Widgets',
    links: [
      { label: 'Cards', url: '/widgets/cards', icon: 'cards' },
      { label: 'Charts', url: '/widgets/charts', icon: 'widget-charts' },
    ],
  },
  {
    heading: 'Icons',
    links: [{ label: 'Lucide Icons', url: '/icons', icon: 'icons' }],
  },
  {
    heading: 'Auth',
    links: [
      { label: 'Error', url: '/auth/404', icon: 'error' },
      { label: 'Maintenance', url: '/auth/maintenance', icon: 'maintenance' },
      {
        label: 'Login',
        icon: 'login',
        base: '/auth/login',
        children: [
          { label: 'Side Login', url: '/auth/side/login' },
          { label: 'Boxed Login', url: '/auth/login' },
        ],
      },
      {
        label: 'Register',
        icon: 'register',
        children: [
          { label: 'Side Register', url: '/auth/side/register' },
          { label: 'Boxed Register', url: '/auth/register' },
        ],
      },
      {
        label: 'Forgot Password',
        icon: 'forgot',
        children: [
          { label: 'Side Forgot Password', url: '/auth/side/forgot-password' },
          { label: 'Boxed Forgot Password', url: '/auth/forgot-password' },
        ],
      },
      {
        label: 'Two Steps',
        icon: 'two-steps',
        children: [
          { label: 'Side Two Steps', url: '/auth/side/two-steps' },
          { label: 'Boxed Two Steps', url: '/auth/two-steps' },
        ],
      },
    ],
  },
];
