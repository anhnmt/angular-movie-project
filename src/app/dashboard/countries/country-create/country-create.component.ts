import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Subject, timer} from 'rxjs';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SharedService} from '@/app/shared/services/shared.service';
import {CountryService} from '@/app/shared/services/country.service';
import {GlobalUtils} from '@/app/shared/utils/globalUtils';
import {HelperUtils} from '@/app/shared/utils/helperUtils';
import {switchMap} from '~/rxjs/internal/operators';
import {map} from '~/rxjs/operators';

@Component({
  selector: 'app-country-create',
  templateUrl: './country-create.component.html',
  styleUrls: ['./country-create.component.css']
})
export class CountryCreateComponent implements OnInit, AfterViewInit, OnDestroy {

  isLoading = false;
  visible = false;
  status = GlobalUtils.getDefaultStatus();
  validateForm: FormGroup;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private readonly countryService: CountryService,
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
      () => this.router.navigate(['/dashboard', 'countries']),
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
        this.countryService.checkIsExistSlug(control.value).pipe(
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

    this.countryService.createCountry(this.validateForm.value)
      .subscribe((success) => {
        this.sharedService.emitChange();
        this.close();
        this.nzMessageService.success('Thêm Thành Công');
      }, (error) => {
        this.nzMessageService.error(error.message);
        this.isLoading = false;
      });
  }
}
