import { Routes } from '@angular/router';


const userAndGeneralRoutes: Routes = [
  {
    path: 'tools',
    loadChildren: () => import('./tools/tools-routing.module').then(m => m.routes)
  },
];


const userRoutes: Routes = [
  {
    path: 'valuables',
    loadChildren: () => import('./valuable/valuable-routing.module').then(m => m.routes)
  },

];

userRoutes.push(...userAndGeneralRoutes);

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./living-dexes/living-dexes-routes').then(m => m.routes)
  },
  {
    path: 'dex',
    loadChildren: () => import('./living-dexes/living-dexes-routes').then(m => m.routes)
  },
];

appRoutes.unshift(...userAndGeneralRoutes);
