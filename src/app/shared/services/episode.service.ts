import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DefaultResponse} from '../interfaces/default-response';
import {MovieEpisode} from '../interfaces/movie-episode';
import {EpisodeDetail} from '../interfaces/episode-detail';

@Injectable({
  providedIn: 'root'
})
export class EpisodeService {

  private baseUrl = environment.api + '/episodes';

  constructor(private httpClient: HttpClient) {
  }

  getEpisodeDetail(episodeId: number): Observable<DefaultResponse<MovieEpisode>> {
    return this.httpClient
      .get<DefaultResponse<MovieEpisode>>(`${this.baseUrl}/${episodeId}`);
  }

  createEpisodeDetail(episodeId: number, body: EpisodeDetail): Observable<DefaultResponse<EpisodeDetail>> {
    return this.httpClient
      .post<DefaultResponse<EpisodeDetail>>(`${this.baseUrl}/${episodeId}`, {
        episode_type_id: body.episode_type_id,
        link: body.link,
        name: body.name,
        status: body.status,
      });
  }

  updateEpisode(episodeId: number, body: MovieEpisode): Observable<DefaultResponse<MovieEpisode>> {
    return this.httpClient
      .put<DefaultResponse<MovieEpisode>>(`${this.baseUrl}/${episodeId}`, {
        name: body.name,
        status: body.status
      });
  }

  deleteEpisode(episodeId: number): Observable<DefaultResponse<MovieEpisode>> {
    return this.httpClient
      .delete<DefaultResponse<MovieEpisode>>(`${this.baseUrl}/${episodeId}`);
  }

  deleteEpisodeDetail(episodeId: number, episodeDetailId: number): Observable<DefaultResponse<EpisodeDetail>> {
    return this.httpClient
      .delete<DefaultResponse<EpisodeDetail>>(`${this.baseUrl}/${episodeId}/details/${episodeDetailId}`);
  }


}
