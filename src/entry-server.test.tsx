import { describe, it, expect } from "vitest";
import { render } from "./entry-server";

describe("Server-side render", () => {
  it("renders App wrapped in providers for / route", async () => {
    const initialState = {};
    const url = "/";

    const html = await render(url, initialState);

    expect(typeof html).toBe("string");
    expect(html.length).toBeGreaterThan(0);

    expect(html).toContain('<div class="app">');
    expect(html).toContain('class="navbar"');
    expect(html).toContain('class="page"');
    expect(html).toContain('<div class="spinner"></div>');
  });

  it("renders App for unknown route (NotFound page)", async () => {
    const initialState = {};
    const url = "/unknown-route";

    const html = await render(url, initialState);

    expect(html).toContain('<div class="page">');
    expect(html).toContain('<div class="center">');
    expect(html).toContain("This page does not exist.");
    expect(html).toContain("Back home");
  });
});
