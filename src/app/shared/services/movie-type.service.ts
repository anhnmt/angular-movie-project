import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {MovieType} from '../interfaces/movie-type';
import {DefaultResponse} from '../interfaces/default-response';

@Injectable({
  providedIn: 'root'
})
export class MovieTypeService {
  private baseUrl = environment.api + '/movies/types';

  constructor(private httpClient: HttpClient) {
  }

  getAllMovieTypes(): Observable<DefaultResponse<MovieType[]>> {
    return this.httpClient
      .get<DefaultResponse<MovieType[]>>(`${this.baseUrl}`);
  }

  getMovieTypeByMovieTypeId(movieTypeId: number | string): Observable<DefaultResponse<MovieType>> {
    return this.httpClient
      .get<DefaultResponse<MovieType>>(`${this.baseUrl}/${movieTypeId}`);
  }

  createMovieType(body: MovieType): Observable<DefaultResponse<MovieType>> {
    return this.httpClient
      .post<DefaultResponse<MovieType>>(`${this.baseUrl}`, {
        name: body.name,
        slug: body.slug,
        status: body.status
      });
  }

  updateMovieTypeByMovieTypeId(movieTypeId: number, body: MovieType): Observable<DefaultResponse<MovieType>> {
    return this.httpClient
      .put<DefaultResponse<MovieType>>(`${this.baseUrl}/${movieTypeId}`, {
          name: body.name,
          slug: body.slug,
          status: body.status
        }
      );
  }

  deleteMovieTypeByMovieTypeId(movieTypeId: number): Observable<DefaultResponse<MovieType>> {
    return this.httpClient
      .delete<DefaultResponse<MovieType>>(`${this.baseUrl}/${movieTypeId}`);
  }

  checkIsExistSlug(slug: string, id: number = null): Observable<DefaultResponse<boolean>> {
    return this.httpClient
      .get<DefaultResponse<boolean>>(`${this.baseUrl}/check_slug?slug=${slug}&movie_type_id=${id}`);
  }
}
