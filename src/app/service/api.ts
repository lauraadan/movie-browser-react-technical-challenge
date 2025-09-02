import { TMDBMovie, GenreWithMovies } from "../../types/interfaces";

export const IMG = {
  poster: (
    path: string | null,
    size: "w185" | "w342" | "w500" = "w342"
  ): string =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : "/placeholder.jpg",
  backdrop: (
    path: string | null,
    size: "w780" | "w1280" | "original" = "w780"
  ): string =>
    path
      ? `https://image.tmdb.org/t/p/${size}${path}`
      : "/placeholder-wide.jpg",
};

export async function fetchCategory(category: string): Promise<TMDBMovie[]> {
  const res = await fetch(
    `/api/movies?category=${encodeURIComponent(category)}`
  );
  if (!res.ok) throw new Error(`Failed to fetch category ${category}`);
  return res.json();
}

export async function fetchMovie(id: string): Promise<TMDBMovie> {
  const res = await fetch(`/api/movie/${id}`);
  if (!res.ok) throw new Error(`Failed to fetch movie ${id}`);
  return res.json();
}

export async function fetchMoviesByGenre(): Promise<GenreWithMovies[]> {
  const res = await fetch(`/api/genres`);
  if (!res.ok) throw new Error("Failed to fetch genres");
  const data = await res.json();
  return Array.isArray(data) ? data : data.genres;
}

export function readWishlistIds(): number[] {
  try {
    const match = document.cookie.match(/(?:^|; )wishlist=([^;]+)/);
    return match
      ? JSON.parse(decodeURIComponent(match[1])).map((x: any) => Number(x))
      : [];
  } catch {
    return [];
  }
}

export function writeWishlistIds(ids: number[]): void {
  try {
    const value = encodeURIComponent(JSON.stringify(ids));
    document.cookie = `wishlist=${value}; path=/; max-age=31536000`;
  } catch {}
}

export async function loadMoviesByIds(ids: number[]): Promise<TMDBMovie[]> {
  if (!ids.length) return [];
  const results = await Promise.all(
    ids.map((id) => fetch(`/api/movie/${id}`).then((r) => r.json()))
  );
  return results;
}
