import {Status} from './status';

export interface MovieEpisode {
  episode_id: number;
  name: string;
  movie_id: number;
  status: Status;
}
