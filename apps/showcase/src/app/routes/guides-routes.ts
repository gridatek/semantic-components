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
        path: 'scrollbar',
        title: 'Scrollbar - Semantic Components',
        loadComponent: () => import('../pages/docs/scrollbar/scrollbar-page'),
      },
      {
        path: 'typeset',
        title: 'Typeset - Semantic Components',
        loadComponent: () => import('../pages/docs/typeset/typeset-page'),
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
      {
        path: 'custom-style',
        title: 'Custom style - Semantic Components',
        loadComponent: () => import('../pages/guides/custom-style-page'),
      },
      {
        path: 'i18n',
        title: 'Internationalization - Semantic Components',
        loadComponent: () => import('../pages/guides/i18n-page'),
      },
      {
        path: 'rtl',
        title: 'Right to left - Semantic Components',
        loadComponent: () => import('../pages/guides/rtl-page'),
      },
    ],
  },
];
