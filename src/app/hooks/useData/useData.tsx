import { useFetchData } from "../../hooks/useFetchData/useFetchData";
import { fetchCategory, fetchMovie } from "../../service/api";
import { TMDBMovie } from "../../../types/interfaces";

export function useMovies(category: string) {
  return useFetchData<TMDBMovie[]>(() => fetchCategory(category), [category]);
}

export function useMovieDetail(id: number) {
  if (id === undefined) {
    throw new Error("useMovieDetail requires a valid movie id");
  }
  return useFetchData<TMDBMovie>(() => fetchMovie(id.toString()), [id]);
}
