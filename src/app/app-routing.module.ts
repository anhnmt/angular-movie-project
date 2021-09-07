import {FullLayoutComponent} from './layouts/full-layout/full-layout.component';
import {DashboardLayoutComponent} from './layouts/dashboard-layout/dashboard-layout.component';
import {ClientLayoutComponent} from './layouts/client-layout/client-layout.component';
import {Routes} from '@angular/router';
import {AuthGuard} from '@/app/shared/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: ClientLayoutComponent,
    children: [
      {
        path: '',
        loadChildren: () => import('./client/client.module').then(m => m.ClientModule),
      }
    ]
  },
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
      }
    ],
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: FullLayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
      }
    ]
  }
];
