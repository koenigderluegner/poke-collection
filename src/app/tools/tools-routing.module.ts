import { Routes } from '@angular/router';


export const routes: Routes = [
  {
    path: '', redirectTo: 'friend-safari-shiny-dex', pathMatch: 'full'
  },
  {
    path: '', loadComponent: () => import('./tools.component').then(m => m.ToolsComponent), children: [
      {
        path: 'friend-safari-shiny-dex',
        loadComponent: () => import('./components/friend-safari-shiny-dex/friend-safari-shiny-dex.component').then(m => m.FriendSafariShinyDexComponent)
      },
      {
        path: 'ultra-wormhole-shiny-dex',
        loadComponent: () => import('./components/ultra-wormhole-shiny-dex/ultra-wormhole-shiny-dex.component').then(m => m.UltraWormholeShinyDexComponent)
      }
    ]
  }
];
