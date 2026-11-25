import { Route } from '@angular/router';
import { DocsLayout } from '../layouts/docs-layout/docs-layout';

/** The utilities' pages: /docs/utilities/…, their sidebar group's address. */
export const utilitiesRoutes: Route[] = [
  {
    path: 'docs/utilities',
    component: DocsLayout,
    children: [
      {
        path: 'focus-trap',
        title: 'Focus Trap - Semantic Components',
        loadComponent: () => import('../pages/docs/focus-trap/focus-trap-page'),
      },
      {
        path: 'preferences',
        title: 'Preferences - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/preferences/preferences-page'),
      },
      {
        path: 'select-on-focus',
        title: 'Select On Focus - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/select-on-focus/select-on-focus-page'),
      },
    ],
  },
];
