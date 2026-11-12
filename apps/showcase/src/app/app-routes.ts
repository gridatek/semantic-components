import { Route } from '@angular/router';
import { StackedLayout } from './components/stacked-layout/stacked-layout';
import { componentsRoutes } from './routes/components-routes';
import { demosRoutes } from './routes/demos-routes';
import { gettingStartedRoutes } from './routes/getting-started-routes';

export const appRoutes: Route[] = [
  ...demosRoutes,
  ...gettingStartedRoutes,
  ...componentsRoutes,
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
        path: 'presets',
        title: 'Presets - Semantic Components',
        loadComponent: () => import('./pages/presets/presets'),
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
