import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ClientService} from '../../shared/services/client.service';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {Movie} from 'src/app/shared/interfaces/movie';

@Component({
  selector: 'app-search-type',
  templateUrl: './search.component.html',
  styleUrls: [
    './search.component.css',
  ]
})
export class SearchTypeComponent implements OnInit, AfterViewInit, OnDestroy {

  movies: Movie[] = [];

  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
  ) {
    this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe((params: any) => {
      const {movieType} = params;

      this.clientService.getMovieType(movieType)
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
