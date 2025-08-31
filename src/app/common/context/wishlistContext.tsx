import React from "react";
import {
  TMDBMovie,
  readWishlistIds,
  writeWishlistIds,
  loadMoviesByIds,
} from "../../service/api";

export type WishlistCtx = {
  list: TMDBMovie[];
  add: (movie: TMDBMovie) => void;
  remove: (id: number) => void;
  has: (id: number) => boolean;
};

export const Ctx = React.createContext<WishlistCtx | null>(null);

export const WishlistProvider = ({
  children,
  initial,
}: {
  children: React.ReactNode;
  initial?: TMDBMovie[];
}) => {
  const [list, setList] = React.useState<TMDBMovie[]>(initial || []);

  // Carga inicial desde cookies si no hay SSR
  React.useEffect(() => {
    if (list.length === 0 && typeof window !== "undefined") {
      const ids = readWishlistIds();
      if (ids.length > 0) {
        loadMoviesByIds(ids).then((movies) => setList(movies));
      }
    }
  }, []);

  const syncIds = React.useCallback((movies: TMDBMovie[]) => {
    const ids = movies.map((m) => m.id);
    writeWishlistIds(ids);
  }, []);

  const add = (movie: TMDBMovie) => {
    setList((prev) => {
      if (prev.find((m) => m.id === movie.id)) return prev;
      const next = [...prev, movie];
      syncIds(next);
      return next;
    });
  };

  const remove = (id: number) => {
    setList((prev) => {
      const next = prev.filter((m) => m.id !== id);
      syncIds(next);
      return next;
    });
  };

  const has = (id: number) => list.some((m) => m.id === id);

  return (
    <Ctx.Provider value={{ list, add, remove, has }}>{children}</Ctx.Provider>
  );
};
