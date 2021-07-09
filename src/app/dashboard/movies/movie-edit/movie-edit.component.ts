import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Movie} from '../../../shared/interfaces/movie';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {forkJoin, Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {MovieService} from '../../../shared/services/movie.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SharedService} from '../../../shared/services/shared.service';
import {takeUntil} from 'rxjs/operators';
import {MovieType} from '../../../shared/interfaces/movie-type';
import {MovieTypeService} from '../../../shared/services/movie-type.service';
import {GlobalUtils} from '../../../shared/utils/globalUtils';
import {HelperUtils} from '../../../shared/utils/helperUtils';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit, AfterViewInit, OnDestroy {

  isLoading = false;
  visible = false;
  movie: Movie;
  status = GlobalUtils.getDefaultStatus();
  movieTypes: MovieType[] = [];
  validateForm: FormGroup;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private readonly movieService: MovieService,
    private formBuilder: FormBuilder,
    private nzMessageService: NzMessageService,
    private sharedService: SharedService,
    private movieTypeService: MovieTypeService,
  ) {
    const selectedStatus = this.status[0].value || null;

    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      slug: [null, [Validators.required]],
      movie_type: [null, [Validators.required]],
      status: [selectedStatus, [Validators.required]],
    });

    this.route.params
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((params: any) => {
        const {movieId} = params;

        forkJoin([
          this.movieService.getMovieByMovieId(movieId),
          this.movieTypeService.getAllMovieTypes()
        ])
          .subscribe(([movie, movieTypes]) => {
            this.movie = movie.data;
            this.movieTypes = movieTypes.data;

            const defaultMovieType = this.movieTypes[0] || null;
            const selectedMovieType = GlobalUtils.mapMovieType(this.movieTypes, this.movie.movie_type?.movie_type_id);

            this.validateForm.patchValue({
              name: this.movie.name,
              slug: this.movie.slug,
              movie_type: selectedMovieType || defaultMovieType,
              status: this.movie.status
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
      () => this.router.navigate(['/dashboard', 'movies']),
      100
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  submitForm(): void {
    this.isLoading = true;

    HelperUtils.formValidator(this.validateForm);

    // stop here if form is invalid
    if (this.validateForm.invalid) {
      this.isLoading = false;
      return;
    }

    this.movieService.updateMovieByMovieId(this.movie.movie_id, this.validateForm.value)
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
