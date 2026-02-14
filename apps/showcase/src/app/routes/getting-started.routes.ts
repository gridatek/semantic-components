import { Route } from '@angular/router';
import { DocsLayout } from '../layouts/docs-layout/docs-layout';

export const gettingStartedRoutes: Route[] = [
  {
    path: 'docs/getting-started',
    component: DocsLayout,
    children: [
      {
        path: '',
        redirectTo: 'introduction',
        pathMatch: 'full',
      },
      {
        path: 'introduction',
        title: 'Introduction - Semantic Components',
        loadComponent: () =>
          import('../pages/getting-started/introduction.page'),
      },
      {
        path: 'prerequisites',
        title: 'Prerequisites - Semantic Components',
        loadComponent: () =>
          import('../pages/getting-started/prerequisites.page'),
      },
      {
        path: 'core',
        title: 'UI Core - Semantic Components',
        loadComponent: () => import('../pages/getting-started/ui.page'),
      },
      {
        path: 'ui-lab',
        title: 'UI Lab - Semantic Components',
        loadComponent: () => import('../pages/getting-started/ui-lab.page'),
      },
      {
        path: 'carousel',
        title: 'Carousel - Semantic Components',
        loadComponent: () => import('../pages/getting-started/carousel.page'),
      },
      {
        path: 'editor',
        title: 'Editor - Semantic Components',
        loadComponent: () => import('../pages/getting-started/editor.page'),
      },
      {
        path: 'code',
        title: 'Code - Semantic Components',
        loadComponent: () => import('../pages/getting-started/code.page'),
      },
    ],
  },
];
