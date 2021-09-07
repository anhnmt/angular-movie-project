import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../interfaces/movie';
import {DefaultResponse} from '../interfaces/default-response';
import {Country} from '../interfaces/country';
import {Genre} from '../interfaces/genre';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl = environment.api + '/movies';

  constructor(private httpClient: HttpClient) {
  }

  getAllMovies(): Observable<DefaultResponse<Movie[]>> {
    return this.httpClient
      .get<DefaultResponse<Movie[]>>(`${this.baseUrl}`);
  }

  getAllCountriesByMovieId(movieId: number): Observable<DefaultResponse<Country[]>> {
    return this.httpClient
      .get<DefaultResponse<Country[]>>(`${this.baseUrl}/${movieId}/countries`);
  }

  getAllGenresByMovieId(movieId: number): Observable<DefaultResponse<Genre[]>> {
    return this.httpClient
      .get<DefaultResponse<Genre[]>>(`${this.baseUrl}/${movieId}/genres`);
  }

  getMovieByMovieId(movieId: number): Observable<DefaultResponse<Movie>> {
    return this.httpClient
      .get<DefaultResponse<Movie>>(`${this.baseUrl}/${movieId}`);
  }

  createMovie(body: any): Observable<DefaultResponse<Movie>> {
    return this.httpClient
      .post<DefaultResponse<Movie>>(`${this.baseUrl}`, body);
  }

  updateMovieByMovieId(movieId: number, body: any): Observable<DefaultResponse<Movie>> {
    return this.httpClient
      .put<DefaultResponse<Movie>>(`${this.baseUrl}/${movieId}`, body);
  }

  deleteMovieByMovieId(movieId: number): Observable<DefaultResponse<Movie>> {
    return this.httpClient
      .delete<DefaultResponse<Movie>>(`${this.baseUrl}/${movieId}`);
  }

  checkIsExistSlug(slug: string, id: number = null): Observable<DefaultResponse<boolean>> {
    return this.httpClient
      .get<DefaultResponse<boolean>>(`${this.baseUrl}/check_slug?slug=${slug}&movie_id=${id}`);
  }
}
