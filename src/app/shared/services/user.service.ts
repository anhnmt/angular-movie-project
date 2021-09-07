import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../interfaces/user';
import {DefaultResponse} from '../interfaces/default-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = environment.api + '/users';

  constructor(private httpClient: HttpClient) {
  }

  getAllUsers(): Observable<DefaultResponse<User[]>> {
    return this.httpClient
      .get<DefaultResponse<User[]>>(`${this.baseUrl}`);
  }

  getUserByUserId(userId: number): Observable<DefaultResponse<User>> {
    return this.httpClient
      .get<DefaultResponse<User>>(`${this.baseUrl}/${userId}`);
  }

  createUser(body: User): Observable<DefaultResponse<User>> {
    return this.httpClient
      .post<DefaultResponse<User>>(`${this.baseUrl}`, body);
  }

  updateUserByUserId(userId: number, body: User): Observable<DefaultResponse<User>> {
    return this.httpClient
      .put<DefaultResponse<User>>(`${this.baseUrl}/${userId}`, {
          name: body.name,
          username: body.username,
          gender: body.gender
        }
      );
  }

  deleteUserByUserId(userId: number): Observable<DefaultResponse<User>> {
    return this.httpClient
      .delete<DefaultResponse<User>>(`${this.baseUrl}/${userId}`);
  }

  checkIsExistUsername(username: string, userId: number = null): Observable<DefaultResponse<boolean>> {
    return this.httpClient
      .get<DefaultResponse<boolean>>(`${this.baseUrl}/check_username?username=${username}&user_id=${userId}`);
  }

}
