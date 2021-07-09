import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {FullLayoutComponent} from './layouts/full-layout/full-layout.component';
import {DashboardLayoutComponent} from './layouts/dashboard-layout/dashboard-layout.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      }
    ]
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadAllModules,
      anchorScrolling: 'enabled',
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}
