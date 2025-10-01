import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import Tab from "../Tab";

it("displays the correct label text", () => {
  render(<Tab labelText="Tab 1" />);

  expect(screen.getByRole("tab")).toHaveTextContent("Tab 1");
});

it("is not selected by default", () => {
  render(<Tab labelText="Tab 1" />);

  const tab = screen.getByRole("tab", { name: "Tab 1" });

  expect(tab).toHaveAttribute("aria-selected", "false");
});

it("is selectable", () => {
  render(<Tab isSelected={true} labelText="Tab 1" />);

  const tab = screen.getByRole("tab", { name: "Tab 1" });

  expect(tab).toHaveAttribute("aria-selected", "true");
});

it("has two variants", () => {
  const { rerender } = render(
    <Tab variant="pill" labelText="Pill Variant" isSelected={false} />
  );

  const tab = screen.getByRole("tab", { name: "Pill Variant" });
  expect(tab).toHaveClass("tab-pill");

  rerender(<Tab variant="underline" labelText="Underline Variant" />);

  const tabUnderline = screen.getByRole("tab", { name: "Underline Variant" });

  expect(tabUnderline).toHaveClass("tab-underline");
});

it("applies additional props", () => {
  render(<Tab labelText="Tab 1" id="custom-id" data-test="test-value" />);

  const tab = screen.getByRole("tab", { name: "Tab 1" });

  expect(tab).toHaveAttribute("id", "custom-id");
  expect(tab).toHaveAttribute("data-test", "test-value");
});
