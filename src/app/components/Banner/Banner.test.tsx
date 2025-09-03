import { render, screen, cleanup, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Banner from "./Banner";
import { BrowserRouter } from "react-router-dom";

vi.mock("../../service/api", () => ({
  IMG: {
    backdrop: vi.fn((path, size) => `backdrop-${path}-${size}`),
  },
}));

describe("Banner Component", () => {
  const items = [
    {
      id: 1,
      title: "Movie 1",
      overview: "Overview 1",
      backdrop_path: "/backdrop1.jpg",
    },
    {
      id: 2,
      title: "Movie 2",
      overview: "Overview 2",
      backdrop_path: "/backdrop2.jpg",
    },
  ];

  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    cleanup();
    vi.clearAllTimers();
  });

  it("auto-scrolls to next movie after interval", () => {
    render(
      <BrowserRouter>
        <Banner items={items} category="popular" />
      </BrowserRouter>
    );

    const img = screen.getByRole("img");

    expect(img).toHaveAttribute(
      "src",
      `backdrop-${items[0].backdrop_path}-w780`
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      `backdrop-${items[1].backdrop_path}-w780`
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getByRole("img")).toHaveAttribute(
      "src",
      `backdrop-${items[0].backdrop_path}-w780`
    );
  });
});
