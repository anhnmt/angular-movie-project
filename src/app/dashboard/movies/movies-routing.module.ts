import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MovieIndexComponent} from './movie-index/movie-index.component';

const routes: Routes = [
  {
    path: '',
    component: MovieIndexComponent,
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
export class MoviesRoutingModule {
}
