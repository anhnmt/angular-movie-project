import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {MovieType} from '../../../shared/interfaces/movie-type';
import {StatusUtils} from '../../../shared/utils/statusUtils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieTypeService} from '../../../shared/services/movie-type.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SharedService} from '../../../shared/services/shared.service';
import {takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-movie-type-edit',
  templateUrl: './movie-type-edit.component.html',
  styleUrls: ['./movie-type-edit.component.css']
})
export class MovieTypeEditComponent implements OnInit, AfterViewInit, OnDestroy {
  visible = false;
  movieType: MovieType;
  status = StatusUtils.getDefaultStatus();
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
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.visible = true;
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
    const selectedStatus = this.status[0].value || null;

    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      slug: [null, [Validators.required]],
      status: [selectedStatus, [Validators.required]],
    });

    this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe((params: any) => {
      console.log(params);
      const {movieTypeId} = params;
      this.movieTypeService.getMovieTypeByMovieTypeId(movieTypeId).subscribe((success) => {
        console.log(success);
        this.movieType = success.data;

        this.validateForm.patchValue({
          name: this.movieType.name,
          slug: this.movieType.slug,
          status: this.movieType.status
        });
      });
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  submitForm(): void {
    for (const key of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }

    // stop here if form is invalid
    if (this.validateForm.invalid) {
      return;
    }

    console.log(this.validateForm.value);

    this.movieTypeService.updateMovieTypeByMovieTypeId(this.movieType.movie_type_id, this.validateForm.value).subscribe((success) => {
      this.close();
      this.sharedService.emitChange();
      this.nzMessageService.success('Cập nhật Thành Công');
    }, (error) => {
      this.nzMessageService.error(error.message);
    });
  }
}
