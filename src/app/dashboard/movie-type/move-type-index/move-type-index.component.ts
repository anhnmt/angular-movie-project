import {Component, OnInit} from '@angular/core';
import {StatusUtils} from '../../../shared/utils/statusUtils';
import {MovieType} from '../../../shared/interfaces/movie-type';
import {TableService} from '../../../shared/services/table.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {MovieTypeService} from '../../../shared/services/movie-type.service';
import {SharedService} from '../../../shared/services/shared.service';

@Component({
  selector: 'app-move-type-index',
  templateUrl: './move-type-index.component.html',
  styleUrls: ['./move-type-index.component.css']
})
export class MoveTypeIndexComponent implements OnInit {
  mapDefaultStatus = StatusUtils.mapDefaultStatus;

  searchInput: string | number;
  displayData = [];

  movieTypes: MovieType[] = [];

  orderColumn = [
    {
      title: 'ID',
      compare: (a: MovieType, b: MovieType) => a.movie_type_id - b.movie_type_id,
    },
    {
      title: 'Kiểu phim',
      compare: (a: MovieType, b: MovieType) => a.name.localeCompare(b.name)
    },
    {
      title: 'Đường dẫn',
      compare: (a: MovieType, b: MovieType) => a.slug.localeCompare(b.slug)
    },
    {
      title: 'Trạng thái',
      compare: (a: MovieType, b: MovieType) => a.status - b.status,
    },
    {
      title: ''
    }
  ];

  constructor(
    private tableSvc: TableService,
    private nzMessageService: NzMessageService,
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
    const data = this.movieTypes;
    this.displayData = this.tableSvc.search(this.searchInput, data);
  }

  list(): void {
    this.movieTypes = [];

    this.movieTypeService.getAllMovieTypes().subscribe((response) => {
      this.movieTypes = response.data;
      console.log(this.movieTypes);

      this.displayData = this.movieTypes;
    });
  }

  delete(genreId: number): void {
    this.movieTypeService.deleteMovieTypeByMovieTypeId(genreId).subscribe(() => {
      this.list();
      this.nzMessageService.success('Xóa Thành Công');
    });
  }
}
