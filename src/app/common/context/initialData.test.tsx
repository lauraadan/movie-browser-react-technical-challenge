import { describe, it, expect } from "vitest";
import React from "react";
import { renderHook } from "@testing-library/react";
import { Ctx, InitialDataProvider } from "./initialData";

describe("InitialDataProvider", () => {
  const testValue = { user: "Alice", age: 30 };

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <InitialDataProvider value={testValue}>{children}</InitialDataProvider>
  );

  it("provides the value to context consumers", () => {
    const { result } = renderHook(() => React.useContext(Ctx), { wrapper });
    expect(result.current).toEqual(testValue);
  });

  it("provides the updated value when changed", () => {
    const newValue = { user: "Bob", age: 25 };
    const { result, rerender } = renderHook(() => React.useContext(Ctx), {
      wrapper: ({ children }) => (
        <InitialDataProvider value={newValue}>{children}</InitialDataProvider>
      ),
    });

    expect(result.current).toEqual(newValue);
  });
});
