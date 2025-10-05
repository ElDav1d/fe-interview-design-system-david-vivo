import { render, screen } from "@testing-library/react";
import { expect, it } from "vitest";
import TabList from "../TabList";
import Tab from "../../Tab/Tab";
import {
  pressArrowRight,
  pressArrowLeft,
  pressHome,
  pressEnd,
} from "./helpers";

it("moves focus to next tab with ArrowRight", async () => {
  render(
    <TabList>
      <Tab value="tab1" labelText="Tab 1" />
      <Tab value="tab2" labelText="Tab 2" />
      <Tab value="tab3" labelText="Tab 3" />
    </TabList>
  );

  const tab1 = screen.getByRole("tab", { name: "Tab 1" });
  const tab2 = screen.getByRole("tab", { name: "Tab 2" });

  tab1.focus();
  expect(tab1).toHaveFocus();

  await pressArrowRight();
  expect(tab2).toHaveFocus();
});

it("moves focus to previous tab with ArrowLeft", async () => {
  render(
    <TabList>
      <Tab value="tab1" labelText="Tab 1" />
      <Tab value="tab2" labelText="Tab 2" />
      <Tab value="tab3" labelText="Tab 3" />
    </TabList>
  );

  const tab1 = screen.getByRole("tab", { name: "Tab 1" });
  const tab2 = screen.getByRole("tab", { name: "Tab 2" });

  tab2.focus();
  expect(tab2).toHaveFocus();

  await pressArrowLeft();
  expect(tab1).toHaveFocus();
});

it("wraps focus from last to first tab with ArrowRight (cyclic)", async () => {
  render(
    <TabList>
      <Tab value="tab1" labelText="Tab 1" />
      <Tab value="tab2" labelText="Tab 2" />
      <Tab value="tab3" labelText="Tab 3" />
    </TabList>
  );

  const tab1 = screen.getByRole("tab", { name: "Tab 1" });
  const tab3 = screen.getByRole("tab", { name: "Tab 3" });

  tab3.focus();
  expect(tab3).toHaveFocus();

  await pressArrowRight();
  expect(tab1).toHaveFocus();
});

it("wraps focus from first to last tab with ArrowLeft (cyclic)", async () => {
  render(
    <TabList>
      <Tab value="tab1" labelText="Tab 1" />
      <Tab value="tab2" labelText="Tab 2" />
      <Tab value="tab3" labelText="Tab 3" />
    </TabList>
  );

  const tab1 = screen.getByRole("tab", { name: "Tab 1" });
  const tab3 = screen.getByRole("tab", { name: "Tab 3" });

  tab1.focus();
  expect(tab1).toHaveFocus();

  await pressArrowLeft();
  expect(tab3).toHaveFocus();
});

it("moves focus to first tab with Home", async () => {
  render(
    <TabList>
      <Tab value="tab1" labelText="Tab 1" />
      <Tab value="tab2" labelText="Tab 2" />
      <Tab value="tab3" labelText="Tab 3" />
    </TabList>
  );

  const tab1 = screen.getByRole("tab", { name: "Tab 1" });
  const tab2 = screen.getByRole("tab", { name: "Tab 2" });

  tab2.focus();
  expect(tab2).toHaveFocus();

  await pressHome();
  expect(tab1).toHaveFocus();
});

it("moves focus to last tab with End", async () => {
  render(
    <TabList>
      <Tab value="tab1" labelText="Tab 1" />
      <Tab value="tab2" labelText="Tab 2" />
      <Tab value="tab3" labelText="Tab 3" />
    </TabList>
  );

  const tab1 = screen.getByRole("tab", { name: "Tab 1" });
  const tab3 = screen.getByRole("tab", { name: "Tab 3" });

  tab1.focus();
  expect(tab1).toHaveFocus();

  await pressEnd();
  expect(tab3).toHaveFocus();
});

it("updates tabIndex correctly when focus moves", async () => {
  render(
    <TabList>
      <Tab value="tab1" labelText="Tab 1" />
      <Tab value="tab2" labelText="Tab 2" />
      <Tab value="tab3" labelText="Tab 3" />
    </TabList>
  );

  const tab1 = screen.getByRole("tab", { name: "Tab 1" });
  const tab2 = screen.getByRole("tab", { name: "Tab 2" });
  const tab3 = screen.getByRole("tab", { name: "Tab 3" });

  tab1.focus();
  await pressArrowRight();

  // After navigation, focused tab should have tabIndex=0
  expect(tab1).toHaveAttribute("tabIndex", "-1");
  expect(tab2).toHaveAttribute("tabIndex", "0");
  expect(tab3).toHaveAttribute("tabIndex", "-1");
});
