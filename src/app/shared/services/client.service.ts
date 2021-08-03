import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DefaultResponse} from '../interfaces/default-response';
import {Movie} from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private baseUrl = environment.api + '/clients';

  constructor(private httpClient: HttpClient) {
  }

  getAllTopMoviesSidebar(): Observable<DefaultResponse<{ movies?: Movie[], series?: Movie[] }>> {
    return this.httpClient
      .get<DefaultResponse<{ movies?: Movie[], series?: Movie[] }>>(`${this.baseUrl}/top-movies-sidebar`);
  }

  getAllTopMoviesBody(): Observable<DefaultResponse<{ movies?: Movie[], series?: Movie[], cartoons?: Movie[], cinemas?: Movie[] }>> {
    return this.httpClient
      .get<DefaultResponse<{ movies?: Movie[], series?: Movie[], cartoons?: Movie[], cinemas?: Movie[] }>>(`${this.baseUrl}/top-movies-body`);
  }
}
