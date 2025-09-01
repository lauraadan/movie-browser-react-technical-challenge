import { describe, it, expect, vi } from "vitest";
import "@testing-library/jest-dom/vitest";
import { render, screen } from "@testing-library/react";
import Alert from "./Alert";

vi.mock("../hooks/useAlert", () => ({
  useAlert: vi.fn(),
}));

import { useAlert } from "../hooks/useAlert";

describe("Alert component", () => {
  it("renders nothing when there is no message", () => {
    (useAlert as any).mockReturnValue({ message: "" });
    const { container } = render(<Alert />);
    expect(container.firstChild).toBeNull();
  });

  it("renders the message when message exists", () => {
    const testMessage = "Test alert message";
    (useAlert as any).mockReturnValue({ message: testMessage });
    render(<Alert />);
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });
});
