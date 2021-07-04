import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Genre} from '../interfaces/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private baseUrl = environment.api + '/genres';

  constructor(private http: HttpClient) {
  }

  getAllGenres(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getGenreByGenreId(countryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${countryId}`);
  }

  createGenre(body: Genre): Observable<any> {
    return this.http.post(`${this.baseUrl}`, {
      name: body.name,
      slug: body.slug,
      status: body.status
    });
  }

  updateGenreByGenreId(countryId: number, body: Genre): Observable<any> {
    return this.http.put(`${this.baseUrl}/${countryId}`, {
        name: body.name,
        slug: body.slug,
        status: body.status
      }
    );
  }

  deleteGenreByGenreId(countryId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${countryId}`);
  }
}
