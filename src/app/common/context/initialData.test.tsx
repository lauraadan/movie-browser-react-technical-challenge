import { describe, it, expect } from "vitest";
import React, { ReactNode } from "react";
import { renderHook } from "@testing-library/react";
import { Ctx, InitialDataProvider, useInitialData } from "./initialData";
import { AppInitialData } from "../../../types/interfaces";

describe("InitialDataProvider", () => {
  const testValue: AppInitialData = {
    categories: [{ id: 1, name: "Test user" }],
    trending: [],
  };

  const wrapper = ({ children }: { children: ReactNode }) => (
    <InitialDataProvider value={testValue}>{children}</InitialDataProvider>
  );

  it("useInitialData returns context value when inside provider", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <InitialDataProvider value={testValue}>{children}</InitialDataProvider>
    );

    const { result } = renderHook(() => useInitialData(), { wrapper });
    expect(result.current).toEqual(testValue);
  });

  it("provides the value to context consumers", () => {
    const { result } = renderHook(() => React.useContext(Ctx), { wrapper });
    expect(result.current).toEqual(testValue);
  });

  it("provides the updated value when changed", () => {
    const newValue: AppInitialData = {
      categories: [],
      trending: [],
    };
    const { result } = renderHook(() => React.useContext(Ctx), {
      wrapper: ({ children }: { children: ReactNode }) => (
        <InitialDataProvider value={newValue}>{children}</InitialDataProvider>
      ),
    });
    expect(result.current).toEqual(newValue);
  });
  it("useInitialData throws error when used outside provider", () => {
    const callHook = () => renderHook(() => useInitialData());

    expect(callHook).toThrowError(
      "useInitialData must be used within an InitialDataProvider"
    );
  });
});
