import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import Tab from "../Tab";

it("renders correctly", () => {
  render(<Tab labelText="Tab 1" />);

  expect(screen.getByRole("tab")).toBeInTheDocument();
});

it("is not selected by default", () => {
  render(<Tab labelText="Tab 1" />);

  expect(screen.getByRole("tab")).toHaveAttribute("aria-selected", "false");
});

it("is selectable", () => {
  render(<Tab isSelected={true} labelText="Tab 1" />);

  expect(screen.getByRole("tab")).toHaveAttribute("aria-selected", "true");
});
