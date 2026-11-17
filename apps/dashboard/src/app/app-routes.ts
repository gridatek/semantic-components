import { Route } from '@angular/router';

/** The dashboards: the free one (Modern) and the Pro ones. */
const dashboards: Route[] = [
  {
    path: '',
    pathMatch: 'full',
    title: 'Dashboard',
    loadComponent: () =>
      import('./pages/dashboard/dashboard-page').then((m) => m.DashboardPage),
  },
  {
    path: 'dashboards/analytics',
    title: 'Analytics — Dashboard',
    loadComponent: () =>
      import('./pages/dashboards/analytics-page').then((m) => m.AnalyticsPage),
  },
  {
    path: 'dashboards/ecommerce',
    title: 'eCommerce — Dashboard',
    loadComponent: () =>
      import('./pages/dashboards/ecommerce-page').then((m) => m.EcommercePage),
  },
  {
    path: 'dashboards/saas-ai',
    title: 'SaaS + AI — Dashboard',
    loadComponent: () =>
      import('./pages/dashboards/saas-ai-page').then((m) => m.SaasAiPage),
  },
  {
    path: 'dashboards/school',
    title: 'School — Dashboard',
    loadComponent: () =>
      import('./pages/dashboards/school-page').then((m) => m.SchoolPage),
  },
  {
    path: 'dashboards/health',
    title: 'Health — Dashboard',
    loadComponent: () =>
      import('./pages/dashboards/health-page').then((m) => m.HealthPage),
  },
];

/** The pages: shadcndashboard's free ones and its Pro theme pages. */
const pages: Route[] = [
  {
    path: 'pages/tables',
    title: 'Tables — Dashboard',
    loadComponent: () =>
      import('./pages/tables/tables-page').then((m) => m.TablesPage),
  },
  {
    path: 'pages/form',
    title: 'Form — Dashboard',
    loadComponent: () =>
      import('./pages/form/form-page').then((m) => m.FormPage),
  },
  {
    path: 'pages/user-profile',
    title: 'User Profile — Dashboard',
    loadComponent: () =>
      import('./pages/user-profile/user-profile-page').then(
        (m) => m.UserProfilePage,
      ),
  },
  {
    path: 'icons',
    title: 'Icons — Dashboard',
    loadComponent: () =>
      import('./pages/icons/icons-page').then((m) => m.IconsPage),
  },
  {
    path: 'pages/account-settings',
    title: 'Account Settings — Dashboard',
    loadComponent: () =>
      import('./pages/account-settings/account-settings-page').then(
        (m) => m.AccountSettingsPage,
      ),
  },
  {
    path: 'pages/faq',
    title: 'FAQ — Dashboard',
    loadComponent: () => import('./pages/faq/faq-page').then((m) => m.FaqPage),
  },
  {
    path: 'pages/pricing',
    title: 'Pricing — Dashboard',
    loadComponent: () =>
      import('./pages/pricing/pricing-page').then((m) => m.PricingPage),
  },
  {
    path: 'pages/roles',
    title: 'Roles & Permissions — Dashboard',
    loadComponent: () =>
      import('./pages/roles/roles-page').then((m) => m.RolesPage),
  },
  {
    path: 'pages/integrations',
    title: 'Integrations — Dashboard',
    loadComponent: () =>
      import('./pages/integrations/integrations-page').then(
        (m) => m.IntegrationsPage,
      ),
  },
];

