import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import TabPanel from "../TabPanel";
import TabsGroup from "../../TabsGroup/TabsGroup";
import TabList from "../../TabList/TabList";
import Tab from "../../Tab/Tab";

it("is hidden when isSelected is false in standalone mode", () => {
  render(
    <TabPanel id="panel-1" isSelected={false}>
      Hidden content
    </TabPanel>
  );

  const tabPanel = screen.getByRole("tabpanel", { hidden: true });

  expect(tabPanel).not.toBeVisible();
});

it("is visible when isSelected is true in standalone mode", () => {
  render(
    <TabPanel id="panel-1" isSelected={true}>
      Visible content
    </TabPanel>
  );

  const tabPanel = screen.getByRole("tabpanel");
  expect(tabPanel).toBeVisible();
});

it("applies additional props in standalone mode", () => {
  render(
    <TabPanel id="panel-1" isSelected={true} aria-labelledby="tab-1">
      Content
    </TabPanel>
  );

  const tabPanel = screen.getByRole("tabpanel");

  expect(tabPanel).toHaveAttribute("id", "panel-1");
  expect(tabPanel).toHaveAttribute("aria-labelledby", "tab-1");
});

it("is visible when value matches activeTab in context mode", () => {
  render(
    <TabsGroup defaultActiveTab="tab1">
      <TabList>
        <Tab value="tab1" labelText="Tab 1" />
      </TabList>
      <TabPanel value="tab1">Visible content</TabPanel>
    </TabsGroup>
  );

  const tabPanel = screen.getByRole("tabpanel");
  expect(tabPanel).toBeVisible();
  expect(tabPanel).toHaveTextContent("Visible content");
});

it("is hidden when value does not match activeTab in context mode", () => {
  render(
    <TabsGroup defaultActiveTab="tab1">
      <TabList>
        <Tab value="tab1" labelText="Tab 1" />
        <Tab value="tab2" labelText="Tab 2" />
      </TabList>
      <TabPanel value="tab2">Hidden content</TabPanel>
    </TabsGroup>
  );

  const tabPanel = screen.getByRole("tabpanel", { hidden: true });
  expect(tabPanel).not.toBeVisible();
});

it("auto-generates id from value in context mode", () => {
  render(
    <TabsGroup defaultActiveTab="overview">
      <TabList>
        <Tab value="overview" labelText="Overview" />
      </TabList>
      <TabPanel value="overview">Content</TabPanel>
    </TabsGroup>
  );

  const tabPanel = screen.getByRole("tabpanel");
  expect(tabPanel).toHaveAttribute("id", "panel-overview");
});

it("auto-generates aria-labelledby from value in context mode", () => {
  render(
    <TabsGroup defaultActiveTab="settings">
      <TabList>
        <Tab value="settings" labelText="Settings" />
      </TabList>
      <TabPanel value="settings">Content</TabPanel>
    </TabsGroup>
  );

  const tabPanel = screen.getByRole("tabpanel");
  expect(tabPanel).toHaveAttribute("aria-labelledby", "tab-settings");
});

it("allows custom id to override auto-generated id", () => {
  render(
    <TabsGroup defaultActiveTab="tab1">
      <TabList>
        <Tab value="tab1" labelText="Tab 1" />
      </TabList>
      <TabPanel value="tab1" id="custom-panel-id">
        Content
      </TabPanel>
    </TabsGroup>
  );

  const tabPanel = screen.getByRole("tabpanel");
  expect(tabPanel).toHaveAttribute("id", "custom-panel-id");
});

it("context mode takes precedence over isSelected prop", () => {
  render(
    <TabsGroup defaultActiveTab="tab1">
      <TabList>
        <Tab value="tab1" labelText="Tab 1" />
        <Tab value="tab2" labelText="Tab 2" />
      </TabList>
      <TabPanel value="tab2" isSelected={true}>
        Hidden because context says tab1 is active
      </TabPanel>
    </TabsGroup>
  );

  const tabPanel = screen.getByRole("tabpanel", { hidden: true });
  expect(tabPanel).not.toBeVisible();
});
