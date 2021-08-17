import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Movie} from '../../shared/interfaces/movie';
import {Subject} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {ClientService} from '../../shared/services/client.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-search-country',
  templateUrl: './search.component.html',
  styleUrls: [
    './search.component.css',
  ]
})
export class SearchCountryComponent implements OnInit, AfterViewInit, OnDestroy {

  movies: Movie[] = [];

  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
  ) {
    this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe((params: any) => {
      const {movieCountry} = params;

      this.clientService.getMovieCountry(movieCountry)
        .subscribe((movies) => {
          this.movies = movies.data;
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

}
