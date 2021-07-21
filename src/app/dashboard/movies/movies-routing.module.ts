import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MovieIndexComponent} from './movie-index/movie-index.component';
import {MovieCreateComponent} from './movie-create/movie-create.component';
import {MovieEditComponent} from './movie-edit/movie-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MovieIndexComponent,
    data: {
      title: 'Dashboard ',
      headerDisplay: 'none'
    },
    children: [
      {
        path: 'create',
        component: MovieCreateComponent,
        data: {
          title: 'Dashboard ',
          headerDisplay: 'none'
        },
      },
      {
        path: ':movieId/edit',
        component: MovieEditComponent,
        data: {
          title: 'Dashboard ',
          headerDisplay: 'none'
        },
      },
      {
        path: ':movieId/episodes',
        loadChildren: () => import('../movie-episode/movie-episode.module').then(m => m.MovieEpisodeModule),
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
export class MoviesRoutingModule {
}