/** The apps. */
const apps: Route[] = [
  {
    path: 'apps/ai/chat',
    title: 'AI Chat — Dashboard',
    loadComponent: () =>
      import('./apps/ai/ai-chat-page').then((m) => m.AiChatPage),
  },
  {
    path: 'apps/ai/image',
    title: 'AI Image — Dashboard',
    loadComponent: () =>
      import('./apps/ai/ai-image-page').then((m) => m.AiImagePage),
  },
  {
    path: 'apps/calendar',
    title: 'Calendar — Dashboard',
    loadComponent: () =>
      import('./apps/calendar/calendar-page').then((m) => m.CalendarPage),
  },
  {
    path: 'apps/chats',
    title: 'Chats — Dashboard',
    loadComponent: () =>
      import('./apps/chats/chats-page').then((m) => m.ChatsPage),
  },
  {
    path: 'apps/email',
    title: 'Email — Dashboard',
    loadComponent: () =>
      import('./apps/email/email-page').then((m) => m.EmailPage),
  },
  {
    path: 'apps/contacts',
    title: 'Contacts — Dashboard',
    loadComponent: () =>
      import('./apps/contacts/contacts-page').then((m) => m.ContactsPage),
  },
  {
    path: 'apps/kanban',
    title: 'Kanban — Dashboard',
    loadComponent: () =>
      import('./apps/kanban/kanban-page').then((m) => m.KanbanPage),
  },
  {
    path: 'apps/notes',
    title: 'Notes — Dashboard',
    loadComponent: () =>
      import('./apps/notes/notes-page').then((m) => m.NotesPage),
  },
  {
    path: 'apps/tickets',
    title: 'Tickets — Dashboard',
    loadComponent: () =>
      import('./apps/tickets/tickets-page').then((m) => m.TicketsPage),
  },
  {
    path: 'apps/tickets/create',
    title: 'Create Ticket — Dashboard',
    loadComponent: () =>
      import('./apps/tickets/ticket-create-page').then(
        (m) => m.TicketCreatePage,
      ),
  },
  {
    path: 'apps/blog/post',
    title: 'Blog — Dashboard',
    loadComponent: () =>
      import('./apps/blog/blog-listing-page').then((m) => m.BlogListingPage),
  },
  {
    path: 'apps/blog/detail/:slug',
    title: 'Blog Detail — Dashboard',
    loadComponent: () =>
      import('./apps/blog/blog-detail-page').then((m) => m.BlogDetailPage),
  },
  {
    path: 'apps/blog/create',
    title: 'Blog Create — Dashboard',
    loadComponent: () =>
      import('./apps/blog/blog-edit-page').then((m) => m.BlogEditPage),
  },
  {
    path: 'apps/blog/edit/:id',
    title: 'Blog Edit — Dashboard',
    loadComponent: () =>
      import('./apps/blog/blog-edit-page').then((m) => m.BlogEditPage),
  },
  {
    path: 'apps/blog/manage-blog',
    title: 'Manage Blog — Dashboard',
    loadComponent: () =>
      import('./apps/blog/blog-manage-page').then((m) => m.BlogManagePage),
  },
  {
    path: 'apps/invoice/list',
    title: 'Invoices — Dashboard',
    loadComponent: () =>
      import('./apps/invoice/invoice-list-page').then((m) => m.InvoiceListPage),
  },
  {
    path: 'apps/invoice/detail/:id',
    title: 'Invoice — Dashboard',
    loadComponent: () =>
      import('./apps/invoice/invoice-detail-page').then(
        (m) => m.InvoiceDetailPage,
      ),
  },
  {
    path: 'apps/invoice/create',
    title: 'New Invoice — Dashboard',
    loadComponent: () =>
      import('./apps/invoice/invoice-edit-page').then((m) => m.InvoiceEditPage),
  },
  {
    path: 'apps/invoice/edit/:id',
    title: 'Edit Invoice — Dashboard',
    loadComponent: () =>
      import('./apps/invoice/invoice-edit-page').then((m) => m.InvoiceEditPage),
  },
  {
    path: 'apps/user-profile/profile',
    title: 'Profile — Dashboard',
    loadComponent: () =>
      import('./apps/user-profile/profile-page').then((m) => m.ProfilePage),
  },
  {
    path: 'apps/user-profile/followers',
    title: 'Followers — Dashboard',
    loadComponent: () =>
      import('./apps/user-profile/followers-page').then((m) => m.FollowersPage),
  },
  {
    path: 'apps/user-profile/friends',
    title: 'Friends — Dashboard',
    loadComponent: () =>
      import('./apps/user-profile/friends-page').then((m) => m.FriendsPage),
  },
  {
    path: 'apps/user-profile/gallery',
    title: 'Gallery — Dashboard',
    loadComponent: () =>
      import('./apps/user-profile/gallery-page').then((m) => m.GalleryPage),
  },
  {
    path: 'apps/ecommerce/shop',
    title: 'Shop — Dashboard',
    loadComponent: () =>
      import('./apps/ecommerce/shop-page').then((m) => m.ShopPage),
  },
  {
    path: 'apps/ecommerce/detail/:id',
    title: 'Product — Dashboard',
    loadComponent: () =>
      import('./apps/ecommerce/product-detail-page').then(
        (m) => m.ProductDetailPage,
      ),
  },
  {
    path: 'apps/ecommerce/list',
    title: 'Products — Dashboard',
    loadComponent: () =>
      import('./apps/ecommerce/product-list-page').then(
        (m) => m.ProductListPage,
      ),
  },
  {
    path: 'apps/ecommerce/checkout',
    title: 'Checkout — Dashboard',
    loadComponent: () =>
      import('./apps/ecommerce/checkout-page').then((m) => m.CheckoutPage),
  },
  {
    path: 'apps/ecommerce/add-product',
    title: 'Add Product — Dashboard',
    loadComponent: () =>
      import('./apps/ecommerce/product-edit-page').then(
        (m) => m.ProductEditPage,
      ),
  },
  {
    path: 'apps/ecommerce/edit-product/:id',
    title: 'Edit Product — Dashboard',
    loadComponent: () =>
      import('./apps/ecommerce/product-edit-page').then(
        (m) => m.ProductEditPage,
      ),
  },
  {
    path: 'apps/customers',
    title: 'Customers — Dashboard',
    loadComponent: () =>
      import('./apps/customers/customers-page').then((m) => m.CustomersPage),
  },
  {
    path: 'apps/orders',
    title: 'Orders — Dashboard',
    loadComponent: () =>
      import('./apps/orders/orders-page').then((m) => m.OrdersPage),
  },
];

