import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {DefaultResponse} from '../interfaces/default-response';
import {MovieEpisode} from '../interfaces/movie-episode';

@Injectable({
  providedIn: 'root'
})
export class MovieEpisodeService {

  private baseUrl = environment.api + '/movies';

  constructor(private httpClient: HttpClient) {
  }

  getAllMovieEpisodes(movieId: number): Observable<DefaultResponse<MovieEpisode[]>> {
    return this.httpClient
      .get<DefaultResponse<MovieEpisode[]>>(`${this.baseUrl}/${movieId}/episodes`);
  }

  getMovieEpisodeDetails(movieId: number, episodeId: number): Observable<DefaultResponse<MovieEpisode>> {
    return this.httpClient
      .get<DefaultResponse<MovieEpisode>>(`${this.baseUrl}/${movieId}/episodes/${episodeId}`);
  }

  createMovieEpisodeDetails(movieId: number, episodeId: number, body: MovieEpisode): Observable<DefaultResponse<MovieEpisode>> {
    return this.httpClient
      .post<DefaultResponse<MovieEpisode>>(`${this.baseUrl}/${movieId}/episodes/${episodeId}`, {
        name: body.name,
        status: body.status,
        episode_details: body.episode_details
      });
  }

  updateMovieEpisodeDetails(movieId: number, episodeId: number, body: MovieEpisode): Observable<DefaultResponse<MovieEpisode>> {
    return this.httpClient
      .put<DefaultResponse<MovieEpisode>>(`${this.baseUrl}/${movieId}/episodes/${episodeId}`, {
        name: body.name,
        status: body.status,
        episode_details: body.episode_details
      });
  }

  deleteMovieEpisodeDetails(movieId: number, episodeId: number): Observable<DefaultResponse<MovieEpisode>> {
    return this.httpClient
      .delete<DefaultResponse<MovieEpisode>>(`${this.baseUrl}/${movieId}/episodes/${episodeId}`);
  }
}
