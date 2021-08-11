import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {forkJoin, Subject} from 'rxjs';
import {ClientService} from '../../shared/services/client.service';
import {Movie} from '../../shared/interfaces/movie';
import {Episode} from 'src/app/shared/interfaces/episode';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, AfterViewInit, OnDestroy {

  disablePlay = false;
  movieId: number;
  movie: Movie;
  movieRelated: Movie[] = [];
  episodes: Episode[] = [];
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
          this.movieId = this.movie?.movie_id;

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

  playMovie(): void {
    this.disablePlay = true;
    console.log('play movie');

    this.clientService.getMovieEpisodes(this.movieId)
      .subscribe((episodes) => {
        this.episodes = episodes.data;

        console.log(this.episodes);

      }, (error) => {
        console.log(error);
      });
  }

}
