import { describe, it, expect, vi } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import { useFetchData } from "./useFetchData";

describe("useFetchData hook", () => {
  it("initial state is correct", async () => {
    const fetcher = vi.fn().mockResolvedValue("ok");
    const { result } = renderHook(() => useFetchData(fetcher));

    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeUndefined();
    expect(result.current.error).toBeNull();

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.data).toBe("ok");
      expect(result.current.error).toBeNull();
    });
  });

  it("handles fetcher success", async () => {
    const fetcher = vi.fn().mockResolvedValue({ id: 1, name: "Test" });
    const { result } = renderHook(() => useFetchData(fetcher));

    await waitFor(() => {
      expect(result.current.data).toEqual({ id: 1, name: "Test" });
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });

  it("handles fetcher error", async () => {
    const fetcher = vi.fn().mockRejectedValue(new Error("fail"));
    const { result } = renderHook(() => useFetchData(fetcher));

    await waitFor(() => {
      expect(result.current.data).toBeUndefined();
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("fail");
    });
  });

  it("can manually call load", async () => {
    const fetcher = vi
      .fn()
      .mockResolvedValueOnce("first")
      .mockResolvedValueOnce("second");
    const { result } = renderHook(() => useFetchData(fetcher));
    await waitFor(() => expect(result.current.data).toBe("first"));
    act(() => {
      result.current.load();
    });
    await waitFor(() => expect(result.current.data).toBe("second"));
  });
});
