import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';

import {FullLayoutComponent} from './layouts/full-layout/full-layout.component';
import {CommonLayoutComponent} from './layouts/common-layout/common-layout.component';

import {FULL_LAYOUT_ROUTES} from './shared/routes/full-layout.routes';
import {COMMON_LAYOUT_ROUTES} from './shared/routes/common-layout.routes';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/home',
    pathMatch: 'full',
  },
  {
    path: '',
    component: CommonLayoutComponent,
    children: COMMON_LAYOUT_ROUTES
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: FULL_LAYOUT_ROUTES
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
