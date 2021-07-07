import {Component, OnInit} from '@angular/core';
import {StatusUtils} from '../../../shared/utils/statusUtils';
import {Movie} from '../../../shared/interfaces/movie';
import {TableService} from '../../../shared/services/table.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SharedService} from '../../../shared/services/shared.service';
import {MovieService} from '../../../shared/services/movie.service';
import {MovieTypeService} from '../../../shared/services/movie-type.service';

@Component({
  selector: 'app-movie-index',
  templateUrl: './movie-index.component.html',
  styleUrls: ['./movie-index.component.css']
})
export class MovieIndexComponent implements OnInit {
  mapDefaultStatus = StatusUtils.mapDefaultStatus;
  mapMovieType = null;
  searchInput: string | number;
  displayData = [];
  movies: Movie[] = [];
  orderColumn = [
    {
      title: 'ID',
      compare: (a: Movie, b: Movie) => a.movie_id - b.movie_id,
    },
    {
      title: 'Tên phim',
      compare: (a: Movie, b: Movie) => a.name.localeCompare(b.name)
    },
    {
      title: 'Đường dẫn',
      compare: (a: Movie, b: Movie) => a.slug.localeCompare(b.slug)
    },
    {
      title: 'Kiểu phim',
      compare: (a: Movie, b: Movie) => a.movie_type?.movie_type_id - b.movie_type?.movie_type_id,
    },
    {
      title: 'Trạng thái',
      compare: (a: Movie, b: Movie) => a.status - b.status,
    },
    {
      title: ''
    }
  ];

  constructor(
    private tableSvc: TableService,
    private nzMessageService: NzMessageService,
    private movieService: MovieService,
    private movieTypeService: MovieTypeService,
    private sharedService: SharedService,
  ) {
    this.sharedService.changeEmitted$.subscribe(() => {
      this.list();
    });
  }

  ngOnInit(): void {
    this.list();
  }

  search(): void {
    const data = this.movies;
    this.displayData = this.tableSvc.search(this.searchInput, data);
  }

  list(): void {
    this.movies = [];

    this.movieService.getAllMovies()
      .subscribe((movies) => {
        this.movies = movies.data;

        this.displayData = this.movies;
      });
  }

  delete(movieId: number): void {
    this.movieService.deleteMovieByMovieId(movieId).subscribe(() => {
      this.list();
      this.nzMessageService.success('Xóa Thành Công');
    });
  }
}

