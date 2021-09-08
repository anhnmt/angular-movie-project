import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MovieTypeIndexComponent} from './movie-type-index/movie-type-index.component';
import {MovieTypeCreateComponent} from './movie-type-create/movie-type-create.component';
import {MovieTypeEditComponent} from './movie-type-edit/movie-type-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MovieTypeIndexComponent,
    data: {
      title: 'Dashboard ',
      headerDisplay: 'none'
    },
    children: [
      {
        path: 'create',
        component: MovieTypeCreateComponent,
        data: {
          title: 'Dashboard ',
          headerDisplay: 'none'
        },
      },
      {
        path: ':movieTypeId/edit',
        component: MovieTypeEditComponent,
        data: {
          title: 'Dashboard ',
          headerDisplay: 'none'
        },
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MovieTypeRoutingModule {
}
