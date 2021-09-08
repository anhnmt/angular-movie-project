import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {HelperUtils} from '@/app/shared/utils/helperUtils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalUtils} from '@/app/shared/utils/globalUtils';
import {MovieEpisodeService} from '@/app/shared/services/movie-episode.service';
import {Episode} from '@/app/shared/interfaces/episode';
import {EpisodeDetail} from '@/app/shared/interfaces/episode-detail';
import {NzMessageService} from 'ng-zorro-antd/message';
import {NzModalService} from 'ng-zorro-antd/modal';
import {EpisodeDetailEditComponent} from '@/app/components/episode-details/episode-detail-edit/episode-detail-edit.component';
import {EpisodeDetailCreateComponent} from '@/app/components/episode-details/episode-detail-create/episode-detail-create.component';
import {EpisodeService} from '@/app/shared/services/episode.service';
import {SharedService} from '@/app/shared/services/shared.service';

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
  movieEpisode: Episode;
  episodeDetails: EpisodeDetail[] = [];

  orderColumn = [
    {
      title: 'ID',
      compare: (a: EpisodeDetail, b: EpisodeDetail) => a?.episode_id - b?.episode_id,
    },
    {
      title: 'Server phim',
      compare: (a: EpisodeDetail, b: EpisodeDetail) => a?.name.localeCompare(b?.name)
    },
    {
      title: 'Trạng thái',
      compare: (a: EpisodeDetail, b: EpisodeDetail) => a?.status - b?.status,
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
    private episodeService: EpisodeService,
    private nzMessageService: NzMessageService,
    private modalService: NzModalService,
    private sharedService: SharedService,
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

        this.list();
      });
  }

  list(): void {
    this.episodeService.getEpisodeDetails(this.episodeId)
      .subscribe((movieEpisode) => {
        this.movieEpisode = movieEpisode.data;
        this.episodeDetails = this.movieEpisode.episode_details;

        this.validateForm.patchValue({
          name: this.movieEpisode.name,
          status: this.movieEpisode.status,
          episode_details: this.episodeDetails,
        });
      });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.visible = true;

      HelperUtils.formChangedTitle(this.validateForm);
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

  create(): void {
    this.modalService.create({
      nzTitle: 'Thêm server phim',
      nzContent: EpisodeDetailCreateComponent,
      nzMaskClosable: false,
      nzClosable: false,
      nzComponentParams: {
        episodeId: this.episodeId,
      },
    });

    this.modalService.afterAllClose.subscribe(() => this.list());
  }

  edit(episodeDetailId: number): void {
    this.modalService.create({
      nzTitle: 'Sửa server phim',
      nzContent: EpisodeDetailEditComponent,
      nzComponentParams: {
        episodeId: this.episodeId,
        episodeDetailId,
      },
    });

    this.modalService.afterAllClose.subscribe(() => this.list());
  }

  delete(episodeDetailId: number): void {
    this.episodeService.deleteEpisodeDetail(this.episodeId, episodeDetailId).subscribe(() => {
      this.list();
      this.nzMessageService.success('Xóa Thành Công');
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

    this.episodeService.updateEpisode(this.episodeId, this.validateForm.value)
      .subscribe(() => {
        this.sharedService.emitChange();
        this.close();
        this.nzMessageService.success('Cập nhật Thành Công');
      }, (error) => {
        this.nzMessageService.error(error.message);
        this.isLoading = false;
      });
  }

}
