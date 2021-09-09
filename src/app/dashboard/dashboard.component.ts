import {Component, OnInit} from '@angular/core';
import {DashboardService} from '@/app/shared/services/dashboard.service';
import {Movie} from '@/app/shared/interfaces/movie';
import {GlobalUtils} from '@/app/shared/utils/globalUtils';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {

  mapDefaultStatus = GlobalUtils.mapDefaultStatus;
  countMovie = 0;
  countGenre = 0;
  countCountry = 0;
  countBanner = 0;

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
      compare: (a: Movie, b: Movie) => a.movie_type_id - b.movie_type_id,
    },
    {
      title: 'Trạng thái',
      compare: (a: Movie, b: Movie) => a?.status - b?.status,
    },
  ];

  constructor(
    private dashboardService: DashboardService
  ) {
    this.dashboardService.getDashboardAnalyzer().subscribe((response) => {
      const data = response.data;

      this.countMovie = data?.movies;
      this.countGenre = data?.genres;
      this.countCountry = data?.countries;
      this.countBanner = data?.banners;

      this.movies = data?.latest_movies;
      this.displayData = this.movies;
    });
  }

  ngOnInit(): void {
  }
}
