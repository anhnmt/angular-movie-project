import {Component, OnInit} from '@angular/core';
import {DashboardService} from '@/app/shared/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})

export class DashboardComponent implements OnInit {

  countMovie = 0;
  countGenre = 0;
  countCountry = 0;
  countBanner = 0;

  ordersList = [];

  constructor(
    private dashboardService: DashboardService
  ) {
    this.dashboardService.getDashboardAnalyzer().subscribe((response) => {
      const data = response.data;

      this.countMovie = data?.movies;
      this.countGenre = data?.genres;
      this.countCountry = data?.countries;
      this.countBanner = data?.banners;
    });
  }

  ngOnInit(): void {
  }
}
