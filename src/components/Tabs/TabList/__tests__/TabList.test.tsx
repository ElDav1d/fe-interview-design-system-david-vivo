import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import TabList from "../TabList";
import Tab from "../../Tab/Tab";
import TabsGroup from "../../TabsGroup/TabsGroup";

it("renders with role tablist", () => {
  render(
    <TabsGroup defaultActiveTab="tab1">
      <TabList>
        <Tab value="tab1" labelText="Tab 1" />
      </TabList>
    </TabsGroup>
  );

  expect(screen.getByRole("tablist")).toBeInTheDocument();
});

it("is horizontal", () => {
  render(
    <TabsGroup defaultActiveTab="tab1">
      <TabList>
        <Tab value="tab1" labelText="Tab 1" />
      </TabList>
    </TabsGroup>
  );

  const tablist = screen.getByRole("tablist");

  expect(tablist).toHaveAttribute("aria-orientation", "horizontal");
  expect(tablist).toHaveClass("tablist");
});

it("renders children", () => {
  render(
    <TabsGroup defaultActiveTab="tab1">
      <TabList>
        <Tab value="tab1" labelText="Tab 1" />
        <Tab value="tab2" labelText="Tab 2" />
      </TabList>
    </TabsGroup>
  );

  expect(screen.getByRole("tab", { name: "Tab 1" })).toBeInTheDocument();
  expect(screen.getByRole("tab", { name: "Tab 2" })).toBeInTheDocument();
});

it("applies custom className", () => {
  render(
    <TabsGroup defaultActiveTab="tab1">
      <TabList className="custom-class">
        <Tab value="tab1" labelText="Tab 1" />
      </TabList>
    </TabsGroup>
  );

  const tablist = screen.getByRole("tablist");

  expect(tablist).toHaveClass("tablist");
  expect(tablist).toHaveClass("custom-class");
});

it("applies additional props", () => {
  render(
    <TabsGroup defaultActiveTab="tab1">
      <TabList id="custom-id" data-test="test-value">
        <Tab value="tab1" labelText="Tab 1" />
      </TabList>
    </TabsGroup>
  );

  const tablist = screen.getByRole("tablist");

  expect(tablist).toHaveAttribute("id", "custom-id");
  expect(tablist).toHaveAttribute("data-test", "test-value");
});
