import {Component, OnInit} from '@angular/core';
import {TableService} from '../../../shared/services/table.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SharedService} from '../../../shared/services/shared.service';
import {Genre} from '../../../shared/interfaces/genre';
import {GenreService} from '../../../shared/services/genre.service';
import {GlobalUtils} from '../../../shared/utils/globalUtils';

@Component({
  selector: 'app-genre-index',
  templateUrl: './genre-index.component.html',
  styleUrls: ['./genre-index.component.css']
})
export class GenreIndexComponent implements OnInit {
  mapDefaultStatus = GlobalUtils.mapDefaultStatus;

  searchInput: string | number;
  displayData = [];

  genres: Genre[] = [];

  orderColumn = [
    {
      title: 'ID',
      compare: (a: Genre, b: Genre) => a.genre_id - b.genre_id,
    },
    {
      title: 'Thể loại',
      compare: (a: Genre, b: Genre) => a.name.localeCompare(b.name)
    },
    {
      title: 'Đường dẫn',
      compare: (a: Genre, b: Genre) => a.slug.localeCompare(b.slug)
    },
    {
      title: 'Trạng thái',
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
