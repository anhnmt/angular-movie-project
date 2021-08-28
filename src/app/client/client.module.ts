import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ClientRoutingModule} from './client-routing.module';
import {ClientComponent} from './client.component';
import {DetailComponent} from './detail/detail.component';
import {SearchComponent} from './search/search.component';
import {SharedModule} from '../shared/shared.module';
import {SearchTypeComponent} from './search/search-type.component';
import {SearchGenreComponent} from './search/search-genre.component';
import {SearchCountryComponent} from './search/search-country.component';
import {NzPaginationModule} from '~/ng-zorro-antd/pagination';

@NgModule({
  declarations: [ClientComponent, DetailComponent, SearchComponent, SearchTypeComponent, SearchGenreComponent, SearchCountryComponent],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule,
    NzPaginationModule
  ]
})
export class ClientModule {
}
