import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {MovieType} from '../interfaces/movie-type';

@Injectable({
  providedIn: 'root'
})
export class MovieTypeService {

  private baseUrl = environment.api + '/movies/types';

  constructor(private http: HttpClient) {
  }

  getAllMovieTypes(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getMovieTypeByMovieTypeId(movieTypeId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${movieTypeId}`);
  }

  createMovieType(body: MovieType): Observable<any> {
    return this.http.post(`${this.baseUrl}`, {
      name: body.name,
      slug: body.slug,
      status: body.status
    });
  }

  updateMovieTypeByMovieTypeId(movieTypeId: number, body: MovieType): Observable<any> {
    return this.http.put(`${this.baseUrl}/${movieTypeId}`, {
        name: body.name,
        slug: body.slug,
        status: body.status
      }
    );
  }

  deleteMovieTypeByMovieTypeId(movieTypeId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${movieTypeId}`);
  }
}
