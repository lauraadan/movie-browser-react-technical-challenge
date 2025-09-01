import { describe, it, beforeAll, vi, expect } from "vitest";
import * as ReactDOMClient from "react-dom/client";
import { InitialDataProvider } from "./app/common/context/initialData";
import App from "./app/App";
import { BrowserRouter } from "react-router-dom";
import React from "react";

vi.mock("react-dom/client", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    hydrateRoot: vi.fn(),
  };
});

describe("entry-client bootstrap", () => {
  let reactTree: any;

  beforeAll(async () => {
    document.body.innerHTML = `<div id="root"></div>`;
    await import("./entry-client");
    reactTree = (ReactDOMClient.hydrateRoot as any).mock.calls[0][1];
  });

  it("calls hydrateRoot with #root container", () => {
    const root = document.getElementById("root");
    const [rootElement] = (ReactDOMClient.hydrateRoot as any).mock.calls[0];
    expect(rootElement).toBe(root);
  });

  it("wraps App with providers", () => {
    expect(reactTree.type).toBe(React.StrictMode);

    const provider = reactTree.props.children;
    expect(provider.type).toBe(InitialDataProvider);

    const browserRouter = provider.props.children;
    expect(browserRouter.type).toBe(BrowserRouter);

    const app = browserRouter.props.children;
    expect(app.type).toBe(App);
  });
});
