import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user.type';

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

  createUser(body: User): Observable<any> {
    return this.http.post(`${this.baseUrl}`, body);
  }

  updateUserByUserId(userId: number, body: User): Observable<any> {
    return this.http.put(`${this.baseUrl}/${userId}`, {
        name: body.name,
        username: body.username,
        gender: body.gender
      }
    );
  }

  deleteUserByUserId(userId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${userId}`);
  }

}
