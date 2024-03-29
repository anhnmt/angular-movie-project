import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Subject, timer} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {CountryService} from '@/app/shared/services/country.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SharedService} from '@/app/shared/services/shared.service';
import {map, takeUntil} from 'rxjs/operators';
import {Country} from '@/app/shared/interfaces/country';
import {GlobalUtils} from '@/app/shared/utils/globalUtils';
import {HelperUtils} from '@/app/shared/utils/helperUtils';
import {switchMap} from '~/rxjs/internal/operators';

@Component({
  selector: 'app-country-edit',
  templateUrl: './country-edit.component.html',
  styleUrls: ['./country-edit.component.css']
})
export class CountryEditComponent implements OnInit, AfterViewInit, OnDestroy {

  isLoading = false;
  visible = false;
  country: Country;
  status = GlobalUtils.getDefaultStatus();
  validateForm: FormGroup;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
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

    this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe((params: any) => {
      const {countryId} = params;
      this.countryService.getCountryByCountryId(countryId).subscribe((success) => {

        this.country = success.data;

        this.validateForm.patchValue({
          name: this.country.name,
          slug: this.country.slug,
          status: this.country.status
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
        this.countryService.checkIsExistSlug(control.value, this.country?.country_id).pipe(
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

    this.countryService.updateCountryByCountryId(this.country.country_id, this.validateForm.value).subscribe((success) => {
      this.sharedService.emitChange();
      this.close();
      this.nzMessageService.success('Cập nhật Thành Công');
    }, (error) => {
      this.nzMessageService.error(error.message);
      this.isLoading = false;
    });
  }
}
