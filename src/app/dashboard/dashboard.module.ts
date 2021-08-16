import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';

/** Import any ng-zorro components as the module required except icon module */
import {NzButtonModule} from 'ng-zorro-antd/button';
import {HTTP_INTERCEPTORS} from '~/@angular/common/http';
import {JwtInterceptor} from '@/app/shared/interceptor/token.interceptor';
import {AuthService} from '@/app/shared/services/auth.service';

/* Assign all ng-zorro modules to this array */
const antdModule = [
  NzButtonModule,
];

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    ...antdModule
  ],
  exports: [],
  declarations: [
    DashboardComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    AuthService
  ]
})
export class DashboardModule {
}
