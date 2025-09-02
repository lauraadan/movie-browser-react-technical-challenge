import { describe, it, vi, beforeEach, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Home from "./Home";
import { useMovies } from "../common/hooks/useMovies";

vi.mock("../components/Banner", () => ({
  default: ({ items, category }: any) => (
    <div data-testid={`banner-${category}`}>{items.length}</div>
  ),
}));

vi.mock("../components/Carousel", () => ({
  default: ({ title, items }: any) => (
    <div data-testid={`carousel-${title}`}>{items.length}</div>
  ),
}));

vi.mock("../common/components/Loading", () => ({
  default: () => <div data-testid="loading" />,
}));

vi.mock("../common/components/Error", () => ({
  default: () => <div data-testid="error" />,
}));

vi.mock("../common/hooks/useMovies", () => ({
  useMovies: vi.fn(),
}));

const mockMovies = [
  { id: 1, title: "Movie 1" },
  { id: 2, title: "Movie 2" },
];

describe("Home component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Loading while any hook is loading", () => {
    (useMovies as any).mockImplementation((category: string) => ({
      movies: [],
      loading: true,
      error: null,
    }));

    render(<Home />);
    expect(screen.getByTestId("loading")).toBeDefined();
  });

  it("renders Error if any hook has error", () => {
    (useMovies as any).mockImplementation((category: string) => ({
      movies: [],
      loading: false,
      error: category === "top_rated" ? "Error" : null,
    }));

    render(<Home />);
    expect(screen.getByTestId("error")).toBeDefined();
  });

  it("renders Banner and Carousels when movies are loaded", () => {
    (useMovies as any).mockImplementation((category: string) => ({
      movies: mockMovies,
      loading: false,
      error: null,
    }));

    render(<Home />);

    expect(screen.getByTestId("banner-popular")).toHaveTextContent("2");
    expect(screen.getByTestId("carousel-Popular")).toHaveTextContent("2");
    expect(screen.getByTestId("carousel-Top Rated")).toHaveTextContent("2");
    expect(screen.getByTestId("carousel-Now Playing")).toHaveTextContent("2");
  });
});
