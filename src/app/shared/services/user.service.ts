import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.api + '/users';

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getUserByUserId(userId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${userId}`);
  }

  deleteUserByUserId(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`);
  }

}
