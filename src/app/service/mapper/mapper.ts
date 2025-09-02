import { IMG } from "../api";
import { TMDBMovie } from "../../../types/interfaces";

export const mapMovie = (apiData: any): TMDBMovie => ({
  id: apiData.id,
  title: apiData.title,
  overview: apiData.overview ?? null,
  poster_path: apiData.poster_path ?? null,
  backdrop_path: apiData.backdrop_path ?? null,
  vote_average: apiData.vote_average ?? null,
  release_date: apiData.release_date ?? null,
  addedAt: new Date().toISOString(),
  genre_ids: apiData.genre_ids ?? [],
});

export const getMoviePoster = (
  movie: TMDBMovie,
  size: "w185" | "w342" | "w500" = "w342"
): string => IMG.poster(movie.poster_path ?? null, size);

export const getMovieBackdrop = (
  movie: TMDBMovie,
  size: "w780" | "w1280" | "original" = "w780"
): string => IMG.backdrop(movie.backdrop_path ?? null, size);
