import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {UserIndexComponent} from './user-index/user-index.component';
import {UserCreateComponent} from './user-create/user-create.component';
import {UserEditComponent} from './user-edit/user-edit.component';
import {UserResolver} from '../../shared/securities/user.resolver';

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
        data: {
          title: 'Dashboard ',
          headerDisplay: 'none'
        },
      },
      {
        path: ':userId/edit',
        component: UserEditComponent,
        data: {
          title: 'Dashboard ',
          headerDisplay: 'none'
        },
        resolve: {
          user: UserResolver
        }
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
