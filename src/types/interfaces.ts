/**
 * Global interfaces and types for the app.
 * Exported for reuse across the codebase.
 */

/** Category identifier from TMDB we support */
export type Category = "popular" | "top_rated" | "now_playing";

/** Movie entity from TMDB simplified */
export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  addedAt: string;
}

/** Wishlist domain */
export interface WishlistItem {
  id: number;
  title: string;
  poster: string | null;
  addedAt: string;
}

/** Generic API response wrapper */
export type ApiResponse<T> = T;

/** Context contracts */
export interface WishlistContextValue {
  add: (m: TMDBMovie) => void;
  remove: (id: number) => void;
  has: (id: number) => boolean;
  items: TMDBMovie[];
}

export interface Alert {
  message: string;
  type?: "success" | "error" | "info";
}

export interface AlertContextValue {
  alert: Alert | null;
  show: (a: Alert) => void;
  clear: () => void;
}