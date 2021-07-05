import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {StatusUtils} from '../../../shared/utils/statusUtils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SharedService} from '../../../shared/services/shared.service';
import {takeUntil} from 'rxjs/operators';
import {Genre} from '../../../shared/interfaces/genre';
import {GenreService} from '../../../shared/services/genre.service';

@Component({
  selector: 'app-genre-edit',
  templateUrl: './genre-edit.component.html',
  styleUrls: ['./genre-edit.component.css']
})
export class GenreEditComponent implements OnInit, AfterViewInit, OnDestroy {
  visible = false;
  genre: Genre;
  status = StatusUtils.getDefaultStatus();
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
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.visible = true;
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
    const selectedStatus = this.status[0].value || null;

    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      slug: [null, [Validators.required]],
      status: [selectedStatus, [Validators.required]],
    });

    this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe((params: any) => {
      console.log(params);
      const {genreId} = params;
      this.genreService.getGenreByGenreId(genreId).subscribe((success) => {
        console.log(success);
        this.genre = success.data;

        this.validateForm.patchValue({
          name: this.genre.name,
          slug: this.genre.slug,
          status: this.genre.status
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

    this.genreService.updateGenreByGenreId(this.genre.genre_id, this.validateForm.value).subscribe((success) => {
      this.close();
      this.sharedService.emitChange();
      this.nzMessageService.success('Cập nhật Thành Công');
    }, (error) => {
      this.nzMessageService.error(error.message);
    });
  }
}
