import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientRoutingModule} from './client-routing.module';
import {ClientComponent} from './client.component';
import {DetailComponent} from './detail/detail.component';
import {SearchComponent} from './search/search.component';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [ClientComponent, DetailComponent, SearchComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule {
}
