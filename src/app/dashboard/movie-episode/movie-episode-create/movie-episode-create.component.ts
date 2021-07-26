import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {GlobalUtils} from '../../../shared/utils/globalUtils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {takeUntil} from 'rxjs/operators';
import {HelperUtils} from '../../../shared/utils/helperUtils';

@Component({
  selector: 'app-movie-episode-create',
  templateUrl: './movie-episode-create.component.html',
  styleUrls: ['./movie-episode-create.component.css']
})
export class MovieEpisodeCreateComponent implements OnInit, AfterViewInit, OnDestroy {

  isLoading = false;
  visible = false;
  movieId: number;
  status = GlobalUtils.getDefaultStatus();
  validateForm: FormGroup;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
  ) {
    const selectedStatus = this.status[0].value || null;

    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      status: [selectedStatus, [Validators.required]],
    });

    this.route.parent.params
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((params: any) => {
        const {movieId} = params;
        this.movieId = movieId;
      });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.visible = true;
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

  submitForm(): void {
    this.isLoading = true;

    HelperUtils.formValidator(this.validateForm);

    // stop here if form is invalid
    if (this.validateForm.invalid) {
      this.isLoading = false;
      return;
    }

    // this.genreService.updateGenreByGenreId(this.genre.genre_id, this.validateForm.value)
    //   .subscribe((success) => {
    //     this.sharedService.emitChange();
    //     this.close();
    //     this.nzMessageService.success('Cập nhật Thành Công');
    //   }, (error) => {
    //     this.nzMessageService.error(error.message);
    //     this.isLoading = false;
    //   });
  }

}
