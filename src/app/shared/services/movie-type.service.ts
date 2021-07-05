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

  getMovieTypeByMovieTypeId(countryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${countryId}`);
  }

  createMovieType(body: MovieType): Observable<any> {
    return this.http.post(`${this.baseUrl}`, {
      name: body.name,
      slug: body.slug,
      status: body.status
    });
  }

  updateMovieTypeByMovieTypeId(countryId: number, body: MovieType): Observable<any> {
    return this.http.put(`${this.baseUrl}/${countryId}`, {
        name: body.name,
        slug: body.slug,
        status: body.status
      }
    );
  }

  deleteMovieTypeByMovieTypeId(countryId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${countryId}`);
  }
}
