import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Genre} from '../interfaces/genre';
import {DefaultResponse} from '../interfaces/default-response';

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

  getGenreByGenreId(genreId: number): Observable<DefaultResponse<Genre>> {
    return this.httpClient
      .get<DefaultResponse<Genre>>(`${this.baseUrl}/${genreId}`);
  }

  createGenre(body: Genre): Observable<DefaultResponse<Genre>> {
    return this.httpClient
      .post<DefaultResponse<Genre>>(`${this.baseUrl}`, {
        name: body.name,
        slug: body.slug,
        status: body.status
      });
  }

  updateGenreByGenreId(genreId: number, body: Genre): Observable<DefaultResponse<Genre>> {
    return this.httpClient
      .put<DefaultResponse<Genre>>(`${this.baseUrl}/${genreId}`, {
          name: body.name,
          slug: body.slug,
          status: body.status
        }
      );
  }

  deleteGenreByGenreId(genreId: number): Observable<DefaultResponse<Genre>> {
    return this.httpClient
      .delete<DefaultResponse<Genre>>(`${this.baseUrl}/${genreId}`);
  }
}
