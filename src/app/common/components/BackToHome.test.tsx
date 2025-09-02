import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BackToHome from "../components/BackToHome";
import { ROUTES } from "../constants/constants";

const mockNavigate = vi.fn();
vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("BackToHome component", () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it("navigates back if history state idx > 0", () => {
    Object.defineProperty(window, "history", {
      value: { state: { idx: 1 } },
      writable: true,
    });

    render(<BackToHome />);
    fireEvent.click(screen.getByText(/Back/i));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });

  it("navigates to home if history state is 0 or undefined", () => {
    Object.defineProperty(window, "history", {
      value: { state: { idx: 0 } },
      writable: true,
    });

    render(<BackToHome />);
    fireEvent.click(screen.getByText(/Back/i));

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.HOME);
  });

  it("navigates to home if history state is undefined", () => {
    Object.defineProperty(window, "history", {
      value: {},
      writable: true,
    });

    render(<BackToHome />);
    fireEvent.click(screen.getByText(/Back/i));

    expect(mockNavigate).toHaveBeenCalledWith(ROUTES.HOME);
  });
});
