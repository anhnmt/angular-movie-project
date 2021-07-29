import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {NzModalRef} from 'ng-zorro-antd/modal';
import {GlobalUtils} from '../../../shared/utils/globalUtils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {HelperUtils} from '../../../shared/utils/helperUtils';
import {EpisodeDetailService} from '../../../shared/services/episode-detail.service';

@Component({
  selector: 'app-episode-detail-create',
  templateUrl: './episode-detail-create.component.html',
  styleUrls: ['./episode-detail-create.component.css']
})
export class EpisodeDetailCreateComponent implements OnInit, AfterViewInit, OnDestroy {

  isLoading = false;
  visible = false;
  status = GlobalUtils.getDefaultStatus();
  validateForm: FormGroup;

  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private modalRef: NzModalRef,
    private episodeDetailService: EpisodeDetailService,
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

      HelperUtils.formChangedTitleToSlug(this.validateForm);
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

// console.log(this.validateForm.value);

    // this.movieService.createMovie(this.validateForm.value).subscribe(() => {
    //   this.sharedService.emitChange();
    //   this.close();
    //   this.nzMessageService.success('Thêm Thành Công');
    // }, (error) => {
    //   this.nzMessageService.error(error.error?.message);
    //   this.isLoading = false;
    // });
  }

}
