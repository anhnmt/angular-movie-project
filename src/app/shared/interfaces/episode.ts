import {EpisodeDetail} from './episode-detail';

export interface Episode {
  episode_id: number;
  name: string;
  movie_id: number;
  status?: number;
  episode_details?: EpisodeDetail[];
}
