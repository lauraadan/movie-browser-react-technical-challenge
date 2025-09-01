/**
 * This mapper file contains functions to transform TMDB API data into application-specific formats.
 */

import { TMDBMovie, IMG } from "../api";

/**
 * Converts a raw TMDB movie API response into a simplified TMDBMovie object
 * @param {any} apiData
 * @returns {TMDBMovie}
 */
export const mapMovie = (apiData: any): TMDBMovie => {
  return {
    id: apiData.id,
    title: apiData.title,
    overview: apiData.overview,
    poster_path: apiData.poster_path,
    backdrop_path: apiData.backdrop_path,
    vote_average: apiData.vote_average,
    release_date: apiData.release_date,
    addedAt: new Date().toISOString(),
  };
};

/**
 * Returns the full poster URL for a TMDB movie
 * @param {TMDBMovie} movie
 * @param {"w185" | "w342" | "w500"} size
 * @returns {string}
 */
export const getMoviePoster = (
  movie: TMDBMovie,
  size: "w185" | "w342" | "w500" = "w342"
): string => {
  return IMG.poster(movie.poster_path, size);
};

/**
 * Returns the full backdrop URL for a TMDB movie
 * @param {TMDBMovie} movie
 * @param {"w780" | "w1280" | "original"} size
 * @returns {string}
 */
export const getMovieBackdrop = (
  movie: TMDBMovie,
  size: "w780" | "w1280" | "original" = "w780"
): string => {
  return IMG.backdrop(movie.backdrop_path, size);
};
