import { Route } from '@angular/router';

/** shadcndashboard's routes (src/routes/Router.tsx), its screens lazy-loaded. */
export const appRoutes: Route[] = [
  // The app: the sidebar, the header, the page.
  {
    path: '',
    loadComponent: () =>
      import('./layout/full-layout').then((m) => m.FullLayout),
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'Dashboard',
        loadComponent: () =>
          import('./pages/dashboard/dashboard-page').then(
            (m) => m.DashboardPage,
          ),
      },
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
          import('./apps/blog/blog-listing-page').then(
            (m) => m.BlogListingPage,
          ),
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
        path: 'icons',
        title: 'Icons — Dashboard',
        loadComponent: () =>
          import('./pages/icons/icons-page').then((m) => m.IconsPage),
      },
    ],
  },
  // Sign in and the like: the page alone.
  {
    path: 'auth',
    loadComponent: () =>
      import('./layout/blank-layout').then((m) => m.BlankLayout),
    children: [
      {
        path: 'login',
        title: 'Login — Dashboard',
        loadComponent: () =>
          import('./auth/login-page').then((m) => m.LoginPage),
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
          import('./auth/forgot-password-page').then(
            (m) => m.ForgotPasswordPage,
          ),
      },
      {
        path: 'two-steps',
        title: 'Two Steps — Dashboard',
        loadComponent: () =>
          import('./auth/two-steps-page').then((m) => m.TwoStepsPage),
      },
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
