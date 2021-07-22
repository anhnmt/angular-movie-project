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

  getAllMovieEpisodesByMovieId(movieId: number): Observable<DefaultResponse<MovieEpisode[]>> {
    return this.httpClient
      .get<DefaultResponse<MovieEpisode[]>>(`${this.baseUrl}/${movieId}/episodes`);
  }
}
