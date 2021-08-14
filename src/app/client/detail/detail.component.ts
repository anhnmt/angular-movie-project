import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {forkJoin, Subject} from 'rxjs';
import {ClientService} from '../../shared/services/client.service';
import {Movie} from '../../shared/interfaces/movie';
import {Episode} from 'src/app/shared/interfaces/episode';
import {EpisodeDetail} from '../../shared/interfaces/episode-detail';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, AfterViewInit, OnDestroy {

  disableEpisode = true;
  disablePlay = false;
  movieId: number;
  movie: Movie;
  movieRelated: Movie[] = [];
  episodes: Episode[] = [];
  episodeDetails: EpisodeDetail[] = [];

  selectedEpisode: Episode;
  selectedEpisodeDetail: EpisodeDetail;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private route: ActivatedRoute,
    private clientService: ClientService,
  ) {
    this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe((params: any) => {
      const {movieSlug} = params;
      this.resetPlay();

      forkJoin([
        this.clientService.getMovieDetail(movieSlug)
      ])
        .subscribe(([detail]) => {
          this.movie = detail.data;
          this.movieId = this.movie?.movie_id;

          this.movieRelated = this.movie?.movie_related;

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
    this.clientService.getMovieEpisodes(this.movieId)
      .subscribe((episodes) => {
        this.episodes = episodes.data;

        this.disableEpisode = false;
        this.disablePlay = true;

        this.selectedEpisode = this.episodes[0] || null;
        // console.log(this.selectedEpisode);

        this.episodeDetails = this.selectedEpisode?.episode_details;
        // console.log(this.episodeDetails);

        this.selectedEpisodeDetail = this.episodeDetails[0] || null;

      }, (error) => {
        console.log(error);
      });
  }

  playEpisode(episode: Episode): void {
    this.selectedEpisode = episode;

    this.episodeDetails = this.selectedEpisode.episode_details;
  }

  changeServer(episodeDetail: EpisodeDetail): void {
    console.log(episodeDetail);

    this.selectedEpisodeDetail = episodeDetail;
  }

  resetPlay(): void {
    this.disableEpisode = true;
    this.disablePlay = false;
  }

}
