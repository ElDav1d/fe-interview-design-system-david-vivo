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

it("auto-generates a unique id from value in context mode", () => {
  render(
    <TabsGroup defaultActiveTab="overview">
      <TabList>
        <Tab value="overview" labelText="Overview" />
      </TabList>
      <TabPanel value="overview">Content</TabPanel>
    </TabsGroup>
  );

  const tabPanel = screen.getByRole("tabpanel");
  const id = tabPanel.getAttribute("id");
  expect(id).toMatch(/-panel-overview$/);
});

it("generates unique ids for multiple TabsGroup with same value", () => {
  render(
    <>
      <TabsGroup defaultActiveTab="overview">
        <TabList>
          <Tab value="overview" labelText="Overview" />
        </TabList>
        <TabPanel value="overview">Content 1</TabPanel>
      </TabsGroup>
      <TabsGroup defaultActiveTab="overview">
        <TabList>
          <Tab value="overview" labelText="Overview" />
        </TabList>
        <TabPanel value="overview">Content 2</TabPanel>
      </TabsGroup>
    </>
  );

  const tabPanels = screen.getAllByRole("tabpanel");
  const ids = tabPanels.map((panel) => panel.getAttribute("id"));
  expect(new Set(ids).size).toBe(ids.length); // IDs should be unique
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

it("uses groupId from context to generate unique id", () => {
  render(
    <TabsGroup defaultActiveTab="overview">
      <TabList>
        <Tab value="overview" labelText="Overview" />
      </TabList>
      <TabPanel value="overview">Content</TabPanel>
    </TabsGroup>
  );

  const tabPanel = screen.getByRole("tabpanel");
  const id = tabPanel.getAttribute("id");

  // ID should include groupId prefix from context
  expect(id).toBeTruthy();
  expect(id).toContain("-panel-overview");
  expect(id).not.toBe("panel-overview"); // Should NOT be the fallback ID
});

it("uses groupId from context to generate unique aria-labelledby", () => {
  render(
    <TabsGroup defaultActiveTab="overview">
      <TabList>
        <Tab value="overview" labelText="Overview" />
      </TabList>
      <TabPanel value="overview">Content</TabPanel>
    </TabsGroup>
  );

  const tabPanel = screen.getByRole("tabpanel");
  const ariaLabelledBy = tabPanel.getAttribute("aria-labelledby");

  // aria-labelledby should include groupId prefix from context
  expect(ariaLabelledBy).toBeTruthy();
  expect(ariaLabelledBy).toContain("-tab-overview");
  expect(ariaLabelledBy).not.toBe("tab-overview"); // Should NOT be the fallback ID
});

it("generates unique aria-labelledby for multiple TabsGroup with same value", () => {
  render(
    <>
      <TabsGroup defaultActiveTab="overview">
        <TabList>
          <Tab value="overview" labelText="Overview 1" />
        </TabList>
        <TabPanel value="overview">Content 1</TabPanel>
      </TabsGroup>
      <TabsGroup defaultActiveTab="overview">
        <TabList>
          <Tab value="overview" labelText="Overview 2" />
        </TabList>
        <TabPanel value="overview">Content 2</TabPanel>
      </TabsGroup>
    </>
  );

  const tabPanels = screen.getAllByRole("tabpanel");
  const ariaLabelledBys = tabPanels.map((panel) =>
    panel.getAttribute("aria-labelledby")
  );

  expect(new Set(ariaLabelledBys).size).toBe(ariaLabelledBys.length); // All aria-labelledby should be unique
});

it("falls back to simple id format in standalone mode without context", () => {
  render(
    <TabPanel value="overview" isSelected={true}>
      Content
    </TabPanel>
  );

  const tabPanel = screen.getByRole("tabpanel");
  const id = tabPanel.getAttribute("id");
  const ariaLabelledBy = tabPanel.getAttribute("aria-labelledby");

  // Without context, should use simple format (no groupId prefix)
  expect(id).toBe("panel-overview");
  expect(ariaLabelledBy).toBe("tab-overview");
});

it("is focusable when visible (tabIndex=0)", () => {
  render(
    <TabsGroup defaultActiveTab="overview">
      <TabList>
        <Tab value="overview" labelText="Overview" />
      </TabList>
      <TabPanel value="overview">Content</TabPanel>
    </TabsGroup>
  );

  const tabPanel = screen.getByRole("tabpanel");
  expect(tabPanel).toHaveAttribute("tabIndex", "0");
});

it("is not focusable when hidden (tabIndex=-1)", () => {
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
  expect(tabPanel).toHaveAttribute("tabIndex", "-1");
});

it("is focusable in standalone mode when isSelected=true", () => {
  render(
    <TabPanel value="overview" isSelected={true}>
      Content
    </TabPanel>
  );

  const tabPanel = screen.getByRole("tabpanel");
  expect(tabPanel).toHaveAttribute("tabIndex", "0");
});

it("is not focusable in standalone mode when isSelected=false", () => {
  render(
    <TabPanel value="overview" isSelected={false}>
      Content
    </TabPanel>
  );

  const tabPanel = screen.getByRole("tabpanel", { hidden: true });
  expect(tabPanel).toHaveAttribute("tabIndex", "-1");
});
