import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from './client.component';
import {SearchComponent} from './search/search.component';

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
    path: 'search',
    component: SearchComponent,
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
