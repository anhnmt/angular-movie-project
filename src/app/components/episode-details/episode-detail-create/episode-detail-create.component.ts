import {AfterViewInit, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {GlobalUtils} from '../../../shared/utils/globalUtils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {HelperUtils} from '../../../shared/utils/helperUtils';
import {EpisodeService} from '../../../shared/services/episode.service';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-episode-detail-create',
  templateUrl: './episode-detail-create.component.html',
  styleUrls: ['./episode-detail-create.component.css']
})
export class EpisodeDetailCreateComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() episodeId: number;

  isLoading = false;
  visible = false;
  status = GlobalUtils.getDefaultStatus();
  validateForm: FormGroup;

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

    console.log(this.validateForm.value);

    this.episodeService.createEpisodeDetail(this.episodeId, this.validateForm.value).subscribe(() => {
      this.close();
      this.nzMessageService.success('Thêm Thành Công');
    }, (error) => {
      this.nzMessageService.error(error.error?.message);
      this.isLoading = false;
    });
  }

}
