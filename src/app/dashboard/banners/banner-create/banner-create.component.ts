import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalUtils} from '../../../shared/utils/globalUtils';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SharedService} from '../../../shared/services/shared.service';
import {HelperUtils} from '../../../shared/utils/helperUtils';
import {BannerService} from '../../../shared/services/banner.service';
import {Movie} from '../../../shared/interfaces/movie';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {ClientService} from '../../../shared/services/client.service';

@Component({
  selector: 'app-banner-create',
  templateUrl: './banner-create.component.html',
  styleUrls: ['./banner-create.component.css']
})
export class BannerCreateComponent implements OnInit, AfterViewInit, OnDestroy {

  searchMovies: Movie[] = [];
  isSearchLoading = false;
  isLoading = false;
  visible = false;
  status = GlobalUtils.getDefaultStatus();
  fileList: NzUploadFile[] = [];
  validateForm: FormGroup;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private nzMessageService: NzMessageService,
    private sharedService: SharedService,
    private bannerService: BannerService,
    private clientService: ClientService,
  ) {
    const selectedStatus = this.status[0]?.value || null;

    this.validateForm = this.formBuilder.group({
      movie_id: [null, [Validators.required]],
      status: [selectedStatus, [Validators.required]],
    });
  }

  async handlePreview(file: NzUploadFile): Promise<void> {
    const {originFileObj, url, preview} = file;

    if (!url && !preview && originFileObj !== undefined) {
      file.preview = await HelperUtils.getBase64(originFileObj);
      file.status = 'done';
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.visible = true;
    }, 1);
  }

  close(): void {
    this.visible = false;

    setTimeout(
      () => this.router.navigate(['/dashboard', 'banners']),
      100
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  onSearch(value: string): void {
    this.isSearchLoading = true;

    this.clientService.getMovieByName(value)
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      ).subscribe((success) => {
      this.searchMovies = success.data?.result;
      this.isSearchLoading = false;
    }, (error) => {
      this.isSearchLoading = false;
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

    const formData = new FormData();
    this.fileList.forEach((file: any) => {
      const {originFileObj, url, preview} = file;

      if (!url && !preview && originFileObj !== undefined) {
        formData.append('image', originFileObj);
      }
    });

    formData.append('banner', JSON.stringify(this.validateForm.value));

    this.bannerService.createBanner(formData).subscribe(() => {
      this.sharedService.emitChange();
      this.close();
      this.nzMessageService.success('Thêm Thành Công');
    }, (error) => {
      this.nzMessageService.error(error.error?.message);
      this.isLoading = false;
    });
  }
}
