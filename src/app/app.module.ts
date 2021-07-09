import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {en_US, NZ_I18N} from 'ng-zorro-antd/i18n';
import {NzBreadCrumbModule} from 'ng-zorro-antd/breadcrumb';

import {LocationStrategy, PathLocationStrategy, registerLocaleData} from '@angular/common';
import en from '@angular/common/locales/en';

import {AppRoutingModule} from './app-routing.module';
import {TemplateModule} from './shared/template/template.module';
import {SharedModule} from './shared/shared.module';

import {AppComponent} from './app.component';
import {DashboardLayoutComponent} from './layouts/dashboard-layout/dashboard-layout.component';
import {FullLayoutComponent} from './layouts/full-layout/full-layout.component';

import {NgChartjsModule} from 'ng-chartjs';
import {ThemeConstantService} from './shared/services/theme-constant.service';
import { StoreModule } from '@ngrx/store';
import { ClientLayoutComponent } from './layouts/client-layout/client-layout.component';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    DashboardLayoutComponent,
    FullLayoutComponent,
    ClientLayoutComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    NzBreadCrumbModule,
    TemplateModule,
    SharedModule,
    NgChartjsModule,
    StoreModule.forRoot({}, {})
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
    ThemeConstantService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
