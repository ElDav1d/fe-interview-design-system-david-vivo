import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import TabList from "../TabList";
import Tab from "../../Tab/Tab";

it("renders with role tablist", () => {
  render(
    <TabList>
      <Tab labelText="Tab 1" />
    </TabList>
  );

  expect(screen.getByRole("tablist")).toBeInTheDocument();
});

it("is horizontal", () => {
  render(
    <TabList>
      <Tab labelText="Tab 1" />
    </TabList>
  );

  const tablist = screen.getByRole("tablist");

  expect(tablist).toHaveAttribute("aria-orientation", "horizontal");
  expect(tablist).toHaveClass("tablist");
});

it("renders children", () => {
  render(
    <TabList>
      <Tab labelText="Tab 1" />
      <Tab labelText="Tab 2" />
    </TabList>
  );

  expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument();
  expect(screen.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument();
});

it("applies custom className", () => {
  render(
    <TabList className="custom-class">
      <Tab labelText="Tab 1" />
    </TabList>
  );

  const tablist = screen.getByRole("tablist");

  expect(tablist).toHaveClass("tablist");
  expect(tablist).toHaveClass("custom-class");
});

it("applies additional props", () => {
  render(
    <TabList id="custom-id" data-test="test-value">
      <Tab labelText="Tab 1" />
    </TabList>
  );

  const tablist = screen.getByRole("tablist");

  expect(tablist).toHaveAttribute("id", "custom-id");
  expect(tablist).toHaveAttribute("data-test", "test-value");
});
