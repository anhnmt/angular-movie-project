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
        console.log(error);
      });
  }

  ngOnInit(): void {
    console.log('Login init');
    this.authService.currentUserSubject
      .pipe(takeUntil(this.destroy$))
      .subscribe((value: any) => {
        console.log(value);
        // tslint:disable-next-line:no-unused-expression
        !!value && this.router.navigate(['/dashboard', 'home']);
      });

    this.validateForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard/home';
  }

  ngOnDestroy(): void {
    console.log('Login destroyed');
    this.destroy$.next();
  }
}
