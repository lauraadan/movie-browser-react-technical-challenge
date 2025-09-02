import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { InitialDataProvider } from "../context/initialData";
import { useInitialData } from "./useInitialData";
import { AppInitialData } from "../../../types/interfaces";

describe("useInitialData hook", () => {
  it("returns the context value provided by InitialDataProvider", () => {
    const testValue: AppInitialData = {
      categories: [],
      trending: [],
    };

    let contextValue: AppInitialData | null = null;

    const TestComponent = () => {
      contextValue = useInitialData();
      return null;
    };

    render(
      <InitialDataProvider value={testValue}>
        <TestComponent />
      </InitialDataProvider>
    );

    expect(contextValue).not.toBeNull();
    expect(contextValue!).toEqual(testValue);
  });

  it("ensures type safety with expected structure", () => {
    const testValue: AppInitialData = {
      categories: [],
      trending: [],
    };

    let contextValue: AppInitialData | null = null;

    const TestComponent = () => {
      contextValue = useInitialData();
      return null;
    };

    render(
      <InitialDataProvider value={testValue}>
        <TestComponent />
      </InitialDataProvider>
    );

    expect(contextValue).not.toBeNull();
    expect(Array.isArray(contextValue!.categories)).toBe(true);
    expect(Array.isArray(contextValue!.trending)).toBe(true);
  });
});
