import { describe, it, expect, vi } from "vitest";
import { mapMovie, getMoviePoster, getMovieBackdrop } from "./mapper";
import { IMG } from "../api";

vi.mock("../api", () => ({
  IMG: {
    poster: vi.fn((path, size) => `poster-${path}-${size}`),
    backdrop: vi.fn((path, size) => `backdrop-${path}-${size}`),
  },
}));

describe("Movie Utils", () => {
  const apiData = {
    id: 1,
    title: "Test Movie",
    overview: "A great movie",
    poster_path: "/poster.jpg",
    backdrop_path: "/backdrop.jpg",
    vote_average: 8.5,
    release_date: "2023-01-01",
    genre_ids: [1, 2, 3],
  };

  it("maps API data to TMDBMovie correctly", () => {
    const movie = mapMovie(apiData);
    expect(movie.id).toBe(apiData.id);
    expect(movie.title).toBe(apiData.title);
    expect(movie.overview).toBe(apiData.overview);
    expect(movie.poster_path).toBe(apiData.poster_path);
    expect(movie.backdrop_path).toBe(apiData.backdrop_path);
    expect(movie.vote_average).toBe(apiData.vote_average);
    expect(movie.release_date).toBe(apiData.release_date);
    expect(movie.genre_ids).toEqual(apiData.genre_ids);
    expect(new Date(movie.addedAt!).getTime()).toBeLessThanOrEqual(Date.now());
  });

  it("handles nulls and missing fields in mapMovie", () => {
    const partialData = { id: 2, title: "Partial Movie" };
    const movie = mapMovie(partialData);
    expect(movie.overview).toBeNull();
    expect(movie.poster_path).toBeNull();
    expect(movie.backdrop_path).toBeNull();
    expect(movie.vote_average).toBeNull();
    expect(movie.release_date).toBeNull();
    expect(movie.genre_ids).toEqual([]);
  });

  it("returns correct poster URL", () => {
    const movie = mapMovie(apiData);
    expect(getMoviePoster(movie)).toBe("poster-/poster.jpg-w342");
    expect(getMoviePoster(movie, "w185")).toBe("poster-/poster.jpg-w185");
    expect(getMoviePoster(movie, "w500")).toBe("poster-/poster.jpg-w500");
  });

  it("returns correct backdrop URL", () => {
    const movie = mapMovie(apiData);
    expect(getMovieBackdrop(movie)).toBe("backdrop-/backdrop.jpg-w780");
    expect(getMovieBackdrop(movie, "w1280")).toBe(
      "backdrop-/backdrop.jpg-w1280"
    );
    expect(getMovieBackdrop(movie, "original")).toBe(
      "backdrop-/backdrop.jpg-original"
    );
  });

  it("handles null poster_path and backdrop_path", () => {
    const movie = mapMovie({ id: 3, title: "No Images" });
    expect(getMoviePoster(movie)).toBe("poster-null-w342");
    expect(getMovieBackdrop(movie)).toBe("backdrop-null-w780");
  });
});
