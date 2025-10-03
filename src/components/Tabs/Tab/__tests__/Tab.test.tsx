import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, it } from "vitest";
import Tab from "../Tab";
import TabsGroup from "../../TabsGroup/TabsGroup";
import TabList from "../../TabList/TabList";

it("displays the correct label text", () => {
  render(
    <TabsGroup defaultActiveTab="tab1">
      <TabList>
        <Tab value="tab1" labelText="Tab 1" />
      </TabList>
    </TabsGroup>
  );

  expect(screen.getByRole("tab")).toHaveTextContent("Tab 1");
});

it("is not selected when not matching activeTab", () => {
  render(
    <TabsGroup defaultActiveTab="tab1">
      <TabList>
        <Tab value="tab1" labelText="Tab 1" />
        <Tab value="tab2" labelText="Tab 2" />
      </TabList>
    </TabsGroup>
  );

  const tab2 = screen.getByRole("tab", { name: "Tab 2" });

  expect(tab2).toHaveAttribute("aria-selected", "false");
});

it("is selected when matching activeTab", () => {
  render(
    <TabsGroup defaultActiveTab="tab1">
      <TabList>
        <Tab value="tab1" labelText="Tab 1" />
      </TabList>
    </TabsGroup>
  );

  const tab = screen.getByRole("tab", { name: "Tab 1" });

  expect(tab).toHaveAttribute("aria-selected", "true");
});

it("gets variant from context", () => {
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

it("applies additional props", () => {
  render(
    <TabsGroup defaultActiveTab="tab1">
      <TabList>
        <Tab value="tab1" labelText="Tab 1" data-test="test-value" />
      </TabList>
    </TabsGroup>
  );

  const tab = screen.getByRole("tab", { name: "Tab 1" });

  expect(tab).toHaveAttribute("id", "tab-tab1");
  expect(tab).toHaveAttribute("data-test", "test-value");
});

it("calls setActiveTab on click", async () => {
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

it("renders children when provided", () => {
  render(
    <TabsGroup defaultActiveTab="tab1">
      <TabList>
        <Tab value="tab1" labelText="Tab 1">
          <span data-testid="badge">3</span>
        </Tab>
      </TabList>
    </TabsGroup>
  );

  const badge = screen.getByTestId("badge");

  expect(badge).toBeInTheDocument();
  expect(badge).toHaveTextContent("3");
});

it("sets correct ARIA attributes", () => {
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

  expect(tab1).toHaveAttribute("aria-controls", "panel-tab1");
  expect(tab1).toHaveAttribute("id", "tab-tab1");
  expect(tab1).toHaveAttribute("tabIndex", "0");

  expect(tab2).toHaveAttribute("aria-controls", "panel-tab2");
  expect(tab2).toHaveAttribute("id", "tab-tab2");
  expect(tab2).toHaveAttribute("tabIndex", "-1");
});
