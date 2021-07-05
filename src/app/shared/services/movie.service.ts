import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Movie} from '../interfaces/movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private baseUrl = environment.api + '/movies';

  constructor(private http: HttpClient) {
  }

  getAllMovies(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getMovieByMovieId(movieId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${movieId}`);
  }

  createMovie(body: Movie): Observable<any> {
    return this.http.post(`${this.baseUrl}`, {
      name: body.name,
      slug: body.slug,
      status: body.status
    });
  }

  updateMovieByMovieId(movieId: number, body: Movie): Observable<any> {
    return this.http.put(`${this.baseUrl}/${movieId}`, {
        name: body.name,
        slug: body.slug,
        status: body.status
      }
    );
  }

  deleteMovieByMovieId(movieId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${movieId}`);
  }
}
