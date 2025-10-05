import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it, vi } from "vitest";
import Tab from "../Tab";
import TabsGroup from "../../TabsGroup/TabsGroup";
import TabList from "../../TabList/TabList";

it("displays the correct label text", () => {
  render(<Tab value="tab1" labelText="Tab 1" />);

  expect(screen.getByRole("tab")).toHaveTextContent("Tab 1");
});

it("is not selected by default in standalone mode", () => {
  render(<Tab value="tab1" labelText="Tab 1" />);

  const tab = screen.getByRole("tab", { name: "Tab 1" });

  expect(tab).toHaveAttribute("aria-selected", "false");
});

it("can be selected via isSelected prop", () => {
  render(<Tab value="tab1" labelText="Tab 1" isSelected={true} />);

  const tab = screen.getByRole("tab", { name: "Tab 1" });

  expect(tab).toHaveAttribute("aria-selected", "true");
});

it("supports pill variant via prop", () => {
  render(<Tab value="tab1" labelText="Tab 1" variant="pill" />);

  const tab = screen.getByRole("tab", { name: "Tab 1" });

  expect(tab).toHaveClass("tab-pill");
});

it("supports underline variant via prop", () => {
  render(<Tab value="tab1" labelText="Tab 1" variant="underline" />);

  const tab = screen.getByRole("tab", { name: "Tab 1" });

  expect(tab).toHaveClass("tab-underline");
});

it("calls onTabSelect when clicked in standalone mode", async () => {
  const user = userEvent.setup();
  const handleSelect = vi.fn();

  render(<Tab value="tab1" labelText="Tab 1" onTabSelect={handleSelect} />);

  const tab = screen.getByRole("tab", { name: "Tab 1" });

  await user.click(tab);

  expect(handleSelect).toHaveBeenCalledWith("tab1");
});

it("gets variant from context when used in TabsGroup", () => {
  const { rerender } = render(
    <TabsGroup variant="pill" defaultActiveTab="tab1">
      <TabList>
        <Tab value="tab1" labelText="Pill Variant" />
      </TabList>
    </TabsGroup>
  );

  const tab = screen.getByRole("tab", { name: "Pill Variant" });
  expect(tab).toHaveClass("tab-pill");

  rerender(
    <TabsGroup variant="underline" defaultActiveTab="tab1">
      <TabList>
        <Tab value="tab1" labelText="Underline Variant" />
      </TabList>
    </TabsGroup>
  );

  const tabUnderline = screen.getByRole("tab", { name: "Underline Variant" });

  expect(tabUnderline).toHaveClass("tab-underline");
});

it("gets selection state from context when used in TabsGroup", () => {
  render(
    <TabsGroup defaultActiveTab="tab1">
      <TabList>
        <Tab value="tab1" labelText="Tab 1" />
        <Tab value="tab2" labelText="Tab 2" />
      </TabList>
    </TabsGroup>
  );

  const tab1 = screen.getByRole("tab", { name: "Tab 1" });
  const tab2 = screen.getByRole("tab", { name: "Tab 2" });

  expect(tab1).toHaveAttribute("aria-selected", "true");
  expect(tab2).toHaveAttribute("aria-selected", "false");
});

it("updates context state when clicked in TabsGroup", async () => {
  const user = userEvent.setup();

  render(
    <TabsGroup defaultActiveTab="tab1">
      <TabList>
        <Tab value="tab1" labelText="Tab 1" />
        <Tab value="tab2" labelText="Tab 2" />
      </TabList>
    </TabsGroup>
  );

  const tab1 = screen.getByRole("tab", { name: "Tab 1" });
  const tab2 = screen.getByRole("tab", { name: "Tab 2" });

  expect(tab1).toHaveAttribute("aria-selected", "true");
  expect(tab2).toHaveAttribute("aria-selected", "false");

  await user.click(tab2);

  expect(tab1).toHaveAttribute("aria-selected", "false");
  expect(tab2).toHaveAttribute("aria-selected", "true");
});

it("applies additional props", () => {
  render(<Tab value="tab1" labelText="Tab 1" data-test="test-value" />);

  const tab = screen.getByRole("tab", { name: "Tab 1" });

  expect(tab).toHaveAttribute("id", "tab-tab1");
  expect(tab).toHaveAttribute("data-test", "test-value");
});

it("renders children when provided", () => {
  render(
    <Tab value="tab1" labelText="Tab 1">
      <span data-testid="badge">3</span>
    </Tab>
  );

  const badge = screen.getByTestId("badge");

  expect(badge).toBeInTheDocument();
  expect(badge).toHaveTextContent("3");
});

it("sets correct ARIA attributes", () => {
  render(
    <>
      <Tab value="tab1" labelText="Tab 1" isSelected={true} />
      <Tab value="tab2" labelText="Tab 2" isSelected={false} />
    </>
  );

  const tab1 = screen.getByRole("tab", { name: "Tab 1" });
  const tab2 = screen.getByRole("tab", { name: "Tab 2" });

  expect(tab1).toHaveAttribute("aria-controls", "panel-tab1");
  expect(tab1).toHaveAttribute("id", "tab-tab1");
  expect(tab1).toHaveAttribute("tabIndex", "0");

  expect(tab2).toHaveAttribute("aria-controls", "panel-tab2");
  expect(tab2).toHaveAttribute("id", "tab-tab2");
  expect(tab2).toHaveAttribute("tabIndex", "-1");
});

it("prop variant overridden by context variant", () => {
  render(
    <TabsGroup variant="underline" defaultActiveTab="tab1">
      <TabList>
        <Tab value="tab1" labelText="Tab 1" variant="pill" />
      </TabList>
    </TabsGroup>
  );

  const tab = screen.getByRole("tab", { name: "Tab 1" });

  expect(tab).toHaveClass("tab-underline");
  expect(tab).not.toHaveClass("tab-pill");
});

it("generates unique ids for multiple TabsGroup with same value", () => {
  render(
    <>
      <TabsGroup defaultActiveTab="overview">
        <TabList>
          <Tab value="overview" labelText="Overview 1" />
        </TabList>
      </TabsGroup>
      <TabsGroup defaultActiveTab="overview">
        <TabList>
          <Tab value="overview" labelText="Overview 2" />
        </TabList>
      </TabsGroup>
    </>
  );

  const tabs = screen.getAllByRole("tab");
  const ids = tabs.map((tab) => tab.getAttribute("id"));
  expect(new Set(ids).size).toBe(ids.length); // All IDs should be unique
});

it("generates unique aria-controls for multiple TabsGroup with same value", () => {
  render(
    <>
      <TabsGroup defaultActiveTab="overview">
        <TabList>
          <Tab value="overview" labelText="Overview 1" />
        </TabList>
      </TabsGroup>
      <TabsGroup defaultActiveTab="overview">
        <TabList>
          <Tab value="overview" labelText="Overview 2" />
        </TabList>
      </TabsGroup>
    </>
  );

  const tabs = screen.getAllByRole("tab");
  const ariaControls = tabs.map((tab) => tab.getAttribute("aria-controls"));
  expect(new Set(ariaControls).size).toBe(ariaControls.length); // All aria-controls should be unique
});
