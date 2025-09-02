import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { MemoryRouter } from "react-router-dom";

vi.mock("./components/Navbar/Navbar", () => ({
  default: () => <div>Navbar</div>,
}));
vi.mock("./pages/Home/Home", () => ({ default: () => <div>Home Page</div> }));
vi.mock("./pages/MovieDetail/MovieDetail", () => ({
  default: () => <div>Movie Detail Page</div>,
}));
vi.mock("./pages/Wishlist/Wishlist", () => ({
  default: () => <div>Wishlist Page</div>,
}));
vi.mock("./pages/NotFound/NotFound", () => ({
  default: () => <div>Not Found Page</div>,
}));
vi.mock("./pages/Categories/Categories", () => ({
  default: () => <div>Categories Page</div>,
}));
vi.mock("./components/Alert/Alert", () => ({
  default: () => <div>Alert Component</div>,
}));

describe("App component", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    global.fetch = vi.fn((url) => {
      if (url?.toString().includes("/api/movies")) {
        return Promise.resolve({
          json: () => Promise.resolve([{ id: 1, title: "Movie 1" }]),
        } as any);
      }
      return Promise.resolve({ json: () => Promise.resolve({}) } as any);
    });
  });
  it("renders the main layout with Navbar and Alert", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App wishlist={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText("Navbar")).toBeInTheDocument();
    expect(screen.getByText("Alert Component")).toBeInTheDocument();
    expect(screen.getByText("Home Page")).toBeInTheDocument();
  });

  it("renders correct page for /wishlist route", () => {
    render(
      <MemoryRouter initialEntries={["/wishlist"]}>
        <App wishlist={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText("Wishlist Page")).toBeInTheDocument();
  });

  it("renders correct page for unknown route", () => {
    render(
      <MemoryRouter initialEntries={["/unknown"]}>
        <App wishlist={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText("Not Found Page")).toBeInTheDocument();
  });

  it("renders correct page for /categories route", () => {
    render(
      <MemoryRouter initialEntries={["/categories"]}>
        <App wishlist={[]} />
      </MemoryRouter>
    );

    expect(screen.getByText("Categories Page")).toBeInTheDocument();
  });
});
