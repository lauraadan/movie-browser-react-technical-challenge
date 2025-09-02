import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Navbar from "../../components/Navbar/Navbar";
import { ROUTES } from "../../constants/constants";
import { MemoryRouter } from "react-router-dom";

describe("Navbar component", () => {
  it("renders the logo with correct link", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const logoLink = screen.getByRole("link", { name: /logo/i });
    expect(logoLink).toHaveAttribute("href", ROUTES.HOME);
    expect(screen.getByAltText("logo")).toBeInTheDocument();
  });

  it("renders all nav links with correct hrefs", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );

    const homeLink = screen.getByText("Home");
    const categoriesLink = screen.getByText("Categories");
    const wishlistLink = screen.getByText("Wishlist");

    expect(homeLink.closest("a")).toHaveAttribute("href", ROUTES.HOME);
    expect(categoriesLink.closest("a")).toHaveAttribute("href", "/categories");
    expect(wishlistLink.closest("a")).toHaveAttribute("href", "/wishlist");
  });

  it("applies active class to the current route", () => {
    render(
      <MemoryRouter initialEntries={[ROUTES.HOME]}>
        <Navbar />
      </MemoryRouter>
    );

    const homeLink = screen.getByText("Home");
    expect(homeLink).toHaveClass("is-active");

    const categoriesLink = screen.getByText("Categories");
    expect(categoriesLink).not.toHaveClass("is-active");
  });
});
