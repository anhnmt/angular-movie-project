import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {distinctUntilChanged, takeUntil} from 'rxjs/operators';
import {User} from '../../../shared/interfaces/user.type';
import {Subject} from 'rxjs';
import {UserService} from '../../../shared/services/user.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit, AfterViewInit, OnDestroy {
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
  ) {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.visible = true;
    }, 1);
  }

  close(): void {
    this.visible = false;

    setTimeout(
      () => {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate(['/dashboard', 'users']);
        });
      },
      100
    );
  }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.onDestroy$),
      distinctUntilChanged()
    ).subscribe(() => {
      this.user = this.route.snapshot.data.user.data;

      this.validateForm = this.formBuilder.group({
        name: [this.user.name, [Validators.required]],
        username: [this.user.username, [Validators.required]]
      });
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next(true);
    this.onDestroy$.complete();
  }

  submitForm(): void {
    for (const i in this.validateForm.controls) {
      if (this.validateForm.hasOwnProperty(i)) {
        this.validateForm.controls[i].markAsDirty();
        this.validateForm.controls[i].updateValueAndValidity();
      }
    }

    // stop here if form is invalid
    if (this.validateForm.invalid) {
      return;
    }

    this.userService.updateUserByUserId(this.user.user_id, this.validateForm.value).subscribe((success) => {
      this.close();
      this.nzMessageService.success('Cập nhật Thành Công');
    }, (error) => {
      this.nzMessageService.error(error.message);
    });
  }

}
