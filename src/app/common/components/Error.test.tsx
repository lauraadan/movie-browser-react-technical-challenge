import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Error from "../components/Error";
import { MESSAGES } from "../../common/constants/constants";

describe("Error component", () => {
  it("renders the generic error message", () => {
    render(<Error />);
    expect(screen.getByText(MESSAGES.ERROR_GENERIC)).toBeInTheDocument();
  });

  it("renders the Retry button if onRetry is provided", () => {
    const onRetry = vi.fn();
    render(<Error onRetry={onRetry} />);
    const button = screen.getByText("Retry");
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(onRetry).toHaveBeenCalled();
  });

  it("does not render the Retry button if onRetry is not provided", () => {
    render(<Error />);
    const button = screen.queryByText("Retry");
    expect(button).toBeNull();
  });
});
