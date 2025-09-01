import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { fetchCategory, fetchMovie } from "../../service/api";
import { mapMovie } from "../../service/mapper/mapper";
import type { TMDBMovie } from "../../../types/interfaces";

/**
 * Hook to fetch a list of TMDB movies by category
 * @param {string} category
 * @returns {movies, loading, error}
 */
export const useMovies = (category: string) => {
  const [state, setState] = useState<{
    movies: TMDBMovie[];
    loading: boolean;
    error: string | null;
  }>({
    movies: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    setState((s) => ({ ...s, loading: true }));
    fetchCategory(category)
      .then((data) => {
        const mapped = data.map(mapMovie);
        setState({ movies: mapped, loading: false, error: null });
      })
      .catch((err) =>
        setState({ movies: [], loading: false, error: err.message })
      );
  }, [category]);

  return state;
};

/**
 * Hook to fetch details of a single TMDB movie
 * @param {number} id Movie ID
 * @returns {movie, loading, error}
 */
export const useMovieDetail = (id?: number) => {
  const [state, setState] = useState<{
    movie?: TMDBMovie;
    loading: boolean;
    error: string | null;
  }>({
    movie: undefined,
    loading: true,
    error: null,
  });

  useEffect(() => {
    if (!id) return;

    setState((s) => ({ ...s, loading: true }));
    fetchMovie(id.toString())
      .then((data) =>
        setState({ movie: mapMovie(data), loading: false, error: null })
      )
      .catch((err) =>
        setState({ movie: undefined, loading: false, error: err.message })
      );
  }, [id]);

  return state;
};
