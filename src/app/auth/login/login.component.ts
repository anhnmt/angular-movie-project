import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HelperUtils} from '@/app/shared/utils/helperUtils';
import {AuthService} from '@/app/shared/services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  validateForm: FormGroup;
  returnUrl: string;

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

    console.log(this.authService.currentUserValue);

    this.authService.login(this.validateForm.value)
      .subscribe((success) => {
        this.authService.currentUserSubject.next(success.data);
        this.authService.currentUser.subscribe((user) => {
          if (user) {
            this.ngZone.run(() => {
              this.router.navigate(['/dashboard', 'home']);
            });
          }
        });
      }, (error) => {
        console.log(error);
      });
  }

  ngOnInit(): void {
    // redirect to home if already logged in
    this.authService.currentUser.subscribe(() => {
      this.ngZone.run(() => {
        this.router.navigate(['/dashboard', 'home']);
      });
    });

    this.validateForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/dashboard/home';
  }
}
