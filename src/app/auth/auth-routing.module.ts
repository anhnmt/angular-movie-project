import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {Error1Component} from './error-1/error-1.component';
import {Error2Component} from './error-2/error-2.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  // {
  //   path: 'sign-up',
  //   component: SignUpComponent,
  //   data: {
  //     title: 'Sign Up'
  //   }
  // },
  {
    path: '**',
    component: Error1Component,
    data: {
      title: 'Error 1'
    }
  },
  // {
  //   path: 'error-2',
  //   component: Error2Component,
  //   data: {
  //     title: 'Error 2'
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {
}
