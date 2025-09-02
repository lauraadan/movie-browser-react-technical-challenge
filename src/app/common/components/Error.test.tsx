import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Error from "../components/Error";
import { MESSAGES } from "../../common/constants/constants";

describe("Error component", () => {
  it("renders the generic error message and the component", () => {
    render(<Error />);
    expect(screen.getByText(MESSAGES.ERROR_GENERIC)).toBeInTheDocument();
  });
});
