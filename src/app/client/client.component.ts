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

  bodyMovies: Movie[] = [];
  bodySeries: Movie[] = [];
  bodyCartoons: Movie[] = [];
  bodyCinemas: Movie[] = [];

  topMoviesSidebar: Movie[] = [];
  topSeriesSidebar: Movie[] = [];

  constructor(
    private clientService: ClientService,
  ) {
    forkJoin([
      this.clientService.getAllTopMoviesBody(),
      this.clientService.getAllTopMoviesSidebar(),
    ])
      .subscribe(([body, sidebar]) => {
        // console.log(body.data);

        this.bodyMovies = body.data?.movies;
        this.bodySeries = body.data?.series;
        this.bodyCartoons = body.data?.cartoons;
        this.bodyCinemas = body.data?.cinemas;

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
