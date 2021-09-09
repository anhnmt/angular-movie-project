import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '../interfaces/user';
import {environment} from '@/environments/environment';
import {DefaultResponse} from '@/app/shared/interfaces/default-response';
import {Router} from '~/@angular/router';

@Injectable()
export class AuthService {
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  private baseUrl = environment.api + '/oauth';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(body: User): Observable<DefaultResponse<User>> {
    return this.httpClient.post<DefaultResponse<User>>(`${this.baseUrl}/token`, {
      username: body.username,
      password: body.password
    })
      .pipe(map(user => {
        if (user && user.data) {
          localStorage.setItem('currentUser', JSON.stringify(user.data));
          this.currentUserSubject.next(user.data);
          this.router.navigate(['/dashboard', 'home']);
        }
        return user;
      }));
  }

  logout(): void {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/dashboard', 'login']);
  }

  currentUserInfo(): Observable<DefaultResponse<User>> {
    return this.httpClient.get<DefaultResponse<User>>(`${this.baseUrl}/current_user`);
  }

  updateCurrentUserInfo(body: User): Observable<DefaultResponse<any>> {
    return this.httpClient.post<DefaultResponse<any>>(`${this.baseUrl}/update_profile`, {
      name: body.name,
      username: body.username,
      gender: body.gender
    });
  }

  updateCurrentUserPassword(oldPassword: string, newPassword: string): Observable<DefaultResponse<any>> {
    return this.httpClient.post<DefaultResponse<any>>(`${this.baseUrl}/change_password`, {
      old_password: oldPassword,
      new_password: newPassword
    });
  }
}
