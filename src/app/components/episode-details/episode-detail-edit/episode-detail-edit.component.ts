import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {GlobalUtils} from '../../../shared/utils/globalUtils';
import {Subject} from 'rxjs';
import {HelperUtils} from '../../../shared/utils/helperUtils';
import {EpisodeService} from '../../../shared/services/episode.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {EpisodeDetail} from '../../../shared/interfaces/episode-detail';

@Component({
  selector: 'app-episode-detail-edit',
  templateUrl: './episode-detail-edit.component.html',
  styleUrls: ['./episode-detail-edit.component.css']
})
export class EpisodeDetailEditComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() episodeId: number;
  @Input() episodeDetailId: number;

  isLoading = false;
  visible = false;
  status = GlobalUtils.getDefaultStatus();
  validateForm: FormGroup;
  episodeDetail: EpisodeDetail;

  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private modalRef: NzModalRef,
    private episodeService: EpisodeService,
    private nzMessageService: NzMessageService,
  ) {
    const selectedStatus = this.status[0]?.value || null;

    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      link: [null, [Validators.required]],
      episode_type_id: [1, [Validators.required]],
      status: [selectedStatus, [Validators.required]],
    });
  }

  ngOnInit(): void {

    this.episodeService
      .getEpisodeDetailById(this.episodeId, this.episodeDetailId)
      .subscribe((success) => {
        this.episodeDetail = success.data;

        this.validateForm.patchValue({
          name: this.episodeDetail.name,
          link: this.episodeDetail.link,
          episode_type_id: this.episodeDetail.episode_type_id,
          status: this.episodeDetail.status,
        });
      });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.visible = true;

      HelperUtils.formChangedTitle(this.validateForm);
    }, 1);
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  close(): void {
    this.modalRef.destroy();
  }

  submitForm(): void {
    this.isLoading = true;

    HelperUtils.formValidator(this.validateForm);

    // stop here if form is invalid
    if (this.validateForm.invalid) {
      this.isLoading = false;
      return;
    }

    this.episodeService.updateEpisodeDetail(this.episodeId, this.episodeDetailId, this.validateForm.value).subscribe(() => {
      this.close();
      this.nzMessageService.success('Cập Nhật Thành Công');
    }, (error) => {
      this.nzMessageService.error(error.error?.message);
      this.isLoading = false;
    });
  }

}
