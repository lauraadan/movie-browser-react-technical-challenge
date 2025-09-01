import { render, waitFor } from "@testing-library/react";
import React from "react";
import { vi, expect, it } from "vitest";
import { WishlistProvider, Ctx } from "./wishlistContext";
import { readWishlistIds, loadMoviesByIds } from "../../service/api";

vi.mock("../../service/api", () => ({
  readWishlistIds: vi.fn(),
  loadMoviesByIds: vi.fn(),
  writeWishlistIds: vi.fn(),
}));

it("loads movies from readWishlistIds if initial list is empty", async () => {
  const movie1 = { id: 1, title: "Movie 1" };
  const movie2 = { id: 2, title: "Movie 2" };

  // @ts-ignore
  readWishlistIds.mockReturnValue([1, 2]);
  // @ts-ignore
  loadMoviesByIds.mockResolvedValue([movie1, movie2]);

  let contextValue: any = null;

  const TestComponent = () => {
    contextValue = React.useContext(Ctx);
    return null;
  };

  render(
    <WishlistProvider>
      <TestComponent />
    </WishlistProvider>
  );

  await waitFor(() => expect(contextValue.list.length).toBe(2));

  expect(loadMoviesByIds).toHaveBeenCalledWith([1, 2]);
  expect(contextValue.list).toEqual([movie1, movie2]);
});
