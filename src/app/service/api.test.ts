import { describe, it, vi, beforeEach, expect } from "vitest";
import * as api from "./api";

describe("API helpers full coverage", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
    document.cookie = "";
  });

  it("IMG.poster and IMG.backdrop return URL or placeholder", () => {
    expect(api.IMG.poster("/path.jpg")).toContain("/path.jpg");
    expect(api.IMG.poster(null)).toBe("/placeholder.jpg");
    expect(api.IMG.backdrop("/backdrop.jpg")).toContain("/backdrop.jpg");
    expect(api.IMG.backdrop(null)).toBe("/placeholder-wide.jpg");
  });

  it("fetchCategory success", async () => {
    const mockData = [{ id: 1, title: "M1" }];
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve(mockData) })
      )
    );
    const res = await api.fetchCategory("popular");
    expect(res).toEqual(mockData);
  });

  it("fetchCategory fail", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: false }))
    );
    await expect(api.fetchCategory("popular")).rejects.toThrow(
      "Failed to fetch category popular"
    );
  });

  it("fetchMovie success", async () => {
    const movie = { id: 1, title: "M1" };
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve(movie) })
      )
    );
    const res = await api.fetchMovie("1");
    expect(res).toEqual(movie);
  });

  it("fetchMovie fail", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: false }))
    );
    await expect(api.fetchMovie("1")).rejects.toThrow(
      "Failed to fetch movie 1"
    );
  });

  it("fetchMoviesByGenre success returns array", async () => {
    const genres = [{ genreId: 1, genreName: "Action", movies: [] }];
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve(genres) })
      )
    );
    const res = await api.fetchMoviesByGenre();
    expect(res).toEqual(genres);
  });

  it("fetchMoviesByGenre success returns object with .genres", async () => {
    const genresObj = {
      genres: [{ genreId: 2, genreName: "Drama", movies: [] }],
    };
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({ ok: true, json: () => Promise.resolve(genresObj) })
      )
    );
    const res = await api.fetchMoviesByGenre();
    expect(res).toEqual(genresObj.genres);
  });

  it("fetchMoviesByGenre fail", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(() => Promise.resolve({ ok: false }))
    );
    await expect(api.fetchMoviesByGenre()).rejects.toThrow(
      "Failed to fetch genres"
    );
  });

  it("write and read wishlist ids", () => {
    api.writeWishlistIds([1, 2]);
    expect(api.readWishlistIds()).toEqual([1, 2]);
  });

  it("readWishlistIds malformed cookie", () => {
    document.cookie = "wishlist=not-json";
    expect(api.readWishlistIds()).toEqual([]);
  });

  it("loadMoviesByIds returns movies", async () => {
    const mockMovies = [
      { id: 1, title: "M1" },
      { id: 2, title: "M2" },
    ];
    vi.stubGlobal(
      "fetch",
      vi.fn((url) => {
        const id = Number(url.toString().split("/").pop());
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockMovies.find((m) => m.id === id)),
        });
      })
    );
    const res = await api.loadMoviesByIds([1, 2]);
    expect(res).toEqual(mockMovies);
  });

  it("loadMoviesByIds empty array returns []", async () => {
    const res = await api.loadMoviesByIds([]);
    expect(res).toEqual([]);
  });
});
