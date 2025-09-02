import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import { renderHook, act } from "@testing-library/react";
import { Ctx, AlertProvider } from "../alertContext/alertContext";

describe("AlertProvider", () => {
  beforeEach(() => {
    vi.useFakeTimers(); // Use fake timers for setTimeout
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.useRealTimers();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <AlertProvider>{children}</AlertProvider>
  );

  it("provides default message as null", () => {
    const { result } = renderHook(() => React.useContext(Ctx), { wrapper });
    expect(result.current?.message).toBeNull();
  });

  it("showAlert sets the message and clears it after 5 seconds", () => {
    const { result } = renderHook(() => React.useContext(Ctx), { wrapper });
    act(() => {
      result.current?.showAlert("Test message");
    });
    expect(result.current?.message).toBe("Test message");
    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(result.current?.message).toBeNull();
  });
});
