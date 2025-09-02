import React from "react";
import { describe, it, vi, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";

import Categories from "./Categories";

// --- Mock dependencias
vi.mock("../../components/Loading/Loading", () => ({
  default: () => <div>Loading...</div>,
}));
vi.mock("../../components/Error/Error", () => ({
  default: () => <div>Error!</div>,
}));
vi.mock("../../components/Banner/Banner", () => ({
  default: ({ items }: any) => (
    <div>Banner with {items?.length ?? 0} items</div>
  ),
}));
vi.mock("../../components/Carousel/Carousel", () => ({
  default: ({ title }: any) => <div>Carousel: {title}</div>,
}));

// Mock hooks
vi.mock("../../hooks/useMovies/useMovies", () => ({
  useMovieGenres: vi.fn(),
  useMovies: vi.fn(),
}));

import { useMovieGenres, useMovies } from "../../hooks/useMovies/useMovies";

describe("Categories", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders loading state", () => {
    (useMovieGenres as vi.Mock).mockReturnValue({
      genres: [],
      loading: true,
      error: false,
    });
    (useMovies as vi.Mock).mockReturnValue({ movies: [] });

    render(<Categories />);
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("renders error state", () => {
    (useMovieGenres as vi.Mock).mockReturnValue({
      genres: [],
      loading: false,
      error: true,
    });
    (useMovies as vi.Mock).mockReturnValue({ movies: [] });

    render(<Categories />);
    expect(screen.getByText(/error/i)).toBeInTheDocument();
  });

  it("renders no genres message", () => {
    (useMovieGenres as vi.Mock).mockReturnValue({
      genres: [],
      loading: false,
      error: false,
    });
    (useMovies as vi.Mock).mockReturnValue({ movies: [] });

    render(<Categories />);
    expect(screen.getByText(/no movies found for genres/i)).toBeInTheDocument();
  });

  it("renders genres with movies", () => {
    (useMovieGenres as vi.Mock).mockReturnValue({
      genres: [
        {
          genreId: 1,
          genreName: "Action",
          movies: [{ id: 101, title: "Die Hard" }],
        },
        {
          genreId: 2,
          genreName: "Comedy",
          movies: [{ id: 202, title: "The Mask" }],
        },
      ],
      loading: false,
      error: false,
    });
    (useMovies as vi.Mock).mockReturnValue({
      movies: [{ id: 999, title: "Top Rated Movie" }],
    });

    render(<Categories />);

    expect(screen.getByText(/categories/i)).toBeInTheDocument();
    expect(screen.getByText(/banner with 1 items/i)).toBeInTheDocument();
    expect(screen.getByText(/carousel: action/i)).toBeInTheDocument();
    expect(screen.getByText(/carousel: comedy/i)).toBeInTheDocument();
  });
});
