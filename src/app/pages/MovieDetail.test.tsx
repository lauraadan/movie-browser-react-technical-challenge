import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import MovieDetail from "../pages/MovieDetail";
import { useParams } from "react-router-dom";
import { useInitialData } from "../common/hooks/useInitialData";
import { useWishlist } from "../common/hooks/useWishlist";
import { fetchMovie } from "../service/api";

vi.mock("react-router-dom", () => ({
  useParams: vi.fn(),
  useSearchParams: vi.fn(() => [new URLSearchParams({ cat: "popular" })]),
}));

vi.mock("../common/hooks/useInitialData", () => ({
  useInitialData: vi.fn(),
}));

vi.mock("../common/hooks/useWishlist", () => ({
  useWishlist: vi.fn(),
}));

vi.mock("../service/api", () => ({
  fetchMovie: vi.fn(),
  IMG: {
    poster: (path: string) => `poster/${path}`,
    backdrop: (path: string) => `backdrop/${path}`,
  },
}));

vi.mock("../common/components/Loading", () => ({
  default: () => <div data-testid="loading">Loading...</div>,
}));

vi.mock("../common/components/BackToHome", () => ({
  default: () => <div data-testid="back-to-home" />,
}));

describe("MovieDetail component", () => {
  const movie = {
    id: 1,
    title: "Test Movie",
    overview: "Overview text",
    poster_path: "poster.jpg",
    backdrop_path: "backdrop.jpg",
    vote_average: 8.5,
    release_date: "2023-01-01",
  };

  beforeEach(() => {
    vi.clearAllMocks();
    (useParams as any).mockReturnValue({ id: "1" });
    (fetchMovie as any).mockResolvedValue(movie);
    (useWishlist as any).mockReturnValue({
      add: vi.fn(),
      remove: vi.fn(),
      has: vi.fn().mockReturnValue(false),
    });
  });
  it("renders Loading if no initial movie", () => {
    (useInitialData as any).mockReturnValue({});
    (useWishlist as any).mockReturnValue({
      add: vi.fn(),
      remove: vi.fn(),
      has: vi.fn().mockReturnValue(false),
    });

    render(<MovieDetail />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders movie details if initial movie exists", () => {
    (useInitialData as any).mockReturnValue({ movie });
    (useWishlist as any).mockReturnValue({
      add: vi.fn(),
      remove: vi.fn(),
      has: vi.fn().mockReturnValue(false),
    });

    render(<MovieDetail />);

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("Overview text")).toBeInTheDocument();
    expect(screen.getByText("Add to wishlist")).toBeInTheDocument();
    expect(screen.getByTestId("back-to-home")).toBeInTheDocument();

    const images = screen.getAllByRole("img", { name: /Test Movie/i });
    expect(images).toHaveLength(2);
    expect(images[0]).toHaveAttribute("src", "backdrop/backdrop.jpg");
    expect(images[1]).toHaveAttribute("src", "poster/poster.jpg");
  });

  it("fetches movie if initial movie is null", async () => {
    (useInitialData as any).mockReturnValue({});
    (fetchMovie as any).mockResolvedValue(movie);

    (useWishlist as any).mockReturnValue({
      add: vi.fn(),
      remove: vi.fn(),
      has: vi.fn().mockReturnValue(false),
    });

    render(<MovieDetail />);

    await waitFor(() => {
      expect(fetchMovie).toHaveBeenCalledWith("1");
    });
  });

  it("toggles wishlist on button click", () => {
    (useInitialData as any).mockReturnValue({ movie });
    const addMock = vi.fn();
    const removeMock = vi.fn();
    const hasMock = vi.fn().mockReturnValue(false);

    (useWishlist as any).mockReturnValue({
      add: addMock,
      remove: removeMock,
      has: hasMock,
    });

    render(<MovieDetail />);

    const button = screen.getByText("Add to wishlist");
    fireEvent.click(button);
    expect(addMock).toHaveBeenCalledWith(expect.objectContaining({ id: 1 }));

    hasMock.mockReturnValue(true);
    render(<MovieDetail />);
    const removeButton = screen.getByText("Remove from wishlist");
    fireEvent.click(removeButton);
    expect(removeMock).toHaveBeenCalledWith(1);
  });
});
