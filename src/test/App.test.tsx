import { describe, it, expect, beforeEach, vi } from "vitest";
import { h } from "preact";
import { render } from "@testing-library/preact";
import type { FunctionComponent } from "preact";

describe("App", () => {
  let App: FunctionComponent;

  beforeEach(async () => {
    // Mock window dimensions for useViewportSize hook
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1920,
    });
    Object.defineProperty(window, "innerHeight", {
      writable: true,
      configurable: true,
      value: 1080,
    });

    // Mock btoa for useBackground hook
    global.btoa = vi.fn((str) => Buffer.from(str).toString("base64"));

    // Dynamically import App after mocks are set up
    const module = await import("../index");
    App = module.App;
  });

  it("renders without crashing", () => {
    expect(() => render(h(App, {}))).not.toThrow();
  });

  it("renders the main heading", () => {
    const { getAllByText } = render(h(App, {}));
    expect(getAllByText("Grain").length).toBeGreaterThan(0);
  });

  it("renders the tagline", () => {
    const { getAllByText } = render(h(App, {}));
    expect(getAllByText("Neural Gradient Explorer").length).toBeGreaterThan(0);
  });

  it("renders with gradient class", () => {
    const { container } = render(h(App, {}));
    expect(container.innerHTML).toContain("gradient");
  });
});
