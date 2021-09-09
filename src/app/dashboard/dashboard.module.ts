import {NgModule} from '@angular/core';
import {SharedModule} from '../shared/shared.module';
import {DashboardRoutingModule} from './dashboard-routing.module';
import {DashboardComponent} from './dashboard.component';

/** Import any ng-zorro components as the module required except icon module */
import {NzButtonModule} from 'ng-zorro-antd/button';
import {AuthService} from '@/app/shared/services/auth.service';
import {NzAvatarModule} from '~/ng-zorro-antd/avatar';
import {NzBadgeModule} from '~/ng-zorro-antd/badge';
import {NzProgressModule} from '~/ng-zorro-antd/progress';
import {NzCardModule} from '~/ng-zorro-antd/card';
import {NgChartjsModule} from '~/ng-chartjs';
import {NzRateModule} from '~/ng-zorro-antd/rate';
import {NzTableModule} from '~/ng-zorro-antd/table';
import {ProfileComponent} from './profile/profile.component';
import {NzListModule} from '~/ng-zorro-antd/list';
import {NzSwitchModule} from '~/ng-zorro-antd/switch';
import {NzTabsModule} from '~/ng-zorro-antd/tabs';
import {NzFormModule} from '~/ng-zorro-antd/form';
import {NzSelectModule} from '~/ng-zorro-antd/select';
import {ReactiveFormsModule} from '~/@angular/forms';
import {NzDatePickerModule} from '~/ng-zorro-antd/date-picker';
import {NzUploadModule} from '~/ng-zorro-antd/upload';
import {NzInputModule} from '~/ng-zorro-antd/input';

/* Assign all ng-zorro modules to this array */
const antdModule = [
  NzButtonModule,
];

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    ...antdModule,
    NzAvatarModule,
    NzBadgeModule,
    NzProgressModule,
    NzCardModule,
    NgChartjsModule,
    NzRateModule,
    NzTableModule,
    NzListModule,
    NzSwitchModule,
    NzTabsModule,
    NzFormModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzUploadModule,
    NzInputModule,
  ],
  declarations: [
    DashboardComponent,
    ProfileComponent,
  ],
  providers: [
    AuthService
  ]
})
export class DashboardModule {
}
