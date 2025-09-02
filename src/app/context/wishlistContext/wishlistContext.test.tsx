import React from "react";
import { render, act, renderHook } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { WishlistProvider, Ctx } from "./wishlistContext";
import { TMDBMovie, WishlistCtx } from "../../../types/interfaces";
import * as api from "../../service/api";

vi.mock("../../service/api", () => ({
  readWishlistIds: vi.fn(),
  writeWishlistIds: vi.fn(),
  loadMoviesByIds: vi.fn(),
}));

describe("WishlistProvider", () => {
  const movie1: TMDBMovie = { id: 1, title: "Movie 1" } as any;
  const movie2: TMDBMovie = { id: 2, title: "Movie 2" } as any;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("provides initial list", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <WishlistProvider initial={[movie1]}>{children}</WishlistProvider>
    );
    const { result } = renderHook(() => React.useContext(Ctx) as WishlistCtx, {
      wrapper,
    });
    expect(result.current.list).toEqual([movie1]);
  });

  it("loads movies from API if no initial list", async () => {
    (api.readWishlistIds as vi.Mock).mockReturnValue([1, 2]);
    (api.loadMoviesByIds as vi.Mock).mockResolvedValue([movie1, movie2]);

    await act(async () => {
      render(
        <WishlistProvider>
          <Ctx.Consumer>
            {(ctx) => <span>{ctx?.list.length}</span>}
          </Ctx.Consumer>
        </WishlistProvider>
      );
    });

    expect(api.readWishlistIds).toHaveBeenCalled();
    expect(api.loadMoviesByIds).toHaveBeenCalledWith([1, 2]);
  });

  it("add adds a movie if not in list", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <WishlistProvider initial={[movie1]}>{children}</WishlistProvider>
    );
    const { result } = renderHook(() => React.useContext(Ctx) as WishlistCtx, {
      wrapper,
    });

    act(() => {
      result.current.add(movie2);
    });

    expect(result.current.list).toContain(movie2);
    expect(api.writeWishlistIds).toHaveBeenCalledWith([1, 2]);
  });

  it("add does not add duplicate", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <WishlistProvider initial={[movie1]}>{children}</WishlistProvider>
    );
    const { result } = renderHook(() => React.useContext(Ctx) as WishlistCtx, {
      wrapper,
    });

    act(() => {
      result.current.add(movie1);
    });

    expect(result.current.list).toHaveLength(1);
  });

  it("remove removes a movie", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <WishlistProvider initial={[movie1, movie2]}>{children}</WishlistProvider>
    );
    const { result } = renderHook(() => React.useContext(Ctx) as WishlistCtx, {
      wrapper,
    });

    act(() => {
      result.current.remove(1);
    });

    expect(result.current.list).toEqual([movie2]);
    expect(api.writeWishlistIds).toHaveBeenCalledWith([2]);
  });

  it("has returns true if movie exists, false otherwise", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <WishlistProvider initial={[movie1]}>{children}</WishlistProvider>
    );
    const { result } = renderHook(() => React.useContext(Ctx) as WishlistCtx, {
      wrapper,
    });

    expect(result.current.has(1)).toBe(true);
    expect(result.current.has(999)).toBe(false);
  });
});
