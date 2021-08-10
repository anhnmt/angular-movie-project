import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {forkJoin, Subject} from 'rxjs';
import {ClientService} from '../../shared/services/client.service';
import {Movie} from '../../shared/interfaces/movie';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, AfterViewInit, OnDestroy {

  movie: Movie;
  movieRelated: Movie[] = [];
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
  ) {
    this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe((params: any) => {
      const {movieSlug} = params;

      forkJoin([
        this.clientService.getMovieDetail(movieSlug)
      ])
        .subscribe(([detail]) => {
          this.movie = detail.data;

          this.movieRelated = this.movie?.movie_related;
          // console.log(this.movieRelated);

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
