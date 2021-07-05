export interface Movie {
  movie_id: number;
  name: string;
  slug: string;
  description?: string;
  movie_type: number;
  trailer?: string;
  imdb_id?: string;
  rating?: string;
  release_date?: string;
  runtime?: string;
  seo_title?: string;
  seo_keywords?: string;
  status: number;
  created_at?: string;
  updated_at?: string;
}
