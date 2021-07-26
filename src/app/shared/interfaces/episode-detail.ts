import {Status} from './status';

export interface EpisodeDetail {
  episode_detail_id: number;
  name: string;
  episode_id: number;
  episode_type_id: number;
  status: Status;
}
