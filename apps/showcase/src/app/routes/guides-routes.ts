import { Route } from '@angular/router';
import { DocsLayout } from '../layouts/docs-layout/docs-layout';

export const guidesRoutes: Route[] = [
  {
    path: 'docs/guides',
    component: DocsLayout,
    children: [
      {
        path: '',
        redirectTo: 'theming',
        pathMatch: 'full',
      },
      {
        path: 'theming',
        title: 'Theming - Semantic Components',
        loadComponent: () => import('../pages/guides/theming-page'),
      },
      {
        path: 'forms',
        title: 'Forms - Semantic Components',
        loadComponent: () => import('../pages/guides/forms-page'),
      },
      {
        path: 'accessibility',
        title: 'Accessibility - Semantic Components',
        loadComponent: () => import('../pages/guides/accessibility-page'),
      },
      {
        path: 'ssr',
        title: 'Server-side rendering - Semantic Components',
        loadComponent: () => import('../pages/guides/ssr-page'),
      },
    ],
  },
];
