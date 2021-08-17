import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DefaultResponse} from '../interfaces/default-response';
import {Episode} from '../interfaces/episode';

@Injectable({
  providedIn: 'root'
})
export class MovieEpisodeService {

  private baseUrl = environment.api + '/movies';

  constructor(private httpClient: HttpClient) {
  }

  getAllMovieEpisodes(movieId: number): Observable<DefaultResponse<Episode[]>> {
    return this.httpClient
      .get<DefaultResponse<Episode[]>>(`${this.baseUrl}/${movieId}/episodes`);
  }

  createMovieEpisode(movieId: number, body: Episode): Observable<DefaultResponse<Episode>> {
    return this.httpClient
      .post<DefaultResponse<Episode>>(`${this.baseUrl}/${movieId}/episodes`, {
        name: body.name,
        status: body.status
      });
  }
}
