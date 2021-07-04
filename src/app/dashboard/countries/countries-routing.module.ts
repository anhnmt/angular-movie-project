import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CountryIndexComponent} from './country-index/country-index.component';

const routes: Routes = [
  {
    path: '',
    component: CountryIndexComponent,
    data: {
      title: 'Dashboard ',
      headerDisplay: 'none'
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CountriesRoutingModule {
}
