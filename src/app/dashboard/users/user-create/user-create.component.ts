import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '@/app/shared/services/user.service';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {Observable, Subject, timer} from 'rxjs';
import {SharedService} from '@/app/shared/services/shared.service';
import {HelperUtils} from '@/app/shared/utils/helperUtils';
import {switchMap} from '~/rxjs/internal/operators';
import {map} from 'rxjs/operators';
import {GlobalUtils} from '@/app/shared/utils/globalUtils';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoading = false;
  visible = false;
  validateForm: FormGroup;
  gender = GlobalUtils.getDefaultGender();
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private readonly userService: UserService,
    private formBuilder: FormBuilder,
    private nzMessageService: NzMessageService,
    private sharedService: SharedService,
  ) {
    const selectedGender = this.gender[0]?.value || null;

    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required], [this.userNameAsyncValidator.bind(this)]],
      gender: [selectedGender, [Validators.required]],
      password: [null, [Validators.required]],
      confirm: [null, [this.confirmValidator]]
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
      () => this.router.navigate(['/dashboard', 'users']),
      100
    );
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  userNameAsyncValidator(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return timer(300).pipe(
      switchMap(() =>
        this.userService.checkIsExistUsername(control.value).pipe(
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

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
  }

  confirmValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value) {
      return {error: true, required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {confirm: true, error: true};
    }
    return {};
  }

  submitForm(): void {
    this.isLoading = true;

    HelperUtils.formValidator(this.validateForm);

    // stop here if form is invalid
    if (this.validateForm.invalid) {
      this.isLoading = false;
      return;
    }

    this.userService.createUser(this.validateForm.value).subscribe(() => {
      this.sharedService.emitChange();
      this.close();
      this.nzMessageService.success('Thêm Thành Công');
    }, (error) => {
      this.nzMessageService.error(error.message);
      this.isLoading = false;
    });
  }

}
