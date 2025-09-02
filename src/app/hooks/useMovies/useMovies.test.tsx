import { describe, it, vi, beforeEach, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useMovies, useMovieDetail, useMovieGenres } from "./useMovies";
import * as api from "../../service/api";

vi.mock("../../service/api");

describe("useMovies hooks", () => {
  const mockMovies = [
    {
      id: 1,
      title: "Movie 1",
      overview: "",
      poster_path: null,
      backdrop_path: null,
      vote_average: 8,
      release_date: "2025-01-01",
      genre_ids: [],
    },
  ];

  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("useMovies fetches movies successfully", async () => {
    (api.fetchCategory as any).mockResolvedValue(mockMovies);

    const { result } = renderHook(() => useMovies("popular"));

    expect(result.current.loading).toBe(true);
    expect(result.current.movies).toEqual([]);
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.movies.length).toBe(1);
      expect(result.current.movies[0].id).toBe(1);
      expect(result.current.error).toBeNull();
    });
  });

  it("useMovies handles fetch error", async () => {
    (api.fetchCategory as any).mockRejectedValue(new Error("fail"));

    const { result } = renderHook(() => useMovies("popular"));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.movies).toEqual([]);
      expect(result.current.error).toBe("fail");
    });
  });

  it("useMovieDetail fetches single movie successfully", async () => {
    (api.fetchMovie as any).mockResolvedValue(mockMovies[0]);

    const { result } = renderHook(() => useMovieDetail(1));

    expect(result.current.loading).toBe(true);
    expect(result.current.movie).toBeUndefined();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.movie?.id).toBe(1);
      expect(result.current.error).toBeNull();
    });
  });

  it("useMovieDetail handles fetch error", async () => {
    (api.fetchMovie as any).mockRejectedValue(new Error("fail"));

    const { result } = renderHook(() => useMovieDetail(1));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.movie).toBeUndefined();
      expect(result.current.error).toBe("fail");
    });
  });

  it("useMovieGenres fetches genres successfully", async () => {
    const genres = [{ genreId: 1, genreName: "Action", movies: [] }];
    (api.fetchMoviesByGenre as any).mockResolvedValue(genres);

    const { result } = renderHook(() => useMovieGenres());

    expect(result.current.loading).toBe(true);
    expect(result.current.genres).toEqual([]);

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.genres).toEqual(genres);
      expect(result.current.error).toBeNull();
    });
  });

  it("useMovieGenres handles fetch error", async () => {
    (api.fetchMoviesByGenre as any).mockRejectedValue(new Error("fail"));

    const { result } = renderHook(() => useMovieGenres());

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.genres).toEqual([]);
      expect(result.current.error).toBe("fail");
    });
  });
});
