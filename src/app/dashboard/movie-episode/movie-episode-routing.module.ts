import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MovieEpisodeIndexComponent} from './movie-episode-index/movie-episode-index.component';
import {MovieEpisodeCreateComponent} from './movie-episode-create/movie-episode-create.component';
import {MovieEpisodeEditComponent} from './movie-episode-edit/movie-episode-edit.component';

const routes: Routes = [
  {
    path: '',
    component: MovieEpisodeIndexComponent,
    data: {
      title: 'Dashboard ',
      headerDisplay: 'none'
    },
    children: [
      {
        path: 'create',
        component: MovieEpisodeCreateComponent,
        data: {
          title: 'Dashboard ',
          headerDisplay: 'none'
        },
      },
      {
        path: ':episodeId/edit',
        component: MovieEpisodeEditComponent,
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
export class MovieEpisodeRoutingModule {
}
