import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HelperUtils} from '@/app/shared/utils/helperUtils';
import {AuthService} from '@/app/shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';


@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit, OnDestroy {
  validateForm: FormGroup;
  returnUrl: string;
  destroy$ = new Subject();

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private ngZone: NgZone,
  ) {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard/home';
  }

  submitForm(): void {
    HelperUtils.formValidator(this.validateForm);

    // stop here if form is invalid
    if (this.validateForm.invalid) {
      return;
    }

    // console.log(this.authService.currentUserValue);

    this.authService.login(this.validateForm.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(_ => {
      }, (error) => {
        console.log(error.error.message);

        this.validateForm.get('password').setErrors({
          custom: error.error.message
        });
      });
  }

  ngOnInit(): void {
    console.log('Login init');
    const currentUser = this.authService.currentUserValue;
    if (currentUser) {
      this.router.navigate([this.returnUrl]);
    }

    this.validateForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  ngOnDestroy(): void {
    console.log('Login destroyed');
    this.destroy$.next();
  }
}
