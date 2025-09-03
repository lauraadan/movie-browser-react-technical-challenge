import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Layout } from "./Layout";

describe("Layout component", () => {
  it("renders children inside the wrapper", () => {
    render(
      <Layout>
        <p>Test Content</p>
      </Layout>
    );

    expect(screen.getByText("Test Content")).toBeInTheDocument();

    const wrapper = screen.getByText("Test Content").closest("div");
    expect(wrapper).toHaveClass("page");
  });

  it("renders multiple children correctly", () => {
    render(
      <Layout>
        <h1>Title</h1>
        <p>Paragraph</p>
      </Layout>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Paragraph")).toBeInTheDocument();
  });
});
