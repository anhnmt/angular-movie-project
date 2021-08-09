import {Movie} from './movie';

export interface Banner {
  banner_id: number;
  movie_id?: number;
  image: string;
  status: number;
  movie?: Movie;
}
