import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {GenresRoutingModule} from './genres-routing.module';
import {GenreIndexComponent} from './genre-index/genre-index.component';
import {GenreCreateComponent} from './genre-create/genre-create.component';
import {GenreEditComponent} from './genre-edit/genre-edit.component';
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
import {SharedModule} from '@/app/shared/shared.module';


@NgModule({
  declarations: [GenreIndexComponent, GenreCreateComponent, GenreEditComponent],
    imports: [
        CommonModule,
        GenresRoutingModule,
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
        ReactiveFormsModule,
        SharedModule
    ],
  providers: [
    TableService,
    NzMessageService
  ]
})
export class GenresModule {
}
