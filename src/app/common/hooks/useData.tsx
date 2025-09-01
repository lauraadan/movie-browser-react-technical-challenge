import { useFetchData } from "../hooks/useFetchData";
import { fetchCategory, fetchMovie } from "../../service/api";
import { TMDBMovie } from "../../../types/interfaces";

export function useMovies(category: string) {
  return useFetchData<TMDBMovie[]>(() => fetchCategory(category), [category]);
}
export function useMovieDetail(id?: number) {
  return useFetchData<TMDBMovie>(() => fetchMovie(id!.toString()), [id]);
}
