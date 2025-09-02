import React, { useContext } from "react";
import { Ctx } from "../context/wishlistContext";
import { useAlert } from "./useAlert";
import { WishlistCtx, TMDBMovie } from "../../../types/interfaces";

export const useWishlist = (): WishlistCtx => {
  const ctx = useContext(Ctx);
  const { showAlert } = useAlert();

  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");

  const addWithAlert = (movie: TMDBMovie) => {
    ctx.add(movie);
    showAlert(`${movie.title} added to wishlist`);
  };

  const removeWithAlert = (id: number) => {
    const movie = ctx.list.find((m) => m.id === id);
    ctx.remove(id);
    if (movie) showAlert(`${movie.title} removed from wishlist`);
  };

  return {
    ...ctx,
    add: addWithAlert,
    remove: removeWithAlert,
  };
};
