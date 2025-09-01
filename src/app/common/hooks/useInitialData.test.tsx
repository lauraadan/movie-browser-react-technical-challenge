import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { InitialDataProvider } from "../context/initialData";
import { useInitialData } from "./useInitialData";

describe("useInitialData hook", () => {
  it("returns the context value provided by InitialDataProvider", () => {
    const testValue = { user: "Alice", age: 30 };
    let contextValue: any = null;

    const TestComponent = () => {
      contextValue = useInitialData<typeof testValue>();
      return null;
    };

    render(
      <InitialDataProvider value={testValue}>
        <TestComponent />
      </InitialDataProvider>
    );

    expect(contextValue).toEqual(testValue);
  });

  it("returns correct type when using generics", () => {
    const testValue = { id: 1, title: "Movie" };
    let contextValue: { id: number; title: string } | null = null;

    const TestComponent = () => {
      contextValue = useInitialData<{ id: number; title: string }>();
      return null;
    };

    render(
      <InitialDataProvider value={testValue}>
        <TestComponent />
      </InitialDataProvider>
    );

    expect(contextValue).toEqual(testValue);
    expect(contextValue?.id).toBe(1);
    expect(contextValue?.title).toBe("Movie");
  });
});
