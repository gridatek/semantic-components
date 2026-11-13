import { Route } from '@angular/router';
import { DocsLayout } from '../layouts/docs-layout/docs-layout';

/** shadcn's AI Elements: patterns built from the components, a page each. */
export const aiElementsRoutes: Route[] = [
  {
    path: 'docs/ai-elements',
    component: DocsLayout,
    children: [
      {
        path: '',
        redirectTo: 'reasoning',
        pathMatch: 'full',
      },
      {
        path: 'reasoning',
        title: 'Reasoning - Semantic Components',
        loadComponent: () =>
          import('../pages/docs/ai-elements/reasoning/reasoning-page'),
      },
    ],
  },
];
