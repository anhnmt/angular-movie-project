import {Status} from './status';

export interface Movie {
  movie_id: number;
  origin_name: string;
  name: string;
  slug: string;
  description?: string;
  movie_type_id?: number;
  movie_type_name?: string;
  movie_type?: { movie_type_id?: number, name?: string, slug?: string };
  trailer?: string;
  imdb_id?: string;
  rating?: string;
  release_date?: string;
  runtime?: string;
  poster?: string;
  seo_title?: string;
  seo_keywords?: string;
  status?: Status;
  created_at?: string;
  updated_at?: string;
  country_ids?: number[];
  genre_ids?: number[];
  movie_related?: Movie[];
}
