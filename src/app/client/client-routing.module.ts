import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from './client.component';
import {SearchComponent} from './search/search.component';
import {DetailComponent} from './detail/detail.component';
import {SearchTypeComponent} from './search/search-type.component';
import {SearchGenreComponent} from './search/search-genre.component';
import {SearchCountryComponent} from './search/search-country.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
    data: {
      title: 'Dashboard ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'phim/:movieSlug',
    component: DetailComponent,
    data: {
      title: 'Dashboard ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'search',
    component: SearchComponent,
    data: {
      title: 'Dashboard ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'kieu-phim/:movieType',
    component: SearchTypeComponent,
    data: {
      title: 'Dashboard ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'the-loai/:movieGenre',
    component: SearchGenreComponent,
    data: {
      title: 'Dashboard ',
      headerDisplay: 'none'
    }
  },
  {
    path: 'quoc-gia/:movieCountry',
    component: SearchCountryComponent,
    data: {
      title: 'Dashboard ',
      headerDisplay: 'none'
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule {
}
