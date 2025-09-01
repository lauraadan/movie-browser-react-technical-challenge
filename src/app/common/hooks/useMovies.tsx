import { useState, useEffect } from "react";
import {
  fetchCategory,
  fetchMovie,
  fetchMoviesByGenre,
} from "../../service/api";
import { mapMovie } from "../../service/mapper/mapper";
import type { TMDBMovie, GenreWithMovies } from "../../../types/interfaces";

export const useMovies = (category: string) => {
  const [state, setState] = useState<{
    movies: TMDBMovie[];
    loading: boolean;
    error: string | null;
  }>({ movies: [], loading: true, error: null });

  useEffect(() => {
    setState((s) => ({ ...s, loading: true }));
    fetchCategory(category)
      .then((data) =>
        setState({ movies: data.map(mapMovie), loading: false, error: null })
      )
      .catch((err) =>
        setState({ movies: [], loading: false, error: err.message })
      );
  }, [category]);

  return state;
};

export const useMovieDetail = (id?: number) => {
  const [state, setState] = useState<{
    movie?: TMDBMovie;
    loading: boolean;
    error: string | null;
  }>({ movie: undefined, loading: true, error: null });

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

export const useMovieGenres = () => {
  const [state, setState] = useState<{
    genres: GenreWithMovies[];
    loading: boolean;
    error: string | null;
  }>({
    genres: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchMoviesByGenre()
      .then((data) => {
        console.log("Fetched genres:", data);
        setState({ genres: data || [], loading: false, error: null });
      })
      .catch((err) =>
        setState({ genres: [], loading: false, error: err.message })
      );
  }, []);

  return state;
};
