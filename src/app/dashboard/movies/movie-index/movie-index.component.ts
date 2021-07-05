import {Component, OnInit} from '@angular/core';
import {StatusUtils} from '../../../shared/utils/statusUtils';
import {Genre} from '../../../shared/interfaces/genre';
import {TableService} from '../../../shared/services/table.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {GenreService} from '../../../shared/services/genre.service';
import {SharedService} from '../../../shared/services/shared.service';

@Component({
  selector: 'app-movie-index',
  templateUrl: './movie-index.component.html',
  styleUrls: ['./movie-index.component.css']
})
export class MovieIndexComponent implements OnInit {
  mapDefaultStatus = StatusUtils.mapDefaultStatus;

  searchInput: string | number;
  displayData = [];

  genres: Genre[] = [];

  orderColumn = [
    {
      title: 'ID',
      compare: (a: Genre, b: Genre) => a.genre_id - b.genre_id,
    },
    {
      title: 'Tên phim',
      compare: (a: Genre, b: Genre) => a.name.localeCompare(b.name)
    },
    {
      title: 'Mô tả',
      compare: (a: Genre, b: Genre) => a.slug.localeCompare(b.slug)
    },
    {
      title: 'Trạng thái',
      compare: (a: Genre, b: Genre) => a.status - b.status,
    },
    {
      title: 'Kiểu phim',
      compare: (a: Genre, b: Genre) => a.status - b.status,
    },
    {
      title: ''
    }
  ];

  constructor(
    private tableSvc: TableService,
    private nzMessageService: NzMessageService,
    private genreService: GenreService,
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
    const data = this.genres;
    this.displayData = this.tableSvc.search(this.searchInput, data);
  }

  list(): void {
    this.genres = [];

    this.genreService.getAllGenres().subscribe((response) => {
      this.genres = response.data;
      console.log(this.genres);

      this.displayData = this.genres;
    });
  }

  delete(genreId: number): void {
    this.genreService.deleteGenreByGenreId(genreId).subscribe(() => {
      this.list();
      this.nzMessageService.success('Xóa Thành Công');
    });
  }
}

