import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Banner} from '../interfaces/banner';
import {DefaultResponse} from '../interfaces/default-response';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  private baseUrl = environment.api + '/banners';

  constructor(private httpClient: HttpClient) {
  }

  getAllBanners(): Observable<DefaultResponse<Banner[]>> {
    return this.httpClient
      .get<DefaultResponse<Banner[]>>(`${this.baseUrl}`);
  }

  getBannerByBannerId(bannerId: number): Observable<DefaultResponse<Banner>> {
    return this.httpClient
      .get<DefaultResponse<Banner>>(`${this.baseUrl}/${bannerId}`);
  }

  createBanner(body: any): Observable<DefaultResponse<Banner>> {
    return this.httpClient
      .post<DefaultResponse<Banner>>(`${this.baseUrl}`, body);
  }

  updateBannerByBannerId(bannerId: number, body: any): Observable<DefaultResponse<Banner>> {
    return this.httpClient
      .put<DefaultResponse<Banner>>(`${this.baseUrl}/${bannerId}`, body);
  }

  deleteBannerByBannerId(bannerId: number): Observable<DefaultResponse<Banner>> {
    return this.httpClient
      .delete<DefaultResponse<Banner>>(`${this.baseUrl}/${bannerId}`);
  }
}
