import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Carousel from "../components/Carousel";
import { TMDBMovie, IMG } from "../service/api";
import { MemoryRouter } from "react-router-dom";

describe("Carousel component", () => {
  const movie1: TMDBMovie = {
    id: 1,
    title: "Movie 1",
    poster_path: "/p1.jpg",
  } as TMDBMovie;
  const movie2: TMDBMovie = {
    id: 2,
    title: "Movie 2",
    poster_path: "/p2.jpg",
  } as TMDBMovie;
  const items = [movie1, movie2];

  it("renders the title", () => {
    render(
      <MemoryRouter>
        <Carousel title="My Carousel" category="action" items={items} />
      </MemoryRouter>
    );

    expect(screen.getByText("My Carousel")).toBeInTheDocument();
  });

  it("calls scrollBy when arrow buttons are clicked", () => {
    const scrollByMock = vi.fn();
    const { container } = render(
      <MemoryRouter>
        <Carousel title="Test" category="action" items={items} />
      </MemoryRouter>
    );

    const scroller = container.querySelector(
      ".carousel__scroller"
    ) as HTMLDivElement;
    scroller.scrollBy = scrollByMock;

    const leftBtn = screen.getByLabelText("Scroll left");
    const rightBtn = screen.getByLabelText("Scroll right");

    fireEvent.click(leftBtn);
    expect(scrollByMock).toHaveBeenCalledWith({
      left: -300,
      behavior: "smooth",
    });

    fireEvent.click(rightBtn);
    expect(scrollByMock).toHaveBeenCalledWith({
      left: 300,
      behavior: "smooth",
    });
  });
});
