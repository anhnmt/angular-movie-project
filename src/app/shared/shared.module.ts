import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {PerfectScrollbarModule} from 'ngx-perfect-scrollbar';
import {ThemeConstantService} from './services/theme-constant.service';
import {SearchPipe} from './pipes/search.pipe';
import {LazyloadModule} from './lazyload/lazyload.module';
import {SafePipe} from './pipes/safe.pipe';
import {AuthService} from '@/app/shared/services/auth.service';
import {AuthGuard} from '@/app/shared/guards/auth.guard';
import {SlugTransformDirective} from './directives/slug-transform.directive';
import {NzMessageService} from '~/ng-zorro-antd/message';
import {JwtInterceptor} from '@/app/shared/interceptor/token.interceptor';

@NgModule({
  exports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    NzIconModule,
    PerfectScrollbarModule,
    SearchPipe,
    LazyloadModule,
    SafePipe,
    SlugTransformDirective,
  ],
  imports: [
    RouterModule,
    CommonModule,
    NzIconModule,
    NzToolTipModule,
    PerfectScrollbarModule,
    LazyloadModule,
  ],
  declarations: [
    SearchPipe,
    SafePipe,
    SlugTransformDirective,
  ],
  providers: [
    NzMessageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    ThemeConstantService,
    AuthService,
    AuthGuard
  ]
})

export class SharedModule {
}
