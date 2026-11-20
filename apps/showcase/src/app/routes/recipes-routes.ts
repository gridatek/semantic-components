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
    ],
  },
];
