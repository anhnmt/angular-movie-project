import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AuthRoutingModule} from './auth-routing.module';

import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzCheckboxModule} from 'ng-zorro-antd/checkbox';

import {LoginComponent} from './login/login.component';
import {SignUpComponent} from './sign-up/sign-up.component';
import {Error1Component} from './error-1/error-1.component';
import {Error2Component} from './error-2/error-2.component';
import {AuthService} from '@/app/shared/services/auth.service';

const antdModule = [
  NzFormModule,
  NzInputModule,
  NzButtonModule,
  NzCardModule,
  NzCheckboxModule
];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    ...antdModule
  ],
  declarations: [
    LoginComponent,
    SignUpComponent,
    Error1Component,
    Error2Component
  ],
  providers: [
    AuthService
  ]
})

export class AuthModule {
}
