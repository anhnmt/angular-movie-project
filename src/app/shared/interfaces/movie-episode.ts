import {Status} from './status';
import {EpisodeDetail} from './episode-detail';

export interface MovieEpisode {
  episode_id: number;
  name: string;
  movie_id: number;
  status: Status;
  episode_details?: EpisodeDetail[];
}