/** Form layouts (Pro). */
const forms: Route[] = [
  {
    path: 'forms/layouts',
    title: 'Form Layouts — Dashboard',
    loadComponent: () =>
      import('./pages/forms/form-layouts-page').then((m) => m.FormLayoutsPage),
  },
  {
    path: 'forms/validation',
    title: 'Form Validation — Dashboard',
    loadComponent: () =>
      import('./pages/forms/form-validation-page').then(
        (m) => m.FormValidationPage,
      ),
  },
  {
    path: 'forms/examples',
    title: 'Form Examples — Dashboard',
    loadComponent: () =>
      import('./pages/forms/form-examples-page').then(
        (m) => m.FormExamplesPage,
      ),
  },
  {
    path: 'forms/repeater',
    title: 'Repeater Forms — Dashboard',
    loadComponent: () =>
      import('./pages/forms/form-repeater-page').then(
        (m) => m.FormRepeaterPage,
      ),
  },
  {
    path: 'forms/wizard',
    title: 'Form Wizard — Dashboard',
    loadComponent: () =>
      import('./pages/forms/form-wizard-page').then((m) => m.FormWizardPage),
  },
];

/** The library's components, one page each (UI Elements). */
const ui: Route[] = [
  {
    path: 'ui/:element',
    title: 'UI Elements — Dashboard',
    loadComponent: () =>
      import('./pages/ui/ui-element-page').then((m) => m.UiElementPage),
  },
];

/** The data tables, one feature each. */
const tables: Route[] = [
  {
    path: 'tables/basic',
    title: 'Basic Table — Dashboard',
    loadComponent: () =>
      import('./pages/data-tables/basic-tables').then((m) => m.BasicTablePage),
  },
  {
    path: 'tables/dense',
    title: 'Dense Table — Dashboard',
    loadComponent: () =>
      import('./pages/data-tables/basic-tables').then((m) => m.DenseTablePage),
  },
  {
    path: 'tables/sticky',
    title: 'Sticky Table — Dashboard',
    loadComponent: () =>
      import('./pages/data-tables/basic-tables').then((m) => m.StickyTablePage),
  },
  {
    path: 'tables/empty',
    title: 'Empty Table — Dashboard',
    loadComponent: () =>
      import('./pages/data-tables/basic-tables').then((m) => m.EmptyTablePage),
  },
  {
    path: 'tables/sorting',
    title: 'Sorting — Dashboard',
    loadComponent: () =>
      import('./pages/data-tables/query-tables').then(
        (m) => m.SortingTablePage,
      ),
  },
  {
    path: 'tables/filtering',
    title: 'Filtering — Dashboard',
    loadComponent: () =>
      import('./pages/data-tables/query-tables').then(
        (m) => m.FilteringTablePage,
      ),
  },
  {
    path: 'tables/pagination',
    title: 'Pagination — Dashboard',
    loadComponent: () =>
      import('./pages/data-tables/query-tables').then(
        (m) => m.PaginationTablePage,
      ),
  },
  {
    path: 'tables/row-selection',
    title: 'Row Selection — Dashboard',
    loadComponent: () =>
      import('./pages/data-tables/interactive-tables').then(
        (m) => m.RowSelectionTablePage,
      ),
  },
  {
    path: 'tables/column-visibility',
    title: 'Column Visibility — Dashboard',
    loadComponent: () =>
      import('./pages/data-tables/interactive-tables').then(
        (m) => m.ColumnVisibilityTablePage,
      ),
  },
  {
    path: 'tables/editable',
    title: 'Editable Table — Dashboard',
    loadComponent: () =>
      import('./pages/data-tables/interactive-tables').then(
        (m) => m.EditableTablePage,
      ),
  },
  {
    path: 'tables/drag-drop',
    title: 'Drag & Drop Table — Dashboard',
    loadComponent: () =>
      import('./pages/data-tables/interactive-tables').then(
        (m) => m.DragDropTablePage,
      ),
  },
  {
    path: 'tables/expanding',
    title: 'Expanding Table — Dashboard',
    loadComponent: () =>
      import('./pages/data-tables/interactive-tables').then(
        (m) => m.ExpandingTablePage,
      ),
  },
];

