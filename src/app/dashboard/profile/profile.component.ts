import {Component, OnDestroy, OnInit} from '@angular/core';
import {AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Observable, Subject, timer} from '~/rxjs';
import {switchMap} from '~/rxjs/internal/operators';
import {map} from '~/rxjs/operators';
import {UserService} from '@/app/shared/services/user.service';
import {GlobalUtils} from '@/app/shared/utils/globalUtils';
import {AuthService} from '@/app/shared/services/auth.service';
import {User} from '@/app/shared/interfaces/user';
import {NzMessageService} from '~/ng-zorro-antd/message';
import {HelperUtils} from '@/app/shared/utils/helperUtils';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit, OnDestroy {

  isInfoLoading = false;
  isPWLoading = false;
  user: User;
  gender = GlobalUtils.getDefaultGender();
  changeInfoForm: FormGroup;
  changePWForm: FormGroup;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private nzMessageService: NzMessageService,
  ) {
    const selectedGender = this.gender[0]?.value || null;

    this.changeInfoForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required], [this.userNameAsyncValidator.bind(this)]],
      gender: [selectedGender, [Validators.required]],
    });

    this.changePWForm = this.formBuilder.group({
      old_password: [null, [Validators.required]],
      new_password: [null, [Validators.required]],
      confirm_password: [null, [this.confirmValidator]]
    });
  }

  ngOnInit(): void {
    this.user = null;

    this.authService.currentUserInfo().subscribe((success) => {
      this.user = success.data;

      this.changeInfoForm.patchValue({
        name: this.user.name,
        username: this.user.username,
        gender: this.user.gender,
      });

      this.changeInfoForm.controls.username.markAsDirty();
      this.changeInfoForm.controls.username.updateValueAndValidity();
    }, (error) => {
      this.nzMessageService.error(error.error.message);
    });
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
        this.userService.checkIsExistUsername(control.value, this.user?.user_id).pipe(
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
    setTimeout(() => this.changePWForm.controls.confirm_password.updateValueAndValidity());
  }

  confirmValidator(control: FormControl): { [s: string]: boolean } {
    if (!control.value) {
      return {error: true, required: true};
    }
    if (control.value !== this.changePWForm.get('new_password').value) {
      return {confirm: true, error: true};
    }
    return {};
  }

  submitInfoForm(): void {
    this.isInfoLoading = true;

    HelperUtils.formValidator(this.changeInfoForm, ['username']);

    this.authService.updateCurrentUserInfo(this.changeInfoForm.value).subscribe((success) => {
      this.nzMessageService.success('Cập nhật Thành Công');
      this.isInfoLoading = false;
    }, (error) => {
      this.nzMessageService.error(error.message);
      this.isInfoLoading = false;
    });
  }

  submitPWForm(): void {
    this.isPWLoading = true;

    HelperUtils.formValidator(this.changePWForm);

    this.authService.updateCurrentUserPassword(
      this.changePWForm.get('old_password')?.value,
      this.changePWForm.get('new_password')?.value
    ).subscribe((success) => {
      this.nzMessageService.success('Cập nhật Thành Công');
      this.isPWLoading = false;
    }, (error) => {
      this.nzMessageService.error(error.message);
      this.isPWLoading = false;
    });
  }
}
