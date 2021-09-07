import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {map, takeUntil} from 'rxjs/operators';
import {User} from '@/app/shared/interfaces/user';
import {Observable, Subject, timer} from 'rxjs';
import {UserService} from '@/app/shared/services/user.service';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';
import {SharedService} from '@/app/shared/services/shared.service';
import {GlobalUtils} from '@/app/shared/utils/globalUtils';
import {switchMap} from '~/rxjs/internal/operators';
import {HelperUtils} from '@/app/shared/utils/helperUtils';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, AfterViewInit, OnDestroy {

  isLoading = false;
  gender = GlobalUtils.getDefaultGender();
  visible = false;
  user: User;
  validateForm: FormGroup;
  private onDestroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private formBuilder: FormBuilder,
    private nzMessageService: NzMessageService,
    private sharedService: SharedService,
  ) {
    const selectedGender = this.gender[0]?.value || null;

    this.validateForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      username: [null, [Validators.required], [this.userNameAsyncValidator.bind(this)]],
      gender: [selectedGender, [Validators.required]]
    });

    this.route.params.pipe(takeUntil(this.onDestroy$)).subscribe((params: any) => {
      const {userId} = params;
      this.userService.getUserByUserId(userId).subscribe((success) => {
        this.user = success.data;

        this.validateForm.patchValue({
          name: this.user.name,
          username: this.user.username,
          gender: this.user.gender,
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

  submitForm(): void {
    this.isLoading = true;

    HelperUtils.formValidator(this.validateForm);

    // stop here if form is invalid
    if (this.validateForm.invalid) {
      this.isLoading = false;
      return;
    }

    this.userService.updateUserByUserId(this.user.user_id, this.validateForm.value).subscribe((success) => {
      this.sharedService.emitChange();
      this.close();
      this.nzMessageService.success('Cập nhật Thành Công');
    }, (error) => {
      this.nzMessageService.error(error.message);
      this.isLoading = false;
    });
  }

}
