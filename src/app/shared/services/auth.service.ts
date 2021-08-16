import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {map} from 'rxjs/operators';

import {User} from '../interfaces/user';
import {environment} from '@/environments/environment';
import {DefaultResponse} from '@/app/shared/interfaces/default-response';

@Injectable()
export class AuthService {
  public currentUser: Observable<User>;
  private currentUserSubject: BehaviorSubject<User>;
  private baseUrl = environment.api + '/oauth/token';

  constructor(private httpClient: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
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
        }

        return user;
      }));
  }

  logout(): void {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
