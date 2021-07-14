import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../interfaces/movie';
import {DefaultResponse} from '../interfaces/defaultResponse';
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

  createMovie(body: Movie): Observable<DefaultResponse<Movie>> {
    return this.httpClient
      .post<DefaultResponse<Movie>>(`${this.baseUrl}`, {
        name: body.name,
        slug: body.slug,
        movie_type_id: body.movie_type_id,
        country_ids: body.country_ids,
        genre_ids: body.genre_ids,
        status: body.status
      });
  }

  updateMovieByMovieId(movieId: number, body: Movie): Observable<DefaultResponse<Movie>> {
    return this.httpClient
      .put<DefaultResponse<Movie>>(`${this.baseUrl}/${movieId}`, {
          name: body.name,
          slug: body.slug,
          movie_type_id: body.movie_type_id,
          country_ids: body.country_ids,
          genre_ids: body.genre_ids,
          status: body.status
        }
      );
  }

  deleteMovieByMovieId(movieId: number): Observable<DefaultResponse<Movie>> {
    return this.httpClient
      .delete<DefaultResponse<Movie>>(`${this.baseUrl}/${movieId}`);
  }
}
