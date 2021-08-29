import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Movie} from '../../shared/interfaces/movie';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ClientService} from '../../shared/services/client.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-search-genre',
  templateUrl: './search.component.html',
  styleUrls: [
    './search.component.css',
  ]
})
export class SearchGenreComponent implements OnInit, AfterViewInit, OnDestroy {

  movieGenre: string;
  movies: Movie[] = [];
  total = 0;
  page = 1;

  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
  ) {
    this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe((params: any) => {
      const {movieGenre} = params;
      this.movieGenre = movieGenre;

      this.clientService.getMovieGenre(this.movieGenre)
        .subscribe((movies) => {
          this.movies = movies.data?.result;
          this.total = movies.data?.total;
          this.page = movies.data?.page;
        }, (error) => {
          console.log(error);
        });
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  ngAfterViewInit(): void {
  }

  changePageIndex(event): void {
    this.clientService.getMovieGenre(this.movieGenre, event)
      .subscribe((movies) => {
        this.movies = movies.data?.result;
        this.total = movies.data?.total;
        this.page = movies.data?.page;
      }, (error) => {
        console.log(error);
      });
  }

}

