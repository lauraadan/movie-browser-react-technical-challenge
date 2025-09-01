import { describe, it, expect, vi, beforeEach } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, act } from "@testing-library/react";
import { Ctx, WishlistCtx } from "../context/wishlistContext";
import { useWishlist } from "../hooks/useWishlist";

const mockShowAlert = vi.fn();
vi.mock("./useAlert", () => ({
  useAlert: () => ({ showAlert: mockShowAlert }),
}));

describe("useWishlist hook - add method", () => {
  const movie1 = { id: 1, title: "Movie 1" };
  const movie2 = { id: 2, title: "Movie 2" };

  beforeEach(() => {
    mockShowAlert.mockClear();
  });

  it("add calls ctx.add and triggers showAlert", () => {
    const ctxValue: WishlistCtx = {
      list: [],
      add: vi.fn(),
      remove: vi.fn(),
      has: vi.fn(),
    };

    let hookValue: ReturnType<typeof useWishlist> | null = null;

    const TestComponent = () => {
      hookValue = useWishlist();
      return null;
    };

    render(
      <Ctx.Provider value={ctxValue}>
        <TestComponent />
      </Ctx.Provider>
    );

    act(() => {
      hookValue?.add(movie1);
    });

    expect(ctxValue.add).toHaveBeenCalledWith(movie1);
    expect(mockShowAlert).toHaveBeenCalledWith("Movie 1 added to wishlist ");

    act(() => {
      hookValue?.add(movie2);
    });

    expect(ctxValue.add).toHaveBeenCalledWith(movie2);
    expect(mockShowAlert).toHaveBeenCalledWith("Movie 2 added to wishlist ");
    expect(ctxValue.add).toHaveBeenCalledTimes(2);
    expect(mockShowAlert).toHaveBeenCalledTimes(2);
  });
});
