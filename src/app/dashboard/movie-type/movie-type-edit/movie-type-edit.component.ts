import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MovieType} from '../../../shared/interfaces/movie-type';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Subject, timer} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieTypeService} from '../../../shared/services/movie-type.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SharedService} from '../../../shared/services/shared.service';
import {map, takeUntil} from 'rxjs/operators';
import {GlobalUtils} from '../../../shared/utils/globalUtils';
import {HelperUtils} from '../../../shared/utils/helperUtils';
import {switchMap} from '~/rxjs/internal/operators';

@Component({
  selector: 'app-movie-type-edit',
  templateUrl: './movie-type-edit.component.html',
  styleUrls: ['./movie-type-edit.component.css']
})
export class MovieTypeEditComponent implements OnInit, AfterViewInit, OnDestroy {

  isLoading = false;
  visible = false;
  movieType: MovieType;
  status = GlobalUtils.getDefaultStatus();
  validateForm: FormGroup;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private readonly movieTypeService: MovieTypeService,
    private formBuilder: FormBuilder,
    private nzMessageService: NzMessageService,
    private sharedService: SharedService,
  ) {
    const selectedStatus = this.status[0].value || null;

    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      slug: [null, [Validators.required], [this.slugAsyncValidator.bind(this)]],
      status: [selectedStatus, [Validators.required]],
    });

    this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe((params: any) => {
      const {movieTypeId} = params;
      this.movieTypeService.getMovieTypeByMovieTypeId(movieTypeId).subscribe((success) => {
        this.movieType = success.data;

        this.validateForm.patchValue({
          name: this.movieType.name,
          slug: this.movieType.slug,
          status: this.movieType.status
        });
      }, (error) => {
        this.close();
        this.nzMessageService.error(error.error.message);
      });
    });
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.visible = true;

      HelperUtils.formChangedTitleToSlug(this.validateForm);
    }, 1);
  }

  close(): void {
    this.visible = false;

    setTimeout(
      () => this.router.navigate(['/dashboard', 'movies', 'types']),
      100
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  slugAsyncValidator(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return timer(300).pipe(
      switchMap(() =>
        this.movieTypeService.checkIsExistSlug(control.value, this.movieType?.movie_type_id).pipe(
          map(response => {
            // console.log(response);

            if (response.data) {
              return {
                duplicated: true
              };
            }

            return null;
          })
        )
      )
    );
  }

  submitForm(): void {
    this.isLoading = true;

    HelperUtils.formValidator(this.validateForm);

    // stop here if form is invalid
    if (this.validateForm.invalid) {
      this.isLoading = false;
      return;
    }

    this.movieTypeService.updateMovieTypeByMovieTypeId(this.movieType.movie_type_id, this.validateForm.value).subscribe((success) => {
      this.close();
      this.sharedService.emitChange();
      this.nzMessageService.success('Cập nhật Thành Công');
    }, (error) => {
      this.nzMessageService.error(error.message);
      this.isLoading = false;
    });
  }
}
