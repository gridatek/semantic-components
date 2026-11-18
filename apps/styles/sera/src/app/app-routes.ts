import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  // The website: a header, the page, a footer.
  {
    path: '',
    loadComponent: () => import('./layouts/site-layout'),
    children: [
      {
        path: '',
        pathMatch: 'full',
        title: 'Introducing Sera',
        loadComponent: () => import('./pages/home-page/home-page'),
      },
      {
        path: 'dashboard',
        title: 'Audience Analytics — Sera',
        loadComponent: () =>
          import('./pages/app-pages').then((m) => m.DashboardPage),
      },
      {
        path: 'articles',
        title: 'Article Directory — Sera',
        loadComponent: () =>
          import('./pages/app-pages').then((m) => m.ArticlesPage),
      },
      {
        path: 'articles/:id',
        title: 'Edit Article — Sera',
        loadComponent: () =>
          import('./pages/app-pages').then((m) => m.EditArticlePage),
      },
      {
        path: 'media',
        title: 'Media Library — Sera',
        loadComponent: () =>
          import('./pages/app-pages').then((m) => m.MediaPage),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
