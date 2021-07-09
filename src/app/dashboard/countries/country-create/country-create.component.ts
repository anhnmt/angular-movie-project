import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SharedService} from '../../../shared/services/shared.service';
import {CountryService} from '../../../shared/services/country.service';
import {GlobalUtils} from '../../../shared/utils/globalUtils';
import {HelperUtils} from '../../../shared/utils/helperUtils';

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
      slug: [null, [Validators.required]],
      status: [selectedStatus, [Validators.required]],
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
