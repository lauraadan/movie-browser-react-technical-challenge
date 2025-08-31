import React from "react";
import { Ctx, WishlistCtx } from "../context/wishlistContext";
import { useAlert } from "./useAlert";

export const useWishlist = (): WishlistCtx => {
  const ctx = React.useContext(Ctx);
  const { showAlert } = useAlert(); // 👈 usamos alert dentro del hook

  if (!ctx) throw new Error("useWishlist must be used within WishlistProvider");

  // Re-definimos add y remove para disparar alert
  const addWithAlert = (movie: Parameters<WishlistCtx["add"]>[0]) => {
    ctx.add(movie);
    showAlert(`${movie.title} added to wishlist `);
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
