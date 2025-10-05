import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import Badge from "../Badge";

it("renders with text content", () => {
  render(<Badge>3</Badge>);

  expect(screen.getByText("3")).toBeInTheDocument();
});

it("has default variant neutral", () => {
  render(<Badge>Default</Badge>);

  const badge = screen.getByText("Default");
  expect(badge).toHaveClass("badge");
  expect(badge).toHaveClass("badge-neutral");
});

it("supports positive variant", () => {
  render(<Badge variant="positive">Success</Badge>);

  const badge = screen.getByText("Success");
  expect(badge).toHaveClass("badge");
  expect(badge).toHaveClass("badge-positive");
});

it("supports negative variant", () => {
  render(<Badge variant="negative">Error</Badge>);

  const badge = screen.getByText("Error");
  expect(badge).toHaveClass("badge");
  expect(badge).toHaveClass("badge-negative");
});

it("applies custom className", () => {
  render(<Badge className="custom-badge">Text</Badge>);

  const badge = screen.getByText("Text");
  expect(badge).toHaveClass("badge");
  expect(badge).toHaveClass("badge-neutral");
  expect(badge).toHaveClass("custom-badge");
});

it("supports number as children", () => {
  render(<Badge>{12}</Badge>);

  expect(screen.getByText("12")).toBeInTheDocument();
});

it("accepts additional props", () => {
  render(
    <Badge role="status" aria-label="Unread notifications" aria-live="polite">
      {3}
    </Badge>
  );

  const badge = screen.getByRole("status");

  expect(badge).toHaveAttribute("aria-label", "Unread notifications");
  expect(badge).toHaveAttribute("aria-live", "polite");
});

it("renders children as ReactNode", () => {
  render(
    <Badge>
      <span data-testid="child">Complex child</span>
    </Badge>
  );

  expect(screen.getByTestId("child")).toBeInTheDocument();
});

it("renders as a span element", () => {
  render(<Badge>Text</Badge>);

  const badge = screen.getByText("Text");
  expect(badge.tagName).toBe("SPAN");
});

it("combines variant class with custom className correctly", () => {
  render(
    <Badge variant="positive" className="my-custom-class">
      Text
    </Badge>
  );

  const badge = screen.getByText("Text");
  expect(badge).toHaveClass("badge");
  expect(badge).toHaveClass("badge-positive");
  expect(badge).toHaveClass("my-custom-class");
});
