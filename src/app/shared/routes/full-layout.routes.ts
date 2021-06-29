import {Routes} from '@angular/router';

export const FULL_LAYOUT_ROUTES: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('../../auth/auth.module').then(m => m.AuthModule)
  }
];
