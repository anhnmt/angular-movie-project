import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Country} from '../interfaces/country';
import {DefaultResponse} from '../interfaces/default-response';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private baseUrl = environment.api + '/countries';

  constructor(private httpClient: HttpClient) {
  }

  getAllCountries(): Observable<DefaultResponse<Country[]>> {
    return this.httpClient
      .get<DefaultResponse<Country[]>>(`${this.baseUrl}`);
  }

  getCountryByCountryId(countryId: number): Observable<DefaultResponse<Country>> {
    return this.httpClient
      .get<DefaultResponse<Country>>(`${this.baseUrl}/${countryId}`);
  }

  createCountry(body: Country): Observable<DefaultResponse<Country>> {
    return this.httpClient
      .post<DefaultResponse<Country>>(`${this.baseUrl}`, {
        name: body.name,
        slug: body.slug,
        status: body.status
      });
  }

  updateCountryByCountryId(countryId: number, body: Country): Observable<DefaultResponse<Country>> {
    return this.httpClient
      .put<DefaultResponse<Country>>(`${this.baseUrl}/${countryId}`, {
          name: body.name,
          slug: body.slug,
          status: body.status
        }
      );
  }

  deleteCountryByCountryId(countryId: number): Observable<DefaultResponse<Country>> {
    return this.httpClient
      .delete<DefaultResponse<Country>>(`${this.baseUrl}/${countryId}`);
  }
}
