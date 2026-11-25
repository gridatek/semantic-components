import { Route } from '@angular/router';
import { StackedLayout } from './components/stacked-layout/stacked-layout';
import { aiElementsRoutes } from './routes/ai-elements-routes';
import { componentsRoutes } from './routes/components-routes';
import { demosRoutes } from './routes/demos-routes';
import { guidesRoutes } from './routes/guides-routes';
import { overviewRoutes } from './routes/overview-routes';
import { packagesRoutes } from './routes/packages-routes';
import { recipesRoutes } from './routes/recipes-routes';

export const appRoutes: Route[] = [
  ...demosRoutes,
  ...overviewRoutes,
  ...packagesRoutes,
  ...recipesRoutes,
  ...guidesRoutes,
  ...componentsRoutes,
  ...aiElementsRoutes,
  {
    path: '',
    component: StackedLayout,
    children: [
      {
        path: '',
        title: 'Semantic Components',
        loadComponent: () => import('./pages/home/home'),
      },
      {
        path: 'customize',
        title: 'Customize - Semantic Components',
        loadComponent: () => import('./pages/customize/customize'),
      },
      {
        path: 'components',
        title: 'Components - Semantic Components',
        loadComponent: () => import('./pages/components/components'),
      },
      {
        path: 'ai-elements',
        title: 'AI Elements - Semantic Components',
        loadComponent: () => import('./pages/ai-elements/ai-elements'),
      },
      {
        path: 'charts',
        title: 'Charts - Semantic Components',
        loadComponent: () => import('./pages/charts/charts'),
      },
      {
        path: 'typeset',
        title: 'Typeset - Semantic Components',
        loadComponent: () => import('./pages/typeset/typeset'),
      },
    ],
  },
];
