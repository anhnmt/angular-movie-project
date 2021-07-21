import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MovieEpisodeIndexComponent} from './movie-episode-index/movie-episode-index.component';

const routes: Routes = [
  {
    path: '',
    component: MovieEpisodeIndexComponent,
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
export class MovieEpisodeRoutingModule {
}
