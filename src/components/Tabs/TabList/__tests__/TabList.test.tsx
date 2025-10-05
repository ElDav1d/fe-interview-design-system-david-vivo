import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import TabList from "../TabList";
import Tab from "../../Tab/Tab";

it("renders with role tablist", () => {
  render(
    <TabList>
      <Tab value="tab1" labelText="Tab 1" />
    </TabList>
  );

  expect(screen.getByRole("tablist")).toBeInTheDocument();
});

it("is horizontal", () => {
  render(
    <TabList>
      <Tab value="tab1" labelText="Tab 1" />
    </TabList>
  );

  const tablist = screen.getByRole("tablist");

  expect(tablist).toHaveAttribute("aria-orientation", "horizontal");
  expect(tablist).toHaveClass("tablist");
});

it("renders children", () => {
  render(
    <TabList>
      <Tab value="tab1" labelText="Tab 1" />
      <Tab value="tab2" labelText="Tab 2" />
    </TabList>
  );

  expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument();
  expect(screen.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument();
});

it("applies custom className", () => {
  render(
    <TabList className="custom-class">
      <Tab value="tab1" labelText="Tab 1" />
    </TabList>
  );

  const tablist = screen.getByRole("tablist");

  expect(tablist).toHaveClass("tablist");
  expect(tablist).toHaveClass("custom-class");
});
