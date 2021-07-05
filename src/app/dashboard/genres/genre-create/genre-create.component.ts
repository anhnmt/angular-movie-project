import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {StatusUtils} from '../../../shared/utils/statusUtils';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SharedService} from '../../../shared/services/shared.service';
import {GenreService} from '../../../shared/services/genre.service';

@Component({
  selector: 'app-genre-create',
  templateUrl: './genre-create.component.html',
  styleUrls: ['./genre-create.component.css']
})
export class GenreCreateComponent implements OnInit, AfterViewInit, OnDestroy {
  visible = false;
  status = StatusUtils.getDefaultStatus();
  validateForm: FormGroup;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private readonly genreService: GenreService,
    private formBuilder: FormBuilder,
    private nzMessageService: NzMessageService,
    private sharedService: SharedService,
  ) {
    const selectedStatus = this.status[0].value || null;

    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      slug: [null, [Validators.required]],
      status: [selectedStatus, [Validators.required]],
    });
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

    this.genreService.createGenre(this.validateForm.value).subscribe((success) => {
      this.sharedService.emitChange();
      this.close();
      this.nzMessageService.success('Thêm Thành Công');
    }, (error) => {
      this.nzMessageService.error(error.message);
    });
  }
}
