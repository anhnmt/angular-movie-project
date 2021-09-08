import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Subject, timer} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SharedService} from '../../../shared/services/shared.service';
import {map, takeUntil} from 'rxjs/operators';
import {Genre} from '../../../shared/interfaces/genre';
import {GenreService} from '../../../shared/services/genre.service';
import {GlobalUtils} from '../../../shared/utils/globalUtils';
import {HelperUtils} from '../../../shared/utils/helperUtils';
import {switchMap} from '~/rxjs/internal/operators';

@Component({
  selector: 'app-genre-edit',
  templateUrl: './genre-edit.component.html',
  styleUrls: ['./genre-edit.component.css']
})
export class GenreEditComponent implements OnInit, AfterViewInit, OnDestroy {

  isLoading = false;
  visible = false;
  genre: Genre;
  status = GlobalUtils.getDefaultStatus();
  validateForm: FormGroup;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private readonly genreService: GenreService,
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

      const {genreId} = params;
      this.genreService.getGenreByGenreId(genreId).subscribe((success) => {
        this.genre = success.data;

        this.validateForm.patchValue({
          name: this.genre.name,
          slug: this.genre.slug,
          status: this.genre.status
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

      HelperUtils.formChangedTitleToSlug(this.validateForm, this.onDestroy$);
    }, 1);
  }

  close(): void {
    this.visible = false;

    setTimeout(
      () => this.router.navigate(['/dashboard', 'genres']),
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
        this.genreService.checkIsExistSlug(control.value, this.genre?.genre_id).pipe(
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

    this.genreService.updateGenreByGenreId(this.genre.genre_id, this.validateForm.value)
      .subscribe((success) => {
        this.sharedService.emitChange();
        this.close();
        this.nzMessageService.success('Cập nhật Thành Công');
      }, (error) => {
        this.nzMessageService.error(error.message);
        this.isLoading = false;
      });
  }
}
