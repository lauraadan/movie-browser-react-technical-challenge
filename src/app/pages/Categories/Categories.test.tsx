import { render, screen } from "@testing-library/react";
import { describe, it, vi, beforeEach, expect } from "vitest";
import Categories from "./Categories";
import { TMDBMovie, GenreWithMovies } from "../../../types/interfaces";

vi.mock("../../hooks/useMovies/useMovies", () => ({
  useMovies: vi.fn(),
  useMovieGenres: vi.fn(),
}));

vi.mock("../../components/Loading/Loading", () => ({
  default: () => <div>LoadingComponentMock</div>,
}));
vi.mock("../../components/Error/Error", () => ({
  default: () => <div>ErrorComponentMock</div>,
}));
vi.mock("../../components/Banner/Banner", () => ({
  default: ({ items }: { items: TMDBMovie[] }) => (
    <div>BannerMock-{items.length}</div>
  ),
}));
vi.mock("../../components/Carousel/Carousel", () => ({
  default: ({ title }: { title: string }) => <div>CarouselMock-{title}</div>,
}));

import { useMovies, useMovieGenres } from "../../hooks/useMovies/useMovies";

const mockedUseMovies = useMovies as unknown as vi.Mock;
const mockedUseMovieGenres = useMovieGenres as unknown as vi.Mock;

describe("Categories component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows Loading when loading", () => {
    mockedUseMovieGenres.mockReturnValue({
      genres: [] as GenreWithMovies[],
      loading: true,
      error: null,
    });
    mockedUseMovies.mockReturnValue({
      movies: [] as TMDBMovie[],
      loading: false,
      error: null,
    });

    render(<Categories />);
    expect(screen.getByText("LoadingComponentMock")).toBeInTheDocument();
  });

  it("shows Error when there is an error", () => {
    mockedUseMovieGenres.mockReturnValue({
      genres: [] as GenreWithMovies[],
      loading: false,
      error: "Error",
    });
    mockedUseMovies.mockReturnValue({
      movies: [] as TMDBMovie[],
      loading: false,
      error: null,
    });

    render(<Categories />);
    expect(screen.getByText("ErrorComponentMock")).toBeInTheDocument();
  });

  it("shows message if no movies by genre", () => {
    mockedUseMovieGenres.mockReturnValue({
      genres: [] as GenreWithMovies[],
      loading: false,
      error: null,
    });
    mockedUseMovies.mockReturnValue({
      movies: [
        { id: 1, title: "M1" } as TMDBMovie,
        { id: 2, title: "M2" } as TMDBMovie,
      ],
      loading: false,
      error: null,
    });

    render(<Categories />);
    expect(screen.getByText("No movies found for genres.")).toBeInTheDocument();
    expect(screen.getByText("BannerMock-2")).toBeInTheDocument();
  });

  it("renders Banner and Carousels with movies by genre", () => {
    const genres: GenreWithMovies[] = [
      {
        id: 1,
        name: "Action",
        movies: [{ id: 101, title: "Action1" } as TMDBMovie],
      },
      {
        id: 2,
        name: "Comedy",
        movies: [
          { id: 201, title: "Comedy1" } as TMDBMovie,
          { id: 202, title: "Comedy2" } as TMDBMovie,
        ],
      },
    ];
    mockedUseMovieGenres.mockReturnValue({
      genres,
      loading: false,
      error: null,
    });
    mockedUseMovies.mockReturnValue({
      movies: [
        { id: 1, title: "M1" } as TMDBMovie,
        { id: 2, title: "M2" } as TMDBMovie,
        { id: 3, title: "M3" } as TMDBMovie,
        { id: 4, title: "M4" } as TMDBMovie,
        { id: 5, title: "M5" } as TMDBMovie,
      ],
      loading: false,
      error: null,
    });

    render(<Categories />);

    expect(screen.getByText("BannerMock-5")).toBeInTheDocument();
    expect(screen.getByText("Categories")).toBeInTheDocument();
    expect(screen.getByText("CarouselMock-Action")).toBeInTheDocument();
    expect(screen.getByText("CarouselMock-Comedy")).toBeInTheDocument();
  });
});
