import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalUtils} from '../../../shared/utils/globalUtils';
import {NzUploadFile} from 'ng-zorro-antd/upload';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SharedService} from '../../../shared/services/shared.service';
import {BannerService} from '../../../shared/services/banner.service';
import {HelperUtils} from '../../../shared/utils/helperUtils';
import {debounceTime, distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {Banner} from '../../../shared/interfaces/banner';
import {ClientService} from '../../../shared/services/client.service';
import {Movie} from '../../../shared/interfaces/movie';

@Component({
  selector: 'app-banner-edit',
  templateUrl: './banner-edit.component.html',
  styleUrls: ['./banner-edit.component.css']
})
export class BannerEditComponent implements OnInit, AfterViewInit, OnDestroy {

  searchMovies: Movie[] = [];
  isSearchLoading = false;
  isLoading = false;
  visible = false;
  status = GlobalUtils.getDefaultStatus();
  fileList: NzUploadFile[] = [];
  banner: Banner;
  bannerId: number;
  validateForm: FormGroup;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private nzMessageService: NzMessageService,
    private sharedService: SharedService,
    private bannerService: BannerService,
    private clientService: ClientService,
  ) {
    const selectedStatus = this.status[0]?.value || null;

    this.validateForm = this.formBuilder.group({
      movie_id: [null, [Validators.required]],
      image: [null],
      status: [selectedStatus, [Validators.required]],
    });

    this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe((params: any) => {
      const {bannerId} = params;
      this.bannerId = bannerId;

      this.bannerService.getBannerByBannerId(bannerId).subscribe((success) => {
        console.log(success);
        this.banner = success.data;

        this.validateForm.patchValue({
          movie_id: this.banner.movie?.movie_id,
          image: this.banner.image,
          status: this.banner.status
        });

        if (this.banner.movie) {
          this.searchMovies = [this.banner.movie];
        }

        if (this.banner.image) {
          this.fileList = [{
            uid: '-1',
            name: 'image.png',
            url: this.banner.image
          }];
        }
      }, (error) => {
        this.close();
        this.nzMessageService.error(error.error.message);
      });
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
      // console.log(success);
      this.searchMovies = success.data;
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

    // console.log(this.validateForm.value);
    formData.append('banner', JSON.stringify(this.validateForm.value));

    this.bannerService.updateBannerByBannerId(this.bannerId, formData).subscribe(() => {
      this.sharedService.emitChange();
      this.close();
      this.nzMessageService.success('Thêm Thành Công');
    }, (error) => {
      this.nzMessageService.error(error.error?.message);
      this.isLoading = false;
    });
  }
}
