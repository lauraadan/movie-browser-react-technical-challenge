export type TMDBMovie = {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  vote_average: number;
  release_date: string;
  addedAt: string;
};

export const IMG = {
  poster: (path: string | null, size: "w185" | "w342" | "w500" = "w342") =>
    path ? `https://image.tmdb.org/t/p/${size}${path}` : "/placeholder.jpg",
  backdrop: (
    path: string | null,
    size: "w780" | "w1280" | "original" = "w780"
  ) =>
    path
      ? `https://image.tmdb.org/t/p/${size}${path}`
      : "/placeholder-wide.jpg",
};

export async function fetchCategory(category: string): Promise<TMDBMovie[]> {
  const r = await fetch(`/api/movies?category=${encodeURIComponent(category)}`);
  return r.json();
}

export async function fetchMovie(id: string) {
  const res = await fetch(`/api/movie/${id}`);
  return res.json();
}

// Wishlist cookie helpers (client-side)
// We store only an array of numeric IDs in the cookie for robustness,
// then fetch full movie objects server-side or on-demand in the client.

export function readWishlistIds(): number[] {
  try {
    const m = document.cookie.match(/(?:^|; )wishlist=([^;]+)/);
    return m
      ? JSON.parse(decodeURIComponent(m[1])).map((x: any) => Number(x))
      : [];
  } catch {
    return [];
  }
}

export function writeWishlistIds(ids: number[]) {
  try {
    const value = encodeURIComponent(JSON.stringify(ids));
    document.cookie = `wishlist=${value}; path=/; max-age=31536000`;
  } catch {}
}

export async function loadMoviesByIds(ids: number[]): Promise<TMDBMovie[]> {
  if (!ids || ids.length === 0) return [];
  const results = await Promise.all(
    ids.map((id) => fetch(`/api/movie/${id}`).then((r) => r.json()))
  );
  return results;
}
