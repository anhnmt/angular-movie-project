import {MovieType} from './movie-type';
import {Status} from './status';

export interface Movie {
  movie_id: number;
  name: string;
  slug: string;
  description?: string;
  movie_type_id: number;
  trailer?: string;
  imdb_id?: string;
  rating?: string;
  release_date?: string;
  runtime?: string;
  seo_title?: string;
  seo_keywords?: string;
  status: Status;
  created_at?: string;
  updated_at?: string;
  country_ids?: number[];
  genre_ids?: number[];
}
