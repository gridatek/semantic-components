import { Route } from '@angular/router';
import { StackedLayout } from './components/stacked-layout/stacked-layout';
import { componentsRoutes } from './routes/components.routes';
import { demosRoutes } from './routes/demos.routes';
import { gettingStartedRoutes } from './routes/getting-started.routes';

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
        loadComponent: () => import('./pages/home/home'),
      },
    ],
  },
];
