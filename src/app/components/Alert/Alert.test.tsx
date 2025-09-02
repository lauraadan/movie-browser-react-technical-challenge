import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import Alert from "./Alert";
import { useAlert } from "../../hooks/useAlert/useAlert";

vi.mock("../../hooks/useAlert/useAlert");

const mockedUseAlert = useAlert as unknown as vi.Mock;

describe("Alert component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders nothing if there is no message", () => {
    mockedUseAlert.mockReturnValue({ message: "" });

    const { container } = render(<Alert />);
    expect(container.firstChild).toBeNull();
  });

  it("display the message if it exists", () => {
    const testMessage = "This is an alert message";
    mockedUseAlert.mockReturnValue({ message: testMessage });

    render(<Alert />);
    expect(screen.getByText(testMessage)).toBeInTheDocument();
    expect(screen.getByText(testMessage).className).toContain("alert");
  });
});
