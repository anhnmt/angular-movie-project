import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MoviesRoutingModule} from './movies-routing.module';
import { MovieIndexComponent } from './movie-index/movie-index.component';

@NgModule({
  declarations: [MovieIndexComponent],
  imports: [
    CommonModule,
    MoviesRoutingModule
  ]
})
export class MoviesModule {
}
