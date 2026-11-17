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
    heading: $localize`Dashboards`,
    links: [
      { label: $localize`Modern`, url: '/', icon: 'modern' },
      {
        label: $localize`Analytics`,
        url: '/dashboards/analytics',
        icon: 'analytics',
      },
      {
        label: $localize`eCommerce`,
        url: '/dashboards/ecommerce',
        icon: 'ecommerce',
      },
      { label: $localize`SaaS + AI`, url: '/dashboards/saas-ai', icon: 'saas' },
      { label: $localize`School`, url: '/dashboards/school', icon: 'school' },
      { label: $localize`Health`, url: '/dashboards/health', icon: 'health' },
    ],
  },
  {
    heading: $localize`Apps`,
    links: [
      {
        label: $localize`AI`,
        icon: 'ai',
        base: '/apps/ai',
        children: [
          { label: $localize`Chat`, url: '/apps/ai/chat' },
          { label: $localize`Image`, url: '/apps/ai/image' },
        ],
      },
      { label: $localize`Calendar`, url: '/apps/calendar', icon: 'calendar' },
      { label: $localize`Chats`, url: '/apps/chats', icon: 'chats' },
      { label: $localize`Email`, url: '/apps/email', icon: 'email' },
      { label: $localize`Contacts`, url: '/apps/contacts', icon: 'contacts' },
      { label: $localize`Notes`, url: '/apps/notes', icon: 'notes' },
      {
        label: $localize`Blogs`,
        icon: 'blog',
        base: '/apps/blog',
        children: [
          { label: $localize`Blog Listing`, url: '/apps/blog/post' },
          {
            label: $localize`Blog Detail`,
            url: '/apps/blog/detail/streaming-video-way-before-it-was-cool-go-dark-tomorrow',
          },
          { label: $localize`Blog Edit`, url: '/apps/blog/edit/5' },
          { label: $localize`Blog Create`, url: '/apps/blog/create' },
          { label: $localize`Manage Blog`, url: '/apps/blog/manage-blog' },
        ],
      },
      { label: $localize`Tickets`, url: '/apps/tickets', icon: 'tickets' },
      {
        label: $localize`Invoice`,
        icon: 'invoice',
        base: '/apps/invoice',
        children: [
          { label: $localize`List`, url: '/apps/invoice/list' },
          { label: $localize`Details`, url: '/apps/invoice/detail/INV-1042' },
          { label: $localize`Create`, url: '/apps/invoice/create' },
          { label: $localize`Edit`, url: '/apps/invoice/edit/INV-1042' },
        ],
      },
      {
        label: $localize`User Profile`,
        icon: 'profile',
        base: '/apps/user-profile',
        children: [
          { label: $localize`Profile`, url: '/apps/user-profile/profile' },
          { label: $localize`Followers`, url: '/apps/user-profile/followers' },
          { label: $localize`Friends`, url: '/apps/user-profile/friends' },
          { label: $localize`Gallery`, url: '/apps/user-profile/gallery' },
        ],
      },
      {
        label: $localize`Ecommerce`,
        icon: 'shop',
        base: '/apps/ecommerce',
        children: [
          { label: $localize`Shop`, url: '/apps/ecommerce/shop' },
          { label: $localize`Details`, url: '/apps/ecommerce/detail/3' },
          { label: $localize`List`, url: '/apps/ecommerce/list' },
          { label: $localize`Checkout`, url: '/apps/ecommerce/checkout' },
          { label: $localize`Add Product`, url: '/apps/ecommerce/add-product' },
          {
            label: $localize`Edit Product`,
            url: '/apps/ecommerce/edit-product/3',
          },
        ],
      },
      { label: $localize`Kanban`, url: '/apps/kanban', icon: 'kanban' },
      {
        label: $localize`Customers`,
        url: '/apps/customers',
        icon: 'customers',
      },
      { label: $localize`Orders`, url: '/apps/orders', icon: 'orders' },
    ],
  },
  {
    heading: $localize`Pages`,
    links: [
      { label: $localize`Table`, url: '/pages/tables', icon: 'table' },
      { label: $localize`Form`, url: '/pages/form', icon: 'form' },
      {
        label: $localize`User Profile`,
        url: '/pages/user-profile',
        icon: 'profile',
      },
      {
        label: $localize`Account Settings`,
        url: '/pages/account-settings',
        icon: 'settings',
      },
      { label: 'FAQ', url: '/pages/faq', icon: 'faq' },
      { label: $localize`Pricing`, url: '/pages/pricing', icon: 'pricing' },
      {
        label: $localize`Roles & Permissions`,
        url: '/pages/roles',
        icon: 'roles',
      },
      {
        label: $localize`Integrations`,
        url: '/pages/integrations',
        icon: 'integrations',
      },
    ],
  },
  {
    heading: $localize`UI Elements`,
    links: [
      {
        label: $localize`Components`,
        icon: 'ui',
        base: '/ui',
        children: [
          { label: $localize`Button`, url: '/ui/button' },
          { label: $localize`Avatar`, url: '/ui/avatar' },
          { label: $localize`Badge`, url: '/ui/badge' },
          { label: $localize`Tooltip`, url: '/ui/tooltip' },
          { label: $localize`Input`, url: '/ui/input' },
          { label: $localize`Textarea`, url: '/ui/textarea' },
          { label: $localize`Switch`, url: '/ui/switch' },
          { label: $localize`Tabs`, url: '/ui/tabs' },
          { label: $localize`Select`, url: '/ui/select' },
          { label: $localize`Checkbox`, url: '/ui/checkbox' },
          { label: $localize`Accordion`, url: '/ui/accordion' },
          { label: $localize`Card`, url: '/ui/card' },
          { label: $localize`Radio Group`, url: '/ui/radio-group' },
          { label: $localize`Date Picker`, url: '/ui/date-picker' },
        ],
      },
    ],
  },
  {
    heading: $localize`Forms`,
    links: [
      {
        label: $localize`Form Layouts`,
        icon: 'form-layouts',
        base: '/forms',
        children: [
          { label: $localize`Layouts`, url: '/forms/layouts' },
          { label: $localize`Validation`, url: '/forms/validation' },
          { label: $localize`Examples`, url: '/forms/examples' },
          { label: $localize`Repeater`, url: '/forms/repeater' },
          { label: $localize`Wizard`, url: '/forms/wizard' },
        ],
      },
    ],
  },
  {
    heading: $localize`Tables`,
    links: [
      {
        label: $localize`Data Tables`,
        icon: 'data-tables',
        base: '/tables',
        children: [
          { label: $localize`Basic`, url: '/tables/basic' },
          { label: $localize`Dense`, url: '/tables/dense' },
          { label: $localize`Sorting`, url: '/tables/sorting' },
          { label: $localize`Filtering`, url: '/tables/filtering' },
          { label: $localize`Pagination`, url: '/tables/pagination' },
          { label: $localize`Row Selection`, url: '/tables/row-selection' },
          {
            label: $localize`Column Visibility`,
            url: '/tables/column-visibility',
          },
          { label: $localize`Editable`, url: '/tables/editable' },
          { label: $localize`Sticky`, url: '/tables/sticky' },
          { label: $localize`Drag & Drop`, url: '/tables/drag-drop' },
          { label: $localize`Empty`, url: '/tables/empty' },
          { label: $localize`Expanding`, url: '/tables/expanding' },
        ],
      },
    ],
  },
  {
    heading: $localize`Charts`,
    links: [
      {
        label: $localize`Charts`,
        icon: 'charts',
        base: '/charts',
        children: [
          { label: $localize`Line`, url: '/charts/line' },
          { label: $localize`Area`, url: '/charts/area' },
          { label: $localize`Bar`, url: '/charts/bar' },
          { label: $localize`Pie & Donut`, url: '/charts/pie' },
          { label: $localize`Radar`, url: '/charts/radar' },
          { label: $localize`Radial`, url: '/charts/radial' },
        ],
      },
    ],
  },
  {
    heading: $localize`Widgets`,
    links: [
      { label: $localize`Cards`, url: '/widgets/cards', icon: 'cards' },
      {
        label: $localize`Charts`,
        url: '/widgets/charts',
        icon: 'widget-charts',
      },
    ],
  },
  {
    heading: $localize`Icons`,
    links: [{ label: $localize`Lucide Icons`, url: '/icons', icon: 'icons' }],
  },
  {
    heading: $localize`Auth`,
    links: [
      { label: $localize`Error`, url: '/auth/404', icon: 'error' },
      {
        label: $localize`Maintenance`,
        url: '/auth/maintenance',
        icon: 'maintenance',
      },
      {
        label: $localize`Login`,
        icon: 'login',
        base: '/auth/login',
        children: [
          { label: $localize`Side Login`, url: '/auth/side/login' },
          { label: $localize`Boxed Login`, url: '/auth/login' },
        ],
      },
      {
        label: $localize`Register`,
        icon: 'register',
        children: [
          { label: $localize`Side Register`, url: '/auth/side/register' },
          { label: $localize`Boxed Register`, url: '/auth/register' },
        ],
      },
      {
        label: $localize`Forgot Password`,
        icon: 'forgot',
        children: [
          {
            label: $localize`Side Forgot Password`,
            url: '/auth/side/forgot-password',
          },
          {
            label: $localize`Boxed Forgot Password`,
            url: '/auth/forgot-password',
          },
        ],
      },
      {
        label: $localize`Two Steps`,
        icon: 'two-steps',
        children: [
          { label: $localize`Side Two Steps`, url: '/auth/side/two-steps' },
          { label: $localize`Boxed Two Steps`, url: '/auth/two-steps' },
        ],
      },
    ],
  },
];
