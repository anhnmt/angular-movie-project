import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '@/environments/environment';
import {HttpClient} from '@angular/common/http';
import {DefaultResponse} from '../interfaces/default-response';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private baseUrl = environment.api + '/dashboard';

  constructor(private httpClient: HttpClient) {
  }

  getDashboardAnalyzer(): Observable<DefaultResponse<any>> {
    return this.httpClient
      .get<DefaultResponse<any>>(`${this.baseUrl}`);
  }
}
