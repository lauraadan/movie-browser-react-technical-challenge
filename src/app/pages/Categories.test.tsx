import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Categories from "../pages/Categories";


vi.mock("axios", () => ({
  default: {
    get: vi.fn(),
  },
}));

vi.mock("../components/Carousel", () => ({
  default: ({ title }: any) => <div data-testid="carousel">{title}</div>,
}));

vi.mock("../common/components/Loading", () => ({
  default: () => <div data-testid="loading">Loading...</div>,
}));

import axios from "axios";

describe("Categories component", () => {
  const genres = [
    { id: 1, name: "Action" },
    { id: 2, name: "Comedy" },
  ];

  const movies = [
    { id: 101, title: "Movie 1" },
    { id: 102, title: "Movie 2" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading initially", () => {
    render(<Categories />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  it("renders carousels after fetching genres and movies", async () => {
    (axios.get as any)
      .mockImplementationOnce(() =>
        Promise.resolve({ data: { genres } })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({ data: { results: movies } })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({ data: { results: movies } })
      );

    render(<Categories />);

    await waitFor(() => {
      expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    });

    const carousels = screen.getAllByTestId("carousel");
    expect(carousels).toHaveLength(2); 
    expect(carousels[0]).toHaveTextContent("Action");
    expect(carousels[1]).toHaveTextContent("Comedy");
  });

  it("filters out genres with no movies", async () => {
    const genresWithEmpty = [
      { id: 1, name: "Action" },
      { id: 2, name: "Empty" },
    ];

    (axios.get as any)
      .mockImplementationOnce(() =>
        Promise.resolve({ data: { genres: genresWithEmpty } })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({ data: { results: movies } })
      )
      .mockImplementationOnce(() =>
        Promise.resolve({ data: { results: [] } }) 
      );

    render(<Categories />);

    await waitFor(() => {
      const carousels = screen.getAllByTestId("carousel");
      expect(carousels).toHaveLength(1);
      expect(carousels[0]).toHaveTextContent("Action");
    });
  });
});
