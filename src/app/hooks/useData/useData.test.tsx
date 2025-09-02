import { renderHook, waitFor } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import { useMovies, useMovieDetail } from "./useData";
import * as api from "../../service/api";
import { TMDBMovie } from "../../../types/interfaces";

vi.mock("../../service/api");

describe("useMovies and useMovieDetail hooks", () => {
  const movies: TMDBMovie[] = [
    {
      id: 1,
      title: "Movie 1",
      overview: "",
      poster_path: null,
      backdrop_path: null,
      vote_average: 8,
      release_date: "2023-01-01",
      addedAt: new Date().toISOString(),
      genre_ids: [1],
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("useMovies fetches movies successfully", async () => {
    (api.fetchCategory as any).mockResolvedValueOnce(movies);

    const { result } = renderHook(() => useMovies("popular"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(movies);
    expect(result.current.error).toBeNull();
  });

  it("useMovies handles fetch error", async () => {
    (api.fetchCategory as any).mockRejectedValueOnce(
      new Error("Network error")
    );

    const { result } = renderHook(() => useMovies("popular"));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toBe(undefined);
    expect(result.current.error).toBe("Network error");
  });

  it("useMovieDetail fetches movie successfully", async () => {
    const movie = movies[0];
    (api.fetchMovie as any).mockResolvedValueOnce(movie);

    const { result } = renderHook(() => useMovieDetail(1));

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.data).toEqual(movie);
    expect(result.current.error).toBeNull();
  });

  it("useMovieDetail handles fetch error", async () => {
    (api.fetchMovie as any).mockRejectedValueOnce(new Error("Not found"));

    const { result } = renderHook(() => useMovieDetail(1));
    const callHook = () => useMovieDetail(undefined as any);
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toBe(undefined);
    expect(callHook).toThrowError("useMovieDetail requires a valid movie id");
    expect(result.current.error).toBe("Not found");
  });
});
