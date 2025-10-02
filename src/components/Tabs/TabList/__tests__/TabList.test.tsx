import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import TabList from "../TabList";

it("renders with role tablist", () => {
  render(
    <TabList>
      <button>Tab 1</button>
    </TabList>
  );

  expect(screen.getByRole("tablist")).toBeInTheDocument();
});

it("is horizontal", () => {
  render(
    <TabList>
      <button>Tab 1</button>
    </TabList>
  );

  const tablist = screen.getByRole("tablist");

  expect(tablist).toHaveAttribute("aria-orientation", "horizontal");
  expect(tablist).toHaveClass("tablist");
});

it("renders children", () => {
  render(
    <TabList>
      <button>Tab 1</button>
      <button>Tab 2</button>
    </TabList>
  );

  expect(screen.getByText("Tab 1")).toBeInTheDocument();
  expect(screen.getByText("Tab 2")).toBeInTheDocument();
});

it("applies custom className", () => {
  render(
    <TabList className="custom-class">
      <button>Tab 1</button>
    </TabList>
  );

  const tablist = screen.getByRole("tablist");

  expect(tablist).toHaveClass("tablist");
  expect(tablist).toHaveClass("custom-class");
});

it("applies additional props", () => {
  render(
    <TabList id="custom-id" data-test="test-value">
      <button>Tab 1</button>
    </TabList>
  );

  const tablist = screen.getByRole("tablist");

  expect(tablist).toHaveAttribute("id", "custom-id");
  expect(tablist).toHaveAttribute("data-test", "test-value");
});
