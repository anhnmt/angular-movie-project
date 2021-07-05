import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MoviesRoutingModule} from './movies-routing.module';
import { MovieIndexComponent } from './movie-index/movie-index.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {TableService} from '../../shared/services/table.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import { MovieCreateComponent } from './movie-create/movie-create.component';
import { MovieEditComponent } from './movie-edit/movie-edit.component';

@NgModule({
  declarations: [MovieIndexComponent, MovieCreateComponent, MovieEditComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule,
    NzButtonModule,
    NzToolTipModule,
    NzTableModule,
    NzAvatarModule,
    NzSelectModule,
    NzInputModule,
    NzCardModule,
    NzBadgeModule,
    FormsModule,
    NzIconModule,
    NzFormModule,
    NzDrawerModule,
    NzDatePickerModule,
    NzPopconfirmModule,
    ReactiveFormsModule
  ],
  providers: [
    TableService,
    NzMessageService
  ]
})
export class MoviesModule {
}
