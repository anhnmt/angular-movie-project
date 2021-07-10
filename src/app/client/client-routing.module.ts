import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientComponent} from './client.component';

const routes: Routes = [
  {
    path: '',
    component: ClientComponent,
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
