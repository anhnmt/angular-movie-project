import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieEpisodeRoutingModule } from './movie-episode-routing.module';
import { MovieEpisodeIndexComponent } from './movie-episode-index/movie-episode-index.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';


@NgModule({
  declarations: [MovieEpisodeIndexComponent],
  imports: [
    CommonModule,
    MovieEpisodeRoutingModule,
    NzTableModule,
    NzDrawerModule
  ]
})
export class MovieEpisodeModule { }
