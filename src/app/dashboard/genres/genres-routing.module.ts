import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {GenreIndexComponent} from './genre-index/genre-index.component';
import {GenreCreateComponent} from './genre-create/genre-create.component';
import {GenreEditComponent} from './genre-edit/genre-edit.component';

const routes: Routes = [
  {
    path: '',
    component: GenreIndexComponent,
    data: {
      title: 'Dashboard ',
      headerDisplay: 'none'
    },
    children: [
      {
        path: 'create',
        component: GenreCreateComponent,
        data: {
          title: 'Dashboard ',
          headerDisplay: 'none'
        },
      },
      {
        path: ':genreId/edit',
        component: GenreEditComponent,
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
export class GenresRoutingModule {
}
