import { Routes } from '@angular/router';


export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./living-dexes/living-dexes-routes').then(m => m.routes)
  },
  {
    path: 'dex',
    loadChildren: () => import('./living-dexes/living-dexes-routes').then(m => m.routes)
  },
  {
    path: 'valuables',
    loadChildren: () => import('./valuable/valuable-routing.module').then(m => m.routes)
  },
];
