import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import Home from "../pages/Home";

vi.mock("../common/hooks/useInitialData", () => ({
  useInitialData: vi.fn(),
}));

vi.mock("../service/api", () => ({
  fetchCategory: vi.fn(),
}));

vi.mock("../components/Carousel", () => ({
  default: ({ title }: { title: string }) => <div data-testid="carousel">{title}</div>,
}));

vi.mock("../components/Banner", () => ({
  default: ({ items }: { items: any[] }) => (
    <div data-testid="banner">{items.map((i) => i.title).join(",")}</div>
  ),
}));

vi.mock("../common/components/Loading", () => ({
  default: () => <div data-testid="loading">Loading...</div>,
}));

import { useInitialData } from "../common/hooks/useInitialData";
import { fetchCategory } from "../service/api";

describe("Home component", () => {
  const mockData = {
    popular: [{ id: 1, title: "Movie 1" }],
    top_rated: [{ id: 2, title: "Movie 2" }],
    now_playing: [{ id: 3, title: "Movie 3" }],
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders Loading when data is not available", () => {
    (useInitialData as any).mockReturnValue({ categories: null });
    render(<Home />);
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

it("renders Banner and Carousels when initial data exists", async () => {
  (useInitialData as any).mockReturnValue({ categories: mockData });
  render(<Home />);

  expect(screen.getByTestId("banner")).toBeInTheDocument();

  const carousels = screen.getAllByTestId("carousel");
  expect(carousels).toHaveLength(3);
  expect(carousels[0]).toHaveTextContent("Popular");
  expect(carousels[1]).toHaveTextContent("Top Rated");
  expect(carousels[2]).toHaveTextContent("Now Playing");
});

  it("fetches data if initial data is null and renders components", async () => {
    (useInitialData as any).mockReturnValue({ categories: null });
    (fetchCategory as any)
      .mockResolvedValueOnce(mockData.popular)
      .mockResolvedValueOnce(mockData.top_rated)
      .mockResolvedValueOnce(mockData.now_playing);

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByTestId("banner")).toBeInTheDocument();
      expect(screen.getAllByTestId("carousel")).toHaveLength(3);
    });
  });
});
