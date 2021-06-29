import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DashboardRoutingModule} from './dashboard-routing.module';
import {UsersComponent} from './users/users.component';
import {AdminLayoutModule} from '../../layouts/admin-layout/admin-layout.module';
import {DashboardComponent} from './dashboard.component';
import {NzEmptyModule} from 'ng-zorro-antd/empty';


@NgModule({
  declarations: [
    UsersComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    AdminLayoutModule,
    NzEmptyModule,
  ]
})
export class DashboardModule {
}
