import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '../../../shared/services/shared.service';
import {MovieEpisodeService} from '../../../shared/services/movie-episode.service';
import {MovieEpisode} from '../../../shared/interfaces/movie-episode';
import {takeUntil} from 'rxjs/operators';
import {GlobalUtils} from '../../../shared/utils/globalUtils';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-movie-episode-index',
  templateUrl: './movie-episode-index.component.html',
  styleUrls: ['./movie-episode-index.component.css']
})
export class MovieEpisodeIndexComponent implements OnInit, AfterViewInit, OnDestroy {

  mapDefaultStatus = GlobalUtils.mapDefaultStatus;
  isLoading = false;
  visible = false;
  movieId: number;
  displayData = [];
  movieEpisodes: MovieEpisode[] = [];
  orderColumn = [
    {
      title: 'ID',
      compare: (a: MovieEpisode, b: MovieEpisode) => a.episode_id - b.episode_id,
    },
    {
      title: 'Tập phim',
      compare: (a: MovieEpisode, b: MovieEpisode) => a.name.localeCompare(b.name)
    },
    {
      title: 'Trạng thái',
      compare: (a: MovieEpisode, b: MovieEpisode) => a.status?.value - b.status?.value,
    },
    {
      title: ''
    }
  ];

  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private sharedService: SharedService,
    private movieEpisodeService: MovieEpisodeService,
    private nzMessageService: NzMessageService,
  ) {
    this.route.params
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((params: any) => {
        const {movieId} = params;
        this.movieId = movieId;
      });

    this.sharedService.changeEmitted$.subscribe(() => {
      this.list();
    });
  }

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.movieEpisodes = [];

    this.movieEpisodeService.getAllMovieEpisodes(this.movieId)
      .subscribe((movies) => {
        this.movieEpisodes = movies.data;

        this.displayData = [...this.movieEpisodes];
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.visible = true;
    }, 1);
  }

  close(): void {
    this.visible = false;

    setTimeout(
      () => this.router.navigate(['/dashboard', 'movies']),
      100
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  delete(episodeId: number): void {
    this.movieEpisodeService.deleteMovieEpisode(this.movieId, episodeId).subscribe(() => {
      this.list();
      this.nzMessageService.success('Xóa Thành Công');
    });
  }
}
