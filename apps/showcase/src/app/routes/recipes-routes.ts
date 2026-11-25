import { Route } from '@angular/router';
import { DocsLayout } from '../layouts/docs-layout/docs-layout';

export const recipesRoutes: Route[] = [
  {
    path: 'docs/recipes',
    component: DocsLayout,
    children: [
      {
        path: '',
        title: 'Recipes - Semantic Components',
        loadComponent: () => import('../pages/recipes/recipes-page'),
      },
      {
        path: 'countdown',
        title: 'Countdown - Semantic Components',
        loadComponent: () => import('../pages/docs/countdown/countdown-page'),
      },
      {
        path: 'kanban-board',
        title: 'Kanban Board - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/kanban-board/kanban-board-page'),
      },
      {
        path: 'lightbox',
        title: 'Lightbox - Semantic Components',
        loadComponent: () => import('../pages/docs/lightbox/lightbox-page'),
      },
      {
        path: 'multiselect',
        title: 'Multiselect - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/multiselect/multiselect-page'),
      },
      {
        path: 'notification-center',
        title: 'Notification Center - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/notification-center/notification-center-page'),
      },
      {
        path: 'playlist',
        title: 'Playlist - Semantic Components',
        loadComponent: () => import('../pages/docs/playlist/playlist-page'),
      },
      {
        path: 'stat-card',
        title: 'Stat Card - Semantic Components',
        loadComponent: () => import('../pages/docs/stat-card/stat-card-page'),
      },
      {
        path: 'tags-input',
        title: 'Tags Input - Semantic Components',
        loadComponent: () => import('../pages/docs/tags-input/tags-input-page'),
      },
      {
        path: 'transfer-list',
        title: 'Transfer List - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/transfer-list/transfer-list-page'),
      },
      {
        path: 'tree-table',
        title: 'Tree Table - Semantic Components',
        loadComponent: () => import('../pages/docs/tree-table/tree-table-page'),
      },
    ],
  },
];
