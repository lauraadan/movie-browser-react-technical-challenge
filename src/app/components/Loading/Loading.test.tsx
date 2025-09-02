import "@testing-library/jest-dom/vitest";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import Loading from "../../components/Loading/Loading";

describe("Loading component", () => {
  it("renders the spinner inside the container", () => {
    const { container } = render(<Loading />);

    const pageCenterDiv = container.querySelector("div.page.center");
    expect(pageCenterDiv).toBeInTheDocument();

    const spinnerDiv = pageCenterDiv?.querySelector("div.spinner");
    expect(spinnerDiv).toBeInTheDocument();
  });
});
