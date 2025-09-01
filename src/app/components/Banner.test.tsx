import "@testing-library/jest-dom/vitest";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, act } from "@testing-library/react";
import Banner from "../components/Banner";
import { TMDBMovie, IMG } from "../service/api";
import { MemoryRouter } from "react-router-dom";

describe("Banner component", () => {
  const movie1: TMDBMovie = {
    id: 1,
    title: "Movie 1",
    overview: "Overview 1",
    backdrop_path: "/path1.jpg",
  } as TMDBMovie;

  const movie2: TMDBMovie = {
    id: 2,
    title: "Movie 2",
    overview: "Overview 2",
    backdrop_path: "/path2.jpg",
  } as TMDBMovie;

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("auto-scrolls to the next movie after interval", () => {
    render(
      <MemoryRouter>
        <Banner items={[movie1, movie2]} category="action" />
      </MemoryRouter>
    );
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
    expect(screen.queryByText("Movie 2")).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(4000);
    });

    expect(screen.getByText("Movie 2")).toBeInTheDocument();
    expect(screen.queryByText("Movie 1")).not.toBeInTheDocument();

    act(() => {
      vi.advanceTimersByTime(4000);
    });
    expect(screen.getByText("Movie 1")).toBeInTheDocument();
  });
});
