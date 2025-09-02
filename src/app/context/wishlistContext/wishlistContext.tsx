import React, { ReactNode, useEffect, useState, useCallback } from "react";
import {
  readWishlistIds,
  writeWishlistIds,
  loadMoviesByIds,
} from "../../service/api";
import { TMDBMovie, WishlistCtx } from "../../../types/interfaces";

export const Ctx = React.createContext<WishlistCtx | null>(null);

// Props interface
interface WishlistProviderProps {
  children: ReactNode;
  initial?: TMDBMovie[];
}

export const WishlistProvider = ({
  children,
  initial,
}: WishlistProviderProps): JSX.Element => {
  const [list, setList] = useState<TMDBMovie[]>(initial || []);

  useEffect(() => {
    if (list.length === 0 && typeof window !== "undefined") {
      const ids = readWishlistIds();
      if (ids.length > 0) {
        loadMoviesByIds(ids).then((movies) => setList(movies));
      }
    }
  }, []);

  const syncIds = useCallback((movies: TMDBMovie[]) => {
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
