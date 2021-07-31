import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ClientService} from '../shared/services/client.service';
import {Movie} from '../shared/interfaces/movie';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: [
    './client.component.css',
  ]
})
export class ClientComponent implements OnInit, AfterViewInit, OnDestroy {

  topMoviesSidebar: Movie[] = [];
  topSeriesSidebar: Movie[] = [];

  constructor(
    private clientService: ClientService,
  ) {
    forkJoin([
      this.clientService.getAllTopMoviesSidebar(),
    ])
      .subscribe(([sidebar]) => {
        // console.log(sidebar.data.movies);
        this.topMoviesSidebar = sidebar.data?.movies;
        this.topSeriesSidebar = sidebar.data?.series;
      });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
  }

  ngOnDestroy(): void {
  }

}
