// Centralized types for the project
export interface TMDBImagePaths {
  poster_path?: string | null;
  backdrop_path?: string | null;
}

// Movie interface
export interface TMDBMovie extends TMDBImagePaths {
  id: number;
  title: string;
  original_title?: string;
  overview?: string | null;
  release_date?: string | null;
  vote_average?: number | null;
  vote_count?: number | null;
  genre_ids?: number[];
  popularity?: number | null;
  adult?: boolean;
  addedAt?: string;
}

// movie with genre interface
export interface Genre {
  genreId: number;
  genreName: string;
}

// Movies with genre interface
export interface GenreWithMovies extends Genre {
  movies: TMDBMovie[];
}

// Carousel Props
export interface CarouselProps {
  title: string;
  category: string;
  items: TMDBMovie[];
}

// Api response interface
export interface ApiResponse<T = any> {
  page?: number;
  results: T[];
  total_results?: number;
  total_pages?: number;
}

export type useFetchData = <T = any>() => Promise<T>;

// IMG from API interface
export interface ImgConfig {
  base_url: string;
  secure_base_url?: string;
  poster_sizes?: string[];
  backdrop_sizes?: string[];
}

// InitialData context interface
export interface AppInitialData {
  categories: Genre[];
  trending: TMDBMovie[];
}

// Movies status interface
export interface MoviesState {
  movies: TMDBMovie[];
  loading: boolean;
  error: string | null;
}

// Movies detail status interface
export interface MovieDetailState {
  movie?: TMDBMovie;
  loading: boolean;
  error: string | null;
}

// Genr status interface
export interface MovieGenresState {
  genres: GenreWithMovies[];
  loading: boolean;
  error: string | null;
}

// Banner  interface
export interface BannerProps {
  items: TMDBMovie[];
  category: string;
}

// Props for common components
export interface CommonProps {
  message?: string;
}

// Movie Card interface
export interface MovieCardProps {
  movie: TMDBMovie;
  onAdd?: (m: TMDBMovie) => void;
}

// MovieDetails interface
export interface MovieDetailProps {
  movie: TMDBMovie;
}

// alert context interface
export interface AlertCtx {
  message: string | null;
  showAlert: (msg: string) => void;
}

// Wishlist context interface
export interface WishlistCtx {
  list: TMDBMovie[];
  add: (movie: TMDBMovie) => void;
  remove: (id: number) => void;
  has: (id: number) => boolean;
}
