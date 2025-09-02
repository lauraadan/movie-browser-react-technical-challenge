import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Wishlist from "../pages/Wishlist";
import { useInitialData } from "../common/hooks/useInitialData";
import { useWishlist } from "../common/hooks/useWishlist";

vi.mock("../common/hooks/useInitialData", () => ({
  useInitialData: vi.fn(),
}));

vi.mock("../common/hooks/useWishlist", () => ({
  useWishlist: vi.fn(),
}));

vi.mock("../service/api", () => ({
  IMG: {
    poster: (path: string) => `poster/${path}`,
  },
}));

vi.mock("../common/components/Loading", () => ({
  default: () => <div data-testid="loading">Loading...</div>,
}));

describe("Wishlist component", () => {
  const mockList = [
    { id: 1, title: "Movie 1", poster_path: "p1.jpg" },
    { id: 2, title: "Movie 2", poster_path: "p2.jpg" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Loading if list is undefined", () => {
    (useInitialData as any).mockReturnValue({});
    (useWishlist as any).mockReturnValue({ list: undefined, remove: vi.fn() });

    render(<Wishlist />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders empty wishlist message if list and initial wishlist are empty", () => {
    (useInitialData as any).mockReturnValue({ wishlist: [] });
    (useWishlist as any).mockReturnValue({ list: [], remove: vi.fn() });

    render(<Wishlist />);
    expect(screen.getByText("Your wishlist is empty.")).toBeInTheDocument();
  });

  it("renders wishlist items from hook list", () => {
    const removeMock = vi.fn();
    (useInitialData as any).mockReturnValue({ wishlist: [] });
    (useWishlist as any).mockReturnValue({
      list: mockList,
      remove: removeMock,
    });

    render(<Wishlist />);

    const items = screen.getAllByRole("img");
    expect(items).toHaveLength(2);
    expect(items[0]).toHaveAttribute("src", "poster/p1.jpg");
    expect(items[0]).toHaveAttribute("alt", "Movie 1");
    expect(items[1]).toHaveAttribute("src", "poster/p2.jpg");

    const removeButtons = screen.getAllByText(/Remove from wishlist/i);
    fireEvent.click(removeButtons[0]);
    expect(removeMock).toHaveBeenCalledWith(1);
  });

  it("renders wishlist items from initial data if list is empty", () => {
    const removeMock = vi.fn();
    (useInitialData as any).mockReturnValue({ wishlist: mockList });
    (useWishlist as any).mockReturnValue({ list: [], remove: removeMock });

    render(<Wishlist />);

    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.getByText("Movie 2")).toBeInTheDocument();
  });
});
