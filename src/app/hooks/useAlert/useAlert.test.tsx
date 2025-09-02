import { describe, it, expect, vi } from "vitest";
import { render } from "@testing-library/react";
import { Ctx } from "../../context/alertContext/alertContext";
import { useAlert } from "../useAlert/useAlert";
import { AlertCtx } from "../../../types/interfaces";

describe("useAlert hook", () => {
  it("returns context value when used within provider", () => {
    const testCtx: AlertCtx = {
      message: "Hello",
      showAlert: vi.fn(),
    };

    let contextValue: AlertCtx | null = null;
    const TestComponent = () => {
      contextValue = useAlert();
      return null;
    };

    render(
      <Ctx.Provider value={testCtx}>
        <TestComponent />
      </Ctx.Provider>
    );
    expect(contextValue).toBe(testCtx);
  });

  it("throws error when used outside provider", () => {
    const TestComponent = () => {
      useAlert();
      return null;
    };

    expect(() => render(<TestComponent />)).toThrow(
      "useAlert must be used within AlertProvider"
    );
  });
});
