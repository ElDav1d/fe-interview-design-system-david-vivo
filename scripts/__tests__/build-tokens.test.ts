import { it, expect } from "vitest";
import { generateCSSFromTokens } from "../build-tokens";

it("converts JSON tokens to CSS variables", () => {
  const tokens = {
    color: { primary: { value: "#0052cc" } },
    spacing: { sm: { value: "0.5rem" } },
  };

  const css = generateCSSFromTokens(tokens);

  expect(css).toContain("--color-primary: #0052cc;");
  expect(css).toContain("--spacing-sm: 0.5rem;");
});

it("handles camelCase token names", () => {
  const tokens = {
    color: { primaryColor: { value: "#0052cc" } },
  };

  const css = generateCSSFromTokens(tokens);

  expect(css).toContain("--color-primary-color: #0052cc;");
});

it("generates valid CSS syntax", () => {
  const tokens = {
    color: { primary: { value: "#0052cc" } },
  };

  const css = generateCSSFromTokens(tokens);

  expect(css.startsWith(":root {")).toBe(true);
  expect(css.endsWith("}\n")).toBe(true);
});

it("handles empty token groups", () => {
  const tokens = {
    color: {},
    spacing: { sm: { value: "0.5rem" } },
  };

  const css = generateCSSFromTokens(tokens);

  expect(css).toContain("--spacing-sm: 0.5rem;");
  expect(css).not.toContain("--color-");
});

it("handles empty tokens object", () => {
  const tokens = {};

  const css = generateCSSFromTokens(tokens);

  expect(css).toBe(":root {\n}\n");
});
