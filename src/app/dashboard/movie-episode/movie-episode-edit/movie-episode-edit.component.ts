import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {HelperUtils} from '../../../shared/utils/helperUtils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalUtils} from '../../../shared/utils/globalUtils';
import {MovieEpisodeService} from '../../../shared/services/movie-episode.service';
import {MovieEpisode} from '../../../shared/interfaces/movie-episode';
import {EpisodeDetail} from '../../../shared/interfaces/episode-detail';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-movie-episode-edit',
  templateUrl: './movie-episode-edit.component.html',
  styleUrls: ['./movie-episode-edit.component.css']
})
export class MovieEpisodeEditComponent implements OnInit, AfterViewInit, OnDestroy {

  isLoading = false;
  visible = false;
  movieId: number;
  episodeId: number;
  status = GlobalUtils.getDefaultStatus();
  mapDefaultStatus = GlobalUtils.mapDefaultStatus;
  validateForm: FormGroup;
  movieEpisode: MovieEpisode;
  episodeDetails: EpisodeDetail[] = [];
  editCache: { [key: number]: { edit: boolean; data: EpisodeDetail } } = {};

  orderColumn = [
    {
      title: 'ID',
      compare: (a: EpisodeDetail, b: EpisodeDetail) => a.episode_id - b.episode_id,
    },
    {
      title: 'Server phim',
      compare: (a: EpisodeDetail, b: EpisodeDetail) => a.name.localeCompare(b.name)
    },
    {
      title: 'Trạng thái',
      compare: (a: EpisodeDetail, b: EpisodeDetail) => a.status?.value - b.status?.value,
    },
    {
      title: ''
    }
  ];

  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private movieEpisodeService: MovieEpisodeService,
    private nzMessageService: NzMessageService,
  ) {
    const selectedStatus = this.status[0].value || null;

    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      status: [selectedStatus, [Validators.required]],
      episode_details: [null],
    });

    this.route.parent.params
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((params: any) => {
        const {movieId} = params;
        this.movieId = movieId;
      });

    this.route.params
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((params: any) => {
        const {episodeId} = params;
        this.episodeId = episodeId;

        this.movieEpisodeService.getMovieEpisodeDetailsByMovieIdAndEpisodeId(this.movieId, this.episodeId)
          .subscribe((movieEpisode) => {
            this.movieEpisode = movieEpisode.data;
            this.episodeDetails = this.movieEpisode.episode_details;
            this.updateEditCache();

            console.log(this.episodeDetails);

            this.validateForm.patchValue({
              name: this.movieEpisode.name,
              status: this.movieEpisode.status,
              episode_details: this.episodeDetails,
            });
          });
      });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.visible = true;
    }, 1);
  }

  close(): void {
    this.visible = false;

    setTimeout(
      () => this.router.navigate(['/dashboard', 'movies', this.movieId, 'episodes']),
      100
    );
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  startEdit(id: number): void {
    this.editCache[id].edit = true;
  }

  cancelEdit(id: number): void {
    const index = this.episodeDetails.findIndex(item => item.episode_detail_id === id);
    this.editCache[id] = {
      data: {...this.episodeDetails[index]},
      edit: false
    };
  }

  saveEdit(id: number): void {
    const index = this.episodeDetails.findIndex(item => item.episode_detail_id === id);
    Object.assign(this.episodeDetails[index], this.editCache[id].data);
    this.editCache[id].edit = false;
  }

  updateEditCache(): void {
    this.episodeDetails.forEach(item => {
      this.editCache[item.episode_detail_id] = {
        edit: false,
        data: {...item}
      };
    });
  }

  submitForm(): void {
    this.isLoading = true;

    HelperUtils.formValidator(this.validateForm);

    // stop here if form is invalid
    if (this.validateForm.invalid) {
      this.isLoading = false;
      return;
    }

    // this.genreService.updateGenreByGenreId(this.genre.genre_id, this.validateForm.value)
    //   .subscribe((success) => {
    //     this.sharedService.emitChange();
    //     this.close();
    this.nzMessageService.success('Cập nhật Thành Công');
    //   }, (error) => {
    //     this.nzMessageService.error(error.message);
    this.isLoading = false;
    //   });
  }

}