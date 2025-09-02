import { describe, it, vi, beforeEach, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import MovieDetail from "./MovieDetail";
import * as moviesHook from "../../hooks/useMovies/useMovies";
import * as wishlistHook from "../../hooks/useWishlist/useWishlist";
import { useParams } from "react-router-dom";
import { TMDBMovie, WishlistCtx } from "../../../types/interfaces";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>(
    "react-router-dom"
  );
  return {
    ...actual,
    useParams: vi.fn(),
  };
});

vi.mock("../../components/Loading/Loading", () => ({
  default: () => <div data-testid="loading" />,
}));
vi.mock("../../components/Error/Error", () => ({
  default: () => <div data-testid="error" />,
}));
vi.mock("../NotFound/NotFound", () => ({
  default: () => <div data-testid="notfound" />,
}));
vi.mock("../../components/BackToHome/BackToHome", () => ({
  default: () => <div data-testid="backtohome" />,
}));

describe("MovieDetail component", () => {
  const movie: TMDBMovie = {
    id: 1,
    title: "Movie 1",
    overview: "Overview",
    poster_path: "poster.jpg",
    backdrop_path: "backdrop.jpg",
    vote_average: 8,
    release_date: "2023-01-01",
    addedAt: new Date().toISOString(),
  } as TMDBMovie;

  let addMock: vi.MockedFunction<WishlistCtx["add"]>;
  let removeMock: vi.MockedFunction<WishlistCtx["remove"]>;
  let hasMock: vi.MockedFunction<WishlistCtx["has"]>;

  beforeEach(() => {
    vi.clearAllMocks();
    (useParams as unknown as vi.Mock).mockReturnValue({ id: "1" });
    addMock = vi.fn();
    removeMock = vi.fn();
    hasMock = vi.fn();
  });

  it("renders Loading when loading", () => {
    vi.spyOn(moviesHook, "useMovieDetail").mockReturnValue({
      movie: undefined,
      loading: true,
      error: null,
    });
    vi.spyOn(wishlistHook, "useWishlist").mockReturnValue({
      add: addMock,
      remove: removeMock,
      has: hasMock,
      list: [],
    });

    render(<MovieDetail />);
    expect(screen.getByTestId("loading")).toBeDefined();
  });

  it("renders Error when there is an error", () => {
    vi.spyOn(moviesHook, "useMovieDetail").mockReturnValue({
      movie: undefined,
      loading: false,
      error: "Error",
    });
    vi.spyOn(wishlistHook, "useWishlist").mockReturnValue({
      add: addMock,
      remove: removeMock,
      has: hasMock,
      list: [],
    });

    render(<MovieDetail />);
    expect(screen.getByTestId("error")).toBeDefined();
  });

  it("renders NotFound when movie is null", () => {
    vi.spyOn(moviesHook, "useMovieDetail").mockReturnValue({
      movie: undefined,
      loading: false,
      error: null,
    });
    vi.spyOn(wishlistHook, "useWishlist").mockReturnValue({
      add: addMock,
      remove: removeMock,
      has: hasMock,
      list: [],
    });

    render(<MovieDetail />);
    expect(screen.getByTestId("notfound")).toBeDefined();
  });

  it("renders movie details and remove from wishlist", () => {
    hasMock.mockReturnValue(true);

    vi.spyOn(moviesHook, "useMovieDetail").mockReturnValue({
      movie,
      loading: false,
      error: null,
    });
    vi.spyOn(wishlistHook, "useWishlist").mockReturnValue({
      add: addMock,
      remove: removeMock,
      has: hasMock,
      list: [movie],
    });

    render(<MovieDetail />);

    expect(screen.getByText("Movie 1")).toBeDefined();
    const btn = screen.getByText("Remove from wishlist");
    fireEvent.click(btn);
    expect(removeMock).toHaveBeenCalledWith(movie.id);
  });

  it("renders movie details and add to wishlist", () => {
    hasMock.mockReturnValue(false);

    vi.spyOn(moviesHook, "useMovieDetail").mockReturnValue({
      movie,
      loading: false,
      error: null,
    });
    vi.spyOn(wishlistHook, "useWishlist").mockReturnValue({
      add: addMock,
      remove: removeMock,
      has: hasMock,
      list: [],
    });

    render(<MovieDetail />);

    expect(screen.getByText("Movie 1")).toBeDefined();
    const btn = screen.getByText("Add to wishlist");
    fireEvent.click(btn);
    expect(addMock).toHaveBeenCalledWith(
      expect.objectContaining({ id: movie.id, title: movie.title })
    );
  });
});