/** The charts, by kind. */
const charts: Route[] = [
  {
    path: 'charts/line',
    title: 'Line Charts — Dashboard',
    loadComponent: () =>
      import('./pages/charts/chart-pages').then((m) => m.LineChartsPage),
  },
  {
    path: 'charts/area',
    title: 'Area Charts — Dashboard',
    loadComponent: () =>
      import('./pages/charts/chart-pages').then((m) => m.AreaChartsPage),
  },
  {
    path: 'charts/bar',
    title: 'Bar Charts — Dashboard',
    loadComponent: () =>
      import('./pages/charts/chart-pages').then((m) => m.BarChartsPage),
  },
  {
    path: 'charts/pie',
    title: 'Pie & Donut Charts — Dashboard',
    loadComponent: () =>
      import('./pages/charts/chart-pages').then((m) => m.PieChartsPage),
  },
  {
    path: 'charts/radar',
    title: 'Radar Charts — Dashboard',
    loadComponent: () =>
      import('./pages/charts/chart-pages').then((m) => m.RadarChartsPage),
  },
  {
    path: 'charts/radial',
    title: 'Radial Charts — Dashboard',
    loadComponent: () =>
      import('./pages/charts/chart-pages').then((m) => m.RadialChartsPage),
  },
];

/** Widgets: cards and charts to reuse. */
const widgets: Route[] = [
  {
    path: 'widgets/cards',
    title: 'Widget Cards — Dashboard',
    loadComponent: () =>
      import('./pages/widgets/widget-pages').then((m) => m.WidgetCardsPage),
  },
  {
    path: 'widgets/charts',
    title: 'Widget Charts — Dashboard',
    loadComponent: () =>
      import('./pages/widgets/widget-pages').then((m) => m.WidgetChartsPage),
  },
];

/** Sign in and the like: the same screens, boxed or beside a picture. */
const signIn: Route[] = [
  {
    path: 'login',
    title: 'Login — Dashboard',
    loadComponent: () => import('./auth/login-page').then((m) => m.LoginPage),
  },
  {
    path: 'register',
    title: 'Register — Dashboard',
    loadComponent: () =>
      import('./auth/register-page').then((m) => m.RegisterPage),
  },
  {
    path: 'forgot-password',
    title: 'Forgot Password — Dashboard',
    loadComponent: () =>
      import('./auth/forgot-password-page').then((m) => m.ForgotPasswordPage),
  },
  {
    path: 'two-steps',
    title: 'Two Steps — Dashboard',
    loadComponent: () =>
      import('./auth/two-steps-page').then((m) => m.TwoStepsPage),
  },
];

/** shadcndashboard's routes (src/routes/Router.tsx), its screens lazy-loaded. */
export const appRoutes: Route[] = [
  // The app: the sidebar, the header, the page.
  {
    path: '',
    loadComponent: () =>
      import('./layout/full-layout').then((m) => m.FullLayout),
    children: [
      ...dashboards,
      ...pages,
      ...apps,
      ...forms,
      ...ui,
      ...tables,
      ...charts,
      ...widgets,
    ],
  },
  // Beside a picture.
  {
    path: 'auth/side',
    loadComponent: () =>
      import('./layout/side-layout').then((m) => m.SideLayout),
    children: signIn,
  },
  // The page alone.
  {
    path: 'auth',
    loadComponent: () =>
      import('./layout/blank-layout').then((m) => m.BlankLayout),
    children: [
      ...signIn,
      {
        path: 'maintenance',
        title: 'Maintenance — Dashboard',
        loadComponent: () =>
          import('./auth/maintenance-page').then((m) => m.MaintenancePage),
      },
      {
        path: '404',
        title: 'Page Not Found — Dashboard',
        loadComponent: () =>
          import('./auth/error-page').then((m) => m.ErrorPage),
      },
    ],
  },
  { path: '**', redirectTo: 'auth/404' },
];
