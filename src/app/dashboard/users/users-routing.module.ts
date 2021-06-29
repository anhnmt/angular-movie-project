import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserIndexComponent} from './user-index/user-index.component';
import {UserCreateComponent} from './user-create/user-create.component';

const routes: Routes = [
  {
    path: '',
    component: UserIndexComponent,
    data: {
      title: 'Dashboard ',
      headerDisplay: 'none'
    },
    children: [
      {
        path: 'create',
        component: UserCreateComponent,
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule {
}
