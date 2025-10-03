import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import TabsGroup from "../TabsGroup";
import Tab from "../../Tab/Tab";
import TabList from "../../TabList/TabList";
import TabPanel from "../../TabPanel/TabPanel";
import { useTabs } from "../TabsContext";

const ContextConsumer = () => {
  const { variant, activeTab } = useTabs();
  return (
    <div data-testid="context-consumer">
      <span data-testid="variant">{variant}</span>
      <span data-testid="active-tab">{activeTab}</span>
    </div>
  );
};

it("renders children correctly", () => {
  render(
    <TabsGroup>
      <TabList>
        <Tab labelText="Tab 1" />
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

  const variant = screen.getByTestId("variant");
  expect(variant).toHaveTextContent("pill");
});

it("provides custom variant to context", () => {
  render(
    <TabsGroup variant="underline">
      <ContextConsumer />
    </TabsGroup>
  );

  const variant = screen.getByTestId("variant");
  expect(variant).toHaveTextContent("underline");
});

it("manages activeTab in uncontrolled mode with defaultActiveTab", () => {
  render(
    <TabsGroup defaultActiveTab={2}>
      <ContextConsumer />
    </TabsGroup>
  );

  const activeTab = screen.getByTestId("active-tab");
  expect(activeTab).toHaveTextContent("2");
});

it("uses controlled value when provided", () => {
  render(
    <TabsGroup value={3}>
      <ContextConsumer />
    </TabsGroup>
  );

  const activeTab = screen.getByTestId("active-tab");
  expect(activeTab).toHaveTextContent("3");
});

it("calls onChange callback when activeTab changes", async () => {
  const user = userEvent.setup();
  const handleChange = vi.fn();

  const ControlledTabsGroup = () => {
    const { setActiveTab } = useTabs();
    return (
      <button onClick={() => setActiveTab(1)} data-testid="change-tab">
        Change Tab
      </button>
    );
  };

  render(
    <TabsGroup onChange={handleChange}>
      <ControlledTabsGroup />
    </TabsGroup>
  );

  const button = screen.getByTestId("change-tab");
  await user.click(button);

  expect(handleChange).toHaveBeenCalledWith(1);
});

it("applies custom className", () => {
  render(
    <TabsGroup className="custom-tabs">
      <div>Content</div>
    </TabsGroup>
  );

  const container = screen.getByText("Content").parentElement;
  expect(container).toHaveClass("custom-tabs");
});

it("combines multiple children with context", () => {
  render(
    <TabsGroup defaultActiveTab={0}>
      <TabList>
        <Tab labelText="First" />
        <Tab labelText="Second" />
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
    <TabsGroup value={5} defaultActiveTab={2}>
      <ContextConsumer />
    </TabsGroup>
  );

  const activeTab = screen.getByTestId("active-tab");
  expect(activeTab).toHaveTextContent("5");
});

it("applies additional props to container", () => {
  render(
    <TabsGroup data-testid="tabs-container" aria-label="Main navigation">
      <div>Content</div>
    </TabsGroup>
  );

  const container = screen.getByTestId("tabs-container");
  expect(container).toHaveAttribute("aria-label", "Main navigation");
});
