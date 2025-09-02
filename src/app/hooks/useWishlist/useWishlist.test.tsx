import { vi } from "vitest";
import { ReactNode } from "react";
import { renderHook, act } from "@testing-library/react";
import { useWishlist } from "./useWishlist";
import { Ctx } from "../../context/wishlistContext/wishlistContext";
import { TMDBMovie, WishlistCtx } from "../../../types/interfaces";

const showAlertMock = vi.fn();

vi.mock("../useAlert/useAlert", () => ({
  useAlert: () => ({ showAlert: showAlertMock }),
}));

vi.mock("../../service/api", () => ({
  fetchCategory: vi.fn(),
  fetchMovie: vi.fn(),
}));

describe("useWishlist hook", () => {
  const movie: TMDBMovie = { id: 1, title: "Test Movie" };
  let ctxValue: WishlistCtx;

  beforeEach(() => {
    vi.clearAllMocks();
    ctxValue = {
      list: [movie],
      add: vi.fn(),
      remove: vi.fn(),
      has: vi.fn().mockReturnValue(true),
    };
  });

  it("throws error if used outside WishlistProvider", () => {
    expect(() => renderHook(() => useWishlist())).toThrow(
      "useWishlist must be used within WishlistProvider"
    );
  });

  it("add calls ctx.add and showAlert", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Ctx.Provider value={ctxValue}>{children}</Ctx.Provider>
    );

    const { result } = renderHook(() => useWishlist(), { wrapper });

    act(() => result.current.add(movie));

    expect(ctxValue.add).toHaveBeenCalledWith(movie);
    expect(showAlertMock).toHaveBeenCalledWith(
      `${movie.title} added to wishlist`
    );
  });

  it("remove calls ctx.remove and showAlert if movie exists", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Ctx.Provider value={ctxValue}>{children}</Ctx.Provider>
    );

    const { result } = renderHook(() => useWishlist(), { wrapper });

    act(() => result.current.remove(movie.id));

    expect(ctxValue.remove).toHaveBeenCalledWith(movie.id);
    expect(showAlertMock).toHaveBeenCalledWith(
      `${movie.title} removed from wishlist`
    );
  });

  it("remove calls ctx.remove and does not show alert if movie not found", () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <Ctx.Provider value={{ ...ctxValue, list: [] }}>{children}</Ctx.Provider>
    );

    const { result } = renderHook(() => useWishlist(), { wrapper });

    act(() => result.current.remove(999));

    expect(ctxValue.remove).toHaveBeenCalledWith(999);
    expect(showAlertMock).not.toHaveBeenCalled();
  });
});
