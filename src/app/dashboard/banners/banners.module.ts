import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {BannersRoutingModule} from './banners-routing.module';
import {BannerIndexComponent} from './banner-index/banner-index.component';
import {BannerEditComponent} from './banner-edit/banner-edit.component';
import {BannerCreateComponent} from './banner-create/banner-create.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzInputModule} from 'ng-zorro-antd/input';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {TableService} from '../../shared/services/table.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzUploadModule} from 'ng-zorro-antd/upload';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzSelectModule} from 'ng-zorro-antd/select';


@NgModule({
  declarations: [BannerIndexComponent, BannerEditComponent, BannerCreateComponent],
  imports: [
    CommonModule,
    BannersRoutingModule,
    NzButtonModule,
    NzPopconfirmModule,
    NzToolTipModule,
    NzCardModule,
    NzInputModule,
    FormsModule,
    NzIconModule,
    NzTableModule,
    NzBadgeModule,
    NzAvatarModule,
    NzFormModule,
    NzUploadModule,
    NzDrawerModule,
    ReactiveFormsModule,
    NzSelectModule
  ],
  providers: [
    TableService,
    NzMessageService
  ]
})
export class BannersModule {
}
