import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import TabsGroup from "../TabsGroup";
import Tab from "../../Tab/Tab";
import TabList from "../../TabList/TabList";
import TabPanel from "../../TabPanel/TabPanel";
import { useTabs } from "../TabsContext";

// ContextConsumer: Utility for tests.
// Reads tab context (variant, activeTab) using useTabs
// and displays them in a semantic <dl> for easy assertions.
// Helps verify context propagation and state in TabsGroup tests.
const ContextConsumer = () => {
  const { variant, activeTab } = useTabs();
  return (
    <dl aria-label="Context values">
      <dt>Variant</dt>
      <dd>{variant}</dd>
      <dt>Active tab</dt>
      <dd>{activeTab}</dd>
    </dl>
  );
};

it("renders children correctly", () => {
  render(
    <TabsGroup>
      <TabList>
        <Tab value="tab1" labelText="Tab 1" />
      </TabList>
    </TabsGroup>
  );

  expect(screen.getByRole("tab")).toBeInTheDocument();
});

it("provides default variant pill to context", () => {
  render(
    <TabsGroup>
      <ContextConsumer />
    </TabsGroup>
  );

  const variantTerm = screen.getByText("Variant");
  const variant = variantTerm.nextElementSibling;
  expect(variant).toHaveTextContent("pill");
});

it("provides custom variant to context", () => {
  render(
    <TabsGroup variant="underline">
      <ContextConsumer />
    </TabsGroup>
  );

  const variantTerm = screen.getByText("Variant");
  const variant = variantTerm.nextElementSibling;
  expect(variant).toHaveTextContent("underline");
});

it("manages activeTab in uncontrolled mode with defaultActiveTab", () => {
  render(
    <TabsGroup defaultActiveTab="tab2">
      <ContextConsumer />
    </TabsGroup>
  );

  const activeTabTerm = screen.getByText("Active tab");
  const activeTab = activeTabTerm.nextElementSibling;
  expect(activeTab).toHaveTextContent("tab2");
});

it("uses controlled value when provided", () => {
  render(
    <TabsGroup value="tab3">
      <ContextConsumer />
    </TabsGroup>
  );

  const activeTabTerm = screen.getByText("Active tab");
  const activeTab = activeTabTerm.nextElementSibling;
  expect(activeTab).toHaveTextContent("tab3");
});

it("calls onChange callback when activeTab changes", async () => {
  const user = userEvent.setup();
  const handleChange = vi.fn();

  const ControlledTabsGroup = () => {
    const { setActiveTab } = useTabs();
    return <button onClick={() => setActiveTab("tab1")}>Change Tab</button>;
  };

  render(
    <TabsGroup onChange={handleChange}>
      <ControlledTabsGroup />
    </TabsGroup>
  );

  const button = screen.getByRole("button", { name: "Change Tab" });
  await user.click(button);

  expect(handleChange).toHaveBeenCalledWith("tab1");
});

it("applies custom className", () => {
  render(
    <TabsGroup className="custom-tabs">
      <TabList>
        <Tab value="tab1" labelText="Tab 1" />
      </TabList>
    </TabsGroup>
  );

  const tablist = screen.getByRole("tablist");
  const container = tablist.parentElement;
  expect(container).toHaveClass("custom-tabs");
});

it("combines multiple children with context", () => {
  render(
    <TabsGroup defaultActiveTab="tab1">
      <TabList>
        <Tab value="tab1" labelText="First" />
        <Tab value="tab2" labelText="Second" />
      </TabList>
      <TabPanel id="panel-1" isSelected={true}>
        First Panel
      </TabPanel>
    </TabsGroup>
  );

  expect(screen.getByRole("tablist")).toBeInTheDocument();
  expect(screen.getByRole("tab", { name: "First" })).toBeInTheDocument();
  expect(screen.getByRole("tab", { name: "Second" })).toBeInTheDocument();
  expect(screen.getByRole("tabpanel")).toBeInTheDocument();
});

it("prioritizes controlled value over defaultActiveTab", () => {
  render(
    <TabsGroup value="tab5" defaultActiveTab="tab2">
      <ContextConsumer />
    </TabsGroup>
  );

  const activeTabTerm = screen.getByText("Active tab");
  const activeTab = activeTabTerm.nextElementSibling;
  expect(activeTab).toHaveTextContent("tab5");
});

it("applies additional props to container", () => {
  render(
    <TabsGroup data-testid="tabs-group" aria-label="Main navigation">
      <TabList>
        <Tab value="tab1" labelText="Tab 1" />
      </TabList>
    </TabsGroup>
  );

  const container = screen.getByTestId("tabs-group");
  expect(container).toHaveAttribute("aria-label", "Main navigation");
});

it("renders as div by default", () => {
  render(
    <TabsGroup>
      <TabList>
        <Tab value="tab1" labelText="Tab 1" />
      </TabList>
    </TabsGroup>
  );

  const tablist = screen.getByRole("tablist");
  const container = tablist.parentElement;
  expect(container?.tagName).toBe("DIV");
});

it("renders as custom element when as prop is provided", () => {
  render(
    <TabsGroup as="section" aria-label="Tabs section">
      <TabList>
        <Tab value="tab1" labelText="Tab 1" />
      </TabList>
    </TabsGroup>
  );

  const container = screen.getByRole("region", { name: "Tabs section" });
  expect(container.tagName).toBe("SECTION");
});

it("renders as nav element when specified", () => {
  render(
    <TabsGroup as="nav" aria-label="Tabs navigation">
      <TabList>
        <Tab value="tab1" labelText="Tab 1" />
      </TabList>
    </TabsGroup>
  );

  const container = screen.getByRole("navigation", { name: "Tabs navigation" });
  expect(container.tagName).toBe("NAV");
});

it("throws error when invalid children are provided", () => {
  const consoleErrorSpy = vi
    .spyOn(console, "error")
    .mockImplementation(() => {});

  expect(() => {
    render(
      <TabsGroup>
        <div>Invalid child</div>
      </TabsGroup>
    );
  }).toThrow();

  consoleErrorSpy.mockRestore();
});

it("accepts TabList as valid child", () => {
  render(
    <TabsGroup>
      <TabList>
        <Tab value="tab1" labelText="Tab 1" />
      </TabList>
    </TabsGroup>
  );

  expect(screen.getByRole("tablist")).toBeInTheDocument();
});

it("accepts TabPanel as valid child", () => {
  render(
    <TabsGroup>
      <TabPanel id="panel-1" isSelected={true}>
        Panel content
      </TabPanel>
    </TabsGroup>
  );

  expect(screen.getByRole("tabpanel")).toBeInTheDocument();
});

it("accepts multiple valid children", () => {
  render(
    <TabsGroup>
      <TabList>
        <Tab value="tab1" labelText="Tab 1" />
        <Tab value="tab2" labelText="Tab 2" />
      </TabList>
      <TabPanel id="panel-1" isSelected={true}>
        First Panel
      </TabPanel>
      <TabPanel id="panel-2" isSelected={false}>
        Second Panel
      </TabPanel>
    </TabsGroup>
  );

  expect(screen.getByRole("tablist")).toBeInTheDocument();
  expect(screen.getAllByRole("tab")).toHaveLength(2);
  expect(screen.getByRole("tabpanel")).toBeInTheDocument();
});
