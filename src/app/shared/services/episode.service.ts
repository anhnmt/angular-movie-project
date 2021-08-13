import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DefaultResponse} from '../interfaces/default-response';
import {Episode} from '../interfaces/episode';
import {EpisodeDetail} from '../interfaces/episode-detail';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  private baseUrl = environment.api + '/episodes';

  constructor(private httpClient: HttpClient) {
  }

  getEpisodeDetails(episodeId: number): Observable<DefaultResponse<Episode>> {
    return this.httpClient
      .get<DefaultResponse<Episode>>(`${this.baseUrl}/${episodeId}`);
  }

  getEpisodeDetailById(episodeId: number, episodeDetailId: number): Observable<DefaultResponse<Episode>> {
    return this.httpClient
      .get<DefaultResponse<Episode>>(`${this.baseUrl}/${episodeId}/details/${episodeDetailId}`);
  }

  createEpisodeDetail(episodeId: number, body: EpisodeDetail): Observable<DefaultResponse<EpisodeDetail>> {
    return this.httpClient
      .post<DefaultResponse<EpisodeDetail>>(`${this.baseUrl}/${episodeId}`, body);
  }

  updateEpisodeDetail(episodeId: number, episodeDetailId: number, body: EpisodeDetail): Observable<DefaultResponse<EpisodeDetail>> {
    return this.httpClient
      .put<DefaultResponse<EpisodeDetail>>(`${this.baseUrl}/${episodeId}/details/${episodeDetailId}`, body);
  }

  updateEpisode(episodeId: number, body: Episode): Observable<DefaultResponse<Episode>> {
    return this.httpClient
      .put<DefaultResponse<Episode>>(`${this.baseUrl}/${episodeId}`, {
        name: body.name,
        status: body.status
      });
  }

  deleteEpisode(episodeId: number): Observable<DefaultResponse<Episode>> {
    return this.httpClient
      .delete<DefaultResponse<Episode>>(`${this.baseUrl}/${episodeId}`);
  }

  deleteEpisodeDetail(episodeId: number, episodeDetailId: number): Observable<DefaultResponse<EpisodeDetail>> {
    return this.httpClient
      .delete<DefaultResponse<EpisodeDetail>>(`${this.baseUrl}/${episodeId}/details/${episodeDetailId}`);
  }


}
