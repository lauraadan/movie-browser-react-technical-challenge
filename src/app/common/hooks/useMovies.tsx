import { useState, useEffect } from "react";
import {
  fetchCategory,
  fetchMovie,
  fetchMoviesByGenre,
} from "../../service/api";
import { mapMovie } from "../../service/mapper/mapper";
import type {
  MovieDetailState,
  MovieGenresState,
  MoviesState,
} from "../../../types/interfaces";

export const useMovies = (category: string) => {
  const [state, setState] = useState<MoviesState>({
    movies: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    setState((s) => ({ ...s, loading: true }));
    fetchCategory(category)
      .then((data) =>
        setState({ movies: data.map(mapMovie), loading: false, error: null })
      )
      .catch((err: Error) =>
        setState({ movies: [], loading: false, error: err.message })
      );
  }, [category]);

  return state;
};

export const useMovieDetail = (id?: number) => {
  const [state, setState] = useState<MovieDetailState>({
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
      .catch((err: Error) =>
        setState({ movie: undefined, loading: false, error: err.message })
      );
  }, [id]);

  return state;
};

export const useMovieGenres = () => {
  const [state, setState] = useState<MovieGenresState>({
    genres: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    fetchMoviesByGenre()
      .then((data) =>
        setState({ genres: data || [], loading: false, error: null })
      )
      .catch((err: Error) =>
        setState({ genres: [], loading: false, error: err.message })
      );
  }, []);

  return state;
};
