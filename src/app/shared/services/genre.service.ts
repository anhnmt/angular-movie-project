import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Genre} from '../interfaces/genre';
import {DefaultResponse} from '../interfaces/default-response';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private baseUrl = environment.api + '/genres';

  constructor(private httpClient: HttpClient) {
  }

  getAllGenres(): Observable<DefaultResponse<Genre[]>> {
    return this.httpClient
      .get<DefaultResponse<Genre[]>>(`${this.baseUrl}`);
  }

  getGenreByGenreId(movieId: number): Observable<DefaultResponse<Genre>> {
    return this.httpClient
      .get<DefaultResponse<Genre>>(`${this.baseUrl}/${movieId}`);
  }

  createGenre(body: Genre): Observable<DefaultResponse<Genre>> {
    return this.httpClient
      .post<DefaultResponse<Genre>>(`${this.baseUrl}`, {
        name: body.name,
        slug: body.slug,
        status: body.status
      });
  }

  updateGenreByGenreId(movieId: number, body: Genre): Observable<DefaultResponse<Genre>> {
    return this.httpClient
      .put<DefaultResponse<Genre>>(`${this.baseUrl}/${movieId}`, {
          name: body.name,
          slug: body.slug,
          status: body.status
        }
      );
  }

  deleteGenreByGenreId(movieId: number): Observable<DefaultResponse<Genre>> {
    return this.httpClient
      .delete<DefaultResponse<Genre>>(`${this.baseUrl}/${movieId}`);
  }
}
