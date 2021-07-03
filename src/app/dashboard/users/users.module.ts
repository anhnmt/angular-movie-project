import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {UsersRoutingModule} from './users-routing.module';
import {UserIndexComponent} from './user-index/user-index.component';
import {UserCreateComponent} from './user-create/user-create.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzAvatarModule} from 'ng-zorro-antd/avatar';
import {NzSelectModule} from 'ng-zorro-antd/select';
import {NzInputModule} from 'ng-zorro-antd/input';
import {NzCardModule} from 'ng-zorro-antd/card';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableService} from '../../shared/services/table.service';
import {NzIconModule} from 'ng-zorro-antd/icon';
import {NzFormModule} from 'ng-zorro-antd/form';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import {NzDatePickerModule} from 'ng-zorro-antd/date-picker';
import {UserEditComponent} from './user-edit/user-edit.component';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {NzMessageService} from 'ng-zorro-antd/message';
import {UserService} from '../../shared/services/user.service';

@NgModule({
  declarations: [UserIndexComponent, UserCreateComponent, UserEditComponent],
    imports: [
        CommonModule,
        UsersRoutingModule,
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
    NzMessageService,
    UserService
  ]
})
export class UsersModule {
}
