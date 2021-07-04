import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Country} from '../interfaces/country';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl = environment.api + '/countries';

  constructor(private http: HttpClient) {
  }

  getAllCountries(): Observable<any> {
    return this.http.get(`${this.baseUrl}`);
  }

  getCountryByCountryId(countryId: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${countryId}`);
  }

  createCountry(body: Country): Observable<any> {
    return this.http.post(`${this.baseUrl}`, {
      name: body.name,
      slug: body.slug,
      status: body.status
    });
  }

  updateCountryByCountryId(countryId: number, body: Country): Observable<any> {
    return this.http.put(`${this.baseUrl}/${countryId}`, {
        name: body.name,
        slug: body.slug,
        status: body.status
      }
    );
  }

  deleteCountryByCountryId(countryId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${countryId}`);
  }
}
