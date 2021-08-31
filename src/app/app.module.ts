import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';

import {LocationStrategy, PathLocationStrategy, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';
import {TemplateModule} from './shared/template/template.module';
import {SharedModule} from './shared/shared.module';

import {AppComponent} from './app.component';
import {DashboardLayoutComponent} from './layouts/dashboard-layout/dashboard-layout.component';
import {FullLayoutComponent} from './layouts/full-layout/full-layout.component';

import {NgChartjsModule} from 'ng-chartjs';
import {ThemeConstantService} from './shared/services/theme-constant.service';
import {StoreModule} from '@ngrx/store';
import {ClientLayoutComponent} from './layouts/client-layout/client-layout.component';
import {EpisodeDetailCreateComponent} from './components/episode-details/episode-detail-create/episode-detail-create.component';
import {EpisodeDetailEditComponent} from './components/episode-details/episode-detail-edit/episode-detail-edit.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {ReactiveFormsModule} from '@angular/forms';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {AuthService} from '@/app/shared/services/auth.service';
import {HTTP_INTERCEPTORS} from '~/@angular/common/http';
import {JwtInterceptor} from '@/app/shared/interceptor/token.interceptor';
import {RouterModule} from '@angular/router';
import {routes} from '@/app/app-routing.module';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    FullLayoutComponent,
    ClientLayoutComponent,
    EpisodeDetailCreateComponent,
    EpisodeDetailEditComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    NzBreadCrumbModule,
    TemplateModule,
    SharedModule,
    NgChartjsModule,
    StoreModule.forRoot({}, {}),
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzBadgeModule,
    NzModalModule,
    SharedModule
  ],
  providers: [
    {
      provide: NZ_I18N,
      useValue: en_US,
    },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    AuthService,
    ThemeConstantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
