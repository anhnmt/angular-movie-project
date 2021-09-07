import {Injectable, NgZone} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '../interfaces/user';
import {environment} from '@/environments/environment';
import {DefaultResponse} from '@/app/shared/interfaces/default-response';
import {Router} from '~/@angular/router';

@Injectable({providedIn: 'root'})
export class AuthService {
  public currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser')));
  private baseUrl = environment.api + '/oauth/token';

  constructor(
    private httpClient: HttpClient,
    private router: Router,
    private ngZone: NgZone,
  ) {
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.getValue();
  }

  login(body: User): Observable<DefaultResponse<User>> {
    return this.httpClient.post<DefaultResponse<User>>(this.baseUrl, {
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
    this.router.navigate(['dashboard', 'login']);
  }
}
