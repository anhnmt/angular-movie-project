import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MovieEpisodeRoutingModule } from './movie-episode-routing.module';
import { MovieEpisodeIndexComponent } from './movie-episode-index/movie-episode-index.component';
import {NzTableModule} from 'ng-zorro-antd/table';
import {NzDrawerModule} from 'ng-zorro-antd/drawer';
import { MovieEpisodeCreateComponent } from './movie-episode-create/movie-episode-create.component';
import { MovieEpisodeEditComponent } from './movie-episode-edit/movie-episode-edit.component';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzToolTipModule} from 'ng-zorro-antd/tooltip';
import {SharedModule} from '../../shared/shared.module';
import {NzPopconfirmModule} from 'ng-zorro-antd/popconfirm';
import {NzBadgeModule} from 'ng-zorro-antd/badge';
import {NzInputModule} from 'ng-zorro-antd/input';


@NgModule({
  declarations: [MovieEpisodeIndexComponent, MovieEpisodeCreateComponent, MovieEpisodeEditComponent],
  imports: [
    CommonModule,
    MovieEpisodeRoutingModule,
    NzTableModule,
    NzDrawerModule,
    NzButtonModule,
    NzToolTipModule,
    SharedModule,
    NzPopconfirmModule,
    NzBadgeModule,
    NzInputModule
  ]
})
export class MovieEpisodeModule { }
