import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HelperUtils} from '@/app/shared/utils/helperUtils';
import {AuthService} from '@/app/shared/services/auth.service';
import {Router} from '@angular/router';


@Component({
  templateUrl: './login.component.html'
})

export class LoginComponent implements OnInit {
  validateForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
  ) {
    this.validateForm = this.formBuilder.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  submitForm(): void {
    HelperUtils.formValidator(this.validateForm);

    console.log(this.validateForm.value);

    this.authService.login(this.validateForm.value)
      .subscribe((success) => {
        this.router.navigate(['/dashboard']);
      }, (error) => {
        console.log(error);
      });
  }

  ngOnInit(): void {
  }
}
