import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EpisodeDetailService {

  private baseUrl = environment.api + '/episodes/details';

  constructor(private httpClient: HttpClient) {
  }

  
}
