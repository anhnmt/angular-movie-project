import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../interfaces/movie';
import {DefaultResponse} from '../interfaces/defaultResponse';

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

  getMovieByMovieId(movieId: number): Observable<DefaultResponse<Movie>> {
    return this.httpClient
      .get<DefaultResponse<Movie>>(`${this.baseUrl}/${movieId}`);
  }

  createMovie(body: Movie): Observable<DefaultResponse<Movie>> {
    return this.httpClient
      .post<DefaultResponse<Movie>>(`${this.baseUrl}`, {
        name: body.name,
        slug: body.slug,
        movie_type_id: body.movie_type?.movie_type_id,
        status: body.status?.value
      });
  }

  updateMovieByMovieId(movieId: number, body: Movie): Observable<DefaultResponse<Movie>> {
    return this.httpClient
      .put<DefaultResponse<Movie>>(`${this.baseUrl}/${movieId}`, {
          name: body.name,
          slug: body.slug,
          movie_type_id: body.movie_type?.movie_type_id,
          status: body.status
        }
      );
  }

  deleteMovieByMovieId(movieId: number): Observable<DefaultResponse<Movie>> {
    return this.httpClient
      .delete<DefaultResponse<Movie>>(`${this.baseUrl}/${movieId}`);
  }
}
