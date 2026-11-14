import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    title: 'Introducing Sera',
    loadComponent: () => import('./pages/sera-page/sera-page'),
  },
  // Each screen alone, full page: to compare with shadcn's, and to shoot.
  {
    path: 'audience-analytics',
    title: 'Audience Analytics — Sera',
    loadComponent: () =>
      import('./screens/audience-analytics/audience-analytics').then(
        (m) => m.AudienceAnalytics,
      ),
  },
  {
    path: 'article-directory',
    title: 'Article Directory — Sera',
    loadComponent: () =>
      import('./screens/article-directory/article-directory').then(
        (m) => m.ArticleDirectory,
      ),
  },
  {
    path: 'empty-state',
    title: 'Empty State — Sera',
    loadComponent: () =>
      import('./screens/empty-state/empty-state').then((m) => m.EmptyState),
  },
  {
    path: 'edit-article',
    title: 'Edit Article — Sera',
    loadComponent: () =>
      import('./screens/edit-article/edit-article').then((m) => m.EditArticle),
  },
  {
    path: 'media-library',
    title: 'Media Library — Sera',
    loadComponent: () =>
      import('./screens/media-library/media-library').then(
        (m) => m.MediaLibrary,
      ),
  },
  {
    path: 'media-library-table',
    title: 'Media Library Table — Sera',
    loadComponent: () =>
      import('./screens/media-library-table/media-library-table').then(
        (m) => m.MediaLibraryTable,
      ),
  },
  { path: '**', redirectTo: '' },
];
