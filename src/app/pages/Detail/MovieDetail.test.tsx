import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import MovieDetail from "./MovieDetail";
import { useMovieDetail } from "../../hooks/useMovies/useMovies";
import { useWishlist } from "../../hooks/useWishlist/useWishlist";

vi.mock("../../hooks/useMovies/useMovies");
vi.mock("../../hooks/useWishlist/useWishlist");

const mockMovie = {
  id: 1,
  title: "Test Movie",
  overview: "This is a test movie.",
  poster_path: "/poster.jpg",
  backdrop_path: "/backdrop.jpg",
  vote_average: 8.5,
  release_date: "2025-09-02",
} as const;

describe("MovieDetail", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    (useWishlist as any).mockReturnValue({
      add: vi.fn(),
      remove: vi.fn(),
      has: vi.fn().mockReturnValue(false),
    });
  });
  it("renders loading state", () => {
    (useMovieDetail as any).mockReturnValue({
      movie: null,
      loading: true,
      error: false,
    });

    render(
      <MemoryRouter initialEntries={["/movie/1"]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Query by class
    const spinner = document.querySelector(".spinner");
    expect(spinner).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useMovieDetail as any).mockReturnValue({
      movie: null,
      loading: false,
      error: true,
    });

    render(
      <MemoryRouter initialEntries={["/movie/1"]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Match actual text rendered by Error component
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it("renders not found state", () => {
    (useMovieDetail as any).mockReturnValue({
      movie: null,
      loading: false,
      error: false,
    });

    render(
      <MemoryRouter initialEntries={["/movie/1"]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Match the actual text in NotFound component
    expect(screen.getByText(/this page does not exist/i)).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /back home/i })
    ).toBeInTheDocument();
  });

  it("renders movie detail and handles wishlist toggle", () => {
    const add = vi.fn();
    const remove = vi.fn();
    const has = vi.fn().mockReturnValue(false);

    (useMovieDetail as any).mockReturnValue({
      movie: mockMovie,
      loading: false,
      error: false,
    });
    (useWishlist as any).mockReturnValue({ add, remove, has });

    render(
      <MemoryRouter initialEntries={["/movie/1?cat=action"]}>
        <Routes>
          <Route path="/movie/:id" element={<MovieDetail />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Test Movie")).toBeInTheDocument();
    expect(screen.getByText("Action")).toBeInTheDocument();
    expect(screen.getByText(/Add to wishlist/i)).toBeInTheDocument();

    const button = screen.getByRole("button", { name: /add to wishlist/i });
    fireEvent.click(button);

    expect(add).toHaveBeenCalledWith(
      expect.objectContaining({
        id: 1,
        title: "Test Movie",
      })
    );
  });
});
